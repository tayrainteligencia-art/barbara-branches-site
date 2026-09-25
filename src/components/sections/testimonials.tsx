"use client";

import { motion } from "motion/react";
import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useFadeUp } from "@/hooks/use-fade-up";

// TODO(PENDENCIAS.md): substituir pelos depoimentos reais de pacientes,
// com autorização de uso do nome/imagem. Nenhum depoimento é inventado.
const placeholders = [
  { quote: "Depoimento de paciente — a confirmar.", name: "Nome do paciente — a confirmar" },
  { quote: "Depoimento de paciente — a confirmar.", name: "Nome do paciente — a confirmar" },
  { quote: "Depoimento de paciente — a confirmar.", name: "Nome do paciente — a confirmar" },
];

export function Testimonials() {
  const fadeUp = useFadeUp();

  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel number="07" title="Depoimentos" />
          <SplitReveal
            as="h2"
            text="O que dizem quem já vivenciou o cuidado Bárbara Branches"
            className="font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl lg:text-[2.75rem]"
          />
          <motion.p
            {...fadeUp}
            className="mt-6 font-sans text-sm italic text-foreground/50"
          >
            Depoimentos reais de pacientes serão publicados aqui assim que
            recebermos a autorização de uso.
          </motion.p>
        </div>

        <div className="mt-16">
          <AnimatedTestimonials testimonials={placeholders} />
        </div>
      </div>
    </section>
  );
}
