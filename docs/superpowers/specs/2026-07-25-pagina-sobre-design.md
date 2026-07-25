# Página /sobre — design

Data: 2026-07-25
Estado anterior: `/sobre` era um placeholder mínimo (label + `site.description`).

## Objetivo

Dar à `/sobre` o conteúdo que a Home não carrega. A Home já tem o Manifesto
(princípios: Lugar, Matéria, Precisão) e o bloco "Sobre RAUL" (estúdio pequeno,
2016, São Paulo, Brasil e Portugal). A `/sobre` aprofunda **a prática**: como o
estúdio trabalha, do primeiro encontro à entrega da obra.

## Decisões tomadas

| Decisão | Escolha | Motivo |
| --- | --- | --- |
| Pessoas | Sem equipe, sem retratos | O acervo só tem fotografia de arquitetura; retratos de banco de imagem denunciariam o site |
| Eixo central | O método, em 4 etapas | É o que a Home não conta — o Manifesto dá princípios, aqui vem a prática |
| Layout do método | Zigue-zague texto/foto | Escolha do usuário |
| Estrutura/ritmo | Abre em preto | Escolha do usuário; inverte a Home, que abre clara |
| Imagens do método | Crops fechados de obras existentes | Nenhuma foto nova; evita misturar acervos |

## Ritmo da página

```
PRETO   Abertura (h1 + parágrafo)
        ↓
FOTO    faixa full-bleed atravessando a viewport (a virada)
        ↓
BRANCO  Método — 4 etapas em zigue-zague
BRANCO  Números do estúdio + frentes de atuação
        ↓
PRETO   Convite + Footer global (mesmo fundo, hairline entre eles)
```

Ambas as seções escuras levam `data-nav="invert"`; a Navbar já observa esse
atributo por IntersectionObserver e inverte suas cores.

## Estrutura de arquivos

- `src/data/estudio.ts` — etapas do método, números e frentes de atuação (dados
  puros e tipados, fora da UI, como `src/data/projects.ts`)
- `src/components/sections/sobre/Abertura.tsx`
- `src/components/sections/sobre/Metodo.tsx`
- `src/components/sections/sobre/Numeros.tsx`
- `src/components/sections/sobre/Convite.tsx`
- `src/app/sobre/page.tsx` — Server Component: metadata + composição

Subpasta `sections/sobre/` porque a raiz de `sections/` já tem 7 arquivos da
Home; agrupar por rota mantém a leitura clara.

## Conteúdo

**Abertura** — label `SOBRE — 2016 / 2026`; h1 "Desde 2016, poucas obras por
vez."; parágrafo sobre base em São Paulo, obras no Brasil e em Portugal, número
reduzido de projetos acompanhados do primeiro croqui à última junta.

Não repete "Um estúdio pequeno, por escolha", que já é o bloco Sobre RAUL da
Home.

**Método** — quatro etapas:

1. **Leitura** — o terreno antes do traço; visitas em horários diferentes
2. **Estudo** — poucas hipóteses levadas até o fim, em vez de muitas pela metade
3. **Projeto** — o executivo resolve em prancha o que a obra teria de improvisar
4. **Obra** — canteiro acompanhado até o fim; nada importante se decide por telefone

**Números** — fundação 2016, 14 obras entregues, 2 países, até 4 projetos por
ano. Ao lado, frentes de atuação em mono: residencial, hotelaria, interiores,
retrofit.

**Convite** — fecho curto e deliberadamente menor que o CTA da Home. Copy:
"Há um terreno? / Vamos visitá-lo." com link para `/contato`. O CTA da Home já
usa "Todo projeto começa por uma conversa" — o fecho da `/sobre` não repete essa
frase e, em vez de e-mail em display, aponta para a página de contato.

## Como o zigue-zague foge do lugar-comum

O arranjo alternado é o mais visto em sites de arquitetura. A diferenciação vem
de nunca repetir a mesma medida entre etapas:

- proporções de foto diferentes por etapa: 4:5, 3:2, 1:1, 16:9
- larguras de coluna e `col-start` diferentes por etapa
- deslocamentos verticais diferentes (a foto não alinha com o topo do texto)
- número da etapa em escala grande, tratado como elemento gráfico
- crops fechados (detalhe construtivo), não fachadas — contrasta com as fotos
  abertas do resto do site

## Motion

Reveals pelo hook compartilhado `src/lib/useReveal.ts`
(`data-reveal="line|fig|fade"`). Nenhum vocabulário de movimento novo. Fotos em
`grayscale` revelando cor no hover, como no resto do site. Sob
`prefers-reduced-motion` o conteúdo já nasce visível (comportamento do hook).

## Acessibilidade e técnica

- Um único `h1` (na Abertura); `h2` por bloco; `h3` por etapa
- `alt` descritivo com título e local da obra
- `next/image` com `sizes` coerente com a largura real de cada coluna
- Qualquer classe nova em `globals.css` vai dentro de `@layer components`
- Seções com reveal são Client Components (padrão já usado na Home); a página em
  si permanece Server Component

## Verificação

`npm run lint`, `tsc --noEmit` e `npm run build`, seguidos de conferência visual
em porta limpa (3100) — um `next dev` zumbi na 3000 já causou screenshot
enganoso neste projeto.
