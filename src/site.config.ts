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
} as const

export type ClusterKey = keyof typeof clusters
