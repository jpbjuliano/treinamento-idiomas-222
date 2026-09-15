(() => {
  const visuals = {
    ca01: { scene:"doctor", title:"Doctor delayed", cue:"Emergency → return at 10:15", accent:"#67c7ff" },
    ca02: { scene:"travel", title:"Travel change", cue:"Car repair → bus Saturday morning", accent:"#68d6ff" },
    ca03: { scene:"report", title:"Before the meeting", cue:"Figures before noon → meeting at 2", accent:"#8bc5ff" },
    ca04: { scene:"rain", title:"Plan B", cue:"Heavy rain → gym prepared", accent:"#79b8ff" },
    ca05: { scene:"badge", title:"Check in first", cue:"Front desk → badge → room 12", accent:"#7bdcff" },
    ca06: { scene:"library", title:"Extended hours", cue:"Exam week → library until 11 p.m.", accent:"#6fc9ff" },
    ca07: { scene:"hotel", title:"Pleasant surprise", cue:"Quiet room + internet fixed quickly", accent:"#76d5c8" },
    ca08: { scene:"online", title:"Online + practical", cue:"Flexible, but not for every activity", accent:"#68bfff" },
    ca09: { scene:"train", title:"Train canceled", cue:"08:30 canceled → 09:10 platform 4", accent:"#ff8f7a" },
    ca10: { scene:"calendar", title:"Arrive early", cue:"Sep 18 • 3:45 p.m. → arrive 3:30", accent:"#ffd37d" },
    ca11: { scene:"words", title:"Use new words", cue:"Sentence → review later → remember", accent:"#85d7b6" },
    ca12: { scene:"software", title:"Slower start", cue:"Faster reports + fewer crashes", accent:"#76c9ff" },
    ca13: { scene:"safety", title:"Safety inspection", cue:"Warehouse 9:00 • storage staff", accent:"#ffc66e" },
    ca14: { scene:"pool", title:"Pool closes early", cue:"Pool 6 p.m. • gym + café open", accent:"#61d0ff" },
    ca15: { scene:"hybrid", title:"Hybrid work", cue:"2 days home • team decisions together", accent:"#78d4bc" },
    ca16: { scene:"incident", title:"Incident controlled", cue:"Power off → security → no injuries", accent:"#ff8e86" },
    ca17: { scene:"result", title:"Strong result", cue:"Rushed planning • better result", accent:"#ffd56e" },
    ca18: { scene:"change", title:"Explain why first", cue:"Purpose before steps → less resistance", accent:"#ffe27d" },
    ca19: { scene:"projector", title:"Keep larger room", cue:"Small room: no projector • video needed", accent:"#8bc8ff" },
    ca20: { scene:"listen", title:"Listen for meaning", cue:"but • however • instead", accent:"#a8b8ff" }
  };

  const esc = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

  function sceneMarkup(type, accent) {
    const common = `stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
    const faint = `fill="${accent}" fill-opacity=".12" stroke="${accent}" stroke-opacity=".72" stroke-width="4"`;
    const white = '#eaf5ff';
    switch (type) {
      case 'doctor': return `<circle cx="105" cy="126" r="42" ${faint}/><path d="M105 103v46M82 126h46" ${common}/><circle cx="184" cy="96" r="26" ${common}/><path d="M184 96l13-9M184 96v-15" ${common}/><path d="M156 154h74" ${common}/>`;
      case 'travel': return `<rect x="56" y="112" width="118" height="54" rx="12" ${faint}/><circle cx="83" cy="174" r="14" ${common}/><circle cx="148" cy="174" r="14" ${common}/><path d="M72 112l22-26h45l24 26M194 139h76M246 120l24 19-24 19" ${common}/>`;
      case 'report': return `<rect x="62" y="75" width="92" height="112" rx="8" ${faint}/><path d="M84 148v-34M107 148v-52M130 148v-24" ${common}/><circle cx="218" cy="112" r="38" ${common}/><path d="M218 112v-23M218 112l20 11M179 174h86" ${common}/>`;
      case 'rain': return `<path d="M76 119c0-20 16-36 36-36 14 0 27 8 33 20 5-3 11-5 18-5 18 0 32 14 32 32 0 2 0 4-1 6H76c-13 0-24-10-24-23 0-12 10-22 24-22" ${faint}/><path d="M92 149l-10 21M128 149l-10 21M164 149l-10 21" ${common}/><rect x="208" y="104" width="64" height="68" rx="8" ${faint}/><path d="M220 172v-34h40v34" ${common}/>`;
      case 'badge': return `<rect x="64" y="76" width="92" height="118" rx="12" ${faint}/><circle cx="110" cy="115" r="22" ${common}/><path d="M82 165c8-23 48-23 56 0M110 76V56" ${common}/><path d="M185 135h86M247 113l24 22-24 22" ${common}/><text x="200" y="96" font-family="Arial" font-size="20" fill="${white}">ROOM 12</text>`;
      case 'library': return `<path d="M57 76h26v118H57zM92 91h31v103H92zM132 66h27v128h-27z" ${faint}/><path d="M45 194h130" ${common}/><circle cx="232" cy="125" r="42" ${common}/><path d="M232 125V96M232 125l20 14" ${common}/><text x="204" y="187" font-family="Arial" font-size="18" fill="${white}">11 PM</text>`;
      case 'hotel': return `<rect x="54" y="132" width="122" height="50" rx="8" ${faint}/><rect x="66" y="103" width="52" height="29" rx="6" ${faint}/><path d="M54 101v92M176 132v61" ${common}/><path d="M209 92c34 0 34 52 0 52M230 82c49 0 49 72 0 72" ${common}/><path d="M205 177l17 17 34-42" ${common}/>`;
      case 'online': return `<rect x="57" y="78" width="124" height="82" rx="8" ${faint}/><path d="M89 181h60M119 160v21" ${common}/><circle cx="233" cy="117" r="35" ${faint}/><path d="M221 117l9 9 18-22" ${common}/><path d="M187 164l76-92" stroke="#ffb36e" stroke-width="5"/>`;
      case 'train': return `<rect x="54" y="78" width="126" height="94" rx="18" ${faint}/><rect x="76" y="96" width="37" height="28" rx="5" ${common}/><rect x="122" y="96" width="37" height="28" rx="5" ${common}/><circle cx="84" cy="177" r="12" ${common}/><circle cx="150" cy="177" r="12" ${common}/><path d="M207 94l58 58M265 94l-58 58" stroke="#ff8f7a" stroke-width="8"/><text x="202" y="187" font-family="Arial" font-size="17" fill="${white}">09:10 • P4</text>`;
      case 'calendar': return `<rect x="56" y="76" width="120" height="112" rx="12" ${faint}/><path d="M56 108h120M84 62v27M148 62v27" ${common}/><text x="88" y="159" font-family="Arial" font-size="34" font-weight="700" fill="${white}">18</text><circle cx="230" cy="128" r="42" ${common}/><path d="M230 128v-26M230 128l20 13" ${common}/>`;
      case 'words': return `<rect x="58" y="78" width="118" height="112" rx="10" ${faint}/><path d="M80 108h72M80 132h58M80 156h66" ${common}/><path d="M211 89l40 40-40 40" ${common}/><path d="M191 129h60" ${common}/><path d="M248 181c-38 22-73 6-79-16" stroke="#85d7b6" stroke-width="4" fill="none"/>`;
      case 'software': return `<rect x="52" y="77" width="133" height="96" rx="10" ${faint}/><path d="M78 145v-29M104 145V98M130 145v-18M156 145V91" ${common}/><circle cx="235" cy="124" r="35" ${faint}/><path d="M235 93v62M204 124h62M212 101l46 46M258 101l-46 46" ${common}/>`;
      case 'safety': return `<path d="M63 141c0-40 24-68 58-68s58 28 58 68" ${faint}/><path d="M53 141h136M121 75v66" ${common}/><rect x="210" y="95" width="62" height="82" rx="8" ${faint}/><path d="M222 119h38M222 143h30" ${common}/><text x="219" y="195" font-family="Arial" font-size="16" fill="${white}">09:00</text>`;
      case 'pool': return `<path d="M49 156c18-16 36 16 54 0s36 16 54 0 36 16 54 0" ${common}/><circle cx="92" cy="102" r="18" ${common}/><path d="M111 118l42 21M150 139l27-23" ${common}/><circle cx="239" cy="111" r="34" ${common}/><path d="M239 111V88M239 111l20 12" ${common}/><text x="211" y="176" font-family="Arial" font-size="18" fill="${white}">6 PM</text>`;
      case 'hybrid': return `<path d="M51 128l60-50 60 50v60H51z" ${faint}/><rect x="83" y="139" width="57" height="34" rx="5" ${common}/><path d="M198 93h76v80h-76zM215 173v18M257 173v18M207 191h59" ${faint}/><path d="M171 132h27" ${common}/>`;
      case 'incident': return `<rect x="55" y="87" width="104" height="91" rx="10" ${faint}/><path d="M76 112h62M78 144h56" ${common}/><path d="M196 151c-20-30 12-39 2-67 35 25 45 57 22 85" stroke="#ff8e86" stroke-width="6" fill="none"/><path d="M236 106l36 36M272 106l-36 36" ${common}/>`;
      case 'result': return `<path d="M90 74h88v30c0 49-44 78-44 78s-44-29-44-78z" ${faint}/><path d="M90 91H64c0 32 19 50 48 50M178 91h26c0 32-19 50-48 50M134 182v19M103 201h62" ${common}/><path d="M221 162l18-18 16 13 27-37" ${common}/>`;
      case 'change': return `<circle cx="112" cy="114" r="42" ${faint}/><path d="M98 113h28M112 99v28" ${common}/><path d="M112 157v20M91 177h42" ${common}/><path d="M185 96h86M247 74l24 22-24 22" ${common}/><text x="202" y="151" font-family="Arial" font-size="18" fill="${white}">WHY?</text>`;
      case 'projector': return `<rect x="54" y="79" width="126" height="80" rx="9" ${faint}/><path d="M83 190l34-31 34 31M117 159v31" ${common}/><rect x="207" y="95" width="65" height="45" rx="7" ${faint}/><circle cx="256" cy="117" r="10" ${common}/><path d="M221 153h37M239 140v13" ${common}/>`;
      case 'listen': return `<path d="M64 135c0-42 29-70 67-70s67 28 67 70" ${common}/><rect x="55" y="126" width="29" height="57" rx="12" ${faint}/><rect x="178" y="126" width="29" height="57" rx="12" ${faint}/><path d="M223 94h49M223 125h49M223 156h49" ${common}/><text x="221" y="201" font-family="Arial" font-size="14" fill="${white}">but • however • instead</text>`;
      default: return `<circle cx="130" cy="126" r="54" ${faint}/><path d="M105 126h50M130 101v50" ${common}/>`;
    }
  }

  function buildSvg(id, visual) {
    const accent = esc(visual.accent);
    const title = esc(visual.title);
    const cue = esc(visual.cue);
    return `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
        <defs>
          <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#142944"/>
            <stop offset="1" stop-color="#091321"/>
          </linearGradient>
          <radialGradient id="glow-${id}" cx="82%" cy="10%" r="85%">
            <stop offset="0" stop-color="${accent}" stop-opacity=".26"/>
            <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="300" rx="24" fill="url(#bg-${id})"/>
        <rect width="400" height="300" rx="24" fill="url(#glow-${id})"/>
        <rect x="18" y="18" width="68" height="30" rx="15" fill="#17395d" stroke="${accent}" stroke-opacity=".7"/>
        <text x="52" y="39" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="#f2f8ff">${id.toUpperCase()}</text>
        <g transform="translate(18,38)">${sceneMarkup(visual.scene, accent)}</g>
        <rect x="22" y="229" width="356" height="51" rx="12" fill="#07111e" fill-opacity=".72" stroke="${accent}" stroke-opacity=".22"/>
        <text x="38" y="250" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#f3f8ff">${title}</text>
        <text x="38" y="270" font-family="Arial,sans-serif" font-size="13" fill="#bad0e7">${cue}</text>
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
    figure.setAttribute("aria-label", `Card visual de memorização ${id.toUpperCase()}: ${visual.title}. ${visual.cue}`);

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
    new MutationObserver(() => window.requestAnimationFrame(decorateAll))
      .observe(container, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();