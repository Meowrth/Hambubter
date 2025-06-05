const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
const copyBtn = document.getElementById("copy-btn");
const solAddress = document.getElementById("sol-address");
const dialogueBtn = document.getElementById("dialogueBtn");
const dialogues = document.querySelectorAll(".dialogue-row");

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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

copyBtn.addEventListener("click", () => {
  const address = solAddress.innerText.trim();
  navigator.clipboard.writeText(address)
    .then(() => {
      alert("Address copied!");
    })
    .catch((err) => {
      console.error("복사 실패:", err);
    });
});

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

dialogueBtn.addEventListener("click", showNextDialogue);
