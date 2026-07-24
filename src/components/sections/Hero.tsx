"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
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

/**
 * Hero — palco de fotografias de projetos passando automaticamente (ordem
 * aleatória, filtro preto e branco) com a navbar sobreposta; abaixo, uma
 * faixa de frames que se expandem no hover revelando a imagem maior.
 * Respeita prefers-reduced-motion (sem auto-rotação / sem intro).
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  /** Frame da faixa sob o cursor (null = nenhum). */
  const [hoveredFrame, setHoveredFrame] = useState<number | null>(null);
  /** Índice da foto em ciclagem dentro do frame expandido. */
  const [frameSlide, setFrameSlide] = useState(0);
  const pausado = useRef(false);

  // Enquanto um frame está expandido, o palco principal pausa.
  useIsomorphicLayoutEffect(() => {
    pausado.current = hoveredFrame !== null;
  }, [hoveredFrame]);

  // Rotação automática e aleatória do palco.
  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      if (pausado.current) return;
      setActive((cur) => {
        let next = cur;
        while (next === cur) next = Math.floor(Math.random() * projects.length);
        return next;
      });
    }, 4200);

    return () => window.clearInterval(id);
  }, []);

  // Ciclagem das fotos dentro do frame expandido.
  useIsomorphicLayoutEffect(() => {
    if (hoveredFrame === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => setFrameSlide((s) => s + 1), 1400);
    return () => window.clearInterval(id);
  }, [hoveredFrame]);

  // Intro discreta (palco + frames).
  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-stage]", { autoAlpha: 0 });
      gsap.set("[data-frame]", { yPercent: 14, autoAlpha: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to("[data-stage]", { autoAlpha: 1, duration: 1 }, 0).to(
        "[data-frame]",
        { yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.05 },
        0.3,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const current = projects[active];

  return (
    <section ref={root} className="flex min-h-dvh flex-col">
      {/* Título da página — o hero é fotográfico, então o h1 é apenas textual */}
      <h1 className="sr-only">
        {site.name} — {site.description}
      </h1>

      {/* Palco — slideshow em preto e branco */}
      <div
        data-stage
        className="group relative flex-1 overflow-hidden bg-void"
        aria-roledescription="carrossel"
      >
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

        {/* Scrim superior — mantém a navbar (texto escuro) legível */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-paper/85 to-transparent" />

        {/* Scrim inferior — garante leitura da legenda sobre qualquer foto */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-void/70 to-transparent" />

        {/* Legenda do projeto ativo + contador */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 grid-shell pb-5">
          <div className="col-span-4 flex items-end justify-between md:col-span-8 lg:col-span-12">
            <p className="mono text-paper">
              {current.title} — {current.location} · {current.year}
            </p>
            <p className="mono text-paper">
              {current.index} / {String(projects.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>

      {/* Faixa de frames — expandem no hover em largura e altura (para cima),
          desktop; rolagem no mobile. items-end ancora o crescimento no rodapé. */}
      <div className="relative flex h-[30vh] items-end overflow-x-auto border-t border-ink md:h-[34vh] md:overflow-visible">
        {projects.map((p, i) => {
          const galeria = p.gallery ?? (p.cover ? [p.cover] : []);
          const emFoco = hoveredFrame === i;
          const foto = emFoco ? frameSlide % galeria.length : 0;

          return (
          <Link
            key={p.slug}
            href={`/projetos/${p.slug}`}
            data-frame
            aria-label={p.title}
            onMouseEnter={() => {
              setHoveredFrame(i);
              setFrameSlide(0);
            }}
            onMouseLeave={() => setHoveredFrame(null)}
            className="group relative h-full shrink-0 basis-[30%] overflow-hidden border-l border-ink first:border-l-0 sm:basis-[20%] md:shrink md:grow md:basis-0 md:transition-[flex-grow,height] md:duration-500 md:ease-out md:hover:z-20 md:hover:h-[168%] md:hover:grow-6"
          >
            <div
              className="absolute inset-0 grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
              style={galeria.length ? undefined : { background: TONES[i % TONES.length] }}
            >
              {/* Fotos extras só montam quando o frame está em foco (carga sob demanda) */}
              {galeria.map((src, gi) =>
                gi > 0 && !emFoco ? null : (
                  <Image
                    key={src}
                    src={src}
                    alt={gi === 0 ? p.title : ""}
                    aria-hidden={gi > 0 || undefined}
                    fill
                    sizes="(max-width: 768px) 46vw, 60vw"
                    className={
                      "object-cover transition-opacity duration-700 ease-out " +
                      (gi === foto ? "opacity-100" : "opacity-0")
                    }
                  />
                ),
              )}
            </div>

            {/* Scrims — legibilidade dos metadados sobre qualquer foto */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-void/60 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-void/60 to-transparent" />

            {/* Metadados técnicos */}
            <span className="mono absolute top-3 left-3 text-paper">
              {p.index}
            </span>
            <span className="mono absolute top-3 right-3 text-paper">
              {p.year}
            </span>
            <span className="mono absolute bottom-3 left-3 whitespace-nowrap text-paper">
              {p.title}
            </span>

            {/* Indicador da foto em ciclagem (só no frame expandido) */}
            {emFoco && galeria.length > 1 ? (
              <span className="mono absolute right-3 bottom-3 hidden text-paper md:block">
                {foto + 1}/{galeria.length}
              </span>
            ) : null}
          </Link>
          );
        })}
      </div>
    </section>
  );
}
