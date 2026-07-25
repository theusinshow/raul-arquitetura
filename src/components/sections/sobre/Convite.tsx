"use client";

import Link from "next/link";
import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { useReveal } from "@/lib/useReveal";

/**
 * Fecho da /sobre. Deliberadamente menor que o CTA da Home — aqui o convite
 * aponta para /contato em vez de repetir o e-mail em display. Flui direto para
 * o Footer (mesmo fundo), separado apenas por uma hairline.
 */
export default function Convite() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section
      ref={root}
      data-nav="invert"
      className="bg-ink pt-24 pb-20 text-paper md:pt-32 md:pb-24"
    >
      <Grid>
        <div className="col-span-4 flex items-center justify-between border-t border-graphite pt-4 md:col-span-8 lg:col-span-12">
          <span data-reveal="fade" className="mono text-mute">
            Próximo projeto
          </span>
          <span data-reveal="fade" className="mono text-mute">
            Brasil e Portugal
          </span>
        </div>
      </Grid>

      <Grid className="mt-12 items-end gap-y-10 md:mt-16">
        <h2 className="col-span-4 text-[clamp(1.875rem,5vw,4rem)] leading-[1] font-medium tracking-[-0.03em] md:col-span-6 lg:col-span-7">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              Há um terreno?
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block text-mute">
              Vamos visitá-lo.
            </span>
          </span>
        </h2>

        <div
          data-reveal="fade"
          className="col-span-4 md:col-span-2 md:col-start-7 lg:col-span-3 lg:col-start-10 lg:justify-self-end"
        >
          <Link
            href="/contato"
            className="group inline-flex items-center gap-3 border-b border-paper pb-2"
          >
            <span className="mono">Falar com o estúdio</span>
            <span className="mono transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Grid>
    </section>
  );
}
