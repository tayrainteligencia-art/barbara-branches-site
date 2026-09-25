/**
 * Textura de grão sutil e estática (opacidade travada em 4%), via SVG
 * feTurbulence — sem dependência de asset externo e sem animação contínua
 * (o componente "noise-background" do Aceternity trazia um degradê colorido
 * animado a cada frame + uma imagem de um CDN de terceiros; muito além do
 * que o plano pedia, e exigiria pausar em aba oculta/fora da viewport).
 */
export function NoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.04] will-change-transform"
      style={{ transform: "translateZ(0)" }}
    >
      <filter id="noise-overlay-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-overlay-filter)" />
    </svg>
  );
}
