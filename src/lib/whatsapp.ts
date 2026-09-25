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
