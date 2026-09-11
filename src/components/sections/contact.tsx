"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "@/components/split-reveal";
import { ContactForm } from "@/components/contact-form";
import { SectionLabel } from "@/components/section-label";
import { useFadeUp } from "@/hooks/use-fade-up";

// TODO(PENDENCIAS.md): endereço, telefone e horário reais da clínica.
const info = [
  { label: "Endereço", value: "TODO — endereço a confirmar" },
  { label: "Telefone / WhatsApp", value: "TODO — telefone a confirmar" },
  { label: "Horário de funcionamento", value: "TODO — horário a confirmar" },
];

export function Contact() {
  const fadeUp = useFadeUp();

  return (
    <section id="contato" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8">
        <SectionLabel number="09" title="Contato" />
        <SplitReveal
          as="h2"
          text="Vamos conversar sobre o seu cuidado"
          className="max-w-2xl font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl lg:text-[2.75rem]"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-10">
            <motion.div
              {...fadeUp}
              className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-accent-text/50"
            >
              <p className="font-sans text-xs italic text-foreground/50">
                Mapa — endereço a confirmar
              </p>
            </motion.div>

            <motion.dl
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="space-y-6 border-t border-border pt-6"
            >
              {info.map((item) => (
                <div key={item.label}>
                  <dt className="font-sans text-xs font-medium tracking-[0.2em] text-accent-text uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-sans text-base italic text-foreground/60">
                    {item.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
