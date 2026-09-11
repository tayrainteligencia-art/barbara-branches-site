"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitReveal } from "@/components/split-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// TODO(PENDENCIAS.md): substituir pelos espaços reais da clínica, com fotos.
const spaces = ["Recepção", "Sala de atendimento", "Sala de espera", "Fachada"];

export function Gallery() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    gsap.set(el.querySelectorAll("[data-tile]"), {
      clipPath: reducedMotion ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const tiles = Array.from(el.querySelectorAll<HTMLElement>("[data-tile]"));

    const triggers = tiles.map((tile, i) =>
      ScrollTrigger.create({
        trigger: tile,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(tile, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            delay: (i % 2) * 0.1,
            ease: "power3.out",
          });
        },
      }),
    );

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [reducedMotion]);

  return (
    <section id="estrutura" className="bg-cream-deep py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8">
        <p className="mb-6 font-sans text-xs font-medium tracking-[0.35em] text-bronze uppercase">
          Estrutura
        </p>
        <SplitReveal
          as="h2"
          text="Um espaço pensado para o seu bem-estar"
          className="max-w-2xl font-display text-3xl leading-[1.2] tracking-wide text-ink sm:text-4xl lg:text-[2.75rem]"
        />

        <div ref={containerRef} className="mt-16 grid gap-6 sm:grid-cols-2">
          {spaces.map((space) => (
            <div
              key={space}
              data-tile
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-bronze/50 bg-cream"
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-10 w-10 text-bronze/50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <rect x="3" y="5" width="18" height="14" rx="1.5" />
                  <circle cx="8.5" cy="10" r="1.5" />
                  <path d="M21 16l-5.5-5.5a1.5 1.5 0 0 0-2.12 0L5 19" />
                </svg>
                <p className="font-sans text-xs italic text-ink-soft/50">
                  Foto: {space} — a confirmar
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
