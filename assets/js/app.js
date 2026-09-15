(() => {
  const data = window.TRAINING_DATA;
  const state = {
    mode: "training",
    answers: {},
    plays: {},
    startedAt: Date.now(),
    seconds: 0,
    submittedSimulation: false
  };

  const el = {
    timer: document.getElementById("timer"),
    resetBtn: document.getElementById("resetBtn"),
    modeSelect: document.getElementById("modeSelect"),
    modeHelp: document.getElementById("modeHelp"),
    metricQuestions: document.getElementById("metricQuestions"),
    metricCorrect: document.getElementById("metricCorrect"),
    metricPercent: document.getElementById("metricPercent"),
    metricSkill: document.getElementById("metricSkill"),
    caContent: document.getElementById("caContent"),
    clContent: document.getElementById("clContent"),
    eeContent: document.getElementById("eeContent"),
    resultContent: document.getElementById("resultContent")
  };

  const allObjective = [...data.ca, ...data.cl];

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatTime(total) {
    const min = String(Math.floor(total / 60)).padStart(2, "0");
    const sec = String(total % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }

  setInterval(() => {
    state.seconds += 1;
    el.timer.textContent = formatTime(state.seconds);
  }, 1000);

  function getCorrectCount(items = allObjective) {
    return items.reduce((sum, q) => sum + (state.answers[q.id] === q.answer ? 1 : 0), 0);
  }

  function getAnsweredCount(items = allObjective) {
    return items.filter(q => Number.isInteger(state.answers[q.id])).length;
  }

  function updateMetrics() {
    const answered = getAnsweredCount();
    const correct = getCorrectCount();
    const pct = answered ? Math.round((correct / answered) * 100) : 0;
    el.metricQuestions.textContent = `${answered}/${allObjective.length}`;

    if (state.mode === "simulation" && !state.submittedSimulation) {
      el.metricCorrect.textContent = "—";
      el.metricPercent.textContent = "—";
    } else {
      el.metricCorrect.textContent = String(correct);
      el.metricPercent.textContent = `${pct}%`;
    }
  }

  function buildOptions(q, skill) {
    return q.options.map((option, idx) => `
      <button class="option-btn" type="button" data-skill="${skill}" data-id="${q.id}" data-option="${idx}">
        <strong>${String.fromCharCode(65 + idx)})</strong> ${escapeHtml(option)}
      </button>
    `).join("");
  }

  function renderCA() {
    el.caContent.innerHTML = data.ca.map((q, index) => `
      <article class="question-card" id="card-${q.id}">
        <div class="question-meta"><span>Questão ${index + 1}</span><span>${escapeHtml(q.category)}</span></div>
        <div class="audio-row">
          <button class="audio-btn" type="button" data-audio-id="${q.id}">▶ Ouvir</button>
          <span class="audio-status" id="audio-status-${q.id}">0 de 2 reproduções</span>
        </div>
        <h3 class="question-title">${escapeHtml(q.question)}</h3>
        <div class="options">${buildOptions(q, "ca")}</div>
        <div class="feedback hidden" id="feedback-${q.id}"></div>
      </article>
    `).join("");
  }

  function renderCL() {
    el.clContent.innerHTML = data.cl.map((q, index) => `
      <article class="reading-card" id="card-${q.id}">
        <div class="question-meta"><span>Questão ${index + 1}</span><span>${escapeHtml(q.category)}</span></div>
        <div class="reading-text">${escapeHtml(q.passage)}</div>
        <h3 class="question-title">${escapeHtml(q.question)}</h3>
        <div class="options">${buildOptions(q, "cl")}</div>
        <div class="feedback hidden" id="feedback-${q.id}"></div>
      </article>
    `).join("");
  }

  function renderEE() {
    el.eeContent.innerHTML = data.ee.map((item, index) => `
      <article class="writing-card">
        <div class="question-meta"><span>Proposta ${index + 1}</span><span>produção escrita</span></div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="writing-prompt">${escapeHtml(item.prompt)}</p>
        <div class="checklist">
          ${item.checklist.map(x => `<div class="check-item">✓ ${escapeHtml(x)}</div>`).join("")}
        </div>
        <textarea class="writing-area" id="writing-${item.id}" data-writing-id="${item.id}" placeholder="Escreva sua resposta em inglês aqui..."></textarea>
        <div class="writing-tools">
          <span id="words-${item.id}">0 palavras</span>
          <button class="secondary-btn" type="button" data-hint-id="${item.id}">Mostrar conectores</button>
        </div>
        <div class="hint-box hidden" id="hint-${item.id}"><strong>Conectores úteis:</strong> ${escapeHtml(item.connectors)}</div>
      </article>
    `).join("");
  }

  function getQuestion(id) {
    return allObjective.find(q => q.id === id);
  }

  function chooseVoice() {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    return voices.find(v => /^en-US/i.test(v.lang)) ||
      voices.find(v => /^en-GB/i.test(v.lang)) ||
      voices.find(v => /^en/i.test(v.lang)) || null;
  }

  function playAudio(id) {
    const q = getQuestion(id);
    if (!q) return;

    const used = state.plays[id] || 0;
    if (used >= 2) return;

    if (!("speechSynthesis" in window)) {
      document.getElementById(`audio-status-${id}`).textContent = "Seu navegador não suporta síntese de voz.";
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(q.text);
    utterance.lang = "en-US";
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voice = chooseVoice();
    if (voice) utterance.voice = voice;

    state.plays[id] = used + 1;
    const status = document.getElementById(`audio-status-${id}`);
    status.textContent = `${state.plays[id]} de 2 reproduções`;
    const button = document.querySelector(`[data-audio-id="${id}"]`);
    if (state.plays[id] >= 2) {
      button.textContent = "Limite atingido";
      button.disabled = true;
    }

    window.speechSynthesis.speak(utterance);
  }

  function paintSelection(id) {
    const q = getQuestion(id);
    if (!q) return;
    const selected = state.answers[id];
    const buttons = document.querySelectorAll(`[data-id="${id}"]`);

    buttons.forEach(btn => {
      const idx = Number(btn.dataset.option);
      btn.classList.remove("selected", "correct", "wrong");
      if (idx === selected) btn.classList.add("selected");

      if (state.mode === "training" || state.submittedSimulation) {
        if (idx === q.answer) btn.classList.add("correct");
        if (idx === selected && selected !== q.answer) btn.classList.add("wrong");
      }
    });
  }

  function showFeedback(id) {
    const q = getQuestion(id);
    const selected = state.answers[id];
    const box = document.getElementById(`feedback-${id}`);
    if (!q || !Number.isInteger(selected) || !box) return;

    const isCorrect = selected === q.answer;
    box.className = `feedback ${isCorrect ? "success" : "error"}`;
    box.innerHTML = `
      <strong>${isCorrect ? "✓ Resposta correta" : `✗ Resposta correta: ${String.fromCharCode(65 + q.answer)}`}</strong>
      ${escapeHtml(q.explanation)}
    `;
  }

  function answerQuestion(id, option) {
    const q = getQuestion(id);
    if (!q) return;

    if (state.mode === "training" && Number.isInteger(state.answers[id])) return;
    if (state.submittedSimulation) return;

    state.answers[id] = option;
    paintSelection(id);

    if (state.mode === "training") {
      document.querySelectorAll(`[data-id="${id}"]`).forEach(btn => btn.disabled = true);
      showFeedback(id);
    }

    updateMetrics();
  }

  function renderResults() {
    const caAnswered = getAnsweredCount(data.ca);
    const caCorrect = getCorrectCount(data.ca);
    const clAnswered = getAnsweredCount(data.cl);
    const clCorrect = getCorrectCount(data.cl);
    const totalAnswered = caAnswered + clAnswered;
    const totalCorrect = caCorrect + clCorrect;
    const totalPct = totalAnswered ? Math.round(totalCorrect / totalAnswered * 100) : 0;

    const card = (name, correct, answered) => {
      const pct = answered ? Math.round(correct / answered * 100) : 0;
      return `<div class="result-card"><span>${name}</span><strong>${pct}%</strong><span>${correct} acertos em ${answered} respondidas</span></div>`;
    };

    const action = state.mode === "simulation" && !state.submittedSimulation
      ? `<button class="primary-btn" id="finishSimulation" type="button">Finalizar e corrigir simulado</button>`
      : "";

    el.resultContent.innerHTML = `
      <div class="result-grid">
        ${card("CA", caCorrect, caAnswered)}
        ${card("CL", clCorrect, clAnswered)}
        ${card("Geral", totalCorrect, totalAnswered)}
      </div>
      <div class="result-detail">
        <strong>Tempo de estudo:</strong> ${formatTime(state.seconds)}<br>
        <strong>Questões respondidas:</strong> ${totalAnswered} de ${allObjective.length}<br>
        <strong>Aproveitamento atual:</strong> ${totalPct}%<br><br>
        ${state.mode === "simulation" && !state.submittedSimulation
          ? "No modo Simulado, as respostas corretas permanecem ocultas até você finalizar."
          : "Revise principalmente as questões erradas e identifique o gatilho: contraste, causa, sequência, ideia principal ou informação específica."}
        <div style="margin-top:14px">${action}</div>
      </div>
    `;
  }

  function finishSimulation() {
    state.submittedSimulation = true;
    allObjective.forEach(q => {
      paintSelection(q.id);
      if (Number.isInteger(state.answers[q.id])) showFeedback(q.id);
      document.querySelectorAll(`[data-id="${q.id}"]`).forEach(btn => btn.disabled = true);
    });
    updateMetrics();
    renderResults();
  }

  function setMode(mode) {
    if (Object.keys(state.answers).length > 0 && mode !== state.mode) {
      const ok = window.confirm("Trocar de modo reiniciará suas respostas. Continuar?");
      if (!ok) {
        el.modeSelect.value = state.mode;
        return;
      }
      resetSession(false);
    }

    state.mode = mode;
    state.submittedSimulation = false;
    el.modeHelp.textContent = mode === "training"
      ? "No treino, a correção aparece após cada resposta."
      : "No simulado, a correção aparece somente ao finalizar.";
    updateMetrics();
    renderResults();
  }

  function resetSession(confirmReset = true) {
    if (confirmReset && !window.confirm("Reiniciar respostas, áudios e cronômetro desta sessão?")) return;
    window.speechSynthesis?.cancel?.();
    state.answers = {};
    state.plays = {};
    state.seconds = 0;
    state.submittedSimulation = false;
    el.timer.textContent = "00:00";
    renderCA();
    renderCL();
    renderEE();
    renderResults();
    updateMetrics();
  }

  function openTab(tabId) {
    document.querySelectorAll(".tab").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tabId));
    document.querySelectorAll(".panel").forEach(panel => panel.classList.toggle("active-panel", panel.id === tabId));
    el.metricSkill.textContent = tabId === "resultado" ? "RES" : tabId.toUpperCase();
    if (tabId === "resultado") renderResults();
  }

  document.addEventListener("click", event => {
    const tab = event.target.closest(".tab");
    if (tab) openTab(tab.dataset.tab);

    const audio = event.target.closest("[data-audio-id]");
    if (audio) playAudio(audio.dataset.audioId);

    const option = event.target.closest("[data-id][data-option]");
    if (option) answerQuestion(option.dataset.id, Number(option.dataset.option));

    const hint = event.target.closest("[data-hint-id]");
    if (hint) {
      const box = document.getElementById(`hint-${hint.dataset.hintId}`);
      box.classList.toggle("hidden");
      hint.textContent = box.classList.contains("hidden") ? "Mostrar conectores" : "Ocultar conectores";
    }

    if (event.target.id === "finishSimulation") finishSimulation();
  });

  document.addEventListener("input", event => {
    const area = event.target.closest("[data-writing-id]");
    if (!area) return;
    const words = area.value.trim() ? area.value.trim().split(/\s+/).length : 0;
    document.getElementById(`words-${area.dataset.writingId}`).textContent = `${words} ${words === 1 ? "palavra" : "palavras"}`;
  });

  el.modeSelect.addEventListener("change", () => setMode(el.modeSelect.value));
  el.resetBtn.addEventListener("click", () => resetSession(true));

  renderCA();
  renderCL();
  renderEE();
  renderResults();
  updateMetrics();
})();
