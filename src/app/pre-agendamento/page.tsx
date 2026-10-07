import type { Metadata } from "next";
import { PreAtendimentoChat } from "@/components/pre-atendimento-chat";

// Protótipo demonstrativo — sem indexação, sem persistência, sem backend.
// Ver PROGRESSO.md/PENDENCIAS.md; dados usados aqui são mockados/DEMONSTRATIVOS.
export const metadata: Metadata = {
  title: "Pré-atendimento",
  robots: { index: false, follow: false },
};

export default function PreAtendimentoPage() {
  return <PreAtendimentoChat />;
}
