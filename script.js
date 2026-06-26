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
  { image: 'assets/images/photo-01.jpg', name: 'Hinjawadi Skyline Facade', address: 'Hinjawadi Phase 1, Pune', cat: 'glazing', size: 'tile--wide', alt: 'Glass facade tower' },
  { image: 'assets/images/photo-02.jpg', name: 'Baner ACP Elevation', address: 'Baner, Pune', cat: 'acp', size: '', alt: 'ACP cladding' },
  { image: 'assets/images/photo-03.jpg', name: 'Kharadi Office Partitions', address: 'Kharadi, Pune', cat: 'interior', size: '', alt: 'Glass partition office' },
  { image: 'assets/images/photo-04.jpg', name: 'Aundh Aluminium Windows', address: 'Aundh, Pune', cat: 'window', size: '', alt: 'Aluminium window' },
  { image: 'assets/images/photo-05.jpg', name: 'Wakad Structural Glazing', address: 'Wakad, Pune', cat: 'glazing', size: 'tile--tall', alt: 'Skyscraper glazing' },
  { image: 'assets/images/photo-06.jpg', name: 'Baner Shower Enclosure', address: 'Baner, Pune', cat: 'interior', size: '', alt: 'Shower cubicle' },
  { image: 'assets/images/photo-07.jpg', name: 'Koregaon Park Glass Railings', address: 'Koregaon Park, Pune', cat: 'railing', size: '', alt: 'Glass railing' },
  { image: 'assets/images/photo-08.jpg', name: 'Pimpri Showroom ACP', address: 'Pimpri, Pune', cat: 'acp', size: '', alt: 'ACP elevation' },
  { image: 'assets/images/photo-09.jpg', name: 'Magarpatta Spider Glazing', address: 'Magarpatta City, Pune', cat: 'glazing', size: 'tile--wide', alt: 'Spider glazing' },
  { image: 'assets/images/photo-10.jpg', name: 'Balewadi Sliding Windows', address: 'Balewadi, Pune', cat: 'window', size: '', alt: 'Sliding window' },
  { image: 'assets/images/photo-11.jpg', name: 'Baner Corporate Tower', address: 'Baner, Pune', cat: 'glazing', size: '', alt: 'Glass facade tower' },
  { image: 'assets/images/photo-12.jpg', name: 'Baner ACP Cladding', address: 'Baner, Pune', cat: 'acp', size: '', alt: 'ACP cladding' },
  { image: 'assets/images/photo-13.jpg', name: 'Kharadi Glass Partition Suite', address: 'Kharadi, Pune', cat: 'interior', size: '', alt: 'Glass partition office' },
  { image: 'assets/images/photo-14.jpg', name: 'Aundh Window Facade', address: 'Aundh, Pune', cat: 'window', size: 'tile--tall', alt: 'Aluminium window' },
  { image: 'assets/images/photo-15.jpg', name: 'Wakad Premium Glazing', address: 'Wakad, Pune', cat: 'glazing', size: '', alt: 'Skyscraper glazing' },
  { image: 'assets/images/photo-16.jpg', name: 'Aundh Bathroom Enclosure', address: 'Aundh, Pune', cat: 'interior', size: '', alt: 'Shower cubicle' },
  { image: 'assets/images/photo-17.jpg', name: 'Koregaon Park Railings', address: 'Koregaon Park, Pune', cat: 'railing', size: '', alt: 'Glass railing' },
  { image: 'assets/images/photo-18.jpg', name: 'Pimpri Retail Facade', address: 'Pimpri, Pune', cat: 'acp', size: '', alt: 'ACP elevation' },
  { image: 'assets/images/photo-19.jpg', name: 'Magarpatta Atrium Glazing', address: 'Magarpatta City, Pune', cat: 'glazing', size: '', alt: 'Spider glazing' },
  { image: 'assets/images/photo-20.jpg', name: 'Balewadi Window Upgrade', address: 'Balewadi, Pune', cat: 'window', size: '', alt: 'Sliding window' },
  { image: 'assets/images/photo-21.jpg', name: 'Hinjawadi Landmark Tower', address: 'Hinjawadi Phase 1, Pune', cat: 'glazing', size: 'tile--wide', alt: 'Modern glass skyscraper facade' },
  { image: 'assets/images/photo-22.jpg', name: 'Pune Station ACP Skin', address: 'Shivajinagar, Pune', cat: 'acp', size: '', alt: 'Facade panel project' },
  { image: 'assets/images/photo-23.jpg', name: 'Kothrud Glass Partition', address: 'Kothrud, Pune', cat: 'interior', size: '', alt: 'Office interior glass' },
  { image: 'assets/images/photo-24.jpg', name: 'Viman Nagar Sliding Windows', address: 'Viman Nagar, Pune', cat: 'window', size: '', alt: 'Window installation' },
  { image: 'assets/images/photo-25.jpg', name: 'Hadapsar Curtain Wall', address: 'Hadapsar, Pune', cat: 'glazing', size: '', alt: 'Glass facade project' },
  { image: 'assets/images/photo-26.jpg', name: 'Kalyani Nagar Shower Suite', address: 'Kalyani Nagar, Pune', cat: 'interior', size: '', alt: 'Shower enclosure' },
  { image: 'assets/images/photo-27.jpg', name: 'Pimple Saudagar Railings', address: 'Pimple Saudagar, Pune', cat: 'railing', size: '', alt: 'Glass railing' },
  { image: 'assets/images/photo-28.jpg', name: 'Pimpri ACP Showroom', address: 'Pimpri, Pune', cat: 'acp', size: '', alt: 'ACP storefront' },
  { image: 'assets/images/photo-29.jpg', name: 'Wakad Spider Facade', address: 'Wakad, Pune', cat: 'glazing', size: 'tile--tall', alt: 'Spider glazing' },
  { image: 'assets/images/photo-30.jpg', name: 'Aundh Sliding Unit', address: 'Aundh, Pune', cat: 'window', size: '', alt: 'Sliding window' },
  { image: 'assets/images/photo-31.jpg', name: 'Baner Facade Upgrade', address: 'Baner, Pune', cat: 'glazing', size: '', alt: 'Exterior facade project' },
  { image: 'assets/images/photo-32.jpg', name: 'Hinjawadi ACP Plate', address: 'Hinjawadi Phase 2, Pune', cat: 'acp', size: '', alt: 'ACP cladding' },
  { image: 'assets/images/photo-33.jpg', name: 'Kharadi Interior Divider', address: 'Kharadi, Pune', cat: 'interior', size: '', alt: 'Glass partition' },
  { image: 'assets/images/photo-34.jpg', name: 'Balewadi Aluminum Frame', address: 'Balewadi, Pune', cat: 'window', size: '', alt: 'Aluminium window' },
  { image: 'assets/images/photo-35.jpg', name: 'Magarpatta Glass Tower', address: 'Magarpatta City, Pune', cat: 'glazing', size: '', alt: 'Glass facade' },
  { image: 'assets/images/photo-36.jpg', name: 'Baner Bath Glass Work', address: 'Baner, Pune', cat: 'interior', size: '', alt: 'Shower cubicle' },
  { image: 'assets/images/photo-37.jpg', name: 'Koregaon Park Balcony Rail', address: 'Koregaon Park, Pune', cat: 'railing', size: '', alt: 'Glass railing' },
  { image: 'assets/images/photo-38.jpg', name: 'Pimpri Composite Panel', address: 'Pimpri, Pune', cat: 'acp', size: 'tile--wide', alt: 'ACP elevation' },
  { image: 'assets/images/photo-39.jpg', name: 'Wakad Facade Retrofit', address: 'Wakad, Pune', cat: 'glazing', size: '', alt: 'Spider glazing' },
  { image: 'assets/images/photo-40.jpg', name: 'Aundh Window Grid', address: 'Aundh, Pune', cat: 'window', size: '', alt: 'Window installation' },
  { image: 'assets/images/photo-41.jpg', name: 'Kothrud Office Glass', address: 'Kothrud, Pune', cat: 'interior', size: '', alt: 'Glass partition office' },
  { image: 'assets/images/photo-42.jpg', name: 'Viman Nagar High-rise Skin', address: 'Viman Nagar, Pune', cat: 'glazing', size: '', alt: 'Glass facade tower' },
  { image: 'assets/images/photo-43.jpg', name: 'Hadapsar ACP Canopy', address: 'Hadapsar, Pune', cat: 'acp', size: '', alt: 'ACP facade' },
  { image: 'assets/images/photo-44.jpg', name: 'Pimple Saudagar Windows', address: 'Pimple Saudagar, Pune', cat: 'window', size: '', alt: 'Aluminium window' },
  { image: 'assets/images/photo-45.jpg', name: 'Kalyani Nagar Railing Wall', address: 'Kalyani Nagar, Pune', cat: 'railing', size: '', alt: 'Glass railing' },
  { image: 'assets/images/photo-46.jpg', name: 'Baner Façade Works', address: 'Baner, Pune', cat: 'glazing', size: '', alt: 'Facade glazing' },
  { image: 'assets/images/photo-47.jpg', name: 'Hinjawadi Office Partition', address: 'Hinjawadi, Pune', cat: 'interior', size: '', alt: 'Office partition' },
  { image: 'assets/images/photo-48.jpg', name: 'Kharadi Window Bay', address: 'Kharadi, Pune', cat: 'window', size: 'tile--tall', alt: 'Sliding window' },
  { image: 'assets/images/photo-49.jpg', name: 'Pimpri Tower Glazing', address: 'Pimpri, Pune', cat: 'glazing', size: '', alt: 'Glass facade project' },
  { image: 'assets/images/photo-50.jpg', name: 'Magarpatta ACP Face', address: 'Magarpatta City, Pune', cat: 'acp', size: '', alt: 'ACP cladding' },
  { image: 'assets/images/photo-51.jpg', name: 'Balewadi Shower Space', address: 'Balewadi, Pune', cat: 'interior', size: '', alt: 'Shower enclosure' },
  { image: 'assets/images/photo-52.jpg', name: 'Aundh Glass Stair Rail', address: 'Aundh, Pune', cat: 'railing', size: '', alt: 'Glass railing' },
  { image: 'assets/images/photo-53.jpg', name: 'Wakad Composite Skin', address: 'Wakad, Pune', cat: 'acp', size: '', alt: 'ACP elevation' },
  { image: 'assets/images/photo-54.jpg', name: 'Baner Sliding Window Set', address: 'Baner, Pune', cat: 'window', size: '', alt: 'Sliding window' },
  { image: 'assets/images/photo-55.jpg', name: 'Koregaon Park Atrium Facade', address: 'Koregaon Park, Pune', cat: 'glazing', size: '', alt: 'Spider glazing' },
  { image: 'assets/images/photo-56.jpg', name: 'Shivajinagar Office Glass', address: 'Shivajinagar, Pune', cat: 'interior', size: '', alt: 'Glass partition office' },
  { image: 'assets/images/photo-57.jpg', name: 'Kothrud Window Upgrade', address: 'Kothrud, Pune', cat: 'window', size: '', alt: 'Aluminium window' },
  { image: 'assets/images/photo-58.jpg', name: 'Hadapsar Glass Tower', address: 'Hadapsar, Pune', cat: 'glazing', size: 'tile--wide', alt: 'Glass facade tower' },
  { image: 'assets/images/photo-59.jpg', name: 'Viman Nagar ACP Facade', address: 'Viman Nagar, Pune', cat: 'acp', size: '', alt: 'ACP cladding' },
  { image: 'assets/images/photo-60.jpg', name: 'Pune Cantt Bathroom Glass', address: 'Pune Cantonment, Pune', cat: 'interior', size: '', alt: 'Shower cubicle' },
  { image: 'assets/images/photo-61.jpg', name: 'Pimple Saudagar Railing Line', address: 'Pimple Saudagar, Pune', cat: 'railing', size: '', alt: 'Glass railing' },
  { image: 'assets/images/photo-62.jpg', name: 'Baner Glass Curtain Wall', address: 'Baner, Pune', cat: 'glazing', size: '', alt: 'Glass facade' },
  { image: 'assets/images/photo-63.jpg', name: 'Wakad Partition Studio', address: 'Wakad, Pune', cat: 'interior', size: '', alt: 'Glass partition' },
  { image: 'assets/images/photo-64.jpg', name: 'Balewadi Window Frame', address: 'Balewadi, Pune', cat: 'window', size: '', alt: 'Sliding window' },
  { image: 'assets/images/photo-65.jpg', name: 'Hinjawadi Facade Panel', address: 'Hinjawadi Phase 3, Pune', cat: 'acp', size: '', alt: 'ACP elevation' },
  { image: 'assets/images/photo-66.jpg', name: 'Magarpatta Glass Canopy', address: 'Magarpatta City, Pune', cat: 'glazing', size: '', alt: 'Spider glazing' },
  { image: 'assets/images/photo-67.jpg', name: 'Aundh Shower Suite', address: 'Aundh, Pune', cat: 'interior', size: '', alt: 'Shower enclosure' },
  { image: 'assets/images/photo-68.jpg', name: 'Koregaon Park Balcony Guard', address: 'Koregaon Park, Pune', cat: 'railing', size: '', alt: 'Glass railing' },
  { image: 'assets/images/photo-69.jpg', name: 'Pimpri Retail Skin', address: 'Pimpri, Pune', cat: 'acp', size: '', alt: 'ACP cladding' },
  { image: 'assets/images/photo-70.jpg', name: 'Kharadi Window Stack', address: 'Kharadi, Pune', cat: 'window', size: '', alt: 'Aluminium window' },
  { image: 'assets/images/photo-71.jpg', name: 'Baner Commercial Glazing', address: 'Baner, Pune', cat: 'glazing', size: '', alt: 'Glass facade tower' },
  { image: 'assets/images/photo-72.jpg', name: 'Hadapsar Interior Glass', address: 'Hadapsar, Pune', cat: 'interior', size: 'tile--tall', alt: 'Office partition' },
  { image: 'assets/images/photo-73.jpg', name: 'Wakad Frame Railings', address: 'Wakad, Pune', cat: 'railing', size: '', alt: 'Glass railing' }
];

galleryGrid.innerHTML = galleryProjects.map(project => `
  <figure class="tile ${project.size}" data-cat="${project.cat}">
    <img loading="lazy" src="${project.image}" alt="${project.alt}">
    <figcaption><strong>${project.name}</strong><small>${project.address}</small></figcaption>
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
