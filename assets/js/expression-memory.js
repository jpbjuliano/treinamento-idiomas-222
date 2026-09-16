(() => {
  const categoryIcons = {
    'Opinião':'💬','Concordância':'✅','Discordância':'↔️','Sugestão':'💡','Conselho':'🧭','Obrigação':'⚠️','Pedido':'🙏','Permissão':'🔓','Oferta':'🎁','Preferência':'⭐','Interesse':'🎯','Habilidade':'🛠️','Passado':'⏪','Experiência':'🧳','Planos':'📅','Possibilidade':'❓','Certeza':'✅','Incerteza':'❔','Tempo':'⏰','Frequência':'🔁','Resultado':'➡️','Contraste':'↔️','Mudança':'🔄','Causa':'🧩','Sequência':'➡️','Exemplo':'🔎','Adição':'➕','Correção':'✏️','Sinal de prova':'🚦','Phrasal verb':'🧱','Paráfrase':'🔁'
  };

  function enhance(root=document){
    root.querySelectorAll('.expression-card').forEach(card => {
      if(card.dataset.memoryEnhanced) return;
      const tag = card.querySelector('.category-tag');
      const skill = card.querySelector('.skill-tag');
      const category = tag?.textContent.trim() || '';
      if(tag){
        const icon = categoryIcons[category] || '🧠';
        tag.innerHTML = `<span class="function-icon" aria-hidden="true">${icon}</span>${tag.textContent}`;
      }
      if(skill){
        const strip = document.createElement('div');
        strip.className = 'memory-strip';
        if(/Listening/i.test(skill.textContent)) strip.innerHTML += '<span>🎧 reconhecer pelo som</span>';
        if(/Reading/i.test(skill.textContent)) strip.innerHTML += '<span>📖 reconhecer no texto</span>';
        if(/Writing/i.test(skill.textContent)) strip.innerHTML += '<span>✍️ reutilizar ao escrever</span>';
        if(/Speaking/i.test(skill.textContent)) strip.innerHTML += '<span>🗣️ usar em interação</span>';
        card.querySelector('.category-line')?.after(strip);
      }
      card.dataset.memoryEnhanced = 'true';
    });
  }

  enhance();
  const grid = document.getElementById('expressionGrid');
  if(grid) new MutationObserver(() => enhance(grid)).observe(grid,{childList:true,subtree:true});
})();