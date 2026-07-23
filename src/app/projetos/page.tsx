import type { Metadata } from "next";
import Link from "next/link";
import { Grid } from "@/components/layout/Grid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Portfólio de projetos do estúdio RAUL Arquitetura.",
};

/**
 * Índice de projetos — estrutura mínima. A listagem/galeria definitiva será
 * desenhada em etapa própria.
 */
export default function ProjetosPage() {
  return (
    <main className="min-h-dvh pt-32 pb-24 md:pt-40">
      <Grid className="gap-y-2">
        <p className="label-mono col-span-4 mb-8 md:col-span-8 lg:col-span-12">
          Índice — Projetos
        </p>
      </Grid>

      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/projetos/${project.slug}`} className="group block">
              <Grid className="items-baseline border-t border-line py-6 transition-opacity duration-300 group-hover:opacity-40 md:py-8">
                <span className="label-mono col-span-1">{project.index}</span>
                <h2 className="col-span-3 text-2xl font-medium tracking-tight md:col-span-4 lg:col-span-6 lg:text-3xl">
                  {project.title}
                </h2>
                <span className="label-mono col-span-4 mt-2 md:col-span-3 md:mt-0 lg:col-span-5 lg:text-right">
                  {project.location} · {project.year}
                </span>
              </Grid>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
