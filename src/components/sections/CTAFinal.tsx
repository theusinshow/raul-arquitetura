"use client";

import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { contato } from "@/lib/site";
import { useReveal } from "@/lib/useReveal";

/**
 * CTA Final — fechamento da Home em preto, tipográfico. Flui direto para o
 * Footer (mesmo fundo), separado apenas por uma hairline.
 */
export default function CTAFinal() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section
      ref={root}
      data-nav="invert"
      data-respiro="6"
      className="bg-ink text-paper"
    >
      <Grid>
        <div className="col-span-4 flex items-center justify-between border-t border-graphite pt-4 md:col-span-8 lg:col-span-12">
          <span data-reveal="fade" className="mono text-mute">
            Contato
          </span>
          <span data-reveal="fade" className="mono text-mute">
            Disponível para novos projetos
          </span>
        </div>
      </Grid>

      <Grid className="mt-12 md:mt-16">
        <h2 className="col-span-4 text-[clamp(2.25rem,7vw,6rem)] leading-[0.98] font-medium tracking-[-0.03em] md:col-span-8 lg:col-span-10">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              Todo projeto começa
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block text-mute">
              por uma conversa.
            </span>
          </span>
        </h2>
      </Grid>

      <Grid className="mt-16 items-end gap-y-8 md:mt-24">
        <a
          data-reveal="fade"
          href={`mailto:${contato.email}`}
          className="group col-span-4 inline-flex items-center gap-4 border-b border-paper pb-3 md:col-span-5 lg:col-span-6"
        >
          <span className="text-xl font-medium tracking-tight md:text-3xl lg:text-4xl">
            {contato.email}
          </span>
          <span className="mono transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        <div
          data-reveal="fade"
          className="col-span-4 flex flex-col gap-2 md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-10 lg:items-end"
        >
          <span className="mono text-mute">{contato.cidade}</span>
          <span className="mono text-mute">{contato.telefone}</span>
        </div>
      </Grid>
    </section>
  );
}
