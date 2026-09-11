"use client";

import { motion } from "framer-motion";
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
          className="relative mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] border border-dashed border-accent-text/50"
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-14 w-14 text-accent-text/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
            <p className="font-sans text-xs italic text-foreground/50">
              Foto do profissional responsável — a confirmar
            </p>
          </div>
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
              [Nome do profissional] — TODO
            </p>
            <p className="mt-2 font-sans text-sm text-foreground/60">
              TODO: especialidade e registro profissional (CRM/CRO/RQE)
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
