// Número da clínica como o próprio WhatsApp o informa na página do link de
// mensagem wa.me/message/QDEZWMLPXOTUL1 (phone=559193754555). Usamos o
// formato wa.me/<número>?text=… porque é o único que abre a conversa já com
// a mensagem preenchida — o link de mensagem descarta o ?text=.
const DEFAULT_NUMBER = "559193754555";
const DEFAULT_MESSAGE = "Olá! Gostaria de agendar uma avaliação.";

/**
 * Link que abre a conversa da clínica no WhatsApp com `message` preenchida.
 * As variáveis de ambiente usam `||`, não `??`: o workflow de deploy injeta
 * secrets inexistentes como string vazia, e com `??` o link ficava vazio
 * (apontando para o próprio site).
 */
export function getWhatsAppLink(message?: string): string {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_NUMBER).replace(/\D/g, "");
  const text = message || process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || DEFAULT_MESSAGE;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
