"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useFadeUp } from "@/hooks/use-fade-up";

export function About() {
  const fadeUp = useFadeUp();
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, amount: 0.5 });

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

          <div ref={textRef} className="mt-8 max-w-xl space-y-5">
            <TextGenerateEffect
              play={textInView}
              duration={0.4}
              staggerDelay={0.02}
              className="text-balance text-base leading-relaxed text-foreground/80 sm:text-lg"
              words="Acreditamos que a beleza verdadeira nasce do equilíbrio: entre técnica e sensibilidade, entre resultado e naturalidade, entre ciência e escuta. Cada atendimento começa antes do procedimento — começa por entender você."
            />
            <TextGenerateEffect
              play={textInView}
              duration={0.4}
              staggerDelay={0.02}
              className="text-balance text-base leading-relaxed text-foreground/80 sm:text-lg"
              words="Por isso unimos conhecimento técnico atualizado a um cuidado próximo e humano, para que cada pessoa se sinta ouvida, respeitada e segura em todas as etapas do seu tratamento."
            />
          </div>
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
