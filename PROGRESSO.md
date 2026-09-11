# Progresso do projeto

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
