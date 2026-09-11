"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "@/components/split-reveal";
import { useFadeUp } from "@/hooks/use-fade-up";

export function Professional() {
  const fadeUp = useFadeUp();

  return (
    <section id="profissional" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-8">
        <motion.div
          {...fadeUp}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] border border-dashed border-bronze/50 bg-cream-deep/60"
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-14 w-14 text-bronze/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
            <p className="font-sans text-xs italic text-ink-soft/50">
              Foto do profissional responsável — a confirmar
            </p>
          </div>
        </motion.div>

        <div>
          <p className="mb-6 font-sans text-xs font-medium tracking-[0.35em] text-bronze uppercase">
            Profissional responsável
          </p>
          <SplitReveal
            as="h2"
            text="Quem cuida do seu tratamento"
            className="font-display text-3xl leading-[1.2] tracking-wide text-ink sm:text-4xl lg:text-[2.75rem]"
          />

          <motion.div
            {...fadeUp}
            className="mt-8 max-w-lg rounded-xl border border-dashed border-bronze/50 bg-cream-deep/50 p-6"
          >
            <p className="font-display text-xl tracking-wide text-ink-soft/70">
              [Nome do profissional] — TODO
            </p>
            <p className="mt-2 font-sans text-sm text-ink-soft/60">
              TODO: especialidade e registro profissional (CRM/CRO/RQE)
            </p>
            <p className="mt-4 font-sans text-sm italic leading-relaxed text-ink-soft/55">
              TODO: biografia profissional (formação, experiência e
              abordagem) a ser fornecida pela clínica antes da publicação.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
