const reviewModeButtons = document.querySelectorAll('[data-review-mode]');
const reviewWorkspace = document.getElementById('reviewWorkspace');
const reviewEmpty = document.getElementById('reviewEmpty');
const reviewPosition = document.getElementById('reviewPosition');
const reviewSessionLabel = document.getElementById('reviewSessionLabel');
const reviewCategory = document.getElementById('reviewCategory');
const reviewPriority = document.getElementById('reviewPriority');
const reviewExpression = document.getElementById('reviewExpression');
const reviewAnswer = document.getElementById('reviewAnswer');
const reviewTranslation = document.getElementById('reviewTranslation');
const reviewExample = document.getElementById('reviewExample');
const reviewExamplePt = document.getElementById('reviewExamplePt');
const reviewTip = document.getElementById('reviewTip');
const reviewReveal = document.getElementById('reviewReveal');
const reviewNext = document.getElementById('reviewNext');
const reviewStatusButtons = document.querySelectorAll('[data-review-status]');

const reviewModeLabels = {
  all: 'Tudo',
  doubt: 'Tenho dúvida',
  review: 'Preciso revisar',
  essential: 'Essenciais'
};

let reviewSession = [];
let reviewIndex = 0;
let answerVisible = false;

function shuffleItems(items){
  const copy = [...items];
  for(let i = copy.length - 1; i > 0; i -= 1){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getReviewCandidates(mode){
  if(mode === 'doubt') return expressions.filter(item => progress[item.id] === 'doubt');
  if(mode === 'review') return expressions.filter(item => progress[item.id] === 'review');
  if(mode === 'essential') return expressions.filter(item => item.priority === 'essential');
  return [...expressions];
}

function priorityText(priority){
  return priorityLabels[priority] || priority;
}

function setReviewStatus(status){
  const item = reviewSession[reviewIndex];
  if(!item) return;
  progress[item.id] = status;
  saveProgress();
  updateStats();
  renderExpressions();
  renderReviewCard();
}

function renderReviewCard(){
  const item = reviewSession[reviewIndex];
  if(!item){
    reviewWorkspace.hidden = true;
    return;
  }

  answerVisible = false;
  reviewAnswer.hidden = true;
  reviewReveal.textContent = 'Mostrar resposta';
  reviewPosition.textContent = `${reviewIndex + 1} de ${reviewSession.length}`;
  reviewCategory.textContent = item.category;
  reviewPriority.textContent = priorityText(item.priority);
  reviewExpression.textContent = item.expression;
  reviewTranslation.textContent = item.translation;
  reviewExample.textContent = item.example;
  reviewExamplePt.textContent = item.examplePt;
  reviewTip.textContent = item.tip;
  reviewNext.textContent = reviewIndex === reviewSession.length - 1 ? 'Finalizar sessão' : 'Próxima →';

  reviewStatusButtons.forEach(button => {
    const active = progress[item.id] === button.dataset.reviewStatus;
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('active', active);
  });
}

function startReviewSession(mode){
  const candidates = getReviewCandidates(mode);
  reviewEmpty.hidden = candidates.length !== 0;

  if(!candidates.length){
    reviewWorkspace.hidden = true;
    reviewEmpty.innerHTML = `<strong>Nenhum item disponível.</strong><br>Marque expressões como “${reviewModeLabels[mode]}” no banco de revisão ou escolha outro modo.`;
    return;
  }

  reviewSession = shuffleItems(candidates).slice(0, 10);
  reviewIndex = 0;
  reviewSessionLabel.textContent = `${reviewModeLabels[mode]} • ${reviewSession.length} ${reviewSession.length === 1 ? 'item' : 'itens'}`;
  reviewWorkspace.hidden = false;
  renderReviewCard();
  reviewWorkspace.scrollIntoView({behavior:'smooth', block:'center'});
}

reviewModeButtons.forEach(button => {
  button.addEventListener('click', () => startReviewSession(button.dataset.reviewMode));
});

reviewReveal.addEventListener('click', () => {
  answerVisible = !answerVisible;
  reviewAnswer.hidden = !answerVisible;
  reviewReveal.textContent = answerVisible ? 'Ocultar resposta' : 'Mostrar resposta';
});

reviewNext.addEventListener('click', () => {
  if(!reviewSession.length) return;
  if(reviewIndex >= reviewSession.length - 1){
    reviewSession = [];
    reviewIndex = 0;
    reviewWorkspace.hidden = true;
    reviewEmpty.hidden = false;
    reviewEmpty.innerHTML = '<strong>Sessão concluída.</strong><br>Escolha um modo para iniciar outra rodada de revisão.';
    return;
  }
  reviewIndex += 1;
  renderReviewCard();
});

reviewStatusButtons.forEach(button => {
  button.addEventListener('click', () => setReviewStatus(button.dataset.reviewStatus));
});