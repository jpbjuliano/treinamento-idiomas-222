(() => {
  const data = window.TRAINING_DATA || {ca:[],cl:[],ee:[]};
  const $ = id => document.getElementById(id);
  const sheet = $('sheet');

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));

  function seededShuffle(items, seedText){
    let seed = 2166136261;
    for(const ch of seedText){ seed ^= ch.charCodeAt(0); seed = Math.imul(seed, 16777619); }
    const rand = () => {
      seed += 0x6D2B79F5;
      let t = seed;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    const copy = [...items];
    for(let i = copy.length - 1; i > 0; i -= 1){
      const j = Math.floor(rand() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function selectedItems(skill, version, quantity){
    const items = seededShuffle(data[skill] || [], `2122-${skill}-${version}`);
    if(quantity === 'all') return items;
    return items.slice(0, Number(quantity));
  }

  function visualHint(item){
    const descriptor = item.descriptor || item.category || 'compreensão';
    return `<span>🎯 Procure: ${escapeHtml(descriptor)}</span>`;
  }

  function optionsHtml(item){
    return `<div class="options">${(item.options || []).map((option,index) => `<div class="option">${String.fromCharCode(65+index)}. ${escapeHtml(option)}</div>`).join('')}</div>`;
  }

  function renderQuestion(item, index, skill, visualMode){
    const descriptor = visualMode ? `<span class="descriptor">${escapeHtml(item.descriptor || item.category || '')}</span>` : '';
    let body = '';
    if(skill === 'ca'){
      body = `<p class="question-text">${escapeHtml(item.question)}</p>${optionsHtml(item)}<div class="answer-line">Resposta: ______</div>`;
    }else if(skill === 'cl'){
      body = `<div class="passage">${escapeHtml(item.passage || item.text || '')}</div><p class="question-text">${escapeHtml(item.question)}</p>${optionsHtml(item)}<div class="answer-line">Resposta: ______</div>`;
    }else{
      const checklist = visualMode && item.checklist?.length ? `<div class="memory-banner"><span>💡 Checklist:</span> ${item.checklist.map(escapeHtml).join(' • ')}</div>` : '';
      body = `<div class="prompt-box"><strong>${escapeHtml(item.title || 'Writing')}</strong><br>${escapeHtml(item.prompt || '')}</div>${checklist}<div class="writing-lines"></div>`;
    }
    return `<article class="question"><div class="question-head"><span class="question-number">${index + 1}.</span>${descriptor}</div>${body}</article>`;
  }

  function renderSection(skill, items, startIndex, visualMode){
    const meta = {
      ca:{icon:'🎧',title:'Compreensão Auditiva',note:'Ouça a leitura do instrutor e marque a melhor alternativa.'},
      cl:{icon:'📖',title:'Compreensão Leitora',note:'Leia, encontre a evidência e marque a melhor alternativa.'},
      ee:{icon:'✍️',title:'Expressão Escrita',note:'Planeje, escreva e revise antes de finalizar.'}
    }[skill];
    let index = startIndex;
    const html = `<section><div class="section-title"><span class="icon">${meta.icon}</span><div><h3>${meta.title}</h3><small>${meta.note}</small></div></div>${items.map(item => renderQuestion(item,index++,skill,visualMode)).join('')}</section>`;
    return {html,next:index};
  }

  function renderKey(groups){
    const parts = [];
    for(const [skill,items] of groups){
      if(!items.length) continue;
      const label = skill === 'ca' ? '🎧 CA' : skill === 'cl' ? '📖 CL' : '✍️ EE';
      parts.push(`<h3>${label}</h3>`);
      items.forEach((item,index) => {
        if(skill === 'ee'){
          parts.push(`<div class="key-item"><strong>${index+1}. ${escapeHtml(item.title || 'Writing')}</strong><p>Checklist: ${(item.checklist || []).map(escapeHtml).join(' • ') || 'Atender integralmente ao enunciado.'}</p>${item.connectors ? `<p>Conectores úteis: ${escapeHtml(item.connectors)}</p>` : ''}</div>`);
        }else{
          const answerLetter = String.fromCharCode(65 + Number(item.answer || 0));
          const transcript = skill === 'ca' ? `<div class="script-box"><strong>Roteiro:</strong> ${escapeHtml(item.text || '')}</div>` : '';
          parts.push(`<div class="key-item"><strong>${index+1}. ${answerLetter} — ${escapeHtml((item.options || [])[item.answer] || '')}</strong>${transcript}<p>${escapeHtml(item.explanation || '')}</p></div>`);
        }
      });
    }
    return `<section class="key"><div class="section-title"><span class="icon">✅</span><h3>Gabarito do instrutor</h3></div>${parts.join('')}</section>`;
  }

  function generate(){
    const version = $('version').value;
    const quantity = $('quantity').value;
    const visualMode = $('visualMode').checked;
    const includeKey = $('includeKey').checked;
    const skills = [
      ['ca',$('skillCA').checked],['cl',$('skillCL').checked],['ee',$('skillEE').checked]
    ].filter(([,enabled]) => enabled).map(([skill]) => skill);

    const groups = skills.map(skill => [skill, selectedItems(skill,version,quantity)]);
    let counter = 0;
    const sections = [];
    groups.forEach(([skill,items]) => {
      const rendered = renderSection(skill,items,counter,visualMode);
      sections.push(rendered.html);
      counter = rendered.next;
    });

    const visualBanner = visualMode ? `<div class="memory-banner"><span>🧠 Revisão visual:</span><span>🎧 ouvir sentido</span><span>📖 procurar evidência</span><span>✍️ planejar → escrever → revisar</span></div>` : '';

    sheet.innerHTML = `<header class="sheet-header"><div><h2>Treinamento de Inglês — IPL 2-1-2-2</h2><p>Banco de questões • Versão ${escapeHtml(version)} • N2 / B1</p></div><strong>${visualMode ? 'Modo revisão' : 'Modo simulado'}</strong></header><div class="student-fields"><div class="field">Nome:</div><div class="field">Data:</div><div class="field">Turma:</div></div>${visualBanner}${sections.join('')}${includeKey ? renderKey(groups) : ''}`;
  }

  $('generateBtn').addEventListener('click', generate);
  $('printBtn').addEventListener('click', () => { generate(); window.print(); });
  ['skillCA','skillCL','skillEE','quantity','version','visualMode','includeKey'].forEach(id => $(id).addEventListener('change', generate));
  generate();
})();
