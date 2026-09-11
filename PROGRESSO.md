# Progresso do projeto

## Etapa atual
Etapa 1 concluída. Aguardando aprovação do plano da Etapa 2.

## Concluído
- Etapa 0: ambiente verificado, projeto Next.js 16 + TS + Tailwind 4 criado,
  dependências (gsap, lenis, framer-motion) instaladas, repositório privado criado
  e sincronizado em https://github.com/tayrainteligencia-art/barbara-branches-site
- Etapa 1: análise da marca concluída (`BRAND_ANALYSIS.md`), pendências reais
  listadas (`PENDENCIAS.md`), assets de logo extraídos e otimizados em
  `public/brand/` (logo-full.png/.webp, icon.png/.webp)

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
Etapa 2 — propor estrutura de seções (landing-page-generator), headline/CTAs
(landing-page-copy) e apresentar o plano completo para aprovação antes de codar.

## Pendências bloqueantes
Ver `PENDENCIAS.md` — principalmente dados reais da clínica (endereço, telefone,
serviços, responsável técnico) ainda não fornecidos.
