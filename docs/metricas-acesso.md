# Métricas de acesso da plataforma

## Objetivo

Registrar a quantidade de acessos à plataforma de treinamento sem armazenar nome, e-mail, respostas dos exercícios ou outros identificadores definidos pela aplicação.

## Definição da métrica

A métrica principal é **sessões de acesso**.

- Uma nova entrada na página principal inicia uma sessão.
- A sessão permanece ativa por 30 minutos a partir da última abertura da página principal no mesmo navegador.
- Recarregar a página dentro dessa janela não incrementa o contador.
- Após 30 minutos sem nova abertura, uma nova entrada incrementa novamente o contador.

O controle local da janela de sessão usa `localStorage`. O valor salvo é somente o horário da última entrada.

## Armazenamento do contador

Como o projeto é hospedado em GitHub Pages e não possui servidor ou banco de dados próprio, o valor agregado é mantido pelo serviço externo CounterAPI.

Identificação usada:

- namespace: `jpbjuliano.github.io`
- action: `access`
- key: `treinamento-idiomas-222`

Endpoint de leitura sem incremento:

```text
https://counterapi.com/api/jpbjuliano.github.io/access/treinamento-idiomas-222?readOnly=true
```

## Implementação

O arquivo `assets/js/access-metrics.js` é carregado pela página principal `index.html`.

A coleta é independente do funcionamento dos exercícios: se o serviço de métricas estiver indisponível, a plataforma continua funcionando normalmente.

## Privacidade

A aplicação não adiciona nome, e-mail, matrícula, respostas, desempenho ou identificadores próprios à requisição de contagem. Como toda chamada HTTP a um serviço externo, metadados de rede podem ser processados pelo provedor; por isso, a política do serviço deve ser considerada na avaliação de privacidade do projeto.

## Limitações

A métrica representa sessões estimadas, não pessoas únicas. Navegadores diferentes, limpeza do armazenamento local ou acesso após a janela de 30 minutos podem gerar novas sessões. Bloqueadores de conteúdo ou indisponibilidade do serviço externo podem fazer alguns acessos não serem contabilizados.
