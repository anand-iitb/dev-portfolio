import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Experience } from "@/components/experience/Experience";
import { Education } from "@/components/education/Education";
import { Projects } from "@/components/projects/Projects";
import { Recognition } from "@/components/recognition/Recognition";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Recognition />
      <Contact />
    </main>
  );
}


