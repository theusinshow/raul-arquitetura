"use client";

import Link from "next/link";
import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { Figure } from "@/components/ui/Figure";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { projects } from "@/data/projects";

const featured = projects[0];

/**
 * Projeto Destaque — composição editorial: título grande em Urbanist com a
 * fotografia deslocada assimetricamente à direita, metadados em Fragment Mono
 * e link para o projeto. Reveal por scroll (máscara de linhas + clip-path),
 * respeitando prefers-reduced-motion.
 */
export default function ProjetoDestaque() {
  const root = useRef<HTMLElement>(null);
  const words = featured.title.split(" ");

  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-d="line"]', { yPercent: 115 });
      gsap.set('[data-d="fig"]', { clipPath: "inset(0 0 100% 0)" });
      gsap.set('[data-d="fade"]', { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      tl.to('[data-d="fig"]', { clipPath: "inset(0 0 0% 0)", duration: 1.1 }, 0)
        .to('[data-d="line"]', { yPercent: 0, duration: 1, stagger: 0.1 }, 0.1)
        .to('[data-d="fade"]', { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.5);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-24 md:py-32 lg:py-40">
      {/* Cabeçalho da seção */}
      <Grid>
        <div className="col-span-4 flex items-center justify-between border-t border-ink pt-4 md:col-span-8 lg:col-span-12">
          <span data-d="fade" className="mono text-graphite">
            Projeto em destaque
          </span>
          <span data-d="fade" className="mono text-graphite">
            {featured.category} · {featured.index}
          </span>
        </div>
      </Grid>

      {/* Título grande + foto deslocada */}
      <Grid className="relative mt-10 md:mt-16">
        <h2 className="col-span-4 text-[clamp(3rem,11vw,9.5rem)] leading-[0.9] font-medium tracking-[-0.03em] text-ink md:col-span-5 lg:col-span-7">
          {words.map((w, i) => (
            <span key={i} className="block overflow-hidden">
              <span data-d="line" className="block">
                {w}
              </span>
            </span>
          ))}
        </h2>

        <div
          data-d="fig"
          className="col-span-4 mt-10 [will-change:clip-path] md:col-span-4 md:col-start-5 md:mt-20 lg:col-span-5 lg:col-start-8 lg:mt-28"
        >
          <div className="grayscale transition-[filter] duration-700 ease-out hover:grayscale-0">
            <Figure
              src={featured.cover}
              alt={`${featured.title}, ${featured.location}`}
              index={featured.index}
              caption={`${featured.title} · ${featured.year}`}
              className="aspect-4/5 w-full"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>
        </div>
      </Grid>

      {/* Metadados + link */}
      <Grid className="mt-14 items-end gap-y-10 md:mt-20">
        <dl
          data-d="fade"
          className="col-span-4 grid grid-cols-2 gap-y-7 md:col-span-6 lg:col-span-6"
        >
          <Meta label="Local" value={featured.location} />
          <Meta label="Ano" value={String(featured.year)} />
          <Meta label="Categoria" value={featured.category} />
          <Meta label="Área" value={featured.area} />
        </dl>

        <div
          data-d="fade"
          className="col-span-4 md:col-span-2 md:col-start-7 lg:col-span-3 lg:col-start-10 lg:justify-self-end"
        >
          <Link
            href={`/projetos/${featured.slug}`}
            className="group inline-flex items-center gap-3 border-b border-ink pb-2"
          >
            <span className="mono text-ink">Ver projeto</span>
            <span className="mono text-ink transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Grid>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="mono text-graphite">{label}</dt>
      <dd className="text-lg text-ink">{value}</dd>
    </div>
  );
}
