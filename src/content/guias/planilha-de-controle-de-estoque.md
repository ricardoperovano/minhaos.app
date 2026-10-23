---
title: "Planilha de controle de estoque: como montar e usar"
h1: "Planilha de controle de estoque: abas, colunas e fórmulas para material de serviço"
description: "Como montar uma planilha de controle de estoque simples: abas de itens e movimentos, fórmula de saldo, alerta de estoque mínimo e os limites da planilha."
cluster: estoque-e-patrimonio
keyword: "planilha de controle de estoque"
keywords:
  - "planilha de estoque simples"
  - "planilha de controle de estoque excel"
  - "como fazer planilha de estoque"
  - "planilha de entrada e saída de material"
  - "fórmula de saldo de estoque"
publishedAt: 2026-10-22
updatedAt: 2026-10-22
pillar: false
related:
  - "controle-de-estoque-para-prestador-de-servico"
  - "estoque-minimo-material-de-consumo"
  - "planilha-de-controle-de-servicos"
  - "custo-de-material-no-preco-do-servico"
faq:
  - q: "Como fazer uma planilha de controle de estoque simples?"
    a: "Crie duas abas: Itens (código, nome, unidade, estoque mínimo) e Movimentos (data, código do item, tipo, quantidade com sinal, custo, observação). Na aba Itens, calcule o saldo somando os movimentos de cada código com a função SOMASE. Destaque em vermelho os itens com saldo abaixo do mínimo."
  - q: "Qual fórmula usar para calcular o saldo do estoque?"
    a: "Registre entradas com quantidade positiva e saídas com quantidade negativa. O saldo de cada item é a soma das quantidades daquele código: =SOMASE(Movimentos!B:B;A2;Movimentos!D:D), em que a coluna B da aba Movimentos tem o código e a D, a quantidade."
  - q: "Por que não editar o saldo direto na planilha?"
    a: "Porque você perde o histórico. Se o saldo é digitado, não dá para saber por que mudou nem encontrar o erro. Com uma aba de movimentos, cada mudança tem data, motivo e origem, e o saldo é sempre o resultado da soma."
  - q: "Dá para calcular custo médio em planilha?"
    a: "Dá, mas a fórmula fica trabalhosa, porque o custo médio muda a cada entrada e depende da ordem dos movimentos. Para poucos itens, uma coluna de custo médio atualizada à mão a cada compra funciona. Com muitos itens e compras frequentes, um sistema que faz o cálculo sozinho evita erros."
  - q: "Quando a planilha deixa de funcionar?"
    a: "Quando a baixa do material depende de alguém lembrar de abrir a planilha depois do serviço, quando mais de uma pessoa precisa lançar ao mesmo tempo, quando o registro tem de ser feito no celular, na obra, ou quando você precisa ligar o material à cobrança do cliente."
---

Uma planilha de controle de estoque funciona bem para quem tem poucos materiais e uma pessoa disciplinada para lançar. A estrutura mais segura tem duas abas: **Itens**, com o cadastro e o saldo calculado, e **Movimentos**, em que cada entrada, saída e ajuste vira uma linha. O saldo nunca é digitado: é sempre a soma dos movimentos de cada item, com a função SOMASE.

Essa separação é o que torna a planilha confiável. Se o saldo é digitado direto, você não sabe por que ele mudou nem onde está o erro. Com os movimentos registrados, cada número tem data, motivo e origem.

Abaixo está o passo a passo para montar a planilha, as fórmulas em português (Excel e Google Planilhas aceitam as mesmas), um exemplo preenchido e os sinais de que é hora de trocar a planilha por outra ferramenta.

## Estrutura da planilha

### Aba Itens

| Coluna | Conteúdo | Exemplo |
|---|---|---|
| A | Código | CAB25 |
| B | Nome | Cabo flexível 2,5 mm² |
| C | Unidade | m |
| D | Estoque mínimo | 30 |
| E | Saldo (fórmula) | =SOMASE(Movimentos!B:B;A2;Movimentos!D:D) |
| F | Situação (fórmula) | =SE(E2<0;"NEGATIVO";SE(E2<=D2;"REPOR";"OK")) |

### Aba Movimentos

| Coluna | Conteúdo | Exemplo |
|---|---|---|
| A | Data | 09/10/2026 |
| B | Código do item | CAB25 |
| C | Tipo | Entrada, Saída, Ajuste |
| D | Quantidade, com sinal | 100 (entrada) ou −15 (saída) |
| E | Custo unitário | 2,60 |
| F | Serviço ou fornecedor | SV-0104 ou Loja fictícia |
| G | Observação | NF 4567 |

A regra de ouro: **entradas positivas, saídas negativas**. O ajuste de inventário é a diferença entre o contado e o saldo: se a planilha diz 70 m e você contou 67 m, lance −3.

## Passo a passo para montar

1. **Crie a aba Itens** com as colunas acima. Use códigos curtos e únicos; eles evitam erro de digitação no nome.
2. **Crie a aba Movimentos.** Na coluna B, use validação de dados com a lista de códigos da aba Itens, para não lançar um código que não existe.
3. **Na coluna C**, use validação com a lista "Entrada; Saída; Ajuste".
4. **Lance o saldo inicial** de cada item como uma Entrada com data de hoje.
5. **Escreva a fórmula de saldo** na coluna E da aba Itens e arraste para baixo.
6. **Crie a fórmula de situação** na coluna F e aplique uma formatação condicional: vermelho para "NEGATIVO", amarelo para "REPOR".
7. **Congele a primeira linha** das duas abas e ordene os movimentos por data.

O estoque mínimo da coluna D tem uma conta própria; o guia [estoque mínimo e ponto de reposição](/guias/estoque-minimo-material-de-consumo/) explica como chegar nele.

## Exemplo preenchido

Movimentos de outubro (dados fictícios):

| Data | Código | Tipo | Quantidade | Custo unit. | Origem |
|---|---|---|---|---|---|
| 01/10 | CAB25 | Entrada | 40 | 2,00 | Saldo inicial |
| 03/10 | CAB25 | Saída | −15 | | SV-0101 |
| 08/10 | CAB25 | Saída | −20 | | SV-0104 |
| 09/10 | CAB25 | Entrada | 100 | 2,60 | Loja fictícia, NF 4567 |
| 20/10 | CAB25 | Saída | −35 | | SV-0112 |
| 31/10 | CAB25 | Ajuste | −3 | | Contagem: 67 m |

Saldo calculado: 40 − 15 − 20 + 100 − 35 − 3 = **67 m**. Com estoque mínimo de 30 m, a situação é "OK".

## Aba de contagem para o inventário

Uma terceira aba facilita a contagem física do fim do mês. Ela tem o código, o nome, o saldo da planilha (puxado da aba Itens), a quantidade contada (digitada na hora) e a diferença:

| Coluna | Conteúdo | Fórmula ou exemplo |
|---|---|---|
| A | Código | CAB25 |
| B | Nome | =PROCV(A2;Itens!A:B;2;0) |
| C | Saldo na planilha | =PROCV(A2;Itens!A:E;5;0) |
| D | Quantidade contada | 67 |
| E | Diferença | =D2-C2 |

Imprima a aba ou abra no celular, conte item por item e preencha a coluna D. Depois, para cada diferença diferente de zero, lance um Ajuste na aba Movimentos com o valor da coluna E (no exemplo, −3) e a observação "contagem de 31/10". Assim a contagem fica registrada e o saldo volta a bater.

Diferenças pequenas e esporádicas são normais. Diferenças grandes ou repetidas no mesmo item indicam saída sem registro, erro de unidade ou perda que precisa entrar no custo.

## E o custo do material?

A planilha acima controla quantidade. Para saber quanto o material custou em cada serviço, você precisa do **custo médio**, que muda a cada compra:

**novo custo médio = (saldo × custo médio atual + quantidade comprada × custo da compra) ÷ (saldo + quantidade comprada)**

No exemplo, antes da compra de 09/10 havia 5 m a R$ 2,00 (R$ 10,00). Com 100 m a R$ 2,60 (R$ 260,00), ficam 105 m que custaram R$ 270,00: R$ 2,5714 por metro.

Em planilha, a forma mais prática para poucos itens é ter uma coluna "Custo médio" na aba Itens e atualizá-la à mão a cada compra, com essa conta. Fórmulas que recalculam o custo médio sozinhas existem, mas dependem da ordem das linhas e quebram fácil quando alguém insere um movimento antigo no meio. O guia [custo do material no preço do serviço](/guias/custo-de-material-no-preco-do-servico/) mostra como usar esse custo para definir o preço de venda.

## Boas práticas para a planilha não virar bagunça

- **Nunca digite o saldo.** Toda mudança é um movimento.
- **Nunca apague movimentos.** Errou? Lance um movimento contrário, com observação "estorno de…".
- **Registre a origem.** Na saída, o código do serviço; na entrada, o fornecedor e a nota.
- **Lance no mesmo dia.** Uma pilha de notas para "passar depois" é o fim da planilha.
- **Faça cópia de segurança.** No Google Planilhas o histórico de versões ajuda; no Excel, guarde cópias datadas.
- **Conte uma vez por mês** e lance os ajustes.

## Quando a planilha deixa de dar conta

A planilha é um bom começo, mas tem limites claros para quem presta serviço:

| Situação | O que acontece na planilha |
|---|---|
| A baixa depende de lembrar depois do serviço | Saídas esquecidas; saldo maior do que o real |
| Registro feito no celular, na obra | Planilha difícil de usar na tela pequena; lançamentos ficam para depois |
| Mais de uma pessoa lançando | Conflito de edição, linhas sobrescritas, fórmulas apagadas |
| Material precisa ir para a cobrança | Lança duas vezes: na planilha e no documento de cobrança |
| Custo médio e margem por serviço | Contas manuais, sujeitas a erro |
| Equipe que não deve ver custo | Planilha compartilhada mostra tudo a todos |

Se você já sente dois ou mais desses problemas, é hora de considerar uma ferramenta que ligue o serviço ao estoque. Para entender o controle como um todo, antes da ferramenta, veja o guia [controle de estoque para prestador de serviço](/guias/controle-de-estoque-para-prestador-de-servico/).

No MinhaOS App, o [controle de estoque](/funcionalidades/controle-de-estoque/) faz o que a planilha faz e resolve esses pontos: a saída é registrada sozinha quando você salva o serviço, o custo médio é recalculado a cada entrada, o material vai para a cobrança pelo valor de venda e o operador da equipe lança sem ver custo. O extrato de cada item guarda todos os movimentos, como a aba Movimentos, e a posição de estoque pode ser exportada em CSV nos planos pagos.

## Planilha de serviços e planilha de estoque

Se você também controla os serviços em planilha, ligue as duas pelo código do serviço: a saída de material na aba Movimentos leva o mesmo código usado na [planilha de controle de serviços](/guias/planilha-de-controle-de-servicos/). Assim, no fechamento do mês, dá para conferir se todo material usado foi cobrado.
