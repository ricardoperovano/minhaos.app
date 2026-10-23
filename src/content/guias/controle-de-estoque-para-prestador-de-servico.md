---
title: "Controle de estoque para prestador de serviço: passo a passo"
h1: "Controle de estoque para prestador de serviço: material, saldo, baixa e custo"
description: "Como fazer controle de estoque sendo prestador de serviço: cadastro do material, entradas, baixa no serviço, estoque mínimo, inventário e custo médio."
cluster: estoque-e-patrimonio
keyword: "controle de estoque para prestador de serviço"
keywords:
  - "como controlar estoque de material de serviço"
  - "controle de material de obra para autônomo"
  - "como dar baixa em material usado no serviço"
  - "estoque de peças para técnico"
  - "controle de estoque simples para MEI"
  - "custo médio do estoque"
publishedAt: 2026-10-22
updatedAt: 2026-10-22
pillar: true
related:
  - "estoque-minimo-material-de-consumo"
  - "custo-de-material-no-preco-do-servico"
  - "planilha-de-controle-de-estoque"
  - "controle-de-patrimonio-pequena-empresa"
  - "margem-de-lucro-de-servico"
faq:
  - q: "Prestador de serviço precisa ter controle de estoque?"
    a: "Se você compra material para usar nos serviços (cabos, conexões, peças, gás, insumos), sim, vale a pena. Sem controle, o material some do custo, falta na hora do atendimento e deixa de ser cobrado. Um controle simples, com saldo, entrada e saída, já resolve a maior parte do problema."
  - q: "Qual a diferença entre estoque e patrimônio?"
    a: "Estoque é o material que é consumido ou repassado ao cliente: cabo, tubo, filtro, adubo. Patrimônio são os bens que ficam com você e são usados muitas vezes: furadeira, escada, bomba de vácuo, notebook. O estoque se controla por quantidade e custo; o patrimônio, por item, com código, responsável e situação."
  - q: "Como dar baixa no material usado no serviço?"
    a: "Registre a saída no mesmo momento em que registra o serviço, com a quantidade usada e o serviço de origem. Em planilha, isso é uma linha na aba de movimentos. Em um sistema que liga serviço e estoque, a baixa é feita ao salvar o serviço, sem digitar duas vezes."
  - q: "O que é custo médio do estoque?"
    a: "É o custo por unidade do material que você tem, considerando compras feitas a preços diferentes. Se você tinha 10 m a R$ 2,00 e comprou 20 m a R$ 2,60, os 30 m custaram R$ 72,00, e o custo médio passa a ser R$ 2,40 por metro."
  - q: "Com que frequência devo contar o estoque?"
    a: "Para quem tem poucos itens, uma contagem completa por mês funciona. Com muitos itens, conte os de maior valor e giro toda semana e os demais por rodízio. O importante é registrar o ajuste sempre que a contagem não bater com o sistema."
  - q: "Estoque de prestador de serviço precisa de inventário fiscal?"
    a: "Depende do regime tributário e da atividade da empresa. O controle de que este guia trata é gerencial, para a sua organização. Se você tem dúvida sobre obrigações fiscais de inventário, confirme com o seu contador."
sources:
  - title: "Lei Complementar nº 123/2006 (Estatuto da Microempresa), art. 26"
    url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm"
  - title: "Lei nº 5.172/1966 (Código Tributário Nacional), arts. 173, 174 e 195"
    url: "https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm"
---

Controle de estoque para prestador de serviço é saber, a qualquer momento, quanto você tem de cada material que usa no trabalho, quanto ele custou e em qual serviço ele foi gasto. Não precisa ser complicado: bastam um cadastro de itens, o registro de cada entrada (compra) e de cada saída (uso no serviço) e uma contagem de tempos em tempos para corrigir as diferenças.

O motivo para fazer isso não é burocracia. Material sem controle vira três prejuízos ao mesmo tempo: falta no meio do atendimento (e você perde tempo indo à loja), deixa de ser cobrado (o cliente não paga o que você esqueceu de lançar) e some do custo (você acha que o serviço deu lucro, mas o material comeu a margem).

Este guia mostra como montar um controle simples, que caiba na rotina de quem passa o dia na rua: o que cadastrar, como registrar entradas e saídas, como definir estoque mínimo, como contar e ajustar e como usar o custo do material para cobrar melhor.

## O que é estoque para quem presta serviço

Quem vende produto pensa em estoque como mercadoria na prateleira. Para quem presta serviço, o estoque é outro: é o **material de consumo e de aplicação** que você compra para usar nos atendimentos. Alguns exemplos por profissão:

- **Eletricista:** cabo em metro, disjuntores, tomadas, conectores, fita isolante.
- **Encanador:** tubo, conexões, registros, sifões, veda-rosca.
- **Técnico de ar-condicionado:** gás refrigerante em quilo, tubo de cobre em metro, isolamento, suportes.
- **Técnico de informática:** SSD, memória, cabo de rede, conectores RJ45.
- **Jardineiro:** adubo, substrato, terra, mudas.
- **Manutenção predial:** lâmpadas, tinta, massa, parafusos, buchas.

Parte desse material é **repassada ao cliente** (vai na cobrança, como "15 m de cabo") e parte é **consumida sem cobrança separada** (a fita isolante, o parafuso, o pano). As duas precisam de controle: a primeira para cobrar certo, a segunda para saber quanto custa de verdade cada serviço.

### Estoque não é patrimônio

Ferramentas e equipamentos que você usa muitas vezes, como furadeira, escada, multímetro ou bomba de vácuo, não são estoque. Eles não "saem" a cada serviço: ficam com você, se desgastam e um dia são substituídos. Esses bens se controlam por unidade, com código, responsável e situação. O guia [controle de patrimônio para pequena empresa](/guias/controle-de-patrimonio-pequena-empresa/) trata disso em detalhe.

Separar os dois evita um erro comum: colocar a furadeira de R$ 600,00 no estoque e "dar baixa" nela no primeiro serviço, como se ela tivesse sido consumida.

## Os quatro movimentos que todo controle precisa ter

Todo controle de estoque, do caderno ao sistema, se resume a quatro tipos de registro:

| Movimento | Quando acontece | Efeito no saldo |
|---|---|---|
| Entrada | Compra de material, devolução do cliente | Aumenta |
| Saída | Uso no serviço, perda, material que quebrou | Diminui |
| Ajuste (inventário) | Contagem física que não bate com o registro | Corrige para o número contado |
| Estorno | Um lançamento foi feito errado | Desfaz o lançamento, sem apagar o histórico |

O saldo de cada item é sempre: saldo anterior + entradas − saídas, corrigido pelos ajustes. Se você registrar esses quatro movimentos com data, quantidade e motivo, já tem um controle confiável.

## Passo a passo para montar o controle

### 1. Liste os itens que valem o controle

Não comece cadastrando tudo o que existe no carro. Comece pelos itens que:

1. Você usa toda semana.
2. Custam caro ou pesam no preço do serviço.
3. Já faltaram em algum atendimento.

Para um eletricista, isso talvez sejam 15 a 30 itens. O resto (parafusos soltos, abraçadeiras, fita) pode entrar depois, ou ficar como custo médio por serviço. Um controle pequeno e atualizado vale mais que um grande e abandonado.

### 2. Defina a unidade certa para cada item

A unidade é a forma como você **usa** o material, não necessariamente como você compra. O cabo é comprado em rolo de 100 m, mas é usado em metro: cadastre em metro e, na entrada, lance 100 m. O gás é comprado em cilindro, mas cobrado e usado em quilo.

Unidades comuns: unidade, metro, metro quadrado, metro cúbico, quilo, litro, caixa, pacote, rolo e saco. Use frações quando fizer sentido: 2,5 m de cabo e 0,8 kg de gás são registros normais.

### 3. Registre o saldo inicial com custo

Conte o que você tem hoje e lance como saldo inicial. Se souber o custo, informe também; se não souber, use o preço da última compra como referência. Esse é o ponto de partida: daqui em diante, o saldo só muda por movimento registrado.

### 4. Registre cada compra como entrada

Na entrada, anote data, quantidade, custo (unitário ou total) e fornecedor. Guarde o comprovante: além de servir para conferir preço e garantia, a nota da compra é documento que a sua contabilidade pode precisar (veja a seção sobre notas, mais abaixo).

Se a compra foi a prazo, ela também é uma conta a pagar. O ideal é registrar as duas coisas juntas, para o estoque e o caixa contarem a mesma história. O guia [como controlar contas a pagar](/guias/como-controlar-contas-a-pagar/) mostra como organizar esse lado.

### 5. Dê baixa no material no mesmo momento em que registra o serviço

Este é o passo que mais falha. Se a baixa fica para "depois", ela não acontece. A regra prática: **a saída do material é registrada junto com o serviço**, com a quantidade usada e o serviço de origem.

Isso traz um benefício a mais: o material lançado no serviço é o mesmo que vai para a cobrança. Você não esquece de cobrar o que usou, e o cliente vê, no fechamento, cada material com a quantidade.

### 6. Defina o estoque mínimo dos itens críticos

Estoque mínimo é a quantidade em que você quer ser avisado para repor. Ele depende do quanto você usa por semana e de quanto tempo leva para comprar. O guia [estoque mínimo e ponto de reposição](/guias/estoque-minimo-material-de-consumo/) tem a fórmula e exemplos. Comece pelos itens que já faltaram.

### 7. Conte e ajuste com frequência

Todo controle diverge da realidade com o tempo: sobra de obra que ficou no cliente, material que caiu da van, lançamento esquecido. A contagem física corrige isso. Conte, compare com o saldo registrado e lance um **ajuste de inventário** com a diferença.

Não apague movimentos para "fazer bater". O ajuste deixa registrado que houve diferença, e diferenças frequentes no mesmo item mostram onde está o vazamento.

## Exemplo completo: um mês de cabo flexível

Um eletricista fictício controla o cabo flexível de 2,5 mm², em metro. Veja como o saldo e o custo evoluem no mês.

| Data | Movimento | Quantidade | Custo unitário | Saldo depois | Custo médio depois |
|---|---|---|---|---|---|
| 01/10 | Saldo inicial | +40 m | R$ 2,00 | 40 m | R$ 2,00 |
| 03/10 | Saída: serviço SV-0101 | −15 m | R$ 2,00 | 25 m | R$ 2,00 |
| 08/10 | Saída: serviço SV-0104 | −20 m | R$ 2,00 | 5 m | R$ 2,00 |
| 09/10 | Entrada: compra de 100 m | +100 m | R$ 2,60 | 105 m | R$ 2,5714 |
| 20/10 | Saída: serviço SV-0112 | −35 m | R$ 2,5714 | 70 m | R$ 2,5714 |
| 31/10 | Ajuste: contagem deu 67 m | −3 m | R$ 2,5714 | 67 m | R$ 2,5714 |

Conferindo o custo médio da entrada de 09/10: antes da compra havia 5 m a R$ 2,00, ou R$ 10,00. A compra foi de 100 m a R$ 2,60, ou R$ 260,00. Juntos: 105 m que custaram R$ 270,00. R$ 270,00 ÷ 105 = R$ 2,5714 por metro (arredondado em quatro casas).

O custo de material do serviço SV-0112 foi 35 × R$ 2,5714 = R$ 90,00 (arredondado em centavos). E os 3 m que sumiram no ajuste custaram cerca de R$ 7,71: pouco num mês, mas um sinal para olhar onde o cabo está ficando.

## Custo médio: por que usar e como calcular

Você compra o mesmo material a preços diferentes ao longo do ano. Qual custo usar quando ele sai para um serviço? Há métodos diferentes, mas para quem presta serviço o mais prático é o **custo médio ponderado móvel**: a cada compra, o custo do saldo é recalculado juntando o que você já tinha com o que chegou.

A fórmula é:

**novo custo médio = (saldo atual × custo médio atual + quantidade comprada × custo da compra) ÷ (saldo atual + quantidade comprada)**

Saídas e ajustes não mudam o custo médio; só as entradas com custo mudam. Assim, o custo de cada serviço reflete o que o material realmente custou, sem você precisar saber de qual lote saiu cada metro.

Esse custo é o que importa na hora de saber se o serviço deu lucro. O guia [margem de lucro de serviço](/guias/margem-de-lucro-de-servico/) mostra como usar o custo direto, e o material é o maior deles em muitas profissões.

## Material na cobrança: preço de venda e repasse

Quando o material é repassado ao cliente, você precisa decidir por quanto. As formas mais comuns são:

- **Repasse pelo custo:** você cobra o que pagou. Simples, mas não paga o tempo de compra, o transporte, a perda e o risco de garantia.
- **Preço de venda com margem:** você define um valor de venda por item, acima do custo. É o mais comum e o mais justo com o seu trabalho.
- **Material incluso no preço fechado:** o material está dentro do valor do serviço. Exige que o custo esteja bem calculado no orçamento.

Seja qual for a escolha, combine antes e deixe escrito no orçamento. O guia [custo do material no preço do serviço](/guias/custo-de-material-no-preco-do-servico/) mostra como calcular o preço de venda e como apresentar ao cliente sem gerar desconfiança.

Uma boa prática é ter o **valor de venda cadastrado no item**. Assim, quem lança o serviço não precisa lembrar do preço: o material entra na linha com o valor combinado, e a cobrança sai igual para todos os clientes.

## Saldo negativo: o que significa e o que fazer

Às vezes você registra uma saída maior do que o saldo: o sistema dizia 5 m, mas você usou 8 m. Isso quase sempre quer dizer que uma entrada não foi lançada, ou que o saldo inicial estava errado.

Não deixe de registrar o serviço por causa disso. O trabalho foi feito e precisa ser cobrado. Registre a saída, deixe o saldo negativo aparecer e corrija depois, lançando a entrada que faltou ou fazendo uma contagem. Um saldo negativo é um alerta útil: mostra exatamente qual item está com o registro furado.

## Notas de compra: guarde os comprovantes

Mesmo que o seu controle de estoque seja só gerencial, as notas das compras de material têm outra função: são documentos fiscais da sua empresa. Algumas referências da legislação, em outubro de 2026:

- O Código Tributário Nacional (art. 195, parágrafo único) determina que os livros obrigatórios e os comprovantes dos lançamentos neles feitos sejam conservados até a prescrição dos créditos tributários a que se refiram. Os prazos de decadência e de prescrição do CTN (arts. 173 e 174) são de cinco anos, contados de formas diferentes. Por isso, na prática, guardar os comprovantes por pelo menos cinco anos é o mínimo, e o prazo exato no seu caso deve ser confirmado com o contador.
- A Lei Complementar nº 123/2006 (art. 26, II) obriga as empresas do Simples Nacional a manter em boa ordem e guarda os documentos que fundamentaram a apuração dos tributos, enquanto não decorrido o prazo decadencial e não prescritas as ações. Para o MEI, o mesmo artigo (§ 6º, I) prevê que os documentos fiscais das entradas de mercadorias e dos serviços tomados sejam anexados ao registro de vendas ou de prestação de serviços, na forma regulamentada.

Na prática: guarde a nota de cada compra (o PDF ou o XML, se for eletrônica) e anote na entrada do estoque o número da nota e o fornecedor. Assim, qualquer conferência futura liga o material ao documento. Se a compra foi feita sem nota, registre do mesmo jeito no controle gerencial, mas converse com o seu contador sobre o tratamento correto.

## Controle gerencial não é inventário fiscal

O controle de estoque deste guia serve para você: saber o que tem, o que falta, quanto custou e quanto cobrar. Ele não substitui obrigações fiscais que algumas empresas têm, como livros e registros de inventário exigidos em certos regimes e atividades. Quem precisa de inventário fiscal depende do regime tributário, da atividade e do estado. Se a sua empresa vende mercadorias, industrializa ou tem dúvida sobre o enquadramento, confirme com o contador.

## Planilha, caderno ou aplicativo?

Para começar, qualquer ferramenta serve, desde que você use todos os dias. Cada opção tem limites claros:

| Ferramenta | Funciona bem quando | Onde falha |
|---|---|---|
| Caderno | Poucos itens, uma pessoa | Não soma, não avisa, não liga ao serviço |
| Planilha | Até algumas dezenas de itens, alguém disciplinado no computador | Baixa depende de lembrar; difícil no celular; fórmulas quebram |
| Aplicativo que liga serviço e estoque | Material usado em muitos serviços, equipe, uso no celular | Exige cadastrar os itens no começo |

O guia [planilha de controle de estoque](/guias/planilha-de-controle-de-estoque/) mostra como montar uma planilha que funciona e em que momento ela deixa de dar conta.

Se você já registra os serviços no MinhaOS App, o [controle de estoque](/funcionalidades/controle-de-estoque/) faz a baixa sozinho: ao escolher o material na linha do serviço e salvar, a saída é registrada pelo custo médio do item, o cliente é cobrado pelo valor de venda e o painel avisa o que precisa de reposição.

## Estoque na equipe: quem pode ver o quê

Quando mais de uma pessoa mexe no material, duas regras ajudam:

1. **Cada movimento tem autor.** Quem tirou, quem lançou, em qual serviço. Isso não é desconfiança; é o que permite descobrir onde a diferença aconteceu.
2. **Nem todo mundo precisa ver custo.** O ajudante precisa saber o que tem e lançar o que usou. Custo de compra e margem são informação de quem administra o negócio.

Se a sua equipe usa a mesma conta, defina papéis claros. A página [usuários e permissões](/funcionalidades/usuarios-e-permissoes/) explica como isso funciona no MinhaOS App, em que o operador movimenta o estoque sem ver custos.

## Erros comuns no controle de estoque de serviço

- **Cadastrar tudo de uma vez.** Você desiste na primeira semana. Comece pelos itens que importam.
- **Dar baixa "depois".** A baixa deve acontecer junto com o registro do serviço, senão não acontece.
- **Unidade errada.** Cabo em rolo, quando você usa em metro, gera saldo fracionado sem sentido ("0,15 rolo").
- **Apagar movimentos para fazer o saldo bater.** Use o ajuste de inventário. O histórico de diferenças é informação.
- **Misturar ferramenta com material.** Ferramenta é patrimônio, não sai a cada serviço.
- **Não ligar estoque e cobrança.** Material usado e não lançado no serviço é dinheiro que fica na mesa.
- **Ignorar o custo.** Sem custo, você controla quantidade, mas não sabe se o serviço deu lucro.

## Por onde começar hoje

1. Escolha os 10 a 20 materiais que você mais usa.
2. Defina a unidade de cada um e conte o que tem.
3. Lance o saldo inicial, com o custo da última compra.
4. A partir de amanhã, registre cada compra e cada uso no serviço.
5. No fim do mês, conte de novo, ajuste e veja quanto o material pesou em cada serviço.

Depois de um mês, você terá números reais para revisar preços, decidir o estoque mínimo e saber quanto dinheiro está parado no carro. É um controle pequeno, que se paga no primeiro material que deixa de faltar ou de ser esquecido na cobrança.
