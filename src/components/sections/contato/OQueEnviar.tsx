"use client";

import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { briefing } from "@/data/contato";
import { useReveal } from "@/lib/useReveal";

/**
 * O que enviar no primeiro e-mail. Sem formulário, esta lista faz o trabalho
 * que os campos fariam — e faz melhor, porque explica por que cada coisa
 * importa. Capítulo escuro da página: encosta no Footer e, por ser preto,
 * carrega o kicker mono.
 */
export default function OQueEnviar() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section
      ref={root}
      data-nav="invert"
      data-respiro="5"
      className="bg-ink text-paper"
    >
      <Grid>
        <div className="col-span-4 flex items-center justify-between border-t border-graphite pt-4 md:col-span-8 lg:col-span-12">
          <span data-reveal="fade" className="mono text-mute">
            Primeiro e-mail
          </span>
          <span data-reveal="fade" className="mono text-mute">
            Quatro itens
          </span>
        </div>
      </Grid>

      <Grid className="mt-12 md:mt-16">
        <h2 className="col-span-4 text-[clamp(1.875rem,5vw,4rem)] leading-[1.02] font-medium tracking-[-0.03em] md:col-span-7 lg:col-span-9">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              O que mandar junto
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block text-mute">
              para a conversa render.
            </span>
          </span>
        </h2>
      </Grid>

      <Grid className="mt-16 gap-y-12 md:mt-24">
        {briefing.map((item) => (
          <div
            key={item.n}
            data-reveal="fade"
            className="col-span-4 flex flex-col gap-3 border-t border-graphite pt-4 md:col-span-4 lg:col-span-3"
          >
            <span className="mono text-mute">{item.n}</span>
            <h3 className="text-xl font-medium tracking-tight">
              {item.titulo}
            </h3>
            <p className="max-w-[36ch] text-sm leading-relaxed text-paper/70">
              {item.texto}
            </p>
          </div>
        ))}
      </Grid>
    </section>
  );
}
