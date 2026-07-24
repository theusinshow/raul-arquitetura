import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/**
 * Reveal editorial por scroll, compartilhado entre as seções.
 * Marque os elementos com:
 *   data-reveal="line" — dentro de um wrapper com overflow-hidden (máscara)
 *   data-reveal="fig"  — imagem/figura (clip-path de cima para baixo)
 *   data-reveal="fade" — textos e metadados (opacity + deslocamento curto)
 * Não faz nada sob prefers-reduced-motion (conteúdo já visível).
 */
export function useReveal(
  root: RefObject<HTMLElement | null>,
  start = "top 75%",
) {
  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-reveal="line"]', { yPercent: 115 });
      gsap.set('[data-reveal="fig"]', { clipPath: "inset(0 0 100% 0)" });
      gsap.set('[data-reveal="fade"]', { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root.current, start },
      });
      tl.to('[data-reveal="fig"]', { clipPath: "inset(0 0 0% 0)", duration: 1.1 }, 0)
        .to('[data-reveal="line"]', { yPercent: 0, duration: 1, stagger: 0.09 }, 0.1)
        .to('[data-reveal="fade"]', { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.07 }, 0.45);
    }, root);

    return () => ctx.revert();
  }, [root, start]);
}
