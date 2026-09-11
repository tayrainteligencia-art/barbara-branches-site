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

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
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
