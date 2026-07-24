"use client";

import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { useReveal } from "@/lib/useReveal";

const PRINCIPIOS = [
  { n: "01", nome: "Lugar", texto: "A forma é consequência do terreno, não o ponto de partida." },
  { n: "02", nome: "Matéria", texto: "Poucos materiais, usados pelo que são — sem revestir a origem." },
  { n: "03", nome: "Precisão", texto: "O detalhe resolve o encontro entre duas intenções." },
];

/**
 * Manifesto — batida preta da Home. Seção puramente tipográfica (sem
 * fotografia), para contrastar com as seções de imagem que a cercam.
 */
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section
      ref={root}
      data-nav="invert"
      className="bg-ink py-28 text-paper md:py-36 lg:py-44"
    >
      <Grid>
        <div className="col-span-4 flex items-center justify-between border-t border-graphite pt-4 md:col-span-8 lg:col-span-12">
          <span data-reveal="fade" className="mono text-mute">
            Manifesto
          </span>
          <span data-reveal="fade" className="mono text-mute">
            RAUL — 2016
          </span>
        </div>
      </Grid>

      <Grid className="mt-12 md:mt-16">
        <h2 className="col-span-4 text-[clamp(2.25rem,7vw,6rem)] leading-[0.98] font-medium tracking-[-0.03em] md:col-span-7 lg:col-span-9">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              Projetamos a partir
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block text-mute">
              do lugar.
            </span>
          </span>
        </h2>
      </Grid>

      <Grid className="mt-14 gap-y-8 md:mt-20">
        <p
          data-reveal="fade"
          className="col-span-4 max-w-[52ch] leading-relaxed text-paper/80 md:col-span-4 lg:col-span-4 lg:col-start-2"
        >
          Cada obra começa por uma leitura precisa do terreno: a orientação, a
          topografia, a luz que atravessa o dia. Desenhar é ordenar o que já
          existe antes de acrescentar.
        </p>
        <p
          data-reveal="fade"
          className="col-span-4 max-w-[52ch] leading-relaxed text-paper/80 md:col-span-4 lg:col-span-4 lg:col-start-7"
        >
          Trabalhamos com poucos materiais e muita atenção. Concreto, madeira,
          pedra e vidro — usados pelo que são. O tempo, que desgasta e assenta,
          faz parte do projeto.
        </p>
      </Grid>

      <Grid className="mt-20 gap-y-10 md:mt-28">
        {PRINCIPIOS.map((p) => (
          <div
            key={p.n}
            data-reveal="fade"
            className="col-span-4 flex flex-col gap-3 border-t border-graphite pt-4 md:col-span-4 lg:col-span-3"
          >
            <span className="mono text-mute">{p.n}</span>
            <h3 className="text-xl font-medium tracking-tight">{p.nome}</h3>
            <p className="max-w-[34ch] text-sm leading-relaxed text-paper/70">
              {p.texto}
            </p>
          </div>
        ))}
      </Grid>
    </section>
  );
}
