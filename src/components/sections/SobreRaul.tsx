"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { projects } from "@/data/projects";
import { useReveal } from "@/lib/useReveal";

const faixa = projects[7];

const DADOS = [
  { label: "Fundado", valor: "2016" },
  { label: "Base", valor: "São Paulo, BR" },
  { label: "Atuação", valor: "Brasil e Portugal" },
];

/**
 * Sobre RAUL — bloco editorial curto (o texto completo vive em /sobre),
 * fechado por uma faixa de fotografia que atravessa toda a viewport.
 */
export default function SobreRaul() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="py-24 md:py-32 lg:py-40">
      <Grid>
        <div className="col-span-4 flex items-center justify-between border-t border-ink pt-4 md:col-span-8 lg:col-span-12">
          <span data-reveal="fade" className="mono text-graphite">
            Sobre RAUL
          </span>
          <span data-reveal="fade" className="mono text-graphite">
            Estúdio
          </span>
        </div>
      </Grid>

      <Grid className="mt-12 gap-y-12 md:mt-16">
        <p className="col-span-4 text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.2] font-medium tracking-[-0.02em] text-ink md:col-span-8 lg:col-span-7">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              Um estúdio pequeno, por escolha.
            </span>
          </span>
          <span className="mt-2 block text-graphite">
            <span className="block overflow-hidden">
              <span data-reveal="line" className="block">
                Poucos projetos por ano, cada um
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-reveal="line" className="block">
                acompanhado do desenho à obra.
              </span>
            </span>
          </span>
        </p>

        <dl
          data-reveal="fade"
          className="col-span-4 flex flex-col gap-6 md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-10"
        >
          {DADOS.map((d) => (
            <div key={d.label} className="flex flex-col gap-2 border-t border-line pt-3">
              <dt className="mono text-graphite">{d.label}</dt>
              <dd className="text-lg text-ink">{d.valor}</dd>
            </div>
          ))}
          <Link
            href="/sobre"
            className="group mt-2 inline-flex items-center gap-3 self-start border-b border-ink pb-2"
          >
            <span className="mono text-ink">Sobre o estúdio</span>
            <span className="mono text-ink transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </dl>
      </Grid>

      {/* Faixa de fotografia — atravessa toda a viewport */}
      <div className="grid-shell mt-20 md:mt-28">
        <div
          data-reveal="fig"
          className="bleed relative aspect-[16/10] overflow-hidden md:aspect-[21/9] [will-change:clip-path]"
        >
          <Image
            src={faixa.cover ?? ""}
            alt={`${faixa.title}, ${faixa.location}`}
            fill
            sizes="100vw"
            className="object-cover grayscale transition-[filter] duration-700 ease-out hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
}
