import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect no cliente (evita flash antes do reveal do GSAP) e useEffect
 * no servidor (sem warning de SSR).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
