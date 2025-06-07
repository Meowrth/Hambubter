
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.href.split('#')[0]);
}
  
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('menu-links');
  toggle.addEventListener('click', function () {
    menu.classList.toggle('menu-open');
    menu.classList.toggle('collapsed-menu');
    this.setAttribute('aria-expanded', menu.classList.contains('menu-open'));
  });
  document.addEventListener('click', (e) => {
    if (
      window.innerWidth < 768 &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      menu.classList.add('collapsed-menu');
      menu.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  let currentDialogue = 0;
  const dialogues = document.querySelectorAll('.dialogue-row');
  function showNextDialogue() {
    if (currentDialogue > 0) {
      const prev = dialogues[currentDialogue - 1];
      prev.classList.replace('visible','hidden');
      prev.setAttribute('aria-hidden','true');
    }
    if (currentDialogue < dialogues.length) {
      const next = dialogues[currentDialogue];
      next.classList.replace('hidden','visible');
      next.setAttribute('aria-hidden','false');
      next.scrollIntoView({ behavior: 'smooth', block: 'center' });
      currentDialogue++;
      if (currentDialogue === dialogues.length) {
        const btn = document.getElementById('dialogueBtn');
        btn.textContent = 'All Dialogues Shown';
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

});
