const WHATSAPP_NUMBER = '5491151234212';
const NAVBAR_HEIGHT = 56;

const WHATSAPP_MESSAGES = {
  general: 'Hola,%20quiero%20consultar%20por%20un%20iPhone',
  cotizar: 'Hola,%20quiero%20cotizar%20mi%20iPhone%20usado%20para%20el%20Plan%20Canje',
  tecnico: 'Hola,%20quiero%20solicitar%20un%20presupuesto%20t%C3%A9cnico',
};

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

function buildWhatsAppLink(messageKey) {
  const message = WHATSAPP_MESSAGES[messageKey];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = debounce(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, 10);

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  const navbar = document.querySelector('.navbar');
  const toggle = navbar?.querySelector('.navbar__toggle');
  if (!navbar || !toggle) return;

  function close() {
    navbar.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
  }

  toggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', isOpen);
  });

  navbar.querySelectorAll('.navbar__links .nav-link').forEach((link) => {
    link.addEventListener('click', close);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

function initRevealAnimations() {
  const supportsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (supportsReducedMotion) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initWhatsAppLinks() {
  document.querySelectorAll('[data-wa-message]').forEach((el) => {
    const messageKey = el.getAttribute('data-wa-message');
    el.setAttribute('href', buildWhatsAppLink(messageKey));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initRevealAnimations();
  initWhatsAppLinks();
});
