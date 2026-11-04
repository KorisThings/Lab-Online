/* ==========================================================================
   EQUIPE — edite APENAS este arquivo para mudar os perfis do site
   ==========================================================================

   Cada pessoa é um bloco { ... } dentro da lista EQUIPE. Para:

   • Trocar a foto ...... coloque a imagem na pasta "assets" e mude "foto".
   • Ajustar o enquadramento da foto ... mude "posicaoFoto":
       "center 0%"   → mostra mais o topo da imagem
       "center 50%"  → centro (padrão)
       "center 100%" → mostra mais a parte de baixo
   • Mudar cargos ....... edite a lista "funcoes" (aparecem em verde).
   • Mudar o currículo .. edite a lista "curriculo". Cada linha pode ser:
       - um texto simples:      "Eng. Agrônomo",
       - um texto com link:     { texto: "Professor Adjunto — UNISUL", url: "https://www.unisul.br" },
   • Colocar o Lattes ... preencha "lattes" com o endereço. Se deixar "" (vazio),
                          o botão do Lattes simplesmente não aparece.
   • Adicionar alguém ... copie um bloco inteiro { ... }, cole no final da lista
                          e troque os dados. Não esqueça a vírgula entre os blocos.

   A ordem dos blocos é a ordem em que os cartões aparecem no site.
   ========================================================================== */

const EQUIPE = [
  {
    nome: "Jasper Jose Zanco",
    foto: "assets/Foto_Jasper.jpg",
    posicaoFoto: "center 35%",
    funcoes: [
      "Orientador",
      "Idealizador do projeto Lab. On-line",
    ],
    curriculo: [
      "Eng. Agrônomo",
      { texto: "Professor Adjunto — UNISUL", url: "https://www.unisul.br" },
      "Doutor em Produção Vegetal — Fitohomeopatia (UDESC)",
      "Mestre em Produção Vegetal — Plantas Bioativas (UFPEL)",
    ],
    lattes: "http://lattes.cnpq.br/3951961052108211",
  },

  {
    nome: "Enrique Roberto Martins",
    foto: "assets/Foto_Enrique.jpeg",
    posicaoFoto: "center 30%",
    funcoes: [
      "Orientando",
    ],
    curriculo: [
      "Estudante de Eng. Mecânica",
    ],
    lattes: "", // ← cole aqui o link do Lattes do Enrique
  },

  {
    nome: "Ruan da Rosa Correia",
    foto: "assets/Foto_Ruan.jpeg",
    posicaoFoto: "center 50%",
    funcoes: [
      "Orientando",
      "Criador do site",
    ],
    curriculo: [
      "Estudante de Eng. Mecânica",
    ],
    lattes: "", // ← cole aqui o link do seu Lattes
  },
];
