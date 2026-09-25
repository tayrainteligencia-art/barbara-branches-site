"use client";
import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  // rastreia o scroll da página (não um container interno com overflow) —
  // uma área internamente rolável entraria em conflito com o Lenis.
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div ref={ref} className="relative flex justify-center gap-10">
      <div className="max-w-2xl flex-1">
        {content.map((item, index) => (
          <div key={item.title} className="py-16 first:pt-0 last:pb-0">
            <motion.h3
              animate={{ opacity: activeCard === index ? 1 : 0.35 }}
              className="font-display text-2xl tracking-wide text-foreground md:text-3xl"
            >
              {item.title}
            </motion.h3>
            <motion.p
              animate={{ opacity: activeCard === index ? 1 : 0.35 }}
              className="mt-4 max-w-sm font-sans text-base leading-relaxed text-foreground/80"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "sticky top-32 hidden h-72 w-72 shrink-0 items-center justify-center self-start rounded-2xl border border-border lg:flex",
          contentClassName,
        )}
      >
        {content[activeCard].content}
      </div>
    </div>
  );
};
