---
title: "Planilha de controle de serviços: colunas e fórmulas"
h1: "Planilha de controle de serviços: como montar, com colunas e fórmulas"
description: "Monte uma planilha de controle de serviços prestados com colunas certas, total por linha e soma por cliente e mês com SOMASES. Veja limites e quando migrar."
cluster: gestao
keyword: "planilha de controle de serviços"
keywords:
  - "planilha de controle de serviços prestados"
  - "planilha de serviços prestados excel"
  - "planilha para prestador de serviço"
  - "planilha de controle de serviços google planilhas"
  - "como somar por cliente e mês no excel"
  - "SOMASES por mês"
publishedAt: 2026-10-14
updatedAt: 2026-10-14
pillar: false
related:
  - "controle-de-servicos-prestados"
  - "fechamento-mensal-de-servicos"
  - "fluxo-de-caixa-para-autonomo"
  - "como-organizar-clientes"
faq:
  - q: "Quais colunas uma planilha de controle de serviços deve ter?"
    a: "No mínimo: data, cliente, descrição, unidade, quantidade, valor unitário, total, situação (a faturar, faturado, recebido) e número da cobrança. Colunas de mês, data de recebimento e observação interna ajudam a filtrar e a conferir."
  - q: "Como calcular o total de cada serviço na planilha?"
    a: "Multiplique a quantidade pelo valor unitário e arredonde o resultado em duas casas, com uma fórmula como =ARRED(E2*G2;2). Assim, 2,5 horas a R$ 120,00 dão R$ 300,00, e o total da planilha bate com o que o cliente vai ver."
  - q: "Como somar os serviços de um cliente em um mês?"
    a: "Use SOMASES (SUMIFS em inglês), que soma uma coluna quando várias condições são atendidas ao mesmo tempo. Você informa a coluna de totais e, em seguida, as condições: cliente igual a um nome e mês igual a um período."
  - q: "Planilha serve para controlar serviços de forma profissional?"
    a: "Serve, desde que você mantenha disciplina: uma linha por execução, situação sempre atualizada e cópia de segurança. Quando o volume cresce ou várias pessoas lançam serviços, os riscos de erro aumentam e um aplicativo passa a compensar."
  - q: "Excel ou Google Planilhas: qual usar?"
    a: "As fórmulas deste guia funcionam nos dois. O Google Planilhas facilita acessar pelo celular e guarda histórico de versões; o Excel é mais confortável para quem já trabalha offline no computador. Escolha o que você vai abrir todo dia."
---

Uma planilha de controle de serviços é uma tabela com **uma linha para cada serviço executado** e colunas fixas: data, cliente, descrição, unidade, quantidade, valor unitário, total e situação. Com ela você soma o que fez por cliente e por mês, separa o que ainda precisa cobrar e confere o que já recebeu.

Para montar, crie as colunas na ordem sugerida abaixo, calcule o total de cada linha com quantidade × valor unitário (arredondando em centavos) e use SOMASES — SUMIFS na versão em inglês — para somar por cliente, mês e situação. Tudo funciona no Excel, no LibreOffice e no Google Planilhas.

A planilha resolve bem enquanto o volume é moderado e só você lança os dados. Mais adiante você vê os limites dela e os sinais de que é hora de trocar por um sistema.

## Colunas sugeridas para a planilha

Crie uma aba chamada **Lançamentos** com estas colunas, nesta ordem. As letras indicam a coluna usada nas fórmulas dos exemplos.

| Coluna | Nome | O que preencher | Exemplo fictício |
|---|---|---|---|
| A | Data | Dia em que o serviço foi executado | 08/10/2026 |
| B | Mês | Calculado a partir da data | 2026-10 |
| C | Cliente | Nome exatamente como está no cadastro | Cliente Alfa |
| D | Descrição | O que foi feito, como o cliente vai ler | Manutenção do quadro elétrico |
| E | Quantidade | Número, com decimais se preciso | 2,5 |
| F | Unidade | hora, visita, diária, unidade, serviço | hora |
| G | Valor unitário | Preço por unidade | 120,00 |
| H | Total | Calculado | 300,00 |
| I | Situação | a faturar, faturado ou recebido | a faturar |
| J | Nº da cobrança | Número do documento em que entrou | 2026-015 |
| K | Data do recebimento | Quando o dinheiro entrou | 05/11/2026 |
| L | Observação interna | Só para você | Pediu orçamento de troca de disjuntores |

Algumas regras simples deixam a planilha confiável:

1. **Uma linha por data de execução.** Serviço de três dias são três linhas.
2. **Nada de linhas em branco no meio** e nada de células mescladas. Elas atrapalham filtros e somas.
3. **Cliente sempre escrito igual.** "Cliente Alfa" e "cliente alfa " (com espaço) são dois clientes para a fórmula. Use uma lista suspensa (validação de dados) com os nomes de uma aba **Clientes**.
4. **Situação também em lista suspensa**, com as três opções. Assim você não digita "faturdo" e some da soma.
5. **Valores como número, não texto.** Não digite "R$" dentro da célula; formate a coluna como moeda.

## Fórmulas: total por linha

O total é **quantidade × valor unitário**, arredondado em duas casas. Na célula H2:

`=ARRED(E2*G2;2)`

No Excel e no Google Planilhas em português, a função é ARRED e o separador é ponto e vírgula. Em inglês, a mesma fórmula é `=ROUND(E2*G2,2)`.

Por que arredondar na linha? Porque o cliente vai ver o total de cada item em reais e centavos. Se a planilha guardar 0,333… escondido e só arredondar na exibição, a soma final pode diferir um centavo da soma dos itens que o cliente vê. Exemplo fictício: 0,75 hora a R$ 85,00 dá 63,75 — sem problema. Já 1,67 hora a R$ 95,00 dá 158,65; e 0,333 hora a R$ 95,00 dá 31,635, que vira 31,64 arredondando para cima a partir da metade.

Para a coluna de mês (B2), use:

`=TEXTO(A2;"aaaa-mm")`

Isso transforma 08/10/2026 em "2026-10". No Google Planilhas em português, a máscara pode ser "yyyy-mm" dependendo da configuração de idioma; teste com uma data conhecida. Ter o mês em texto facilita somar por período sem fórmulas de data mais complexas.

## Fórmulas: soma por cliente, mês e situação com SOMASES

SOMASES (SUMIFS) soma os valores de uma coluna **quando todas as condições são verdadeiras**. A estrutura é:

`=SOMASES(coluna_que_soma; coluna_condição1; condição1; coluna_condição2; condição2; ...)`

Crie uma aba **Resumo** com os clientes na coluna A (a partir de A2) e o mês desejado na célula B1, por exemplo "2026-10".

### Total executado do cliente no mês

`=SOMASES(Lançamentos!H:H; Lançamentos!C:C; A2; Lançamentos!B:B; $B$1)`

Em palavras: some a coluna Total quando o Cliente for igual a A2 e o Mês for igual ao mês escolhido em B1.

### Quanto falta cobrar do cliente no mês

`=SOMASES(Lançamentos!H:H; Lançamentos!C:C; A2; Lançamentos!B:B; $B$1; Lançamentos!I:I; "a faturar")`

É a mesma soma com uma terceira condição: situação igual a "a faturar". Esse é o número que você usa no [fechamento mensal](/guias/fechamento-mensal-de-servicos/).

### Total a faturar de todos os clientes

`=SOMASES(Lançamentos!H:H; Lançamentos!I:I; "a faturar")`

Sem filtrar cliente nem mês, mostra tudo o que você já executou e ainda não cobrou — inclusive de meses anteriores que ficaram para trás.

### Conferência rápida

Para cada mês, a soma de "a faturar" + "faturado" + "recebido" tem que ser igual ao total executado do mês. Se não bater, há linha com situação em branco ou digitada errado. Uma célula de conferência evita surpresas:

`=SOMASES(Lançamentos!H:H; Lançamentos!B:B; $B$1) - SOMASES(Lançamentos!H:H; Lançamentos!B:B; $B$1; Lançamentos!I:I; "<>")`

Se o resultado for diferente de zero, existe total sem situação preenchida no mês.

## Exemplo fictício com números

Lançamentos de outubro de 2026 de dois clientes:

| Data | Cliente | Descrição | Qtd | Unid. | Valor unit. | Total | Situação |
|---|---|---|---|---|---|---|---|
| 02/10 | Cliente Alfa | Visita técnica | 1 | visita | 150,00 | 150,00 | faturado |
| 08/10 | Cliente Alfa | Manutenção do quadro | 2,5 | hora | 120,00 | 300,00 | faturado |
| 15/10 | Cliente Alfa | Troca de disjuntores | 1,5 | hora | 120,00 | 180,00 | a faturar |
| 09/10 | Cliente Beta | Diária de instalação | 2 | diária | 480,00 | 960,00 | recebido |
| 21/10 | Cliente Beta | Ajuste pós-instalação | 0,75 | hora | 120,00 | 90,00 | a faturar |

Resumo do mês:

- Cliente Alfa executado: 150 + 300 + 180 = **R$ 630,00**; a faturar: **R$ 180,00**.
- Cliente Beta executado: 960 + 90 = **R$ 1.050,00**; a faturar: **R$ 90,00**.
- Total executado: 630 + 1.050 = **R$ 1.680,00**.
- Total a faturar: 180 + 90 = **R$ 270,00**; faturado: 150 + 300 = **R$ 450,00**; recebido: **R$ 960,00**. Conferência: 270 + 450 + 960 = 1.680.

## Abas complementares que valem a pena

- **Clientes:** nome, contato, documento, endereço e forma de cobrança preferida. Alimenta a lista suspensa. Veja o que registrar em [como organizar clientes](/guias/como-organizar-clientes/).
- **Preços:** unidade e valor padrão por tipo de serviço, para você não digitar preços diferentes sem querer. Se ainda não definiu seu preço, a [calculadora de valor da hora](/ferramentas/calculadora-valor-hora/) ajuda.
- **Recebimentos:** data, cliente, número da cobrança, valor e forma de pagamento. Permite registrar pagamento parcial sem bagunçar a aba de lançamentos.
- **Despesas:** se você quiser ligar o controle ao [fluxo de caixa](/guias/fluxo-de-caixa-para-autonomo/).

## Como usar a planilha no fechamento do mês

1. Filtre a aba Lançamentos por cliente e situação "a faturar".
2. Confira descrições, quantidades e valores.
3. Copie as linhas para o documento de cobrança (ou monte uma aba de impressão).
4. Anote o número da cobrança na coluna J dessas linhas e mude a situação para "faturado".
5. Quando o cliente pagar, preencha a data do recebimento e mude para "recebido".

O passo 4 é o que mais falha na prática: se você esquece de mudar a situação, a linha volta a aparecer no mês seguinte e pode ser cobrada de novo.

## Limitações da planilha

A planilha é flexível justamente porque não impõe regras. Isso também é o ponto fraco:

- **Nada impede cobrar duas vezes.** A proteção é só a coluna de situação, que depende de você lembrar.
- **Fórmulas quebram.** Uma linha inserida fora do intervalo, uma célula sobrescrita ou um texto no lugar de número e a soma fica errada sem aviso.
- **Pagamento parcial é trabalhoso.** Controlar saldo em aberto de cada cobrança exige aba e fórmulas extras.
- **Uso no celular é desconfortável.** Lançar uma visita na rua, digitando em células pequenas, desestimula o registro no dia.
- **O cliente não vê nada.** Você precisa montar o documento de cobrança à parte, exportar em PDF e enviar.
- **Várias pessoas lançando** aumentam o risco de versões diferentes do arquivo.
- **Histórico frágil.** Um "Ctrl+Z" errado ou um arquivo corrompido e meses de registro se perdem. Faça cópia de segurança.

## Quando trocar a planilha por um sistema

Fique de olho nestes sinais:

- Você passou de uns poucos clientes com cobrança mensal e o fechamento leva mais de uma hora.
- Já cobrou algo duas vezes ou deixou de cobrar por erro de situação.
- Precisa registrar serviços no celular, no local do cliente.
- Clientes pedem um documento organizado com os itens do mês.
- Você quer saber quem abriu a cobrança e quem está com saldo em aberto sem montar relatórios.

Nesse ponto, um aplicativo de controle compensa. No MinhaOS App, o [fechamento mensal](/funcionalidades/fechamento-mensal/) seleciona os lançamentos a faturar do cliente no período e impede que um lançamento já faturado entre em outra cobrança — exatamente o ponto em que a planilha mais falha. Se for migrar, exporte a planilha antes e mantenha o arquivo guardado como histórico.

## Resumo

- Uma linha por serviço executado, colunas fixas, listas suspensas para cliente e situação.
- Total = ARRED(quantidade × valor unitário; 2).
- SOMASES/SUMIFS para somar por cliente, mês e situação.
- Confira se a soma das situações bate com o executado do mês.
- Atualize a situação ao cobrar e ao receber. É o passo que evita cobrança em dobro.
