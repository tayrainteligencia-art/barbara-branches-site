"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";
import { useFadeUp } from "@/hooks/use-fade-up";

const steps = [
  {
    title: "Agendamento",
    description: "Você entra em contato por WhatsApp ou pelo formulário do site.",
  },
  {
    title: "Avaliação inicial",
    description: "Conversamos sobre suas expectativas e analisamos suas necessidades.",
  },
  {
    title: "Plano de tratamento",
    description: "Definimos juntos o plano mais adequado para o seu objetivo.",
  },
  {
    title: "Acompanhamento",
    description: "Suporte próximo antes, durante e depois de cada procedimento.",
  },
];

export function HowItWorks() {
  const fadeUp = useFadeUp();

  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8">
        <SectionLabel number="06" title="Como funciona" />
        <SplitReveal
          as="h2"
          text="Da primeira conversa ao acompanhamento"
          className="max-w-2xl font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl lg:text-[2.75rem]"
        />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute top-6 left-0 hidden h-px w-full bg-border lg:block"
          />
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent-text bg-background font-display text-lg text-accent-text">
                {index + 1}
              </div>
              <h3 className="font-display text-lg tracking-wide text-foreground sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-foreground/75">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
