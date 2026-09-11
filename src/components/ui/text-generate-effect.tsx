"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.2,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  /** intervalo entre o início da animação de cada palavra */
  staggerDelay?: number;
}) => {
  const [scope, animate] = useAnimate();
  const reducedMotion = useReducedMotion();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (reducedMotion) return;
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration, delay: stagger(staggerDelay) },
    );
  }, [reducedMotion, duration, filter, staggerDelay, animate]);

  return (
    <motion.div ref={scope} className={cn("font-sans", className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="text-foreground"
          style={
            reducedMotion
              ? undefined
              : { opacity: 0, filter: filter ? "blur(10px)" : "none" }
          }
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );
};
