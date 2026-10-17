/**
 * Planos e preços — fonte única para /planos/, a home, o FAQ, o llms.txt e o JSON-LD.
 * Preços em reais, por mês. O anual aplica `annualDiscount` sobre 12 mensalidades.
 */
export const annualDiscount = 0.2

export interface Plan {
  key: 'gratis' | 'profissional' | 'negocios'
  name: string
  /** Preço mensal em reais (0 = grátis). */
  monthly: number
  tagline: string
  audience: string
  highlight?: boolean
  cta: string
  /** Itens exibidos no cartão do plano. */
  features: string[]
}

export const plans: Plan[] = [
  {
    key: 'gratis',
    name: 'Grátis',
    monthly: 0,
    tagline: 'Para o autônomo que emite poucas cobranças',
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
    key: 'profissional',
    name: 'Profissional',
    monthly: 49,
    tagline: 'Para quem vive de cobrar todo mês',
    audience: 'Clientes ilimitados, sua marca no documento e a cobrança enviada por e-mail com lembretes automáticos.',
    highlight: true,
    cta: 'Assinar o Profissional',
    features: [
      'Clientes ilimitados e até 60 demonstrativos por mês',
      'Seu logo no demonstrativo, sem a marca MinhaOS',
      'Envio do demonstrativo por e-mail direto da plataforma',
      'Lembrete automático de vencimento e de atraso',
      'Validade de links configurável, rotação e revogação',
      'Histórico completo de acessos, com data e hora de cada visualização e download',
      'Anexos ilimitados por demonstrativo e 5 GB de armazenamento',
      'Relatórios por período, por cliente e de recebimentos, com exportação CSV',
      'Resumo semanal de vencidos e resumo mensal por e-mail',
      'Contas a pagar e recebimentos avulsos sem limite, com recorrência, parcelamento e anexos',
      'Contratos recorrentes: a mensalidade do cliente lançada sozinha em cada data',
      'Fluxo de caixa previsto × realizado e margem por serviço e cliente',
    ],
  },
  {
    key: 'negocios',
    name: 'Negócios',
    monthly: 99,
    tagline: 'Para pequenas empresas com equipe',
    audience: 'Tudo do Profissional, mais usuários com papéis, régua de cobrança e acesso por API.',
    cta: 'Assinar o Negócios',
    features: [
      'Demonstrativos ilimitados e 20 GB de armazenamento',
      'Até 5 usuários na mesma conta, com papéis: administrador, operador e financeiro',
      'Envio por WhatsApp com modelo de mensagem e link, além do e-mail',
      'Régua de cobrança configurável: lembretes antes e depois do vencimento, no intervalo que você escolher',
      'Catálogo de serviços com preço padrão e tabela de preço por cliente',
      'Exportação completa dos dados e acesso por API com chave',
      'Financeiro completo, como no Profissional: recorrência, contratos recorrentes e fluxo de caixa',
      'Histórico de acessos guardado por 24 meses',
      'Suporte prioritário com resposta em 1 dia útil',
    ],
  },
]

/** Linhas da tabela comparativa. `true`/`false` viram ícones; texto é exibido como está. */
export interface CompareRow {
  label: string
  values: [string | boolean, string | boolean, string | boolean]
}
export interface CompareGroup {
  title: string
  rows: CompareRow[]
}

export const compare: CompareGroup[] = [
  {
    title: 'Limites',
    rows: [
      { label: 'Clientes ativos', values: ['Até 10', 'Ilimitados', 'Ilimitados'] },
      { label: 'Demonstrativos emitidos por mês', values: ['Até 5', 'Até 60', 'Ilimitados'] },
      { label: 'Lançamentos de serviço', values: ['Sem limite', 'Sem limite', 'Sem limite'] },
      { label: 'Usuários na conta', values: ['1', '1', 'Até 5, com papéis'] },
      { label: 'Anexos por demonstrativo', values: ['1', 'Ilimitados', 'Ilimitados'] },
      { label: 'Armazenamento de anexos', values: ['100 MB', '5 GB', '20 GB'] },
    ],
  },
  {
    title: 'Demonstrativo e link',
    rows: [
      { label: 'Impressão em A4 e PDF', values: [true, true, true] },
      { label: 'Seu logo no demonstrativo', values: [false, true, true] },
      { label: 'Sem a marca “organizado com MinhaOS”', values: [false, true, true] },
      { label: 'Validade do link', values: ['30 dias, fixa', 'Configurável', 'Configurável'] },
      { label: 'Rotação e revogação de links', values: [false, true, true] },
      { label: 'Confirmação de recebimento pelo cliente', values: [true, true, true] },
    ],
  },
  {
    title: 'Envio e cobrança',
    rows: [
      { label: 'Copiar link e compartilhar pelo celular', values: [true, true, true] },
      { label: 'Envio por e-mail direto da plataforma', values: [false, true, true] },
      { label: 'Lembrete automático de vencimento e de atraso', values: [false, true, true] },
      { label: 'Envio por WhatsApp com modelo de mensagem', values: [false, false, true] },
      { label: 'Régua de cobrança configurável', values: [false, false, true] },
      { label: 'Catálogo de serviços e tabela de preço por cliente', values: [false, false, true] },
    ],
  },
  {
    title: 'Acompanhamento e relatórios',
    rows: [
      { label: 'Visualização e confirmação do cliente', values: ['Viu ou não viu', 'Data e hora de cada acesso', 'Data e hora de cada acesso'] },
      { label: 'Registro de downloads de anexos', values: [false, true, true] },
      { label: 'Histórico de acessos guardado por', values: ['6 meses', '6 meses', '24 meses'] },
      { label: 'Relatórios', values: ['Mês atual, na tela', 'Por período, cliente e recebimentos', 'Por período, cliente e recebimentos'] },
      { label: 'Exportação CSV', values: [false, true, true] },
      { label: 'Resumo semanal de vencidos e resumo mensal', values: [false, true, true] },
      { label: 'Exportação completa dos dados e API com chave', values: [false, false, true] },
    ],
  },
  {
    title: 'Financeiro',
    rows: [
      { label: 'Contas a pagar e recebimentos avulsos', values: ['Até 20 lançamentos por mês', 'Ilimitados', 'Ilimitados'] },
      { label: 'Lembrete diário de contas a vencer e em atraso', values: [true, true, true] },
      { label: '“Financeiro do mês” no painel', values: [true, true, true] },
      { label: 'Recorrência e parcelamento de lançamentos', values: [false, true, true] },
      { label: 'Contratos recorrentes de clientes', values: [false, true, true] },
      { label: 'Anexos em contas a pagar (boleto, comprovante, nota)', values: [false, true, true] },
      { label: 'Fluxo de caixa realizado × previsto', values: [false, true, true] },
      { label: 'Margem por serviço e cliente', values: ['Na tela', 'Na tela e em CSV', 'Na tela e em CSV'] },
    ],
  },
  {
    title: 'Suporte',
    rows: [
      { label: 'E-mails de segurança e operacionais', values: [true, true, true] },
      { label: 'Suporte por e-mail', values: [true, true, true] },
      { label: 'Suporte prioritário (resposta em 1 dia útil)', values: [false, false, true] },
    ],
  },
]

/** Preço mensal equivalente no plano anual, em reais. */
export const annualMonthly = (monthly: number) => Math.round(monthly * (1 - annualDiscount) * 100) / 100
/** Total do ano, em reais. */
export const annualTotal = (monthly: number) => Math.round(annualMonthly(monthly) * 12 * 100) / 100

export const brl = (v: number, cents = true) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })

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
