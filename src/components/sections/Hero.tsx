"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/** Tons neutros para os placeholders enquanto não há fotografia real. */
const TONES = [
  "#d4d4cf",
  "#bcbcb7",
  "#c9c9c4",
  "#b1b1ac",
  "#cececa",
  "#c1c1bc",
  "#b7b7b2",
  "#c6c6c1",
  "#aeaea9",
  "#cbcbc6",
  "#bdbdb8",
  "#d0d0cb",
  "#b4b4af",
  "#c4c4bf",
];

/** Duração de cada projeto no palco. Casada com a barra de progresso (CSS). */
const DURACAO = 4200;

const total = String(projects.length).padStart(2, "0");

/**
 * Hero — uma única fotografia ocupando a tela inteira, passando
 * automaticamente em preto e branco (cor no hover), com a navbar sobreposta.
 *
 * A faixa de 14 miniaturas que existia aqui foi removida: era o terceiro
 * índice do portfólio na mesma página (Projetos Selecionados mostra 03 obras,
 * Mais Projetos as outras 10), e a 90px por frame nenhuma delas era legível.
 * No lugar entram controles do próprio slideshow — ‹ › , contador e barra de
 * progresso — que dão ao visitante o comando que a faixa dava, sem repetir a
 * lista. Respeita prefers-reduced-motion (sem rotação, sem intro, sem barra).
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const ir = useCallback(
    (passo: number) =>
      setActive((cur) => (cur + passo + projects.length) % projects.length),
    [],
  );

  // Avanço automático. Depende de `active`, então navegar no ‹ › reinicia a
  // contagem — cada projeto ganha o tempo inteiro no palco.
  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setTimeout(() => ir(1), DURACAO);
    return () => window.clearTimeout(id);
  }, [active, ir]);

  // Intro discreta.
  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-stage]", { autoAlpha: 0 });
      gsap.set("[data-hud]", { autoAlpha: 0, y: 12 });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to("[data-stage]", { autoAlpha: 1, duration: 1 }, 0).to(
        "[data-hud]",
        { autoAlpha: 1, y: 0, duration: 0.8 },
        0.4,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const current = projects[active];

  return (
    <section
      ref={root}
      aria-label="Projetos em destaque"
      aria-roledescription="carrossel"
      className="group relative h-dvh overflow-hidden bg-void"
    >
      {/* O hero é fotográfico, então o h1 é apenas textual. */}
      <h1 className="sr-only">
        {site.name} — {site.description}
      </h1>

      <div data-stage className="absolute inset-0">
        {projects.map((p, i) => (
          <div
            key={p.slug}
            aria-hidden={i !== active}
            className={
              "absolute inset-0 grayscale transition-[opacity,filter] duration-1000 ease-out group-hover:grayscale-0 " +
              (i === active ? "opacity-100" : "opacity-0")
            }
            style={p.cover ? undefined : { background: TONES[i % TONES.length] }}
          >
            {p.cover ? (
              <Image
                src={p.cover}
                alt={p.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center">
                <span className="mono text-graphite">{p.title}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scrim superior — mantém a navbar (texto escuro) legível */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-paper/85 to-transparent" />

      {/* Scrim inferior — garante leitura da legenda sobre qualquer foto */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-void/75 to-transparent" />

      {/* Legenda, link do projeto ativo e controles */}
      <div data-hud className="grid-shell absolute inset-x-0 bottom-0 z-10 pb-8">
        <div className="col-span-4 flex items-end justify-between gap-6 md:col-span-8 lg:col-span-12">
          <div>
            <p className="mono text-paper">
              {current.title} — {current.location} · {current.year}
            </p>
            <Link
              href={`/projetos/${current.slug}`}
              className="group/link mt-4 inline-flex items-center gap-3 border-b border-paper/50 pb-2 transition-colors duration-300 hover:border-paper"
            >
              <span className="mono text-paper">Ver projeto</span>
              <span className="mono text-paper transition-transform duration-300 group-hover/link:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <button
              type="button"
              onClick={() => ir(-1)}
              aria-label="Projeto anterior"
              className="mono px-1 text-paper transition-opacity duration-300 hover:opacity-50"
            >
              ‹
            </button>
            <p className="mono text-paper tabular-nums">
              {current.index} / {total}
            </p>
            <button
              type="button"
              onClick={() => ir(1)}
              aria-label="Próximo projeto"
              className="mono px-1 text-paper transition-opacity duration-300 hover:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Progresso da rotação — reinicia a cada projeto (key={active}) */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-paper/25">
        <div key={active} className="progresso-hero h-full bg-paper" />
      </div>
    </section>
  );
}
