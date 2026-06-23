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

const contactForm = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');
const submitButton = document.querySelector('[data-submit-button]');
const submitLabel = document.querySelector('[data-submit-label]');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const defaultLabel = submitLabel.textContent;
  submitButton.disabled = true;
  submitLabel.textContent = 'Transmitting…';
  formStatus.textContent = 'Securely sending your project brief…';
  formStatus.className = 'form-status';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'The form could not be sent.');
    }

    contactForm.reset();
    formStatus.textContent = 'Message received. We’ll be in touch shortly.';
    formStatus.className = 'form-status is-success';
  } catch (error) {
    formStatus.textContent = 'Something went wrong. Please wait a moment and try again.';
    formStatus.className = 'form-status is-error';
  } finally {
    submitButton.disabled = false;
    submitLabel.textContent = defaultLabel;
  }
});
