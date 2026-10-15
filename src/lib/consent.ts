/**
 * Consentimento de cookies — mesmo formato usado pelo aplicativo (app.minhaos.app).
 * Cookie `minhaos_consent` = `v=1&analytics=0|1&marketing=0|1&ts=<epoch em segundos>`,
 * válido por 180 dias, compartilhado entre minhaos.app e app.minhaos.app (Domain=.minhaos.app).
 * Cookie ausente ou malformado = a pessoa ainda não decidiu (mostra o banner e não carrega nada).
 */

export const CONSENT_COOKIE = 'minhaos_consent'
export const CONSENT_MAX_AGE = 15552000 // 180 dias
export const CONSENT_EVENT = 'minhaos:consent'

export interface Consent {
  analytics: boolean
  marketing: boolean
  /** Momento da decisão (epoch em segundos). */
  ts: number
}

export function parseConsent(raw: string | null | undefined): Consent | null {
  if (!raw) return null
  const p = new URLSearchParams(raw)
  const v = p.get('v')
  const a = p.get('analytics')
  const m = p.get('marketing')
  const ts = p.get('ts')
  if (v !== '1' || (a !== '0' && a !== '1') || (m !== '0' && m !== '1') || !ts || !/^\d{1,12}$/.test(ts)) return null
  return { analytics: a === '1', marketing: m === '1', ts: Number(ts) }
}

export function serializeConsent(c: Consent): string {
  return `v=1&analytics=${c.analytics ? 1 : 0}&marketing=${c.marketing ? 1 : 0}&ts=${c.ts}`
}

/** `.minhaos.app` em produção (vale para o site e o app); host-only em localhost e outros domínios. */
export function cookieDomain(hostname: string): string | null {
  return hostname === 'minhaos.app' || hostname.endsWith('.minhaos.app') ? '.minhaos.app' : null
}

function readCookie(name: string): string | null {
  for (const part of document.cookie.split(';')) {
    const i = part.indexOf('=')
    if (i < 0) continue
    if (part.slice(0, i).trim() === name) {
      try {
        return decodeURIComponent(part.slice(i + 1).trim())
      } catch {
        return null
      }
    }
  }
  return null
}

export function readConsent(): Consent | null {
  return parseConsent(readCookie(CONSENT_COOKIE))
}

/** Valor gravado sem codificação (só [a-z0-9=&]), igual ao app; a leitura aceita também a forma codificada. */
export function writeConsent(c: Consent) {
  const domain = cookieDomain(location.hostname)
  document.cookie =
    `${CONSENT_COOKIE}=${serializeConsent(c)}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax` +
    (location.protocol === 'https:' ? '; Secure' : '') +
    (domain ? `; Domain=${domain}` : '')
}

/** Apaga (melhor esforço) cookies de terceiros gravados no nosso domínio quando a pessoa revoga a categoria. */
export function deleteCookies(match: (name: string) => boolean) {
  const host = location.hostname
  const domains = new Set<string | null>([null, host, `.${host}`, cookieDomain(host)])
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim()
    if (!name || !match(name)) continue
    for (const d of domains) {
      document.cookie = `${name}=; Path=/; Max-Age=0${d ? `; Domain=${d}` : ''}`
    }
  }
}

export const isAnalyticsCookie = (n: string) => n === '_ga' || n.startsWith('_ga_') || n === '_gid'
export const isMarketingCookie = (n: string) => n === '_fbp' || n === '_fbc' || n.startsWith('_gcl_')
