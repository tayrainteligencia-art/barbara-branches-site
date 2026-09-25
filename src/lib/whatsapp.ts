const DEFAULT_LINK = "https://wa.me/message/QDEZWMLPXOTUL1";
const DEFAULT_MESSAGE = "Olá! Gostaria de agendar uma avaliação.";

/**
 * Monta o link do WhatsApp a partir do link de mensagem confirmado pela
 * clínica (NEXT_PUBLIC_WHATSAPP_LINK sobrescreve o padrão, se definido).
 */
export function getWhatsAppLink(message?: string): string {
  const base = process.env.NEXT_PUBLIC_WHATSAPP_LINK ?? DEFAULT_LINK;
  const text = encodeURIComponent(
    message ?? process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? DEFAULT_MESSAGE,
  );
  return `${base}?text=${text}`;
}

/**
 * O link wa.me/message/<código> (gerado pelo WhatsApp Business) ignora
 * ?text= — só o formato wa.me/<número>?text=… pré-preenche de verdade, e não
 * temos o número em dígitos, só o link de mensagem. Como fallback, copiamos
 * a mensagem para a área de transferência antes de abrir o link, para a
 * pessoa só colar no chat. Silencioso: sem clipboard (contexto não seguro,
 * navegador antigo), a pessoa ainda chega no chat certo, só sem o rascunho.
 */
export function copyWhatsAppMessage(message: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) return;
  navigator.clipboard.writeText(message).catch(() => {});
}
