
document.getElementById("menu-toggle").addEventListener("click", function () {
  const menu = document.getElementById("menu-links");
  menu.classList.toggle("menu-open");
  menu.classList.toggle("collapsed-menu");
  this.setAttribute("aria-expanded", menu.classList.contains("menu-open"));
});

document.addEventListener("click", function (e) {
  const menu = document.getElementById("menu-links");
  const toggle = document.getElementById("menu-toggle");
  if (
    window.innerWidth < 768 &&
    !menu.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    menu.classList.add("collapsed-menu");
    menu.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

let currentDialogue = 0;
const dialogues = document.querySelectorAll(".dialogue-row");

function showNextDialogue() {

  if (currentDialogue > 0) {
    const prev = dialogues[currentDialogue - 1];
    prev.classList.remove("visible");
    prev.classList.add("hidden");
    prev.setAttribute("aria-hidden", "true");
  }
  
  if (currentDialogue < dialogues.length) {
    const next = dialogues[currentDialogue];
    next.classList.remove("hidden");
    next.classList.add("visible");
    next.setAttribute("aria-hidden", "false");
    next.scrollIntoView({ behavior: 'smooth', block: 'center' });
    currentDialogue++;
    
    if (currentDialogue === dialogues.length) {
      const btn = document.getElementById("dialogueBtn");
      btn.textContent = "All Dialogues Shown";
      btn.disabled = true;
    }
  }
}

document.getElementById("dialogueBtn").addEventListener("click", showNextDialogue);

document.getElementById("copy-btn").addEventListener("click", function () {
  const address = document.getElementById("sol-address").innerText.trim();
  navigator.clipboard.writeText(address).then(() => {
    alert("Address copied!");
  });
});
