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
  /** Tabela simples (cabeçalho + linhas), em texto. A primeira coluna de cada linha é o rótulo. */
  table?: { caption: string; head: string[]; rows: string[][] }
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
  /** Captura principal (opcional: páginas sem captura usam só texto). */
  image?: FeatureImage
  /** Agrupamento no índice: serviços e cobrança (padrão), financeiro, estoque e patrimônio ou equipe. */
  group?: 'cobranca' | 'financeiro' | 'estoque' | 'equipe'
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
          'Para material e peças, a linha pode usar também as unidades de material: <strong>metro</strong>, <strong>metro quadrado</strong>, <strong>metro cúbico</strong>, <strong>quilo</strong>, <strong>litro</strong>, <strong>caixa</strong>, <strong>pacote</strong>, <strong>rolo</strong> e <strong>saco</strong>. Assim o cliente lê “15 metros de cabo”, e não “15 unidades”.',
        ],
      },
      {
        h2: 'Material do estoque na linha do serviço',
        body: [
          'Se você usa o <a href="/funcionalidades/controle-de-estoque/">controle de estoque</a>, escolha o material na própria linha. A unidade vem do cadastro do item, a descrição é preenchida se estiver vazia e o preço vem do valor de venda cadastrado; o administrador pode ajustar o preço, e o operador usa o do cadastro. Ao salvar o serviço, a saída do material é registrada sozinha no estoque, pelo custo médio do item.',
          'Mudou a quantidade, trocou o material ou cancelou o serviço? O estoque é acertado pela diferença: só o que mudou sai ou volta. Material que você não controla em estoque continua podendo entrar como uma linha comum, com descrição e valor.',
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
      'Os lançamentos gerados por contratos recorrentes não baixam material do estoque: o material usado nesses serviços é lançado à parte.',
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
        q: 'Como registro o material que usei no serviço?',
        a: 'Se o material está no estoque, escolha o item na linha do serviço: o preço vem do valor de venda cadastrado e a saída do estoque é registrada sozinha ao salvar. Se não está, lance uma linha comum com descrição, unidade e valor.',
      },
    ],
    guides: [
      { slug: 'como-fazer-ordem-de-servico', label: 'Como fazer uma ordem de serviço' },
      { slug: 'controle-de-servicos-prestados', label: 'Controle de serviços prestados' },
      { slug: 'planilha-de-controle-de-servicos', label: 'Planilha de controle de serviços' },
      { slug: 'ordem-de-servico-digital', label: 'Ordem de serviço digital' },
    ],
    related: ['fechamento-mensal', 'controle-de-estoque', 'demonstrativo-de-cobranca', 'aplicativo-no-celular'],
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
      'O fechamento não é automático: você escolhe o que entra e emite. Nos planos pagos, um contrato recorrente gera os lançamentos de serviço sozinho, mas a emissão do demonstrativo continua sendo sua.',
      'Cada demonstrativo é de um único cliente.',
      'No plano Grátis, o sistema não envia a cobrança sozinho: você compartilha o link por WhatsApp, e-mail ou outro meio. O envio por e-mail direto da plataforma, com lembretes automáticos de vencimento e atraso, está chegando aos planos pagos (em breve).',
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
          'No demonstrativo emitido, abra a aba <strong>Compartilhamento</strong> e gere o link. A validade sugerida vem das suas configurações (de 1 a 365 dias, ou sem expiração), e você pode ajustá-la nos planos pagos; no plano Grátis a validade é fixa em 30 dias.',
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
      'Não envia mensagens de WhatsApp automaticamente: o WhatsApp abre com o texto pronto, mas o envio é feito por você. O envio por e-mail com lembretes automáticos está chegando aos planos pagos (em breve).',
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
        a: 'Nos planos pagos, você decide: a validade padrão é configurável de 1 a 365 dias, ou sem expiração, e pode ser ajustada a cada link. No plano Grátis, os links valem 30 dias.',
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
      'O registro é manual: o dinheiro entra pela sua conta, pelo seu Pix ou em mãos, e você informa no sistema. O MinhaOS App não movimenta dinheiro. Para o dinheiro que entra fora de um demonstrativo, como um sinal ou uma venda de material, use os <a href="/funcionalidades/recebimentos/">recebimentos avulsos</a>.',
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
          'No painel, o indicador “Recebido no período” soma os recebimentos pela data em que entraram, já descontados os estornos. Na lista de demonstrativos, você filtra por situação: em aberto, parcial, recebido ou em atraso. O relatório de recebimentos traz cada pagamento do período, com exportação em CSV nos planos pagos.',
          'No grupo Financeiro, a tela de <a href="/funcionalidades/recebimentos/">Recebimentos</a> junta numa lista só os demonstrativos com saldo em aberto e os recebimentos avulsos. O pagamento de um demonstrativo continua sendo registrado nele. Nos planos pagos, tudo isso entra no <a href="/funcionalidades/fluxo-de-caixa/">fluxo de caixa</a>.',
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
      { slug: 'controle-de-contas-a-receber', label: 'Controle de contas a receber' },
    ],
    related: ['recebimentos', 'demonstrativo-de-cobranca', 'fluxo-de-caixa'],
  },
  {
    slug: 'contas-a-pagar',
    group: 'financeiro',
    name: 'Contas a pagar',
    title: 'Contas a pagar para autônomo: vencimento e categoria',
    h1: 'Contas a pagar: cada despesa com vencimento, categoria e quitação',
    description:
      'Registre contas a pagar com fornecedor, categoria e vencimento, marque a quitação com data e forma de pagamento e receba um resumo diário do que vai vencer.',
    summary: 'Despesas com fornecedor, categoria e vencimento, quitação registrada e aviso do que vence em até 3 dias.',
    intro: [
      'Aluguel, combustível, peças, o software que você assina, o DAS: as contas do negócio têm data para vencer, e esquecer uma delas custa multa e dor de cabeça. Em <strong>Contas a pagar</strong>, no grupo Financeiro do MinhaOS App, cada despesa fica registrada com fornecedor, categoria, valor e vencimento.',
      'O app mostra o que está em aberto, o que atrasou e o que já foi pago, avisa das contas que vencem nos próximos dias e, se você ligar um custo a um cliente ou serviço, mostra a margem daquele trabalho. O pagamento em si continua sendo feito por você, no seu banco.',
    ],
    sections: [
      {
        h2: 'Como registrar uma conta a pagar',
        body: [],
        steps: [
          'No grupo <strong>Financeiro</strong>, abra <strong>Contas a pagar</strong> e crie uma nova conta.',
          'Preencha a <strong>descrição</strong> (por exemplo, “Aluguel da sala”), o <strong>fornecedor</strong>, a <strong>categoria</strong>, o <strong>valor</strong> e o <strong>vencimento</strong>.',
          'Se o gasto foi para um trabalho específico, ligue a conta a um <strong>cliente</strong> ou a um <strong>serviço</strong>. Use a <strong>observação</strong> para o que precisar lembrar.',
          'Nos planos pagos, anexe o <strong>boleto</strong>, o <strong>comprovante</strong> ou a <strong>nota</strong> da compra, para ter tudo junto na hora de pagar ou de entregar ao contador.',
          'Salve. A conta fica <strong>em aberto</strong> e passa a <strong>em atraso</strong> se o vencimento chegar sem quitação.',
        ],
      },
      {
        h2: 'Categorias que você ajusta',
        body: [
          'A conta já vem com categorias pensadas para quem presta serviço. Você pode criar novas, renomear as existentes e arquivar as que não usa.',
        ],
        bullets: [
          'Aluguel; contas de consumo; combustível e transporte.',
          'Material e peças; ferramentas e equipamentos; software e assinaturas.',
          'Impostos e taxas; pró-labore e retiradas; marketing; outros.',
        ],
      },
      {
        h2: 'Quitação, atraso e lembretes',
        body: [
          'Ao pagar, registre a <strong>quitação</strong> com a data, o valor pago e a forma: Pix, transferência, dinheiro, boleto, cartão ou outro. Marcou por engano? Desfaça a quitação e a conta volta a ficar em aberto. Uma conta que não vai mais ser paga pode ser <strong>cancelada</strong>. A lista separa as situações: em aberto, em atraso, paga e cancelada.',
          'Quando há contas que vencem em até 3 dias ou que já estão em atraso, você recebe <strong>um e-mail por dia</strong> com o resumo e um aviso dentro do app. O lembrete vale para todos os planos e pode ser desligado nas preferências.',
        ],
      },
      {
        h2: 'Contas recorrentes e parceladas',
        body: [
          'Nos planos pagos, uma conta pode se <strong>repetir</strong> (semanal, quinzenal, mensal, trimestral ou anual) com término nunca, até uma data ou depois de um número de vezes. Também dá para <strong>parcelar</strong>: você informa o valor total e o número de parcelas, e as parcelas somam exatamente o total, sem centavo sobrando ou faltando. As próximas ocorrências são geradas com até 60 dias de antecedência.',
          'Ao editar uma ocorrência, você escolhe se a mudança vale <strong>só para esta</strong>, <strong>para esta e as próximas</strong> ou <strong>para todas</strong>. Ocorrências já quitadas nunca mudam, então o histórico do que você pagou fica preservado.',
        ],
      },
      {
        h2: 'Custo do serviço e margem',
        body: [
          'Quando você liga uma conta a um serviço, ela passa a ser <strong>custo daquele serviço</strong>: o material comprado para a obra, o combustível da viagem até o cliente. O relatório de <strong>margem por serviço e por cliente</strong> mostra a receita (por execução ou por faturamento) menos os custos ligados, e o painel traz o bloco “Financeiro do mês”.',
          'O material que sai do <a href="/funcionalidades/controle-de-estoque/">estoque</a> pelo serviço também entra como custo, pelo custo médio do item. Por isso, a conta a pagar lançada a partir de uma <strong>entrada de estoque</strong> fica fora da margem (continua em contas a pagar e no fluxo de caixa): o custo aparece quando o material é usado, e não duas vezes.',
          'Os relatórios de contas a pagar e de margem podem ser vistos na tela; a exportação em CSV está nos planos pagos. Para conferir a conta na mão, use a <a href="/ferramentas/calculadora-de-margem/">calculadora de margem</a>.',
        ],
      },
    ],
    limits: [
      'Não paga a conta, não lê nem gera boleto e não é banco: a quitação é registrada por você.',
      'Não faz conciliação automática com o extrato bancário.',
      'Não calcula impostos: a categoria “impostos e taxas” serve para organizar o que você paga.',
      'No plano Grátis, são até 20 lançamentos por mês (contas a pagar e recebimentos avulsos somados), sem recorrência, sem parcelamento e sem anexos nas contas.',
      'Uma conta a pagar lançada aqui não dá entrada no estoque. Para o material entrar no saldo, registre a entrada no estoque e marque “lançar conta a pagar” ali: a conta é criada junto, ligada à entrada.',
    ],
    faq: [
      {
        q: 'O MinhaOS App paga minhas contas?',
        a: 'Não. Ele organiza as contas e avisa do vencimento, mas o pagamento é feito por você, no banco ou no aplicativo que você já usa. Depois, você registra a quitação com data, valor e forma.',
      },
      {
        q: 'Dá para cadastrar uma conta que se repete todo mês?',
        a: 'Sim, nos planos pagos, a partir do Essencial. A conta pode ser semanal, quinzenal, mensal, trimestral ou anual, sem término, até uma data ou por um número de vezes. No plano Grátis, cada conta é lançada individualmente.',
      },
      {
        q: 'Como funciona o lembrete de vencimento?',
        a: 'Quando há contas que vencem em até 3 dias ou que estão em atraso, você recebe um único e-mail por dia com o resumo e um aviso no app. Vale para todos os planos e pode ser desligado nas preferências de e-mail.',
      },
      {
        q: 'Consigo saber quanto gastei com um cliente?',
        a: 'Sim. Ligue a conta ao cliente ou ao serviço. O relatório de margem mostra, por serviço e por cliente, a receita menos os custos ligados.',
      },
      {
        q: 'Se eu voltar para o plano Grátis, perco minhas contas recorrentes?',
        a: 'Não. Nada é apagado: as recorrências ficam pausadas e as contas já lançadas continuam na lista.',
      },
    ],
    guides: [
      { slug: 'como-controlar-contas-a-pagar', label: 'Como controlar contas a pagar' },
      { slug: 'despesas-recorrentes', label: 'Despesas recorrentes' },
      { slug: 'categorias-de-despesas-mei', label: 'Categorias de despesas para MEI e autônomo' },
      { slug: 'despesas-fixas-e-variaveis', label: 'Despesas fixas e variáveis' },
      { slug: 'margem-de-lucro-de-servico', label: 'Margem de lucro de serviço' },
    ],
    related: ['fluxo-de-caixa', 'controle-de-estoque', 'recebimentos', 'relatorios'],
  },
  {
    slug: 'recebimentos',
    group: 'financeiro',
    name: 'Recebimentos',
    title: 'Recebimentos avulsos e contas a receber em uma lista',
    h1: 'Recebimentos: o que falta receber e o dinheiro que entra fora da cobrança',
    description:
      'Veja numa lista só os demonstrativos com saldo em aberto e os recebimentos avulsos, como sinal ou venda de material, com vencimento, cliente e quitação.',
    summary: 'Demonstrativos com saldo e recebimentos avulsos, como sinal ou venda de material, em uma lista só.',
    intro: [
      'Nem todo dinheiro que você recebe passa por um demonstrativo de cobrança. Um sinal antes de começar a obra, a venda de um material que sobrou, uma mensalidade combinada e cobrada fora do app: tudo isso também entra no caixa e precisa ser acompanhado.',
      'A tela de <strong>Recebimentos</strong>, no grupo Financeiro do MinhaOS App, junta as duas coisas em uma lista única: os demonstrativos emitidos que ainda têm saldo em aberto e os <strong>recebimentos avulsos</strong> que você lança à parte. Assim você vê, num lugar só, tudo o que falta entrar.',
    ],
    sections: [
      {
        h2: 'Duas origens na mesma lista',
        body: [],
        bullets: [
          '<strong>Demonstrativos com saldo em aberto.</strong> Aparecem automaticamente depois de emitidos. O pagamento continua sendo registrado no próprio demonstrativo, como explicado em <a href="/funcionalidades/recebimentos-e-saldos/">recebimentos e saldos</a>, com pagamento parcial, saldo e estorno.',
          '<strong>Recebimentos avulsos.</strong> Valores que não fazem parte de nenhum demonstrativo, como sinal, venda de material ou mensalidade cobrada fora do app. Você lança, acompanha o vencimento e marca quando o dinheiro entra.',
        ],
      },
      {
        h2: 'Como lançar um recebimento avulso',
        body: [],
        steps: [
          'No grupo <strong>Financeiro</strong>, abra <strong>Recebimentos</strong> e crie um novo recebimento avulso.',
          'Informe a <strong>descrição</strong> (por exemplo, “Sinal da reforma do banheiro”), a <strong>categoria</strong>, o <strong>valor</strong> e o <strong>vencimento</strong>, isto é, a data em que você espera receber.',
          'Se quiser, escolha o <strong>cliente</strong>. O vínculo é opcional: uma venda para alguém que não está no seu cadastro também pode ser lançada.',
          'Quando o dinheiro entrar, registre a <strong>quitação</strong> com a data, o valor e a forma: Pix, transferência, dinheiro, boleto, cartão ou outro. Se marcou por engano, dá para desfazer a quitação.',
        ],
      },
      {
        h2: 'Quando usar avulso e quando usar o demonstrativo',
        body: [
          'Se o valor é de um serviço que você vai cobrar ou já cobrou por demonstrativo, registre o pagamento <strong>no demonstrativo</strong>. É ele que baixa o saldo, mostra ao cliente o que falta e marca o atraso. Lançar o mesmo dinheiro também como avulso faria a entrada contar duas vezes.',
          'Use o recebimento avulso para o que não tem demonstrativo. Se a mensalidade de um cliente deve virar serviço e entrar no fechamento do mês, o caminho é o <a href="/funcionalidades/contratos-recorrentes/">contrato recorrente</a>, não o avulso.',
        ],
      },
      {
        h2: 'Recebimentos que se repetem ou vêm em parcelas',
        body: [
          'Nos planos pagos, um recebimento avulso pode ser <strong>recorrente</strong> (semanal, quinzenal, mensal, trimestral ou anual, sem término, até uma data ou por um número de vezes) ou <strong>parcelado</strong>: você informa o valor total e o número de parcelas, e as parcelas somam exatamente o total. As ocorrências futuras são geradas com até 60 dias de antecedência.',
          'O painel mostra o bloco “Financeiro do mês”, e a visão geral do Financeiro lista o que está em atraso e o que vence nos próximos 30 dias. Nos planos pagos, esses valores também entram no <a href="/funcionalidades/fluxo-de-caixa/">fluxo de caixa</a>.',
        ],
      },
    ],
    limits: [
      'Não recebe o dinheiro, não gera boleto nem código Pix e não é banco: a quitação é registrada por você.',
      'Não faz conciliação automática com o extrato bancário.',
      'Recebimento avulso não gera demonstrativo nem link para o cliente.',
      'No plano Grátis, são até 20 lançamentos por mês, somando contas a pagar e recebimentos avulsos, sem recorrência nem parcelamento.',
    ],
    faq: [
      {
        q: 'Qual a diferença entre recebimento avulso e recebimento de demonstrativo?',
        a: 'O recebimento de demonstrativo baixa o saldo de uma cobrança emitida e é registrado no próprio demonstrativo. O avulso é para dinheiro que não passa por demonstrativo, como um sinal ou a venda de um material. Os dois aparecem na mesma lista de Recebimentos.',
      },
      {
        q: 'Preciso vincular o recebimento avulso a um cliente?',
        a: 'Não. O cliente é opcional. Você pode lançar, por exemplo, a venda de uma sobra de material para alguém que não está no seu cadastro.',
      },
      {
        q: 'Posso lançar uma mensalidade que o cliente paga todo mês?',
        a: 'Pode, como recebimento avulso recorrente, nos planos pagos. Se você quer que a mensalidade vire um serviço e entre no demonstrativo do mês, use um contrato recorrente.',
      },
      {
        q: 'O recebimento avulso conta no limite do plano Grátis?',
        a: 'Sim. No Grátis, contas a pagar e recebimentos avulsos somam até 20 lançamentos por mês. Os demonstrativos e os pagamentos registrados neles seguem as regras do demonstrativo.',
      },
    ],
    guides: [
      { slug: 'controle-de-contas-a-receber', label: 'Controle de contas a receber' },
      { slug: 'contas-a-pagar-e-receber', label: 'Contas a pagar e receber' },
      { slug: 'planilha-de-contas-a-pagar-e-receber', label: 'Planilha de contas a pagar e receber' },
      { slug: 'fluxo-de-caixa-para-autonomo', label: 'Fluxo de caixa para autônomo' },
    ],
    related: ['recebimentos-e-saldos', 'contas-a-pagar', 'fluxo-de-caixa'],
  },
  {
    slug: 'contratos-recorrentes',
    group: 'financeiro',
    name: 'Contratos recorrentes',
    title: 'Contrato recorrente: mensalidade de cliente automática',
    h1: 'Contratos recorrentes: a mensalidade do cliente lançada sozinha, em cada data',
    description:
      'Cadastre a mensalidade ou o contrato fixo de um cliente e deixe o MinhaOS App gerar o lançamento de serviço em cada data, pronto para o fechamento do mês.',
    summary: 'A mensalidade do cliente vira lançamento de serviço sozinha, em cada data, e entra no fechamento.',
    intro: [
      'Manutenção mensal de um condomínio, suporte de informática com valor fixo, aulas com mensalidade, jardim cuidado toda semana: quando o valor e a frequência são combinados, registrar o mesmo serviço todo mês é trabalho repetido e fácil de esquecer.',
      'O <strong>contrato recorrente</strong>, disponível nos planos pagos (a partir do Essencial), faz esse registro por você. Ele gera automaticamente, em cada data, o <strong>lançamento de serviço</strong> do cliente, que entra no fechamento mensal e no demonstrativo como qualquer outro serviço.',
    ],
    sections: [
      {
        h2: 'Como criar um contrato recorrente',
        body: [],
        steps: [
          'No grupo <strong>Financeiro</strong>, abra <strong>Contratos recorrentes</strong> e crie um novo contrato.',
          'Escolha o <strong>cliente</strong> e descreva o contrato.',
          'Preencha a <strong>linha modelo</strong>: descrição, unidade, quantidade e valor, do mesmo jeito que você lança um serviço. Por exemplo, “Manutenção preventiva mensal”, 1 serviço × R$ 450,00.',
          'Defina a <strong>recorrência</strong>: a frequência, a data de início e o término (nunca, até uma data ou depois de um número de vezes).',
          'Confira a <strong>prévia das próximas datas</strong> e salve.',
        ],
      },
      {
        h2: 'O que acontece em cada data',
        body: [
          'Na data prevista, o contrato gera o lançamento de serviço com a linha modelo. A partir daí ele é um serviço comum: aparece na lista de serviços, conta no executado do painel e fica disponível no <a href="/funcionalidades/fechamento-mensal/">fechamento mensal</a>. Se no mesmo mês houve hora extra ou material, você registra à parte e cobra tudo no mesmo demonstrativo.',
          'A emissão do demonstrativo continua sendo sua: o contrato cria o lançamento, mas não emite nem envia a cobrança sozinho. No detalhe do contrato, você vê os lançamentos já gerados e as próximas datas.',
        ],
      },
      {
        h2: 'Pausar, retomar e encerrar',
        body: [
          'Cliente viajou ou o serviço foi suspenso por um tempo? <strong>Pause</strong> o contrato: enquanto estiver pausado, as datas não geram lançamentos. Quando voltar, <strong>retome</strong>. Se o contrato acabou, <strong>encerre</strong>. Os lançamentos já gerados continuam no histórico do cliente.',
        ],
      },
      {
        h2: 'Contrato recorrente ou recebimento avulso?',
        body: [
          'Use o contrato quando a mensalidade é cobrança de serviço e deve aparecer no demonstrativo do cliente. Use um <a href="/funcionalidades/recebimentos/">recebimento avulso</a> recorrente quando o dinheiro entra fora do demonstrativo e você só quer acompanhar o que falta receber.',
        ],
      },
    ],
    limits: [
      'Está disponível só nos planos pagos, a partir do Essencial. Ao voltar para o Grátis, nada é apagado: os contratos ficam pausados.',
      'Não emite nem envia o demonstrativo automaticamente: o fechamento e a emissão continuam sendo seus.',
      'Não cobra o cliente, não gera boleto nem Pix e não debita cartão.',
      'Não reajusta o valor sozinho: o reajuste é decisão sua, combinada com o cliente.',
    ],
    faq: [
      {
        q: 'O contrato recorrente envia a cobrança para o cliente?',
        a: 'Não. Ele gera o lançamento de serviço em cada data. A cobrança sai no fechamento do mês, quando você emite o demonstrativo e envia o link.',
      },
      {
        q: 'Posso cobrar a mensalidade e as horas extras no mesmo demonstrativo?',
        a: 'Sim. O lançamento gerado pelo contrato é um serviço comum. As horas extras você registra normalmente, e no fechamento escolhe tudo o que entra no demonstrativo do cliente.',
      },
      {
        q: 'O cliente vai ficar um mês sem o serviço. O que faço?',
        a: 'Pause o contrato. Enquanto estiver pausado, as datas não geram lançamentos. Quando o serviço voltar, retome.',
      },
      {
        q: 'O contrato recorrente existe no plano Grátis?',
        a: 'Não. Ele faz parte dos planos pagos, a partir do Essencial. Se você voltar para o Grátis, os contratos ficam pausados, sem perder nada.',
      },
    ],
    guides: [
      { slug: 'como-cobrar-mensalidade-de-clientes', label: 'Como cobrar mensalidade de clientes' },
      { slug: 'contrato-de-prestacao-de-servico', label: 'Contrato de prestação de serviço' },
      { slug: 'fechamento-mensal-de-servicos', label: 'Fechamento mensal de serviços' },
      { slug: 'como-reajustar-o-preco-dos-servicos', label: 'Como reajustar o preço dos serviços' },
    ],
    related: ['fechamento-mensal', 'registro-de-servicos', 'recebimentos'],
  },
  {
    slug: 'fluxo-de-caixa',
    group: 'financeiro',
    name: 'Fluxo de caixa',
    title: 'Fluxo de caixa previsto e realizado para autônomo',
    h1: 'Fluxo de caixa: o que entrou, o que saiu e o que está previsto, mês a mês',
    description:
      'Compare realizado e previsto mês a mês, com entradas, saídas, saldo e acumulado, veja o que está em atraso e os próximos 30 dias e exporte em CSV.',
    summary: 'Realizado e previsto mês a mês, atrasos à parte, próximos 30 dias, gráfico, tabela e CSV.',
    intro: [
      'Saber quanto você faturou não responde à pergunta que mais importa no fim do mês: vai sobrar dinheiro? O <strong>fluxo de caixa</strong> do MinhaOS App junta o que você recebe e o que você paga e mostra, mês a mês, o <strong>realizado</strong> (o que de fato entrou e saiu) ao lado do <strong>previsto</strong> (o que ainda vai vencer).',
      'Ele está nos planos pagos, a partir do Essencial, e usa os dados que você já registra: recebimentos de demonstrativos, recebimentos avulsos e contas a pagar.',
    ],
    sections: [
      {
        h2: 'O que o fluxo de caixa mostra',
        body: [],
        bullets: [
          '<strong>Realizado × previsto</strong>, mês a mês, com <strong>entradas</strong>, <strong>saídas</strong>, <strong>saldo</strong> do mês e <strong>acumulado</strong>.',
          '<strong>Em atraso</strong>, separado: o que já venceu e não foi recebido ou pago não se mistura com o que está para vencer.',
          '<strong>Próximos 30 dias</strong>: o que entra e o que sai no curto prazo, para decidir antes de apertar.',
          '<strong>Gráfico e tabela</strong> com os mesmos números, e <strong>exportação em CSV</strong> para abrir no Excel ou levar ao contador.',
        ],
      },
      {
        h2: 'De onde vêm os números',
        body: [
          'As entradas vêm dos <a href="/funcionalidades/recebimentos-e-saldos/">recebimentos registrados nos demonstrativos</a> e dos <a href="/funcionalidades/recebimentos/">recebimentos avulsos</a>. As saídas vêm das <a href="/funcionalidades/contas-a-pagar/">contas a pagar</a>. O previsto usa os vencimentos em aberto; o realizado, as quitações e os recebimentos que você registrou.',
          'Por isso, o fluxo de caixa é tão bom quanto o registro. Ele não lê o extrato do banco: se uma conta foi paga e não foi marcada como paga, ela continua aparecendo como prevista ou em atraso.',
        ],
      },
      {
        h2: 'Como usar no dia a dia',
        body: [],
        steps: [
          'Uma vez por semana, registre as quitações e os recebimentos da semana.',
          'Abra o fluxo de caixa e olhe primeiro o que está <strong>em atraso</strong>: é cobrança a fazer ou conta a resolver.',
          'Confira os <strong>próximos 30 dias</strong>. Se as saídas passam das entradas, decida agora: cobrar um cliente, negociar um vencimento ou adiar uma compra.',
          'No fim do mês, compare o realizado com o previsto e ajuste a sua expectativa para os próximos meses.',
        ],
      },
    ],
    limits: [
      'Está disponível só nos planos pagos, a partir do Essencial. No Grátis, o painel continua mostrando o bloco “Financeiro do mês”.',
      'Não se conecta ao banco nem faz conciliação automática: os números vêm do que você registra.',
      'Não é DRE nem sistema contábil e não calcula impostos.',
    ],
    faq: [
      {
        q: 'Qual a diferença entre previsto e realizado?',
        a: 'O realizado é o que de fato entrou e saiu, pelas quitações e recebimentos registrados. O previsto é o que ainda vai vencer, pelas contas e recebimentos em aberto.',
      },
      {
        q: 'O fluxo de caixa puxa os dados do meu banco?',
        a: 'Não. O MinhaOS App não se conecta ao banco. Os números vêm dos recebimentos e das contas que você registra.',
      },
      {
        q: 'Posso exportar o fluxo de caixa?',
        a: 'Sim. A tabela pode ser exportada em CSV, que abre no Excel em português.',
      },
      {
        q: 'O fluxo de caixa existe no plano Grátis?',
        a: 'Não. Ele faz parte dos planos pagos, a partir do Essencial. No Grátis, você registra contas a pagar e recebimentos avulsos (até 20 lançamentos por mês) e vê o resumo “Financeiro do mês” no painel.',
      },
    ],
    guides: [
      { slug: 'fluxo-de-caixa-previsto-e-realizado', label: 'Fluxo de caixa previsto e realizado' },
      { slug: 'fluxo-de-caixa-para-autonomo', label: 'Fluxo de caixa para autônomo' },
      { slug: 'contas-a-pagar-e-receber', label: 'Contas a pagar e receber' },
      { slug: 'separar-financas-pessoais-e-da-empresa', label: 'Separar finanças pessoais e da empresa' },
    ],
    related: ['contas-a-pagar', 'recebimentos', 'relatorios'],
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
        h2: 'Financeiro do mês',
        body: [
          'Abaixo dos indicadores de serviço, o bloco <strong>Financeiro do mês</strong> resume as <a href="/funcionalidades/contas-a-pagar/">contas a pagar</a> e os <a href="/funcionalidades/recebimentos/">recebimentos avulsos</a>, em todos os planos. Nos planos pagos, o <a href="/funcionalidades/fluxo-de-caixa/">fluxo de caixa</a> mostra o realizado e o previsto mês a mês.',
        ],
      },
      {
        h2: 'Pendências e evolução',
        body: [
          'Ao lado dos indicadores, o painel lista as pendências: <strong>clientes com serviços a faturar</strong>, <strong>demonstrativos em atraso</strong>, <strong>links ainda sem visualização</strong> e o <strong>material que precisa de reposição</strong>. O gráfico de evolução mostra os últimos seis meses de executado, faturado e recebido, e pode ser visto como tabela.',
        ],
      },
      {
        h2: 'Relatórios por período e cliente',
        body: ['Os relatórios exigem um período (data inicial e final) e aceitam filtro por cliente:'],
        bullets: [
          '<strong>Serviços executados</strong>: uma linha por lançamento, com filtro por situação de faturamento (a faturar, reservado em rascunho, faturado).',
          '<strong>Demonstrativos emitidos</strong>: por data de emissão ou de vencimento, com filtro por situação de pagamento (em aberto, parcial, recebido, em atraso) e o saldo atual de cada um.',
          '<strong>Recebimentos</strong>: cada pagamento do período, incluindo os estornados, mostrados separadamente.',
          '<strong>Contas a pagar</strong> e <strong>recebimentos avulsos</strong> do período.',
          '<strong>Margem por serviço e por cliente</strong>: a receita (por execução ou por faturamento) menos os custos das contas a pagar ligadas a cada serviço ou cliente e o custo do material do estoque usado no serviço.',
          '<strong>Posição de estoque</strong>, <strong>movimentações de estoque</strong> do período e <strong>inventário de patrimônio</strong>, com a situação de cada bem.',
          '<strong>Fluxo de caixa</strong>, nos planos pagos.',
        ],
      },
      {
        h2: 'Exportar em CSV e imprimir',
        body: [
          'Cada relatório pode ser exportado em <strong>CSV</strong> pronto para abrir no Excel em português: separador ponto e vírgula, vírgula decimal e datas no formato dd/mm/aaaa. A exportação traz sempre o conjunto completo filtrado e está disponível nos planos pagos. Em todos os planos é possível imprimir em A4, útil para entregar ao contador ou guardar.',
        ],
      },
    ],
    limits: [
      'Não é sistema contábil: não calcula impostos, não gera obrigações fiscais e não substitui um DRE.',
      'Não faz conciliação bancária automática: os números vêm do que você registra.',
      'Não integra com banco ou com o sistema do seu contador; a troca de dados é pelo CSV.',
    ],
    faq: [
      {
        q: 'Por que o executado e o faturado do mês são diferentes?',
        a: 'Porque usam datas diferentes. O executado considera a data de execução das linhas; o faturado, a data de emissão dos demonstrativos. Um serviço de setembro cobrado em outubro aparece no executado de setembro e no faturado de outubro.',
      },
      {
        q: 'Consigo mandar os relatórios para o meu contador?',
        a: 'Sim. Nos planos pagos, exporte em CSV, que abre no Excel com acentos e números corretos. Em qualquer plano, imprima em A4 e salve em PDF.',
      },
      {
        q: 'Os relatórios mostram as despesas do negócio?',
        a: 'Sim. As despesas registradas em contas a pagar aparecem no relatório de contas a pagar, no painel (Financeiro do mês) e, nos planos pagos, no fluxo de caixa. As ligadas a um serviço ou cliente entram no relatório de margem.',
      },
      {
        q: 'Dá para filtrar por cliente?',
        a: 'Sim. Todos os relatórios aceitam filtro por cliente, além do período obrigatório.',
      },
    ],
    guides: [
      { slug: 'controle-de-servicos-prestados', label: 'Controle de serviços prestados' },
      { slug: 'fluxo-de-caixa-para-autonomo', label: 'Fluxo de caixa para autônomo' },
      { slug: 'margem-de-lucro-de-servico', label: 'Margem de lucro de serviço' },
      { slug: 'rotina-administrativa-do-autonomo', label: 'Rotina administrativa do autônomo' },
    ],
    related: ['fluxo-de-caixa', 'recebimentos-e-saldos', 'contas-a-pagar', 'controle-de-estoque'],
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
  {
    slug: 'usuarios-e-permissoes',
    group: 'equipe',
    name: 'Usuários e permissões',
    title: 'Usuários e permissões: sua equipe na mesma conta',
    h1: 'Usuários e permissões: convide a equipe e defina o que cada um acessa',
    description:
      'Convide sua equipe para a mesma conta do MinhaOS App e escolha o papel de cada pessoa: administrador, operador ou financeiro. Até 10 usuários no Negócios.',
    summary: 'Convide pessoas por e-mail e dê a cada uma um papel: administrador, operador ou financeiro.',
    intro: [
      'Quando o trabalho deixa de ser só seu, a conta do MinhaOS App pode ser usada por mais pessoas. Você convida cada uma por e-mail e escolhe o <strong>papel</strong> dela: <strong>administrador</strong>, <strong>operador</strong> ou <strong>financeiro</strong>. O papel define o que a pessoa vê e o que pode fazer.',
      'Assim, quem vai a campo registra os serviços, quem cuida do dinheiro fecha o mês e acompanha os recebimentos, e as configurações da conta ficam com quem administra. Mais de um usuário está disponível a partir do plano <a href="/planos/">Profissional</a> (até 5 usuários) e no Negócios (até 10).',
    ],
    sections: [
      {
        h2: 'Como convidar alguém para a conta',
        body: ['Só administradores convidam pessoas, mudam papéis e desativam usuários.'],
        steps: [
          'Na área de usuários da conta, informe o <strong>e-mail</strong> da pessoa e escolha o <strong>papel</strong>: administrador, operador ou financeiro.',
          'Ela recebe um e-mail com o <strong>link do convite</strong>, válido por <strong>7 dias</strong> e de uso único.',
          'Quem ainda não tem login no MinhaOS App cria nome e senha ao abrir o link. Quem já usa o MinhaOS aceita o convite entrando com o login que já tem.',
          'Pronto: a pessoa passa a acessar a sua conta com as permissões do papel escolhido. Se o link expirar antes do aceite, envie um novo convite.',
        ],
      },
      {
        h2: 'Os três papéis e o que cada um pode fazer',
        body: [
          'O <strong>administrador</strong> faz tudo, inclusive gerenciar usuários, o plano e as configurações da conta. O <strong>operador</strong> cuida do dia a dia do serviço: cadastra clientes e registra serviços e lançamentos, com valores; movimenta o estoque e o patrimônio sem ver custos nem valores de compra; no painel, vê só os indicadores de serviços e o material que precisa de reposição. O <strong>financeiro</strong> cuida da cobrança e do caixa: consulta os serviços sem alterá-los, emite demonstrativos, gera links, registra recebimentos e usa o financeiro e os relatórios.',
        ],
        table: {
          caption: 'O que cada papel pode fazer na conta',
          head: ['Área', 'Administrador', 'Operador', 'Financeiro'],
          rows: [
            ['Clientes', 'Sim', 'Sim', 'Sim'],
            ['Serviços e lançamentos', 'Sim', 'Registra, com valores', 'Só consulta'],
            ['Faturamento, demonstrativos e links', 'Sim', 'Não', 'Sim'],
            ['Recebimentos', 'Sim', 'Não', 'Sim'],
            ['Financeiro (contas a pagar, recebimentos avulsos, fluxo de caixa)', 'Sim', 'Não', 'Sim'],
            ['Estoque e patrimônio', 'Sim', 'Sim, sem custos nem valores de compra', 'Sim'],
            ['Nota fiscal anexada ao bem e conta a pagar da compra', 'Sim', 'Não', 'Sim'],
            ['Relatórios e exportação CSV', 'Sim', 'Não', 'Sim'],
            ['Categorias financeiras', 'Sim', 'Não', 'Sim'],
            ['Usuários, plano e configurações da conta', 'Sim', 'Não', 'Não'],
            ['E-mails de faturamento e financeiro', 'Recebe', 'Não recebe', 'Recebe'],
          ],
        },
      },
      {
        h2: 'Uma pessoa, várias contas',
        body: [
          'O mesmo login pode participar de <strong>várias contas</strong>, por exemplo quando alguém trabalha para mais de uma empresa. Para ir de uma conta a outra, use a troca de conta no menu; os dados de cada conta continuam separados.',
          'Quem participa da conta de outra pessoa também pode <strong>criar uma conta própria</strong>, com seus clientes, serviços e plano.',
        ],
      },
      {
        h2: 'Segurança e controle de acesso',
        body: ['Algumas regras protegem a conta contra erros e acessos indevidos:'],
        bullets: [
          'Quem criou a conta (o <strong>dono</strong>) não pode ser removido.',
          'Sempre há pelo menos um <strong>administrador</strong>: a conta nunca fica sem quem a gerencie.',
          '<strong>Desativar</strong> um usuário corta o acesso dele na hora.',
          'O convite vale uma única vez e expira em 7 dias, então um link antigo esquecido no e-mail não dá acesso à conta.',
          'Os <strong>e-mails de faturamento e financeiro</strong> vão para administradores e financeiros.',
          'Cada serviço registrado mostra <strong>quem registrou</strong>, para você saber de onde veio cada lançamento.',
        ],
      },
      {
        h2: 'Quantos usuários cada plano permite',
        body: [
          'Grátis e Essencial têm <strong>1 usuário</strong>. O Profissional permite <strong>até 5</strong> e o Negócios <strong>até 10</strong>. Convites pendentes entram na conta: um convite enviado e ainda não aceito já ocupa uma vaga.',
          'Se você mudar para um plano com menos usuários, quem passar do limite fica <strong>suspenso</strong>, e nada é apagado. Ao voltar para um plano com espaço, o administrador reativa essas pessoas. Compare os limites em <a href="/planos/">planos e preços</a>.',
        ],
      },
    ],
    limits: [
      'Disponível a partir do plano Profissional: no Grátis e no Essencial, a conta tem 1 usuário.',
      'Os papéis são três (administrador, operador e financeiro), com permissões definidas; não há papel personalizado.',
      'O convite é feito por e-mail, e o link vale por 7 dias e uma única vez.',
      'Quem criou a conta não pode ser removido dela.',
      'O cliente que recebe o demonstrativo não é usuário da conta: ele abre o link sem login.',
    ],
    faq: [
      {
        q: 'Quantas pessoas posso colocar na conta?',
        a: 'Depende do plano: Grátis e Essencial têm 1 usuário, o Profissional até 5 e o Negócios até 10. Convites ainda não aceitos também contam no limite.',
      },
      {
        q: 'O operador vê quanto eu faturo?',
        a: 'Não. O operador registra serviços e lançamentos com valores, mas não vê faturamento, recebimentos, financeiro, relatórios, plano nem as configurações da conta. No estoque e no patrimônio, ele cadastra e movimenta sem ver custo, custo médio nem valor de compra; nas linhas de serviço vê só o preço cobrado do cliente, que vem do cadastro do item. No painel, vê só os indicadores de serviços.',
      },
      {
        q: 'A pessoa convidada precisa criar outra conta?',
        a: 'Não. Quem não tem login cria nome e senha pelo próprio link do convite. Quem já usa o MinhaOS aceita entrando com o login que já tem e troca de conta pelo menu.',
      },
      {
        q: 'O que acontece com a equipe se eu mudar para um plano menor?',
        a: 'Os membros acima do limite do novo plano ficam suspensos, e nada é apagado. Quando a conta voltar a um plano com espaço, o administrador pode reativá-los.',
      },
      {
        q: 'Posso tirar o acesso de alguém imediatamente?',
        a: 'Sim. Desativar um usuário corta o acesso dele na hora. A única pessoa que não pode ser removida é quem criou a conta, e a conta mantém sempre ao menos um administrador.',
      },
    ],
    guides: [
      { slug: 'rotina-administrativa-do-autonomo', label: 'Rotina administrativa do autônomo' },
      { slug: 'controle-de-servicos-prestados', label: 'Controle de serviços prestados' },
      { slug: 'como-organizar-clientes', label: 'Como organizar clientes' },
      { slug: 'fechamento-mensal-de-servicos', label: 'Fechamento mensal de serviços' },
    ],
    related: ['registro-de-servicos', 'fechamento-mensal', 'relatorios', 'controle-de-patrimonio'],
  },
  {
    slug: 'controle-de-estoque',
    group: 'estoque',
    name: 'Controle de estoque',
    title: 'Controle de estoque de material para prestador de serviço',
    h1: 'Controle de estoque de material com baixa automática no serviço',
    description:
      'Cadastre o material, dê entrada com custo e deixe o MinhaOS baixar o estoque quando você registra o serviço. Saldo, estoque mínimo e custo médio na mão.',
    summary: 'Material com saldo, estoque mínimo e custo médio. A saída é registrada sozinha quando você salva o serviço.',
    intro: [
      'Cabo, conexão, gás, filtro, adubo, parafuso: quem presta serviço gasta material todo dia e, quase sempre, só descobre que acabou quando está na casa do cliente. O <strong>controle de estoque</strong> do MinhaOS App guarda o saldo de cada material, avisa quando está na hora de repor e mostra quanto o material custou em cada serviço.',
      'A diferença para uma planilha é que você não precisa lembrar de dar baixa: ao escolher o material na linha do serviço e salvar, a saída é registrada sozinha, e o cliente é cobrado pelo valor de venda do item. Está disponível em todos os planos, com limite de itens ativos por plano.',
    ],
    sections: [
      {
        h2: 'Cadastro do material',
        body: [
          'Cada item tem nome, código ou SKU (opcional), categoria e unidade de medida: <strong>unidade</strong>, <strong>metro</strong>, <strong>metro quadrado</strong>, <strong>metro cúbico</strong>, <strong>quilo</strong>, <strong>litro</strong>, <strong>caixa</strong>, <strong>pacote</strong>, <strong>rolo</strong> ou <strong>saco</strong>. As quantidades aceitam até quatro casas decimais, então 2,5 m de cabo ou 0,75 kg de massa são registrados como são.',
          'Você também informa o <strong>estoque mínimo</strong> (o ponto em que quer ser avisado), o <strong>custo de referência</strong> e o <strong>valor de venda</strong>, que é o preço cobrado do cliente quando o material entra num serviço. Itens que você não usa mais podem ser <strong>arquivados</strong>: saem das listas e liberam a vaga do plano, sem apagar o histórico.',
        ],
      },
      {
        h2: 'Entrada com custo e, se quiser, conta a pagar',
        body: [
          'Comprou material? Registre a <strong>entrada</strong> com a quantidade, a data, o fornecedor e o custo, unitário ou total da compra. Já no cadastro do item dá para lançar o saldo inicial.',
          'Na mesma tela, marque <strong>lançar conta a pagar</strong> para criar a despesa no <a href="/funcionalidades/contas-a-pagar/">Financeiro</a>, com vencimento, valor e fornecedor, ligada à entrada. A conta criada assim conta como um lançamento na cota mensal de contas a pagar do seu plano.',
        ],
      },
      {
        h2: 'Baixa automática ao salvar o serviço',
        body: ['O estoque e a cobrança andam juntos, sem digitar duas vezes:'],
        steps: [
          'No <a href="/funcionalidades/registro-de-servicos/">registro do serviço</a>, adicione uma linha e escolha o <strong>material do estoque</strong>. O seletor mostra o saldo atual de cada item.',
          'Informe a quantidade usada. A unidade vem do cadastro, a descrição é preenchida e o preço vem do <strong>valor de venda</strong> do item; o administrador pode ajustar o preço, e o operador usa o do cadastro.',
          'Salve. A saída é registrada no estoque pelo custo médio do item, e a linha fica pronta para o <a href="/funcionalidades/fechamento-mensal/">fechamento do mês</a>, cobrada do cliente como qualquer outra.',
        ],
      },
      {
        h2: 'Editou ou cancelou o serviço? O estoque acompanha',
        body: [
          'Se você muda a quantidade, troca o material ou remove a linha, o MinhaOS App registra só a diferença: o que passou a ser usado sai, o que deixou de ser usado volta. Ao cancelar o serviço, todo o material volta ao estoque. Linhas que já entraram em um demonstrativo ficam travadas, como qualquer lançamento cobrado.',
        ],
      },
      {
        h2: 'Saldo negativo e reposição',
        body: [
          'Usou mais do que o sistema tinha? O serviço salva do mesmo jeito: o trabalho foi feito e precisa ser cobrado. O item fica com <strong>saldo negativo</strong>, destacado em vermelho, até você registrar a entrada que faltou ou acertar a contagem.',
          'Itens negativos, zerados ou abaixo do mínimo aparecem no painel e no filtro <strong>Precisam de atenção</strong> da lista de estoque. É a sua lista de compras pronta antes de sair para a loja.',
        ],
      },
      {
        h2: 'Custo médio e margem do serviço',
        body: [
          'A cada entrada com custo, o MinhaOS App recalcula o <strong>custo médio</strong> do item. Exemplo fictício: você tem 10 m de cabo a R$ 2,00 (R$ 20,00) e compra mais 20 m a R$ 2,60 (R$ 52,00). Ficam 30 m que custaram R$ 72,00, ou seja, R$ 2,40 por metro.',
          'Quando o material sai por um serviço, ele leva esse custo para o relatório de <a href="/funcionalidades/relatorios/">margem por serviço e por cliente</a>. Se você cobrou 15 m a R$ 4,50 (R$ 67,50), o custo do material foi 15 × R$ 2,40 = R$ 36,00, e a margem dele, R$ 31,50. A conta a pagar criada pela entrada de estoque fica fora da margem, para o custo não contar duas vezes.',
        ],
      },
      {
        h2: 'Ajuste de inventário, estorno e extrato',
        body: [
          'Contou a prateleira e o número não bate? Use o <strong>ajuste de inventário</strong>: informe a quantidade contada e o sistema registra a diferença. Uma entrada, saída ou ajuste lançado errado pode ser <strong>estornado</strong>, uma vez, com motivo; nada é apagado.',
          'Cada item tem um <strong>extrato</strong> com data, tipo do movimento, quantidade, saldo depois do movimento, custo, o serviço de origem e quem registrou. Nos relatórios, a <strong>posição de estoque</strong> e as <strong>movimentações do período</strong> podem ser vistas na tela e, nos planos pagos, exportadas em CSV.',
        ],
      },
      {
        h2: 'Equipe: o operador registra sem ver custo',
        body: [
          'Nos planos com <a href="/funcionalidades/usuarios-e-permissoes/">usuários e permissões</a>, o operador cadastra itens, dá entrada, saída e ajuste e usa o material nos serviços, mas não vê custo, custo médio nem o valor total do estoque, e não cria conta a pagar. Na linha do serviço, vê o preço cobrado do cliente, que vem do cadastro do item. Administrador e financeiro veem tudo.',
        ],
      },
      {
        h2: 'Quantos itens cada plano permite',
        body: ['O limite é de itens ativos no estoque, não de movimentos: entradas, saídas e baixas no serviço não têm limite.'],
        table: {
          caption: 'Itens de material ativos no estoque, por plano',
          head: ['Plano', 'Itens ativos'],
          rows: [
            ['Grátis', 'Até 20'],
            ['Essencial', 'Até 100'],
            ['Profissional', 'Até 500'],
            ['Negócios', 'Até 2.000'],
          ],
        },
      },
    ],
    limits: [
      'Não emite nota fiscal e não é inventário fiscal: não gera Registro de Inventário nem Bloco K do SPED.',
      'Não controla lote, validade nem vários depósitos ou almoxarifados: o saldo de cada item é um só.',
      'Não lê código de barras e não faz pedido de compra ao fornecedor.',
      'O aviso de reposição aparece no painel e na lista; ainda não há aviso por e-mail.',
      'Os lançamentos gerados por contratos recorrentes não baixam material: lance o material usado nesses serviços à parte.',
    ],
    faq: [
      {
        q: 'O estoque pode ficar negativo?',
        a: 'Pode. Se o serviço usou mais material do que o saldo registrado, ele é salvo normalmente e o item fica com saldo negativo, destacado, até você registrar a entrada ou ajustar a contagem.',
      },
      {
        q: 'Posso dar entrada em material comprado sem nota fiscal?',
        a: 'Sim. A entrada registra quantidade, data, custo e fornecedor; a nota é opcional no estoque. Para a sua contabilidade, porém, guarde os comprovantes de compra e confirme com o contador o que é exigido no seu caso.',
      },
      {
        q: 'Como o custo médio é calculado?',
        a: 'A cada entrada com custo, o sistema soma o valor do saldo que você já tinha com o valor da compra e divide pela nova quantidade. Saídas e ajustes usam o custo médio do momento e não o alteram.',
      },
      {
        q: 'O operador vê o custo do material?',
        a: 'Não. O operador cadastra e movimenta o estoque e usa o material nos serviços, mas não vê custo, custo médio nem o valor do estoque. Nas linhas de serviço, ele vê o preço cobrado do cliente, que vem do cadastro do item.',
      },
      {
        q: 'O que acontece com o estoque se eu cancelar o serviço?',
        a: 'Todo o material que tinha saído por aquele serviço volta ao estoque, com o mesmo custo. Se você só alterar a quantidade de uma linha, entra ou sai apenas a diferença.',
      },
    ],
    guides: [
      { slug: 'controle-de-estoque-para-prestador-de-servico', label: 'Controle de estoque para prestador de serviço' },
      { slug: 'estoque-minimo-material-de-consumo', label: 'Estoque mínimo e ponto de reposição' },
      { slug: 'custo-de-material-no-preco-do-servico', label: 'Custo do material no preço do serviço' },
      { slug: 'planilha-de-controle-de-estoque', label: 'Planilha de controle de estoque' },
    ],
    related: ['registro-de-servicos', 'controle-de-patrimonio', 'contas-a-pagar', 'relatorios'],
  },
  {
    slug: 'controle-de-patrimonio',
    group: 'estoque',
    name: 'Controle de patrimônio',
    title: 'Controle de patrimônio com etiqueta QR code',
    h1: 'Controle de patrimônio: ferramentas, equipamentos e veículos com etiqueta QR',
    description:
      'Cadastre cada bem com código PAT-0001, nota fiscal, garantia e responsável. Imprima etiquetas com QR code e saiba onde está cada ferramenta da equipe.',
    summary: 'Cada ferramenta e equipamento com código, situação, responsável, garantia e etiqueta com QR code.',
    intro: [
      'A furadeira emprestada que não voltou, o multímetro que ninguém sabe com quem está, a garantia do compressor que venceu sem você perceber. O <strong>controle de patrimônio</strong> do MinhaOS App registra cada ferramenta, equipamento ou veículo do negócio, com código, situação, responsável, local e garantia.',
      'Cada bem ganha um código, como PAT-0001, e uma etiqueta com QR code para colar nele. Quem tem acesso à conta aponta a câmera do celular e abre a ficha do bem na hora. Está disponível em todos os planos, com limite de bens por plano.',
    ],
    sections: [
      {
        h2: 'Código automático e editável',
        body: [
          'Ao cadastrar um bem, o código é gerado na sequência da conta: PAT-0001, PAT-0002 e assim por diante. Se você já usa outra numeração, digite o seu código, com até 20 letras, números e sinais simples. O sistema não deixa dois bens com o mesmo código na conta.',
          'Além do código, registre a descrição, a categoria, a marca, o modelo e o número de série. É o que permite reconhecer o bem num roubo, num conserto ou numa conferência.',
        ],
      },
      {
        h2: 'Situação, responsável e local',
        body: [
          'Cada bem tem uma situação: <strong>em uso</strong>, <strong>em manutenção</strong>, <strong>emprestado</strong> ou <strong>baixado</strong>. Ao mudar a situação, você informa o responsável, o local e uma observação, por exemplo “emprestado ao Fulano para a obra da Rua X”.',
          'Quando o bem sai de vez (quebrou, foi vendido, foi roubado), você dá <strong>baixa</strong>, com data e motivo. O bem baixado fica só para consulta e libera a vaga do plano; se a baixa foi um engano, dá para desfazer.',
        ],
      },
      {
        h2: 'Compra, nota fiscal e garantia',
        body: [
          'Registre o valor e a data de aquisição, o fornecedor, o número da nota e a data em que a garantia termina. A lista mostra quando a garantia está para vencer ou já venceu.',
          'Nos planos pagos, a partir do Essencial, anexe a <strong>nota fiscal</strong>, fotos e o certificado de garantia ao bem, em PDF ou imagem. Os anexos ficam visíveis só para administradores e financeiros. Na compra, você também pode marcar <strong>lançar conta a pagar</strong> para criar a despesa no Financeiro, ligada ao bem.',
        ],
      },
      {
        h2: 'Etiquetas com QR code',
        body: ['Selecione os bens na lista (ou abra um só) e imprima as etiquetas em dois formatos:'],
        bullets: [
          '<strong>Folha A4</strong> com 24 etiquetas (3 colunas × 8 linhas, 70 × 37,1 mm), o formato das folhas adesivas vendidas em papelaria.',
          '<strong>Etiqueta individual</strong> de 50 × 30 mm, para impressora térmica de etiquetas.',
        ],
      },
      {
        h2: 'O QR abre a ficha só para quem tem acesso',
        body: [
          'Cada etiqueta traz o QR code, o código grande, a descrição e o nome da sua conta. O QR leva à ficha do bem dentro do MinhaOS App: quem está logado na conta vê os dados; quem não está cai na tela de login. Nenhum dado do bem fica público.',
        ],
      },
      {
        h2: 'Histórico e inventário',
        body: [
          'Cada bem guarda o histórico: cadastro, alterações, mudanças de situação, baixa, anexos e conta a pagar criada. Nos relatórios, o <strong>inventário de patrimônio</strong> lista todos os bens com situação, responsável, local, aquisição e garantia, na tela e, nos planos pagos, em CSV. No painel, você vê o total de bens e, se tiver permissão, o valor de aquisição somado.',
        ],
      },
      {
        h2: 'Quantos bens cada plano permite',
        body: ['O limite é de bens não baixados. Bens baixados continuam no histórico e não ocupam vaga.'],
        table: {
          caption: 'Bens no patrimônio, por plano',
          head: ['Plano', 'Bens', 'Anexos no bem'],
          rows: [
            ['Grátis', 'Até 10', 'Não'],
            ['Essencial', 'Até 50', 'Sim'],
            ['Profissional', 'Até 200', 'Sim'],
            ['Negócios', 'Até 1.000', 'Sim'],
          ],
        },
      },
    ],
    limits: [
      'Não calcula depreciação contábil nem faz o controle fiscal do ativo imobilizado: o valor registrado é o de aquisição. Para a contabilidade, fale com o seu contador.',
      'O QR code não é público: só abre a ficha para quem tem login na conta.',
      'Não rastreia localização por GPS: o local é o que você informa.',
      'No plano Grátis, o bem não aceita anexos (nota, fotos, garantia).',
    ],
    faq: [
      {
        q: 'Qualquer pessoa que ler o QR code vê os dados do bem?',
        a: 'Não. O QR aponta para a ficha do bem dentro do aplicativo. Quem não está logado na sua conta vê apenas a tela de login.',
      },
      {
        q: 'Posso usar a numeração que já tenho nas minhas ferramentas?',
        a: 'Sim. O código automático (PAT-0001) é só uma sugestão. Você pode digitar o seu código, com até 20 caracteres, desde que não se repita na conta.',
      },
      {
        q: 'O MinhaOS App calcula a depreciação dos bens?',
        a: 'Não. Ele registra o valor e a data de aquisição para controle interno. Depreciação contábil e fiscal segue regras próprias e deve ser tratada com o seu contador.',
      },
      {
        q: 'Que etiqueta preciso comprar?',
        a: 'Para a folha A4, uma folha adesiva com 24 etiquetas de 70 × 37,1 mm (3 × 8). Para impressora térmica, etiquetas de 50 × 30 mm. Faça um teste em papel comum antes de imprimir a folha adesiva.',
      },
      {
        q: 'O operador vê o valor dos bens?',
        a: 'Não. O operador cadastra bens, muda a situação e imprime etiquetas, mas não vê o valor de aquisição nem os anexos, como a nota fiscal. Administrador e financeiro veem tudo.',
      },
    ],
    guides: [
      { slug: 'controle-de-patrimonio-pequena-empresa', label: 'Controle de patrimônio em pequena empresa' },
      { slug: 'controle-de-ferramentas-e-equipamentos', label: 'Controle de ferramentas e equipamentos' },
      { slug: 'etiqueta-qr-code-para-patrimonio', label: 'Etiqueta patrimonial com QR code' },
    ],
    related: ['controle-de-estoque', 'usuarios-e-permissoes', 'contas-a-pagar', 'notas-fiscais-anexas'],
  },
]

export const featureBySlug = (slug: string) => features.find((f) => f.slug === slug)

/** Resumo honesto do que o produto não faz (página-índice). */
export const naoFaz = [
  'Não emite nota fiscal nem NFS-e. Você emite no sistema oficial e anexa o arquivo ao demonstrativo.',
  'Não processa pagamentos, não gera boleto nem código Pix e não é banco. Recebimentos e quitações de contas são registrados por você.',
  'Não envia WhatsApp automaticamente: abre a conversa com a mensagem pronta, e o envio é seu.',
  'Controla estoque de material e patrimônio, mas não faz inventário fiscal (como o Bloco K do SPED), não calcula depreciação e não tem lote, validade nem vários depósitos.',
  'Não tem agenda de visitas, assinatura digital nem certificado digital.',
  'Não calcula impostos, multa ou juros e não faz conciliação bancária automática.',
]
