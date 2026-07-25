"use client";

import Image from "next/image";
import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { Figure } from "@/components/ui/Figure";
import { metodo, faixaSlug, type Etapa } from "@/data/estudio";
import { projects } from "@/data/projects";
import { useReveal } from "@/lib/useReveal";

const faixa = projects.find((p) => p.slug === faixaSlug);

/**
 * Layout de cada etapa. Nenhuma medida se repete entre etapas — proporção da
 * foto, largura das colunas e deslocamento vertical mudam sempre — para que o
 * arranjo alternado não leia como template. Classes são estáticas de propósito
 * (o Tailwind não enxerga nomes montados em runtime).
 */
const LAYOUT = [
  {
    texto: "lg:col-span-4 lg:col-start-1",
    foto: "lg:col-span-5 lg:col-start-8 lg:mt-16",
    aspecto: "aspect-[4/5]",
    sizes: "(max-width: 1024px) 100vw, 40vw",
  },
  {
    texto: "lg:col-span-4 lg:col-start-9",
    foto: "lg:col-span-6 lg:col-start-2",
    aspecto: "aspect-[3/2]",
    sizes: "(max-width: 1024px) 100vw, 48vw",
  },
  {
    texto: "lg:col-span-4 lg:col-start-2",
    foto: "lg:col-span-4 lg:col-start-8 lg:mt-28",
    aspecto: "aspect-square",
    sizes: "(max-width: 1024px) 100vw, 32vw",
  },
  {
    texto: "lg:col-span-3 lg:col-start-10",
    foto: "lg:col-span-8 lg:col-start-1 lg:mt-12",
    aspecto: "aspect-[16/9]",
    sizes: "(max-width: 1024px) 100vw, 64vw",
  },
] as const;

/**
 * Método — miolo da /sobre. Abre com a faixa de fotografia que faz a virada do
 * preto para o branco e desdobra as quatro etapas em zigue-zague. Cada etapa
 * tem seu próprio gatilho de scroll (ver componente Etapa abaixo), senão a
 * seção inteira revelaria de uma vez no topo.
 */
export default function Metodo() {
  const topo = useRef<HTMLDivElement>(null);
  useReveal(topo, "top 85%");

  return (
    <section className="bg-paper pb-24 md:pb-32 lg:pb-40">
      <div ref={topo}>
        {/* Faixa de fotografia — a virada do preto para o branco */}
        <div className="grid-shell">
          <div
            data-reveal="fig"
            className="bleed relative aspect-[16/10] overflow-hidden md:aspect-[21/9] [will-change:clip-path]"
          >
            {faixa?.cover ? (
              <Image
                src={faixa.cover}
                alt={`${faixa.title}, ${faixa.location}`}
                fill
                sizes="100vw"
                className="object-cover grayscale transition-[filter] duration-700 ease-out hover:grayscale-0"
              />
            ) : null}
          </div>
        </div>

        <Grid className="mt-20 md:mt-28">
          <div className="col-span-4 flex items-center justify-between border-t border-ink pt-4 md:col-span-8 lg:col-span-12">
            <span data-reveal="fade" className="mono text-graphite">
              Método
            </span>
            <span data-reveal="fade" className="mono text-graphite">
              Quatro etapas
            </span>
          </div>
        </Grid>

        <Grid className="mt-10 md:mt-14">
          <h2 className="col-span-4 text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.02em] text-ink md:col-span-6 lg:col-span-8">
            <span className="block overflow-hidden">
              <span data-reveal="line" className="block">
                Do primeiro encontro
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-reveal="line" className="block text-graphite">
                à última visita de obra.
              </span>
            </span>
          </h2>
        </Grid>
      </div>

      {metodo.map((etapa, i) => (
        <EtapaBloco key={etapa.n} etapa={etapa} layout={LAYOUT[i]} />
      ))}
    </section>
  );
}

function EtapaBloco({
  etapa,
  layout,
}: {
  etapa: Etapa;
  layout: (typeof LAYOUT)[number];
}) {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  const obra = projects.find((p) => p.slug === etapa.obra);
  const src = obra?.gallery?.[etapa.foto] ?? obra?.cover;

  return (
    <div ref={root}>
      <Grid className="mt-24 items-start gap-y-10 md:mt-32 lg:mt-40">
        <div className={`col-span-4 md:col-span-6 ${layout.texto}`}>
          <div className="flex items-start gap-5 border-t border-line pt-5 md:gap-7">
            <span
              aria-hidden
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.8] font-medium tracking-[-0.03em] text-line"
            >
              {etapa.n}
            </span>

            <div>
              <h3 className="overflow-hidden">
                <span data-reveal="line" className="mono block text-graphite">
                  Etapa {etapa.n} — {etapa.nome}
                </span>
              </h3>

              <p className="mt-5 text-[clamp(1.25rem,2.2vw,1.875rem)] leading-[1.15] font-medium tracking-[-0.02em] text-ink">
                <span className="block overflow-hidden">
                  <span data-reveal="line" className="block">
                    {etapa.resumo}
                  </span>
                </span>
              </p>

              <p
                data-reveal="fade"
                className="mt-6 max-w-[46ch] leading-relaxed text-graphite"
              >
                {etapa.texto}
              </p>
            </div>
          </div>
        </div>

        <div
          data-reveal="fig"
          className={`col-span-4 md:col-span-8 ${layout.foto} [will-change:clip-path]`}
        >
          <div className="grayscale transition-[filter] duration-700 ease-out hover:grayscale-0">
            <Figure
              src={src}
              alt={obra ? `Detalhe de ${obra.title}, ${obra.location}` : ""}
              caption={obra ? `${obra.title} · detalhe` : undefined}
              className={`${layout.aspecto} w-full`}
              sizes={layout.sizes}
            />
          </div>
        </div>
      </Grid>
    </div>
  );
}
