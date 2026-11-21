const LK = "assets/logo-light.png";
const LW = "assets/logo-dark.png";
const root = document.documentElement;
const themeToggle = document.getElementById("tg");
const topLogo = document.getElementById("lg-top");
const sideLogo = document.getElementById("lg-side");

document.querySelectorAll("[data-w]").forEach((image) => {
  image.src = LW;
});

function setTheme(theme, save = false) {
  root.dataset.theme = theme;
  topLogo.src = theme === "dark" ? LW : LK;
  sideLogo.src = theme === "dark" ? LW : LK;
  themeToggle.setAttribute("aria-pressed", theme === "dark");

  if (save) {
    try {
      localStorage.setItem("pua-theme", theme);
    } catch (error) {
      // A seleção do tema continua funcionando sem armazenamento local.
    }
  }
}

let savedTheme = null;

try {
  savedTheme = localStorage.getItem("pua-theme");
} catch (error) {
  // Usa o tema claro padrão quando o armazenamento não estiver disponível.
}

setTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
});

const socialIcons = {
  instagram:
    '<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.6 5.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/>',
  tiktok:
    '<path d="M16 3c.3 2.4 1.8 4 4 4.2v3.1c-1.5 0-2.9-.4-4-1.2V16a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2a2.9 2.9 0 1 0 2 2.7V3h3z"/>',
  youtube:
    '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"/>',
};

function createSocialLink(icon, label, href) {
  return `<a href="${href}" target="_blank" rel="noopener" aria-label="${label}"><svg viewBox="0 0 24 24">${socialIcons[icon]}</svg></a>`;
}

const houseSocial = createSocialLink(
  "instagram",
  "Instagram da Casa do Hip-Hop",
  "https://www.instagram.com/casahiphoppiracicaba/",
);

const teamSocial =
  createSocialLink(
    "instagram",
    "Instagram da Discovery",
    "https://www.instagram.com/discovery_nw/",
  ) +
  createSocialLink(
    "tiktok",
    "TikTok da Discovery",
    "https://www.tiktok.com/@discovery_nw",
  ) +
  createSocialLink(
    "youtube",
    "YouTube da Discovery",
    "https://www.youtube.com/@DiscoveryNewWays",
  );

document.getElementById("soc-top").innerHTML = houseSocial + teamSocial;
document.getElementById("soc-ch").innerHTML = houseSocial;
document.getElementById("soc-dc").innerHTML = teamSocial;

const marqueeWords = [
  "Um gesto hoje",
  "Por um amanhã",
  "Discovery New Ways",
  "Stem Racing",
  "Casa do Hip-Hop",
  "Piracicaba",
];

const marqueeContent = marqueeWords
  .map((word) => `<span>${word}</span><span>●</span>`)
  .join("");

document.getElementById("mq").innerHTML = marqueeContent.repeat(4);

/* Navegação entre abas */
const tabButtons = [...document.querySelectorAll("nav button")];
const panelIds = ["quem-somos", "o-que-e", "o-projeto"];
const panels = document.querySelectorAll(".panel");
const strip = document.querySelector(".strip");

function showPanel(id, updateHash = false) {
  const activeId = panelIds.includes(id) ? id : "quem-somos";

  panels.forEach((panel) => {
    panel.classList.toggle("on", panel.id === activeId);
  });

  tabButtons.forEach((button) => {
    button.setAttribute("aria-selected", button.dataset.tab === activeId);
  });

  if (updateHash && location.hash !== `#${activeId}`) {
    history.replaceState(null, "", `#${activeId}`);
  }
}

document.querySelectorAll("[data-tab]").forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    showPanel(element.dataset.tab, true);
    strip.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

addEventListener("hashchange", () => showPanel(location.hash.slice(1)));
showPanel(location.hash.slice(1));


// CARROSSEL CONTÍNUO
const carouselTrack = document.querySelector(".carousel-track");
const carouselWindow = document.querySelector(".carousel-window");

if (carouselTrack && carouselWindow) {
    const originalSlides = [...carouselTrack.children];

    // Duplica as fotos para criar um movimento infinito
    originalSlides.forEach((slide) => {
        carouselTrack.appendChild(slide.cloneNode(true));
    });

    let position = 0;
    let lastTime = 0;
    let animationId;
    let isPaused = false;

    // Velocidade em pixels por segundo
    const speed = 35;

    function animateCarousel(time) {
        if (!lastTime) lastTime = time;

        const deltaTime = (time - lastTime) / 1000;
        lastTime = time;

        if (!isPaused) {
            position += speed * deltaTime;

            const halfWidth = carouselTrack.scrollWidth / 2;

            if (position >= halfWidth) {
                position -= halfWidth;
            }

            carouselTrack.scrollLeft = position;
        }

        animationId = requestAnimationFrame(animateCarousel);
    }

    animationId = requestAnimationFrame(animateCarousel);

    // Pausa quando o mouse estiver sobre o carrossel
    carouselWindow.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    carouselWindow.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    // Pausa durante o toque na tela
    carouselWindow.addEventListener("touchstart", () => {
        isPaused = true;
    });

    carouselWindow.addEventListener("touchend", () => {
        isPaused = false;
    });
}


/* Formulário de apadrinhamento */
/* PIX copia e cola */
/* PIX copia e cola */
const pixCopy = document.getElementById("pix-copy");
const pixCode = document.getElementById("pix-code");
const pixStatus = document.getElementById("pix-status");

pixCopy.addEventListener("click", async () => {
  const code = pixCode.textContent.trim();

  try {
    await navigator.clipboard.writeText(code);
    pixStatus.textContent = "Código PIX copiado!";
  } catch (error) {
    // Plano B para quando o site é aberto fora de https/localhost
    const range = document.createRange();
    range.selectNodeContents(pixCode);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (e) {}

    pixStatus.textContent = copied
      ? "Código PIX copiado!"
      : "Selecione e copie o código acima.";
  }

  setTimeout(() => (pixStatus.textContent = ""), 3000);
});

/* =========================================
   VISUALIZADOR DE FOTOS — TELA CHEIA
   ========================================= */

const lightbox = document.createElement("div");
lightbox.className = "photo-lightbox";

lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Fechar imagem">
    &times;
  </button>
  <img src="" alt="">
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

function openLightbox(image) {
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "Fotografia ampliada";

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelector("#o-projeto .gal").addEventListener("click", (event) => {
  const image = event.target.closest("img");

  if (!image) return;

  openLightbox(image);
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});