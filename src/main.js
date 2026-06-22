import './styles.css';

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  header.classList.remove('menu-open');
};

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  header.classList.toggle('menu-open', !isOpen);
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

let lastScroll = 0;
window.addEventListener(
  'scroll',
  () => {
    const currentScroll = window.scrollY;
    header.classList.toggle('is-scrolled', currentScroll > 20);
    header.classList.toggle('is-hidden', currentScroll > lastScroll && currentScroll > 160 && !header.classList.contains('menu-open'));
    lastScroll = currentScroll;
  },
  { passive: true },
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();
