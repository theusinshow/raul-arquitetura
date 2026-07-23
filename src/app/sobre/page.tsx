import type { Metadata } from "next";
import { Grid } from "@/components/layout/Grid";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Sobre o estúdio RAUL Arquitetura.",
};

/**
 * Página Sobre — estrutura mínima. O conteúdo editorial será desenvolvido em
 * etapa própria.
 */
export default function SobrePage() {
  return (
    <main className="min-h-dvh pt-32 pb-24 md:pt-40">
      <Grid className="gap-y-8">
        <p className="label-mono col-span-4 md:col-span-8 lg:col-span-12">
          Sobre
        </p>
        <h1 className="col-span-4 text-3xl leading-tight font-medium tracking-tight md:col-span-6 md:text-5xl lg:col-span-8 lg:text-6xl">
          {site.description}
        </h1>
      </Grid>
    </main>
  );
}
