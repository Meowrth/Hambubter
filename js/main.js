// FAQ open/close with accessibility & animation
document.querySelectorAll('.faq-q').forEach(function(q, idx){
    // 고유 id 연결
    const a = q.nextElementSibling;
    const answerId = 'faq-a-' + idx;
    a.id = answerId;
    q.setAttribute('tabindex', '0');
    q.setAttribute('aria-expanded', 'false');
    q.setAttribute('aria-controls', answerId);
    a.setAttribute('hidden', '');

    function toggleFaq() {
        const expanded = q.getAttribute('aria-expanded') === 'true';
        q.setAttribute('aria-expanded', (!expanded).toString());
        if (expanded) {
            a.setAttribute('hidden', '');
            // 슬라이드 애니메이션 (선택)
            a.style.maxHeight = null;
        } else {
            a.removeAttribute('hidden');
            a.style.maxHeight = a.scrollHeight + "px";
        }
    }

    q.addEventListener('click', toggleFaq);
    q.addEventListener('keydown', function(e) {
        if (e.key === "Enter" || e.key === " " ) {
            e.preventDefault();
            toggleFaq();
        }
    });
});

// Navigation active highlight (정밀)
window.addEventListener('scroll', function(){
    const sections = ['about', 'tokenomics', 'roadmap', 'community', 'faq'];
    let current = null;
    for(const id of sections) {
        const el = document.getElementById(id);
        if (el) {
            const rect = el.getBoundingClientRect();
            // 화면 위에서 120px 이하로 진입하면 active (상단 고정 메뉴 고려)
            if (rect.top < 120 && rect.bottom > 80) {
                current = id;
            }
        }
    }
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    if (current) {
        const navLink = document.querySelector(`nav a[href="#${current}"]`);
        if (navLink) navLink.classList.add('active');
    }
});

// Smooth scroll for nav, focus section after scroll
document.querySelectorAll('nav a').forEach(function(link){
    link.addEventListener('click', function(e){
        const href = link.getAttribute('href');
        if(href && href.startsWith('#')){
            const target = document.querySelector(href);
            if(target) {
                e.preventDefault();
                target.scrollIntoView({behavior:'smooth'});
                // 약간의 지연 후 포커스 (스크린리더/접근성 ↑)
                setTimeout(() => { target.focus && target.focus(); }, 600);
            }
        }
    });
});
