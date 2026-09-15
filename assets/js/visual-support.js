(() => {
  const visuals = {
    ca01: { label: "CA01", title: "Horário e atraso", icon: "🕒", note: "doctor delayed • return 10:15" },
    ca02: { label: "CA02", title: "Mudança de transporte", icon: "🚌", note: "car repair • bus Saturday" },
    ca03: { label: "CA03", title: "Revisar antes da reunião", icon: "📊", note: "figures before noon • meeting at 2" },
    ca04: { label: "CA04", title: "Plano alternativo", icon: "🌧️", note: "outdoor ceremony • gym ready" },
    ca05: { label: "CA05", title: "Sequência de acesso", icon: "🪪", note: "front desk • badge • room 12" },
    ca06: { label: "CA06", title: "Horário estendido", icon: "📚", note: "exam week • library until 11 p.m." },
    ca07: { label: "CA07", title: "Avaliação positiva", icon: "🏨", note: "quiet room • internet fixed" },
    ca08: { label: "CA08", title: "Online x prática", icon: "💻", note: "flexibility • practical activities" },
    ca09: { label: "CA09", title: "Trem cancelado", icon: "🚆", note: "8:30 canceled • 9:10 platform 4" },
    ca10: { label: "CA10", title: "Chegar antes", icon: "📅", note: "Sep 18 • 3:45 • arrive 15 min early" },
    ca11: { label: "CA11", title: "Vocabulário em uso", icon: "📝", note: "new words • sentences • review later" },
    ca12: { label: "CA12", title: "Mais lento, mais estável", icon: "⚙️", note: "slower start • faster reports" },
    ca13: { label: "CA13", title: "Inspeção às 9", icon: "🦺", note: "storage staff • loading entrance" },
    ca14: { label: "CA14", title: "Fechamento antecipado", icon: "🏊", note: "pool closes at 6 • gym open" },
    ca15: { label: "CA15", title: "Trabalho híbrido", icon: "🏠", note: "2 days home • team in office" },
    ca16: { label: "CA16", title: "Incidente controlado", icon: "🚨", note: "power off • no injuries • reopened" },
    ca17: { label: "CA17", title: "Resultado bom, plano ruim", icon: "🏆", note: "rushed planning • strong result" },
    ca18: { label: "CA18", title: "Explicar o porquê", icon: "💡", note: "purpose first • then technical steps" },
    ca19: { label: "CA19", title: "Sala com projetor", icon: "📽️", note: "smaller room • no projector" },
    ca20: { label: "CA20", title: "Ouça o sentido", icon: "🎧", note: "but • however • instead" }
  };

  function escapeXml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  }

  function svgData(visual) {
    const label = escapeXml(visual.label);
    const title = escapeXml(visual.title);
    const note = escapeXml(visual.note);
    const icon = escapeXml(visual.icon);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 300">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#12253f"/>
          <stop offset="1" stop-color="#0a1526"/>
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#55b8ff"/>
          <stop offset="1" stop-color="#79e1ff"/>
        </linearGradient>
      </defs>
      <rect width="460" height="300" rx="28" fill="url(#bg)"/>
      <circle cx="365" cy="76" r="92" fill="#17385a" opacity=".55"/>
      <circle cx="398" cy="228" r="118" fill="#0d2b49" opacity=".5"/>
      <rect x="24" y="24" width="74" height="34" rx="17" fill="#183a61" stroke="#4b96d1"/>
      <text x="61" y="47" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#dff3ff">${label}</text>
      <text x="34" y="138" font-family="Arial,sans-serif" font-size="72">${icon}</text>
      <text x="132" y="125" font-family="Arial,sans-serif" font-size="27" font-weight="700" fill="#f2f8ff">${title}</text>
      <rect x="132" y="143" width="260" height="4" rx="2" fill="url(#glow)"/>
      <text x="132" y="178" font-family="Arial,sans-serif" font-size="18" fill="#b9d3ec">${note}</text>
      <text x="34" y="260" font-family="Arial,sans-serif" font-size="15" fill="#67c7ff" letter-spacing="2">APOIO VISUAL • MEMORIZAÇÃO</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function decorateCard(card, id) {
    if (!card || card.dataset.visualSupport === "ready") return;
    const visual = visuals[id];
    if (!visual) return;

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
    const image = document.createElement("img");
    image.className = "ca-visual-img";
    image.src = svgData(visual);
    image.alt = visual.title;
    figure.appendChild(image);

    top.append(info, figure);
    card.insertBefore(top, card.firstChild);
    card.dataset.visualSupport = "ready";
  }

  function decorateAll() {
    Object.keys(visuals).forEach(id => decorateCard(document.getElementById(`card-${id}`), id));
  }

  function start() {
    const container = document.getElementById("caContent");
    if (!container) return;
    decorateAll();
    const observer = new MutationObserver(() => window.requestAnimationFrame(decorateAll));
    observer.observe(container, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
