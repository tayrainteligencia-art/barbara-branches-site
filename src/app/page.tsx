import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Treatments } from "@/components/sections/treatments";
import { Differentiators } from "@/components/sections/differentiators";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <Treatments />
      <Differentiators />
    </main>
  );
}
