# Barbara Branches — Landing Page

Landing page institucional da clínica Barbara Branches: página única, premium e
orientada a conversão, com agendamento via WhatsApp e formulário de contato.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) com design tokens da marca
- [GSAP](https://gsap.com) + ScrollTrigger para animações de scroll
- [Lenis](https://lenis.darkroom.engineering) para smooth scroll
- [Framer Motion](https://www.framer.com/motion) para microinterações

## Como rodar localmente

Requer Node.js 20+.

```bash
npm install
cp .env.example .env.local   # preencha as variáveis necessárias
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run start    # servir o build de produção
npm run lint     # checagem de lint
```

## Deploy

O deploy é feito na [Vercel](https://vercel.com), importando este repositório
diretamente do GitHub. Configure na Vercel as mesmas variáveis de ambiente
listadas em `.env.example`.

## Documentos do projeto

- `BRAND_ANALYSIS.md` — análise da identidade visual e verbal da marca
- `PROGRESSO.md` — etapa atual, seções concluídas e próximos passos
- `PENDENCIAS.md` — informações reais da clínica ainda não fornecidas
- `AUDITORIA_CONVERSAO.md` — auditoria de conversão (gerado na Etapa 4)
