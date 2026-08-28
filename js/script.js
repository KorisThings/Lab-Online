/* ==========================================================================
   CONFIGURAÇÃO — edite apenas esta parte para ligar o site ao seu canal
   ========================================================================== */
const YOUTUBE_CHANNEL_ID = "UCalNG5TdXRirR_ksbI8qXMA";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@HubExperimentosOnline";

/*
  Como achar o ID do canal:
  1. Abra o canal no YouTube.
  2. Clique em "Sobre" (About) > "Compartilhar canal" > "Copiar ID do canal".
  3. Cole o valor acima, substituindo o texto entre aspas.

  Este site agora usa a YouTube Data API v3 para detectar com precisão
  quando há uma transmissão ao vivo (live).
*/
const USE_YOUTUBE_DATA_API = true;
const YOUTUBE_DATA_API_KEY = "AIzaSyDzTw_6xJQsh2UUX_ycnsKK0QB6bErhWKQ";

/* ========================================================================== */

document.getElementById("anoAtual").textContent = new Date().getFullYear();

/* ---------- menu mobile ---------- */
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

/* ---------- reveal ao rolar a página ---------- */
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

/* ==========================================================================
   ÚLTIMO PROJETO — busca o vídeo mais recente do canal no YouTube
   ========================================================================== */
const statusDot = document.querySelector(".status-dot");
const statusText = document.getElementById("statusText");
const broadcastBody = document.getElementById("broadcastBody");

function setStatus(kind, texto) {
  statusDot.className = "status-dot" + (kind ? ` is-${kind}` : "");
  statusText.textContent = texto;
}

function extrairVideoId(link, guid) {
  const porLink = link && link.match(/[?&]v=([\w-]{11})/);
  if (porLink) return porLink[1];
  const porGuid = guid && guid.match(/video:([\w-]{11})/);
  if (porGuid) return porGuid[1];
  return null;
}

function formatarData(dataISO) {
  try {
    return new Date(dataISO).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return "";
  }
}

function renderizarVideo({ videoId, titulo, dataPublicacao, aoVivo }) {
  broadcastBody.innerHTML = `
    <div class="video-wrap">
      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        title="${titulo.replace(/"/g, "&quot;")}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy">
      </iframe>
    </div>
    <div class="video-meta">
      <span class="video-title">${titulo}</span>
      <span class="video-date mono">${formatarData(dataPublicacao)}</span>
    </div>
  `;
  setStatus(aoVivo ? "live" : "ok", aoVivo ? "🔴 Transmitindo agora" : "✓ Última publicação sincronizada");
}

function renderizarFallback() {
  broadcastBody.innerHTML = `
    <div class="video-fallback">
      <p>Não foi possível carregar o vídeo automaticamente agora.</p>
      <p>Acompanhe direto no <a href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener">canal do YouTube</a>.</p>
    </div>
  `;
  setStatus("error", "❌ Não sincronizado — verifique a chave de API");
}

async function buscarViaDataAPI() {
  const buscaUrl =
    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_DATA_API_KEY}` +
    `&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet&order=date&maxResults=1&type=video`;

  const resposta = await fetch(buscaUrl);
  const dados = await resposta.json();
  
  if (dados.error) {
    console.error("Erro da API YouTube:", dados.error.message);
    throw new Error(dados.error.message);
  }
  
  if (!dados.items || !dados.items.length) throw new Error("Nenhum vídeo encontrado");

  const item = dados.items[0];
  renderizarVideo({
    videoId: item.id.videoId,
    titulo: item.snippet.title,
    dataPublicacao: item.snippet.publishedAt,
    aoVivo: item.snippet.liveBroadcastContent === "live",
  });
}

async function carregarUltimoProjeto() {
  if (!YOUTUBE_CHANNEL_ID || YOUTUBE_CHANNEL_ID.includes("COLOQUE_AQUI")) {
    setStatus("error", "Configure YOUTUBE_CHANNEL_ID em js/script.js");
    renderizarFallback();
    return;
  }

  setStatus(null, "Sincronizando com o canal…");

  try {
    if (USE_YOUTUBE_DATA_API && YOUTUBE_DATA_API_KEY && !YOUTUBE_DATA_API_KEY.includes("SUA_CHAVE")) {
      await buscarViaDataAPI();
    } else {
      throw new Error("API não configurada");
    }
  } catch (erro) {
    console.error("Erro ao carregar o último projeto:", erro);
    renderizarFallback();
  }
}

document.addEventListener("DOMContentLoaded", carregarUltimoProjeto);
