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
const galleryProjects = [
  { image: 'assets/images/photo-01.jpg', name: 'Project 01', cat: 'glazing', size: 'tile--wide', alt: 'Project photo 01' },
  { image: 'assets/images/photo-02.jpg', name: 'Project 02', cat: 'acp', size: '', alt: 'Project photo 02' },
  { image: 'assets/images/photo-03.jpg', name: 'Project 03', cat: 'interior', size: '', alt: 'Project photo 03' },
  { image: 'assets/images/photo-04.jpg', name: 'Project 04', cat: 'window', size: '', alt: 'Project photo 04' },
  { image: 'assets/images/photo-05.jpg', name: 'Project 05', cat: 'glazing', size: 'tile--tall', alt: 'Project photo 05' },
  { image: 'assets/images/photo-06.jpg', name: 'Project 06', cat: 'interior', size: '', alt: 'Project photo 06' },
  { image: 'assets/images/photo-07.jpg', name: 'Project 07', cat: 'railing', size: '', alt: 'Project photo 07' },
  { image: 'assets/images/photo-08.jpg', name: 'Project 08', cat: 'acp', size: '', alt: 'Project photo 08' },
  { image: 'assets/images/photo-09.jpg', name: 'Project 09', cat: 'glazing', size: 'tile--wide', alt: 'Project photo 09' },
  { image: 'assets/images/photo-10.jpg', name: 'Project 10', cat: 'window', size: '', alt: 'Project photo 10' },
  { image: 'assets/images/photo-11.jpg', name: 'Project 11', cat: 'glazing', size: '', alt: 'Project photo 11' },
  { image: 'assets/images/photo-12.jpg', name: 'Project 12', cat: 'acp', size: '', alt: 'Project photo 12' },
  { image: 'assets/images/photo-13.jpg', name: 'Project 13', cat: 'interior', size: '', alt: 'Project photo 13' },
  { image: 'assets/images/photo-14.jpg', name: 'Project 14', cat: 'window', size: 'tile--tall', alt: 'Project photo 14' },
  { image: 'assets/images/photo-15.jpg', name: 'Project 15', cat: 'glazing', size: '', alt: 'Project photo 15' },
  { image: 'assets/images/photo-16.jpg', name: 'Project 16', cat: 'interior', size: '', alt: 'Project photo 16' },
  { image: 'assets/images/photo-17.jpg', name: 'Project 17', cat: 'railing', size: '', alt: 'Project photo 17' },
  { image: 'assets/images/photo-18.jpg', name: 'Project 18', cat: 'acp', size: '', alt: 'Project photo 18' },
  { image: 'assets/images/photo-19.jpg', name: 'Project 19', cat: 'glazing', size: '', alt: 'Project photo 19' },
  { image: 'assets/images/photo-20.jpg', name: 'Project 20', cat: 'window', size: '', alt: 'Project photo 20' },
  { image: 'assets/images/photo-21.jpg', name: 'Project 21', cat: 'glazing', size: 'tile--wide', alt: 'Project photo 21' },
  { image: 'assets/images/photo-22.jpg', name: 'Project 22', cat: 'acp', size: '', alt: 'Project photo 22' },
  { image: 'assets/images/photo-23.jpg', name: 'Project 23', cat: 'interior', size: '', alt: 'Project photo 23' },
  { image: 'assets/images/photo-24.jpg', name: 'Project 24', cat: 'window', size: '', alt: 'Project photo 24' },
  { image: 'assets/images/photo-25.jpg', name: 'Project 25', cat: 'glazing', size: '', alt: 'Project photo 25' },
  { image: 'assets/images/photo-26.jpg', name: 'Project 26', cat: 'interior', size: '', alt: 'Project photo 26' },
  { image: 'assets/images/photo-27.jpg', name: 'Project 27', cat: 'railing', size: '', alt: 'Project photo 27' },
  { image: 'assets/images/photo-28.jpg', name: 'Project 28', cat: 'acp', size: '', alt: 'Project photo 28' },
  { image: 'assets/images/photo-29.jpg', name: 'Project 29', cat: 'glazing', size: 'tile--tall', alt: 'Project photo 29' },
  { image: 'assets/images/photo-30.jpg', name: 'Project 30', cat: 'window', size: '', alt: 'Project photo 30' },
  { image: 'assets/images/photo-31.jpg', name: 'Project 31', cat: 'glazing', size: '', alt: 'Project photo 31' },
  { image: 'assets/images/photo-32.jpg', name: 'Project 32', cat: 'acp', size: '', alt: 'Project photo 32' },
  { image: 'assets/images/photo-33.jpg', name: 'Project 33', cat: 'interior', size: '', alt: 'Project photo 33' },
  { image: 'assets/images/photo-34.jpg', name: 'Project 34', cat: 'window', size: '', alt: 'Project photo 34' },
  { image: 'assets/images/photo-35.jpg', name: 'Project 35', cat: 'glazing', size: '', alt: 'Project photo 35' },
  { image: 'assets/images/photo-36.jpg', name: 'Project 36', cat: 'interior', size: '', alt: 'Project photo 36' },
  { image: 'assets/images/photo-37.jpg', name: 'Project 37', cat: 'railing', size: '', alt: 'Project photo 37' },
  { image: 'assets/images/photo-38.jpg', name: 'Project 38', cat: 'acp', size: 'tile--wide', alt: 'Project photo 38' },
  { image: 'assets/images/photo-39.jpg', name: 'Project 39', cat: 'glazing', size: '', alt: 'Project photo 39' },
  { image: 'assets/images/photo-40.jpg', name: 'Project 40', cat: 'window', size: '', alt: 'Project photo 40' },
  { image: 'assets/images/photo-41.jpg', name: 'Project 41', cat: 'interior', size: '', alt: 'Project photo 41' },
  { image: 'assets/images/photo-42.jpg', name: 'Project 42', cat: 'glazing', size: '', alt: 'Project photo 42' },
  { image: 'assets/images/photo-43.jpg', name: 'Project 43', cat: 'acp', size: '', alt: 'Project photo 43' },
  { image: 'assets/images/photo-44.jpg', name: 'Project 44', cat: 'window', size: '', alt: 'Project photo 44' },
  { image: 'assets/images/photo-45.jpg', name: 'Project 45', cat: 'railing', size: '', alt: 'Project photo 45' },
  { image: 'assets/images/photo-46.jpg', name: 'Project 46', cat: 'glazing', size: '', alt: 'Project photo 46' },
  { image: 'assets/images/photo-47.jpg', name: 'Project 47', cat: 'interior', size: '', alt: 'Project photo 47' },
  { image: 'assets/images/photo-48.jpg', name: 'Project 48', cat: 'window', size: 'tile--tall', alt: 'Project photo 48' },
  { image: 'assets/images/photo-49.jpg', name: 'Project 49', cat: 'glazing', size: '', alt: 'Project photo 49' },
  { image: 'assets/images/photo-50.jpg', name: 'Project 50', cat: 'acp', size: '', alt: 'Project photo 50' },
  { image: 'assets/images/photo-51.jpg', name: 'Project 51', cat: 'interior', size: '', alt: 'Project photo 51' },
  { image: 'assets/images/photo-52.jpg', name: 'Project 52', cat: 'railing', size: '', alt: 'Project photo 52' },
  { image: 'assets/images/photo-53.jpg', name: 'Project 53', cat: 'acp', size: '', alt: 'Project photo 53' },
  { image: 'assets/images/photo-54.jpg', name: 'Project 54', cat: 'window', size: '', alt: 'Project photo 54' },
  { image: 'assets/images/photo-55.jpg', name: 'Project 55', cat: 'glazing', size: '', alt: 'Project photo 55' },
  { image: 'assets/images/photo-56.jpg', name: 'Project 56', cat: 'interior', size: '', alt: 'Project photo 56' },
  { image: 'assets/images/photo-57.jpg', name: 'Project 57', cat: 'window', size: '', alt: 'Project photo 57' },
  { image: 'assets/images/photo-58.jpg', name: 'Project 58', cat: 'glazing', size: 'tile--wide', alt: 'Project photo 58' },
  { image: 'assets/images/photo-59.jpg', name: 'Project 59', cat: 'acp', size: '', alt: 'Project photo 59' },
  { image: 'assets/images/photo-60.jpg', name: 'Project 60', cat: 'interior', size: '', alt: 'Project photo 60' },
  { image: 'assets/images/photo-61.jpg', name: 'Project 61', cat: 'railing', size: '', alt: 'Project photo 61' },
  { image: 'assets/images/photo-62.jpg', name: 'Project 62', cat: 'glazing', size: '', alt: 'Project photo 62' },
  { image: 'assets/images/photo-63.jpg', name: 'Project 63', cat: 'interior', size: '', alt: 'Project photo 63' },
  { image: 'assets/images/photo-64.jpg', name: 'Project 64', cat: 'window', size: '', alt: 'Project photo 64' },
  { image: 'assets/images/photo-65.jpg', name: 'Project 65', cat: 'acp', size: '', alt: 'Project photo 65' },
  { image: 'assets/images/photo-66.jpg', name: 'Project 66', cat: 'glazing', size: '', alt: 'Project photo 66' },
  { image: 'assets/images/photo-67.jpg', name: 'Project 67', cat: 'interior', size: '', alt: 'Project photo 67' },
  { image: 'assets/images/photo-68.jpg', name: 'Project 68', cat: 'railing', size: '', alt: 'Project photo 68' },
  { image: 'assets/images/photo-69.jpg', name: 'Project 69', cat: 'acp', size: '', alt: 'Project photo 69' },
  { image: 'assets/images/photo-70.jpg', name: 'Project 70', cat: 'window', size: '', alt: 'Project photo 70' },
  { image: 'assets/images/photo-71.jpg', name: 'Project 71', cat: 'glazing', size: '', alt: 'Project photo 71' },
  { image: 'assets/images/photo-72.jpg', name: 'Project 72', cat: 'interior', size: 'tile--tall', alt: 'Project photo 72' },
  { image: 'assets/images/photo-73.jpg', name: 'Project 73', cat: 'railing', size: '', alt: 'Project photo 73' }
];

galleryGrid.innerHTML = galleryProjects.map(project => `
  <figure class="tile ${project.size}" data-cat="${project.cat}">
    <img loading="lazy" src="${project.image}" alt="${project.alt}">
    <figcaption><strong>${project.name}</strong></figcaption>
  </figure>
`).join('');

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

const defaultFilter = filters?.querySelector('[data-filter="all"]');
if (defaultFilter) defaultFilter.click();

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
