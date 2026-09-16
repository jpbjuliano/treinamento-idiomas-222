(() => {
  const synth = window.speechSynthesis;

  function getEnglishVoice(){
    if(!synth) return null;
    const voices = synth.getVoices();
    return voices.find(voice => /^en-US$/i.test(voice.lang))
      || voices.find(voice => /^en-GB$/i.test(voice.lang))
      || voices.find(voice => /^en/i.test(voice.lang))
      || null;
  }

  function speak(text, button){
    const cleanText = String(text || '')
      .replace(/…/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if(!cleanText || !synth) return;

    synth.cancel();
    document.querySelectorAll('.speak-button.is-speaking').forEach(item => item.classList.remove('is-speaking'));

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 0.88;
    utterance.pitch = 1;

    const voice = getEnglishVoice();
    if(voice){
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    if(button) button.classList.add('is-speaking');
    utterance.onend = () => button?.classList.remove('is-speaking');
    utterance.onerror = () => button?.classList.remove('is-speaking');
    synth.speak(utterance);
  }

  function buildButton(target, label){
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'speak-button';
    button.innerHTML = '<span aria-hidden="true">🔊</span><span>Ouvir</span>';
    button.setAttribute('aria-label', label);
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      speak(target.textContent, button);
    });
    return button;
  }

  function enhanceExpressionCards(root = document){
    root.querySelectorAll('.expression-main').forEach(container => {
      if(container.querySelector('.speak-button')) return;
      const heading = container.querySelector('h3');
      if(!heading) return;

      const row = document.createElement('div');
      row.className = 'expression-audio-row';
      heading.parentNode.insertBefore(row, heading);
      row.appendChild(heading);
      row.appendChild(buildButton(heading, `Ouvir a expressão ${heading.textContent}`));
    });
  }

  function enhanceReviewCard(){
    const heading = document.getElementById('reviewExpression');
    if(!heading || heading.closest('.expression-audio-row')) return;

    const row = document.createElement('div');
    row.className = 'expression-audio-row review-audio-row';
    heading.parentNode.insertBefore(row, heading);
    row.appendChild(heading);
    row.appendChild(buildButton(heading, 'Ouvir a expressão atual'));
  }

  function init(){
    if(!synth){
      return;
    }

    enhanceExpressionCards();
    enhanceReviewCard();

    const grid = document.getElementById('expressionGrid');
    if(grid){
      const observer = new MutationObserver(() => enhanceExpressionCards(grid));
      observer.observe(grid, {childList:true, subtree:true});
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }

  if(synth && typeof synth.addEventListener === 'function'){
    synth.addEventListener('voiceschanged', () => {});
  }
})();
