import type { Metadata } from "next";
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
  };
}

/**
 * Página individual de projeto — estrutura mínima. A composição editorial
 * (fotografia, blocos, metadados) será desenvolvida em etapa própria.
 */
export default async function ProjetoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-dvh pt-32 pb-24 md:pt-40">
      <Grid className="gap-y-6">
        <p className="label-mono col-span-4 md:col-span-8 lg:col-span-12">
          {project.index} — Projeto
        </p>
        <h1 className="col-span-4 text-5xl font-medium tracking-tight md:col-span-8 md:text-7xl lg:col-span-12 lg:text-8xl">
          {project.title}
        </h1>
      </Grid>

      <div className="grid-shell mt-10">
        <hr className="rule col-span-4 md:col-span-8 lg:col-span-12" />
      </div>

      <Grid className="mt-8 gap-y-6">
        <Meta label="Local" value={project.location} />
        <Meta label="Ano" value={String(project.year)} />
        <Meta label="Categoria" value={project.category} />
        <Meta label="Área" value={project.area} />
      </Grid>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="col-span-2 flex flex-col gap-2 md:col-span-2 lg:col-span-3">
      <span className="label-mono">{label}</span>
      <span className="text-lg">{value}</span>
    </div>
  );
}
