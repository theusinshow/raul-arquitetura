/**
 * Modelo de um projeto de arquitetura. Metadados técnicos (ano, local, área,
 * categoria) são exibidos em Fragment Mono; título e descrição em Urbanist.
 */
export interface Project {
  /** Identificador de rota: /projetos/[slug] */
  slug: string;
  /** Número editorial do projeto, ex.: "01" */
  index: string;
  title: string;
  location: string;
  year: number;
  category: string;
  /** Área construída, ex.: "420 m²" */
  area: string;
  /** Caminho da imagem de capa (fotografia arquitetônica). Opcional por ora. */
  cover?: string;
  /** Fotos do projeto (a primeira é a capa). Usada na ciclagem do hero. */
  gallery?: string[];
}
