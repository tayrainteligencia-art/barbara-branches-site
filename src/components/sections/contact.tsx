"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "@/components/split-reveal";
import { ContactForm } from "@/components/contact-form";
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
    <section id="contato" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8">
        <p className="mb-6 font-sans text-xs font-medium tracking-[0.35em] text-bronze uppercase">
          Localização e contato
        </p>
        <SplitReveal
          as="h2"
          text="Vamos conversar sobre o seu cuidado"
          className="max-w-2xl font-display text-3xl leading-[1.2] tracking-wide text-ink sm:text-4xl lg:text-[2.75rem]"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-10">
            <motion.div
              {...fadeUp}
              className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-bronze/50 bg-cream-deep/50"
            >
              <p className="font-sans text-xs italic text-ink-soft/50">
                Mapa — endereço a confirmar
              </p>
            </motion.div>

            <motion.dl
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="space-y-6 border-t border-cream-line pt-6"
            >
              {info.map((item) => (
                <div key={item.label}>
                  <dt className="font-sans text-xs font-medium tracking-[0.2em] text-bronze uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-sans text-base italic text-ink-soft/60">
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
