/**
 * Planos e preços — fonte única para /planos/, a home, o FAQ, o llms.txt e o JSON-LD.
 * Preços em reais, por mês. O anual aplica `annualDiscount` sobre 12 mensalidades.
 *
 * As chaves (`key`) vão no `?plano=` dos links de cadastro. No aplicativo, os códigos internos são
 * gratis → free, essencial → starter, profissional → pro, negocios → business.
 * Todos os planos têm limites; acima do Negócios, o contato é pelo `customPlanHref`.
 */
import { site } from '../site.config'

export const annualDiscount = 0.2

/** Recurso anunciado que ainda não está disponível: exibido com o selo “Em breve”. */
export interface Soon {
  soon: true
  text?: string
}
export const soon = (text?: string): Soon => ({ soon: true, text })
export const isSoon = (v: unknown): v is Soon => typeof v === 'object' && v !== null && (v as Soon).soon === true

/** Item do cartão: texto simples ou recurso “em breve”. */
export type PlanFeature = string | (Soon & { text: string })
export const featureText = (f: PlanFeature) => (typeof f === 'string' ? f : `${f.text} (em breve)`)

export interface Plan {
  key: 'gratis' | 'essencial' | 'profissional' | 'negocios'
  name: string
  /** Preço mensal em reais (0 = grátis). */
  monthly: number
  tagline: string
  audience: string
  highlight?: boolean
  cta: string
  /** Itens exibidos no cartão do plano. */
  features: PlanFeature[]
}

export const plans: Plan[] = [
  {
    key: 'gratis',
    name: 'Grátis',
    monthly: 0,
    tagline: 'Para começar a organizar cobranças',
    audience: 'Comece sem cartão e use enquanto fizer sentido.',
    cta: 'Começar grátis',
    features: [
      'Até 10 clientes ativos e 5 demonstrativos por mês',
      'Registro de serviços e fechamento mensal sem limite de lançamentos',
      'Link público do demonstrativo com validade fixa de 30 dias, impressão e PDF',
      'Acompanhamento básico: viu ou não viu, confirmou recebimento',
      '1 anexo por demonstrativo e 100 MB de armazenamento',
      'Relatório do mês atual na tela',
      'Contas a pagar e recebimentos avulsos: até 20 lançamentos por mês, com lembrete de vencimento',
      'Marca “organizado com MinhaOS” no demonstrativo',
      'E-mails de segurança e operacionais, suporte por e-mail',
    ],
  },
  {
    key: 'essencial',
    name: 'Essencial',
    monthly: 59,
    tagline: 'Para o autônomo que cobra todo mês',
    audience: 'Sua marca no documento, histórico de acessos e o financeiro completo, com folga para a rotina de um autônomo.',
    highlight: true,
    cta: 'Assinar o Essencial',
    features: [
      'Até 50 clientes ativos e 50 demonstrativos por mês',
      'Seu logo no demonstrativo, sem a marca MinhaOS',
      'Validade de links configurável, rotação e revogação',
      'Histórico completo de acessos, com data e hora de cada visualização e download',
      'Vários anexos por demonstrativo e 2 GB de armazenamento',
      'Relatórios por período, por cliente e de recebimentos, com exportação CSV',
      'Contas a pagar e recebimentos avulsos: até 100 lançamentos por mês, com recorrência, parcelamento e anexos',
      'Contratos recorrentes: a mensalidade do cliente lançada sozinha em cada data',
      'Fluxo de caixa previsto × realizado e margem por serviço e cliente',
      { soon: true, text: 'Envio do demonstrativo por e-mail direto da plataforma' },
      { soon: true, text: 'Lembrete automático de vencimento e de atraso' },
    ],
  },
  {
    key: 'profissional',
    name: 'Profissional',
    monthly: 99,
    tagline: 'Para quem cresceu e tem mais clientes',
    audience: 'Tudo do Essencial, com limites maiores para uma carteira de clientes que cresceu.',
    cta: 'Assinar o Profissional',
    features: [
      'Tudo do Essencial',
      'Até 100 clientes ativos e 100 demonstrativos por mês',
      'Contas a pagar e recebimentos avulsos: até 300 lançamentos por mês',
      '5 GB de armazenamento de anexos',
      { soon: true, text: 'Até 5 usuários na mesma conta' },
    ],
  },
  {
    key: 'negocios',
    name: 'Negócios',
    monthly: 199,
    tagline: 'Para equipes e volume',
    audience: 'Tudo do Profissional, com limites para equipe e volume e suporte prioritário.',
    cta: 'Assinar o Negócios',
    features: [
      'Tudo do Profissional',
      'Até 300 clientes ativos e 300 demonstrativos por mês',
      'Contas a pagar e recebimentos avulsos: até 1.000 lançamentos por mês',
      '20 GB de armazenamento de anexos',
      'Suporte prioritário com resposta em 1 dia útil',
      { soon: true, text: 'Até 10 usuários na mesma conta, com papéis: administrador, operador e financeiro' },
    ],
  },
]

/** Contato para quem precisa de mais que o Negócios (e-mail com assunto pronto). */
export const customPlanHref = `mailto:${site.contactEmail}?subject=Plano%20sob%20medida`

/** Linhas da tabela comparativa. `true`/`false` viram ícones; `Soon` vira o selo “Em breve”; texto é exibido como está. */
export type CompareCell = string | boolean | Soon
export interface CompareRow {
  label: string
  values: [CompareCell, CompareCell, CompareCell, CompareCell]
}
export interface CompareGroup {
  title: string
  rows: CompareRow[]
}

const anexos = 'Quantos couberem no armazenamento'

export const compare: CompareGroup[] = [
  {
    title: 'Limites',
    rows: [
      { label: 'Clientes ativos', values: ['Até 10', 'Até 50', 'Até 100', 'Até 300'] },
      { label: 'Demonstrativos emitidos por mês', values: ['Até 5', 'Até 50', 'Até 100', 'Até 300'] },
      { label: 'Contas a pagar e recebimentos avulsos por mês', values: ['Até 20', 'Até 100', 'Até 300', 'Até 1.000'] },
      { label: 'Lançamentos de serviço', values: ['Sem limite', 'Sem limite', 'Sem limite', 'Sem limite'] },
      { label: 'Usuários na conta', values: ['1', '1', soon('Até 5'), soon('Até 10, com papéis')] },
      { label: 'Anexos por demonstrativo', values: ['1', anexos, anexos, anexos] },
      { label: 'Armazenamento de anexos', values: ['100 MB', '2 GB', '5 GB', '20 GB'] },
    ],
  },
  {
    title: 'Demonstrativo e link',
    rows: [
      { label: 'Impressão em A4 e PDF', values: [true, true, true, true] },
      { label: 'Seu logo no demonstrativo', values: [false, true, true, true] },
      { label: 'Sem a marca “organizado com MinhaOS”', values: [false, true, true, true] },
      { label: 'Validade do link', values: ['30 dias, fixa', 'Configurável', 'Configurável', 'Configurável'] },
      { label: 'Rotação e revogação de links', values: [false, true, true, true] },
      { label: 'Confirmação de recebimento pelo cliente', values: [true, true, true, true] },
    ],
  },
  {
    title: 'Envio e cobrança',
    rows: [
      { label: 'Copiar link e compartilhar pelo celular', values: [true, true, true, true] },
      { label: 'Envio por e-mail direto da plataforma', values: [false, soon(), soon(), soon()] },
      { label: 'Lembrete automático de vencimento e de atraso', values: [false, soon(), soon(), soon()] },
    ],
  },
  {
    title: 'Acompanhamento e relatórios',
    rows: [
      {
        label: 'Visualização e confirmação do cliente',
        values: ['Viu ou não viu', 'Data e hora de cada acesso', 'Data e hora de cada acesso', 'Data e hora de cada acesso'],
      },
      { label: 'Registro de downloads de anexos', values: [false, true, true, true] },
      {
        label: 'Relatórios',
        values: ['Mês atual, na tela', 'Por período, cliente e recebimentos', 'Por período, cliente e recebimentos', 'Por período, cliente e recebimentos'],
      },
      { label: 'Exportação CSV', values: [false, true, true, true] },
      { label: 'Resumo semanal de vencidos e resumo mensal', values: [true, true, true, true] },
    ],
  },
  {
    title: 'Financeiro',
    rows: [
      { label: 'Contas a pagar e recebimentos avulsos', values: [true, true, true, true] },
      { label: 'Lembrete diário de contas a vencer e em atraso', values: [true, true, true, true] },
      { label: '“Financeiro do mês” no painel', values: [true, true, true, true] },
      { label: 'Recorrência e parcelamento de lançamentos', values: [false, true, true, true] },
      { label: 'Contratos recorrentes de clientes', values: [false, true, true, true] },
      { label: 'Anexos em contas a pagar (boleto, comprovante, nota)', values: [false, true, true, true] },
      { label: 'Fluxo de caixa realizado × previsto', values: [false, true, true, true] },
      { label: 'Margem por serviço e cliente', values: ['Na tela', 'Na tela e em CSV', 'Na tela e em CSV', 'Na tela e em CSV'] },
    ],
  },
  {
    title: 'Suporte',
    rows: [
      { label: 'E-mails de segurança e operacionais', values: [true, true, true, true] },
      { label: 'Suporte por e-mail', values: [true, true, true, true] },
      { label: 'Suporte prioritário (resposta em 1 dia útil)', values: [false, false, false, true] },
    ],
  },
]

/** Preço mensal equivalente no plano anual, em reais. */
export const annualMonthly = (monthly: number) => Math.round(monthly * (1 - annualDiscount) * 100) / 100
/** Total do ano, em reais. */
export const annualTotal = (monthly: number) => Math.round(annualMonthly(monthly) * 12 * 100) / 100

export const brl = (v: number, cents = true) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })

/** Planos pagos, do mais barato ao mais caro. */
export const paidPlans = plans.filter((p) => p.monthly > 0)
/** Maior preço mensal (para o AggregateOffer do JSON-LD). */
export const highestMonthly = Math.max(...plans.map((p) => p.monthly))

/** JSON-LD: uma oferta por plano (preço mensal) ligada ao SoftwareApplication. */
export const offersLd = (softwareId: string) =>
  plans.map((p) => ({
    '@type': 'Offer',
    name: `Plano ${p.name}`,
    description: p.tagline,
    url: 'https://minhaos.app/planos/',
    price: p.monthly.toFixed(2),
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    category: 'subscription',
    itemOffered: { '@id': softwareId },
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: p.monthly.toFixed(2),
      priceCurrency: 'BRL',
      billingDuration: 1,
      billingIncrement: 1,
      unitCode: 'MON',
    },
  }))
