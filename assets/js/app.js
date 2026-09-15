(() => {
  const data = window.TRAINING_DATA;
  const state = {
    mode: "training",
    track: "target",
    answers: {},
    plays: {},
    seconds: 0,
    submittedSimulation: false,
    questionOrder: { ca: [], cl: [], ee: [] },
    optionOrder: {}
  };

  const el = {
    timer: document.getElementById("timer"),
    resetBtn: document.getElementById("resetBtn"),
    modeSelect: document.getElementById("modeSelect"),
    modeHelp: document.getElementById("modeHelp"),
    trackSelect: document.getElementById("trackSelect"),
    trackHelp: document.getElementById("trackHelp"),
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
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function shuffleArray(values) {
    const shuffled = [...values];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function resetQuestionOrder() {
    state.questionOrder = {
      ca: shuffleArray(data.ca.map(q => q.id)),
      cl: shuffleArray(data.cl.map(q => q.id)),
      ee: shuffleArray(data.ee.map(q => q.id))
    };
    state.optionOrder = {};
  }

  function orderedItems(items, skill) {
    const order = state.questionOrder[skill] || [];
    const byId = new Map(items.map(item => [item.id, item]));
    const ordered = order.map(id => byId.get(id)).filter(Boolean);
    const included = new Set(ordered.map(item => item.id));
    return [...ordered, ...items.filter(item => !included.has(item.id))];
  }

  function formatTime(total) {
    const min = String(Math.floor(total / 60)).padStart(2, "0");
    const sec = String(total % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }

  function visibleItems(items, skill) {
    const ordered = orderedItems(items, skill);
    return state.track === "all" ? ordered : ordered.filter(q => (q.track || "target") === state.track);
  }

  function activeObjective() {
    return [...visibleItems(data.ca, "ca"), ...visibleItems(data.cl, "cl")];
  }

  function trackLabel(track = state.track) {
    return ({base: "Base B1", target: "Alvo N2", challenge: "Desafio B2–C1", all: "Banco completo"})[track] || track;
  }

  setInterval(() => {
    state.seconds += 1;
    el.timer.textContent = formatTime(state.seconds);
  }, 1000);

  function getCorrectCount(items = activeObjective()) {
    return items.reduce((sum, q) => sum + (state.answers[q.id] === q.answer ? 1 : 0), 0);
  }

  function getAnsweredCount(items = activeObjective()) {
    return items.filter(q => Number.isInteger(state.answers[q.id])).length;
  }

  function updateMetrics() {
    const active = activeObjective();
    const answered = getAnsweredCount(active);
    const correct = getCorrectCount(active);
    const pct = answered ? Math.round((correct / answered) * 100) : 0;
    el.metricQuestions.textContent = `${answered}/${active.length}`;

    if (state.mode === "simulation" && !state.submittedSimulation) {
      el.metricCorrect.textContent = "—";
      el.metricPercent.textContent = "—";
    } else {
      el.metricCorrect.textContent = String(correct);
      el.metricPercent.textContent = `${pct}%`;
    }
  }

  function metaTags(q) {
    const parts = [q.level || "N2", q.descriptor || q.category || "compreensão"];
    return `<div class="meta-tags">${parts.map(x => `<span>${escapeHtml(x)}</span>`).join("")}</div>`;
  }

  function referenceLine(q) {
    return q.reference ? `<div class="reference-line">Formato de referência: ${escapeHtml(q.reference)}</div>` : "";
  }

  function optionIndices(q) {
    const indices = q.options.map((_, idx) => idx);
    if (state.mode !== "simulation") return indices;
    if (!state.optionOrder[q.id]) state.optionOrder[q.id] = shuffleArray(indices);
    return state.optionOrder[q.id];
  }

  function displayLetterForOption(q, originalIndex) {
    const position = optionIndices(q).indexOf(originalIndex);
    return String.fromCharCode(65 + Math.max(position, 0));
  }

  function buildOptions(q, skill) {
    return optionIndices(q).map((originalIdx, displayIdx) => `
      <button class="option-btn" type="button" data-skill="${skill}" data-id="${q.id}" data-option="${originalIdx}">
        <strong>${String.fromCharCode(65 + displayIdx)})</strong> ${escapeHtml(q.options[originalIdx])}
      </button>
    `).join("");
  }

  function renderBankHeader(skill, visible, total) {
    return `
      <div class="bank-summary">
        <strong>${trackLabel()}</strong>
        <span>${visible} questões exibidas de ${total} disponíveis em ${skill}</span>
      </div>
    `;
  }

  function renderCA() {
    const items = visibleItems(data.ca, "ca");
    el.caContent.innerHTML = renderBankHeader("CA", items.length, data.ca.length) + items.map((q, index) => `
      <article class="question-card" id="card-${q.id}">
        <div class="question-meta"><span>Questão ${index + 1}</span><span>${escapeHtml(q.category)}</span></div>
        ${metaTags(q)}
        ${referenceLine(q)}
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
    const items = visibleItems(data.cl, "cl");
    el.clContent.innerHTML = renderBankHeader("CL", items.length, data.cl.length) + items.map((q, index) => `
      <article class="reading-card" id="card-${q.id}">
        <div class="question-meta"><span>Questão ${index + 1}</span><span>${escapeHtml(q.category)}</span></div>
        ${metaTags(q)}
        ${referenceLine(q)}
        <div class="reading-text">${escapeHtml(q.passage)}</div>
        <h3 class="question-title">${escapeHtml(q.question)}</h3>
        <div class="options">${buildOptions(q, "cl")}</div>
        <div class="feedback hidden" id="feedback-${q.id}"></div>
      </article>
    `).join("");
  }

  function renderEE() {
    const items = orderedItems(data.ee, "ee");
    el.eeContent.innerHTML = items.map((item, index) => `
      <article class="writing-card">
        <div class="question-meta"><span>Proposta ${index + 1}</span><span>${escapeHtml(item.type || "produção escrita")}</span></div>
        <div class="meta-tags"><span>${escapeHtml(item.level || "N2")}</span><span>${escapeHtml(item.wordGoal || "100–150 palavras")}</span></div>
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

  function chooseVoice(lang = "en-US") {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    const exact = voices.find(v => v.lang.toLowerCase() === lang.toLowerCase());
    const family = voices.find(v => v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()));
    return exact || family || null;
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
    const lang = q.lang || "en-US";
    const utterance = new SpeechSynthesisUtterance(q.text);
    utterance.lang = lang;
    utterance.rate = q.audioRate ?? (q.track === "challenge" ? 0.97 : q.track === "target" ? 0.89 : 0.85);
    utterance.pitch = 1;
    utterance.volume = 1;
    const voice = chooseVoice(lang);
    if (voice) utterance.voice = voice;

    state.plays[id] = used + 1;
    const status = document.getElementById(`audio-status-${id}`);
    status.textContent = `${state.plays[id]} de 2 reproduções • ${lang}`;
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
    const transcript = q.text ? `
      <details class="transcript">
        <summary>Ver transcrição após responder</summary>
        <p>${escapeHtml(q.text)}</p>
      </details>` : "";

    box.className = `feedback ${isCorrect ? "success" : "error"}`;
    box.innerHTML = `
      <strong>${isCorrect ? "✓ Resposta correta" : `✗ Resposta correta: ${displayLetterForOption(q, q.answer)}`}</strong>
      ${escapeHtml(q.explanation)}
      ${transcript}
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

  function descriptorBreakdown(items) {
    const groups = {};
    items.forEach(q => {
      const key = q.descriptor || q.category || "outros";
      if (!groups[key]) groups[key] = {answered: 0, correct: 0};
      if (Number.isInteger(state.answers[q.id])) {
        groups[key].answered += 1;
        if (state.answers[q.id] === q.answer) groups[key].correct += 1;
      }
    });

    const rows = Object.entries(groups)
      .filter(([, value]) => value.answered > 0)
      .map(([name, value]) => ({name, ...value, pct: Math.round(value.correct / value.answered * 100)}))
      .sort((a, b) => a.pct - b.pct || b.answered - a.answered);

    if (!rows.length) return `<p class="empty-note">Responda algumas questões para gerar o diagnóstico por descritor.</p>`;

    return `<div class="diagnostic-list">${rows.map(row => `
      <div class="diagnostic-row">
        <span>${escapeHtml(row.name)}</span>
        <strong>${row.pct}%</strong>
        <small>${row.correct}/${row.answered}</small>
      </div>
    `).join("")}</div>`;
  }

  function renderResults() {
    const caItems = visibleItems(data.ca, "ca");
    const clItems = visibleItems(data.cl, "cl");
    const active = [...caItems, ...clItems];
    const caAnswered = getAnsweredCount(caItems);
    const caCorrect = getCorrectCount(caItems);
    const clAnswered = getAnsweredCount(clItems);
    const clCorrect = getCorrectCount(clItems);
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
        <strong>Trilha:</strong> ${trackLabel()}<br>
        <strong>Tempo de estudo:</strong> ${formatTime(state.seconds)}<br>
        <strong>Questões respondidas:</strong> ${totalAnswered} de ${active.length}<br>
        <strong>Aproveitamento atual:</strong> ${totalPct}%<br><br>
        ${state.mode === "simulation" && !state.submittedSimulation
          ? "No modo Simulado, as respostas corretas permanecem ocultas até você finalizar."
          : "Priorize os descritores com menor percentual. Na CA, volte à transcrição apenas depois de responder; na CL, localize no texto a evidência que confirma a alternativa."}
        <div style="margin-top:14px">${action}</div>
      </div>
      <div class="diagnostic-box">
        <h3>Diagnóstico por descritor</h3>
        ${descriptorBreakdown(active)}
      </div>
    `;
  }

  function finishSimulation() {
    state.submittedSimulation = true;
    activeObjective().forEach(q => {
      paintSelection(q.id);
      if (Number.isInteger(state.answers[q.id])) showFeedback(q.id);
      document.querySelectorAll(`[data-id="${q.id}"]`).forEach(btn => btn.disabled = true);
    });
    updateMetrics();
    renderResults();
  }

  function resetSession(confirmReset = true) {
    if (confirmReset && !window.confirm("Reiniciar a sessão e embaralhar novamente as questões?")) return false;
    window.speechSynthesis?.cancel?.();
    state.answers = {};
    state.plays = {};
    state.seconds = 0;
    state.submittedSimulation = false;
    resetQuestionOrder();
    el.timer.textContent = "00:00";
    renderCA();
    renderCL();
    renderEE();
    renderResults();
    updateMetrics();
    return true;
  }

  function setMode(mode) {
    if (Object.keys(state.answers).length > 0 && mode !== state.mode) {
      const ok = window.confirm("Trocar de modo reiniciará suas respostas e embaralhará uma nova sessão. Continuar?");
      if (!ok) {
        el.modeSelect.value = state.mode;
        return;
      }
    }

    if (mode !== state.mode) {
      state.answers = {};
      state.plays = {};
      state.seconds = 0;
      resetQuestionOrder();
    } else {
      state.optionOrder = {};
    }

    state.mode = mode;
    state.submittedSimulation = false;
    el.timer.textContent = "00:00";
    el.modeHelp.textContent = mode === "training"
      ? "No treino, a correção aparece após cada resposta."
      : "No simulado, questões e alternativas ficam randomizadas e a correção aparece somente ao finalizar.";
    renderCA();
    renderCL();
    renderEE();
    renderResults();
    updateMetrics();
  }

  function setTrack(track) {
    if (Object.keys(state.answers).length > 0 && track !== state.track) {
      const ok = window.confirm("Trocar de trilha reiniciará suas respostas e embaralhará uma nova sessão. Continuar?");
      if (!ok) {
        el.trackSelect.value = state.track;
        return;
      }
    }

    window.speechSynthesis?.cancel?.();
    state.track = track;
    state.answers = {};
    state.plays = {};
    state.seconds = 0;
    state.submittedSimulation = false;
    resetQuestionOrder();
    el.timer.textContent = "00:00";
    el.trackHelp.textContent = ({
      base: "Questões diretas para consolidar compreensão funcional B1.",
      target: "Prioriza tarefas de dificuldade próxima ao objetivo 222.",
      challenge: "Inferência, atitude e coesão em nível acima do alvo.",
      all: "Exibe todo o banco: Base, Alvo N2 e Desafio."
    })[track];
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
  el.trackSelect.addEventListener("change", () => setTrack(el.trackSelect.value));
  el.resetBtn.addEventListener("click", () => resetSession(true));

  resetQuestionOrder();
  renderCA();
  renderCL();
  renderEE();
  renderResults();
  updateMetrics();
})();