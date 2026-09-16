(() => {
  const data = window.TRAINING_DATA;
  if (!data?.cl?.length) return;

  const questions = new Map(data.cl.map(item => [item.id, item]));
  const plays = {};

  function chooseVoice(lang = "en-US") {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    const exact = voices.find(voice => voice.lang.toLowerCase() === lang.toLowerCase());
    const family = voices.find(voice => voice.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()));
    return exact || family || null;
  }

  function injectAudio(feedback) {
    if (!feedback || feedback.classList.contains("hidden") || feedback.querySelector("[data-cl-audio-id]")) return;
    if (!("speechSynthesis" in window)) return;

    const card = feedback.closest(".reading-card");
    if (!card) return;

    const id = card.id.replace(/^card-/, "");
    const question = questions.get(id);
    if (!question?.passage) return;

    const row = document.createElement("div");
    row.className = "audio-row cl-post-answer-audio";
    row.setAttribute("aria-label", "Áudio de reforço liberado após a resposta");
    row.innerHTML = `
      <button class="audio-btn" type="button" data-cl-audio-id="${id}">🔊 Ouvir texto</button>
      <span class="audio-status" id="cl-audio-status-${id}">Reforço pós-resposta • 0 de 2 reproduções</span>
    `;
    feedback.appendChild(row);
  }

  function scanFeedback() {
    document.querySelectorAll("#cl .feedback:not(.hidden)").forEach(injectAudio);
  }

  function playReadingAudio(id) {
    const question = questions.get(id);
    if (!question?.passage || !("speechSynthesis" in window)) return;

    const used = plays[id] || 0;
    if (used >= 2) return;

    window.speechSynthesis.cancel();
    const lang = question.lang || "en-US";
    const utterance = new SpeechSynthesisUtterance(question.passage);
    utterance.lang = lang;
    utterance.rate = question.audioRate ?? 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = chooseVoice(lang);
    if (voice) utterance.voice = voice;

    plays[id] = used + 1;
    const status = document.getElementById(`cl-audio-status-${id}`);
    if (status) status.textContent = `Reforço pós-resposta • ${plays[id]} de 2 reproduções • ${lang}`;

    const button = document.querySelector(`[data-cl-audio-id="${id}"]`);
    if (button && plays[id] >= 2) {
      button.textContent = "Limite atingido";
      button.disabled = true;
    }

    window.speechSynthesis.speak(utterance);
  }

  function resetAudio() {
    window.speechSynthesis?.cancel?.();
    Object.keys(plays).forEach(id => delete plays[id]);
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-cl-audio-id]");
    if (button) playReadingAudio(button.dataset.clAudioId);
  });

  document.getElementById("resetBtn")?.addEventListener("click", resetAudio);
  document.getElementById("modeSelect")?.addEventListener("change", resetAudio);
  document.getElementById("trackSelect")?.addEventListener("change", resetAudio);

  const clPanel = document.getElementById("cl");
  if (clPanel) {
    const observer = new MutationObserver(scanFeedback);
    observer.observe(clPanel, {subtree: true, childList: true, attributes: true, attributeFilter: ["class"]});
    scanFeedback();
  }
})();