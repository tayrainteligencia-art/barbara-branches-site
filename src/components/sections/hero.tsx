"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitReveal } from "@/components/split-reveal";
import { usePreloaderReady } from "@/lib/preloader-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMagnetic } from "@/hooks/use-magnetic";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Hero() {
  const ready = usePreloaderReady();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const whatsappHref = getWhatsAppLink();
  const primaryHref = whatsappHref ?? "#contato";
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const icon = iconRef.current;
    if (!section || !icon) return;

    const tween = gsap.to(icon, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-surface-dark px-6 text-cream sm:px-10 lg:px-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(176,130,74,0.16),transparent_60%)]"
      />

      <div
        ref={iconRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 opacity-[0.14] sm:h-[640px] sm:w-[640px] lg:-right-16 lg:h-[760px] lg:w-[760px]"
      >
        <Image
          src="/brand/icon.webp"
          alt=""
          fill
          priority
          sizes="760px"
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-3xl">
        <p className="mb-6 font-sans text-xs font-medium tracking-[0.35em] text-bronze-light uppercase">
          Beleza · Ciência · Harmonia
        </p>

        <SplitReveal
          as="h1"
          text="Beleza que nasce do equilíbrio entre ciência e cuidado"
          mode="immediate"
          active={ready}
          className="font-display text-4xl leading-[1.15] tracking-wide text-cream sm:text-5xl lg:text-6xl"
        />

        <p
          className={cn(
            "mt-8 max-w-xl text-balance font-sans text-base leading-relaxed text-cream/70 transition-opacity duration-700 ease-out sm:text-lg",
            ready ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: "0.65s" }}
        >
          Tratamentos estéticos personalizados, conduzidos com técnica e
          sensibilidade, para realçar a sua beleza natural.
        </p>

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
            className="inline-flex items-center justify-center rounded-full bg-bronze px-8 py-4 text-sm font-medium tracking-wide text-surface-dark transition-colors duration-300 hover:bg-bronze-light"
          >
            Agendar minha avaliação
          </a>
          <a
            href="#tratamentos"
            className="inline-flex items-center justify-center rounded-full border border-cream/25 px-8 py-4 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:border-cream/60"
          >
            Ver tratamentos
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-6 flex items-center gap-3 text-cream/40 sm:left-10 lg:left-20"
      >
        <span className="h-10 w-px bg-cream/20" />
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase">
          Role para conhecer
        </span>
      </div>
    </section>
  );
}
