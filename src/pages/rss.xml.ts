import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { site } from '../site.config'

export const GET: APIRoute = async (context) => {
  const guias = (await getCollection('guias')).sort((a, b) => +b.data.publishedAt - +a.data.publishedAt)
  return rss({
    title: `Guias do ${site.name}`,
    description: 'Guias para prestadores de serviço: ordem de serviço, cobrança, orçamento, recibos e organização financeira.',
    site: context.site!,
    customData: '<language>pt-BR</language>',
    items: guias.map((g) => ({ title: g.data.h1, description: g.data.description, pubDate: g.data.publishedAt, link: `/guias/${g.id}/` })),
  })
}
