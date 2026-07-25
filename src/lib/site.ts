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

/**
 * Dados de contato — ponto único. Antes o e-mail estava repetido no Footer e
 * no CTA da Home; a /contato seria a terceira cópia.
 */
export const contato = {
  email: "estudio@raul.arq",
  telefone: "+55 11 0000—0000",
  /** Formato E.164 para o href do tel: */
  telefoneHref: "+551100000000",
  endereco: "Rua Harmonia, 1100 — Vila Madalena",
  cidade: "São Paulo, BR",
  atendimento: "Segunda a sexta, 9h — 18h",
  atuacao: "Brasil e Portugal",
} as const;

/** Itens de navegação principais. */
export const navItems = [
  { label: "Projetos", href: "/projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;
