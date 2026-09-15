window.TRAINING_DATA = {
  ca: [
    {
      id: "ca01",
      category: "informação específica",
      text: "Good morning, Mr. Parker. The doctor is running about twenty minutes late because of an emergency. You can wait here, or if you prefer, you may return at ten fifteen. We apologize for the delay.",
      question: "Why will Mr. Parker return at 10:15?",
      options: [
        "He arrived on the wrong day.",
        "The doctor is delayed.",
        "He needs to buy coffee.",
        "The office opens at 10:15."
      ],
      answer: 1,
      explanation: "A informação decisiva é 'the doctor is running about twenty minutes late'. O horário é consequência do atraso do médico."
    },
    {
      id: "ca02",
      category: "mudança de plano",
      text: "I was planning to drive to Porto Alegre on Friday evening, but my car needs repairs. So I bought a bus ticket for Saturday morning instead. I should arrive before lunch.",
      question: "How will the speaker travel to Porto Alegre?",
      options: [
        "By car on Friday evening.",
        "By plane on Saturday.",
        "By bus on Saturday morning.",
        "By car on Saturday morning."
      ],
      answer: 2,
      explanation: "A palavra 'but' cancela o plano inicial. A decisão final aparece em 'I bought a bus ticket for Saturday morning instead'."
    },
    {
      id: "ca03",
      category: "finalidade",
      text: "Please send me the updated figures before noon. I have a meeting with the director at two o'clock, and I want enough time to review the report before I present it.",
      question: "Why does the speaker want the updated figures before noon?",
      options: [
        "The report must be finished today.",
        "The director requested them in the morning.",
        "He wants to review them before a meeting.",
        "The meeting was moved to noon."
      ],
      answer: 2,
      explanation: "A relação de causa aparece em 'I want enough time to review the report before I present it'."
    },
    {
      id: "ca04",
      category: "inferência simples",
      text: "The weather forecast says heavy rain will start this afternoon. The outdoor ceremony is still scheduled for four, but the organizers have prepared the gym in case the conditions get worse.",
      question: "What can be inferred about the ceremony?",
      options: [
        "It has already been canceled.",
        "It may be moved indoors.",
        "It will start earlier than planned.",
        "Only the organizers may attend."
      ],
      answer: 1,
      explanation: "'In case the conditions get worse' indica um plano alternativo. O ginásio foi preparado para possível mudança para ambiente interno."
    },
    {
      id: "ca05",
      category: "sequência de eventos",
      text: "After you arrive at the training center, report to the front desk first. They will check your identification and give you a visitor badge. Only then should you go to room twelve for the briefing.",
      question: "What should the visitor do before going to room 12?",
      options: [
        "Attend the briefing.",
        "Call the training center.",
        "Check in at the front desk.",
        "Leave the identification at home."
      ],
      answer: 2,
      explanation: "A sequência é explícita: 'report to the front desk first' e 'Only then should you go to room twelve'."
    },
    {
      id: "ca06",
      category: "ideia principal",
      text: "The city library has extended its opening hours during exam week. From Monday to Thursday, students may use the study rooms until eleven p.m. The change is temporary and normal hours will return next Monday.",
      question: "What is the main purpose of the announcement?",
      options: [
        "To announce longer library hours during exam week.",
        "To explain how to reserve a study room.",
        "To inform students that the library will close.",
        "To advertise a new library building."
      ],
      answer: 0,
      explanation: "A ideia central está na primeira frase: horários ampliados durante a semana de provas."
    }
  ],

  cl: [
    {
      id: "cl01",
      category: "ideia principal",
      passage: "Many companies have adopted hybrid work arrangements in which employees divide their time between home and the office. Supporters say this model can reduce commuting time and give workers greater flexibility. However, managers often need to establish clear communication routines so that teams remain coordinated.",
      question: "What is the main idea of the text?",
      options: [
        "Hybrid work offers benefits but requires good coordination.",
        "Working from home is always more productive.",
        "Managers should eliminate office work completely.",
        "Commuting is the main cause of poor communication."
      ],
      answer: 0,
      explanation: "O texto apresenta vantagens do trabalho híbrido e, com 'However', acrescenta a necessidade de boa coordenação."
    },
    {
      id: "cl02",
      category: "informação específica",
      passage: "The museum will be closed on Tuesday morning for maintenance. It will reopen at 1 p.m. and remain open until 7 p.m. Visitors who bought tickets for the morning session may use the same tickets in the afternoon or request a refund online.",
      question: "What can visitors with morning tickets do?",
      options: [
        "Enter the museum before 1 p.m.",
        "Use the tickets in the afternoon or request a refund.",
        "Visit another museum for free.",
        "Use the tickets only on Wednesday."
      ],
      answer: 1,
      explanation: "A resposta aparece literalmente na última frase do texto."
    },
    {
      id: "cl03",
      category: "vocabulário em contexto",
      passage: "The new policy was introduced gradually. At first, only two departments followed the new procedure. After three months, the company expanded it to all offices because the initial results were positive.",
      question: "In the text, the word 'gradually' is closest in meaning to:",
      options: [
        "suddenly",
        "step by step",
        "secretly",
        "without planning"
      ],
      answer: 1,
      explanation: "O contexto mostra implantação por etapas: primeiro dois departamentos, depois todos os escritórios."
    },
    {
      id: "cl04",
      category: "inferência",
      passage: "Carlos left home earlier than usual because the highway was partially blocked by roadwork. Even so, he arrived at the airport only fifteen minutes before the check-in counter closed.",
      question: "What can be inferred from the text?",
      options: [
        "Carlos almost arrived too late for check-in.",
        "Carlos missed his flight because he overslept.",
        "The highway was completely closed.",
        "The airport opened fifteen minutes late."
      ],
      answer: 0,
      explanation: "Se ele chegou apenas quinze minutos antes do fechamento do balcão, esteve perto de perder o prazo."
    },
    {
      id: "cl05",
      category: "propósito",
      passage: "Employees are reminded to update their emergency contact information by September 30. To make changes, log in to the personnel portal, open the Profile section, and select Emergency Contacts. Contact Human Resources if you cannot access the portal.",
      question: "What is the purpose of the message?",
      options: [
        "To request updated emergency contact information.",
        "To announce a new Human Resources employee.",
        "To explain how to create a personnel portal.",
        "To cancel access to employee profiles."
      ],
      answer: 0,
      explanation: "A primeira frase apresenta diretamente o objetivo: atualizar os contatos de emergência até a data indicada."
    },
    {
      id: "cl06",
      category: "contraste",
      passage: "The first version of the application was easy to use, but it had several security problems. The latest version requires an extra authentication step. Although logging in now takes a little longer, the system is significantly safer.",
      question: "Which statement is correct according to the text?",
      options: [
        "The latest version is faster and less secure.",
        "The first version required extra authentication.",
        "Improved security made login slightly slower.",
        "Users can no longer access the application."
      ],
      answer: 2,
      explanation: "'Although' marca o contraste: o login demora um pouco mais, porém o sistema ficou significativamente mais seguro."
    }
  ],

  ee: [
    {
      id: "ee01",
      title: "E-mail profissional — mudança de horário",
      prompt: "You are responsible for a small team. Write an email informing the team that tomorrow's meeting has been moved from 9:00 a.m. to 2:00 p.m. Explain the reason, mention the new location, and ask everyone to confirm attendance.",
      checklist: [
        "Saudação adequada",
        "Novo horário claramente informado",
        "Motivo da mudança",
        "Novo local",
        "Pedido de confirmação",
        "Encerramento apropriado"
      ],
      connectors: "Because, therefore, however, also, please, finally"
    },
    {
      id: "ee02",
      title: "Relato curto — problema durante viagem",
      prompt: "Write a short report about a problem that occurred during a work trip. Explain what happened, what action you took, and what the final result was.",
      checklist: [
        "Contexto: quando e onde",
        "Problema apresentado claramente",
        "Uso consistente do passado",
        "Ação tomada",
        "Resultado final",
        "Parágrafos organizados"
      ],
      connectors: "First, then, because, after that, as a result, finally"
    },
    {
      id: "ee03",
      title: "Opinião — treinamento online",
      prompt: "Your organization is considering replacing some classroom courses with online training. Write a short text giving your opinion. Include at least one advantage, one possible difficulty, and your recommendation.",
      checklist: [
        "Opinião apresentada no início",
        "Uma vantagem",
        "Uma dificuldade",
        "Exemplo ou explicação",
        "Recomendação final",
        "Conectores entre as ideias"
      ],
      connectors: "In my opinion, for example, however, in addition, therefore, in conclusion"
    }
  ]
};
