const IP = "silentfall.aurorix.pro";

const toast = document.getElementById("toast");
function showToast(text) {
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyIp() {
  try {
    await navigator.clipboard.writeText(IP);
  } catch (e) {
    const input = document.createElement("textarea");
    input.value = IP;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
  showToast("IP скопирован: " + IP);
}

document.querySelectorAll(".copy-ip").forEach(el => el.addEventListener("click", copyIp));

const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");
if (burger && navMenu) {
  burger.addEventListener("click", () => navMenu.classList.toggle("open"));
  navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("open")));
}

const glow = document.getElementById("cursorGlow");
window.addEventListener("mousemove", e => {
  if (!glow) return;
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Плавное появление секций при прокрутке
const revealTargets = document.querySelectorAll(".section-head, .rank-card, .sale-box, .feature-grid article, .cta");
revealTargets.forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: .12, rootMargin: "0px 0px -35px 0px" });
revealTargets.forEach(el => io.observe(el));

// Лёгкий 3D-эффект карточек на ПК
if (window.matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll(".rank-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `translateY(-7px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });

  const panel = document.querySelector(".server-panel");
  if (panel) {
    panel.addEventListener("mousemove", e => {
      const r = panel.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      panel.style.transform = `perspective(900px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
    });
    panel.addEventListener("mouseleave", () => panel.style.transform = "");
  }
}
