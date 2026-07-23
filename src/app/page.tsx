import Hero from "@/components/sections/Hero";
import ProjetoDestaque from "@/components/sections/ProjetoDestaque";

/**
 * Home — construída seção a seção. Por ora: Hero + Projeto Destaque. As
 * próximas seções (Projetos Selecionados, Manifesto, etc.) entram uma a uma.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <ProjetoDestaque />
    </main>
  );
}
