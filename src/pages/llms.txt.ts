import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { site } from '../site.config'

/** Resumo para assistentes de IA (llms.txt): o que o produto faz e não faz, e onde está o conteúdo. */
export const GET: APIRoute = async () => {
  const guias = await getCollection('guias')
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    'O MinhaOS App é um aplicativo web (instalável no celular como PWA) para prestadores de serviço autônomos e pequenas empresas: registro de serviços com datas, quantidades e valores; fechamento mensal por cliente; demonstrativo de cobrança com link público, registro de acessos e confirmação de recebimento pelo cliente; anexo de notas fiscais emitidas fora do sistema; registro manual de recebimentos e saldos; relatórios e exportação CSV.',
    'Não emite nota fiscal, não processa pagamentos e não é banco.',
    '',
    '## Guias',
    ...guias.map((g) => `- [${g.data.h1}](${site.url}/guias/${g.id}/): ${g.data.description}`),
    '',
    '## Ferramentas gratuitas',
    `- [Calculadora de valor da hora](${site.url}/ferramentas/calculadora-valor-hora/)`,
    `- [Gerador de mensagem de cobrança](${site.url}/ferramentas/mensagem-de-cobranca/)`,
    `- [Gerador de recibo](${site.url}/ferramentas/gerador-de-recibo/)`,
    `- [Modelo de ordem de serviço](${site.url}/ferramentas/modelo-ordem-de-servico/)`,
  ]
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
