"use client";

import { SplitReveal } from "@/components/split-reveal";
import { useMagnetic } from "@/hooks/use-magnetic";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function CtaFinal() {
  const whatsappHref = getWhatsAppLink();
  const primaryHref = whatsappHref ?? "#contato";
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10 lg:px-8">
        <SplitReveal
          as="h2"
          text="Agende sua avaliação e descubra o seu equilíbrio ideal"
          className="font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl lg:text-5xl"
        />
        <p className="mx-auto mt-6 max-w-md font-sans text-base leading-relaxed text-foreground/65">
          Converse com a gente, sem compromisso, e entenda como podemos
          cuidar da sua beleza com ciência e sensibilidade.
        </p>
        <a
          ref={magneticRef}
          href={primaryHref}
          target={whatsappHref ? "_blank" : undefined}
          rel={whatsappHref ? "noopener noreferrer" : undefined}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-accent-solid px-10 py-4 text-sm font-medium tracking-wide text-accent-solid-foreground transition-opacity duration-300 hover:opacity-90"
        >
          Agendar minha avaliação
        </a>
      </div>
    </section>
  );
}
