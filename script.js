const revealTargets = document.querySelectorAll(
  ".step-card, .outcome-card, .module-card, .comparison-card, .inside-visual, .inside-copy, .offer-content, .price-panel, .faq-grid > div, .section-kicker, section h2, .section-intro"
);

// Altere somente esta constante caso o endereço do checkout mude.
const CHECKOUT_URL = "https://pay.cakto.com.br/38zxpaz_1076733";

document.querySelectorAll("[data-checkout]").forEach((link) => {
  link.setAttribute("href", CHECKOUT_URL);
});

revealTargets.forEach((target, index) => {
  target.dataset.reveal = "";
  target.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" }
);

revealTargets.forEach((target) => observer.observe(target));

function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
}

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });

// Partículas leves criadas em JavaScript, sem bibliotecas externas.
const particleLayer = document.querySelector(".ambient-particles");
const particleCount = window.innerWidth < 680 ? 12 : 24;

for (let index = 0; index < particleCount; index += 1) {
  const particle = document.createElement("i");
  particle.className = "particle";
  particle.style.setProperty("--x", `${Math.random() * 100}%`);
  particle.style.setProperty("--size", `${1 + Math.random() * 3}px`);
  particle.style.setProperty("--duration", `${10 + Math.random() * 13}s`);
  particle.style.setProperty("--delay", `${-Math.random() * 18}s`);
  particle.style.setProperty("--drift", `${-45 + Math.random() * 90}px`);
  particle.style.setProperty("--particle-color", index % 4 === 0 ? "#c8ff16" : "#a86cff");
  particleLayer.appendChild(particle);
}

// Brilho e parallax acompanham o ponteiro apenas em dispositivos compatíveis.
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (finePointer) {
  document.body.classList.add("has-pointer");
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
  }, { passive: true });

  document.querySelectorAll("[data-tilt]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const box = element.getBoundingClientRect();
      const rotateX = ((event.clientY - box.top) / box.height - 0.5) * -7;
      const rotateY = ((event.clientX - box.left) / box.width - 0.5) * 9;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    element.addEventListener("pointerleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
  });
}

// Feedback animado nos botões.
document.querySelectorAll(".cta").forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    button.classList.add("is-pressed");
    const box = button.getBoundingClientRect();
    const ripple = document.createElement("i");
    ripple.className = "ripple";
    const size = Math.max(box.width, box.height) * 1.8;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - box.left}px`;
    ripple.style.top = `${event.clientY - box.top}px`;
    button.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 650);
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach((type) => {
    button.addEventListener(type, () => button.classList.remove("is-pressed"));
  });
});

// Pequeno parallax das luzes durante a rolagem.
const orbs = document.querySelectorAll(".orb");
let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    orbs.forEach((orb, index) => {
      orb.style.translate = `0 ${window.scrollY * (0.025 + index * 0.008)}px`;
    });
    ticking = false;
  });
}, { passive: true });

document.querySelectorAll(".faq-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const wasOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem.querySelector(".faq-button").setAttribute("aria-expanded", "false");
    });

    if (!wasOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});
