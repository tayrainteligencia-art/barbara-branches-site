"use client";

import { motion } from "motion/react";
import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";
import { FocusCards } from "@/components/ui/focus-cards";
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
    <section id="tratamentos" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel number="02" title="Tratamentos" />
          <SplitReveal
            as="h2"
            text="Cuidados pensados para cada fase da sua beleza"
            className="font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl lg:text-[2.75rem]"
          />
          <motion.p
            {...fadeUp}
            className="mt-6 font-sans text-sm italic text-foreground/60"
          >
            Lista ilustrativa de categorias — a lista oficial de tratamentos
            será confirmada com a clínica.
          </motion.p>
        </div>

        <motion.div {...fadeUp} className="mt-16">
          <FocusCards cards={treatments} />
        </motion.div>
      </div>
    </section>
  );
}
