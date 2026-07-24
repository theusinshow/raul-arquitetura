import Link from "next/link";
import { Grid } from "@/components/layout/Grid";
import { Logo } from "@/components/ui/Logo";
import { navItems, site } from "@/lib/site";

/**
 * Footer global — mesmo fundo do CTA Final, separado por hairline. Presente
 * em todas as rotas.
 */
export default function Footer() {
  return (
    <footer data-nav="invert" className="bg-ink text-paper">
      <Grid className="items-start gap-y-12 border-t border-graphite py-14 md:py-16">
        {/* Marca */}
        <div className="col-span-4 flex items-center gap-3 md:col-span-8 lg:col-span-4">
          <Logo className="h-10 w-10 text-paper" title="" />
          <span className="leading-none">
            <span className="block text-sm font-semibold tracking-[0.14em]">
              {site.shortName}
            </span>
            <span className="mono mt-1 block text-mute">Arquitetura</span>
          </span>
        </div>

        {/* Navegação */}
        <nav
          aria-label="Rodapé"
          className="col-span-2 flex flex-col gap-3 md:col-span-4 lg:col-span-3 lg:col-start-7"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono text-paper transition-opacity duration-300 hover:opacity-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Contato */}
        <div className="col-span-2 flex flex-col gap-3 md:col-span-4 lg:col-span-3 lg:col-start-10">
          <a
            href="mailto:estudio@raul.arq"
            className="mono text-paper transition-opacity duration-300 hover:opacity-50"
          >
            estudio@raul.arq
          </a>
          <span className="mono text-mute">São Paulo, BR</span>
        </div>
      </Grid>

      <Grid className="items-center gap-y-3 border-t border-graphite py-6">
        <span className="mono col-span-4 text-mute md:col-span-4 lg:col-span-6">
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className="mono col-span-4 text-mute md:col-span-4 lg:col-span-6 lg:text-right">
          Forma, matéria e contexto
        </span>
      </Grid>
    </footer>
  );
}
