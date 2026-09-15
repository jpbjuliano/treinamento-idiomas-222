(() => {
  const VERSION = "20260915-7";

  const visuals = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    return {
      id: `ca${String(number).padStart(2, "0")}`,
      row: Math.floor(index / 5) + 1,
      column: index % 5,
      alt: `Card aprovado de memorização da questão CA${String(number).padStart(2, "0")}.`
    };
  });

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

    const viewport = document.createElement("div");
    viewport.className = "ca-visual-image";

    const img = document.createElement("img");
    img.className = "ca-visual-strip";
    img.src = new URL(`assets/img/audio/ca-row-${visual.row}.webp?v=${VERSION}`, document.baseURI).href;
    img.alt = visual.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.style.transform = `translateX(-${visual.column * 20}%)`;

    viewport.appendChild(img);
    figure.appendChild(viewport);
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