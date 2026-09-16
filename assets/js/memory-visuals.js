(() => {
  const icons = new Map([
    ['make my own dinner','🍳'],['set my alarm','⏰'],['run errands','🛒'],['chill on the sofa','🛋️'],['have an early night','🌙'],['have a nap','😴'],['commute to work','🚲'],['sleep in','🛌'],['walk the dog','🐕'],['grab a coffee','☕']
  ]);

  document.querySelectorAll('.collocation').forEach(card => {
    const phrase = card.querySelector('strong')?.textContent.trim().toLowerCase();
    if(phrase && icons.has(phrase)) card.dataset.memoryIcon = icons.get(phrase);
  });

  document.querySelectorAll('.strategy-card').forEach(card => {
    const title = card.querySelector('h3')?.textContent || '';
    if(title.startsWith('CA')) card.classList.add('skill-ca');
    if(title.startsWith('CL')) card.classList.add('skill-cl');
    if(title.startsWith('EE')) card.classList.add('skill-ee');
  });
})();