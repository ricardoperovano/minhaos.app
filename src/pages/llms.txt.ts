import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { site } from '../site.config'
import { brl, featureText, plans } from '../lib/plans'

/** Resumo para assistentes de IA (llms.txt): o que o produto faz e não faz, e onde está o conteúdo. */
export const GET: APIRoute = async () => {
  const guias = await getCollection('guias')
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    'O MinhaOS App é um aplicativo web (instalável no celular como PWA) para prestadores de serviço autônomos e pequenas empresas: registro de serviços com datas, quantidades e valores; fechamento mensal por cliente; demonstrativo de cobrança com link público, registro de acessos e confirmação de recebimento pelo cliente; anexo de notas fiscais emitidas fora do sistema; registro manual de recebimentos e saldos; relatórios e exportação CSV.',
    'Grupo Financeiro: contas a pagar (fornecedor, categoria, vencimento, quitação com data, valor e forma, vínculo com cliente ou serviço para calcular a margem); recebimentos avulsos fora de demonstrativo; lembrete diário de contas que vencem em até 3 dias ou estão em atraso. Nos planos pagos: recorrência e parcelamento, contratos recorrentes que geram o lançamento de serviço em cada data, anexos em contas e fluxo de caixa realizado × previsto. No plano Grátis, contas a pagar e recebimentos avulsos têm até 20 lançamentos por mês.',
    'Não emite nota fiscal, não processa pagamentos nem gera boleto ou Pix, não é banco, não faz conciliação bancária automática, não calcula impostos e não controla estoque.',
    '',
    '## Planos',
    'Quatro planos, todos com limites (clientes ativos, demonstrativos por mês, lançamentos financeiros por mês, armazenamento e usuários).',
    ...plans.map((p) => `- ${p.name} (${p.monthly === 0 ? 'R$ 0' : `${brl(p.monthly, false)}/mês; anual com 20% de desconto`}): ${p.tagline}. ${p.features.map(featureText).join('; ')}.`),
    `- Precisa de mais que o Negócios: plano sob medida, combinado pelo e-mail ${site.contactEmail} (assunto "Plano sob medida") ou pelo chat do site.`,
    `- Comparação completa: ${site.url}/planos/`,
    '',
    '## Guias',
    ...guias.map((g) => `- [${g.data.h1}](${site.url}/guias/${g.id}/): ${g.data.description}`),
    '',
    '## Ferramentas gratuitas',
    `- [Calculadora de valor da hora](${site.url}/ferramentas/calculadora-valor-hora/)`,
    `- [Calculadora de margem de lucro de serviço](${site.url}/ferramentas/calculadora-de-margem/)`,
    `- [Gerador de mensagem de cobrança](${site.url}/ferramentas/mensagem-de-cobranca/)`,
    `- [Gerador de recibo](${site.url}/ferramentas/gerador-de-recibo/)`,
    `- [Modelo de ordem de serviço](${site.url}/ferramentas/modelo-ordem-de-servico/)`,
    '',
    '## Privacidade',
    `- [Política de privacidade do site](${site.url}/privacidade/)`,
    `- [Política de cookies](${site.url}/cookies/)`,
    '- Política de privacidade do aplicativo: https://app.minhaos.app/privacidade',
  ]
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
