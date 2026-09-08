const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@HubExperimentosOnline";
const VIDEO_EMBED_ID = "xH63kRb5R74";

document.getElementById("anoAtual").textContent = new Date().getFullYear();

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

const statusDot = document.querySelector(".status-dot");
const statusText = document.getElementById("statusText");
const broadcastBody = document.getElementById("broadcastBody");

function setStatus(kind, texto) {
  statusDot.className = "status-dot" + (kind ? ` is-${kind}` : "");
  statusText.textContent = texto;
}

function renderizarVideoManual() {
  broadcastBody.innerHTML = `
    <div class="video-wrap">
      <iframe
        src="https://www.youtube.com/embed/${VIDEO_EMBED_ID}?rel=0"
        title="Vídeo de apresentação do laboratório"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy">
      </iframe>
    </div>
    <div class="video-meta">
      <span class="video-title">Vídeo de apresentação do laboratório</span>
      <span class="video-date mono">Conteúdo manual configurado no site</span>
    </div>
  `;
  setStatus("ok", "Vídeo em exibição");
}

async function carregarUltimoProjeto() {
  setStatus(null, "Carregando vídeo…");
  renderizarVideoManual();
}

document.addEventListener("DOMContentLoaded", carregarUltimoProjeto);
