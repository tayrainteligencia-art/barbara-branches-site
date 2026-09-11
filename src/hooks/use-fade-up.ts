"use client";

import { useReducedMotion } from "./use-reduced-motion";

type FadeUpOptions = {
  y?: number;
  duration?: number;
  amount?: number;
  delay?: number;
};

/**
 * Props prontas para <motion.div {...useFadeUp()}>. Sempre retorna valores
 * explícitos (nunca omite initial/whileInView): reducedMotion parte de
 * `false` no primeiro render do cliente e só corrige para o valor real logo
 * em seguida — se a prop some nesse meio-tempo, o whileInView configurado
 * com o valor antigo trava o elemento invisível para sempre.
 */
export function useFadeUp(options?: FadeUpOptions) {
  const reducedMotion = useReducedMotion();
  const { y = 28, duration = 0.8, amount = 0.4, delay = 0 } = options ?? {};

  if (reducedMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}
