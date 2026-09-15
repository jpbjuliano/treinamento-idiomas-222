# Treinamento Idiomas 222

Aplicação web estática para revisão de inglês com foco em três habilidades:

- **CA — Compreensão Auditiva**
- **CL — Compreensão Leitora**
- **EE — Expressão Escrita**

## Recursos da V1

- Modo **Treino**, com correção e explicação imediatas.
- Modo **Simulado**, sem revelar respostas até a finalização.
- CA com síntese de voz em inglês do próprio navegador e limite de duas reproduções por questão.
- CL com questões de ideia principal, informação específica, vocabulário em contexto, contraste e inferência.
- EE com propostas de produção, checklist, contador de palavras e conectores úteis.
- Cronômetro e painel de desempenho.
- Layout responsivo para computador e celular.
- Sem framework, servidor ou banco de dados: HTML, CSS e JavaScript puros.

## Estrutura

```text
.
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── data/
    └── questions.js
```

## Executar localmente

Basta abrir `index.html` em um navegador moderno. Para uma experiência idêntica à publicação, também é possível servir a pasta com um servidor HTTP local.

Exemplo com Python:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Publicar no GitHub Pages

No GitHub, abra **Settings → Pages** e, em **Build and deployment**, selecione **Deploy from a branch**. Escolha a branch `main` e a pasta `/ (root)`, depois salve.

O endereço esperado será:

`https://jpbjuliano.github.io/treinamento-idiomas-222/`

## Adicionar novas questões

O conteúdo fica separado da aplicação em `data/questions.js`. Para ampliar um simulado, basta adicionar novos objetos aos arrays `ca`, `cl` ou `ee`, mantendo o mesmo formato dos itens existentes.

> Este projeto é material independente de estudo e não substitui normas, descritores ou orientações oficiais do CIdEx/Exército Brasileiro.
