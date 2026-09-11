"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "@/components/split-reveal";
import { useFadeUp } from "@/hooks/use-fade-up";

// TODO(PENDENCIAS.md): lista ilustrativa de categorias comuns em clínicas de
// estética — substituir pela lista oficial de tratamentos da Bárbara Branches.
const treatments = [
  {
    title: "Harmonização facial",
    description:
      "Procedimentos personalizados para equilibrar as proporções do rosto.",
  },
  {
    title: "Bioestimuladores de colágeno",
    description:
      "Estímulo natural de colágeno para firmeza e viço da pele ao longo do tempo.",
  },
  {
    title: "Preenchimento facial",
    description:
      "Técnicas de preenchimento para realçar contornos com naturalidade.",
  },
  {
    title: "Toxina botulínica",
    description:
      "Suavização de linhas de expressão com técnica precisa e individualizada.",
  },
  {
    title: "Protocolos de skincare",
    description:
      "Cuidados faciais avançados para saúde, viço e textura da pele.",
  },
  {
    title: "Avaliação personalizada",
    description:
      "Consultoria individual para entender sua pele e desenhar o plano ideal.",
  },
];

export function Treatments() {
  const fadeUp = useFadeUp();

  return (
    <section id="tratamentos" className="bg-cream-deep py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-6 font-sans text-xs font-medium tracking-[0.35em] text-bronze uppercase">
            Tratamentos
          </p>
          <SplitReveal
            as="h2"
            text="Cuidados pensados para cada fase da sua beleza"
            className="font-display text-3xl leading-[1.2] tracking-wide text-ink sm:text-4xl lg:text-[2.75rem]"
          />
          <motion.p
            {...fadeUp}
            className="mt-6 font-sans text-sm italic text-ink-soft/60"
          >
            Lista ilustrativa de categorias — a lista oficial de tratamentos
            será confirmada com a clínica.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-x-12 border-t border-cream-line sm:grid-cols-2">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              {...fadeUp}
              transition={{
                ...fadeUp.transition,
                delay: (index % 2) * 0.08,
              }}
              className="group border-b border-cream-line py-8"
            >
              <span className="font-display text-sm text-bronze">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl tracking-wide text-ink sm:text-2xl">
                {treatment.title}
              </h3>
              <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-ink-soft/75 sm:text-base">
                {treatment.description}
              </p>
              <span className="mt-5 block h-px w-10 bg-bronze/40 transition-all duration-300 group-hover:w-16 group-hover:bg-bronze" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
