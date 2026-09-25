"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";
import { useFadeUp } from "@/hooks/use-fade-up";

export function Professional() {
  const fadeUp = useFadeUp();

  return (
    <section id="profissional" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-8">
        <motion.div
          {...fadeUp}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-border"
        >
          <Image
            src="/images/doutora/dra-barbara-branches.jpg"
            alt="Dra. Bárbara Branches"
            fill
            sizes="(min-width: 1024px) 24rem, 90vw"
            className="object-cover"
          />
        </motion.div>

        <div>
          <SectionLabel number="04" title="Profissional" />
          <SplitReveal
            as="h2"
            text="Quem cuida do seu tratamento"
            className="font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl lg:text-[2.75rem]"
          />

          <motion.div
            {...fadeUp}
            className="mt-8 max-w-lg rounded-xl border border-dashed border-accent-text/50 p-6"
          >
            <p className="font-display text-xl tracking-wide text-foreground/70">
              Dra. Bárbara Branches
            </p>
            <p className="mt-2 font-sans text-sm text-foreground/60">CRM 6831</p>
            <p className="mt-1 font-sans text-xs italic text-foreground/45">
              TODO: especialidade completa e demais registros (CRO/RQE, se
              aplicável) a confirmar
            </p>
            <p className="mt-4 font-sans text-sm italic leading-relaxed text-foreground/55">
              TODO: biografia profissional (formação, experiência e
              abordagem) a ser fornecida pela clínica antes da publicação.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
