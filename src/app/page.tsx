import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Treatments } from "@/components/sections/treatments";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <Treatments />
    </main>
  );
}
