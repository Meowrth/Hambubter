document.addEventListener('DOMContentLoaded', () => {
  // URL hash 제거
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  // Scroll-to-top 버튼
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 햄버거 메뉴
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('menu-links');
  toggle.addEventListener('click', function() {
    menu.classList.toggle('menu-open');
    menu.classList.toggle('collapsed-menu');
    this.setAttribute('aria-expanded', menu.classList.contains('menu-open'));
  });

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu-links');

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    menu.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', menu.classList.contains('menu-open'));
  });

  // 메뉴 바깥 클릭시 닫기
  document.addEventListener('click', function(e) {
    if (
      window.innerWidth < 769 &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      menu.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // 메뉴 링크 클릭하면 닫기
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if(window.innerWidth < 769) {
        menu.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

  // Whitepaper 인라인 뷰
  document.getElementById('whitepaper-link').addEventListener('click', e => {
    e.preventDefault();
    const sec = document.getElementById('whitepaper-section');
    sec.style.display = 'block';
    sec.scrollIntoView({ behavior: 'smooth' });
  });

  // Dialogue progression
  let currentDialogue = 0;
  const dialogues = document.querySelectorAll('.dialogue-row');
  const dialogueBtn = document.getElementById('dialogueBtn');
  function showNextDialogue() {
    if (currentDialogue > 0) {
      const prev = dialogues[currentDialogue - 1];
      prev.classList.add('hidden');
      prev.setAttribute('aria-hidden','true');
    }
    if (currentDialogue < dialogues.length) {
      const next = dialogues[currentDialogue];
      next.classList.remove('hidden');
      next.setAttribute('aria-hidden','false');
      next.scrollIntoView({ behavior: 'smooth', block: 'center' });
      currentDialogue++;
      if (currentDialogue === dialogues.length) {
        dialogueBtn.textContent = 'All Dialogues Shown';
        dialogueBtn.disabled = true;
      }
    }
  }
  if (dialogueBtn) dialogueBtn.addEventListener('click', showNextDialogue);

  // Copy-to-clipboard (기부 주소)
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) copyBtn.addEventListener('click', () => {
    const address = document.getElementById('sol-address').innerText.trim();
    navigator.clipboard.writeText(address).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
    });
  });

  // 차트 다운로드 (옵션)
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
