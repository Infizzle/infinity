import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Results } from "@/components/Results";
import { About } from "@/components/About";
import { Process } from "@/components/Process";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Results />
      <About />
      <Process />
    </main>
  );
}
