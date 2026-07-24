import Hero from "@/components/sections/Hero";
import ProjetoDestaque from "@/components/sections/ProjetoDestaque";
import ProjetosSelecionados from "@/components/sections/ProjetosSelecionados";
import Manifesto from "@/components/sections/Manifesto";
import MaisProjetos from "@/components/sections/MaisProjetos";
import SobreRaul from "@/components/sections/SobreRaul";
import CTAFinal from "@/components/sections/CTAFinal";

/**
 * Home. Ritmo das seções: branco (imagem) → preto (manifesto tipográfico) →
 * branco (índice) → branco (sobre + faixa) → preto (CTA + footer).
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <ProjetoDestaque />
      <ProjetosSelecionados />
      <Manifesto />
      <MaisProjetos />
      <SobreRaul />
      <CTAFinal />
    </main>
  );
}
