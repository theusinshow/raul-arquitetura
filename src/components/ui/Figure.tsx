import Image from "next/image";

interface FigureProps {
  /** Caminho da fotografia. Ausente → placeholder neutro. */
  src?: string;
  alt?: string;
  /** Legenda técnica curta (mono), ex.: "Casa Pátio, 2024". */
  caption?: string;
  /** Índice editorial, ex.: "001". */
  index?: string;
  className?: string;
  /** `sizes` do Next/Image — obrigatório informar para bom LCP. */
  sizes?: string;
  priority?: boolean;
}

/**
 * Enquadramento de imagem do projeto. Ortogonal (radius 0), preparado para
 * receber fotografia arquitetônica; sem `src`, exibe um placeholder neutro
 * com marcas de registro, no lugar de imagens aleatórias.
 */
export function Figure({
  src,
  alt = "",
  caption,
  index,
  className = "",
  sizes = "100vw",
  priority = false,
}: FigureProps) {
  return (
    <figure className={`relative overflow-hidden bg-off-white ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Placeholder caption={caption} />
      )}

      {(index || caption) && (
        <figcaption className="mono absolute bottom-3 left-8 flex gap-2 text-mute mix-blend-difference">
          {index ? <span className="text-paper">{index}</span> : null}
          {caption ? <span className="text-paper/70">{caption}</span> : null}
        </figcaption>
      )}
    </figure>
  );
}

/** Placeholder neutro com marcas de registro nos cantos. */
function Placeholder({ caption }: { caption?: string }) {
  return (
    <div className="absolute inset-0 border border-line">
      <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-mute" />
      <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-mute" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-mute" />
      <span className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-mute" />
      <div className="grid h-full w-full place-items-center">
        <span className="mono text-mute">{caption ?? "Fotografia"}</span>
      </div>
    </div>
  );
}
