# Pendências — informações reais necessárias

Este arquivo lista tudo que **não foi inventado** e precisa ser confirmado ou fornecido
pela clínica antes da publicação. Enquanto isso, o site usa placeholders marcados com
`TODO` no código.

## Identidade e legal
- [ ] Confirmar o segmento exato da clínica (estética facial? harmonização orofacial?
      dermatologia? outro?) e a especialidade completa do(s) responsável(is) técnico(s)
- [x] Nome e registro profissional: Dra. Bárbara Branches, CRM 6831 (confirmado
      2026-09-24) — especialidade completa e outros registros (CRO/RQE, se aplicável)
      ainda a confirmar
- [x] Razão social / CNPJ: Nuclear Center Clínica de Diagnósticos por Imagens LTDA,
      CNPJ 10.913.454/0001-07 (confirmado 2026-09-24, já no rodapé)
- [ ] Licença ou substituição definitiva para a fonte Trajan Pro (ver BRAND_ANALYSIS.md,
      seção 4) — hoje o site usa Cinzel como alternativa gratuita
- [ ] Nome e contato do encarregado de dados (DPO) para a Política de Privacidade
      (`/politica-de-privacidade` — modelo pendente de revisão jurídica)

## Contato e localização
- [x] Endereço: Rua Mauriti, 2159 — Pedreira, Belém - PA, CEP 66087-680 (confirmado
      2026-09-24 via CNPJ/Google Maps; embed já na seção de Contato)
- [x] Telefone: (91) 3245-3397; WhatsApp: link `wa.me/message/QDEZWMLPXOTUL1`
      (confirmado 2026-09-24, já em uso no botão flutuante, CTAs e pré-atendimento)
- [ ] Horário de funcionamento
- [ ] Links das redes sociais (Instagram, Facebook etc.)
- [x] E-mail: atendimento@drabarbarabranches.com.br (confirmado 2026-09-24, exibido no
      rodapé como texto/mailto — caixa ainda não está ativa, não testar envio real)

## Conteúdo
- [ ] Lista oficial de tratamentos/serviços oferecidos, com descrições
- [x] Fotos recebidas 2026-09-24: 1 foto da Dra. Bárbara (seção Profissional) e 1 foto
      de procedimento em sala de atendimento (seção Estrutura) — já publicadas,
      otimizadas em `public/images/`. Ainda faltam: fachada, recepção, sala de espera
- [ ] Depoimentos reais de pacientes (com autorização de uso da imagem/nome)
- [ ] Confirmação se fotos "antes e depois" podem ser usadas — depende das normas do
      conselho profissional da especialidade; não usar sem essa confirmação. Duas fotos
      desse tipo foram recebidas 2026-09-24 mas **não foram publicadas** por falta dessa
      confirmação (e foram apagadas do disco por engano ao organizar os arquivos — avise
      se ainda tiver essas fotos para reenviar)
- [ ] Perguntas e respostas reais para a seção de FAQ
- [ ] Texto do manifesto/sobre a clínica (história, missão, diferenciais reais)

## Técnico
- [ ] Domínio definitivo do site (para metadata, Open Graph e `NEXT_PUBLIC_SITE_URL`)
- [ ] Definir serviço de envio do formulário de contato (ex.: Resend, outro) e suas
      credenciais (nunca commitar a chave — usar variável de ambiente)
- [ ] Ferramenta de mensuração de conversão (analytics/pixel) — nenhuma instalada;
      depende de decisão sobre ferramenta + aviso de cookies/LGPD

## Decisão sua — redesign de portfólio
- [ ] Lighthouse Performance ficou em 74 (linha de base era 77). O motivo é o
      preloader (~1,15s cobrindo a tela com o logo) atrasar o LCP do texto por
      trás — é a revelação animada do logo já pedida no projeto original, dentro
      do limite de 1,5s. Dá pra ganhar mais alguns pontos removendo ou encurtando
      bastante o preloader, mas isso troca a entrada com marca por um score
      melhor. Mantive o preloader como está; me avise se preferir o contrário.

Sem esses dados, os textos e imagens correspondentes ficam marcados com `TODO` no
código-fonte e devem ser preenchidos antes do lançamento.
