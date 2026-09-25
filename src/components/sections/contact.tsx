"use client";

import { motion } from "motion/react";
import { SplitReveal } from "@/components/split-reveal";
import { ContactForm } from "@/components/contact-form";
import { SectionLabel } from "@/components/section-label";
import { useFadeUp } from "@/hooks/use-fade-up";

const ENDERECO = "Rua Mauriti, 2159 — Pedreira, Belém - PA, 66087-680";
// URL final do embed (sem depender do redirect de /maps?q=...&output=embed,
// que soma um hop a mais e não carrega de forma confiável dentro de um iframe).
const MAPS_EMBED_SRC = `https://www.google.com/maps/embed?pb=!1m2!2m1!1s${encodeURIComponent(
  `Nuclear Center Clínica de Diagnósticos por Imagens, ${ENDERECO}`,
)}`;

// TODO(PENDENCIAS.md): horário de funcionamento real da clínica.
const info = [
  { label: "Endereço", value: ENDERECO },
  { label: "Telefone", value: "(91) 3245-3397" },
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
              className="aspect-video w-full overflow-hidden rounded-2xl border border-border"
            >
              <iframe
                src={MAPS_EMBED_SRC}
                title="Localização — Bárbara Branches"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
