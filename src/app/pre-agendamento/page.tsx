import type { Metadata } from "next";
import { PreAgendamentoChat } from "@/components/pre-agendamento-chat";

// Sem indexação e fora do sitemap. Sem backend: as respostas ficam só no
// estado do componente e saem apenas na mensagem enviada pelo WhatsApp.
export const metadata: Metadata = {
  title: "Pré-agendamento",
  robots: { index: false, follow: false },
};

export default function PreAgendamentoPage() {
  return <PreAgendamentoChat />;
}
