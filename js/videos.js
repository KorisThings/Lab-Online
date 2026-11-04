/* ==========================================================================
   VÍDEOS — edite APENAS este arquivo para trocar os vídeos do site
   ==========================================================================

   O PRIMEIRO vídeo da lista é o destaque da seção "Último projeto".
   Os demais aparecem embaixo, em "Transmissões anteriores".
   → Para publicar um vídeo novo: copie um bloco { ... }, cole NO TOPO da
     lista e troque os dados. Não esqueça a vírgula entre os blocos.

   Campos de cada vídeo:
   • id ......... o código do vídeo no link do YouTube.
                  Ex.: youtube.com/watch?v=XTGnnl61ZLk  →  id: "XTGnnl61ZLk"
   • titulo ..... título que aparece no site.
   • data ....... data da transmissão no formato "AAAA-MM-DD".
   • duracao .... texto livre, ex.: "2h28min". Deixe "" para não mostrar.
   • aoVivo ..... true se foi uma transmissão ao vivo, false se foi um vídeo enviado.
   • inicio ..... de onde o vídeo começa, em "h:mm:ss" ou "m:ss". "0:00" = do começo.
   • legenda .... true liga as legendas em português automaticamente.
   • incorporar . true toca o vídeo dentro do site. Só funciona se no YouTube Studio
                  o vídeo estiver com "Permitir incorporação" marcado.
                  false mostra a capa do vídeo e abre no YouTube ao clicar.
   • resumo ..... a explicação do vídeo. Cada texto entre aspas vira um parágrafo.
   • capitulos .. atalhos para partes do vídeo. Clicar pula o vídeo para lá.
                  Deixe [] (lista vazia) se não quiser capítulos.

   Quando a chave da API do YouTube estiver pronta, esta lista continua
   servindo como reserva caso a API falhe.
   ========================================================================== */

const VIDEOS = [
  {
    id: "XTGnnl61ZLk",
    titulo: "Speckle Laser Aplicado ao Diagnóstico de Materiais",
    data: "2026-10-08",
    duracao: "2h28min",
    aoVivo: true,
    inicio: "32:53",
    legenda: true,
    incorporar: true,
    resumo: [
      "Oficina aberta no laboratório da UNISUL, conduzida pelo professor Jasper Zanco, mostrando ao vivo como a técnica de speckle laser ajuda a diagnosticar materiais. Um feixe de laser incide sobre a amostra e forma um padrão granulado — o \"speckle\". Quando existe atividade na amostra (uma reação química, umidade, uma semente viva), esse padrão se altera ao longo do tempo. Filmando o padrão e processando as imagens com algoritmos como o THSP e o GLCM, é possível medir essa atividade sem destruir a amostra.",
      "No experimento principal, um fio de cobre é mergulhado em uma solução de nitrato de prata: o cobre passa para a solução e cristais de prata crescem sobre o fio, uma reação de oxirredução acompanhada pelo laser em tempo real. A transmissão também mostra a separação de bandas de cor (RGB e infravermelho próximo), um índice de vegetação (NDVI) feito só com a câmera do celular, o uso do laser em sementes durante o doutorado do professor e o tratamento estatístico dos resultados.",
    ],
    capitulos: [
      { tempo: "0:00",    titulo: "Abertura e boas-vindas" },
      { tempo: "3:33",    titulo: "Cobre e nitrato de prata: a reação do dia" },
      { tempo: "7:02",    titulo: "Bandas de cor e espectro" },
      { tempo: "8:12",    titulo: "O que o laser revela em plantas e peças" },
      { tempo: "12:27",   titulo: "Algoritmos de análise: GLCM e THSP" },
      { tempo: "20:46",   titulo: "Laser na cubeta × espectrofotômetro" },
      { tempo: "30:53",   titulo: "NDVI com a câmera do celular" },
      { tempo: "35:33",   titulo: "Experimento ao vivo: fio de cobre na prata" },
      { tempo: "1:17:40", titulo: "Laser em sementes: o doutorado do prof. Jasper" },
      { tempo: "1:29:08", titulo: "Processando o vídeo com o THSP" },
      { tempo: "1:52:17", titulo: "Análise estatística dos resultados" },
      { tempo: "2:04:45", titulo: "Contando e medindo partículas na imagem" },
    ],
  },

  {
    id: "xH63kRb5R74",
    titulo: "Vídeo de apresentação do laboratório",
    data: "2026-09-01",
    duracao: "",
    aoVivo: true,
    inicio: "0:00",
    legenda: true,
    incorporar: false,
    resumo: [],
    capitulos: [],
  },
];
