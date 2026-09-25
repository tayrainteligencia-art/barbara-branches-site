"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    // Em touch (celular), o scroll nativo já roda suave no compositor do
    // sistema; a camada extra de JS do Lenis (raf every frame, sincronizado
    // ao ticker do GSAP) só compete por tempo de main thread com as
    // animações de ScrollTrigger, e é uma causa conhecida de travamento
    // específico no Safari iOS. Em touch, deixamos o ScrollTrigger ouvir o
    // scroll nativo direto (comportamento padrão dele sem scroller custom).
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
