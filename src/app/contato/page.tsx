import type { Metadata } from "next";
import { Grid } from "@/components/layout/Grid";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com o estúdio RAUL Arquitetura.",
};

/**
 * Página de Contato — estrutura mínima. O layout definitivo será desenvolvido
 * em etapa própria.
 */
export default function ContatoPage() {
  return (
    <main className="min-h-dvh pt-32 pb-24 md:pt-40">
      <Grid className="gap-y-8">
        <p className="label-mono col-span-4 md:col-span-8 lg:col-span-12">
          Contato
        </p>
        <a
          href="mailto:estudio@raul.arq"
          className="col-span-4 text-3xl font-medium tracking-tight transition-opacity duration-300 hover:opacity-40 md:col-span-8 md:text-6xl lg:col-span-12 lg:text-7xl"
        >
          estudio@raul.arq
        </a>
      </Grid>
    </main>
  );
}
