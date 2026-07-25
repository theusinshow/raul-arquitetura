"use client";

import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { atuacao, numeros } from "@/data/estudio";
import { useReveal } from "@/lib/useReveal";

/**
 * Números do estúdio + frentes de atuação. Bloco seco, tabular, que fecha a
 * parte branca da página antes da batida preta final.
 */
export default function Numeros() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} data-respiro="4" className="bg-paper">
      <Grid>
        <h2 className="col-span-4 text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.02em] text-ink md:col-span-6 lg:col-span-7">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              Dez anos,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block text-graphite">
              quatorze obras.
            </span>
          </span>
        </h2>
      </Grid>

      <Grid className="mt-16 gap-y-12 md:mt-20">
        <dl className="col-span-4 grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-8 lg:col-span-7">
          {numeros.map((n) => (
            <div
              key={n.label}
              data-reveal="fade"
              className="flex flex-col gap-3 border-t border-line pt-4"
            >
              <dt className="mono text-graphite">{n.label}</dt>
              <dd className="text-[clamp(1.75rem,3.5vw,3rem)] leading-none font-medium tracking-[-0.03em] text-ink">
                {n.valor}
              </dd>
            </div>
          ))}
        </dl>

        <div
          data-reveal="fade"
          className="col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-10"
        >
          <h3 className="mono border-t border-line pt-4 text-graphite">
            Frentes de atuação
          </h3>
          <ul className="mt-6 flex flex-col gap-3">
            {atuacao.map((frente) => (
              <li key={frente} className="text-lg text-ink">
                {frente}
              </li>
            ))}
          </ul>
        </div>
      </Grid>
    </section>
  );
}
