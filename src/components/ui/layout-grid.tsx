"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  label: string;
  content: ReactNode;
  className: string;
};

const PlaceholderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-10 w-10 text-accent-text/50"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
  >
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <circle cx="8.5" cy="10" r="1.5" />
    <path d="M21 16l-5.5-5.5a1.5 1.5 0 0 0-2.12 0L5 19" />
  </svg>
);

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const triggerRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const close = () => {
    setSelected((current) => {
      if (current) triggerRefs.current[current.id]?.focus();
      return null;
    });
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <div className="relative mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          ref={(el) => {
            triggerRefs.current[card.id] = el;
          }}
          onClick={() => setSelected(card)}
          aria-haspopup="dialog"
          className={cn(
            card.className,
            "group relative overflow-hidden rounded-xl border border-dashed border-accent-text/50 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text",
          )}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
            <PlaceholderIcon />
            <p className="font-sans text-xs italic text-foreground/50">
              Foto: {card.label} — a confirmar
            </p>
          </div>
        </button>
      ))}

      {selected && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={selected.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-6"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex w-full max-w-lg flex-col items-center gap-4 rounded-2xl border border-border bg-background p-10 text-center"
          >
            <PlaceholderIcon />
            <p className="font-display text-xl tracking-wide text-foreground">
              {selected.label}
            </p>
            <div className="font-sans text-sm leading-relaxed text-foreground/70">
              {selected.content}
            </div>
            <button
              type="button"
              onClick={close}
              className="mt-2 rounded-full border border-border px-6 py-2 font-sans text-sm text-foreground transition-colors hover:border-foreground/40"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
