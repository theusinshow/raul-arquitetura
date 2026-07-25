"use client";

import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { contato } from "@/lib/site";
import { useReveal } from "@/lib/useReveal";

const DADOS = [
  { label: "Estúdio", valor: contato.endereco, extra: contato.cidade },
  { label: "Atendimento", valor: contato.atendimento },
  { label: "Obras em", valor: contato.atuacao },
] as const;

/**
 * Dados do estúdio. Seção branca, então abre com h2 real — o kicker mono é
 * reservado aos capítulos escuros.
 */
export default function Dados() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} data-respiro="3" className="bg-paper">
      <Grid>
        <h2 className="col-span-4 text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.02em] text-ink md:col-span-6 lg:col-span-7">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              Quatro projetos por ano.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block text-graphite">
              Respondemos todos os e-mails.
            </span>
          </span>
        </h2>
      </Grid>

      <Grid className="mt-16 gap-y-10 md:mt-20">
        <dl className="col-span-4 grid gap-x-6 gap-y-10 md:col-span-8 md:grid-cols-3 lg:col-span-10">
          {DADOS.map((d) => (
            <div
              key={d.label}
              data-reveal="fade"
              className="flex flex-col gap-3 border-t border-line pt-4"
            >
              <dt className="mono text-graphite">{d.label}</dt>
              <dd className="text-lg leading-snug text-ink">
                {d.valor}
                {"extra" in d && d.extra ? (
                  <span className="mt-1 block text-graphite">{d.extra}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </Grid>
    </section>
  );
}
