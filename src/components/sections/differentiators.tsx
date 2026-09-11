"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";
import { useFadeUp } from "@/hooks/use-fade-up";

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
];

export function Differentiators() {
  const fadeUp = useFadeUp();

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

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (index % 2) * 0.08 }}
              className="border-t-2 border-accent-text pt-6"
            >
              <h3 className="font-display text-xl tracking-wide text-foreground sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-foreground/65 sm:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
