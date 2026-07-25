import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Grid } from "@/components/layout/Grid";
import { projects, getProject } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.title} — ${project.category}, ${project.location}, ${project.year}.`,
    openGraph: project.cover ? { images: [{ url: project.cover }] } : undefined,
  };
}

export default async function ProjetoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === project.slug);
  const proximo = projects[(i + 1) % projects.length];
  const fotos = project.gallery ?? (project.cover ? [project.cover] : []);

  return (
    <main className="pb-24 md:pb-32">
      {/* Capa — ocupa a viewport e sangra até as bordas */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-void md:h-[86vh]">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title}, ${project.location}`}
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale transition-[filter] duration-700 ease-out hover:grayscale-0"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-paper/85 to-transparent" />
      </div>

      {/* Título + metadados */}
      <Grid data-respiro="1" data-respiro-como="margem" className="gap-y-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <p className="mono text-graphite">
            {project.index} — {project.category}
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.03em] text-ink">
            {project.title}
          </h1>
        </div>

        <dl className="col-span-4 grid grid-cols-2 gap-y-6 self-end md:col-span-6 lg:col-span-4 lg:col-start-9">
          <Meta label="Local" value={project.location} />
          <Meta label="Ano" value={String(project.year)} />
          <Meta label="Categoria" value={project.category} />
          <Meta label="Área" value={project.area} />
        </dl>
      </Grid>

      {/* Galeria — proporções alternadas, sem repetição de card */}
      <Grid
        data-respiro="3"
        data-respiro-como="margem"
        className="gap-y-14 lg:gap-y-20"
      >
        {fotos.slice(1).map((src, n) => (
          <figure
            key={src}
            className={
              "relative w-full overflow-hidden col-span-4 " +
              (n % 2 === 0
                ? "md:col-span-8 lg:col-span-9 aspect-4/3"
                : "md:col-span-5 md:col-start-4 lg:col-span-6 lg:col-start-6 aspect-3/4")
            }
          >
            <Image
              src={src}
              alt={`${project.title} — imagem ${n + 2}`}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover grayscale transition-[filter] duration-700 ease-out hover:grayscale-0"
            />
          </figure>
        ))}
      </Grid>

      {/* Próximo projeto */}
      <Grid data-respiro="5" data-respiro-como="margem">
        <Link
          href={`/projetos/${proximo.slug}`}
          className="group col-span-4 flex items-baseline justify-between border-t border-ink pt-5 md:col-span-8 lg:col-span-12"
        >
          <span className="mono text-graphite">Próximo projeto</span>
          <span className="flex items-baseline gap-4">
            <span className="text-xl font-medium tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-1 lg:text-2xl">
              {proximo.title}
            </span>
            <span className="mono text-ink">→</span>
          </span>
        </Link>
      </Grid>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 border-t border-line pt-3">
      <dt className="mono text-graphite">{label}</dt>
      <dd className="text-lg text-ink">{value}</dd>
    </div>
  );
}
