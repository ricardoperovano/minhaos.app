// Gera public/og/default.png (1200×630) a partir da marca vetorial.
import { readFileSync } from 'node:fs'
import sharp from 'sharp'
const logo = readFileSync('public/brand/logo-horizontal-white.svg', 'utf8')
const inner = logo.replace(/^[\s\S]*?<title>.*?<\/title>/, '').replace(/<\/svg>\s*$/, '')
const vb = logo.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number)
const s = 560 / vb[2]
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0F172A"/>
<g transform="translate(96 150) scale(${s}) translate(${-vb[0]} ${-vb[1]})">${inner}</g>
<path d="M1110 330 H760 A30 30 0 0 0 760 390 H1110 A30 30 0 0 1 1110 450 H760 A30 30 0 0 0 760 510 H930" fill="none" stroke="#1E2A44" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="958" y="490" width="40" height="40" rx="10" fill="#2DD4BF"/>
<text x="96" y="380" font-family="Inter, sans-serif" font-size="40" font-weight="600" fill="#FFFFFF">Serviços registrados, cobrança clara.</text>
<text x="96" y="432" font-family="Inter, sans-serif" font-size="27" fill="#CBD5E1">Fechamento do mês e demonstrativo com link para o cliente.</text>
</svg>`
await sharp(Buffer.from(svg)).png().toFile('public/og/default.png')
console.log('og ok')
