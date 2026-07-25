import type { Metadata } from "next";
import Abertura from "@/components/sections/sobre/Abertura";
import Metodo from "@/components/sections/sobre/Metodo";
import Numeros from "@/components/sections/sobre/Numeros";
import Convite from "@/components/sections/sobre/Convite";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "RAUL é um estúdio de arquitetura com base em São Paulo e obras no Brasil e em Portugal. Poucos projetos por vez, acompanhados do primeiro croqui à última visita de obra.",
};

/**
 * /sobre — ritmo inverso ao da Home: abre em preto, vira para o branco pela
 * faixa de fotografia e volta ao preto no fecho, que encosta no Footer global.
 */
export default function SobrePage() {
  return (
    <main>
      <Abertura />
      <Metodo />
      <Numeros />
      <Convite />
    </main>
  );
}
