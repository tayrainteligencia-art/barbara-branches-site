import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Treatments } from "@/components/sections/treatments";
import { Differentiators } from "@/components/sections/differentiators";
import { Professional } from "@/components/sections/professional";
import { Gallery } from "@/components/sections/gallery";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CtaFinal } from "@/components/sections/cta-final";
import { Contact } from "@/components/sections/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Dados estruturados com apenas os campos confirmados. Endereço, telefone e
// horário ficam de fora até serem fornecidos (ver PENDENCIAS.md) — nunca
// inventados. Tipo genérico LocalBusiness até o segmento exato da clínica
// ser confirmado (ver BRAND_ANALYSIS.md, seção 6).
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Bárbara Branches",
  description:
    "Clínica de estética que une ciência e cuidado personalizado para realçar a beleza natural.",
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-full.png`,
  image: `${siteUrl}/brand/logo-full.png`,
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <About />
      <Treatments />
      <Differentiators />
      <Professional />
      <Gallery />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <CtaFinal />
      <Contact />
    </main>
  );
}
