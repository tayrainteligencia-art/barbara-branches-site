# Auditoria de conversão — redesign portfólio

Sem dados de tráfego/sessões (site ainda não publicado) — achados por
princípios, não por dados. Reavaliar com dados reais após publicação.

## Achados e ações

1. **Sem mensuração de conversão** (nenhum pixel/analytics instalado) →
   depende de decisão sua (ferramenta + LGPD); não implementado nesta sessão.
2. **Sem CTA persistente até o WhatsApp ser configurado**: o Navbar flutuante só
   aparece ao rolar para cima, e o botão de WhatsApp fica oculto sem número
   configurado (`NEXT_PUBLIC_WHATSAPP_NUMBER`) → assim que o número for
   fornecido, o botão flutuante passa a cobrir esse intervalo automaticamente;
   nenhuma ação extra necessária, só depende do dado.
3. **Prova social ausente** (depoimentos, fotos e histórico ainda são
   placeholders) → depende de fornecimento de dados reais (PENDENCIAS.md);
   estrutura já pronta para receber o conteúdo assim que chegar.
4. **CTA no meio da página existia só no plano e não na página** → corrigido
   nesta sessão (seção entre Diferenciais e Profissional).
5. **Oferta clara em ≤5s**: segmento, promessa e ação ficaram claros no teste
   visual do Hero — nenhuma ação necessária.
6. **Formulário de contato**: 4 campos (nome, e-mail, telefone opcional,
   mensagem) + consentimento LGPD — fricção já baixa, nenhuma ação necessária.
7. **FAQ trata objeção de "resultado garantido" de frente**, sem prometer o
   que não pode — mantido como está, alinhado às normas de publicidade da área.

## Não verificável
Taxa de conversão real, comportamento de rolagem real e message-match com
anúncios — não há tráfego pago nem sessões para analisar ainda.
