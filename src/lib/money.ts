/** Cálculo em centavos inteiros (sem erro de ponto flutuante) e formatação em BRL. */
export function toCents(value: string): number {
  const [i = '0', f = ''] = value.replace(',', '.').split('.')
  return Number(i) * 100 + Number((f + '00').slice(0, 2))
}
export function lineCents(qty: string, unit: string): number {
  // quantidade com até 4 casas × valor em centavos, arredondamento meio para cima
  const [qi = '0', qf = ''] = qty.replace(',', '.').split('.')
  const q4 = Number(qi) * 10000 + Number((qf + '0000').slice(0, 4))
  return Math.round((q4 * toCents(unit)) / 10000)
}
export const brl = (cents: number) =>
  (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/ /g, ' ')
