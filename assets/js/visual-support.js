(() => {
  const visuals = {
    ca01: { scene: "medical", alt: "Recepção com atendimento e referência de horário." },
    ca02: { scene: "travel", alt: "Viajante reorganizando o meio de transporte." },
    ca03: { scene: "office", alt: "Profissional revisando relatório antes de uma reunião." },
    ca04: { scene: "rain", alt: "Evento ao ar livre com previsão de chuva e alternativa em ambiente interno." },
    ca05: { scene: "reception", alt: "Recepção com identificação e orientação de visitante." },
    ca06: { scene: "library", alt: "Biblioteca em horário noturno com pessoas estudando." },
    ca07: { scene: "hotel", alt: "Ambiente de hospedagem e atendimento ao visitante." },
    ca08: { scene: "hybrid", alt: "Aprendizagem dividida entre ambiente presencial e remoto." },
    ca09: { scene: "travel", alt: "Contexto de transporte e mudança de deslocamento." },
    ca10: { scene: "clock", alt: "Compromisso com atenção ao horário de chegada." },
    ca11: { scene: "library", alt: "Ambiente de estudo e revisão de conteúdo." },
    ca12: { scene: "office", alt: "Profissional trabalhando com informações em um escritório." },
    ca13: { scene: "reception", alt: "Recepção e controle de acesso em ambiente profissional." },
    ca14: { scene: "maintenance", alt: "Local público temporariamente afetado por manutenção." },
    ca15: { scene: "hybrid", alt: "Trabalho dividido entre casa e escritório." },
    ca16: { scene: "incident", alt: "Ambiente de trabalho durante o tratamento de uma ocorrência." },
    ca17: { scene: "project", alt: "Equipe discutindo resultados e planejamento de um projeto." },
    ca18: { scene: "project", alt: "Equipe em processo de adaptação a uma mudança organizacional." },
    ca19: { scene: "meeting", alt: "Preparação de uma reunião com recursos de apresentação." },
    ca20: { scene: "library", alt: "Pessoa estudando estratégias de compreensão auditiva." }
  };

  const base = (body, accent = "#59b5ff") => `
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#172a43"/><stop offset="1" stop-color="#0a1526"/>
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#83d3ff" stop-opacity=".38"/><stop offset="1" stop-color="#2c70a8" stop-opacity=".08"/>
        </linearGradient>
      </defs>
      <rect width="300" height="200" rx="16" fill="url(#bg)"/>
      <circle cx="254" cy="34" r="54" fill="${accent}" opacity=".08"/>
      <rect x="15" y="15" width="270" height="170" rx="13" fill="none" stroke="#315176"/>
      ${body}
    </svg>`;

  function sceneSvg(scene) {
    const person = (x, y, shirt = "#3f8fd2") => `
      <circle cx="${x}" cy="${y}" r="12" fill="#f1b08c"/>
      <path d="M${x-18} ${y+45} Q${x} ${y+22} ${x+18} ${y+45} L${x+14} ${y+66} H${x-14}Z" fill="${shirt}"/>
      <path d="M${x-8} ${y-8} Q${x} ${y-19} ${x+11} ${y-8}" fill="none" stroke="#10233b" stroke-width="7" stroke-linecap="round"/>`;

    const clock = (cx, cy, r = 27) => `
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#f4fbff" stroke="#5dbdff" stroke-width="4"/>
      <path d="M${cx} ${cy} V${cy-r+9} M${cx} ${cy} L${cx+r-9} ${cy+7}" stroke="#173a62" stroke-width="4" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="3" fill="#173a62"/>`;

    switch (scene) {
      case "medical": return base(`
        <rect x="28" y="112" width="244" height="48" rx="8" fill="#1c4d76"/>
        <rect x="198" y="56" width="42" height="42" rx="9" fill="#eaf8ff"/><rect x="216" y="64" width="7" height="26" fill="#4aa9e8"/><rect x="207" y="74" width="26" height="7" fill="#4aa9e8"/>
        ${person(82,88,"#315d91")}${person(177,86,"#2d6f9f")}${clock(248,58,25)}
        <rect x="128" y="110" width="62" height="22" rx="5" fill="#0b2036"/><rect x="135" y="115" width="48" height="12" rx="3" fill="#5fbef5" opacity=".5"/>`);
      case "travel": return base(`
        <path d="M22 150 H278" stroke="#5b7c9f" stroke-width="4"/>
        <rect x="178" y="86" width="88" height="48" rx="9" fill="#2f8dcc"/><circle cx="195" cy="138" r="8" fill="#07121f"/><circle cx="247" cy="138" r="8" fill="#07121f"/><rect x="186" y="94" width="30" height="16" rx="3" fill="#a8dfff"/><rect x="220" y="94" width="34" height="16" rx="3" fill="#a8dfff"/>
        <path d="M38 126 Q44 105 62 105 H101 Q116 106 124 126 Z" fill="#3e79b0"/><circle cx="58" cy="130" r="8" fill="#07121f"/><circle cx="106" cy="130" r="8" fill="#07121f"/>
        ${person(147,88,"#345d8f")}<rect x="137" y="137" width="28" height="33" rx="5" fill="#1d4268"/><path d="M151 137 V126" stroke="#8acfff" stroke-width="3"/>
        <path d="M73 62 l55 14 -16 6 -18-3 -9 10 -6-2 5-12 -20-6z" fill="#69c8ff"/>`);
      case "office": return base(`
        <rect x="31" y="128" width="238" height="30" rx="6" fill="#173b5e"/>
        ${person(83,79,"#e8eef7")}<rect x="117" y="105" width="63" height="43" rx="5" fill="#0b2036"/><rect x="124" y="111" width="49" height="28" rx="3" fill="#6bc4f3" opacity=".45"/>
        <path d="M61 103 h50 l-7 32 H68z" fill="#eff8ff"/><path d="M76 113 h21 M76 120 h15 M76 128 h24" stroke="#4e92c4" stroke-width="3"/>
        ${clock(235,56,25)}`);
      case "rain": return base(`
        <path d="M25 112 H162 V161 H25Z" fill="#224e73"/><path d="M44 111 V82 H142 V111" fill="#2d6d9d"/>
        <path d="M194 77 H272 V159 H194Z" fill="#254b70"/><path d="M208 77 V58 H258 V77" fill="#417ca7"/>
        <path d="M36 45 Q55 24 75 43 Q91 24 111 43 Q124 42 132 55 Q122 67 105 67 H48 Q34 64 36 45" fill="#687f9a"/>
        <path d="M48 76 l-8 18 M70 76 l-8 18 M94 76 l-8 18 M118 76 l-8 18" stroke="#74c8ff" stroke-width="4"/>
        <path d="M163 106 L194 106" stroke="#65c6ff" stroke-width="5" marker-end="url(#none)"/><path d="M184 97 l12 9 -12 9" fill="none" stroke="#65c6ff" stroke-width="4"/>
        <circle cx="232" cy="110" r="20" fill="#e8f5ff" opacity=".12"/>`);
      case "reception": return base(`
        <rect x="30" y="116" width="240" height="43" rx="7" fill="#1f4d73"/>
        ${person(80,88,"#345d8f")}${person(177,86,"#2c739e")}
        <rect x="120" y="76" width="44" height="29" rx="4" fill="#edf8ff" transform="rotate(-7 142 90)"/><circle cx="132" cy="87" r="6" fill="#4c95c8"/><path d="M143 84 h13 M143 91 h10 M126 99 h29" stroke="#4c95c8" stroke-width="2"/>
        <rect x="210" y="47" width="40" height="47" rx="6" fill="#183a58"/><circle cx="230" cy="62" r="7" fill="#67c5fb"/><path d="M218 79 Q230 68 242 79" fill="#67c5fb"/>`);
      case "library": return base(`
        <rect x="24" y="39" width="58" height="119" rx="4" fill="#183854"/><rect x="218" y="39" width="58" height="119" rx="4" fill="#183854"/>
        ${[49,73,97,121].map(y=>`<path d="M30 ${y} H76 M224 ${y} H270" stroke="#5b90b9" stroke-width="5"/>`).join("")}
        <circle cx="150" cy="41" r="19" fill="#fff1b7" opacity=".88"/>
        <rect x="93" y="130" width="114" height="24" rx="5" fill="#234e72"/>${person(121,105,"#304c73")}${person(181,105,"#304c73")}
        <path d="M105 131 h33 M164 131 h33" stroke="#e4f4ff" stroke-width="4"/>`);
      case "hybrid": return base(`
        <rect x="24" y="47" width="104" height="108" rx="10" fill="#173956"/><path d="M24 91 H128" stroke="#4d87af" stroke-width="3"/>${person(75,82,"#3a7daf")}
        <rect x="172" y="47" width="104" height="108" rx="10" fill="#173956"/>${person(224,82,"#2d6f9f")}
        <path d="M129 100 H171" stroke="#65c6ff" stroke-width="4" stroke-dasharray="5 5"/><circle cx="150" cy="100" r="10" fill="#65c6ff" opacity=".25"/>
        <rect x="50" y="123" width="51" height="22" rx="3" fill="#0b2036"/><rect x="199" y="123" width="51" height="22" rx="3" fill="#0b2036"/>`);
      case "hotel": return base(`
        <rect x="26" y="47" width="248" height="111" rx="10" fill="#173956"/><rect x="48" y="68" width="75" height="63" rx="5" fill="#315a80"/><rect x="55" y="76" width="61" height="30" rx="4" fill="#aacbe2"/><rect x="151" y="78" width="89" height="45" rx="5" fill="#224d71"/>
        ${person(201,94,"#2f779f")}<circle cx="143" cy="96" r="5" fill="#ffd87a"/><path d="M143 96 H163" stroke="#ffd87a" stroke-width="4"/>`);
      case "clock": return base(`${clock(150,91,55)}<path d="M54 153 H246" stroke="#315176" stroke-width="5"/><circle cx="86" cy="153" r="8" fill="#63c5ff"/><circle cx="214" cy="153" r="8" fill="#63c5ff"/>`);
      case "maintenance": return base(`
        <rect x="42" y="53" width="122" height="101" rx="7" fill="#214a6c"/><path d="M42 80 H164" stroke="#5189b3" stroke-width="5"/><path d="M73 53 V154 M133 53 V154" stroke="#5189b3" stroke-width="4"/>
        <path d="M210 55 l24 24 -15 15 -24-24z M188 102 l36 36" fill="none" stroke="#77c9fb" stroke-width="10" stroke-linecap="round"/><circle cx="235" cy="149" r="13" fill="none" stroke="#77c9fb" stroke-width="7"/>`);
      case "incident": return base(`
        <rect x="41" y="55" width="128" height="99" rx="7" fill="#214a6c"/><path d="M83 134 C69 115 83 103 73 88 C94 94 98 109 92 120 C111 109 122 127 112 139Z" fill="#ff9d5c"/><path d="M180 135 L214 101 L246 133" fill="none" stroke="#65c6ff" stroke-width="6"/><circle cx="214" cy="86" r="20" fill="#65c6ff" opacity=".16"/><path d="M214 77 V91 M214 99 v3" stroke="#65c6ff" stroke-width="5" stroke-linecap="round"/>`);
      case "project": return base(`
        ${person(72,104,"#326b98")}${person(150,104,"#3b82b4")}${person(228,104,"#326b98")}
        <rect x="86" y="44" width="128" height="52" rx="7" fill="#eaf7ff"/><path d="M101 78 l22-17 22 8 24-20 26 13" fill="none" stroke="#318dca" stroke-width="5"/><circle cx="123" cy="61" r="4" fill="#318dca"/><circle cx="169" cy="49" r="4" fill="#318dca"/>`);
      case "meeting": return base(`
        <rect x="55" y="128" width="190" height="26" rx="6" fill="#244c70"/>${person(85,99,"#315d91")}${person(150,99,"#3c7fab")}${person(215,99,"#315d91")}
        <rect x="95" y="42" width="110" height="49" rx="6" fill="#ecf8ff"/><rect x="109" y="55" width="14" height="23" fill="#5cbcf0"/><rect x="132" y="63" width="14" height="15" fill="#3e91c8"/><rect x="155" y="50" width="14" height="28" fill="#2e70a4"/><rect x="178" y="59" width="14" height="19" fill="#72caf5"/>`);
      default: return base(`${person(150,91)}${clock(231,62,23)}`);
    }
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
    figure.setAttribute("aria-label", visual.alt);
    figure.title = visual.alt;

    const image = document.createElement("div");
    image.className = "ca-visual-image";
    image.innerHTML = sceneSvg(visual.scene);
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
