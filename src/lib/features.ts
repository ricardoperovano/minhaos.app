/**
 * Páginas de funcionalidades (/funcionalidades/<slug>/).
 * Conteúdo descreve SOMENTE o que o produto faz hoje (ver docs do repositório minha-os).
 * Parágrafos são HTML confiável (escrito aqui), renderizado com set:html.
 */
import type { ImageMetadata } from 'astro'
import atividade from '../assets/screens/atividade-1440.png'
import compartilhamento from '../assets/screens/compartilhamento-1440.png'
import dashboard from '../assets/screens/dashboard-1440.png'
import dashboardMobile from '../assets/screens/dashboard-390-standalone.png'
import fechamento from '../assets/screens/fechamento-1440.png'
import instalarIos from '../assets/screens/instalar-ios-390.png'
import novoServico from '../assets/screens/novo-servico-390.png'
import publico from '../assets/screens/publico-1440.png'
import servicos from '../assets/screens/servicos-1440.png'

export interface FeatureImage {
  src: ImageMetadata
  alt: string
  caption: string
  /** Captura de celular (exibida mais estreita). */
  mobile?: boolean
}

export interface FeatureSection {
  h2: string
  /** Parágrafos em HTML. */
  body: string[]
  /** Passo a passo (lista numerada), em HTML. */
  steps?: string[]
  /** Lista simples, em HTML. */
  bullets?: string[]
  /** Imagem exibida ao fim da seção. */
  image?: FeatureImage
}

export interface Feature {
  slug: string
  /** <title> sem sufixo, até 60 caracteres. */
  title: string
  h1: string
  /** Meta description, 110–160 caracteres. */
  description: string
  /** Nome curto para cards e links. */
  name: string
  /** Resumo de uma frase para o card do índice. */
  summary: string
  intro: string[]
  image: FeatureImage
  sections: FeatureSection[]
  /** O que a funcionalidade não faz (limites honestos). */
  limits: string[]
  faq: Array<{ q: string; a: string }>
  guides: Array<{ slug: string; label: string }>
  related: string[]
}

export const features: Feature[] = [
  {
    slug: 'registro-de-servicos',
    name: 'Registro de serviços',
    title: 'Registro de serviços prestados com data e valor',
    h1: 'Registro de serviços: cada execução com data, quantidade e valor',
    description:
      'Registre serviços prestados com uma linha por data de execução: unidade, quantidade e valor unitário, total calculado em centavos e observações separadas.',
    summary: 'Uma linha por data de execução, com unidade, quantidade e valor. O total é calculado sozinho.',
    intro: [
      'O registro de serviços é a base de tudo no MinhaOS App. Cada serviço pertence a um cliente e tem uma ou mais <strong>linhas de execução</strong> (lançamentos): uma para cada dia em que você trabalhou, com a unidade de cobrança, a quantidade e o valor unitário.',
      'Assim, um trabalho que durou três dias aparece como três linhas com datas próprias, e não como um valor solto. Na hora de cobrar, você escolhe exatamente quais linhas entram na cobrança, e o cliente vê cada data no demonstrativo.',
    ],
    image: {
      src: novoServico,
      alt: 'Tela “Novo serviço” no celular, com os campos Cliente, Título e Descrição e o início da seção Lançamentos.',
      caption: 'Cadastro de um serviço pelo celular: cliente, título, descrição e lançamentos.',
      mobile: true,
    },
    sections: [
      {
        h2: 'Como registrar um serviço',
        body: ['O cadastro cabe em uma tela e funciona no computador ou no celular.'],
        steps: [
          'Toque em <strong>Novo serviço</strong> (no painel ou na lista de serviços).',
          'Escolha o <strong>cliente</strong>. Só clientes ativos aparecem; se ele ainda não existe, cadastre na hora, sem sair da tela. Para ir rápido, o cadastro de cliente aceita só o nome; CPF/CNPJ, contato e endereço podem ser completados depois.',
          'Dê um <strong>título</strong> ao serviço (por exemplo, “Manutenção preventiva — outubro”) e, se quiser, uma descrição.',
          'Adicione os <strong>lançamentos</strong>: data, descrição, unidade, quantidade e valor unitário. Uma linha por data de execução.',
          'Preencha, se precisar, a <strong>observação para o cliente</strong> (aparece no demonstrativo) e a <strong>observação interna</strong> (só você vê).',
          'Salve. O serviço recebe um código sequencial, como SV-0031, que ajuda a localizar o registro depois.',
        ],
      },
      {
        h2: 'Unidades, quantidades e o cálculo do total',
        body: [
          'Cada linha usa uma destas unidades: <strong>hora</strong>, <strong>unidade</strong>, <strong>diária</strong>, <strong>visita</strong> ou <strong>serviço</strong>. A quantidade aceita até quatro casas decimais (2,5 horas; 0,25 hora; 1,3333 diária) e o valor unitário até duas.',
          'O total da linha é quantidade × valor unitário, arredondado em centavos (meio centavo para cima). Exemplo: 2,5 horas × R$ 120,00 = R$ 300,00. O total do serviço é a soma das linhas já arredondadas, então a conta que o cliente vê sempre fecha.',
          'Material e peças não têm cadastro próprio: quando você repassa material ao cliente, lance como uma linha do serviço (por exemplo, “Material: cabos e conectores”, 1 unidade, com o valor da compra).',
        ],
      },
      {
        h2: 'Várias datas de uma vez',
        body: [
          'Para trabalhos repetidos, como uma diária toda quarta-feira ou uma aula às terças e quintas, use <strong>Adicionar várias datas</strong>. Você informa uma lista de datas, ou um intervalo e os dias da semana, além da descrição, unidade, quantidade e valor de cada lançamento. O sistema cria uma linha para cada data, com até 100 datas por vez, e avisa se alguma já existe no serviço.',
        ],
      },
      {
        h2: 'Lista de serviços e situação de faturamento',
        body: [
          'A lista de serviços pode ser filtrada por texto (título, código ou descrição), cliente, mês de execução, situação (registrado ou cancelado) e faturamento: <strong>a faturar</strong>, <strong>parcialmente faturado</strong> ou <strong>faturado</strong>. O total das linhas do filtro aparece no topo, somando todas as páginas.',
          'Isso responde rápido a perguntas como “quanto executei para este cliente em setembro?” ou “o que ainda não cobrei?”.',
        ],
        image: {
          src: servicos,
          alt: 'Lista de serviços de outubro de 2026 com filtros por cliente, mês e faturamento; quatro serviços com a situação “A faturar” e total de R$ 1.240,00.',
          caption: 'Lista de serviços filtrada pelo mês de execução, com a situação de faturamento de cada um.',
        },
      },
      {
        h2: 'Editar e cancelar sem bagunçar a cobrança',
        body: [
          'Enquanto uma linha não entrou em nenhuma cobrança, você pode alterá-la ou removê-la livremente. Quando ela está reservada em um rascunho de demonstrativo ou já foi cobrada em um demonstrativo emitido, fica travada. Para corrigir, você exclui o rascunho ou cancela o demonstrativo, e a linha volta a ficar disponível.',
          'Um serviço registrado por engano pode ser cancelado, com um motivo. Serviços cancelados não entram no fechamento nem nos totais de executado.',
        ],
      },
    ],
    limits: [
      'Não tem agenda nem controle de horários de visitas: você registra o que já executou.',
      'Não controla estoque: material entra como linha do serviço, com descrição e valor.',
      'Não coleta assinatura do cliente na ordem de serviço.',
      'Precisa de conexão com a internet para salvar; não há fila de envio para quando você estiver sem sinal.',
    ],
    faq: [
      {
        q: 'Posso registrar um serviço que durou vários dias?',
        a: 'Sim. Crie um serviço e adicione uma linha para cada data de execução, cada uma com sua quantidade e valor. Na cobrança, o cliente vê cada data separadamente.',
      },
      {
        q: 'Dá para usar frações de hora?',
        a: 'Sim. A quantidade aceita até quatro casas decimais, como 1,5 hora ou 0,25 hora. O total é calculado e arredondado em centavos.',
      },
      {
        q: 'O cliente vê a observação interna?',
        a: 'Não. A observação interna fica só no seu painel. O que deve aparecer no demonstrativo vai no campo de observação para o cliente.',
      },
      {
        q: 'Como registro o material que comprei para o serviço?',
        a: 'Como uma linha do próprio serviço, com descrição e valor. O MinhaOS App não tem controle de estoque, então o material é tratado como um item da cobrança.',
      },
    ],
    guides: [
      { slug: 'como-fazer-ordem-de-servico', label: 'Como fazer uma ordem de serviço' },
      { slug: 'controle-de-servicos-prestados', label: 'Controle de serviços prestados' },
      { slug: 'planilha-de-controle-de-servicos', label: 'Planilha de controle de serviços' },
      { slug: 'ordem-de-servico-digital', label: 'Ordem de serviço digital' },
    ],
    related: ['fechamento-mensal', 'demonstrativo-de-cobranca', 'aplicativo-no-celular'],
  },
  {
    slug: 'fechamento-mensal',
    name: 'Fechamento mensal',
    title: 'Fechamento mensal de serviços por cliente',
    h1: 'Fechamento mensal: junte os lançamentos do cliente e emita a cobrança',
    description:
      'Faça o fechamento mensal de serviços por cliente e período: selecione os lançamentos a cobrar, revise o total e emita o demonstrativo sem cobrar nada em dobro.',
    summary: 'Escolha cliente e período, marque o que entra e emita o demonstrativo. Nada é cobrado duas vezes.',
    intro: [
      'O fechamento mensal é o momento em que você transforma o que executou em cobrança. No MinhaOS App, ele é um assistente em quatro etapas: escolher o cliente e o período, selecionar os lançamentos, revisar o demonstrativo e emitir.',
      'A regra que protege você e o cliente: um lançamento só pode estar em uma cobrança por vez. O que já foi cobrado não aparece como disponível de novo, e o que está em um rascunho fica reservado até você decidir.',
    ],
    image: {
      src: fechamento,
      alt: 'Tela de fechamento mensal na etapa “Selecionar lançamentos”: lançamentos de setembro de 2026 de um cliente agrupados por serviço, com caixas de seleção e um resumo da seleção à direita.',
      caption: 'Etapa de seleção: lançamentos do cliente no período, agrupados por serviço, com o total da seleção ao lado.',
    },
    sections: [
      {
        h2: 'As quatro etapas do fechamento',
        body: [],
        steps: [
          '<strong>Cliente e período.</strong> Escolha o cliente e o mês de referência, ou use um intervalo personalizado de datas.',
          '<strong>Selecionar lançamentos.</strong> Aparecem as linhas daquele cliente com data de execução no período, agrupadas por serviço. Marque uma a uma, um serviço inteiro ou use “Selecionar todos os disponíveis”.',
          '<strong>Revisar demonstrativo.</strong> Confira os itens, o total, defina o vencimento e, se quiser, uma observação para o cliente.',
          '<strong>Emitir e compartilhar.</strong> Ao emitir, o demonstrativo recebe número e data de emissão e você já pode gerar o link para o cliente.',
        ],
      },
      {
        h2: 'Rascunho reserva os lançamentos',
        body: [
          'Se você ainda não quer emitir, salve como <strong>rascunho</strong>. Os lançamentos selecionados ficam reservados: não podem entrar em outro demonstrativo nem ser alterados no serviço. Se desistir, excluir o rascunho libera tudo de volta.',
          'Linhas indisponíveis continuam visíveis na seleção, com a indicação de onde estão (o rascunho ou o demonstrativo que as contém). Assim você entende por que não pode marcá-las, em vez de achar que sumiram.',
        ],
      },
      {
        h2: 'Emissão com conferência do total',
        body: [
          'Na emissão, o servidor confere de novo se todas as linhas continuam disponíveis e recalcula o total. Se algo mudou entre a revisão e o clique em emitir, o sistema avisa e não emite com um valor diferente do que você revisou.',
          'O vencimento é obrigatório e não pode ser anterior à data de emissão. Depois de emitido, o demonstrativo não muda; as linhas passam a constar como faturadas.',
        ],
      },
      {
        h2: 'Cobrança de um único serviço',
        body: [
          'Nem tudo espera o fim do mês. Para um trabalho avulso, você pode emitir um demonstrativo só com as linhas de um serviço, logo após terminá-lo. A mesma regra vale: o que foi cobrado ali não aparece no fechamento seguinte.',
        ],
      },
      {
        h2: 'Lembrete para não esquecer de fechar',
        body: [
          'O painel mostra os clientes com serviços a faturar. Além disso, nos primeiros dias do mês, se houver lançamentos do mês anterior ainda não cobrados, você recebe um e-mail de lembrete de fechamento. É possível desligar esse aviso nas preferências de e-mail.',
        ],
      },
    ],
    limits: [
      'O fechamento não é automático: você escolhe o que entra e emite. Não há cobrança recorrente programada.',
      'Cada demonstrativo é de um único cliente.',
      'No plano Grátis, o sistema não envia a cobrança sozinho: você compartilha o link por WhatsApp, e-mail ou outro meio. O envio por e-mail direto da plataforma, com lembretes automáticos de vencimento e atraso, faz parte dos planos Profissional e Negócios.',
      'Não calcula multa, juros ou descontos automaticamente.',
    ],
    faq: [
      {
        q: 'O que acontece se eu tentar cobrar o mesmo lançamento duas vezes?',
        a: 'Não é possível. Lançamentos reservados em rascunho ou cobrados em demonstrativo emitido aparecem como indisponíveis, com a indicação do documento em que estão.',
      },
      {
        q: 'Posso fechar só parte dos lançamentos do mês?',
        a: 'Sim. Você marca apenas as linhas que quer cobrar agora. As demais continuam a faturar e aparecem no próximo fechamento.',
      },
      {
        q: 'Errei um valor depois de emitir. Como corrijo?',
        a: 'Cancele o demonstrativo, informando o motivo. As linhas voltam a ficar disponíveis, você corrige o serviço e emite um novo demonstrativo. Se já houver recebimento registrado, é preciso estorná-lo antes de cancelar.',
      },
      {
        q: 'Posso usar um período diferente do mês?',
        a: 'Sim. Além do mês de referência, você pode escolher um intervalo de datas, por exemplo uma quinzena.',
      },
    ],
    guides: [
      { slug: 'fechamento-mensal-de-servicos', label: 'Fechamento mensal de serviços' },
      { slug: 'como-cobrar-cliente', label: 'Como cobrar um cliente' },
      { slug: 'controle-de-servicos-prestados', label: 'Controle de serviços prestados' },
      { slug: 'prazo-de-pagamento-para-prestador', label: 'Prazo de pagamento para prestador' },
    ],
    related: ['registro-de-servicos', 'demonstrativo-de-cobranca', 'link-e-acessos'],
  },
  {
    slug: 'demonstrativo-de-cobranca',
    name: 'Demonstrativo de cobrança',
    title: 'Demonstrativo de cobrança de serviços em PDF',
    h1: 'Demonstrativo de cobrança: o que foi feito, quando e quanto custa',
    description:
      'Emita um demonstrativo de cobrança numerado, com itens, datas, vencimento e total, que não muda depois de emitido e pode ser impresso ou salvo em PDF A4.',
    summary: 'Documento numerado com itens, datas, vencimento e total. Imutável depois de emitido, pronto para imprimir em A4.',
    intro: [
      'O demonstrativo de cobrança é o documento que você envia ao cliente para cobrar. Ele lista cada item executado com data, unidade, quantidade, valor unitário e total, além do vencimento e das suas instruções de pagamento.',
      'Ele <strong>não é nota fiscal</strong> e diz isso no rodapé. Serve para o cliente entender e conferir a cobrança. Se você emite nota fiscal fora do sistema, pode anexá-la ao demonstrativo.',
    ],
    image: {
      src: publico,
      alt: 'Demonstrativo de serviços nº DS-2026-0007 com dados do prestador e do cliente fictícios, período de referência, emissão, vencimento, tabela de itens, total, saldo em aberto, instruções de pagamento e nota fiscal anexada.',
      caption: 'Demonstrativo como o cliente vê: itens, totais, instruções de pagamento e anexos.',
    },
    sections: [
      {
        h2: 'O que aparece no demonstrativo',
        body: [],
        bullets: [
          '<strong>Número</strong> sequencial (por exemplo, DS-2026-0007).',
          '<strong>Seus dados</strong> de prestador, conforme as configurações da conta, e os <strong>dados do cliente</strong>.',
          '<strong>Período de referência</strong>, <strong>data de emissão</strong> e <strong>vencimento</strong>.',
          '<strong>Itens</strong>: descrição, data, unidade, quantidade, valor unitário e total de cada linha.',
          '<strong>Total</strong>, <strong>valor recebido</strong> e <strong>saldo em aberto</strong>.',
          '<strong>Observação</strong> para o cliente e <strong>instruções de pagamento</strong> (por exemplo, sua chave Pix ou dados bancários, escritos por você).',
          '<strong>Notas fiscais e documentos</strong> anexados, para download.',
        ],
      },
      {
        h2: 'Rascunho, emitido e cancelado',
        body: [
          'Enquanto é <strong>rascunho</strong>, você pode trocar lançamentos, vencimento e observação. Ao <strong>emitir</strong>, o conteúdo é congelado: itens, dados do cliente, seus dados e instruções de pagamento ficam como estavam naquele momento. Se você mudar o seu endereço ou a chave Pix depois, os demonstrativos já emitidos não mudam.',
          'Para desfazer uma emissão, você <strong>cancela</strong> o demonstrativo informando um motivo. Os lançamentos voltam a ficar disponíveis para cobrança e os links públicos são revogados. Se houver recebimento registrado, ele precisa ser estornado antes.',
        ],
      },
      {
        h2: 'Imprimir ou salvar em PDF',
        body: [
          'O demonstrativo tem um layout de impressão em A4. Use “Imprimir / salvar em PDF” no painel ou peça ao cliente que faça o mesmo pela página do link. O PDF é gerado pelo próprio navegador, então funciona em computador e celular.',
        ],
      },
      {
        h2: 'Situação de pagamento',
        body: [
          'Depois de emitido, o demonstrativo mostra se está <strong>em aberto</strong>, <strong>parcialmente recebido</strong> ou <strong>recebido</strong>, e é marcado como <strong>em atraso</strong> quando o vencimento passou e ainda há saldo. Essas informações vêm dos recebimentos que você registra.',
        ],
      },
    ],
    limits: [
      'Não é nota fiscal nem NFS-e e não substitui documento fiscal.',
      'Não gera boleto, código Pix ou link de pagamento: as instruções de pagamento são um texto escrito por você.',
      'Não pode ser editado depois de emitido; a correção é feita cancelando e emitindo outro.',
      'Não tem assinatura digital nem certificado.',
    ],
    faq: [
      {
        q: 'Demonstrativo de cobrança é a mesma coisa que nota fiscal?',
        a: 'Não. O demonstrativo detalha o serviço e o valor cobrado, mas não tem validade fiscal. A nota fiscal é emitida no sistema oficial da prefeitura ou no emissor nacional, e pode ser anexada ao demonstrativo.',
      },
      {
        q: 'Posso mudar o vencimento depois de emitir?',
        a: 'Não. Depois de emitido, o demonstrativo não muda. Se precisar de outro vencimento, cancele com um motivo e emita um novo.',
      },
      {
        q: 'O cliente consegue ter o demonstrativo em PDF?',
        a: 'Sim. Pela página do link, ele usa “Imprimir / salvar em PDF” e o navegador gera o arquivo em A4.',
      },
      {
        q: 'Como o cliente sabe como pagar?',
        a: 'Pelas instruções de pagamento que você cadastra nas configurações, como chave Pix ou dados bancários. Elas aparecem no demonstrativo. O pagamento é feito fora do MinhaOS App.',
      },
    ],
    guides: [
      { slug: 'demonstrativo-de-cobranca', label: 'O que é demonstrativo de cobrança' },
      { slug: 'recibo-ou-nota-fiscal', label: 'Recibo ou nota fiscal: qual usar' },
      { slug: 'recibo-de-prestacao-de-servico', label: 'Recibo de prestação de serviço' },
      { slug: 'comprovante-de-servico-executado', label: 'Comprovante de serviço executado' },
    ],
    related: ['fechamento-mensal', 'link-e-acessos', 'notas-fiscais-anexas'],
  },
  {
    slug: 'link-e-acessos',
    name: 'Link e acessos',
    title: 'Link do demonstrativo e confirmação de recebimento',
    h1: 'Link do demonstrativo: envie, acompanhe acessos e receba a confirmação',
    description:
      'Envie o demonstrativo por link, sem o cliente criar conta, e acompanhe a primeira e a última visualização registrada e a confirmação de recebimento.',
    summary: 'O cliente abre sem criar conta e confirma o recebimento. Você vê quando o link foi acessado.',
    intro: [
      'Depois de emitir o demonstrativo, você gera um link público para o cliente. Ele abre no navegador, sem login e sem instalar nada, e vê o documento completo: itens, total, vencimento, instruções de pagamento e anexos.',
      'Do seu lado, o painel mostra a primeira e a última visualização registrada, o número de sessões de acesso e se o cliente clicou em “Confirmar recebimento”. É o fim da dúvida “será que ele viu?”, com uma ressalva honesta: os registros indicam acesso ao link, não provam quem abriu nem que leu.',
    ],
    image: {
      src: compartilhamento,
      alt: 'Aba Compartilhamento de um demonstrativo: link público ativo com botões Copiar link e Compartilhar pelo WhatsApp, e o quadro Acessos ao link com primeira e última visualização registrada, três sessões de acesso e recebimento confirmado.',
      caption: 'Compartilhamento: link ativo, botões de envio e o resumo de acessos registrados.',
    },
    sections: [
      {
        h2: 'Como enviar o link',
        body: [],
        steps: [
          'No demonstrativo emitido, abra a aba <strong>Compartilhamento</strong> e gere o link. A validade sugerida vem das suas configurações (de 1 a 365 dias, ou sem expiração), e você pode ajustá-la nos planos Profissional e Negócios; no plano Grátis a validade é fixa em 30 dias.',
          'Escolha como enviar: <strong>Copiar link</strong>, <strong>Compartilhar pelo WhatsApp</strong> (abre o WhatsApp com uma mensagem pronta; quem envia é você) ou o compartilhamento nativo do celular.',
          'Se quiser conferir o que o cliente verá, use <strong>Pré-visualizar como administrador</strong>, que mostra a mesma página sem contar como acesso.',
        ],
      },
      {
        h2: 'O que o cliente pode fazer na página',
        body: [
          'O cliente vê o demonstrativo completo, pode <strong>imprimir ou salvar em PDF</strong>, <strong>baixar as notas fiscais</strong> anexadas e entrar em contato com você pelos dados que aparecem na página.',
          'Ele também pode clicar em <strong>Confirmar recebimento</strong>. Isso registra que ele recebeu o documento, com data e hora. Não significa que pagou: o pagamento é outra etapa, registrada por você.',
        ],
      },
      {
        h2: 'Acompanhamento de acessos',
        body: [
          'O quadro de acessos mostra a primeira e a última visualização registrada, a quantidade de sessões de acesso e a confirmação de recebimento. A aba <strong>Atividade</strong> lista cada evento em ordem: demonstrativo emitido, link gerado, visualizações, confirmação, recebimentos.',
          'Você recebe uma notificação e um e-mail na primeira visualização e na confirmação de recebimento. Se um link com validade estiver para expirar sem nenhuma visualização, você recebe um aviso por e-mail. Todos esses e-mails podem ser desligados nas preferências.',
        ],
      },
      {
        h2: 'O que os registros significam (e o que não significam)',
        body: [
          'Uma visualização registrada indica que alguém abriu o link. Não prova a identidade de quem abriu nem que o documento foi lido até o fim. Aplicativos de mensagem às vezes abrem o link sozinhos para gerar a pré-visualização; quando o sistema suspeita disso, o evento aparece marcado como possível pré-visualização automática. Bloqueadores e encaminhamento do link também podem afetar os registros.',
          'Para privacidade, o painel mostra apenas rótulos de sessão curtos e o tipo de navegador, sem endereço IP completo nem identificação do aparelho.',
        ],
      },
      {
        h2: 'Revogar, expirar e gerar novo link',
        body: [
          'Se o link foi enviado para a pessoa errada, <strong>revogue</strong>: ele para de funcionar na hora. <strong>Gerar novo link</strong> revoga o atual e cria outro, com outro endereço. Links expirados ou revogados mostram ao cliente uma página informando que o documento não está mais disponível por aquele endereço. Se o demonstrativo for cancelado, todos os links ativos são revogados automaticamente.',
        ],
      },
    ],
    limits: [
      'Não envia mensagens de WhatsApp automaticamente: o WhatsApp abre com o texto pronto, mas o envio é feito por você. O envio por e-mail com lembretes automáticos existe nos planos Profissional e Negócios.',
      'Os registros de acesso não provam identidade nem leitura.',
      '“Confirmar recebimento” confirma o recebimento do documento, não o pagamento.',
      'Não tem assinatura digital do cliente.',
    ],
    faq: [
      {
        q: 'O cliente precisa criar conta para ver o demonstrativo?',
        a: 'Não. Ele abre o link no navegador, no computador ou no celular, sem cadastro e sem instalar nada.',
      },
      {
        q: 'Confirmar recebimento quer dizer que o cliente pagou?',
        a: 'Não. A confirmação registra que o cliente recebeu o documento. O pagamento é registrado por você, em Recebimentos, quando o dinheiro chega.',
      },
      {
        q: 'Posso saber se o cliente abriu o link?',
        a: 'Você vê a primeira e a última visualização registrada e o número de sessões de acesso. Isso indica que o link foi aberto, mas não prova quem abriu nem se o documento foi lido.',
      },
      {
        q: 'Mandei o link para a pessoa errada. E agora?',
        a: 'Revogue o link no painel: ele deixa de funcionar imediatamente. Depois gere um novo link e envie para a pessoa certa.',
      },
      {
        q: 'O link expira?',
        a: 'Nos planos Profissional e Negócios, você decide: a validade padrão é configurável de 1 a 365 dias, ou sem expiração, e pode ser ajustada a cada link. No plano Grátis, os links valem 30 dias.',
      },
    ],
    guides: [
      { slug: 'mensagem-de-cobranca-whatsapp', label: 'Mensagem de cobrança pelo WhatsApp' },
      { slug: 'lembrete-de-pagamento', label: 'Lembrete de pagamento' },
      { slug: 'como-cobrar-cliente', label: 'Como cobrar um cliente' },
      { slug: 'comprovante-de-servico-executado', label: 'Comprovante de serviço executado' },
    ],
    related: ['demonstrativo-de-cobranca', 'notas-fiscais-anexas', 'recebimentos-e-saldos'],
  },
  {
    slug: 'notas-fiscais-anexas',
    name: 'Notas fiscais anexas',
    title: 'Anexar nota fiscal ao demonstrativo de cobrança',
    h1: 'Notas fiscais anexas: o cliente baixa a nota junto com a cobrança',
    description:
      'Anexe ao demonstrativo a nota fiscal emitida fora do sistema, em PDF, XML ou imagem, e o cliente baixa tudo pelo mesmo link, sem pedir por e-mail.',
    summary: 'Anexe o PDF ou XML da nota emitida fora do sistema. O cliente baixa pelo link da cobrança.',
    intro: [
      'O MinhaOS App não emite nota fiscal. Mas muitos clientes, principalmente empresas, só pagam com a nota em mãos. Para não ter de mandar a cobrança por um canal e a nota por outro, você pode <strong>anexar a nota fiscal</strong> (emitida no emissor oficial) ao demonstrativo.',
      'O cliente abre o link da cobrança e encontra, na mesma página, a seção “Notas fiscais e documentos”, com um botão para baixar cada arquivo.',
    ],
    image: {
      src: publico,
      alt: 'Página pública de um demonstrativo com a seção “Notas fiscais e documentos” mostrando uma NFS-e de exemplo em PDF com botão Baixar.',
      caption: 'O cliente encontra a nota fiscal anexada na própria página do demonstrativo.',
    },
    sections: [
      {
        h2: 'Como anexar uma nota fiscal',
        body: [],
        steps: [
          'Emita a nota fiscal no sistema oficial que você usa (por exemplo, o emissor nacional de NFS-e ou o da sua prefeitura) e baixe o PDF e/ou o XML.',
          'No MinhaOS App, abra o demonstrativo <strong>emitido</strong> e vá em anexos.',
          'Envie o arquivo. Escolha se é <strong>nota fiscal</strong> ou <strong>outro documento</strong> e, se quiser, dê um rótulo, como “NFS-e nº 123”.',
          'Defina se o anexo fica <strong>visível para o cliente</strong> (o padrão é visível).',
        ],
      },
      {
        h2: 'Formatos e limites',
        body: [],
        bullets: [
          'Formatos aceitos: <strong>PDF</strong>, <strong>XML</strong>, <strong>PNG</strong> e <strong>JPEG</strong>.',
          'Até <strong>10 MB</strong> por arquivo e até <strong>10 anexos</strong> por demonstrativo (por exemplo, o PDF e o XML da mesma nota).',
          'Só demonstrativos emitidos aceitam anexos. Rascunhos e cancelados, não.',
          'O conteúdo do arquivo é conferido no envio: um arquivo que não corresponde ao tipo informado é recusado.',
        ],
      },
      {
        h2: 'O que o cliente vê',
        body: [
          'Na página do link, cada anexo visível aparece com o rótulo, o nome do arquivo, o tipo e o tamanho, e um botão <strong>Baixar</strong>. No seu painel, a aba Atividade registra quando um anexo foi baixado. Assim como as visualizações, isso é um sinal de download, não prova de leitura.',
          'Se o demonstrativo for cancelado, os anexos deixam de ficar disponíveis pelo link.',
        ],
      },
      {
        h2: 'Segurança dos arquivos',
        body: [
          'Os arquivos ficam em armazenamento privado. Cada download usa um endereço temporário, gerado no momento do clique, e só para quem está logado na sua conta ou tem um link ativo do demonstrativo. Notas fiscais têm dados pessoais do cliente; por isso, revogue o link se ele for enviado por engano.',
        ],
      },
    ],
    limits: [
      'Não emite nota fiscal nem NFS-e e não transmite nada à prefeitura ou à Receita.',
      'Não valida a nota nem confere se o valor dela é igual ao do demonstrativo.',
      'Não aceita formatos fora de PDF, XML, PNG e JPEG.',
      'Não guarda a nota em nenhum cadastro fiscal: ela é um anexo do demonstrativo.',
    ],
    faq: [
      {
        q: 'O MinhaOS App emite NFS-e?',
        a: 'Não. A nota é emitida no sistema oficial (emissor nacional ou da prefeitura). O MinhaOS App apenas guarda o arquivo junto ao demonstrativo para o cliente baixar.',
      },
      {
        q: 'Posso anexar o PDF e o XML da mesma nota?',
        a: 'Sim. Cada demonstrativo aceita até 10 anexos, de até 10 MB cada, em PDF, XML, PNG ou JPEG.',
      },
      {
        q: 'Posso anexar um documento só para mim, sem o cliente ver?',
        a: 'Sim. Ao enviar ou depois, desmarque a opção de visibilidade para o cliente. O arquivo fica disponível só no seu painel.',
      },
      {
        q: 'Consigo anexar a nota antes de emitir o demonstrativo?',
        a: 'Não. Os anexos são aceitos apenas em demonstrativos emitidos, porque é o documento definitivo que o cliente recebe.',
      },
    ],
    guides: [
      { slug: 'nfs-e-padrao-nacional', label: 'NFS-e padrão nacional' },
      { slug: 'nota-fiscal-de-servico-mei', label: 'Nota fiscal de serviço para MEI' },
      { slug: 'recibo-ou-nota-fiscal', label: 'Recibo ou nota fiscal: qual usar' },
      { slug: 'mei-prestador-de-servico', label: 'MEI prestador de serviço' },
    ],
    related: ['demonstrativo-de-cobranca', 'link-e-acessos', 'recebimentos-e-saldos'],
  },
  {
    slug: 'recebimentos-e-saldos',
    name: 'Recebimentos e saldos',
    title: 'Controle de recebimentos, saldo em aberto e atrasos',
    h1: 'Recebimentos e saldos: saiba quem pagou, quanto falta e o que venceu',
    description:
      'Registre recebimentos por Pix, transferência ou dinheiro, inclusive parciais, e acompanhe o saldo em aberto e os atrasos de cada demonstrativo de cobrança.',
    summary: 'Registre pagamentos, inclusive parciais, e veja saldo em aberto, atrasos e estornos.',
    intro: [
      'Cobrar é metade do trabalho; a outra metade é saber o que já entrou. No MinhaOS App, você registra cada pagamento recebido no demonstrativo correspondente, e o sistema calcula o saldo em aberto e indica o que está em atraso.',
      'O registro é manual: o dinheiro entra pela sua conta, pelo seu Pix ou em mãos, e você informa no sistema. O MinhaOS App não movimenta dinheiro.',
    ],
    image: {
      src: atividade,
      alt: 'Aba Atividade de um demonstrativo com a linha do tempo: recebimento registrado manualmente de R$ 1.300,00, visualizações registradas, confirmação de recebimento, link gerado, demonstrativo emitido e rascunho criado.',
      caption: 'Histórico do demonstrativo, com o recebimento registrado e os demais eventos.',
    },
    sections: [
      {
        h2: 'Como registrar um recebimento',
        body: [],
        steps: [
          'Abra o demonstrativo emitido e toque em <strong>Registrar recebimento</strong>.',
          'Informe o <strong>valor</strong>, a <strong>data</strong> em que o dinheiro entrou (não pode ser futura) e a <strong>forma</strong>: Pix, transferência, dinheiro, boleto, cartão ou outro.',
          'Se quiser, acrescente uma observação (por exemplo, “primeira parcela”).',
          'Salve. O valor recebido e o saldo em aberto são atualizados no painel e na página do link.',
        ],
      },
      {
        h2: 'Pagamento parcial, saldo e atraso',
        body: [
          'Se o cliente pagou só uma parte, registre o valor recebido: o demonstrativo passa a <strong>parcialmente recebido</strong> e mostra o saldo. Quando o saldo chega a zero, ele fica <strong>recebido</strong>. Um recebimento não pode ser maior que o saldo em aberto.',
          'O demonstrativo é marcado como <strong>em atraso</strong> quando o vencimento passou e ainda há saldo. O painel lista os demonstrativos em atraso, e você pode receber, toda segunda-feira, um e-mail com o resumo dos vencidos (dá para desligar nas preferências).',
        ],
      },
      {
        h2: 'Estorno sem apagar o histórico',
        body: [
          'Registrou um valor errado ou o pagamento voltou? Use <strong>estornar</strong>, informando o motivo. O recebimento deixa de contar no saldo, mas continua no histórico, marcado como estornado. Nada é apagado, o que mantém o controle financeiro confiável.',
        ],
      },
      {
        h2: 'Onde acompanhar',
        body: [
          'No painel, o indicador “Recebido no período” soma os recebimentos pela data em que entraram, já descontados os estornos. Na lista de demonstrativos, você filtra por situação: em aberto, parcial, recebido ou em atraso. O relatório de recebimentos traz cada pagamento do período, com exportação em CSV.',
        ],
      },
    ],
    limits: [
      'Não processa pagamentos, não gera boleto nem código Pix e não é banco.',
      'Não faz conciliação automática com extrato bancário: o registro é manual.',
      'Não calcula multa nem juros por atraso.',
      'Não registra crédito a favor do cliente: o valor recebido não pode passar do saldo do demonstrativo.',
    ],
    faq: [
      {
        q: 'O MinhaOS App recebe o pagamento do cliente?',
        a: 'Não. O cliente paga diretamente a você, pelas instruções que você colocou no demonstrativo. Depois, você registra o recebimento no sistema.',
      },
      {
        q: 'Como registro um pagamento em parcelas?',
        a: 'Registre cada parcela como um recebimento, na data em que entrou. O demonstrativo mostra o total recebido e o saldo que falta.',
      },
      {
        q: 'Registrei um recebimento errado. Posso apagar?',
        a: 'Você estorna o recebimento, informando o motivo. Ele deixa de contar no saldo, mas fica no histórico como estornado.',
      },
      {
        q: 'O sistema calcula juros de atraso?',
        a: 'Não. O MinhaOS App indica que o demonstrativo está em atraso, mas não calcula multa nem juros. Se você cobra encargos, combine antes com o cliente e confira as regras aplicáveis.',
      },
    ],
    guides: [
      { slug: 'como-cobrar-cliente-que-nao-paga', label: 'Como cobrar cliente que não paga' },
      { slug: 'multa-e-juros-por-atraso', label: 'Multa e juros por atraso' },
      { slug: 'fluxo-de-caixa-para-autonomo', label: 'Fluxo de caixa para autônomo' },
      { slug: 'lembrete-de-pagamento', label: 'Lembrete de pagamento' },
    ],
    related: ['demonstrativo-de-cobranca', 'relatorios', 'link-e-acessos'],
  },
  {
    slug: 'relatorios',
    name: 'Relatórios e painel',
    title: 'Relatórios de serviços, faturamento e recebimentos',
    h1: 'Relatórios: executado, a faturar, faturado e recebido em um só lugar',
    description:
      'Veja no painel o que foi executado, a faturar, faturado e recebido no mês e gere relatórios por período e cliente com exportação em CSV e impressão A4.',
    summary: 'Painel do mês com pendências e relatórios por período e cliente, com CSV e impressão.',
    intro: [
      'O painel e os relatórios respondem às perguntas do dia a dia de quem presta serviço: quanto trabalhei neste mês, quanto ainda não cobrei, quanto cobrei e quanto já recebi. E, principalmente, o que está pendente.',
      'Cada número usa a sua própria base de data, e a tela diz qual é. Por isso os valores não devem ser somados entre si: o executado em outubro pode ser cobrado em novembro e recebido em dezembro.',
    ],
    image: {
      src: dashboard,
      alt: 'Painel Visão geral de outubro de 2026 com os indicadores Serviços executados, A faturar, Faturado no período e Recebido no período, gráfico de evolução mensal e lista de pendências com clientes com serviços a faturar.',
      caption: 'Visão geral do mês: quatro indicadores, evolução mensal e pendências.',
    },
    sections: [
      {
        h2: 'O painel do mês',
        body: ['Escolha o mês e veja quatro indicadores, cada um com a sua base:'],
        bullets: [
          '<strong>Serviços executados</strong>: linhas com data de execução no mês (serviços cancelados não entram).',
          '<strong>A faturar</strong>: linhas executadas no mês que ainda não estão em nenhum demonstrativo emitido. O que está reservado em rascunho aparece à parte.',
          '<strong>Faturado no período</strong>: demonstrativos emitidos no mês, sem os cancelados.',
          '<strong>Recebido no período</strong>: recebimentos pela data em que entraram, descontados os estornos.',
        ],
      },
      {
        h2: 'Pendências e evolução',
        body: [
          'Ao lado dos indicadores, o painel lista as pendências: <strong>clientes com serviços a faturar</strong>, <strong>demonstrativos em atraso</strong> e <strong>links ainda sem visualização</strong>. O gráfico de evolução mostra os últimos seis meses de executado, faturado e recebido, e pode ser visto como tabela.',
        ],
      },
      {
        h2: 'Relatórios por período e cliente',
        body: ['Os relatórios exigem um período (data inicial e final) e aceitam filtro por cliente:'],
        bullets: [
          '<strong>Serviços executados</strong>: uma linha por lançamento, com filtro por situação de faturamento (a faturar, reservado em rascunho, faturado).',
          '<strong>Demonstrativos emitidos</strong>: por data de emissão ou de vencimento, com filtro por situação de pagamento (em aberto, parcial, recebido, em atraso) e o saldo atual de cada um.',
          '<strong>Recebimentos</strong>: cada pagamento do período, incluindo os estornados, mostrados separadamente.',
        ],
      },
      {
        h2: 'Exportar em CSV e imprimir',
        body: [
          'Cada relatório pode ser exportado em <strong>CSV</strong> pronto para abrir no Excel em português: separador ponto e vírgula, vírgula decimal e datas no formato dd/mm/aaaa. A exportação traz sempre o conjunto completo filtrado e está disponível nos planos Profissional e Negócios. Em todos os planos é possível imprimir em A4, útil para entregar ao contador ou guardar.',
        ],
      },
    ],
    limits: [
      'Não é sistema contábil: não calcula impostos nem gera obrigações fiscais.',
      'Não registra despesas, então não substitui um fluxo de caixa completo nem um DRE.',
      'Não integra com banco ou com o sistema do seu contador; a troca de dados é pelo CSV ou, no plano Negócios, pela exportação completa e pela API com chave.',
    ],
    faq: [
      {
        q: 'Por que o executado e o faturado do mês são diferentes?',
        a: 'Porque usam datas diferentes. O executado considera a data de execução das linhas; o faturado, a data de emissão dos demonstrativos. Um serviço de setembro cobrado em outubro aparece no executado de setembro e no faturado de outubro.',
      },
      {
        q: 'Consigo mandar os relatórios para o meu contador?',
        a: 'Sim. Nos planos Profissional e Negócios, exporte em CSV, que abre no Excel com acentos e números corretos. Em qualquer plano, imprima em A4 e salve em PDF.',
      },
      {
        q: 'Os relatórios mostram as despesas do negócio?',
        a: 'Não. O MinhaOS App registra serviços, cobranças e recebimentos. Despesas precisam ser controladas em outra ferramenta.',
      },
      {
        q: 'Dá para filtrar por cliente?',
        a: 'Sim. Todos os relatórios aceitam filtro por cliente, além do período obrigatório.',
      },
    ],
    guides: [
      { slug: 'controle-de-servicos-prestados', label: 'Controle de serviços prestados' },
      { slug: 'fluxo-de-caixa-para-autonomo', label: 'Fluxo de caixa para autônomo' },
      { slug: 'separar-financas-pessoais-e-da-empresa', label: 'Separar finanças pessoais e da empresa' },
      { slug: 'rotina-administrativa-do-autonomo', label: 'Rotina administrativa do autônomo' },
    ],
    related: ['recebimentos-e-saldos', 'fechamento-mensal', 'registro-de-servicos'],
  },
  {
    slug: 'aplicativo-no-celular',
    name: 'Aplicativo no celular',
    title: 'Aplicativo de ordem de serviço para Android e iPhone',
    h1: 'MinhaOS App no celular: instale na tela inicial do Android ou iPhone',
    description:
      'Use o MinhaOS App no celular: instale na tela inicial do Android ou do iPhone direto pelo navegador e registre serviços e cobranças em tela cheia.',
    summary: 'Instale pelo navegador na tela inicial do Android ou iPhone e use em tela cheia.',
    intro: [
      'O MinhaOS App é um aplicativo web: funciona no navegador do computador e do celular, e pode ser <strong>instalado na tela inicial</strong> do Android ou do iPhone. Instalado, abre em tela cheia, com ícone próprio, como um aplicativo comum.',
      'A instalação é feita pelo próprio navegador, sem passar por loja de aplicativos, e as atualizações chegam sozinhas: quando há uma versão nova, aparece um aviso para atualizar.',
    ],
    image: {
      src: dashboardMobile,
      alt: 'Visão geral do MinhaOS App aberta no celular em tela cheia, com seletor de mês, botão Novo serviço e os indicadores Serviços executados e A faturar.',
      caption: 'O painel no celular, aberto como aplicativo instalado.',
      mobile: true,
    },
    sections: [
      {
        h2: 'Como instalar no Android',
        body: [],
        steps: [
          'Abra o MinhaOS App no Chrome e entre na sua conta.',
          'Toque em <strong>Instalar aplicativo</strong> quando o convite aparecer, ou use a opção nas Configurações do app. Também é possível pelo menu do Chrome.',
          'Confirme. O ícone aparece na tela inicial.',
        ],
      },
      {
        h2: 'Como instalar no iPhone',
        body: ['No iPhone, a instalação é pelo Safari (iOS 16.4 ou mais recente):'],
        steps: [
          'Abra o MinhaOS App no Safari.',
          'Toque em <strong>Compartilhar</strong> (o quadrado com a seta). Se não aparecer na barra, toque em ⋯ e depois em Compartilhar.',
          'Escolha <strong>Adicionar à Tela de Início</strong>.',
          'Se aparecer a opção <strong>Abrir como App Web</strong>, mantenha ativada e toque em <strong>Adicionar</strong>.',
        ],
        image: {
          src: instalarIos,
          alt: 'Instruções “Instalar no celular” no iPhone: tocar em Compartilhar, depois em Adicionar à Tela de Início e manter ativada a opção Abrir como App Web.',
          caption: 'O próprio app mostra o passo a passo de instalação no iPhone.',
          mobile: true,
        },
      },
      {
        h2: 'Login e sessão no app instalado',
        body: [
          'Instalar não guarda sua senha nem mantém você conectado para sempre: o login continua necessário. No iPhone, o app instalado tem armazenamento separado do Safari, então quem já estava logado no navegador precisa entrar de novo no app. No Android, normalmente a sessão é compartilhada com o Chrome.',
        ],
      },
      {
        h2: 'Precisa de internet?',
        body: [
          'Sim, para salvar e consultar dados. Sem conexão, o app avisa (“Sem conexão. Conecte-se para salvar e atualizar os dados.”) e desativa as ações que dependem do servidor. Nada é guardado para envio posterior. Um formulário em preenchimento fica na tela enquanto ela estiver aberta, mas se perde se você fechar o app antes de salvar.',
          'Essa escolha evita dados duplicados ou desencontrados entre aparelhos: o que você vê é sempre o que está registrado.',
        ],
      },
    ],
    limits: [
      'Não funciona offline para registrar serviços: é preciso conexão para salvar.',
      'Não é distribuído pela Play Store nem pela App Store; a instalação é pelo navegador.',
      'O link enviado ao cliente não exige nem oferece instalação: ele abre direto no navegador.',
    ],
    faq: [
      {
        q: 'Preciso baixar o MinhaOS App na loja de aplicativos?',
        a: 'Não. Você instala pelo navegador: no Android, pelo Chrome; no iPhone, pelo Safari, com “Adicionar à Tela de Início”.',
      },
      {
        q: 'Funciona sem internet?',
        a: 'O app abre, mas para salvar ou consultar dados é preciso conexão. Sem internet, ele avisa e desativa as ações que dependem do servidor.',
      },
      {
        q: 'Por que tive de fazer login de novo depois de instalar no iPhone?',
        a: 'No iPhone, o app da Tela de Início tem cookies e armazenamento separados do Safari. Por isso é preciso entrar uma vez no app instalado.',
      },
      {
        q: 'Posso usar no computador e no celular ao mesmo tempo?',
        a: 'Sim. Os dados ficam no servidor da sua conta, então você pode registrar no celular e fazer o fechamento no computador.',
      },
    ],
    guides: [
      { slug: 'ordem-de-servico-digital', label: 'Ordem de serviço digital' },
      { slug: 'rotina-administrativa-do-autonomo', label: 'Rotina administrativa do autônomo' },
      { slug: 'como-organizar-clientes', label: 'Como organizar clientes' },
    ],
    related: ['registro-de-servicos', 'link-e-acessos', 'fechamento-mensal'],
  },
]

export const featureBySlug = (slug: string) => features.find((f) => f.slug === slug)

/** Resumo honesto do que o produto não faz (página-índice). */
export const naoFaz = [
  'Não emite nota fiscal nem NFS-e. Você emite no sistema oficial e anexa o arquivo ao demonstrativo.',
  'Não processa pagamentos, não gera boleto nem código Pix e não é banco. Os recebimentos são registrados por você.',
  'Não envia WhatsApp automaticamente: abre a conversa com a mensagem pronta, e o envio é seu.',
  'Não tem controle de estoque. Material e peças entram como linhas do serviço.',
  'Não tem agenda de visitas, assinatura digital nem certificado digital.',
  'Não calcula impostos, multa ou juros e não registra despesas.',
]
