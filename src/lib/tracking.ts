/**
 * Carregamento condicional de análise/marketing e eventos do site (roda só no navegador).
 * Nada é carregado sem consentimento; eventos só saem com consentimento de ANÁLISE e nunca levam
 * dados pessoais nem o que foi digitado nas ferramentas.
 * - gtmId vazio: GA4 direto (gtag) → gtag('event', nome, {...params, send_to: gaId}).
 * - gtmId preenchido: carrega o GTM (o GA4 é configurado dentro dele) → dataLayer.push({event: nome, ...params}).
 * Marketing (Meta Pixel, Google Ads) só com consentimento de marketing e ID configurado.
 */
import { site, tracking } from '../site.config'
import type { Consent } from './consent'

type Params = Record<string, string | number | undefined>
type Fn = (...args: unknown[]) => void
interface W {
  dataLayer?: unknown[]
  gtag?: Fn
  fbq?: Fn & { callMethod?: Fn; queue?: unknown[]; push?: Fn; loaded?: boolean; version?: string }
  _fbq?: unknown
}
const w = window as unknown as W

let analyticsOn = false
let marketingOn = false
let gtagScript = false

function loadScript(src: string) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function gtag(..._args: unknown[]) {
  w.dataLayer = w.dataLayer || []
  // gtag.js exige o objeto `arguments`, não um array.
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments)
}

function consentState(c: Consent) {
  const ads = c.marketing ? 'granted' : 'denied'
  return { analytics_storage: c.analytics ? 'granted' : 'denied', ad_storage: ads, ad_user_data: ads, ad_personalization: ads }
}

let consentDefaultSent = false
function syncGoogleConsent(c: Consent) {
  w.gtag = w.gtag || gtag
  if (!consentDefaultSent) {
    gtag('consent', 'default', consentState(c))
    consentDefaultSent = true
  } else {
    gtag('consent', 'update', consentState(c))
  }
  gtag('set', 'ads_data_redaction', !c.marketing)
}

function ensureGtag(id: string) {
  if (gtagScript) return
  gtagScript = true
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`)
  gtag('js', new Date())
}

function loadAnalytics() {
  if (tracking.gtmId) {
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tracking.gtmId)}`)
  } else if (tracking.gaId) {
    ensureGtag(tracking.gaId)
    gtag('config', tracking.gaId)
  } else {
    return false
  }
  return true
}

function loadMarketing() {
  if (tracking.googleAdsId) {
    ensureGtag(tracking.googleAdsId)
    gtag('config', tracking.googleAdsId)
  }
  if (tracking.metaPixelId) {
    if (!w.fbq) {
      const n = function (...args: unknown[]) {
        if (n.callMethod) n.callMethod.apply(n, args)
        else n.queue!.push(args)
      } as NonNullable<W['fbq']>
      w.fbq = n
      if (!w._fbq) w._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      loadScript('https://connect.facebook.net/en_US/fbevents.js')
    }
    w.fbq('init', tracking.metaPixelId)
    w.fbq('track', 'PageView')
    if (isPlansPage()) w.fbq('track', 'ViewContent', { content_name: 'planos' })
  }
}

const isPlansPage = () => location.pathname === '/planos/'

/** Aplica a escolha atual: carrega o que foi permitido e ainda não estava carregado. */
export function applyConsent(c: Consent) {
  const needsGoogle = (c.analytics && (tracking.gtmId || tracking.gaId)) || (c.marketing && tracking.googleAdsId)
  if (needsGoogle || consentDefaultSent) syncGoogleConsent(c)
  if (c.analytics && !analyticsOn) {
    analyticsOn = loadAnalytics()
    if (analyticsOn) onAnalyticsReady()
  }
  if (c.marketing && !marketingOn) {
    marketingOn = true
    loadMarketing()
  }
}

/** Envia um evento de análise (descartado sem consentimento). */
export function track(event: string, params: Params = {}): boolean {
  if (!analyticsOn) return false
  const clean: Record<string, string | number> = {}
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== '') clean[k] = v
  if (tracking.gtmId) {
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ event, ...clean })
  } else {
    gtag('event', event, { ...clean, send_to: tracking.gaId })
  }
  return true
}

function onAnalyticsReady() {
  if (isPlansPage()) track('view_plans')
}

/* ---------- Origem da visita (utm_*) repassada ao aplicativo ---------- */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
const UTM_STORE = 'minhaos_utm'

function storeUtm() {
  try {
    if (sessionStorage.getItem(UTM_STORE)) return
    const q = new URLSearchParams(location.search)
    const utm: Record<string, string> = {}
    for (const k of UTM_KEYS) {
      const v = q.get(k)
      if (v) utm[k] = v.slice(0, 100)
    }
    if (Object.keys(utm).length) sessionStorage.setItem(UTM_STORE, JSON.stringify(utm))
  } catch {
    /* sessionStorage indisponível: segue sem utm */
  }
}

function readUtm(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(UTM_STORE)
    const v: unknown = raw ? JSON.parse(raw) : null
    return v && typeof v === 'object' ? (v as Record<string, string>) : {}
  } catch {
    return {}
  }
}

/* ---------- Eventos por delegação ---------- */

const appHost = new URL(site.appUrl).hostname

function locationOf(el: Element): string {
  const tagged = el.closest<HTMLElement>('[data-track-location]')
  if (tagged?.dataset.trackLocation) return tagged.dataset.trackLocation
  if (el.closest('.site-header')) return 'header'
  if (el.closest('.site-footer')) return 'footer'
  if (el.closest('#planos')) return 'planos'
  if (el.closest('.cta')) return 'cta'
  if (el.closest('.hero')) return 'hero'
  return 'conteudo'
}

function parseHref(a: HTMLAnchorElement): URL | null {
  try {
    return new URL(a.href, location.href)
  } catch {
    return null
  }
}

function addUtm(a: HTMLAnchorElement) {
  const url = parseHref(a)
  if (!url || url.hostname !== appHost) return
  const utm = readUtm()
  let changed = false
  for (const [k, v] of Object.entries(utm)) {
    if (UTM_KEYS.includes(k) && typeof v === 'string' && !url.searchParams.has(k)) {
      url.searchParams.set(k, v)
      changed = true
    }
  }
  if (changed) a.href = url.toString()
}

const isSignup = (url: URL) => url.hostname === appHost && url.pathname.replace(/\/+$/, '') === '/cadastro'

function onClick(e: MouseEvent) {
  const target = e.target as Element | null
  const el = target?.closest?.<HTMLElement>('a[href], button, [data-track-event]')
  if (!el) return

  if (el instanceof HTMLAnchorElement) addUtm(el)

  // Ações declaradas no HTML (ex.: ferramentas): data-track-event + data-track-*
  const declared = el.closest<HTMLElement>('[data-track-event]')
  if (declared) {
    const { trackEvent, ...rest } = declared.dataset
    const params: Params = {}
    for (const [k, v] of Object.entries(rest)) {
      if (k.startsWith('track') && k !== 'trackLocation' && v) params[k.slice(5, 6).toLowerCase() + k.slice(6)] = v
    }
    if (trackEvent) track(trackEvent, params)
    return
  }

  if (!(el instanceof HTMLAnchorElement)) return
  const href = el.getAttribute('href') ?? ''
  if (href.startsWith('mailto:')) {
    track('contact_click', { location: locationOf(el) })
    return
  }
  const url = parseHref(el)
  if (!url) return
  const location_ = locationOf(el)

  if (isSignup(url)) {
    const plan = url.searchParams.get('plano') ?? undefined
    track('signup_click', { location: location_, plan })
    if (plan && el.closest('#planos')) {
      const planos = document.getElementById('planos')?.dataset
      track('select_plan', { plan, billing: planos?.billing, currency: planos?.currency })
    }
    return
  }

  if (el.closest('#cc')) return
  if (el.classList.contains('btn') || el.hasAttribute('data-cta')) {
    // Só o caminho (internos) ou o domínio (externos): nunca parâmetros de URL.
    const tgt = url.origin === window.location.origin ? url.pathname : url.hostname
    track('cta_click', { location: location_, target: tgt })
  }
}

function onAuxClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.('a[href]')
  if (a instanceof HTMLAnchorElement) addUtm(a)
}

function watchBillingToggle() {
  document.querySelectorAll<HTMLInputElement>('input[name="billing"]').forEach((r) =>
    r.addEventListener('change', () => {
      if (r.checked) track('billing_toggle', { billing: r.value })
    }),
  )
}

function watchGuideRead() {
  const el = document.querySelector<HTMLElement>('[data-guide]')
  if (!el) return
  let ticking = false
  const check = () => {
    ticking = false
    const r = el.getBoundingClientRect()
    if (r.height <= 0) return
    const seen = (window.innerHeight - r.top) / r.height
    if (seen >= 0.75 && track('guide_read', { guide: el.dataset.guide, cluster: el.dataset.cluster })) {
      window.removeEventListener('scroll', onScroll)
    }
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(check)
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
}

/** Eventos disparados por scripts das páginas: window.dispatchEvent(new CustomEvent('minhaos:track', {detail: {event, params}})). */
function onPageEvent(e: Event) {
  const d = (e as CustomEvent<{ event?: string; params?: Params }>).detail
  if (d?.event) track(d.event, d.params ?? {})
}

let started = false
export function startTracking() {
  if (started) return
  started = true
  storeUtm()
  document.addEventListener('click', onClick)
  document.addEventListener('auxclick', onAuxClick)
  window.addEventListener('minhaos:track', onPageEvent)
  watchBillingToggle()
  watchGuideRead()
}
