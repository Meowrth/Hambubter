console.log("▶ main.js loaded");

const menuToggle       = document.getElementById("menu-toggle");
const menuLinks        = document.getElementById("menu-links");
const copyBtn          = document.getElementById("copy-btn");
const solAddress       = document.getElementById("sol-address");
const dialogueBtn      = document.getElementById("dialogueBtn");
const dialogues        = document.querySelectorAll(".dialogue-row");
const header           = document.querySelector('.site-header');
const heroSection      = document.getElementById('hero');
const parallaxImg      = document.getElementById('parallax-img');
const btnScrollAbout   = document.getElementById("btn-scroll-about");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuLinks.classList.toggle("expanded");
});

document.addEventListener("click", (event) => {
  if (
    window.innerWidth < 768 &&
    !menuLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    menuLinks.classList.remove("expanded");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

function checkViewport() {
  if (window.innerWidth < 768) {
    menuToggle.style.display = "block";
    menuLinks.classList.add("collapsed");
    menuLinks.classList.remove("expanded");
  } else {
    menuToggle.style.display = "none";
    menuLinks.classList.remove("collapsed", "expanded");
  }
}
window.addEventListener("load", checkViewport);
window.addEventListener("resize", checkViewport);

window.scrollToTop = function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.scrollToSection = function(id) {
  console.log("▶ scrollToSection called, id =", id);
  const target = document.getElementById(id);
  if (!target) {
    console.warn("⚠ Section not found for id:", id);
    return;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

if (btnScrollAbout) {
  btnScrollAbout.addEventListener("click", () => {
    console.log("▶ Learn More button clicked");
    scrollToSection("about");
  });
}

if (copyBtn && solAddress) {
  copyBtn.addEventListener("click", () => {
    const address = solAddress.innerText.trim();
    navigator.clipboard.writeText(address)
      .then(() => showToast('Address copied!'))
      .catch(() => showToast('Copy failed: please try again'));
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
}

let currentDialogue = 0;
dialogues.forEach((d) => (d.style.display = "none"));

function showNextDialogue() {
  if (currentDialogue < dialogues.length) {
    const dialogue = dialogues[currentDialogue];
    dialogue.style.display = "flex";
    setTimeout(() => dialogue.classList.add("show"), 50);
    dialogue.scrollIntoView({ behavior: "smooth", block: "center" });
    currentDialogue++;
  } else {
    location.reload();
  }
}
if (dialogueBtn) {
  dialogueBtn.addEventListener("click", showNextDialogue);
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

window.addEventListener('scroll', () => {
  const scrollY      = window.scrollY;
  const heroHeight   = heroSection.offsetHeight;

  parallaxImg.style.transform = `translate(-50%, ${scrollY * 0.5}px)`;

  if (scrollY <= heroHeight) {
    const blurValue = (scrollY / heroHeight) * 8;
    parallaxImg.style.filter = `blur(${blurValue}px)`;
  } else {
    parallaxImg.style.filter = 'blur(0px)';
  }
});

function startCountdown(deadline) {
  const timerEl = document.getElementById('countdown');
  function updateTimer() {
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0) {
      timerEl.innerText = 'Event has ended';
      clearInterval(interval);
      return;
    }
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    timerEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  }
  updateTimer();
  const interval = setInterval(updateTimer, 1000);
}

startCountdown(new Date('2025-06-30T23:59:59'));
