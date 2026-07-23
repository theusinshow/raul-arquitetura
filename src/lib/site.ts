/**
 * Constantes centrais do site. Ponto único para nome, descrição e URL base
 * usados em metadata / SEO.
 */
export const site = {
  name: "RAUL Arquitetura",
  shortName: "RAUL",
  description:
    "Arquitetura contemporânea, espaços precisos e projetos construídos a partir da relação entre forma, matéria e contexto.",
  url: "https://raul.arq", // provisório
  locale: "pt-BR",
} as const;

/** Itens de navegação principais. */
export const navItems = [
  { label: "Projetos", href: "/projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;
