"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/site";
import { useLenis } from "@/components/layout/SmoothScroll";
import { Logo } from "@/components/ui/Logo";

/**
 * Navbar flutuante sobre o conteúdo — composição inspirada em grupos de
 * navegação segmentados (marca · nav central · CTA), porém ortogonal:
 * cantos retos, hairlines de 1px e labels em Fragment Mono. O motivo de
 * colchetes ‹ › é revelado no hover como pequena transição editorial.
 */
export default function Navbar() {
  const pathname = usePathname();
  const lenisRef = useLenis();
  const [open, setOpen] = useState(false);

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="grid-shell py-4 md:py-5">
        <div className="pointer-events-auto relative z-50 col-span-4 flex items-center justify-between gap-4 md:col-span-8 lg:col-span-12">
          {/* Marca */}
          <Link href="/" aria-label={site.name} className="flex items-center gap-3">
            <Logo className="h-9 w-9 text-ink" title="" />
            <span className="leading-none">
              <span className="block text-sm font-semibold tracking-[0.14em] text-ink">
                {site.shortName}
              </span>
              <span className="mono mt-1 block text-graphite">Arquitetura</span>
            </span>
          </Link>

          {/* Grupo de navegação segmentado — centralizado no desktop */}
          <nav
            aria-label="Principal"
            className="hidden border border-line bg-off-white md:flex lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
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
                    (i > 0 ? "border-l border-line " : "") +
                    (active
                      ? "bg-ink text-paper"
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
            {/* CTA primário — sólido, quadrado (md+) */}
            <Link
              href="/contato"
              className="group hidden items-center gap-2 bg-ink px-5 py-2.5 text-paper transition-colors duration-300 hover:bg-void md:inline-flex"
            >
              <span className="mono transition-transform duration-300 group-hover:translate-x-0.5">
                ›
              </span>
              <span className="mono">Iniciar projeto</span>
            </Link>

            {/* Toggle mobile */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="mono px-3 py-2.5 text-ink md:hidden"
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
      className={`mono inline-block opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-50 ${enter}`}
    >
      {side === "left" ? "‹" : "›"}
    </span>
  );
}
