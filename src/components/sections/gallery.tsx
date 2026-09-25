"use client";

import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";
import { LayoutGrid } from "@/components/ui/layout-grid";

// TODO(PENDENCIAS.md): substituir pelos espaços reais da clínica, com fotos.
const spaces = [
  {
    id: 1,
    label: "Recepção",
    className: "aspect-[4/3] md:col-span-2",
    content: "Um primeiro contato acolhedor, pensado para o seu conforto.",
  },
  {
    id: 2,
    label: "Sala de atendimento",
    className: "aspect-[4/3]",
    content: "Ambiente equipado para cada etapa do seu tratamento.",
    image: {
      src: "/images/procedimentos/procedimento-clinica.jpg",
      alt: "Procedimento sendo realizado em sala de atendimento da clínica",
    },
  },
  {
    id: 3,
    label: "Sala de espera",
    className: "aspect-[4/3]",
    content: "Um espaço tranquilo para relaxar antes do atendimento.",
  },
  {
    id: 4,
    label: "Fachada",
    className: "aspect-[4/3] md:col-span-2",
    content: "A porta de entrada da Bárbara Branches.",
  },
];

export function Gallery() {
  return (
    <section id="estrutura" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8">
        <SectionLabel number="05" title="Estrutura" />
        <SplitReveal
          as="h2"
          text="Um espaço pensado para o seu bem-estar"
          className="max-w-2xl font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl lg:text-[2.75rem]"
        />

        <div className="mt-16">
          <LayoutGrid cards={spaces} />
        </div>
      </div>
    </section>
  );
}
