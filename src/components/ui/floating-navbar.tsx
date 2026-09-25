"use client";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export const FloatingNav = ({
  navItems,
  cta,
  brand,
  end,
  className,
}: {
  navItems: { name: string; link: string }[];
  cta: { name: string; link: string; external?: boolean };
  brand?: React.ReactNode;
  end?: React.ReactNode;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  // Visível por padrão: no topo (scrollY inicial 0) o navbar deve aparecer
  // já no primeiro render, sem esperar o primeiro evento de scroll.
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  // Topo da página: sempre visível, mesmo com pequenas oscilações de
  // scroll (bounce de touch no mobile) — evita flicker perto de scrollY 0.
  const TOP_THRESHOLD = 20;

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current !== "number") return;

    if (current <= TOP_THRESHOLD) {
      setVisible(true);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    if (current < previous) {
      setVisible(true);
    } else if (current > previous) {
      setVisible(false);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
        className={cn(
          "fixed inset-x-0 top-6 z-50 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center justify-center",
          className,
        )}
      >
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/85 px-2 py-1.5 backdrop-blur-md">
          {brand}

          <div className="hidden items-center gap-1 sm:flex">
            {navItems.map((navItem) => (
              <a
                key={navItem.link}
                href={navItem.link}
                className="rounded-full px-4 py-2 font-sans text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {navItem.name}
              </a>
            ))}
          </div>

          <div className="hidden h-5 w-px bg-border sm:block" />

          {end}

          <a
            href={cta.link}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            className="rounded-full bg-accent-solid px-4 py-2 font-sans text-sm font-medium text-accent-solid-foreground transition-opacity hover:opacity-90"
          >
            {cta.name}
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
