import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { site } from '../site.config'
import { currencies, featureText, paidPlans, plans, priceIn } from '../lib/plans'

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
    'Usuários e permissões: a partir do plano Profissional (até 5 usuários; Negócios até 10, contando convites pendentes; Grátis e Essencial têm 1), o administrador convida pessoas por e-mail (link válido por 7 dias, uso único) com um de três papéis: administrador (tudo, inclusive usuários, plano e configurações), operador (clientes e registro de serviços e lançamentos, com valores; estoque e patrimônio sem custos nem valores de compra; não vê faturamento, recebimentos, financeiro, relatórios, plano nem configurações) e financeiro (clientes, consulta de serviços, faturamento, demonstrativos, links, recebimentos, financeiro, relatórios e CSV; não gerencia usuários, plano nem configurações, exceto categorias financeiras). Uma pessoa pode participar de várias contas e trocar de conta no menu. Ao rebaixar o plano, membros acima do limite ficam suspensos, sem nada ser apagado. Detalhes: ' + site.url + '/funcionalidades/usuarios-e-permissoes/',
    'Estoque e patrimônio (todos os planos, com limite: itens de estoque ativos 20/100/500/2.000 e bens não baixados 10/50/200/1.000 em Grátis/Essencial/Profissional/Negócios): itens de material com unidade (unidade, metro, m², m³, kg, litro, caixa, pacote, rolo, saco), estoque mínimo, custo de referência, valor de venda e custo médio móvel; entrada (com opção de lançar conta a pagar), saída, ajuste de inventário, estorno e extrato; ao escolher o material na linha do serviço e salvar, a saída é registrada automaticamente pela diferença (cancelar o serviço devolve o material) e a linha é cobrada pelo valor de venda; saldo pode ficar negativo, com destaque e aviso de reposição no painel; o custo médio do material usado entra na margem do serviço. Patrimônio: bens com código automático e editável (PAT-0001), situação (em uso, manutenção, emprestado, baixado com data e motivo), responsável, local, garantia, histórico, nota fiscal anexada nos planos pagos e etiquetas com QR code (folha A4 com 24 ou individual 50×30 mm) que abrem a ficha só para quem está logado na conta. O operador movimenta estoque e patrimônio sem ver custos e valores de compra. Detalhes: ' + site.url + '/funcionalidades/controle-de-estoque/ e ' + site.url + '/funcionalidades/controle-de-patrimonio/',
    'Não emite nota fiscal, não processa pagamentos nem gera boleto ou Pix, não é banco, não faz conciliação bancária automática, não calcula impostos, não faz inventário fiscal (Bloco K/SPED) nem depreciação contábil, e não controla lote, validade ou vários depósitos.',
    '',
    '## Planos',
    'Quatro planos, todos com limites (clientes ativos, demonstrativos por mês, lançamentos financeiros por mês, itens de estoque, bens do patrimônio, armazenamento e usuários).',
    ...plans.map((p) => `- ${p.name} (${p.monthly === 0 ? priceIn(p, 'BRL') : `${priceIn(p, 'BRL')}/mês; anual com 20% de desconto`}): ${p.tagline}. ${p.features.map(featureText).join('; ')}.`),
    `- Moeda: quem usa o navegador em português vê e paga em reais pelo ${currencies.BRL.provider}; nos demais idiomas, em dólar pelo ${currencies.USD.provider}, com os mesmos números (${paidPlans.map((p) => priceIn(p, 'USD')).join(', ')} por mês; anual com 20% de desconto). A moeda é definida no cadastro pelo idioma do navegador e fica fixa na conta, sem seletor.`,
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
