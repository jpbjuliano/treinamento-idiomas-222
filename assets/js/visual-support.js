(() => {
  const visuals = {
    ca01: { sprite: 0, alt: "Recepção com atendimento e referência de horário." },
    ca02: { sprite: 1, alt: "Viajante reorganizando o meio de transporte." },
    ca03: { sprite: 2, alt: "Profissional revisando relatório antes de uma reunião." },
    ca04: { sprite: 3, alt: "Evento ao ar livre com previsão de chuva e alternativa em ambiente interno." },
    ca05: { sprite: 4, alt: "Recepção com identificação e orientação de visitante." },
    ca06: { sprite: 5, alt: "Biblioteca em horário noturno com pessoas estudando." },
    ca07: { sprite: 6, alt: "Ambiente profissional com diferentes formas de trabalho." },
    ca08: { sprite: 8, alt: "Pessoas participando de uma atividade de aprendizagem." },
    ca09: { sprite: 1, alt: "Contexto de transporte e mudança de deslocamento." },
    ca10: { sprite: 9, alt: "Pessoa em deslocamento acompanhando o horário." },
    ca11: { sprite: 5, alt: "Ambiente de estudo e revisão de conteúdo." },
    ca12: { sprite: 2, alt: "Profissional trabalhando com informações em um escritório." },
    ca13: { sprite: 4, alt: "Recepção e controle de acesso em ambiente profissional." },
    ca14: { sprite: 7, alt: "Local público temporariamente afetado por manutenção." },
    ca15: { sprite: 6, alt: "Trabalho dividido entre casa e escritório." },
    ca16: { sprite: 2, alt: "Ambiente de trabalho durante o tratamento de uma ocorrência." },
    ca17: { sprite: 8, alt: "Equipe discutindo resultados e planejamento de um projeto." },
    ca18: { sprite: 8, alt: "Equipe em processo de adaptação a uma mudança organizacional." },
    ca19: { sprite: 2, alt: "Preparação de uma reunião com recursos de apresentação." },
    ca20: { sprite: 5, alt: "Pessoa estudando estratégias de compreensão auditiva." }
  };

  const spritePosition = index => {
    const column = index % 5;
    const row = Math.floor(index / 5);
    return `${column * 25}% ${row * 100}%`;
  };

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
    image.style.backgroundPosition = spritePosition(visual.sprite);
    figure.appendChild(image);

    top.append(info, figure);
    card.insertBefore(top, card.firstChild);
    card.dataset.visualSupport = "ready";
  }

  function decorateAll() {
    Object.keys(visuals).forEach(id => {
      decorateCard(document.getElementById(`card-${id}`), id);
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
