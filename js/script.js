const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@HubExperimentosOnline";

document.getElementById("anoAtual").textContent = new Date().getFullYear();

/* ---------- equipe (dados em js/equipe.js) ---------- */
function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto) el.textContent = texto;
  return el;
}

function criarLink(texto, url, classe) {
  const a = criarElemento("a", classe, texto);
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}

function renderizarEquipe() {
  const grid = document.getElementById("equipeGrid");
  if (!grid || typeof EQUIPE === "undefined") return;

  EQUIPE.forEach((pessoa) => {
    const card = criarElemento("article", "team-card");

    const fotoBox = criarElemento("div", "team-photo");
    const img = document.createElement("img");
    img.src = pessoa.foto;
    img.alt = `Foto de ${pessoa.nome}`;
    img.loading = "lazy";
    if (pessoa.posicaoFoto) img.style.objectPosition = pessoa.posicaoFoto;
    fotoBox.appendChild(img);
    card.appendChild(fotoBox);

    card.appendChild(criarElemento("h3", null, pessoa.nome));

    (pessoa.funcoes || []).forEach((funcao) => {
      card.appendChild(criarElemento("p", "mono team-role", funcao));
    });

    if (pessoa.descricao) {
      card.appendChild(criarElemento("p", "team-bio", pessoa.descricao));
    }

    if (pessoa.curriculo && pessoa.curriculo.length) {
      const lista = criarElemento("ul", "team-cv");
      pessoa.curriculo.forEach((item) => {
        const li = document.createElement("li");
        if (typeof item === "string") {
          li.textContent = item;
        } else {
          li.appendChild(criarLink(item.texto, item.url));
        }
        lista.appendChild(li);
      });
      card.appendChild(lista);
    }

    if (pessoa.lattes) {
      card.appendChild(criarLink("Currículo Lattes →", pessoa.lattes, "team-lattes mono"));
    }

    grid.appendChild(card);
  });
}

renderizarEquipe();

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealTargets = document.querySelectorAll(".section-inner");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}


/* ---------- vídeos (dados em js/videos.js) ---------- */
const statusDot = document.querySelector(".status-dot");
const statusText = document.getElementById("statusText");
const broadcastBody = document.getElementById("broadcastBody");

function setStatus(kind, texto) {
  statusDot.className = "status-dot" + (kind ? ` is-${kind}` : "");
  statusText.textContent = texto;
}

// "1:17:40" → 4660 segundos
function paraSegundos(tempo) {
  if (!tempo) return 0;
  return String(tempo).split(":").map(Number).reduce((total, parte) => total * 60 + parte, 0);
}

function formatarData(data, longo) {
  if (!data) return "";
  const d = new Date(`${data}T12:00:00`);
  return longo
    ? d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
    : d.toLocaleDateString("pt-BR");
}

function urlDoPlayer(video, segundos, tocar) {
  const params = new URLSearchParams({ rel: "0", hl: "pt-BR", start: String(segundos) });
  if (video.legenda) {
    params.set("cc_load_policy", "1");
    params.set("cc_lang_pref", "pt");
  }
  if (tocar) params.set("autoplay", "1");
  return `https://www.youtube-nocookie.com/embed/${video.id}?${params}`;
}

function urlNoYouTube(video, segundos) {
  return `https://www.youtube.com/watch?v=${video.id}` + (segundos ? `&t=${segundos}s` : "");
}

// capa clicável, usada quando o vídeo não pode ser incorporado
function criarCapa(video, segundos) {
  const capa = criarLink("", urlNoYouTube(video, segundos), "video-poster");
  capa.setAttribute("aria-label", `Assistir "${video.titulo}" no YouTube`);
  const img = document.createElement("img");
  img.alt = "";
  img.src = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;
  img.addEventListener("error", () => { img.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`; }, { once: true });
  capa.appendChild(img);
  const selo = criarElemento("span", "video-poster-cta");
  selo.appendChild(criarElemento("span", "video-poster-play"));
  selo.appendChild(criarElemento("span", null, segundos ? "Assistir no YouTube a partir de " + formatarTempo(segundos) : "Assistir no YouTube"));
  capa.appendChild(selo);
  return capa;
}

// 1973 → "32:53"
function formatarTempo(segundos) {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = String(segundos % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

function renderizarVideo(indice) {
  const video = VIDEOS[indice];
  broadcastBody.replaceChildren();

  const layout = criarElemento("div", "broadcast-layout");
  const principal = criarElemento("div", "broadcast-main");

  // player (ou capa, se a incorporação estiver desligada no YouTube ou se o
  // site foi aberto direto do arquivo — aí o YouTube dá "Erro 153")
  const tocaNoSite = video.incorporar && location.protocol !== "file:";
  const wrap = criarElemento("div", "video-wrap");
  const iframe = document.createElement("iframe");
  if (tocaNoSite) {
    iframe.src = urlDoPlayer(video, paraSegundos(video.inicio), false);
    iframe.title = video.titulo;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin"; // exigido pelo YouTube
    wrap.appendChild(iframe);
  } else {
    wrap.appendChild(criarCapa(video, paraSegundos(video.inicio)));
  }
  principal.appendChild(wrap);

  // título, data e explicação
  const meta = criarElemento("div", "video-meta");
  meta.appendChild(criarElemento("h3", "video-title", video.titulo));
  const detalhes = [
    video.aoVivo ? `Transmitido ao vivo em ${formatarData(video.data, true)}` : formatarData(video.data, true),
    video.duracao,
    video.legenda ? "Legendas em português" : "",
  ].filter(Boolean).join(" · ");
  meta.appendChild(criarElemento("p", "video-date mono", detalhes));

  if (video.resumo && video.resumo.length) {
    const resumo = criarElemento("div", "video-summary");
    video.resumo.forEach((paragrafo) => resumo.appendChild(criarElemento("p", null, paragrafo)));
    meta.appendChild(resumo);
  }

  const acoes = criarElemento("div", "video-actions");
  acoes.appendChild(criarLink("Assistir no YouTube →", `https://www.youtube.com/watch?v=${video.id}`, "btn btn-primary"));
  acoes.appendChild(criarLink("Transmissões anteriores →", `${YOUTUBE_CHANNEL_URL}/streams`, "btn btn-ghost"));
  meta.appendChild(acoes);
  principal.appendChild(meta);
  layout.appendChild(principal);

  // capítulos
  if (video.capitulos && video.capitulos.length) {
    const lateral = criarElemento("aside", "chapters");
    lateral.appendChild(criarElemento("p", "chapters-title mono", "Capítulos"));
    const lista = criarElemento("ol", "chapters-list");
    const inicio = paraSegundos(video.inicio);

    video.capitulos.forEach((cap, i) => {
      const segundos = paraSegundos(cap.tempo);
      const proximo = video.capitulos[i + 1] ? paraSegundos(video.capitulos[i + 1].tempo) : Infinity;
      const botao = criarElemento("button", "chapter");
      botao.type = "button";
      botao.appendChild(criarElemento("span", "chapter-time mono", cap.tempo));
      botao.appendChild(criarElemento("span", "chapter-name", cap.titulo));
      if (inicio >= segundos && inicio < proximo) botao.classList.add("is-active");
      botao.addEventListener("click", () => {
        if (!tocaNoSite) {
          window.open(urlNoYouTube(video, segundos), "_blank", "noopener");
          return;
        }
        iframe.src = urlDoPlayer(video, segundos, true);
        lista.querySelectorAll(".chapter").forEach((b) => b.classList.remove("is-active"));
        botao.classList.add("is-active");
        if (window.innerWidth < 900) wrap.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      const li = document.createElement("li");
      li.appendChild(botao);
      lista.appendChild(li);
    });

    lateral.appendChild(lista);
    layout.appendChild(lateral);
  }
  broadcastBody.appendChild(layout);

  // transmissões anteriores
  const outros = VIDEOS.map((v, i) => ({ v, i })).filter(({ i }) => i !== indice);
  if (outros.length) {
    const bloco = criarElemento("div", "past-videos");
    bloco.appendChild(criarElemento("p", "chapters-title mono", indice === 0 ? "Transmissões anteriores" : "Outras transmissões"));
    const grade = criarElemento("div", "past-grid");
    outros.forEach(({ v, i }) => {
      const card = criarElemento("button", "past-card");
      card.type = "button";
      const thumb = document.createElement("img");
      thumb.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
      thumb.alt = "";
      thumb.loading = "lazy";
      card.appendChild(thumb);
      const texto = criarElemento("span", "past-text");
      texto.appendChild(criarElemento("span", "past-title", v.titulo));
      texto.appendChild(criarElemento("span", "past-date mono", formatarData(v.data)));
      card.appendChild(texto);
      card.addEventListener("click", () => {
        renderizarVideo(i);
        document.getElementById("ultimoProjeto").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      grade.appendChild(card);
    });
    bloco.appendChild(grade);
    broadcastBody.appendChild(bloco);
  }

  const rotulo = indice === 0 ? "Último projeto" : "Transmissão anterior";
  setStatus("ok", `${rotulo} · ${formatarData(video.data)}`);
}

// só a página transmissoes.html tem o painel de vídeo
if (broadcastBody) {
  if (typeof VIDEOS !== "undefined" && VIDEOS.length) {
    renderizarVideo(0);
  } else {
    broadcastBody.replaceChildren();
    const aviso = criarElemento("div", "video-fallback");
    aviso.appendChild(criarLink("Veja nossos vídeos no YouTube →", YOUTUBE_CHANNEL_URL));
    broadcastBody.appendChild(aviso);
    setStatus("error", "Nenhum vídeo configurado");
  }
}
