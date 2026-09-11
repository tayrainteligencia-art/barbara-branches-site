import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";

// Abaixo da dobra: dynamic() mantém o HTML gerado no servidor (sem CLS, sem
// flash de conteúdo ausente) mas separa o JS de cada seção em chunks próprios,
// em vez de tudo (GSAP, motion/react, cada componente Aceternity) num único
// bundle carregado e executado de uma vez — é o que fazia o Lighthouse cair
// de 77 para 68 em Performance (TBT de 850ms) na primeira versão do redesign.
const About = dynamic(() => import("@/components/sections/about").then((m) => m.About));
const Treatments = dynamic(() =>
  import("@/components/sections/treatments").then((m) => m.Treatments),
);
const Differentiators = dynamic(() =>
  import("@/components/sections/differentiators").then((m) => m.Differentiators),
);
const CtaMid = dynamic(() => import("@/components/sections/cta-mid").then((m) => m.CtaMid));
const Professional = dynamic(() =>
  import("@/components/sections/professional").then((m) => m.Professional),
);
const Gallery = dynamic(() => import("@/components/sections/gallery").then((m) => m.Gallery));
const HowItWorks = dynamic(() =>
  import("@/components/sections/how-it-works").then((m) => m.HowItWorks),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials),
);
const Faq = dynamic(() => import("@/components/sections/faq").then((m) => m.Faq));
const CtaFinal = dynamic(() => import("@/components/sections/cta-final").then((m) => m.CtaFinal));
const Contact = dynamic(() => import("@/components/sections/contact").then((m) => m.Contact));

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
      <CtaMid />
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
