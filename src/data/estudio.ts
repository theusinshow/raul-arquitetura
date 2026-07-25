/**
 * Dados do estúdio usados pela página /sobre. Ficam fora da UI, como o
 * portfólio em `data/projects.ts`, para que o texto editorial possa ser
 * revisado sem tocar em layout.
 */

/** Uma etapa do método de trabalho, do primeiro encontro à entrega. */
export interface Etapa {
  /** Número editorial da etapa, ex.: "01". */
  n: string;
  nome: string;
  /** Uma linha em escala de display — a ideia da etapa. */
  resumo: string;
  /** Parágrafo corrido que desenvolve a etapa. */
  texto: string;
  /** Obra do acervo de onde sai o detalhe fotográfico (slug em projects.ts). */
  obra: string;
  /** Índice da foto dentro da galeria da obra (0–2). */
  foto: number;
}

export const metodo: Etapa[] = [
  {
    n: "01",
    nome: "Leitura",
    resumo: "O terreno antes do traço.",
    texto:
      "Antes de desenhar, medimos o que já existe: orientação, topografia, vento, o que fica de pé e o que sai. Visitamos o lugar em horários diferentes — a luz das nove não é a luz das quatro, e a casa vai viver as duas.",
    obra: "casa-mantiqueira",
    foto: 1,
  },
  {
    n: "02",
    nome: "Estudo",
    resumo: "Poucas hipóteses, levadas até o fim.",
    texto:
      "Maquete física e desenho à mão. Preferimos três hipóteses testadas até o limite a doze pela metade: é no estudo que o projeto ganha a ideia que vai sustentá-lo pelos anos seguintes.",
    obra: "casa-cipo",
    foto: 2,
  },
  {
    n: "03",
    nome: "Projeto",
    resumo: "O que a obra não precisa improvisar.",
    texto:
      "No executivo, cada encontro de materiais é resolvido em prancha: a junta, o rodapé que não existe, o caixilho que some na alvenaria. Detalhe desenhado é decisão que o canteiro não terá de tomar às pressas.",
    obra: "edificio-aurora",
    foto: 1,
  },
  {
    n: "04",
    nome: "Obra",
    resumo: "Decisões tomadas no lugar.",
    texto:
      "Acompanhamos o canteiro do início ao fim, com visitas semanais e escolhas feitas diante do que já está construído. Nada importante se resolve por telefone.",
    obra: "casa-itacare",
    foto: 2,
  },
];

/** Números do estúdio — metadados, exibidos em mono + display. */
export const numeros = [
  { label: "Fundado", valor: "2016" },
  { label: "Obras entregues", valor: "14" },
  { label: "Países", valor: "02" },
  { label: "Projetos por ano", valor: "≤ 04" },
] as const;

/** Frentes de atuação do escritório. */
export const atuacao = [
  "Residencial",
  "Hotelaria",
  "Interiores",
  "Retrofit e reforma",
] as const;

/** Obra cuja fotografia faz a virada do preto para o branco. */
export const faixaSlug = "casa-iporanga";
