"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { projects } from "@/data/projects";
import { useReveal } from "@/lib/useReveal";

/**
 * Projetos Selecionados — três obras em composições deliberadamente
 * assimétricas (span, coluna inicial, proporção e deslocamento vertical
 * distintos em cada uma), evitando a repetição de um grid de cards.
 */
const selected = projects.slice(1, 4);

const LAYOUT = [
  {
    fig: "col-span-4 md:col-span-7 lg:col-span-9 lg:col-start-1",
    meta: "col-span-4 md:col-span-8 lg:col-span-2 lg:col-start-11",
    ratio: "aspect-4/3",
    offset: "",
    sizes: "(max-width: 768px) 100vw, 74vw",
  },
  {
    fig: "col-span-4 md:col-span-6 md:col-start-3 lg:col-span-7 lg:col-start-6",
    meta: "col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-2",
    ratio: "aspect-3/4",
    offset: "mt-20 md:mt-28 lg:mt-40",
    sizes: "(max-width: 768px) 100vw, 58vw",
  },
  {
    fig: "col-span-4 md:col-span-7 md:col-start-2 lg:col-span-8 lg:col-start-3",
    meta: "col-span-4 md:col-span-8 lg:col-span-2 lg:col-start-11",
    ratio: "aspect-16/10",
    offset: "mt-20 md:mt-28 lg:mt-32",
    sizes: "(max-width: 768px) 100vw, 66vw",
  },
];

export default function ProjetosSelecionados() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} data-respiro="2">
      <Grid className="mb-16 md:mb-20">
        <h2 className="col-span-4 text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.02em] text-ink md:col-span-6 lg:col-span-7">
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block">
              Três casas, três terrenos
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal="line" className="block text-graphite">
              diferentes.
            </span>
          </span>
        </h2>
      </Grid>

      {selected.map((p, i) => {
        const l = LAYOUT[i];
        return (
          <Grid key={p.slug} className={`items-start gap-y-6 ${l.offset}`}>
            <Link
              href={`/projetos/${p.slug}`}
              data-reveal="fig"
              aria-label={p.title}
              className={`group relative block overflow-hidden will-change-[clip-path] ${l.fig} ${l.ratio}`}
            >
              <Image
                src={p.cover ?? ""}
                alt={`${p.title}, ${p.location}`}
                fill
                sizes={l.sizes}
                className="object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </Link>

            <div
              data-reveal="fade"
              className={`flex flex-col gap-3 ${l.meta} mt-2 lg:mt-6`}
            >
              <span className="mono text-graphite">{p.index}</span>
              <h3 className="text-2xl leading-tight font-medium tracking-tight text-ink lg:text-3xl">
                {p.title}
              </h3>
              <p className="mono text-graphite">
                {p.category} · {p.location}
              </p>
              <p className="mono text-graphite">
                {p.year} · {p.area}
              </p>
            </div>
          </Grid>
        );
      })}
    </section>
  );
}
