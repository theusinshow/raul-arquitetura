"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/site";
import { useLenis } from "@/components/layout/SmoothScroll";
import { Logo } from "@/components/ui/Logo";

/**
 * Navbar flutuante sobre o conteúdo — marca · navegação segmentada · CTA.
 * Cantos retos, hairlines de 1px e labels em Fragment Mono; o motivo ‹ › é
 * revelado no hover. Inverte automaticamente quando uma seção escura
 * (data-nav="invert") passa sob ela.
 */
export default function Navbar() {
  const pathname = usePathname();
  const lenisRef = useLenis();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Trava o scroll enquanto o menu mobile está aberto.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lenisRef]);

  // Detecta seções escuras cruzando a faixa horizontal da navbar.
  useEffect(() => {
    const cruzando = new Set<Element>();
    let observer: IntersectionObserver | null = null;

    const conectar = () => {
      observer?.disconnect();
      cruzando.clear();
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) cruzando.add(e.target);
            else cruzando.delete(e.target);
          }
          setDark(cruzando.size > 0);
        },
        // Reduz a "janela" de observação a uma faixa fina na altura da navbar.
        { rootMargin: `-56px 0px -${Math.max(0, window.innerHeight - 57)}px 0px` },
      );
      document
        .querySelectorAll('[data-nav="invert"]')
        .forEach((el) => observer?.observe(el));
    };

    conectar();
    window.addEventListener("resize", conectar);
    return () => {
      window.removeEventListener("resize", conectar);
      observer?.disconnect();
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="grid-shell py-4 md:py-5">
        <div className="pointer-events-auto relative z-50 col-span-4 flex items-center justify-between gap-4 md:col-span-8 lg:col-span-12">
          {/* Marca */}
          <Link href="/" aria-label={site.name} className="flex items-center gap-3">
            <Logo
              className={`h-9 w-9 transition-colors duration-500 ${dark ? "text-paper" : "text-ink"}`}
              title=""
            />
            <span className="leading-none">
              <span
                className={`block text-sm font-semibold tracking-[0.14em] transition-colors duration-500 ${dark ? "text-paper" : "text-ink"}`}
              >
                {site.shortName}
              </span>
              <span
                className={`mono mt-1 block transition-colors duration-500 ${dark ? "text-mute" : "text-graphite"}`}
              >
                Arquitetura
              </span>
            </span>
          </Link>

          {/* Navegação segmentada — centralizada no desktop */}
          <nav
            aria-label="Principal"
            className={`hidden border transition-colors duration-500 md:flex lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 ${
              dark ? "border-graphite bg-transparent" : "border-line bg-off-white"
            }`}
          >
            {navItems.map((item, i) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    "group flex items-center gap-1 px-3.5 py-2.5 transition-colors duration-300 " +
                    (i > 0 ? (dark ? "border-l border-graphite " : "border-l border-line ") : "") +
                    (active
                      ? dark
                        ? "bg-paper text-ink"
                        : "bg-ink text-paper"
                      : dark
                        ? "text-paper hover:bg-paper/10"
                        : "text-ink hover:bg-white")
                  }
                >
                  <Bracket side="left" />
                  <span className="mono">{item.label}</span>
                  <Bracket side="right" />
                </Link>
              );
            })}
          </nav>

          {/* Cluster à direita */}
          <div className="flex items-center gap-3">
            <Link
              href="/contato"
              className={`group hidden items-center gap-2 px-5 py-2.5 transition-colors duration-500 md:inline-flex ${
                dark
                  ? "bg-paper text-ink hover:bg-off-white"
                  : "bg-ink text-paper hover:bg-void"
              }`}
            >
              <span className="mono transition-transform duration-300 group-hover:translate-x-0.5">
                ›
              </span>
              <span className="mono">Iniciar projeto</span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className={`mono px-3 py-2.5 transition-colors duration-500 md:hidden ${dark ? "text-paper" : "text-ink"}`}
            >
              {open ? "Fechar" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay mobile */}
      <div
        id="menu-mobile"
        className={
          "pointer-events-auto fixed inset-0 z-40 flex flex-col bg-off-white transition-[opacity,transform] duration-500 ease-out md:hidden " +
          (open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0")
        }
        aria-hidden={!open}
      >
        <div className="grid-shell mt-auto pb-10">
          <ul className="col-span-4 border-t border-line">
            {navItems.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="text-4xl font-medium tracking-tight text-ink">
                    {item.label}
                  </span>
                  <span className="mono text-graphite">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contato"
            onClick={() => setOpen(false)}
            className="col-span-4 mt-6 flex items-center justify-center gap-2 bg-ink px-5 py-4 text-paper"
          >
            <span className="mono">›</span>
            <span className="mono">Iniciar projeto</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

/** Colchete ‹ › revelado no hover do item. */
function Bracket({ side }: { side: "left" | "right" }) {
  const enter = side === "left" ? "-translate-x-1" : "translate-x-1";
  return (
    <span
      aria-hidden="true"
      className={`mono inline-block opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-50 ${enter}`}
    >
      {side === "left" ? "‹" : "›"}
    </span>
  );
}
