(() => {
  window.TRAINING_DATA.ee.push(
    {
      id: "ee04",
      title: "Resumo — incidente de segurança",
      type: "resumo / notícia",
      level: "N2",
      wordGoal: "100–150 palavras",
      prompt: "A minor fire started in an office equipment room at 10:20 a.m. Employees followed the evacuation procedure, security staff isolated the area, and firefighters arrived ten minutes later. No one was injured. Write a concise summary for an internal bulletin explaining what happened, the response, and the outcome.",
      checklist: ["Fato principal logo no início", "Horário ou contexto relevante", "Ações em sequência", "Sem informação inventada", "Resultado final", "Tom objetivo"],
      connectors: "At approximately, after, immediately, as a result, no injuries were reported, finally"
    },
    {
      id: "ee05",
      title: "Instruções — preparação para atividade",
      type: "instruções",
      level: "N2",
      wordGoal: "90–130 palavras",
      prompt: "Write instructions for a colleague who will attend a training activity at a new location. Explain what documents to bring, what time to arrive, where to report first, and what to do if there is a problem.",
      checklist: ["Objetivo claro", "Documentos necessários", "Horário de chegada", "Sequência de ações", "Contato em caso de problema", "Linguagem direta e organizada"],
      connectors: "First, before, then, after that, make sure, if necessary"
    }
  );
})();
