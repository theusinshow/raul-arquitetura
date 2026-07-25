import type { Metadata } from "next";
import Abertura from "@/components/sections/contato/Abertura";
import Dados from "@/components/sections/contato/Dados";
import OQueEnviar from "@/components/sections/contato/OQueEnviar";
import { contato } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com o estúdio RAUL Arquitetura — ${contato.email}. Estúdio em ${contato.cidade}, obras no ${contato.atuacao}.`,
};

/**
 * /contato — a página mais curta do site, de propósito. Sem formulário: não
 * há serviço de e-mail no projeto, e um formulário que engole a mensagem é
 * pior que nenhum. O que os campos fariam está em "O que enviar".
 *
 * Ritmo: branco (e-mail em display) → branco (dados) → PRETO, encostando no
 * Footer global. A Home abre em fotografia e a /sobre em preto — três rotas,
 * três aberturas.
 */
export default function ContatoPage() {
  return (
    <main>
      <Abertura />
      <Dados />
      <OQueEnviar />
    </main>
  );
}
