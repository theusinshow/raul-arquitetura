/**
 * O que o estúdio pede num primeiro contato. Sem formulário, esta lista é o
 * que faz o primeiro e-mail já ser útil — é ela que substitui os campos.
 */
export interface ItemBriefing {
  n: string;
  titulo: string;
  texto: string;
}

export const briefing: ItemBriefing[] = [
  {
    n: "01",
    titulo: "O terreno",
    texto:
      "Endereço ou coordenadas, matrícula se já houver, e fotos do lugar como ele está hoje — mato alto, construção velha, o que for.",
  },
  {
    n: "02",
    titulo: "O programa",
    texto:
      "Quantos quartos, como a casa vai ser usada, quem mora nela e quem só aparece no fim de semana.",
  },
  {
    n: "03",
    titulo: "Prazo e orçamento",
    texto:
      "Mesmo aproximados. São eles que dizem, logo no começo, se conseguimos atender bem — e é melhor descobrir isso no primeiro e-mail.",
  },
  {
    n: "04",
    titulo: "Referências",
    texto:
      "Imagens do que agrada e, sobretudo, do que não agrada. A segunda lista costuma ser mais reveladora que a primeira.",
  },
];
