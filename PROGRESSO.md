# Progresso do projeto

## Etapa atual
Etapa 3 em andamento — construção seção por seção.

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
Seção "Manifesto / Sobre a clínica" (item 3 da estrutura aprovada).

## Pendências bloqueantes
Ver `PENDENCIAS.md` — principalmente dados reais da clínica (endereço, telefone,
serviços, responsável técnico) ainda não fornecidos.
