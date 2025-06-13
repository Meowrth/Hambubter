// FAQ open/close animation
document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
        let a = q.nextElementSibling;
        a.style.display = (a.style.display === "block") ? "none" : "block";
    });
});
// Navigation active highlight
window.addEventListener('scroll', function(){
    const sections = ['about', 'tokenomics', 'roadmap', 'community', 'faq'];
    let last = null;
    for(const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY+120 >= el.offsetTop) last = id;
    }
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    if (last) document.querySelector(`nav a[href="#${last}"]`).classList.add('active');
});
// Smooth scroll for nav
document.querySelectorAll('nav a').forEach(function(link){
    link.addEventListener('click', function(e){
        const href = link.getAttribute('href');
        if(href.startsWith('#')){
            e.preventDefault();
            document.querySelector(href).scrollIntoView({behavior:'smooth'});
        }
    });
});
