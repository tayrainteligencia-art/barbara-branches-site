# Progresso do projeto

## Animação travando no Safari iOS (2026-09-24)
Reportado: animações rodam mas travam/engasgam especificamente no Safari do
iPhone. Não reproduzi em automação (Chromium com toque real via CDP, dev e
build de produção, com e sem reduced-motion — sem erros, sem elemento preso
invisível); não consegui testar no motor WebKit aqui (faltam dependências de
sistema, exigiria `sudo`, não rodei sem autorização). Apliquei duas correções
de performance conhecidas por causar exatamente esse sintoma no iOS Safari,
mesmo sem conseguir confirmar no dispositivo real:
- `SmoothScrollProvider`: Lenis (smooth-scroll via JS, com raf sincronizado
  ao ticker do GSAP) deixa de ser instanciado em dispositivos touch
  (`matchMedia("(pointer: coarse)")`) — no touch, o scroll nativo do
  iOS/Android já roda suave no compositor do sistema, e a camada extra de JS
  do Lenis só compete por tempo de main thread com as animações de
  ScrollTrigger. Em touch, o ScrollTrigger volta a ouvir o scroll nativo
  direto (comportamento padrão dele sem scroller custom). Desktop/mouse
  continua usando Lenis normalmente.
- `NoiseOverlay`: elemento fixo em tela cheia com filtro SVG (feTurbulence)
  ganhou `transform: translateZ(0)` + `will-change: transform` para forçar
  camada de composição própria — sem isso, Safari pode repintar o filtro a
  cada frame de scroll.
- Validado: toque real via CDP (dev e build de produção estático), sem
  erros, sem elemento preso invisível, scroll completo até o rodapé; visual
  check 375/768/1440 claro/escuro sem regressão.
- **Pendência**: confirmar no iPhone real (ou pedir pra alguém testar) se o
  travamento melhorou. Se persistir, os próximos suspeitos são o
  `backdrop-blur-md` da navbar flutuante (`floating-navbar.tsx`) — caro no
  Safari mas parte do design pedido, trade-off a decidir com você — e o
  `Sticky Scroll Reveal` da seção Diferenciais (pin via GSAP ScrollTrigger,
  categoria de animação historicamente pesada no iOS).

## HTTPS forçado + HSTS (2026-09-24, branch `redesign/portfolio`)
Pedido original sugeria `middleware.ts` ou `headers()`/`redirects()` no
`next.config.ts` como fallback sem acesso à camada de servidor. Nenhum dos
dois funciona aqui: o site é `output: "export"` (export estático, sem
servidor Next.js em produção) — middleware e `headers()`/`redirects()` são
ignorados nesse modo. Implementado em `public/.htaccess` (Apache, o que o
cPanel/Hostgator realmente usa), que o build copia para `out/.htaccess` e o
workflow já existente sobe via rsync — sem mudança no pipeline. Cobre tanto
Apache terminando TLS direto quanto atrás de um proxy que só repassa
`X-Forwarded-Proto` (não sei qual é o caso exato no plano do Hostgator).
- Validado: `npm run dev` sem travamento/loop (o `.htaccess` não afeta o
  Next.js localmente, só o Apache em produção); build de export gera
  `out/.htaccess` idêntico ao de `public/`; lint sem erros novos.
- **Não validado**: redirect HTTP→HTTPS e header HSTS reais — isso só
  acontece no Apache do servidor, e não tenho acesso a ele nem a um
  ambiente de preview. Só é verificável depois que isso chegar a `main` e
  passar pelo deploy automático (`curl -I http://<domínio>` deve devolver
  308 com `Location: https://…`, e `curl -sI https://<domínio> | grep
  -i strict-transport-security` deve mostrar o header).
- HSTS sem `preload` de propósito (pedido explicitamente) — reversível.

## Merge redesign/portfolio → main (2026-09-24)
`main` tinha avançado, em paralelo ao redesign, para deploy estático via
GitHub Actions/cPanel (Hostgator não tem Node.js): `output: "export"` no
next.config.ts, rota `/api/contact` removida, formulário de contato reescrito
para abrir o WhatsApp direto em vez de chamar uma API própria. O merge trouxe
o redesign inteiro para cima dessa infraestrutura, com um único conflito real
(`contact-form.tsx`, resolvido combinando o comportamento novo — sem API, sem
campo de e-mail — com o visual/tokens do redesign).
- Bug real descoberto e corrigido durante a validação: o link
  `wa.me/message/<código>` (formato de link de mensagem do WhatsApp Business)
  **não preserva `?text=`** — testado via curl e Playwright, o redirect do
  WhatsApp descarta o parâmetro. Só o formato `wa.me/<número>?text=…` (que
  exige o número em dígitos, que não temos) pré-preenche de verdade. Corrigido
  com fallback de copiar a mensagem para a área de transferência
  (`copyWhatsAppMessage` em `lib/whatsapp.ts`) antes de abrir o link, usado no
  formulário de contato e no chat de pré-atendimento — testado ponta a ponta,
  mensagem chega certa na área de transferência.
- Workflow `deploy-cpanel.yml` atualizado: a secret que ele injeta no build
  mudou de nome, de `NEXT_PUBLIC_WHATSAPP_NUMBER` para
  `NEXT_PUBLIC_WHATSAPP_LINK` (nome usado pelo código atual). Não tenho acesso
  às GitHub Secrets do repositório — se quiser sobrescrever o link padrão
  (já correto, confirmado nesta sessão) por secret, crie
  `NEXT_PUBLIC_WHATSAPP_LINK` nas configurações do repositório.
- Build de export estático (`npm run build` com `output: "export"`) validado
  localmente: todas as rotas geradas (`/`, `/pre-atendimento`,
  `/politica-de-privacidade`), servidas via `serve out` (sem `-s`, que quebra
  rotas estáticas multi-página — descoberto durante a validação) e checadas
  em 375/768/1440px, claro/escuro, sem erros de console/overflow/imagens
  quebradas. Lighthouse do export estático: **88/97/100/100** (melhor que os
  79/97/100/100 medidos antes do merge, rodando via `next dev`/`next start`).

## Dados reais recebidos (2026-09-24)
Primeira leva de dados reais da clínica, aplicada nesta sessão:
- Fotos: Dra. Bárbara (seção Profissional) e 1 foto de procedimento em sala de
  atendimento (seção Estrutura) — otimizadas em `public/images/`. Duas fotos de
  antes/depois recebidas junto não foram publicadas (pendência regulatória, ver
  PENDENCIAS.md) e foram apagadas por engano ao organizar os arquivos — avisado
  ao cliente, arquivos originais provavelmente recuperáveis no WhatsApp de origem.
- WhatsApp: link de mensagem confirmado (`wa.me/message/QDEZWMLPXOTUL1`), agora
  base de `src/lib/whatsapp.ts` — usado no botão flutuante, CTAs e no chat de
  pré-atendimento (que ganhou uma pergunta de nome para compor a mensagem final).
- Endereço/telefone/CNPJ: resolvidos a partir do link curto do Google Maps + CNPJ
  fornecido (consulta pública à Receita Federal) — Nuclear Center Clínica de
  Diagnósticos por Imagens LTDA, Rua Mauriti 2159, Pedreira, Belém-PA. Já no
  rodapé, na seção de Contato (com mapa embutido) e no JSON-LD.
- CRM 6831 da Dra. Bárbara Branches — já na seção Profissional e no rodapé.
- E-mail atendimento@drabarbarabranches.com.br — no rodapé (caixa ainda não ativa).
- Nova página `/politica-de-privacidade`: modelo LGPD, banner deixando claro que
  precisa de revisão jurídica antes de publicação definitiva; link no rodapé.
- Lighthouse após essas mudanças: performance **79** (linha de base do redesign
  era 74 — sem regressão, dentro da variação normal de execuções headless) /
  acessibilidade 97 / boas práticas 100 / SEO 100 (`.lighthouse/report-redesign4.json`).
- Bug real encontrado e corrigido nesta sessão: rodapé estourava a largura da
  tela em 768px (e-mail longo sem quebra de linha + barra inferior sem
  wrap) — corrigido com `break-all` no e-mail e `flex-wrap` na barra do CNPJ/CRM.

## Redesign Portfólio (branch `redesign/portfolio`)
Estado: **Etapa 3 concluída — redesign pronto para revisão**, na branch
`redesign/portfolio` (não mesclado na `main`).

### Item 6 — Etapa 3 (final)
- `AUDITORIA_CONVERSAO.md`: sem dados de tráfego ainda; achados por princípios
  (ver arquivo) — nada bloqueante, 2 itens dependem de dados que faltam
- Lint e build de produção sem erros; validação de marco final (375/768/1440,
  claro/escuro, reduced-motion) sem erros de console/overflow/imagens quebradas
- Lighthouse: baseline 77/96/100/100 → redesign final **74/97/100/100**
  (performance) — caiu para 68 logo após o redesign (todo o JS das seções
  carregava de uma vez), recuperado para 74 com `next/dynamic` nas seções
  abaixo do Hero, no Footer, no Navbar e no parallax decorativo do Hero
- Gap restante (74 vs. 77): o preloader ocupa a tela por ~1,15s (dentro do
  limite de 1,5s do projeto original) e isso atrasa o LCP do texto por trás —
  decisão registrada em PENDENCIAS.md para você validar
- CTA do meio da página (previsto no plano) tinha ficado de fora — adicionado
  nesta etapa
- Não fiz deploy na Vercel — sem acesso à sua conta. Se o projeto já estiver
  conectado ao GitHub, um preview da branch `redesign/portfolio` deve aparecer
  automaticamente no seu painel Vercel

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
