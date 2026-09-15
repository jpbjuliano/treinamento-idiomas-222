(() => {
  const visuals = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    return {
      id: `ca${String(number).padStart(2, "0")}`,
      index,
      alt: `Card visual de memorização da questão CA${String(number).padStart(2, "0")}.`
    };
  });

  function spritePosition(index) {
    const column = index % 5;
    const row = Math.floor(index / 5);
    const x = column === 4 ? 100 : column * 25;
    const y = row === 3 ? 100 : row * (100 / 3);
    return `${x}% ${y}%`;
  }

  function decorateCard(card, visual) {
    if (!card || card.dataset.visualSupport === "ready") return;

    const nodes = [
      card.querySelector(":scope > .question-meta"),
      card.querySelector(":scope > .meta-tags"),
      card.querySelector(":scope > .reference-line"),
      card.querySelector(":scope > .audio-row"),
      card.querySelector(":scope > .question-title")
    ].filter(Boolean);

    if (!nodes.length) return;

    const top = document.createElement("div");
    top.className = "ca-visual-top";

    const info = document.createElement("div");
    info.className = "ca-visual-info";
    nodes.forEach(node => info.appendChild(node));

    const figure = document.createElement("figure");
    figure.className = "ca-visual-card";
    figure.setAttribute("role", "img");
    figure.setAttribute("aria-label", visual.alt);
    figure.title = visual.alt;

    const image = document.createElement("div");
    image.className = "ca-visual-image";
    image.style.backgroundPosition = spritePosition(visual.index);
    figure.appendChild(image);

    top.append(info, figure);
    card.insertBefore(top, card.firstChild);
    card.dataset.visualSupport = "ready";
  }

  function decorateAll() {
    visuals.forEach(visual => {
      decorateCard(document.getElementById(`card-${visual.id}`), visual);
    });
  }

  function start() {
    const container = document.getElementById("caContent");
    if (!container) return;

    decorateAll();

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(decorateAll);
    });
    observer.observe(container, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
