# Treinamento Idiomas 222

Aplicação web estática para revisão de inglês com foco em:

- **CA — Compreensão Auditiva**
- **CL — Compreensão Leitora**
- **EE — Expressão Escrita**

O projeto foi criado para revisão direcionada ao objetivo **222**, com exercícios autorais e organização por habilidade, descritor e dificuldade.

> Importante: B1, B2 e C1 são usados apenas como referências pedagógicas de formato e dificuldade. O projeto não afirma equivalência automática entre níveis Cambridge e os índices de proficiência do Exército. A referência principal para a preparação deve continuar sendo a documentação e as orientações oficiais do CIdEx/Exército Brasileiro.

## V2 — estrutura de treinamento

O banco possui atualmente:

- **20 questões de CA**;
- **20 questões de CL**;
- **5 propostas de EE**.

As questões objetivas são divididas em três trilhas:

| Trilha | Uso recomendado | Referência de dificuldade |
|---|---|---|
| Base | Consolidar compreensão direta, detalhes, horários, avisos e instruções | B1 |
| Alvo N2 | Sessão principal de revisão para o objetivo 222 | B1–B2 / B2 |
| Desafio | Trabalhar inferência, atitude, coesão e relações mais implícitas | B2–C1 |

Também existe a opção **Banco completo**, que exibe todas as questões.

## Recursos

- Modo **Treino**, com correção e explicação imediatas.
- Modo **Simulado**, sem revelar respostas até a finalização.
- Seleção de trilha: **Base B1**, **Alvo N2**, **Desafio B2–C1** ou **Banco completo**.
- CA com síntese de voz do navegador e limite de duas reproduções por questão.
- Alternância de `en-US` e `en-GB` quando a voz correspondente estiver disponível no navegador.
- Transcrição de CA liberada somente depois da correção.
- Metadados visíveis em cada questão: nível, descritor e formato de referência.
- CL com ideia principal, informação específica, vocabulário em contexto, propósito, contraste, inferência, intenção e coesão.
- EE com e-mail, relato, opinião, resumo e instruções.
- Checklist e contador de palavras na EE.
- Cronômetro e painel de desempenho.
- **Diagnóstico por descritor**, ordenando os pontos com menor aproveitamento.
- Layout responsivo para computador e celular.
- Sem framework, servidor ou banco de dados: HTML, CSS e JavaScript puros.

## Estratégia pedagógica

### CA

A questão é apresentada sem transcrição. O aluno deve:

1. identificar a situação geral;
2. ouvir palavras de contraste, causa, sequência e mudança de plano;
3. escolher a alternativa;
4. somente após responder, consultar a explicação e, se necessário, a transcrição.

Descritores trabalhados incluem ideia principal, informação específica, finalidade, atitude do falante, opinião, inferência, contraste, sequência, causa, números/horários e resultado.

### CL

A orientação é ler primeiro a pergunta e depois localizar a evidência relevante no texto. O banco mistura mensagens curtas, avisos, textos informativos, e-mails, textos argumentativos e itens de uso lexical/gramatical em contexto.

### EE

A produção é guiada por gênero textual e checklist. O objetivo não é escrever de forma excessivamente complexa, mas produzir textos claros, coerentes, organizados e adequados à situação proposta.

## Referências de formato usadas para direcionar o projeto

Os links abaixo servem para estudar **formato de tarefa e nível de dificuldade**. As questões armazenadas neste repositório são autorais e não são cópias dessas páginas.

### B1 Preliminary

- Listening: Parts 1, 2 e 4
- Reading: Parts 1, 3, 5 e 6
- https://www.examenglish.com/PET/index.html
- https://test-english.com/exams/b1-preliminary/
- https://app.engxam.com/pet/
- https://www.flo-joe.co.uk/preliminaryenglish/

### B2 First

- Listening: Parts 1 e 4
- Reading: Parts 1, 2 e 5
- https://app.engxam.com/fce/
- https://test-english.com/exams/b2-first/
- https://www.flo-joe.co.uk/fce/students/tests/
- https://www.esl-lounge.com/student/first-certificate.php

### C1 Advanced

- Listening: Parts 1 e 3
- Reading: Parts 1, 2 e 5
- https://app.engxam.com/cae/
- https://www.flo-joe.co.uk/cae/students/tests/
- https://www.esl-lounge.com/student/advanced.php
- https://www.examenglish.com/CAE/index.php

## Estrutura

```text
.
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── v2.css
│   └── js/
│       └── app.js
└── data/
    ├── questions.js
    ├── ca-v2.js
    ├── cl-v2.js
    └── ee-v2.js
```

`questions.js` preserva a base original da V1. Os arquivos `*-v2.js` complementam e classificam o banco. Essa organização permite continuar expandindo o projeto sem reescrever o histórico anterior.

## Executar localmente

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## GitHub Pages

Em **Settings → Pages**, use:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/ (root)`

Endereço esperado:

`https://jpbjuliano.github.io/treinamento-idiomas-222/`

## Próximas evoluções

- simulados fechados com quantidade fixa de questões;
- embaralhamento de alternativas;
- histórico local de desempenho por descritor;
- áudios gravados para substituir gradualmente a síntese de voz;
- modelos de correção guiada para EE;
- novos blocos de questões separados por tema e dificuldade.

> Material independente de estudo. Não substitui normas, descritores ou orientações oficiais do CIdEx/Exército Brasileiro.
