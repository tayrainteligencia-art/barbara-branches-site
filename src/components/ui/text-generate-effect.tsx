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
  play = true,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  /** intervalo entre o início da animação de cada palavra */
  staggerDelay?: number;
  /** false mantém o texto invisível (mas montado, sem CLS) até virar true */
  play?: boolean;
}) => {
  const [scope, animate] = useAnimate();
  const reducedMotion = useReducedMotion();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (reducedMotion || !play) return;
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration, delay: stagger(staggerDelay) },
    );
  }, [reducedMotion, play, duration, filter, staggerDelay, animate]);

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
