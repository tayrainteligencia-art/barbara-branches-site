"use client";

import { useMagnetic } from "@/hooks/use-magnetic";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function CtaMid() {
  const whatsappHref = getWhatsAppLink();
  const primaryHref = whatsappHref ?? "#contato";
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:px-10 lg:px-8">
        <p className="font-display text-xl tracking-wide text-foreground sm:text-2xl">
          Pronta para dar o próximo passo?
        </p>
        <a
          ref={magneticRef}
          href={primaryHref}
          target={whatsappHref ? "_blank" : undefined}
          rel={whatsappHref ? "noopener noreferrer" : undefined}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent-solid px-8 py-3.5 text-sm font-medium tracking-wide text-accent-solid-foreground transition-opacity duration-300 hover:opacity-90"
        >
          Agendar minha avaliação
        </a>
      </div>
    </section>
  );
}
