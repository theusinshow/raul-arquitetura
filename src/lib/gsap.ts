/**
 * Ponto central do GSAP. Registra o ScrollTrigger uma única vez (apenas no
 * cliente) e reexporta as instâncias para uso nos componentes.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// registerPlugin é idempotente; registramos apenas no cliente.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
