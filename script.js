/* S K Creations — interactive scripts */

// Force every page refresh to land at the top (Home)
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
// Strip any hash on load so URL stays clean and view is at top
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);

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
const galleryGrid = document.getElementById('galleryGrid');
const galleryLightbox = document.getElementById('galleryLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

const galleryProjects = Array.from({ length: 73 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  const categories = ['glazing', 'acp', 'interior', 'window', 'railing'];
  const sizePattern = ['', '', '', 'tile--wide', '', '', 'tile--tall'];
  return {
    image: `assets/images/photo-${number}.jpg`,
    alt: `Project photo ${number}`,
    cat: categories[index % categories.length],
    size: sizePattern[index % sizePattern.length],
  };
});

galleryGrid.innerHTML = galleryProjects.map(project => `
  <figure class="tile ${project.size}" data-cat="${project.cat}" tabindex="0" role="button" aria-label="Open ${project.alt}">
    <img loading="lazy" src="${project.image}" alt="${project.alt}">
  </figure>
`).join('');

const tiles = document.querySelectorAll('#galleryGrid .tile');

const openLightbox = image => {
  if (!image) return;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  galleryLightbox.classList.add('is-open');
  galleryLightbox.setAttribute('aria-hidden', 'false');
};

const closeLightbox = () => {
  galleryLightbox.classList.remove('is-open');
  galleryLightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.removeAttribute('src');
};

galleryGrid.addEventListener('click', e => {
  const tile = e.target.closest('.tile');
  if (!tile || tile.classList.contains('is-hidden')) return;
  openLightbox(tile.querySelector('img'));
});

galleryGrid.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const tile = e.target.closest('.tile');
  if (!tile || tile.classList.contains('is-hidden')) return;
  e.preventDefault();
  openLightbox(tile.querySelector('img'));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && galleryLightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});

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

filters.querySelector('[data-filter="all"]')?.click();

// Reveal on scroll
const revealTargets = document.querySelectorAll('.section:not(.gallery), .card, .quote, .why__item, .hero__stats div');
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

const gallerySection = document.getElementById('gallery');
if (gallerySection) gallerySection.classList.add('is-visible');

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
