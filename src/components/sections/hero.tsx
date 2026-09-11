"use client";

import dynamic from "next/dynamic";
import { SplitReveal } from "@/components/split-reveal";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { usePreloaderReady } from "@/lib/preloader-context";
import { useMagnetic } from "@/hooks/use-magnetic";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

// Puramente decorativo (oculto no mobile, opacidade baixa) — não faz parte
// do conteúdo crítico do Hero, então não precisa bloquear o bundle inicial.
const ParallaxHeroImages = dynamic(() =>
  import("@/components/ui/parallax-hero-images").then((m) => m.ParallaxHeroImages),
);

export function Hero() {
  const ready = usePreloaderReady();

  const whatsappHref = getWhatsAppLink();
  const primaryHref = whatsappHref ?? "#contato";
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(176,130,74,0.16),transparent_60%)]"
      />

      {/* Sem fotos reais da clínica (ver PENDENCIAS.md): usa o símbolo da
      marca como camada decorativa de parallax em vez de fotografia. */}
      <ParallaxHeroImages
        images={["/brand/icon.webp", "/brand/icon.webp", "/brand/icon.webp"]}
        className="hidden sm:block"
        imageClassName="!h-16 !w-16 md:!h-24 md:!w-24 rounded-full object-contain bg-transparent shadow-none ring-0 opacity-20"
      />

      <div className="relative z-10 max-w-3xl">
        <p className="mb-6 font-sans text-xs font-medium tracking-[0.35em] text-accent-text uppercase">
          Beleza · Ciência · Harmonia
        </p>

        <SplitReveal
          as="h1"
          text="Beleza que nasce do equilíbrio entre ciência e cuidado"
          mode="immediate"
          active={ready}
          className="font-display text-4xl leading-[1.15] tracking-wide text-foreground sm:text-5xl lg:text-6xl"
        />

        <div className="mt-8 max-w-xl min-h-[3.5rem] sm:min-h-[3rem]">
          {ready && (
            <TextGenerateEffect
              words="Tratamentos estéticos personalizados, conduzidos com técnica e sensibilidade, para realçar a sua beleza natural."
              duration={0.4}
              staggerDelay={0.04}
              className="text-balance text-base leading-relaxed text-foreground/70 sm:text-lg"
            />
          )}
        </div>

        <div
          className={cn(
            "mt-10 flex flex-col gap-4 transition-opacity duration-700 ease-out sm:flex-row sm:items-center",
            ready ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: "0.85s" }}
        >
          <a
            ref={magneticRef}
            href={primaryHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-full bg-accent-solid px-8 py-4 text-sm font-medium tracking-wide text-accent-solid-foreground transition-opacity duration-300 hover:opacity-90"
          >
            Agendar minha avaliação
          </a>
          <a
            href="#tratamentos"
            className="inline-flex items-center justify-center rounded-full border border-foreground/25 px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-colors duration-300 hover:border-foreground/60"
          >
            Ver tratamentos
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-6 flex items-center gap-3 text-foreground/40 sm:left-10 lg:left-20"
      >
        <span className="h-10 w-px bg-border" />
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase">
          Role para conhecer
        </span>
      </div>
    </section>
  );
}
