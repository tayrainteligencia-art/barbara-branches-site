# Análise de Marca — Bárbara Branches

Fonte: `/home/cauec/Documentos/Barbara Branches/` (pasta somente leitura, 4 arquivos,
nenhum PDF de manual de marca — apenas imagens PNG). Nenhum arquivo original foi
alterado; os assets usados no site são cópias otimizadas em `public/brand/`.

## 1. Arquivos analisados

| Arquivo | Dimensões | Conteúdo |
|---|---|---|
| `a497d3b7-...png` | 1536×1024 | **Manual de marca condensado** (1 página): versões da logomarca, papelaria, cartão de visita, assinatura digital, ícone de perfil, orientações de uso, paleta de cores e tipografia oficial |
| `e8b4276f-...png` | 1536×1024 | Logomarca completa (símbolo + nome + tagline), fundo **transparente**, alta resolução — usada como fonte do logo do site |
| `b97f23c4-...png` | 1055×1491 | Mesma logomarca completa, fundo transparente, proporção vertical (variação de composição/enquadramento) |
| `d4657cb4-...png` | 1774×887 | Especificação técnica de fabricação de **letreiro 3D em metal** (1,20m × 0,60m, acabamento bronze escovado) para a fachada física — referência de posicionamento premium, não é asset de web |

## 2. Logomarca

- Símbolo: monograma "B" estilizado entrelaçado com o perfil de um rosto feminino, dentro de um traço circular — remete a joalheria/alta relojoaria.
- Versões oficiais (do manual): colorida (bronze/dourado), bronze sólido, preta (para fundos claros) e reduzida (para usos pequenos).
- Ícone isolado para redes sociais/perfil: símbolo dentro de um círculo fino.
- Testado e confirmado: a logomarca colorida funciona bem tanto em fundo claro quanto em fundo escuro (gradiente metálico dourado com bom contraste nos dois casos) — importante para o hero escuro/cinematográfico pedido no prompt.
- Regras de uso (do manual): não distorcer, não inclinar, não alterar proporções; respeitar espaçamento mínimo ao redor; usar apenas as cores oficiais (bronze/dourado e preto); aplicar preferencialmente sobre fundos claros ou neutros (atenção especial ao usar sobre fundo escuro no hero).

**Assets extraídos e otimizados para o projeto** (`public/brand/`):
- `logo-full.png` / `.webp` — logo completo (símbolo + nome + tagline), fundo transparente, 1200px de largura
- `icon.png` / `.webp` — símbolo isolado (sem texto), fundo transparente, 512×512, para favicon/ícone de app/uso compacto no header

## 3. Paleta de cores oficial

| Cor | Hex | Pantone | Uso |
|---|---|---|---|
| Bronze/Dourado | `#B0824A` | 876 C | Cor primária da marca (símbolo, texto de destaque, acentos) |
| Preto | `#000000` | — | Cor de apoio (texto, versão preta da logo, fundos escuros) |
| Branco/neutro claro | (não especificado em hex; usado como fundo nas peças) | — | Fundo predominante das aplicações da marca |

O manual não define cores secundárias além de bronze e preto sobre fundos claros/neutros.
Para o site vou derivar uma escala neutra (tons de branco/creme/cinza-quente e um preto
levemente suavizado para textos) para dar respiro e hierarquia, mantendo bronze `#B0824A`
como único acento cromático — sem inventar cores secundárias que não estão na marca.

## 4. Tipografia oficial

| Uso | Fonte especificada | Observação |
|---|---|---|
| Nome "BÁRBARA BRANCHES" | Trajan Pro (Regular), espaçamento aumentado | Fonte paga da Adobe (Trajan Pro), **arquivo de fonte não fornecido** na pasta de branding |
| Tagline "Beleza, Ciência e Harmonia" | Montserrat (Medium), espaçamento aumentado | Google Font gratuita, disponível via `next/font/google` |

**Gap identificado**: não há arquivos de fonte (.otf/.ttf/.woff) na pasta de branding, e
Trajan Pro é uma fonte comercial da Adobe (não está no Google Fonts). Sem o arquivo
licenciado, não posso embutir Trajan Pro legalmente no site.

**Decisão registrada**: usar **Cinzel** (Google Fonts, gratuita) como substituta para
títulos — é a fonte mais usada como alternativa livre à Trajan, com o mesmo caráter de
capitular romana gravada em pedra, mantendo a mesma sensação de elegância clássica.
Montserrat (Medium) segue exatamente como especificado para textos de apoio/tagline via
`next/font/google`. Isso fica registrado como pendência em `PENDENCIAS.md` caso a clínica
tenha ou queira adquirir a licença da Trajan Pro futuramente.

## 5. Tom de voz e posicionamento

O manual não traz um documento de tom de voz explícito. Inferências a partir do material
visual (a serem validadas com o cliente):

- Tagline "Beleza, Ciência e Harmonia" posiciona a marca na interseção entre estética e
  ciência — sugere discurso que combina sofisticação com respaldo técnico/profissional,
  evitando promessas exageradas.
- Identidade visual (dourado metálico, tipografia serifada em caixa alta, letreiro físico
  em metal escovado de 1,20m) indica posicionamento **alto padrão/premium**, não popular.
- Símbolo com silhueta feminina sugere público-alvo majoritariamente feminino, mas o texto
  do site deve permanecer acessível a públicos de diferentes idades, conforme pedido.

## 6. Segmento da clínica

**Inferido** (não declarado explicitamente no material): clínica de **estética/beleza**
(harmonização facial e procedimentos estéticos), a partir da tagline "Beleza, Ciência e
Harmonia" e do símbolo com perfil de rosto. Não há confirmação do segmento exato
(estética facial, dermatologia, harmonização orofacial etc.), nem lista de serviços,
nem informação do(s) responsável(is) técnico(s) — ver `PENDENCIAS.md`.

## 7. O que está faltando (resumo — detalhado em PENDENCIAS.md)

- Arquivo de fonte Trajan Pro (ou confirmação para usar a alternativa Cinzel)
- Fotografias da clínica, da equipe/profissionais e de procedimentos
- Lista de tratamentos/serviços oferecidos
- Endereço, telefone, WhatsApp, horário de funcionamento, redes sociais
- Nome, CRM/CRO/RQE (conforme especialidade) do(s) profissional(is) responsável(is)
- Depoimentos reais de pacientes (não usar depoimentos fictícios)
- Confirmação sobre uso de fotos "antes e depois" (regras do conselho profissional)
- Confirmação do segmento exato da clínica e do tom de voz desejado

## 8. Decisões de design derivadas da marca (Etapa 2)

- Paleta do site: bronze `#B0824A` como acento único sobre base neutra clara (branco/creme)
  com textos em preto suavizado; nada de cores secundárias inventadas.
- Tipografia: Cinzel (títulos, substituindo Trajan Pro) + Montserrat (textos/tagline),
  ambas com tracking aumentado nos títulos/rótulos, ecoando o manual.
- Uso do símbolo "B" isolado como elemento gráfico recorrente (marca d'água sutil,
  divisores, favicon) já que a marca funciona bem tanto em fundo claro quanto escuro.
- Composições assimétricas e sobreposição de texto/imagem para fugir de cara de template,
  conforme pedido no prompt — combinando com o caráter joalheria/alta-costura da logo.

> Conflito com a skill `landing-page-generator`: os 4 estilos de design prontos da skill
> (dark-saas, clean-minimal, bold-startup, enterprise) usam paletas genéricas do Tailwind
> (violeta, azul, laranja, slate) que não correspondem à marca. Vou usar apenas a
> estrutura/ordem de seções e o checklist de SEO/performance da skill, e não seus estilos
> visuais prontos — priorizando a marca e o prompt, conforme a hierarquia de decisões.
