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
    <section ref={root} className="bg-paper pb-28 md:pb-36">
      <Grid>
        <div className="col-span-4 flex items-center justify-between border-t border-ink pt-4 md:col-span-8 lg:col-span-12">
          <span data-reveal="fade" className="mono text-graphite">
            O estúdio
          </span>
          <span data-reveal="fade" className="mono text-graphite">
            São Paulo, BR
          </span>
        </div>
      </Grid>

      <Grid className="mt-12 gap-y-12 md:mt-16">
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
          <h2 className="mono border-t border-line pt-4 text-graphite">
            Frentes de atuação
          </h2>
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
