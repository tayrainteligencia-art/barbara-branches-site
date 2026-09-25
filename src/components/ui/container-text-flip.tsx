"use client";

import { useState, useEffect, useRef, useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["ciência", "beleza", "harmonia"],
  interval = 2500,
  className,
  textClassName,
  animationDuration = 500,
}: ContainerTextFlipProps) {
  const id = useId();
  const reducedMotion = useReducedMotion();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const [inView, setInView] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.scrollWidth + 30);
    }
  }, [currentWordIndex]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !inView) return;

    const tick = () =>
      setCurrentWordIndex((prev) => (prev + 1) % words.length);

    let intervalId = setInterval(tick, interval);

    const onVisibility = () => {
      clearInterval(intervalId);
      if (document.visibilityState === "visible") {
        intervalId = setInterval(tick, interval);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [words, interval, reducedMotion, inView]);

  return (
    <motion.div
      ref={rootRef}
      layout
      animate={{ width: reducedMotion ? "auto" : width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg border border-border pt-2 pb-3 text-center font-display text-4xl text-accent-text md:text-7xl",
        className,
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        ref={textRef}
        transition={{ duration: animationDuration / 1000, ease: "easeInOut" }}
        className={cn("inline-block px-4", textClassName)}
        layoutId={reducedMotion ? undefined : `word-div-${words[currentWordIndex]}-${id}`}
      >
        {reducedMotion ? (
          words[currentWordIndex]
        ) : (
          <motion.div className="inline-block">
            {words[currentWordIndex].split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: index * 0.02 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
