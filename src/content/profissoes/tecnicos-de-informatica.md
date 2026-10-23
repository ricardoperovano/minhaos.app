---
title: "Controle de atendimentos para técnico de informática"
h1: "Registro e cobrança de atendimentos para técnicos de informática"
profissao: "Técnico de informática"
plural: "Técnicos de informática"
description: "Ordem de serviço para técnico de informática: registre visitas, horas e suporte mensal por cliente e envie um demonstrativo detalhado no fim do mês."
keyword: "ordem de serviço para técnico de informática"
updatedAt: 2026-10-22
unidades: ["visita", "hora", "serviço", "unidade"]
exemplo:
  cliente: "Escritório Contábil Horizonte (fictício)"
  itens:
    - { data: "01/10/2026", descricao: "Suporte mensal: até 4 horas de atendimento remoto", quantidade: "1", unidade: "serviço", valorUnitario: "450.00" }
    - { data: "05/10/2026", descricao: "Visita técnica: impressora de rede sem comunicação", quantidade: "1", unidade: "visita", valorUnitario: "130.00" }
    - { data: "08/10/2026", descricao: "Formatação e configuração de notebook novo", quantidade: "2", unidade: "unidades", valorUnitario: "180.00" }
    - { data: "13/10/2026", descricao: "Atendimento remoto além do pacote mensal", quantidade: "1.5", unidade: "horas", valorUnitario: "110.00" }
faq:
  - q: "Como fazer ordem de serviço para técnico de informática?"
    a: "Registre o cliente, o equipamento ou sistema atendido, a data, o problema relatado, o que foi feito e como o valor foi calculado. Anote também senhas trocadas ou configurações alteradas em um campo interno, fora do documento que vai para o cliente."
  - q: "Quanto cobrar por hora de suporte técnico?"
    a: "Não existe tabela única: o valor depende dos seus custos, do tempo disponível e da região. Calcule sua hora a partir do quanto precisa faturar no mês e das horas que realmente consegue cobrar. A calculadora de valor-hora do site faz essa conta com os seus números."
  - q: "Como cobrar contrato mensal de suporte de TI?"
    a: "Lance o valor fixo do mês como uma linha (por exemplo, 1 serviço) e os atendimentos fora do contrato como linhas separadas, por hora ou por visita. No fechamento, tudo vai em um único demonstrativo, e o cliente vê o que é fixo e o que é extra."
  - q: "Como cobrar peças e equipamentos que eu comprei?"
    a: "Registre a peça como uma linha própria, separada da mão de obra, e guarde a nota de compra. No MinhaOS App, se a peça está no estoque, você escolhe o item na linha: o preço vem do valor de venda cadastrado e a saída do estoque é registrada sozinha ao salvar o serviço."
  - q: "O cliente precisa instalar alguma coisa para ver a cobrança?"
    a: "Não. O demonstrativo é enviado por link e abre no navegador, sem cadastro. O cliente pode imprimir, salvar em PDF e baixar notas fiscais anexadas."
related: ["ordem-de-servico-digital", "quanto-cobrar-por-hora", "cobrar-por-hora-diaria-ou-projeto", "fechamento-mensal-de-servicos"]
---

Técnico de informática vive de atendimentos curtos e frequentes. Uma impressora que parou, um e-mail que não sincroniza, um notebook novo para configurar, um acesso remoto de vinte minutos. Cada um parece pequeno demais para virar cobrança, e é justamente aí que o dinheiro se perde: no fim do mês, ninguém lembra das três chamadas rápidas da terça-feira.

O caminho é registrar cada atendimento no momento em que ele acontece, com data, tempo gasto e o que foi feito, e cobrar tudo junto no fechamento do mês. Uma [ordem de serviço digital](/guias/ordem-de-servico-digital/) resolve isso sem papel e sem planilha espalhada.

## Formas comuns de cobrança em suporte de TI

- **Visita técnica**: valor fixo para ir até o cliente, que cobre deslocamento e um tempo mínimo de trabalho.
- **Hora técnica**: para atendimentos remotos, migrações, configuração de rede e qualquer trabalho de duração incerta. Frações de hora (0,5; 1,5) deixam a conta mais justa.
- **Serviço com preço fechado**: formatação, instalação de sistema, montagem de máquina.
- **Contrato mensal de suporte**: um valor fixo por mês, com um limite de horas ou de chamados, e extras cobrados à parte.

O contrato mensal é o que dá previsibilidade, mas só funciona se você controlar o que excede o combinado. Sem registro, o "suporte ilimitado" informal vira trabalho de graça. O guia [cobrar por hora, diária ou projeto](/guias/cobrar-por-hora-diaria-ou-projeto/) ajuda a decidir o modelo, e o [guia de valor da hora](/guias/quanto-cobrar-por-hora/) mostra como chegar ao seu preço.

## Peças e equipamentos

Memória, SSD, cabos, roteador: muitas vezes você compra e repassa ao cliente. Lance a peça como uma linha separada da mão de obra e guarde a nota da compra. Se o cliente comprar direto, registre só a instalação. Misturar peça e serviço em um valor único dificulta a conferência e gera desconfiança.

## O que registrar em cada chamado

1. Cliente e, se for empresa, quem pediu o atendimento.
2. Data e forma do atendimento (remoto ou presencial).
3. Problema relatado e solução aplicada, em linguagem simples.
4. Unidade e quantidade: 1 visita, 1,5 hora, 2 unidades.
5. Observações internas: senhas trocadas, pendências, sugestões de upgrade. Isso não deve ir para o documento do cliente.

Com esse histórico, você responde rápido quando o cliente pergunta "o que foi feito no computador da recepção mês passado?" e tem base para propor melhorias.

## Fechamento mensal com clientes de contrato

Para escritórios e pequenas empresas, o melhor formato costuma ser uma cobrança por mês: o valor do contrato em uma linha e cada atendimento extra em outra, com data e quantidade. O cliente vê, em um só documento, o que é fixo e o que foi adicional. O guia de [fechamento mensal de serviços](/guias/fechamento-mensal-de-servicos/) mostra como montar essa rotina.

## Controle de material e ferramentas

SSD, memória, fonte, cabo de rede, conectores RJ45 e pasta térmica são peças pequenas, caras e fáceis de perder de vista. No [controle de estoque](/funcionalidades/controle-de-estoque/) do MinhaOS App, cada uma tem saldo, estoque mínimo e custo médio; o cabo de rede pode ser controlado em metro ou em caixa. Ao usar a peça num chamado, você escolhe o item na linha do serviço e a saída é registrada sozinha.

Notebooks de teste, alicate de crimpar, testador de cabo e estação de solda entram no [controle de patrimônio](/funcionalidades/controle-de-patrimonio/), com número de série, garantia, responsável e etiqueta com QR code. O guia [controle de estoque para prestador de serviço](/guias/controle-de-estoque-para-prestador-de-servico/) explica como começar.

## Como o MinhaOS App ajuda

No MinhaOS App você cadastra o cliente (pessoa física ou empresa) e registra o serviço com quantas linhas precisar. Cada linha tem data, descrição, unidade (hora, visita, unidade, serviço ou diária), quantidade com até quatro casas decimais e valor unitário. O total é calculado e arredondado em centavos. A observação interna fica separada da observação que o cliente vê.

No [fechamento mensal](/funcionalidades/fechamento-mensal/), você escolhe o cliente e o período, marca os lançamentos que entram e emite o demonstrativo. O sistema impede que um lançamento já cobrado entre em outra cobrança. O cliente recebe um [link do demonstrativo](/funcionalidades/link-e-acessos/), abre sem criar conta e pode confirmar o recebimento do documento. Você vê quando o link foi visualizado pela primeira e pela última vez.

Quando o pagamento entra, você registra o recebimento manualmente e acompanha o saldo e os atrasos nos [relatórios](/funcionalidades/relatorios/), com exportação em CSV.

O aplicativo não emite nota fiscal e não gera boleto. Se você emite NFS-e, anexe o PDF ou XML ao demonstrativo.
