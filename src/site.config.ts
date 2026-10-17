/**
 * Configuração central do site. Nome da marca, domínios e links para o aplicativo.
 * `appUrl` aponta para o painel (frontend na Vercel) — ajuste quando o domínio final estiver definido.
 */
export const site = {
  name: 'MinhaOS App',
  shortName: 'MinhaOS',
  url: 'https://minhaos.app',
  appUrl: 'https://app.minhaos.app',
  locale: 'pt_BR',
  lang: 'pt-BR',
  description:
    'Registre os serviços que você executa, faça o fechamento do mês e envie ao cliente um demonstrativo de cobrança claro, com link para consulta e confirmação de recebimento.',
  contactEmail: 'contato@minhaos.app',
  themeColor: '#0F172A',
} as const

export const links = {
  signup: `${site.appUrl}/cadastro`,
  login: `${site.appUrl}/login`,
}

/**
 * IDs de rastreamento. Nada aqui carrega sem consentimento (banner de cookies, src/lib/tracking.ts);
 * ID vazio = a ferramenta não é carregada.
 * - gaId (análise): Google Analytics → Administrador → Fluxos de dados → seu fluxo da Web → "ID da métrica" (G-…).
 * - gtmId (análise): Google Tag Manager → no topo do espaço de trabalho, "ID do contêiner" (GTM-…).
 *   Com gtmId preenchido, o GA4 NÃO é carregado direto: configure a tag do GA4 dentro do GTM (evita contagem em dobro).
 * - metaPixelId (marketing): Gerenciador de Eventos da Meta → Fontes de dados → seu pixel → "ID do conjunto de dados" (só números).
 * - googleAdsId (marketing): Google Ads → Metas → Conversões → Configurações → "Tag do Google" (AW-…).
 *   Se você configurar o Google Ads dentro do GTM, deixe este campo vazio.
 */
export const tracking = {
  gaId: 'G-7RYM7B1WPC',
  gtmId: '',
  metaPixelId: '',
  googleAdsId: '',
}

export const nav = [
  { href: '/funcionalidades/', label: 'Funcionalidades' },
  { href: '/planos/', label: 'Planos' },
  { href: '/para/', label: 'Para quem é' },
  { href: '/guias/', label: 'Guias' },
  { href: '/ferramentas/', label: 'Ferramentas grátis' },
  { href: '/perguntas-frequentes/', label: 'Dúvidas' },
] as const

/** Grupos de conteúdo (clusters) dos guias — cada um tem uma página-pilar em /guias/<cluster>/. */
export const clusters = {
  'ordem-de-servico': { title: 'Ordem de serviço', description: 'Como criar, organizar e registrar ordens de serviço do jeito certo.' },
  cobranca: { title: 'Cobrança', description: 'Como cobrar clientes com clareza, sem constrangimento e com menos atraso.' },
  precificacao: { title: 'Preço e orçamento', description: 'Quanto cobrar, como montar orçamentos e calcular o valor da sua hora.' },
  documentos: { title: 'Recibos, notas e documentos', description: 'Recibo, nota fiscal, demonstrativo e contrato: o que cada um é e quando usar.' },
  gestao: { title: 'Organização e finanças', description: 'Controle de serviços, clientes, fluxo de caixa e rotina de quem trabalha por conta própria.' },
  financeiro: { title: 'Contas a pagar e receber', description: 'Contas a pagar, recebimentos, despesas, margem e previsão de caixa.' },
} as const

export type ClusterKey = keyof typeof clusters
