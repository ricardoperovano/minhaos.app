---
title: "Controle de manutenção predial e cobrança mensal"
h1: "Registro de chamados e cobrança para manutenção predial"
profissao: "Prestador de manutenção predial"
plural: "Manutenção predial"
description: "Controle de manutenção predial para condomínios e empresas: registre chamados, visitas e contrato mensal e envie ao síndico um demonstrativo detalhado."
keyword: "controle de manutenção predial"
updatedAt: 2026-10-22
unidades: ["serviço", "visita", "hora", "diária", "unidade"]
exemplo:
  cliente: "Condomínio Edifício Monte Verde (fictício)"
  itens:
    - { data: "01/10/2026", descricao: "Contrato mensal de manutenção preventiva (4 visitas)", quantidade: "1", unidade: "serviço", valorUnitario: "1800.00" }
    - { data: "05/10/2026", descricao: "Chamado: portão da garagem travando, ajuste do motor", quantidade: "2", unidade: "horas", valorUnitario: "95.00" }
    - { data: "08/10/2026", descricao: "Troca de lâmpadas e reatores das áreas comuns", quantidade: "6", unidade: "unidades", valorUnitario: "35.00" }
    - { data: "12/10/2026", descricao: "Pintura do hall do bloco B (mão de obra)", quantidade: "2", unidade: "diárias", valorUnitario: "420.00" }
faq:
  - q: "Como controlar os serviços de manutenção predial?"
    a: "Registre cada chamado e cada visita preventiva no dia, com local, problema, solução, tempo e material. Separe o que está no contrato do que é extra. No fim do mês, envie um único documento por cliente com tudo discriminado."
  - q: "Como cobrar contrato de manutenção de condomínio?"
    a: "Lance o valor fixo do contrato como uma linha e os serviços fora do contrato como linhas separadas, por hora, visita ou diária. O síndico aprova mais rápido quando vê o que é fixo e o que foi adicional."
  - q: "Como prestar contas dos serviços ao síndico?"
    a: "Envie um demonstrativo com data, local e descrição de cada serviço, quantidade e valor. Anexe a nota fiscal, quando houver. Um histórico organizado ajuda o síndico a apresentar as despesas na assembleia."
  - q: "Material comprado para o condomínio entra na cobrança?"
    a: "Sim, como linha separada da mão de obra, com a nota de compra guardada. No MinhaOS App, o material cadastrado no estoque é escolhido na própria linha do serviço: o preço vem do valor de venda do item e a baixa do estoque é registrada ao salvar."
  - q: "O MinhaOS App gera boleto para o condomínio?"
    a: "Não. O aplicativo emite um demonstrativo de cobrança com as instruções de pagamento que você configurar, como sua chave Pix. O pagamento é feito fora e você registra o recebimento."
related: ["ordem-de-servico-de-manutencao", "numeracao-e-controle-de-ordens-de-servico", "contrato-de-prestacao-de-servico", "controle-de-servicos-prestados"]
---

Manutenção predial é feita de duas coisas: a rotina combinada (visitas preventivas, verificações periódicas) e os chamados que surgem a qualquer hora (portão travado, lâmpada queimada, infiltração, porta que não fecha). Quem atende condomínios, escritórios e lojas sabe que a parte difícil não é resolver o problema, é provar depois o que foi feito, quando e por quanto.

O síndico ou o gestor precisa prestar contas a outras pessoas. Uma cobrança com um valor total e nenhum detalhe trava na aprovação. Uma lista com data, local, serviço e valor passa.

## Como a manutenção predial costuma ser cobrada

- **Contrato mensal**: valor fixo por um conjunto de visitas preventivas e, às vezes, um número de chamados incluídos.
- **Chamado avulso**: por visita ou por hora, para o que estiver fora do contrato.
- **Diária**: pintura, reparos maiores, serviços com equipe.
- **Serviço com preço fechado**: troca de um equipamento, reforma de um ambiente, após orçamento.

O [contrato de prestação de serviço](/guias/contrato-de-prestacao-de-servico/) deve dizer o que está incluído no valor fixo, como os extras são cobrados, o prazo de atendimento e a data de pagamento.

## Ordem de serviço para cada chamado

Cada chamado deve gerar um registro, mesmo os pequenos. Uma [ordem de serviço de manutenção](/guias/ordem-de-servico-de-manutencao/) com local, problema relatado, solução, tempo gasto e material usado vira histórico do prédio: você sabe quantas vezes o portão deu problema neste ano e tem argumento para propor a troca do motor.

Numerar os registros ajuda na conversa com o cliente ("o chamado SV-0042 do dia 5"). O guia de [numeração e controle de ordens de serviço](/guias/numeracao-e-controle-de-ordens-de-servico/) explica como organizar isso.

## Material e peças

Lâmpadas, reatores, fechaduras, tinta, peças de motor: lance o material em linhas separadas da mão de obra, com quantidade e valor. Guarde as notas de compra. Em condomínios, isso é essencial para a prestação de contas.

## Fechamento mensal por cliente

O formato que melhor funciona é uma cobrança por mês e por cliente: o contrato em uma linha, cada chamado extra em outra, cada material com sua quantidade. O guia de [controle de serviços prestados](/guias/controle-de-servicos-prestados/) mostra como manter esse controle sem retrabalho.

## Erros comuns na manutenção predial

- **Chamado pequeno sem registro.** Trocar uma lâmpada parece irrelevante, mas dez chamados assim no mês somam horas e material.
- **Contrato sem limite claro.** Se o contrato não diz o que está incluído, todo chamado vira discussão sobre ser ou não "extra".
- **Material sem nota.** Em condomínio, toda compra pode ser questionada na assembleia. Guarde a nota e lance o item com descrição.
- **Cobrança atrasada.** Quanto mais tempo entre o serviço e a cobrança, mais difícil lembrar e justificar. Feche o mês nos primeiros dias do mês seguinte.
- **Histórico espalhado.** Mensagens no WhatsApp, papéis na caminhonete e anotações no celular não formam um histórico confiável do prédio.

## Controle de material e ferramentas

Lâmpadas, reatores, tinta, massa corrida, fita, parafusos e buchas são comprados em quantidade e usados aos poucos em vários prédios. No [controle de estoque](/funcionalidades/controle-de-estoque/) do MinhaOS App, cada material tem unidade (unidade, litro, quilo, caixa), estoque mínimo e custo. Ao lançar "6 lâmpadas LED" na linha do chamado, a saída é registrada sozinha, e você sabe quanto de material cada condomínio consumiu no mês.

Escadas, andaimes, lavadoras de alta pressão e furadeiras costumam ficar em mais de um endereço. No [controle de patrimônio](/funcionalidades/controle-de-patrimonio/), cada bem tem código, responsável, local e etiqueta com QR code, e a situação mostra o que está em manutenção ou emprestado. O guia [controle de estoque para prestador de serviço](/guias/controle-de-estoque-para-prestador-de-servico/) mostra como organizar tudo.

## Como o MinhaOS App ajuda

O MinhaOS App registra cada serviço com um código (como SV-0042) e uma ou mais linhas: data, descrição, unidade (serviço, visita, hora, diária ou unidade), quantidade e valor. O total é calculado automaticamente. A observação interna guarda o que só você precisa saber, como "motor do portão no limite, sugerir troca".

No fechamento, você escolhe o cliente e o período, marca os lançamentos e emite o [demonstrativo de cobrança](/funcionalidades/demonstrativo-de-cobranca/), com número, período de referência, emissão, vencimento e as instruções de pagamento que você configurou. Um lançamento cobrado não entra em outra cobrança. O síndico recebe o link, abre sem criar conta, imprime em A4, baixa a nota fiscal [anexada](/funcionalidades/notas-fiscais-anexas/) e pode confirmar o recebimento.

Você registra os pagamentos manualmente, acompanha saldos e atrasos e exporta os [relatórios](/funcionalidades/relatorios/) em CSV. O aplicativo não tem agenda de visitas e não emite nota fiscal nem boleto.
