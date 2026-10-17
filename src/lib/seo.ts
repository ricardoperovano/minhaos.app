import { site } from '../site.config'
import { highestMonthly, plans } from './plans'

export const abs = (path: string) => new URL(path, site.url).toString()

export interface Crumb {
  name: string
  href: string
}

export function breadcrumbLd(items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href) })),
  }
}

export function faqLd(faq: Array<{ q: string; a: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

export const organizationLd = {
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: abs('/brand/symbol.svg'),
  email: site.contactEmail,
}

export const websiteLd = {
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: 'pt-BR',
  publisher: { '@id': `${site.url}/#organization` },
}

/** Descreve o produto; os preços vêm de src/lib/plans.ts (sem notas ou avaliações inventadas). */
export const softwareLd = {
  '@type': 'SoftwareApplication',
  '@id': `${site.url}/#software`,
  name: site.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Android, iOS (PWA)',
  url: site.url,
  inLanguage: 'pt-BR',
  description: site.description,
  publisher: { '@id': `${site.url}/#organization` },
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '0.00',
    highPrice: highestMonthly.toFixed(2),
    priceCurrency: 'BRL',
    offerCount: plans.length,
    url: `${site.url}/planos/`,
  },
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

/** Tempo de leitura (≈ 200 palavras/min em português). */
export function readingMinutes(text: string) {
  const words = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
