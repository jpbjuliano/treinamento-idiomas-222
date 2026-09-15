(() => {
  const visuals = {
    ca01: { icon: "🕒", title: "Doctor delayed", line1: "return at 10:15", line2: "because of an emergency", accent: "#67c7ff" },
    ca02: { icon: "🚌", title: "Travel change", line1: "car needs repairs", line2: "bus on Saturday morning", accent: "#68d6ff" },
    ca03: { icon: "📊", title: "Before the meeting", line1: "figures before noon", line2: "director meeting at 2:00", accent: "#8bc5ff" },
    ca04: { icon: "🌧️", title: "Plan B", line1: "heavy rain", line2: "gym prepared indoors", accent: "#79b8ff" },
    ca05: { icon: "🪪", title: "Check in first", line1: "front desk → badge", line2: "then room 12", accent: "#7bdcff" },
    ca06: { icon: "📚", title: "Extended hours", line1: "exam week", line2: "library until 11 p.m.", accent: "#6fc9ff" },
    ca07: { icon: "🏨", title: "Pleasant surprise", line1: "quiet room", line2: "internet fixed quickly", accent: "#76d5c8" },
    ca08: { icon: "💻", title: "Online + practical", line1: "flexibility is useful", line2: "not for every activity", accent: "#68bfff" },
    ca09: { icon: "🚆", title: "Train canceled", line1: "08:30 canceled", line2: "09:10 • platform 4", accent: "#ff8f7a" },
    ca10: { icon: "📅", title: "Arrive early", line1: "Sep 18 • 3:45 p.m.", line2: "arrive at 3:30", accent: "#ffd37d" },
    ca11: { icon: "📝", title: "Use new words", line1: "put words in sentences", line2: "review them later", accent: "#85d7b6" },
    ca12: { icon: "⚙️", title: "Slower start", line1: "faster reports", line2: "fewer crashes", accent: "#76c9ff" },
    ca13: { icon: "🦺", title: "Safety inspection", line1: "warehouse at 9:00", line2: "storage staff attend", accent: "#ffc66e" },
    ca14: { icon: "🏊", title: "Pool closes early", line1: "pool closes at 6", line2: "gym + café stay open", accent: "#61d0ff" },
    ca15: { icon: "🏠", title: "Hybrid work", line1: "2 days at home", line2: "team decisions in office", accent: "#78d4bc" },
    ca16: { icon: "🚨", title: "Incident controlled", line1: "power off • security", line2: "no injuries • reopened", accent: "#ff8e86" },
    ca17: { icon: "🏆", title: "Strong result", line1: "planning was rushed", line2: "result better than expected", accent: "#ffd56e" },
    ca18: { icon: "💡", title: "Explain why first", line1: "purpose before steps", line2: "understanding reduces resistance", accent: "#ffe27d" },
    ca19: { icon: "📽️", title: "Keep larger room", line1: "small room: no projector", line2: "video needed at the end", accent: "#8bc8ff" },
    ca20: { icon: "🎧", title: "Listen for meaning", line1: "but • however • instead", line2: "do not panic over one word", accent: "#a8b8ff" }
  };

  function escapeXml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  }

  function buildSvg(id, visual) {
    const label = id.toUpperCase();
    const icon = escapeXml(visual.icon);
    const title = escapeXml(visual.title);
    const line1 = escapeXml(visual.line1);
    const line2 = escapeXml(visual.line2);
    const accent = escapeXml(visual.accent);

    return `
      <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#17304f"/>
            <stop offset="1" stop-color="#0a1628"/>
          </linearGradient>
          <radialGradient id="glow-${id}" cx="78%" cy="18%" r="70%">
            <stop offset="0" stop-color="${accent}" stop-opacity=".28"/>
            <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="360" height="240" rx="24" fill="url(#bg-${id})"/>
        <rect width="360" height="240" rx="24" fill="url(#glow-${id})"/>
        <rect x="18" y="16" width="72" height="30" rx="15" fill="#1b3f67" stroke="${accent}" stroke-opacity=".75"/>
        <text x="54" y="37" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#ecf7ff">${label}</text>
        <circle cx="83" cy="113" r="48" fill="#0e2139" stroke="${accent}" stroke-width="2" stroke-opacity=".75"/>
        <text x="83" y="128" text-anchor="middle" font-size="48">${icon}</text>
        <text x="148" y="83" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="#f3f8ff">${title}</text>
        <rect x="148" y="96" width="166" height="3" rx="2" fill="${accent}"/>
        <text x="148" y="128" font-family="Arial,sans-serif" font-size="15" font-weight="600" fill="#d7e9fb">${line1}</text>
        <text x="148" y="153" font-family="Arial,sans-serif" font-size="15" fill="#aac5df">${line2}</text>
        <text x="22" y="215" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="1.7" fill="${accent}">VISUAL MEMORY CARD</text>
      </svg>`;
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
    figure.setAttribute("role", "img");
    figure.setAttribute("aria-label", `Apoio visual de memorização da questão ${id.toUpperCase()}: ${visual.title}.`);
    figure.title = visual.title;

    const image = document.createElement("div");
    image.className = "ca-visual-image";
    image.innerHTML = buildSvg(id, visual);
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();