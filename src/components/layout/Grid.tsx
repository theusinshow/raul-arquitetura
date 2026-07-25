import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type GridProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Casca de grid do projeto: 4 colunas (mobile) / 8 (tablet) / 12 (desktop),
 * quase full-bleed (sem container centralizado com paddings enormes).
 *
 * Os filhos posicionam-se com utilitários de `col-span` / `col-start` do
 * Tailwind. Ex.: <div className="col-span-4 lg:col-span-6"> para um 50/50 no
 * desktop. Para chegar às bordas da viewport, use a classe `bleed`.
 *
 * Props extras (data-*, aria-*, id…) passam direto para o elemento — é assim
 * que os blocos recebem `data-respiro` da rampa de espaçamento.
 */
export function Grid({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: GridProps) {
  return (
    <Tag className={`grid-shell ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
