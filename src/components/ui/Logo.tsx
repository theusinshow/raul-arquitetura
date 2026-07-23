interface LogoProps {
  className?: string;
  /** Rótulo acessível; use "" quando houver texto ao lado. */
  title?: string;
}

/**
 * Monograma RAUL Arquitetura — "Ra" emoldurado num quadrado. Ortogonal
 * (radius 0), monocromático, desenhado na própria tipografia da marca
 * (Urbanist). Usa currentColor, invertendo em fundo claro/escuro.
 */
export function Logo({ className = "", title = "RAUL Arquitetura" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      role="img"
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      {/* Moldura */}
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      {/* R maiúsculo */}
      <text
        x="9"
        y="85"
        fill="currentColor"
        fontFamily="var(--font-urbanist), system-ui, sans-serif"
        fontSize="90"
        fontWeight="500"
        style={{ letterSpacing: "-0.04em" }}
      >
        R
      </text>
      {/* a minúsculo, encaixado na porção inferior direita */}
      <text
        x="50"
        y="85"
        fill="currentColor"
        fontFamily="var(--font-urbanist), system-ui, sans-serif"
        fontSize="62"
        fontWeight="500"
      >
        a
      </text>
    </svg>
  );
}
