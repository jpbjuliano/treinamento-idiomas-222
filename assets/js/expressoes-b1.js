const expressions = [
  {id:'i-think',expression:'I think…',translation:'Eu acho…',category:'Opinião',priority:'essential',skills:'Listening • Writing',example:'I think this is the best option.',examplePt:'Acho que esta é a melhor opção.',tip:'Sinaliza opinião pessoal; não confunda com fato.'},
  {id:'in-my-opinion',expression:'In my opinion…',translation:'Na minha opinião…',category:'Opinião',priority:'essential',skills:'Reading • Writing',example:'In my opinion, public transport is more practical.',examplePt:'Na minha opinião, o transporte público é mais prático.',tip:'Boa estrutura para organizar opinião em textos curtos.'},
  {id:'i-believe',expression:'I believe…',translation:'Eu acredito / considero…',category:'Opinião',priority:'very-common',skills:'Listening • Writing',example:'I believe the course will be useful.',examplePt:'Acredito que o curso será útil.',tip:'Pode introduzir uma opinião um pouco mais formal.'},
  {id:'i-agree',expression:'I agree.',translation:'Eu concordo.',category:'Concordância',priority:'essential',skills:'Listening • Speaking',example:'I agree. We should leave earlier.',examplePt:'Concordo. Devemos sair mais cedo.',tip:'Observe o que vem depois: a justificativa costuma ser decisiva.'},
  {id:'you-are-right',expression:"You're right.",translation:'Você tem razão.',category:'Concordância',priority:'very-common',skills:'Listening • Speaking',example:"You're right. The train is faster.",examplePt:'Você tem razão. O trem é mais rápido.',tip:'Frequentemente confirma ou corrige uma decisão anterior.'},
  {id:'i-dont-think-so',expression:"I don't think so.",translation:'Acho que não.',category:'Discordância',priority:'essential',skills:'Listening • Speaking',example:"Is the museum open? I don't think so.",examplePt:'O museu está aberto? Acho que não.',tip:'Forma comum de discordância ou incerteza sem ser brusco.'},
  {id:'it-depends',expression:'It depends.',translation:'Depende.',category:'Opinião',priority:'very-common',skills:'Listening • Speaking',example:'It depends on the weather.',examplePt:'Depende do clima.',tip:'A informação depois de “on” costuma explicar a condição.'},
  {id:'why-dont-we',expression:"Why don't we…?",translation:'Por que não…?',category:'Sugestão',priority:'essential',skills:'Listening • Writing',example:"Why don't we meet after lunch?",examplePt:'Por que não nos encontramos depois do almoço?',tip:'Reconheça como sugestão, não como pergunta literal sobre motivo.'},
  {id:'how-about',expression:'How about…?',translation:'Que tal…?',category:'Sugestão',priority:'essential',skills:'Listening • Speaking',example:'How about going by bus?',examplePt:'Que tal irmos de ônibus?',tip:'Depois de “How about”, é comum aparecer verbo com -ing.'},
  {id:'lets',expression:"Let's…",translation:'Vamos…',category:'Sugestão',priority:'essential',skills:'Listening • Speaking',example:"Let's book the tickets online.",examplePt:'Vamos reservar os ingressos pela internet.',tip:'Indica proposta direta de ação conjunta.'},
  {id:'shall-we',expression:'Shall we…?',translation:'Vamos…? / Que tal…?',category:'Sugestão',priority:'very-common',skills:'Listening • Speaking',example:'Shall we start now?',examplePt:'Vamos começar agora?',tip:'Muito útil para reconhecer propostas e decisões.'},
  {id:'you-should',expression:'You should…',translation:'Você deveria…',category:'Conselho',priority:'essential',skills:'Listening • Writing',example:'You should take an umbrella.',examplePt:'Você deveria levar um guarda-chuva.',tip:'Normalmente indica conselho, não obrigação forte.'},
  {id:'you-have-to',expression:'You have to…',translation:'Você tem que…',category:'Obrigação',priority:'essential',skills:'Listening • Reading',example:'You have to show your ID at the entrance.',examplePt:'Você tem que mostrar sua identidade na entrada.',tip:'Marca necessidade ou obrigação; compare com “should”.'},
  {id:'could-you',expression:'Could you…?',translation:'Você poderia…?',category:'Pedido',priority:'essential',skills:'Listening • Writing',example:'Could you send me the address?',examplePt:'Você poderia me enviar o endereço?',tip:'Pedido educado; o verbo vem na forma base.'},
  {id:'would-you-mind',expression:'Would you mind…?',translation:'Você se importaria…?',category:'Pedido',priority:'very-common',skills:'Listening • Speaking',example:'Would you mind closing the door?',examplePt:'Você se importaria de fechar a porta?',tip:'Depois da expressão, é comum verbo com -ing.'},
  {id:'do-you-mind-if',expression:'Do you mind if…?',translation:'Você se importa se…?',category:'Permissão',priority:'very-common',skills:'Listening • Speaking',example:'Do you mind if I sit here?',examplePt:'Você se importa se eu sentar aqui?',tip:'Testa permissão; atenção a respostas como “No, not at all”.'},
  {id:'would-you-like',expression:'Would you like…?',translation:'Você gostaria…?',category:'Oferta',priority:'essential',skills:'Listening • Speaking',example:'Would you like some coffee?',examplePt:'Você gostaria de um pouco de café?',tip:'Pode introduzir oferta ou convite.'},
  {id:'id-rather',expression:"I'd rather…",translation:'Eu preferiria…',category:'Preferência',priority:'essential',skills:'Listening • Writing',example:"I'd rather stay at home tonight.",examplePt:'Eu preferiria ficar em casa esta noite.',tip:'Depois de “would rather”, use verbo sem “to”.'},
  {id:'id-prefer',expression:"I'd prefer…",translation:'Eu preferiria…',category:'Preferência',priority:'very-common',skills:'Listening • Writing',example:"I'd prefer to travel by train.",examplePt:'Eu preferiria viajar de trem.',tip:'É comum “prefer to + verbo”.'},
  {id:'im-interested-in',expression:"I'm interested in…",translation:'Tenho interesse em…',category:'Interesse',priority:'very-common',skills:'Reading • Writing',example:"I'm interested in learning languages.",examplePt:'Tenho interesse em aprender idiomas.',tip:'Depois de “in”, substantivo ou verbo com -ing.'},
  {id:'im-good-at',expression:"I'm good at…",translation:'Sou bom em…',category:'Habilidade',priority:'very-common',skills:'Listening • Writing',example:"I'm good at remembering names.",examplePt:'Sou bom em lembrar nomes.',tip:'Depois de “at”, substantivo ou verbo com -ing.'},
  {id:'used-to',expression:'used to…',translation:'costumava…',category:'Passado',priority:'essential',skills:'Listening • Reading',example:'I used to play football every weekend.',examplePt:'Eu costumava jogar futebol todo fim de semana.',tip:'Descreve hábito ou situação passada que mudou.'},
  {id:'have-you-ever',expression:'Have you ever…?',translation:'Você já…?',category:'Experiência',priority:'essential',skills:'Listening • Speaking',example:'Have you ever visited another country?',examplePt:'Você já visitou outro país?',tip:'Sinal forte de present perfect para experiência de vida.'},
  {id:'ive-never',expression:"I've never…",translation:'Eu nunca…',category:'Experiência',priority:'essential',skills:'Listening • Writing',example:"I've never tried Japanese food.",examplePt:'Eu nunca experimentei comida japonesa.',tip:'Também aparece com present perfect.'},
  {id:'going-to',expression:'be going to…',translation:'ir / pretender…',category:'Planos',priority:'essential',skills:'Listening • Writing',example:"We're going to visit my aunt this weekend.",examplePt:'Vamos visitar minha tia neste fim de semana.',tip:'Frequentemente indica plano ou intenção já formada.'},
  {id:'look-forward-to',expression:'look forward to…',translation:'estar ansioso por…',category:'Planos',priority:'essential',skills:'Reading • Writing',example:"I'm looking forward to seeing you.",examplePt:'Estou ansioso para ver você.',tip:'Depois de “to” aqui, use substantivo ou verbo com -ing.'},
  {id:'plan-to',expression:'plan to…',translation:'planejar / pretender…',category:'Planos',priority:'very-common',skills:'Reading • Writing',example:'We plan to leave early tomorrow.',examplePt:'Planejamos sair cedo amanhã.',tip:'Ajuda a identificar intenção futura.'},
  {id:'hope-to',expression:'hope to…',translation:'esperar / ter esperança de…',category:'Planos',priority:'very-common',skills:'Listening • Writing',example:'I hope to finish the course this year.',examplePt:'Espero terminar o curso este ano.',tip:'Diferencie expectativa de certeza.'},
  {id:'might',expression:'It might…',translation:'Talvez / pode ser que…',category:'Possibilidade',priority:'essential',skills:'Listening • Reading',example:'It might rain later.',examplePt:'Talvez chova mais tarde.',tip:'Indica possibilidade, não certeza.'},
  {id:'im-sure',expression:"I'm sure…",translation:'Tenho certeza…',category:'Certeza',priority:'very-common',skills:'Listening • Speaking',example:"I'm sure he'll call later.",examplePt:'Tenho certeza de que ele ligará mais tarde.',tip:'Marca grau alto de certeza.'},
  {id:'im-not-sure',expression:"I'm not sure…",translation:'Não tenho certeza…',category:'Incerteza',priority:'essential',skills:'Listening • Speaking',example:"I'm not sure which bus we need.",examplePt:'Não tenho certeza de qual ônibus precisamos.',tip:'Pode anteceder correção, alternativa ou dúvida.'},
  {id:'at-the-moment',expression:'at the moment',translation:'no momento',category:'Tempo',priority:'essential',skills:'Listening • Reading',example:"She's working from home at the moment.",examplePt:'Ela está trabalhando de casa no momento.',tip:'Frequentemente acompanha situação temporária.'},
  {id:'from-time-to-time',expression:'from time to time',translation:'de vez em quando',category:'Frequência',priority:'very-common',skills:'Listening • Reading',example:'We eat out from time to time.',examplePt:'Nós comemos fora de vez em quando.',tip:'Equivale a “occasionally”.'},
  {id:'once-a-week',expression:'once a week',translation:'uma vez por semana',category:'Frequência',priority:'essential',skills:'Listening • Reading',example:'I go swimming once a week.',examplePt:'Eu nado uma vez por semana.',tip:'Números e frequência são alvos comuns de distratores.'},
  {id:'as-soon-as',expression:'as soon as…',translation:'assim que…',category:'Tempo',priority:'essential',skills:'Listening • Reading',example:'Call me as soon as you arrive.',examplePt:'Ligue para mim assim que você chegar.',tip:'Marca sequência temporal imediata.'},
  {id:'in-the-end',expression:'in the end',translation:'no final / por fim',category:'Resultado',priority:'essential',skills:'Listening • Reading',example:'In the end, we decided to stay home.',examplePt:'No final, decidimos ficar em casa.',tip:'Pode revelar a decisão final depois de várias opções.'},
  {id:'at-first',expression:'at first',translation:'no começo / inicialmente',category:'Tempo',priority:'very-common',skills:'Listening • Reading',example:'At first, I thought the test was difficult.',examplePt:'No começo, achei a prova difícil.',tip:'Muitas vezes prepara uma mudança posterior.'},
  {id:'so-far',expression:'so far',translation:'até agora',category:'Tempo',priority:'very-common',skills:'Listening • Reading',example:'So far, everything has gone well.',examplePt:'Até agora, tudo correu bem.',tip:'Frequentemente aparece com present perfect.'},
  {id:'for-a-while',expression:'for a while',translation:'por um tempo',category:'Tempo',priority:'common',skills:'Listening • Reading',example:'We waited for a while before leaving.',examplePt:'Esperamos por um tempo antes de sair.',tip:'Indica duração sem precisão exata.'},
  {id:'however',expression:'however',translation:'porém / entretanto',category:'Contraste',priority:'essential',skills:'Listening • Reading • Writing',example:'The hotel was expensive. However, the service was excellent.',examplePt:'O hotel era caro. Entretanto, o serviço era excelente.',tip:'Sinal forte de contraste; preste atenção ao que vem depois.'},
  {id:'although',expression:'although…',translation:'embora…',category:'Contraste',priority:'essential',skills:'Listening • Reading • Writing',example:'Although it was raining, we went out.',examplePt:'Embora estivesse chovendo, nós saímos.',tip:'Contrasta duas ideias na mesma frase.'},
  {id:'on-the-other-hand',expression:'on the other hand…',translation:'por outro lado…',category:'Contraste',priority:'essential',skills:'Reading • Writing',example:'The flat is small. On the other hand, it is very central.',examplePt:'O apartamento é pequeno. Por outro lado, é muito central.',tip:'Apresenta outro lado de uma comparação.'},
  {id:'instead',expression:'instead',translation:'em vez disso',category:'Mudança',priority:'essential',skills:'Listening • Reading',example:'We planned to drive, but we took the train instead.',examplePt:'Planejamos ir de carro, mas pegamos o trem em vez disso.',tip:'Excelente marcador de mudança de plano.'},
  {id:'instead-of',expression:'instead of…',translation:'em vez de…',category:'Mudança',priority:'essential',skills:'Listening • Reading',example:'We walked instead of taking a taxi.',examplePt:'Fomos a pé em vez de pegar um táxi.',tip:'Depois de “of”, substantivo ou verbo com -ing.'},
  {id:'because-of',expression:'because of…',translation:'por causa de…',category:'Causa',priority:'essential',skills:'Listening • Reading • Writing',example:'The match was cancelled because of the rain.',examplePt:'A partida foi cancelada por causa da chuva.',tip:'Depois da expressão, vem normalmente substantivo ou grupo nominal.'},
  {id:'thats-why',expression:"That's why…",translation:'É por isso que…',category:'Resultado',priority:'essential',skills:'Listening • Writing',example:"I missed the bus. That's why I was late.",examplePt:'Perdi o ônibus. É por isso que me atrasei.',tip:'Introduz consequência de uma causa anterior.'},
  {id:'as-a-result',expression:'as a result…',translation:'como resultado…',category:'Resultado',priority:'very-common',skills:'Reading • Writing',example:'The road was closed. As a result, we arrived late.',examplePt:'A estrada estava fechada. Como resultado, chegamos atrasados.',tip:'Conector útil para consequência.'},
  {id:'first-of-all',expression:'first of all…',translation:'primeiramente…',category:'Sequência',priority:'very-common',skills:'Reading • Writing',example:'First of all, we need to choose a date.',examplePt:'Primeiramente, precisamos escolher uma data.',tip:'Ajuda a organizar resposta escrita.'},
  {id:'after-that',expression:'after that…',translation:'depois disso…',category:'Sequência',priority:'essential',skills:'Listening • Writing',example:'We had lunch and after that we went shopping.',examplePt:'Almoçamos e depois disso fomos às compras.',tip:'Sinaliza ordem dos acontecimentos.'},
  {id:'for-example',expression:'for example…',translation:'por exemplo…',category:'Exemplo',priority:'essential',skills:'Reading • Writing',example:'You can exercise outdoors, for example by walking.',examplePt:'Você pode se exercitar ao ar livre, por exemplo caminhando.',tip:'Indica exemplo que esclarece uma ideia geral.'},
  {id:'in-addition',expression:'in addition…',translation:'além disso…',category:'Adição',priority:'very-common',skills:'Reading • Writing',example:'The course is practical. In addition, it is free.',examplePt:'O curso é prático. Além disso, é gratuito.',tip:'Adiciona argumento sem contraste.'},
  {id:'actually',expression:'actually…',translation:'na verdade…',category:'Correção',priority:'essential',skills:'Listening • Reading',example:'I thought it started at eight, but actually it starts at nine.',examplePt:'Achei que começava às oito, mas na verdade começa às nove.',tip:'Frequentemente corrige uma suposição anterior.'},
  {id:'in-fact',expression:'in fact…',translation:'na verdade / de fato…',category:'Correção',priority:'very-common',skills:'Listening • Reading',example:'The trip was not tiring. In fact, it was quite relaxing.',examplePt:'A viagem não foi cansativa. Na verdade, foi bem relaxante.',tip:'Pode reforçar ou corrigir a ideia anterior.'},
  {id:'unfortunately',expression:'unfortunately…',translation:'infelizmente…',category:'Sinal de prova',priority:'essential',skills:'Listening • Reading',example:'Unfortunately, the last bus has already left.',examplePt:'Infelizmente, o último ônibus já saiu.',tip:'Muitas vezes introduz problema, impossibilidade ou mudança.'},
  {id:'luckily',expression:'luckily…',translation:'felizmente…',category:'Sinal de prova',priority:'very-common',skills:'Listening • Reading',example:'Luckily, we found another hotel nearby.',examplePt:'Felizmente, encontramos outro hotel perto.',tip:'Indica solução positiva após um problema.'},
  {id:'im-afraid',expression:"I'm afraid…",translation:'receio que… / infelizmente…',category:'Sinal de prova',priority:'essential',skills:'Listening • Speaking',example:"I'm afraid the shop is closed today.",examplePt:'Receio que a loja esteja fechada hoje.',tip:'Em contexto de serviço, costuma introduzir notícia negativa.'},
  {id:'by-the-way',expression:'by the way…',translation:'a propósito…',category:'Mudança',priority:'very-common',skills:'Listening • Speaking',example:'By the way, did you bring the tickets?',examplePt:'A propósito, você trouxe os ingressos?',tip:'Muda ou acrescenta tópico; pode trazer detalhe novo.'},
  {id:'the-problem-is',expression:'The problem is…',translation:'O problema é…',category:'Sinal de prova',priority:'essential',skills:'Listening • Reading',example:'The problem is that the station closes early.',examplePt:'O problema é que a estação fecha cedo.',tip:'Direciona para a dificuldade principal da situação.'},
  {id:'not-anymore',expression:'not … anymore',translation:'não … mais',category:'Mudança',priority:'essential',skills:'Listening • Reading',example:"I don't work there anymore.",examplePt:'Eu não trabalho mais lá.',tip:'Indica que uma situação verdadeira no passado deixou de ser.'},
  {id:'no-longer',expression:'no longer…',translation:'não mais…',category:'Mudança',priority:'very-common',skills:'Reading • Listening',example:'The old entrance is no longer in use.',examplePt:'A entrada antiga não é mais usada.',tip:'Paráfrase frequente de “not … anymore”.'},
  {id:'look-for',expression:'look for…',translation:'procurar…',category:'Phrasal verb',priority:'essential',skills:'Listening • Reading',example:"I'm looking for my keys.",examplePt:'Estou procurando minhas chaves.',tip:'Não confunda com “look at” ou “look after”.'},
  {id:'look-after',expression:'look after…',translation:'cuidar de…',category:'Phrasal verb',priority:'essential',skills:'Listening • Reading',example:'Can you look after the children tonight?',examplePt:'Você pode cuidar das crianças esta noite?',tip:'Paráfrase comum de “take care of”.'},
  {id:'find-out',expression:'find out…',translation:'descobrir / ficar sabendo…',category:'Phrasal verb',priority:'essential',skills:'Listening • Reading',example:'I need to find out what time the train leaves.',examplePt:'Preciso descobrir a que horas o trem sai.',tip:'Equivale muitas vezes a “discover” ou “learn information”.'},
  {id:'take-part',expression:'take part in…',translation:'participar de…',category:'Phrasal verb',priority:'essential',skills:'Reading • Listening',example:'More than 100 students took part in the event.',examplePt:'Mais de 100 alunos participaram do evento.',tip:'Paráfrase de “participate in”.'},
  {id:'take-place',expression:'take place',translation:'acontecer / ocorrer',category:'Phrasal verb',priority:'essential',skills:'Reading • Listening',example:'The meeting will take place on Friday.',examplePt:'A reunião acontecerá na sexta-feira.',tip:'Paráfrase comum de “happen”, especialmente para eventos.'},
  {id:'come-back',expression:'come back / go back',translation:'voltar / retornar',category:'Phrasal verb',priority:'essential',skills:'Listening • Reading',example:'We came back home before midnight.',examplePt:'Voltamos para casa antes da meia-noite.',tip:'Pode aparecer como paráfrase de “return”.'},
  {id:'get-to',expression:'get to…',translation:'chegar a…',category:'Phrasal verb',priority:'essential',skills:'Listening • Reading',example:'What time did you get to the airport?',examplePt:'A que horas você chegou ao aeroporto?',tip:'Paráfrase cotidiana de “arrive at/in”.'},
  {id:'carry-on',expression:'carry on…',translation:'continuar…',category:'Phrasal verb',priority:'very-common',skills:'Listening • Reading',example:'She carried on working after lunch.',examplePt:'Ela continuou trabalhando depois do almoço.',tip:'Paráfrase de “continue”.'},
  {id:'call-off',expression:'call off…',translation:'cancelar…',category:'Phrasal verb',priority:'very-common',skills:'Listening • Reading',example:'They called off the match because of the weather.',examplePt:'Eles cancelaram a partida por causa do clima.',tip:'Paráfrase importante de “cancel”.'},
  {id:'pick-up',expression:'pick up…',translation:'buscar / pegar / apanhar',category:'Phrasal verb',priority:'essential',skills:'Listening • Reading',example:"I'll pick you up at the station.",examplePt:'Vou buscar você na estação.',tip:'O sentido depende do contexto; transporte é muito comum.'},
  {id:'turn-on-off',expression:'turn on / turn off',translation:'ligar / desligar',category:'Phrasal verb',priority:'essential',skills:'Listening • Reading',example:'Please turn off your phone.',examplePt:'Por favor, desligue seu telefone.',tip:'Muito frequente em instruções.'},
  {id:'give-up',expression:'give up…',translation:'desistir / parar de…',category:'Phrasal verb',priority:'very-common',skills:'Listening • Reading',example:'He gave up smoking last year.',examplePt:'Ele parou de fumar no ano passado.',tip:'Pode significar abandonar uma atividade ou tentativa.'},
  {id:'set-off',expression:'set off',translation:'partir / sair em viagem',category:'Phrasal verb',priority:'common',skills:'Listening • Reading',example:'We set off early to avoid traffic.',examplePt:'Partimos cedo para evitar o trânsito.',tip:'Muito usado em narrativas de viagem.'},
  {id:'get-along',expression:'get along with…',translation:'dar-se bem com…',category:'Phrasal verb',priority:'common',skills:'Listening • Reading',example:'I get along well with my colleagues.',examplePt:'Eu me dou bem com meus colegas.',tip:'Refere-se a relacionamento entre pessoas.'},
  {id:'close-to',expression:'close to…',translation:'perto de…',category:'Paráfrase',priority:'essential',skills:'Reading • Listening',example:'The hotel is close to the city centre.',examplePt:'O hotel fica perto do centro da cidade.',tip:'Pode substituir “near”.'},
  {id:'not-expensive',expression:'not expensive',translation:'não caro / barato',category:'Paráfrase',priority:'very-common',skills:'Reading • Listening',example:'The restaurant is good and not expensive.',examplePt:'O restaurante é bom e não é caro.',tip:'Pode funcionar como paráfrase de “cheap”, com nuance neutra.'},
  {id:'about-around',expression:'about / around',translation:'aproximadamente / cerca de',category:'Paráfrase',priority:'essential',skills:'Listening • Reading',example:'The journey takes about two hours.',examplePt:'A viagem leva cerca de duas horas.',tip:'Em números e horários, indica aproximação.'},
  {id:'no-charge',expression:'no charge / free of charge',translation:'gratuito / sem cobrança',category:'Paráfrase',priority:'very-common',skills:'Reading • Listening',example:'Children under five can enter free of charge.',examplePt:'Crianças menores de cinco anos podem entrar gratuitamente.',tip:'Pode substituir “free” no sentido de preço.'},
  {id:'rather-than',expression:'rather than…',translation:'em vez de / ao invés de…',category:'Contraste',priority:'common',skills:'Reading • Writing',example:'We decided to walk rather than take a taxi.',examplePt:'Decidimos caminhar em vez de pegar um táxi.',tip:'Compara duas escolhas.'}
];

const priorityLabels = {
  essential: 'Essencial',
  'very-common': 'Muito comum',
  common: 'Comum'
};

const statusLabels = {
  known: 'Conheço',
  doubt: 'Tenho dúvida',
  review: 'Preciso revisar'
};

const storageKey = 'treinamentoIdiomas.b1Expressions.progress.v1';
let progress = loadProgress();
let activeCategory = 'Todas';

const grid = document.getElementById('expressionGrid');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const priorityFilter = document.getElementById('priorityFilter');
const statusFilter = document.getElementById('statusFilter');
const resultCount = document.getElementById('resultCount');
const emptyState = document.getElementById('emptyState');
const resetProgress = document.getElementById('resetProgress');

function loadProgress(){
  try{
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return saved && typeof saved === 'object' ? saved : {};
  }catch(error){
    return {};
  }
}

function saveProgress(){
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

function normalizeText(value){
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function renderCategories(){
  const categories = ['Todas', ...new Set(expressions.map(item => item.category))];
  categoryFilter.innerHTML = categories.map(category => `
    <button class="filter-chip ${category === activeCategory ? 'active' : ''}" type="button" data-category="${category}">${category}</button>
  `).join('');

  categoryFilter.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      renderCategories();
      renderExpressions();
    });
  });
}

function matchesFilters(item){
  const query = normalizeText(searchInput.value);
  const priority = priorityFilter.value;
  const status = statusFilter.value;
  const itemStatus = progress[item.id] || 'unmarked';

  const searchable = normalizeText([
    item.expression,
    item.translation,
    item.category,
    item.example,
    item.examplePt,
    item.tip,
    item.skills
  ].join(' '));

  const matchesQuery = !query || searchable.includes(query);
  const matchesCategory = activeCategory === 'Todas' || item.category === activeCategory;
  const matchesPriority = priority === 'all' || item.priority === priority;
  const matchesStatus = status === 'all' || itemStatus === status;

  return matchesQuery && matchesCategory && matchesPriority && matchesStatus;
}

function cardTemplate(item){
  const status = progress[item.id] || '';
  const buttons = Object.entries(statusLabels).map(([key,label]) => `
    <button class="status-button ${key} ${status === key ? 'active' : ''}" type="button" data-expression-id="${item.id}" data-status="${key}" aria-pressed="${status === key}">${label}</button>
  `).join('');

  return `
    <article class="expression-card" data-status="${status}">
      <div class="card-top">
        <div class="expression-main">
          <h3>${item.expression}</h3>
          <p class="translation">${item.translation}</p>
        </div>
        <span class="priority ${item.priority}">${priorityLabels[item.priority]}</span>
      </div>
      <div class="category-line">
        <span class="category-tag">${item.category}</span>
        <span class="skill-tag">${item.skills}</span>
      </div>
      <div class="example-box">
        <span>Exemplo</span>
        <p class="example-en">${item.example}</p>
        <p class="example-pt">${item.examplePt}</p>
      </div>
      <p class="tip"><strong>Na prova:</strong> ${item.tip}</p>
      <div>
        <div class="status-label">Meu domínio</div>
        <div class="status-actions">${buttons}</div>
      </div>
    </article>
  `;
}

function renderExpressions(){
  const filtered = expressions.filter(matchesFilters);
  grid.innerHTML = filtered.map(cardTemplate).join('');
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'itens'}`;
  emptyState.hidden = filtered.length !== 0;

  grid.querySelectorAll('[data-expression-id]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.expressionId;
      const nextStatus = button.dataset.status;
      progress[id] = progress[id] === nextStatus ? undefined : nextStatus;
      if(!progress[id]) delete progress[id];
      saveProgress();
      updateStats();
      renderExpressions();
    });
  });
}

function updateStats(){
  const total = expressions.length;
  const values = Object.values(progress);
  const known = values.filter(value => value === 'known').length;
  const doubt = values.filter(value => value === 'doubt').length;
  const review = values.filter(value => value === 'review').length;
  const knownPct = total ? Math.round((known / total) * 100) : 0;

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statKnown').textContent = known;
  document.getElementById('statDoubt').textContent = doubt;
  document.getElementById('statReview').textContent = review;
  document.getElementById('statKnownPct').textContent = `${knownPct}%`;
}

[searchInput, priorityFilter, statusFilter].forEach(control => {
  control.addEventListener(control === searchInput ? 'input' : 'change', renderExpressions);
});

resetProgress.addEventListener('click', () => {
  if(!Object.keys(progress).length) return;
  const confirmed = window.confirm('Deseja apagar todas as marcações de Conheço, Tenho dúvida e Preciso revisar?');
  if(!confirmed) return;
  progress = {};
  saveProgress();
  updateStats();
  renderExpressions();
});

renderCategories();
updateStats();
renderExpressions();
