import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Grid } from "@/components/layout/Grid";
import { projects, categorias } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Portfólio do estúdio RAUL Arquitetura — residências, hotelaria, interiores e edifícios.",
};

/**
 * Índice de projetos. O filtro por categoria vive na URL (?categoria=…), então
 * é linkável, compartilhável e não precisa de JavaScript no cliente.
 */
export default async function ProjetosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const filtro =
    categoria && categorias.includes(categoria) ? categoria : null;
  const lista = filtro
    ? projects.filter((p) => p.category === filtro)
    : projects;

  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Cabeçalho */}
      <Grid>
        <div className="col-span-4 flex items-center justify-between border-t border-ink pt-4 md:col-span-8 lg:col-span-12">
          <span className="mono text-graphite">Índice</span>
          <span className="mono text-graphite">
            {String(lista.length).padStart(2, "0")} de{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </Grid>

      <Grid className="mt-8 gap-y-8 md:mt-10">
        <h1 className="col-span-4 text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] font-medium tracking-[-0.03em] text-ink md:col-span-8 lg:col-span-7">
          Projetos
        </h1>
        <p className="col-span-4 max-w-[46ch] self-end leading-relaxed text-graphite md:col-span-5 lg:col-span-4 lg:col-start-9">
          Obras construídas entre 2017 e 2024, no Brasil e em Portugal.
          Residências, hotelaria, interiores e edifícios.
        </p>
      </Grid>

      {/* Filtro por categoria — estado na URL */}
      <Grid className="mt-14 md:mt-20">
        <nav
          aria-label="Filtrar por categoria"
          className="col-span-4 flex flex-wrap gap-px border border-line bg-line md:col-span-8 lg:col-span-12"
        >
          <FiltroLink href="/projetos" ativo={!filtro} rotulo="Todos" />
          {categorias.map((c) => (
            <FiltroLink
              key={c}
              href={`/projetos?categoria=${encodeURIComponent(c)}`}
              ativo={filtro === c}
              rotulo={c}
            />
          ))}
        </nav>
      </Grid>

      {/* Grade editorial — proporções e deslocamentos alternados */}
      <Grid className="mt-14 gap-y-16 md:mt-20 lg:gap-y-24">
        {lista.map((p, i) => {
          const largo = i % 2 === 0;
          return (
            <Link
              key={p.slug}
              href={`/projetos/${p.slug}`}
              className={
                "group col-span-4 md:col-span-4 " +
                (largo ? "lg:col-span-7" : "lg:col-span-5 lg:mt-24")
              }
            >
              <div
                className={
                  "relative w-full overflow-hidden " +
                  (largo ? "aspect-4/3" : "aspect-3/4")
                }
              >
                <Image
                  src={p.cover ?? ""}
                  alt={`${p.title}, ${p.location}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  className="object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>

              <div className="mt-4 flex items-baseline gap-4 border-t border-line pt-3">
                <span className="mono text-graphite">{p.index}</span>
                <h2 className="flex-1 text-xl font-medium tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-1 lg:text-2xl">
                  {p.title}
                </h2>
                <span className="mono text-graphite">{p.year}</span>
              </div>
              <p className="mono mt-2 text-graphite">
                {p.category} · {p.location} · {p.area}
              </p>
            </Link>
          );
        })}
      </Grid>
    </main>
  );
}

function FiltroLink({
  href,
  ativo,
  rotulo,
}: {
  href: string;
  ativo: boolean;
  rotulo: string;
}) {
  return (
    <Link
      href={href}
      aria-current={ativo ? "true" : undefined}
      className={
        "mono flex-1 px-4 py-3 text-center transition-colors duration-300 " +
        (ativo
          ? "bg-ink text-paper"
          : "bg-paper text-ink hover:bg-off-white")
      }
    >
      {rotulo}
    </Link>
  );
}
