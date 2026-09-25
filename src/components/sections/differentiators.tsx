"use client";

import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

// Sem contadores numéricos: nenhum dado real (anos de atuação, nº de
// atendimentos etc.) foi fornecido. Ver PENDENCIAS.md — quando houver
// números reais, substituir por um contador animado.
const differentiators = [
  {
    title: "Atendimento personalizado",
    description:
      "Cada plano de tratamento é desenhado para as necessidades específicas de cada pessoa.",
  },
  {
    title: "Ciência a serviço da beleza",
    description:
      "Técnicas atualizadas e critério clínico em cada etapa do procedimento.",
  },
  {
    title: "Cuidado do início ao fim",
    description:
      "Acompanhamento próximo, da avaliação inicial ao pós-procedimento.",
  },
  {
    title: "Ambiente pensado para você",
    description:
      "Um espaço que une conforto, discrição e bem-estar em cada visita.",
  },
].map((item, index) => ({
  ...item,
  content: (
    <span className="font-display text-6xl text-accent-text">
      {String(index + 1).padStart(2, "0")}
    </span>
  ),
}));

export function Differentiators() {
  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel number="03" title="Diferenciais" />
          <SplitReveal
            as="h2"
            text="O que torna sua experiência única"
            className="font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl lg:text-[2.75rem]"
          />
        </div>

        <div className="mt-16">
          <StickyScroll content={differentiators} />
        </div>
      </div>
    </section>
  );
}
