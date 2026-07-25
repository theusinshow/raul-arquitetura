"use client";

import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { contato } from "@/lib/site";
import { useReveal } from "@/lib/useReveal";

/**
 * Abertura da /contato — branca e direta. A Home abre em fotografia e a
 * /sobre em preto; esta abre no próprio endereço de e-mail, em escala de
 * display, porque é a única coisa que a página precisa entregar.
 *
 * O `pt` é próprio: no topo o espaço é vão para a navbar, não ritmo.
 */
export default function Abertura() {
  const root = useRef<HTMLElement>(null);
  useReveal(root, "top 90%");

  return (
    <section
      ref={root}
      data-respiro="1"
      className="bg-paper pt-32 md:pt-44 lg:pt-52"
    >
      <Grid>
        <h1 className="col-span-4 text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.02em] text-ink md:col-span-6 lg:col-span-7">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              Fale com o estúdio.
            </span>
          </span>
        </h1>
      </Grid>

      <Grid className="mt-12 gap-y-10 md:mt-16">
        <a
          href={`mailto:${contato.email}`}
          className="group col-span-4 inline-flex items-baseline gap-4 border-b border-ink pb-4 md:col-span-8 lg:col-span-9"
        >
          <span
            data-reveal="fade"
            className="text-[clamp(1.75rem,6vw,5rem)] leading-none font-medium tracking-[-0.03em] text-ink"
          >
            {contato.email}
          </span>
          <span className="mono text-ink transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        <a
          data-reveal="fade"
          href={`tel:${contato.telefoneHref}`}
          className="col-span-4 text-lg text-graphite transition-opacity duration-300 hover:opacity-60 md:col-span-4 lg:col-span-3 lg:col-start-10 lg:text-right"
        >
          {contato.telefone}
        </a>
      </Grid>
    </section>
  );
}
