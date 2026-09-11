# Plano de Redesign — Portfólio Premium

## Tokens de tema (CSS vars, `next-themes` classe no `<html>`)
| Token | Claro | Escuro | Contraste (par principal) |
|---|---|---|---|
| `--background` | `#FBF8F2` | `#0E0C09` | — |
| `--foreground` | `#2A2620` | `#F2EAD9` | bg/fg claro 14.2:1 · escuro 16.3:1 |
| `--accent-text` (labels/links, texto pequeno) | `#8C6635` | `#D4AF7A` | vs bg 4.9:1 · 9.5:1 (AA) |
| `--accent-solid` (fundo de CTA) | `#B0824A` (ambos) | | texto escuro sobre CTA 5.7:1 |
| `--border` (linha 1px) | `foreground` 12% opacidade | idem | decorativo, sem texto |
`bronze` puro (#B0824A) só falha AA em texto pequeno sobre `--background` claro — por
isso vira `--accent-text` derivado (bronze-dark/bronze-light) só para texto; o bronze
puro fica reservado a CTA e detalhes gráficos grandes.

## Seções (layout · componente · posição do CTA)
| # | Seção | Layout/componente | CTA |
|---|---|---|---|
| — | Navbar | `floating-navbar`, fixa, esconde ao rolar pra baixo | "Agendar" |
| 1 | Hero | `parallax-hero-images` (camadas com o ícone da marca, sem foto real) + `text-generate-effect` no headline | hero |
| 2 | Sobre | 2 colunas assimétricas, `text-generate-effect` no manifesto, sem bloco de cor | — |
| 3 | Tratamentos | `focus-cards`, grid editorial (proporções 4:5/3:2/16:9) | — |
| 4 | Diferenciais | `sticky-scroll-reveal` (texto fixo + painel muda) | — |
| 5 | **CTA meio de página (novo)** | faixa inline, título curto | meio |
| 6 | Profissional | card único, só tokens (placeholder TODO mantido) | — |
| 7 | Estrutura/Galeria | `layout-grid` (placeholders clicáveis, TODO mantido) | — |
| 8 | Como funciona | `timeline` (opcional) no lugar dos círculos numerados | — |
| 9 | Depoimentos | `animated-testimonials` (placeholder TODO mantido) | — |
| 10 | FAQ | mantém accordion atual (já acessível), só tokens | — |
| 11 | CTA final | headline com `container-text-flip` (opcional) | final |
| 12 | Contato | formulário atual + `stateful-button` (opcional) no submit | — |
| 13 | Footer | só tokens | — |
| global | WhatsApp flutuante | mantido | sempre visível |

Todas as seções perdem fundo colorido próprio: uma cor de fundo só, separação por
espaço (96/160px) + linha 1px + rótulo "0N — Nome".

## Componentes opcionais propostos (aprovar)
- `timeline`: Como Funciona já é uma sequência de etapas — ganho nativo de destaque por
  scroll sem reinventar o componente atual.
- `container-text-flip`: reforça a tagline "Beleza · Ciência · Harmonia" no CTA final
  com movimento sutil, sem competir com o botão.
- `stateful-button`: feedback de carregando/sucesso no envio do formulário e nos CTAs,
  sem `alert()`.
- `noise-background` (opacidade 4%): textura sutil no fundo único, reforça o acabamento
  premium sem competir com conteúdo.
- `animated-modal`: abre detalhe de cada tratamento (Focus Cards) sem sair da página.

**Declinados** (redundantes com os acima): resizable-navbar, images-slider,
direction-aware-hover, parallax-scroll, apple-cards-carousel, expandable-card.
**Restrito**: `compare` — não será usado (sem fotos de antes/depois aprovadas).

## Instalação
`components.json` não existe → `npx shadcn@latest init` primeiro, com checagem de
`git diff --stat` e restauração de `globals.css`/tokens se o CLI alterá-los sem pedir.
