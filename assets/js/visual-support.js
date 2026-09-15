(() => {
  const SPRITE = "data:image/webp;base64,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";

  const visuals = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    return {
      id: `ca${String(number).padStart(2, "0")}`,
      index,
      alt: `Card ilustrado de memorização da questão CA${String(number).padStart(2, "0")}.`
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
    image.style.backgroundImage = `url("${SPRITE}")`;
    image.style.backgroundPosition = spritePosition(visual.index);
    figure.appendChild(image);

    top.append(info, figure);
    card.insertBefore(top, card.firstChild);
    card.dataset.visualSupport = "ready";
  }

  function decorateAll() {
    visuals.forEach(visual => decorateCard(document.getElementById(`card-${visual.id}`), visual));
  }

  function start() {
    const container = document.getElementById("caContent");
    if (!container) return;

    decorateAll();
    const observer = new MutationObserver(() => window.requestAnimationFrame(decorateAll));
    observer.observe(container, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();