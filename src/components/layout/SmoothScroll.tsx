"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import type { RefObject } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });

/**
 * Ref para a instância ativa do Lenis (`.current` é null em reduced-motion /
 * antes da montagem). Ex.: `useLenis().current?.stop()`.
 */
export function useLenis(): RefObject<Lenis | null> {
  return useContext(LenisContext);
}

/**
 * Integra Lenis com o ticker do GSAP (padrão recomendado para Next.js):
 * um único loop de animação alimenta o Lenis, e cada scroll atualiza o
 * ScrollTrigger. Respeita `prefers-reduced-motion` — nesse caso o smooth
 * scroll não é iniciado e o scroll nativo é mantido.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    instance.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = instance;

    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
