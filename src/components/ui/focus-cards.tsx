"use client";

import { memo, useState } from "react";
import { cn } from "@/lib/utils";

type Card = {
  title: string;
  description: string;
};

const FocusCard = memo(function FocusCard({
  card,
  index,
  hovered,
  setHovered,
}: {
  card: Card;
  index: number;
  hovered: number | null;
  setHovered: (index: number | null) => void;
}) {
  return (
    <div
      tabIndex={0}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(index)}
      onBlur={() => setHovered(null)}
      className={cn(
        "group relative h-60 w-full rounded-lg border border-border p-6 transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text md:h-72",
        hovered !== null && hovered !== index && "scale-[0.98] opacity-50 blur-[1px]",
        hovered === index && "border-accent-text",
      )}
    >
      <span className="font-display text-sm text-accent-text">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 font-display text-xl tracking-wide text-foreground md:text-2xl">
        {card.title}
      </h3>
      <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/70">
        {card.description}
      </p>
      <span
        className={cn(
          "absolute bottom-6 left-6 block h-px bg-accent-solid transition-all duration-300",
          hovered === index ? "w-10" : "w-0",
        )}
      />
    </div>
  );
});

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <FocusCard
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
