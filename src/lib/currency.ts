/**
 * Moeda de cobrança do aplicativo. Regra igual à do app (minha-os/src/lib/currency.ts):
 * navegador em português → reais (Asaas); qualquer outro idioma → dólar (Stripe). Sem seletor manual;
 * a moeda é definida no cadastro e fica fixa na conta.
 *
 * Este módulo não importa nada (vai no script do cliente que troca os preços do site).
 */
export type Currency = 'BRL' | 'USD'

export const defaultCurrency: Currency = 'BRL'

/** `pt`, `pt-BR`, `pt-PT`… → BRL; vazio ou outro idioma → USD. */
export const currencyForLanguage = (language: string | null | undefined): Currency =>
  /^pt(?![a-z])/i.test((language ?? '').trim()) ? 'BRL' : 'USD'

/**
 * Formata no padrão pt-BR do site: "R$ 59" / "R$ 566,40" e "US$ 59" / "US$ 566,40"
 * (separador de milhar ".", decimal "," e espaço inseparável após o símbolo).
 */
export const money = (value: number, currency: Currency = defaultCurrency, cents = true) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  })
