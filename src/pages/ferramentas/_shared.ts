/**
 * Funções puras usadas pelas ferramentas (rodam só no navegador do visitante).
 * Arquivo com prefixo "_" não vira rota no Astro.
 * Valores monetários e quantidades são tratados como inteiros (centavos / casas fixas) com BigInt,
 * para não haver erro de ponto flutuante. Arredondamento: meio para cima.
 */

/**
 * Converte um texto digitado em pt-BR ("1.234,56", "1234.5", "R$ 10") em um inteiro escalado
 * por 10^decimals. Retorna null se o texto não for um número válido não negativo
 * ou tiver mais casas decimais que o permitido.
 */
export function parseScaled(raw: string, decimals: number): bigint | null {
  let s = raw.replace(/\s|R\$/g, '')
  if (s === '') return null
  if (s.includes(',')) {
    // padrão brasileiro: ponto é separador de milhar, vírgula é decimal
    if (!/^\d{1,3}(\.\d{3})*(,\d*)?$|^\d+(,\d*)?$/.test(s)) return null
    s = s.replace(/\./g, '').replace(',', '.')
  } else if (/^\d{1,3}(\.\d{3})+$/.test(s)) {
    // "1.500" ou "1.000.000" = milhar
    s = s.replace(/\./g, '')
  }
  if (!/^\d+(\.\d*)?$/.test(s)) return null
  const [int, frac = ''] = s.split('.')
  if (frac.length > decimals) return null
  return BigInt(int) * 10n ** BigInt(decimals) + BigInt((frac + '0'.repeat(decimals)).slice(0, decimals) || '0')
}

/** Divisão inteira com arredondamento meio para cima (a, b ≥ 0, b > 0). */
export function divRound(a: bigint, b: bigint): bigint {
  return (2n * a + b) / (2n * b)
}

/** Formata centavos como "R$ 1.234,56". */
export function brl(cents: bigint): string {
  const neg = cents < 0n
  const abs = neg ? -cents : cents
  const int = (abs / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const frac = (abs % 100n).toString().padStart(2, '0')
  return `${neg ? '-' : ''}R$ ${int},${frac}`
}

/** Formata um inteiro escalado (ex.: horas × 100) com até `max` casas, em pt-BR. */
export function decimalBR(scaled: bigint, scale: number, max = 2): string {
  const factor = 10n ** BigInt(scale)
  const rounded = divRound(scaled * 10n ** BigInt(max), factor)
  const p = 10n ** BigInt(max)
  const int = (rounded / p).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const frac = (rounded % p).toString().padStart(max, '0').replace(/0+$/, '')
  return frac ? `${int},${frac}` : int
}

/** Total de uma linha: quantidade (até 4 casas) × valor unitário em centavos, arredondado ao centavo. */
export function lineTotal(qty4: bigint, unitCents: bigint): bigint {
  return divRound(qty4 * unitCents, 10000n)
}

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

/** "2026-10-14" → "14/10/2026" (sem passar por fuso horário). */
export function dateBR(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  return m ? `${m[3]}/${m[2]}/${m[1]}` : ''
}

/** "2026-10-14" → "14 de outubro de 2026". */
export function dateLongBR(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return ''
  return `${Number(m[3])} de ${MESES[Number(m[2]) - 1]} de ${m[1]}`
}

/** Data local de hoje em "YYYY-MM-DD". */
export function todayISO(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const UNIDADES = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove']
const DEZENAS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
const CENTENAS = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']

/** Escreve 1–999 por extenso. */
function ate999(n: number): string {
  if (n === 100) return 'cem'
  const c = Math.floor(n / 100)
  const r = n % 100
  const parts: string[] = []
  if (c) parts.push(CENTENAS[c])
  if (r) {
    if (r < 20) parts.push(UNIDADES[r])
    else {
      const d = Math.floor(r / 10)
      const u = r % 10
      parts.push(u ? `${DEZENAS[d]} e ${UNIDADES[u]}` : DEZENAS[d])
    }
  }
  return parts.join(' e ')
}

/** Inteiro de 0 a 999.999.999 por extenso (0 → ""). */
function inteiroPorExtenso(n: number): string {
  const grupos = [
    { valor: Math.floor(n / 1_000_000), nome: (v: number) => (v === 1 ? 'um milhão' : `${ate999(v)} milhões`) },
    { valor: Math.floor(n / 1000) % 1000, nome: (v: number) => (v === 1 ? 'mil' : `${ate999(v)} mil`) },
    { valor: n % 1000, nome: (v: number) => ate999(v) },
  ].filter((g) => g.valor > 0)
  return grupos
    .map((g, i) => {
      const texto = g.nome(g.valor)
      if (i === 0) return texto
      // "e" antes do último grupo quando ele é menor que 100 ou centena redonda (mil e um, mil e cem)
      const ultimo = i === grupos.length - 1
      return ultimo && (g.valor < 100 || g.valor % 100 === 0) ? `e ${texto}` : texto
    })
    .join(' ')
}

/** Valor em centavos (0 a 99.999.999.999) por extenso em reais, padrão pt-BR. */
export function valorPorExtenso(cents: bigint): string {
  if (cents < 0n || cents > 99_999_999_999n) return ''
  const reais = Number(cents / 100n)
  const cent = Number(cents % 100n)
  if (reais === 0 && cent === 0) return 'zero real'
  const partes: string[] = []
  if (reais > 0) {
    const ext = inteiroPorExtenso(reais)
    const milhaoRedondo = reais % 1_000_000 === 0
    const moeda = reais === 1 ? 'real' : milhaoRedondo ? 'de reais' : 'reais'
    partes.push(`${ext} ${moeda}`)
  }
  if (cent > 0) partes.push(`${ate999(cent)} ${cent === 1 ? 'centavo' : 'centavos'}`)
  return partes.join(' e ')
}

/** Copia texto para a área de transferência; se a API não estiver disponível, seleciona o campo e usa execCommand. */
export async function copyText(text: string, fallbackField?: HTMLTextAreaElement | HTMLInputElement): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* segue para o plano B */
  }
  if (fallbackField) {
    fallbackField.focus()
    fallbackField.select()
    try {
      return document.execCommand('copy')
    } catch {
      return false
    }
  }
  return false
}
