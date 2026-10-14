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
- `src/lib/seo.ts` — JSON-LD (Organization, WebSite, SoftwareApplication, Article, FAQPage, BreadcrumbList).
- Sitemap, RSS (`/rss.xml`), `robots.txt` e `llms.txt` são gerados no build.

## Regras de conteúdo

- Falar só do que o produto faz de verdade (não emite nota fiscal, não processa pagamento).
- Regras fiscais/legais sempre com fonte oficial em `sources` e data de verificação no texto.
- Exemplos com dados fictícios e contas que fecham.

## Deploy

Vercel (`vercel.json`): framework Astro, saída `dist/`, domínio `minhaos.app`. Ao trocar a URL do app, ajuste `appUrl` em `src/site.config.ts`.
