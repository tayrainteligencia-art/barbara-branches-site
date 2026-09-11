"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type SplitRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  wordClassName?: string;
  /** "scroll": revela ao entrar na viewport. "immediate": revela quando `active` vira true. */
  mode?: "scroll" | "immediate";
  active?: boolean;
  delay?: number;
};

export function SplitReveal({
  text,
  as: Tag = "p",
  className,
  wordClassName,
  mode = "scroll",
  active = true,
  delay = 0,
}: SplitRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // reducedMotion parte de `false` no primeiro render do cliente
    // (useSyncExternalStore usa o snapshot do servidor até hidratar) e só
    // corrige para o valor real logo em seguida — por isso este efeito
    // precisa reagir também à transição true, não só ignorá-la, senão as
    // palavras ficam presas em yPercent:110 (invisíveis) permanentemente.
    gsap.set(el.querySelectorAll("[data-word]"), {
      yPercent: reducedMotion ? 0 : 110,
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const wordEls = el.querySelectorAll("[data-word]");

    const animate = () => {
      gsap.to(wordEls, {
        yPercent: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        delay,
      });
    };

    if (mode === "scroll") {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: animate,
      });
      return () => trigger.kill();
    }

    if (active) animate();
  }, [reducedMotion, mode, active, delay]);

  return (
    <Tag
      ref={containerRef as React.Ref<never>}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            data-word
            className={cn("inline-block will-change-transform", wordClassName)}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
