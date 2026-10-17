---
title: "Planilha de contas a pagar e receber: colunas e fórmulas"
h1: "Planilha de contas a pagar e receber: colunas, fórmulas explicadas e quando migrar"
description: "Monte sua planilha de contas a pagar e receber: colunas sugeridas, fórmulas SOMASES e HOJE explicadas, alerta de vencidos, resumo mensal e limites da planilha."
cluster: financeiro
keyword: "planilha de contas a pagar e receber"
keywords:
  - "planilha contas a pagar e receber"
  - "planilha de controle financeiro autônomo"
  - "como fazer planilha de contas a pagar"
  - "fórmula SOMASES contas a pagar"
  - "fórmula para contas vencidas planilha"
  - "planilha contas a receber Excel Google Planilhas"
publishedAt: 2026-10-17
updatedAt: 2026-10-17
pillar: false
related:
  - "contas-a-pagar-e-receber"
  - "planilha-de-controle-de-servicos"
  - "fluxo-de-caixa-para-autonomo"
  - "controle-de-servicos-prestados"
faq:
  - q: "Como fazer uma planilha de contas a pagar e receber?"
    a: "Crie uma aba de lançamentos com tipo (pagar ou receber), descrição, cliente ou fornecedor, categoria, vencimento, valor, data do pagamento, valor pago, situação e saldo. Em outra aba, use SOMASES para somar o que está em aberto, o que está vencido e o que vence nos próximos dias."
  - q: "Qual fórmula usar para somar contas vencidas?"
    a: "Use SOMASES com o critério de data menor que HOJE(). Por exemplo, =SOMASES(J:J;A:A;\"Receber\";E:E;\"<\"&HOJE()) soma o saldo em aberto das contas a receber cujo vencimento já passou. Na versão em inglês, a função é SUMIFS e TODAY()."
  - q: "Como destacar contas vencidas na planilha?"
    a: "Use formatação condicional com uma fórmula personalizada, como =$I2=\"Vencido\", aplicada às linhas da tabela. Assim a linha muda de cor automaticamente quando o vencimento passa e o saldo ainda não foi quitado."
  - q: "Planilha é suficiente para controlar contas a pagar e receber?"
    a: "Para poucos clientes e poucas contas, sim, desde que você atualize toda semana. A planilha começa a falhar quando o volume cresce, quando mais de uma pessoa mexe nela, quando há muitos pagamentos parciais ou quando você precisa de lembretes e histórico por cliente."
  - q: "Excel ou Google Planilhas: qual usar?"
    a: "As fórmulas deste guia funcionam nos dois em português. O Google Planilhas é gratuito, salva sozinho e abre no celular; o Excel tem mais recursos offline. Escolha o que você já usa e consegue abrir no dia da rotina semanal."
---

Uma planilha de contas a pagar e receber precisa de **uma aba de lançamentos**, com uma linha por conta, e **uma aba de resumo**, que soma sozinha o que está em aberto, o que está vencido e o que vence nos próximos dias. Com dez colunas e quatro fórmulas — SOMASES, HOJE, SE e uma formatação condicional — você tem um controle que funciona no Excel e no Google Planilhas.

O segredo não está na fórmula, e sim na rotina: lançar cada conta no dia em que ela aparece e dar baixa conferindo com o extrato uma vez por semana. Uma planilha desatualizada mostra números errados com toda a confiança.

Se você ainda está entendendo o que entra em cada lado, comece pelo guia de [contas a pagar e receber](/guias/contas-a-pagar-e-receber/). Abaixo, a estrutura, as fórmulas explicadas e os sinais de que chegou a hora de trocar a planilha por outra ferramenta.

## Estrutura: uma aba de lançamentos, uma de resumo

Juntar contas a pagar e a receber na mesma aba, com uma coluna "Tipo", facilita as fórmulas e a visão do mês. Duas abas separadas também funcionam, mas as fórmulas do resumo ficam duplicadas.

- **Aba "Lançamentos":** uma linha por conta (cada boleto, cada cobrança, cada parcela).
- **Aba "Resumo":** totais em aberto, vencidos, próximos 14 dias e gastos por categoria no mês.
- **Aba "Listas" (opcional):** categorias, clientes e fornecedores, para usar em listas suspensas.

## Colunas sugeridas para a aba de lançamentos

| Coluna | Nome | O que preencher | Exemplo fictício |
|---|---|---|---|
| A | Tipo | Pagar ou Receber (lista suspensa) | Receber |
| B | Descrição | O que é | Demonstrativo outubro |
| C | Cliente / fornecedor | Com quem | Cliente A |
| D | Categoria | Da sua lista de categorias | Serviços |
| E | Vencimento | Data | 10/11/2026 |
| F | Valor | Valor total da conta | 1.800,00 |
| G | Data do pagamento | Quando foi pago ou recebido | 12/11/2026 |
| H | Valor pago | Quanto foi pago até agora | 1.000,00 |
| I | Situação | Fórmula (não digite) | Parcial |
| J | Saldo | Fórmula: F − H | 800,00 |

Dicas de formato:

- Formate E e G como data e F, H e J como número com duas casas.
- Congele a primeira linha (cabeçalho) e transforme o intervalo em tabela ou use filtros.
- Para pagamento em partes, some no valor pago (H) e atualize a data (G) com o último pagamento. Se precisar do histórico de cada parcela paga, registre-as em uma aba separada.

Para categorias, use a mesma lista em todos os meses. O guia de [categorias de despesas para MEI e autônomo](/guias/categorias-de-despesas-mei/) traz uma sugestão pronta.

## Fórmulas explicadas

As fórmulas abaixo estão no padrão do Excel e do Google Planilhas em português, com ponto e vírgula separando os argumentos. Nas versões em inglês, troque SE por IF, SOMASES por SUMIFS, HOJE por TODAY, DATA por DATE e o ponto e vírgula por vírgula.

### Saldo de cada linha (coluna J)

Na célula J2: `=F2-H2`

Mostra quanto falta pagar ou receber. Se o valor pago estiver vazio, a planilha considera zero, e o saldo é o valor total.

### Situação de cada linha (coluna I)

Na célula I2:

`=SE(F2="";"";SE(H2>=F2;"Quitado";SE(E2<HOJE();"Vencido";SE(H2>0;"Parcial";"A vencer"))))`

Lendo de fora para dentro:

1. Se não há valor, deixa em branco (linhas vazias não poluem a planilha).
2. Se o valor pago é igual ou maior que o valor, a conta está **quitada**.
3. Se não está quitada e o vencimento é anterior a hoje, está **vencida**.
4. Se ainda não venceu e já tem algum pagamento, é **parcial**.
5. Caso contrário, está **a vencer**.

A função HOJE() devolve a data atual, então a situação muda sozinha no dia seguinte ao vencimento.

### Total a receber em aberto

Na aba de resumo: `=SOMASES(Lançamentos!J:J;Lançamentos!A:A;"Receber")`

SOMASES soma a primeira coluna (o saldo) somente nas linhas que atendem aos critérios seguintes (tipo igual a "Receber"). Como as contas quitadas têm saldo zero, elas não alteram o total.

### Total a receber vencido

`=SOMASES(Lançamentos!J:J;Lançamentos!A:A;"Receber";Lançamentos!E:E;"<"&HOJE())`

O segundo critério pega só as linhas com vencimento antes de hoje. O `&` junta o sinal de menor com a data de hoje para formar o critério. Troque "Receber" por "Pagar" para ver as contas a pagar em atraso.

### O que vence nos próximos 14 dias

`=SOMASES(Lançamentos!J:J;Lançamentos!A:A;"Pagar";Lançamentos!E:E;">="&HOJE();Lançamentos!E:E;"<="&HOJE()+14)`

Dois critérios na mesma coluna de vencimento formam um intervalo: de hoje até daqui a 14 dias. Repita com "Receber" e compare: se o que vence a pagar é maior que o saldo atual mais o que deve entrar, você já sabe que vai faltar.

### Gasto por categoria no mês

`=SOMASES(Lançamentos!H:H;Lançamentos!A:A;"Pagar";Lançamentos!D:D;"Material";Lançamentos!G:G;">="&DATA(2026;11;1);Lançamentos!G:G;"<="&DATA(2026;11;30))`

Soma o que foi efetivamente pago (H) na categoria "Material" com data de pagamento em novembro de 2026. Para não reescrever a fórmula, coloque a categoria e as datas em células do resumo e aponte a fórmula para elas.

### Alerta visual de vencidos

Selecione as linhas da tabela, abra a formatação condicional, escolha "fórmula personalizada" e use `=$I2="Vencido"`. O cifrão antes do I faz a regra olhar sempre a coluna de situação. Escolha uma cor de fundo suave e legível.

## Exemplo fictício de resumo

Com os lançamentos de uma semana de novembro de 2026, o resumo de uma prestadora mostrou:

| Indicador | Valor |
|---|---|
| Saldo na conta do trabalho hoje | R$ 2.100,00 |
| A receber em aberto | R$ 4.300,00 |
| A receber vencido | R$ 800,00 |
| A pagar nos próximos 14 dias | R$ 3.450,00 |
| A receber nos próximos 14 dias | R$ 2.700,00 |
| Saldo previsto em 14 dias (2.100 + 2.700 − 3.450) | R$ 1.350,00 |

Os R$ 800,00 vencidos não entram na previsão dos próximos 14 dias de propósito: dinheiro atrasado só deve ser contado quando o cliente confirmar a data. Se ele pagar, o saldo previsto sobe para R$ 2.150,00.

Para transformar esse resumo em uma visão semana a semana, veja o guia de [fluxo de caixa para autônomo](/guias/fluxo-de-caixa-para-autonomo/).

## De onde vêm as contas a receber

A planilha de contas a receber depende das cobranças que você emite. E as cobranças dependem do registro dos serviços feitos. Se esse registro também está em planilha, mantenha as duas conversando: no fechamento do mês, cada cobrança emitida vira uma linha "Receber". O guia [planilha de controle de serviços](/guias/planilha-de-controle-de-servicos/) mostra como montar a parte dos serviços.

Se você registra os serviços no MinhaOS App, os relatórios de demonstrativos e de recebimentos podem ser exportados em CSV e colados na planilha, evitando digitar tudo de novo.

[//]: # (MINHAOS-FINANCEIRO: mencionar contas a pagar e receber, recebimentos avulsos e fluxo previsto x realizado no MinhaOS App como alternativa à planilha)

## Limitações da planilha

A planilha é uma ótima forma de começar, mas tem limites conhecidos:

- **Não avisa nada.** Ela só mostra o vencido se você abrir.
- **Depende 100% de disciplina.** Uma semana sem atualizar e os números mentem.
- **Fórmulas quebram.** Uma linha inserida fora do intervalo, uma célula sobrescrita, e o total fica errado sem aviso.
- **Pagamento parcial é trabalhoso.** O histórico de cada parcela paga precisa de outra aba.
- **Difícil no celular.** Funciona, mas lançar no meio do dia, na rua, é desconfortável.
- **Mais de uma pessoa editando** cria versões diferentes e conflitos.
- **Contas recorrentes** precisam ser copiadas à mão todo mês.

## Quando migrar para outra ferramenta

Considere trocar ou complementar a planilha quando:

1. você passa mais de uma hora por semana mantendo a planilha;
2. já cobrou em dobro ou esqueceu de cobrar algum cliente por erro de planilha;
3. tem muitas cobranças com pagamento parcial;
4. precisa consultar e lançar pelo celular, no local do serviço;
5. outra pessoa (sócio, assistente, contador) precisa ver ou mexer;
6. quer histórico por cliente sem montar filtros.

Migrar não significa jogar fora o que você aprendeu. As colunas e os indicadores deste guia são os mesmos que um bom aplicativo vai mostrar.

## Resumo

- Uma aba de lançamentos com tipo, descrição, cliente ou fornecedor, categoria, vencimento, valor, data e valor pagos, situação e saldo.
- Situação por fórmula com SE e HOJE; saldo como valor menos valor pago.
- SOMASES para total em aberto, vencidos, próximos 14 dias e gasto por categoria.
- Formatação condicional para destacar vencidos.
- Atualize toda semana e migre quando a manutenção da planilha virar trabalho demais.
