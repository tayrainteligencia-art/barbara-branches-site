"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";
import { useFadeUp } from "@/hooks/use-fade-up";

// TODO(PENDENCIAS.md): substituir pelos depoimentos reais de pacientes,
// com autorização de uso do nome/imagem. Nenhum depoimento é inventado.
const placeholders = [1, 2, 3];

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

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {placeholders.map((item) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: item * 0.08 }}
              className="rounded-2xl border border-dashed border-foreground/25 p-6"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6 text-accent-text/60"
                fill="currentColor"
              >
                <path d="M7.5 6C4.46 6 2 8.46 2 11.5S4.46 17 7.5 17c.34 0 .67-.03 1-.09-.6 1.6-2.02 2.8-3.77 3.05a1 1 0 0 0 .14 1.99c3.7-.27 6.63-3.37 6.63-7.02V11.5C11.5 8.46 9.04 6 6 6Zm11 0c-3.04 0-5.5 2.46-5.5 5.5S14.96 17 18 17c.34 0 .67-.03 1-.09-.6 1.6-2.02 2.8-3.77 3.05a1 1 0 0 0 .14 1.99c3.7-.27 6.63-3.37 6.63-7.02V11.5C22 8.46 19.54 6 16.5 6Z" />
              </svg>
              <p className="mt-4 font-sans text-sm italic leading-relaxed text-foreground/45">
                Depoimento de paciente — a confirmar
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
