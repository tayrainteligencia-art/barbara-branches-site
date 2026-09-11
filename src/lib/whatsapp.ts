const DEFAULT_MESSAGE = "Olá! Gostaria de agendar uma avaliação.";

/**
 * Monta o link wa.me a partir das variáveis de ambiente.
 * Sem NEXT_PUBLIC_WHATSAPP_NUMBER definido, retorna null — quem consome
 * decide como lidar com a ausência (ex.: ocultar o botão) em vez de linkar
 * para um número inexistente.
 */
export function getWhatsAppLink(message?: string): string | null {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;

  const text = encodeURIComponent(
    message ?? process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? DEFAULT_MESSAGE,
  );
  return `https://wa.me/${number}?text=${text}`;
}
