import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const faq = z.array(z.object({ q: z.string().min(10), a: z.string().min(20) })).default([])
const source = z.object({ title: z.string(), url: z.url() })

/**
 * Guias (artigos). Limites de SEO validados no build:
 * - `title` (tag <title>, sem o sufixo da marca) até 60 caracteres;
 * - `description` (meta description) entre 110 e 160 caracteres.
 */
const guias = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guias' }),
  schema: z.object({
    title: z.string().max(60),
    h1: z.string().max(90),
    description: z.string().min(110).max(160),
    cluster: z.enum(['ordem-de-servico', 'cobranca', 'precificacao', 'documentos', 'gestao', 'financeiro', 'estoque-e-patrimonio']),
    /** Termo principal buscado e variações (orientam o texto; não viram meta keywords). */
    keyword: z.string(),
    keywords: z.array(z.string()).default([]),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    /** Guia-pilar do cluster (destacado e mais longo). */
    pillar: z.boolean().default(false),
    faq,
    /** Slugs de guias relacionados (links internos). */
    related: z.array(z.string()).default([]),
    /** Fontes oficiais citadas (obrigatório em temas fiscais/legais). */
    sources: z.array(source).default([]),
    tool: z.enum(['calculadora-valor-hora', 'mensagem-de-cobranca', 'gerador-de-recibo', 'modelo-ordem-de-servico', 'calculadora-de-margem']).optional(),
  }),
})

/** Páginas por profissão/segmento: /para/<slug>/ */
const profissoes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/profissoes' }),
  schema: z.object({
    title: z.string().max(60),
    h1: z.string().max(90),
    profissao: z.string(),
    plural: z.string(),
    description: z.string().min(110).max(160),
    keyword: z.string(),
    updatedAt: z.coerce.date(),
    unidades: z.array(z.string()).min(1),
    exemplo: z.object({
      cliente: z.string(),
      itens: z.array(z.object({ data: z.string(), descricao: z.string(), quantidade: z.string(), unidade: z.string(), valorUnitario: z.string() })).min(2),
    }),
    faq,
    related: z.array(z.string()).default([]),
  }),
})

export const collections = { guias, profissoes }
