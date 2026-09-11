# Pendências — informações reais necessárias

Este arquivo lista tudo que **não foi inventado** e precisa ser confirmado ou fornecido
pela clínica antes da publicação. Enquanto isso, o site usa placeholders marcados com
`TODO` no código.

## Identidade e legal
- [ ] Confirmar o segmento exato da clínica (estética facial? harmonização orofacial?
      dermatologia? outro?) e a especialidade do(s) responsável(is) técnico(s)
- [ ] Nome completo, especialidade e registro profissional (CRM/CRO/RQE) do(s)
      profissional(is) responsável(is) — obrigatório para publicidade da área da saúde
- [ ] Razão social / CNPJ da clínica, se for exibir no rodapé
- [ ] Licença ou substituição definitiva para a fonte Trajan Pro (ver BRAND_ANALYSIS.md,
      seção 4) — hoje o site usa Cinzel como alternativa gratuita

## Contato e localização
- [ ] Endereço completo da clínica
- [ ] Telefone e número de WhatsApp (com DDI/DDD) para o botão flutuante e formulário
- [ ] Horário de funcionamento
- [ ] Links das redes sociais (Instagram, Facebook etc.)
- [ ] E-mail de contato

## Conteúdo
- [ ] Lista oficial de tratamentos/serviços oferecidos, com descrições
- [ ] Fotografias da clínica (fachada, recepção, salas), da equipe e de procedimentos
      (em resolução adequada para web)
- [ ] Depoimentos reais de pacientes (com autorização de uso da imagem/nome)
- [ ] Confirmação se fotos "antes e depois" podem ser usadas — depende das normas do
      conselho profissional da especialidade; não usar sem essa confirmação
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
