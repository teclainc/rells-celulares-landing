const WHATSAPP_NUMBER = '5491151234212';

const WHATSAPP_MESSAGES = {
  general: 'Hola,%20quiero%20consultar%20por%20un%20iPhone',
  cotizar: 'Hola,%20quiero%20cotizar%20mi%20iPhone%20usado%20para%20el%20Plan%20Canje',
  tecnico: 'Hola,%20quiero%20solicitar%20un%20presupuesto%20t%C3%A9cnico',
};

function buildWhatsAppLink(messageKey) {
  const message = WHATSAPP_MESSAGES[messageKey];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');

  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initRevealAnimations() {
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
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
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
  initSmoothScroll();
  initRevealAnimations();
  initWhatsAppLinks();
});
