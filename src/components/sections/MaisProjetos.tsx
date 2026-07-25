"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Grid } from "@/components/layout/Grid";
import { projects } from "@/data/projects";
import { useReveal } from "@/lib/useReveal";

const restantes = projects.slice(4);

/**
 * Mais Projetos — índice tipográfico. A fotografia não se repete em cards:
 * aparece num único painel fixo à direita, trocando conforme a linha sob o
 * cursor (e ganhando cor apenas nesse momento).
 */
export default function MaisProjetos() {
  const root = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  useReveal(root);

  const active = hovered ?? 0;

  return (
    <section ref={root} className="py-24 md:py-32 lg:py-40">
      <Grid>
        <h2 className="col-span-4 text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.02em] text-ink md:col-span-6 lg:col-span-7">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              Mais {restantes.length} obras,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block text-graphite">
              do litoral à serra.
            </span>
          </span>
        </h2>
      </Grid>

      <Grid className="mt-16 md:mt-20">
        {/* Índice */}
        <div
          data-reveal="fade"
          className="col-span-4 md:col-span-8 lg:col-span-7"
          onMouseLeave={() => setHovered(null)}
        >
          {restantes.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projetos/${p.slug}`}
              onMouseEnter={() => setHovered(i)}
              className="group flex items-baseline gap-4 border-t border-line py-5 transition-opacity duration-300 md:py-6"
            >
              <span className="mono w-8 shrink-0 text-graphite">{p.index}</span>
              <h3 className="flex-1 text-xl font-medium tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-2 lg:text-2xl">
                {p.title}
              </h3>
              <span className="mono hidden w-32 shrink-0 text-graphite md:block">
                {p.category}
              </span>
              <span className="mono w-12 shrink-0 text-right text-graphite">
                {p.year}
              </span>
            </Link>
          ))}
          <div className="border-t border-line" />

          <Link
            href="/projetos"
            className="group mt-10 inline-flex items-center gap-3 border-b border-ink pb-2"
          >
            <span className="mono text-ink">Ver todos os projetos</span>
            <span className="mono text-ink transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Painel de pré-visualização (desktop) */}
        <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-3/4 w-full overflow-hidden bg-off-white">
              {restantes.map((p, i) => (
                <Image
                  key={p.slug}
                  src={p.cover ?? ""}
                  alt=""
                  aria-hidden
                  fill
                  sizes="40vw"
                  className={
                    "object-cover transition-[opacity,filter] duration-500 ease-out " +
                    (i === active ? "opacity-100" : "opacity-0") +
                    (hovered === null ? " grayscale" : " grayscale-0")
                  }
                />
              ))}
            </div>
            <p className="mono mt-3 text-graphite">
              {restantes[active].title} — {restantes[active].location}
            </p>
          </div>
        </div>
      </Grid>
    </section>
  );
}
