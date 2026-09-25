export function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="mb-6 font-sans text-xs font-medium tracking-[0.35em] text-accent-text uppercase">
      {number} — {title}
    </p>
  );
}
