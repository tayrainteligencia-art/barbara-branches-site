# Progresso do projeto

## Redesign Portfólio (branch `redesign/portfolio`)
Estado: Etapa 2 concluída (todos os componentes obrigatórios + opcionais
aprovados). Próximo: Etapa 3 (auditoria de conversão, lint/build, validação de
marco completa, Lighthouse comparado à linha de base).

### Item 1 — tokens + next-themes + toggle
- Tokens únicos background/foreground/accent-text/accent-solid nos 2 temas, contraste
  AA verificado (ver PLANO_REDESIGN.md)
- Toggle com view-transition circular + fallback instantâneo; validado 375/768/1440,
  claro/escuro, reduced-motion — sem erros de console
- Tokens antigos (cream/ink/bronze/surface-dark) removidos do CSS — seções ainda os
  referenciam até o item 2 (próximo commit corrige)

### Item 2 — fundo único + remoção de cor por seção
- Todas as seções usam só background/foreground/accent-text/accent-solid/border;
  hero deixou de ser bloco escuro fixo e agora segue o tema (validado claro/escuro)
- Divisores: `border-t border-border` + `SectionLabel` ("0N — Nome") + py-24 md:py-40
- `scripts/check.mjs` precisava de mais espera pós-scroll/load (preloader + reveal
  animados) — screenshots antes disso pegavam animação pela metade, não é bug real

### Item 3 — Navbar
- `shadcn init` sobrescreveu lib/utils.ts e globals.css com o preset "Nova" (parei e
  perguntei, conforme regra 3) — revertidos, mantido só components.json
- floating-navbar instalado e adaptado: tokens da marca, PT-BR, logo+toggle no pill,
  reduced-motion (duração 0)
- Migrado framer-motion → motion/react em todas as seções; framer-motion removido

### Item 4 — Hero
- ParallaxHeroImages (ícone da marca, sem fotos) + TextGenerateEffect no subtítulo;
  headline continua em SplitReveal (transform) para proteger o LCP
- staggerDelay do TextGenerateEffect: 0.2s padrão era lento demais (~3s p/ frase de
  14 palavras) — reduzido para 0.04s nesta seção
- 3º bug de reduced-motion (mesma causa raiz): ParallaxImage com initial/animate
  virando `undefined` prendia opacity/scale — corrigido com valores sempre explícitos

### Item 5 — demais seções
- Sobre: TextGenerateEffect ganhou prop `play` (sempre montado, sem CLS; anima só
  quando `useInView`)
- Tratamentos: Focus Cards sem fotos reais — texto sempre visível, foco/hover só
  realça um card e borra os outros; acessível por teclado (tabIndex+onFocus/onBlur)
- Diferenciais: Sticky Scroll Reveal original usava container com overflow interno
  (conflita com Lenis) — reescrito para rastrear o scroll da página; gradientes
  genéricos trocados por token accent-text
- Estrutura: Layout Grid sem fotos reais — placeholders tracejados; virou modal de
  verdade (Esc fecha, foco retorna ao card, botões em vez de divs)
- Depoimentos: Animated Testimonials sem depoimentos/fotos reais — ícone de aspas +
  "a confirmar"; removido @tabler/icons-react (não usado)
- Opcionais: Container Text Flip (CTA final) e Stateful Button (form) corrigidos e
  usados; Timeline e Noise Background (Aceternity) descartados — ver commit
  "componentes opcionais" para o porquê de cada um
- 4º bug de reduced-motion, categoria nova: Container Text Flip tinha `<div>` dentro
  de `<p>` (HTML inválido, herdado do template original) causando hydration error
  em todo carregamento — corrigido trocando a tag raiz para `<div>`

### Diagnóstico
- Versões: next@16.3.5, react@19.2.8, tailwindcss@4.3.3, framer-motion@13.2.0,
  gsap@3.15.0, lenis@1.3.26 — `motion` não instalado ainda (framer-motion legado)
- `components.json` não existe — `npx shadcn@latest init` será necessário
- Lighthouse baseline (build de produção): performance 77, accessibility 96,
  best-practices 100, seo 100 (`.lighthouse/report.json`)
- Componentes Aceternity confirmados no registry (nomes exatos):
  - Uso obrigatório: floating-navbar, parallax-hero-images, focus-cards,
    layout-grid, text-generate-effect, sticky-scroll-reveal, animated-testimonials
  - Opcionais: resizable-navbar, images-slider, direction-aware-hover,
    parallax-scroll, apple-cards-carousel, timeline, container-text-flip,
    animated-modal, stateful-button, noise-background
  - "Expandable Card" = `expandable-card-on-click` (tipo block, não ui)
  - Restrito (pedir aprovação): compare

### Decisões (1 linha cada)
- Dev server parado antes do build de produção do Lighthouse e reiniciado depois,
  para não conflitar na porta 3000.


## Etapa atual
Etapa 3 concluída (todas as 13 seções + SEO/performance). Próximo: Etapa 4
(auditoria de conversão completa).

## Concluído
- Etapa 0: ambiente verificado, projeto Next.js 16 + TS + Tailwind 4 criado,
  dependências (gsap, lenis, framer-motion) instaladas, repositório privado criado
  e sincronizado em https://github.com/tayrainteligencia-art/barbara-branches-site
- Etapa 1: análise da marca concluída (`BRAND_ANALYSIS.md`), pendências reais
  listadas (`PENDENCIAS.md`), assets de logo extraídos e otimizados em
  `public/brand/` (logo-full.png/.webp, icon.png/.webp)
- Etapa 2: plano de seções, copy e direção estética aprovados pelo cliente
- Etapa 3 — infraestrutura: tokens de design (globals.css), fontes Cinzel/
  Montserrat, smooth scroll (Lenis+GSAP ScrollTrigger), hook de reduced motion
  (`useSyncExternalStore`), contexto de preloader, botão de WhatsApp flutuante,
  componente `SplitReveal` reutilizável para reveal de texto por palavra
- Etapa 3 — seção Preloader: reveal do ícone da marca, ≤1,5s, pulado
  instantaneamente com `prefers-reduced-motion`
- Etapa 3 — seção Hero: headline com reveal por palavra, parallax sutil no
  símbolo da marca, CTA magnético, validado em 375/768/1440px, sem erros de
  console, sem scroll horizontal, testado com `prefers-reduced-motion`
  (corrigido bug real: palavras do título ficavam invisíveis por uma race
  condition entre hidratação do React e `useSyncExternalStore`)
- Auditoria de conversão rápida do hero+CTA: sem bloqueios; prova social e
  mensuração de conversão ficam para etapas seguintes (dependem de dados
  reais / decisão sobre ferramenta de analytics)
- Etapa 3 — seção Sobre/Manifesto: layout assimétrico com painel decorativo
  (símbolo da marca, sem foto real)
- Etapa 3 — seção Tratamentos: lista editorial numerada, categorias
  ilustrativas com aviso de que a lista oficial será confirmada
- Etapa 3 — seção Diferenciais: 4 itens qualitativos, sem contadores
  numéricos fabricados (nenhum dado real disponível)
- Etapa 3 — seção Profissional responsável: placeholder visualmente óbvio
  (borda tracejada + texto "TODO") para nome/CRM/bio, dado que são
  informações reguladas que não podem ser inventadas
- Etapa 3 — seção Estrutura/Galeria: grade com revelação por clip-path
  (GSAP ScrollTrigger), placeholders de foto no mesmo padrão visual
- Etapa 3 — seção Como funciona: 4 etapas do atendimento (agendamento →
  avaliação → plano → acompanhamento)
- Lição de processo: screenshots fullPage do Playwright não disparam
  ScrollTrigger/whileInView sozinhos — o script `scripts/visual-check.mjs`
  agora simula scroll real via `page.mouse.wheel` antes de capturar
- Dois bugs reais de acessibilidade corrigidos (mesma causa-raiz): com
  `prefers-reduced-motion`, `useReducedMotion()` retorna `false` no primeiro
  render do cliente (snapshot do servidor) e só corrige para o valor real
  logo em seguida — qualquer efeito que "resolva" a partir de um retorno
  antecipado (`if (reducedMotion) return`) sem redefinir o estado deixa
  elementos presos invisíveis. Corrigido no `SplitReveal` (GSAP) e no hook
  `useFadeUp` (Framer Motion), que agora sempre aplicam um estado explícito
  para os dois casos em vez de omitir props condicionalmente.
- Etapa 3 — seção Depoimentos: placeholder honesto (sem avaliações
  inventadas), com aviso de que depoimentos reais serão publicados após
  autorização dos pacientes
- Etapa 3 — seção FAQ: accordion acessível (CSS grid-template-rows,
  aria-expanded/aria-controls), respostas sem promessa de resultado garantido
- Etapa 3 — CTA final, seção de Contato/Localização (formulário com
  validação + consentimento LGPD, rota `/api/contact` com Resend quando
  configurado e fallback para WhatsApp quando não) e Footer completo
- Etapa 3 — SEO/performance: favicon e apple-icon gerados do símbolo da
  marca, `robots.ts`/`sitemap.ts`, imagem Open Graph dinâmica (1200x630),
  JSON-LD `LocalBusiness` só com campos confirmados (sem endereço/telefone
  inventados)
- Build de produção (`npm run build`) e lint passando sem erros/avisos em
  todo o projeto
- Bug real encontrado e corrigido: `.gitignore` tinha `.env*` sem exceção,
  então `.env.example` nunca foi commitado desde a Etapa 0 — corrigido com
  `!.env.example`

## Decisões importantes já tomadas
- Paleta do site: bronze `#B0824A` (único acento) + preto + base neutra clara
- Tipografia: Cinzel (títulos, substituindo Trajan Pro, que é paga e não foi
  fornecida) + Montserrat (textos/tagline, conforme manual)
- Não usar os estilos visuais prontos da skill `landing-page-generator`
  (paletas genéricas) — só a estrutura de seções e os checklists
- Não instalar o plugin de terceiros `tokenwise` (autodeclarado risco crítico e
  bloqueado para Claude Code) — economia de tokens feita manualmente
- Git do projeto isolado propositalmente da pasta `~/Documentos` (que tem um
  `.git` próprio, vazio, sem relação com este projeto)

## Próxima tarefa
Etapa 4 — rodar auditoria de conversão completa na página inteira, gerar
`AUDITORIA_CONVERSAO.md`, aplicar melhorias que não dependem de dados
externos e listar separadamente o que depende de decisão do cliente.

## Pendências bloqueantes
Ver `PENDENCIAS.md` — principalmente dados reais da clínica (endereço, telefone,
serviços, responsável técnico) ainda não fornecidos.
