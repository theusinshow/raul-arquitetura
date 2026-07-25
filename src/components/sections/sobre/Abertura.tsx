"use client";

import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { useReveal } from "@/lib/useReveal";

/**
 * Abertura da /sobre — batida preta de topo, puramente tipográfica. Inverte a
 * Home (que abre em fotografia) e marca a página como um capítulo à parte.
 */
export default function Abertura() {
  const root = useRef<HTMLElement>(null);
  useReveal(root, "top 90%");

  return (
    <section
      ref={root}
      data-nav="invert"
      className="bg-ink pt-32 pb-24 text-paper md:pt-44 md:pb-32 lg:pt-52"
    >
      <Grid>
        <div className="col-span-4 flex items-center justify-between border-t border-graphite pt-4 md:col-span-8 lg:col-span-12">
          <span data-reveal="fade" className="mono text-mute">
            Sobre
          </span>
          <span data-reveal="fade" className="mono text-mute">
            2016 — 2026
          </span>
        </div>
      </Grid>

      <Grid className="mt-12 md:mt-16">
        <h1 className="col-span-4 text-[clamp(2.5rem,7.5vw,6.5rem)] leading-[0.98] font-medium tracking-[-0.03em] md:col-span-8 lg:col-span-10">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              Desde 2016,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block text-mute">
              poucas obras por vez.
            </span>
          </span>
        </h1>
      </Grid>

      <Grid className="mt-14 md:mt-20">
        <p
          data-reveal="fade"
          className="col-span-4 max-w-[58ch] leading-relaxed text-paper/80 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-7"
        >
          RAUL é um estúdio de arquitetura com base em São Paulo e obras no
          Brasil e em Portugal. Trabalhamos, por escolha, com um número reduzido
          de projetos ao mesmo tempo — cada um acompanhado pelas mesmas mãos, do
          primeiro croqui à última junta.
        </p>
      </Grid>
    </section>
  );
}
