/* S K Creations — interactive scripts */

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky nav
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  links.classList.toggle('is-open');
  nav.classList.toggle('is-mobile-open');
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('is-open');
    nav.classList.remove('is-mobile-open');
  })
);

// Gallery filters
const filters = document.getElementById('filters');
const tiles = document.querySelectorAll('#galleryGrid .tile');
filters.addEventListener('click', e => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  filters.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
  btn.classList.add('is-active');
  const cat = btn.dataset.filter;
  tiles.forEach(t => {
    t.classList.toggle('is-hidden', cat !== 'all' && t.dataset.cat !== cat);
  });
});

// Reveal on scroll
const revealTargets = document.querySelectorAll('.section, .card, .tile, .quote, .why__item, .hero__stats div');
revealTargets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => io.observe(el));

// Contact form (front-end only — wire to Formspree/Vercel function later)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (!data.name || !data.phone) {
    note.style.color = '#dc2626';
    note.textContent = 'Please fill in your name and phone number.';
    return;
  }
  // Build a WhatsApp deep link with the message
  const msg = encodeURIComponent(
    `Hi S K Creations,%0A` +
    `Name: ${data.name}%0A` +
    `Phone: ${data.phone}%0A` +
    `Email: ${data.email || '-'}%0A` +
    `Service: ${data.service}%0A` +
    `Details: ${data.message || '-'}`
  );
  note.style.color = '';
  note.textContent = '✓ Opening WhatsApp to send your enquiry…';
  window.open(`https://wa.me/918208423922?text=${msg}`, '_blank');
  form.reset();
});
