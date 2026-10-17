# minhaos-site

Site público e de conteúdo (SEO) do MinhaOS App — `https://minhaos.app`. O aplicativo fica em `app.minhaos.app` (repositório `minha-os`).

Astro 7, saída 100% estática, sem JavaScript de framework no cliente (só scripts pequenos das ferramentas grátis).

## Comandos

- `npm run dev` — servidor local (porta 4321)
- `npm run build` — `astro check` + build em `dist/` (falha se título > 60 ou descrição fora de 110–160 caracteres)
- `npm run preview` — serve o `dist/`
- `node scripts-og.mjs` — regenera `public/og/default.png`

## Estrutura

- `src/content/guias/*.md` — guias (coleção `guias`, schema em `src/content.config.ts`), agrupados por tema (`cluster`); um guia-pilar por tema.
- `src/content/profissoes/*.md` — páginas `/para/<profissão>/` com exemplo de demonstrativo calculado.
- `src/pages/ferramentas/` — ferramentas grátis que rodam no navegador.
- `src/pages/funcionalidades/` + `src/lib/features.ts` — páginas do produto.
- `src/lib/plans.ts` — planos, preços e moedas (`currencies`: reais pelo Asaas e dólar pelo Stripe, mesmos números). O HTML traz os dois valores (`src/components/Money.astro`) e `src/components/CurrencySwitch.astro` troca `data-currency` para `USD` quando `navigator.language` não começa com `pt` (regra em `src/lib/currency.ts`); sem JS, fica em reais.
- `src/lib/seo.ts` — JSON-LD (Organization, WebSite, SoftwareApplication com um AggregateOffer por moeda, Article, FAQPage, BreadcrumbList).
- Sitemap, RSS (`/rss.xml`), `robots.txt` e `llms.txt` são gerados no build.

## Regras de conteúdo

- Falar só do que o produto faz de verdade (não emite nota fiscal, não processa pagamento).
- Regras fiscais/legais sempre com fonte oficial em `sources` e data de verificação no texto.
- Exemplos com dados fictícios e contas que fecham.

## Consentimento de cookies (LGPD) e rastreamento

- Banner/painel em `src/components/CookieConsent.astro`; regras do cookie em `src/lib/consent.ts`; carregamento e eventos em `src/lib/tracking.ts`.
- Cookie `minhaos_consent` = `v=1&analytics=0|1&marketing=0|1&ts=<epoch s>` (180 dias, `Domain=.minhaos.app`, SameSite=Lax, Secure em https) — **mesmo formato do aplicativo**; a escolha feita no site vale no app e vice-versa. Sem cookie válido, o banner aparece e nada de análise/marketing é carregado.
- Ao salvar, o site dispara `window` `minhaos:consent` (`detail` = `{analytics, marketing, ts}`) e carrega o que foi permitido. Revogar algo antes aceito apaga os cookies daquela categoria (`_ga*`, `_fbp`, `_fbc`, `_gcl_*`) e recarrega a página.
- Qualquer elemento com `data-cc-open` reabre o painel (rodapé e `/cookies/`).
- Categorias: necessários (sempre) · análise = Google Analytics 4 ou Google Tag Manager · marketing = Google Ads e Meta Pixel. O chat Monitchat é funcional (iniciado pela pessoa) e carrega sempre; o balão some enquanto o banner está aberto, para não cobrir os botões.
- IDs em `tracking` (`src/site.config.ts`); vazio = não carrega:
  - `gaId` (G-…): GA4 direto via gtag, com consent mode (`analytics_storage`/`ad_*` conforme a escolha).
  - `gtmId` (GTM-…): se preenchido, carrega o GTM **no lugar** do GA4 direto (configure a tag do GA4 dentro do GTM, senão não há medição; nunca os dois, para não contar em dobro). Os eventos vão para `dataLayer` no formato dos gatilhos "Evento personalizado". Tags de anúncio dentro do GTM devem exigir `ad_storage` nas "Configurações de consentimento".
  - `metaPixelId` / `googleAdsId` (AW-…): só com consentimento de marketing. Meta recebe `PageView` e, em `/planos/`, `ViewContent`.
- `utm_*` da URL de entrada ficam no `sessionStorage` (`minhaos_utm`) e são acrescentados aos links para `app.minhaos.app` no clique.
- Ao adicionar uma ferramenta de terceiros, atualize `/cookies/` e `/privacidade/`.

### Eventos de análise

Só saem com consentimento de análise. GA4 direto: `gtag('event', nome, params)`; com GTM: `dataLayer.push({event: nome, ...params})`. Nunca levam dados pessoais nem valores digitados.

| Evento | Quando dispara | Parâmetros |
| --- | --- | --- |
| `page_view` | Automático do GA4 ao carregar (ou ao aceitar análise) | — |
| `signup_click` | Clique em link para `app.minhaos.app/cadastro` | `location` (`header`, `hero`, `planos`, `cta`, `footer`, `conteudo`), `plan` (se o link tiver `?plano=`) |
| `view_plans` | Abrir `/planos/` (ou aceitar análise estando nela) | — |
| `select_plan` | Clique no botão de um plano em `/planos/` (junto com `signup_click`) | `plan` (`gratis`, `essencial`, `profissional`, `negocios`), `billing` (`monthly`/`annual`), `currency` (`BRL`/`USD`, pelo idioma do navegador) |
| `billing_toggle` | Trocar mensal/anual em `/planos/` | `billing` |
| `tool_use` | Ferramentas grátis | `tool` (`calculadora-valor-hora`, `mensagem-de-cobranca`, `gerador-de-recibo`, `modelo-ordem-de-servico`), `action`: `calculate` (1º resultado válido após editar, 1×/página), `copy`, `whatsapp`, `print`, `print_blank` |
| `contact_click` | Clique em link `mailto:` | `location` |
| `guide_read` | Leitor passa de 75% do corpo de um guia (1×/página) | `guide` (slug), `cluster` |
| `cta_click` | Clique em botão/link de CTA (`.btn` ou `data-cta`) que não leva ao cadastro | `location`, `target` (caminho interno ou só o domínio externo) |

Para declarar um novo evento de clique sem JS: `data-track-event="nome" data-track-<param>="valor"`. De um script: `window.dispatchEvent(new CustomEvent('minhaos:track', {detail: {event, params}}))`.

## Deploy

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`): cada push na `main` roda `npm run build` e publica `dist/`. Domínio `minhaos.app` (`public/CNAME`; DNS apontando para o GitHub Pages). Em Settings → Pages, a fonte deve ser "GitHub Actions". Ao trocar a URL do app, ajuste `appUrl` em `src/site.config.ts`.
