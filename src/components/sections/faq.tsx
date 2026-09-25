"use client";

import { useState } from "react";
import { SplitReveal } from "@/components/split-reveal";
import { SectionLabel } from "@/components/section-label";

const faqs = [
  {
    question: "Como funciona a primeira avaliação?",
    answer:
      "Na primeira consulta, conversamos sobre seus objetivos e expectativas, analisamos sua pele e desenhamos juntos um plano de tratamento personalizado.",
  },
  {
    question: "Os procedimentos doem?",
    answer:
      "A sensação varia de pessoa para pessoa e de acordo com a técnica utilizada. Explicamos cada etapa antes de começar e usamos os recursos adequados para o seu conforto.",
  },
  {
    question: "Quanto tempo dura um tratamento?",
    answer:
      "Depende do tipo de procedimento e do plano definido na avaliação. Todos os prazos são explicados individualmente antes do início do tratamento.",
  },
  {
    question: "Os resultados são garantidos?",
    answer:
      "Não prometemos resultados garantidos: cada pessoa responde de forma diferente aos procedimentos. Nosso compromisso é com técnica, segurança e acompanhamento em todas as etapas.",
  },
  {
    question: "Como faço para agendar uma avaliação?",
    answer:
      "Você pode entrar em contato pelo botão de WhatsApp ou pelo formulário no final desta página. Responderemos com os próximos passos para o agendamento.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-8">
        <SectionLabel number="08" title="Perguntas frequentes" />
        <SplitReveal
          as="h2"
          text="Dúvidas comuns antes de agendar"
          className="font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl"
        />

        <div className="mt-12 border-t border-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={faq.question} className="border-b border-border">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="font-display text-lg tracking-wide text-foreground sm:text-xl">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative h-4 w-4 shrink-0 text-accent-text"
                    >
                      <span className="absolute inset-y-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                      <span
                        className={`absolute inset-x-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-300 ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 font-sans text-sm leading-relaxed text-foreground/75 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
