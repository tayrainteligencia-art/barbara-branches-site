"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Testimonial = {
  quote: string;
  name: string;
};

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10 text-accent-text/40" fill="currentColor">
    <path d="M7.5 6C4.46 6 2 8.46 2 11.5S4.46 17 7.5 17c.34 0 .67-.03 1-.09-.6 1.6-2.02 2.8-3.77 3.05a1 1 0 0 0 .14 1.99c3.7-.27 6.63-3.37 6.63-7.02V11.5C11.5 8.46 9.04 6 6 6Zm11 0c-3.04 0-5.5 2.46-5.5 5.5S14.96 17 18 17c.34 0 .67-.03 1-.09-.6 1.6-2.02 2.8-3.77 3.05a1 1 0 0 0 .14 1.99c3.7-.27 6.63-3.37 6.63-7.02V11.5C22 8.46 19.54 6 16.5 6Z" />
  </svg>
);

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  const handleNext = () => setActive((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-12 md:grid-cols-[auto_1fr]">
      <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl border border-dashed border-accent-text/50 md:h-48 md:w-48">
        <QuoteIcon />
      </div>

      <div className="flex flex-col gap-6">
        <div aria-live="polite" className="min-h-[7rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
            >
              <p className="text-balance font-sans text-lg italic leading-relaxed text-foreground/70">
                {testimonials[active].quote}
              </p>
              <p className="mt-4 font-sans text-sm text-foreground/50">
                {testimonials[active].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Depoimento anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground/40"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Próximo depoimento"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground/40"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
