"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";
import { useFadeUp } from "@/hooks/use-fade-up";

export function About() {
  const fadeUp = useFadeUp();

  return (
    <section
      id="sobre"
      className="relative overflow-hidden border-t border-border py-24 md:py-40"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:px-8">
        <div className="relative z-10 lg:order-2">
          <SectionLabel number="01" title="Sobre" />

          <SplitReveal
            as="h2"
            text="Ciência e sensibilidade em cada etapa do seu cuidado"
            className="font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl lg:text-[2.75rem]"
          />

          <motion.div {...fadeUp} className="mt-8 space-y-5">
            <p className="max-w-xl text-balance font-sans text-base leading-relaxed text-foreground/80 sm:text-lg">
              Acreditamos que a beleza verdadeira nasce do equilíbrio: entre
              técnica e sensibilidade, entre resultado e naturalidade, entre
              ciência e escuta. Cada atendimento começa antes do
              procedimento — começa por entender você.
            </p>
            <p className="max-w-xl text-balance font-sans text-base leading-relaxed text-foreground/80 sm:text-lg">
              Por isso unimos conhecimento técnico atualizado a um cuidado
              próximo e humano, para que cada pessoa se sinta ouvida,
              respeitada e segura em todas as etapas do seu tratamento.
            </p>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          className="relative aspect-[4/5] w-full max-w-md justify-self-center lg:order-1 lg:justify-self-start"
        >
          <div className="absolute inset-0 rounded-[2rem] border border-border" />
          <div className="absolute inset-0 flex items-center justify-center p-12 opacity-90">
            <Image
              src="/brand/icon.webp"
              alt="Símbolo Bárbara Branches"
              width={320}
              height={320}
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
