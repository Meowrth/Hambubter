/* =================================================================
   main.js – loaded with defer
================================================================= */
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://hbubcoin.com/",
  "name": "HBUB Hambubter Meme Coin",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://hbubcoin.com/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

(() => {
  /* -------- Mobile nav toggle -------- */
  const menuBtn   = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileNav.classList.toggle('active');
    });
  }

  /* -------- Section highlight (IntersectionObserver) -------- */
  const sectionIds = ['about','tokenomics','roadmap','community','faq'];
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (link) link.classList.toggle('active', entry.isIntersecting && entry.intersectionRatio > 0.55);
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0.25 }
  );
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  /* -------- FAQ accordion -------- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.style.display = 'none';
      });
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.style.display = 'block';
      }
    });
  });
})();
