document.addEventListener('DOMContentLoaded', () => {
  // 1) Strip any “#…” fragment off the URL bar immediately
  if (window.location.hash) {
    const cleanURL = window.location.href.split('#')[0];
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  // 2) Scroll-to-top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3) Menu toggle
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('menu-links');
  toggle.addEventListener('click', function() {
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

  // 4) Dialogue progression
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
  document.getElementById('dialogueBtn').addEventListener('click', showNextDialogue);

  // 5) Copy-to-clipboard
  document.getElementById('copy-btn').addEventListener('click', () => {
    const address = document.getElementById('sol-address').innerText.trim();
    navigator.clipboard.writeText(address).then(() => {
      alert('Address copied!');
    });
  });

  // 6) Chart download (if you have a global `chart` instance)
  const downloadBtn = document.getElementById('downloadChart');
  if (downloadBtn && typeof chart !== 'undefined') {
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = chart.toBase64Image();
      link.download = 'hbub_distribution.png';
      link.click();
    });
  }
}); 
