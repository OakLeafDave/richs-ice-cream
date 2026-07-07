// Mobile nav toggle
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Reveal on scroll
const revealEls = document.querySelectorAll(
  '.tl-item, .promise-item, .flavor, .spec-card, .loc-card, .cakes-art, .cakes-text, .signature-text, .signature-art'
);
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
});
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const el = e.target;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, (i % 4) * 70);
      io.unobserve(el);
    }
  });
}, { threshold: 0.14 });
revealEls.forEach(el => io.observe(el));

// Current year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
