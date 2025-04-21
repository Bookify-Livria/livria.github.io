// ---------------------
// CAROUSEL
// ---------------------
const images = document.querySelectorAll('.carousel__img');
const lines = document.querySelectorAll('.carousel__progress .line');
const nextBtn = document.querySelector('.carousel__control.next');
const prevBtn = document.querySelector('.carousel__control.prev');

let current = 0;
let interval = setInterval(nextSlide, 5000);

function showSlide(index) {
  images.forEach(img => img.classList.remove('active'));
  lines.forEach(line => line.classList.remove('active'));
  images[index].classList.add('active');
  lines[index].classList.add('active');
}

function nextSlide() {
  current = (current + 1) % images.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + images.length) % images.length;
  showSlide(current);
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

// ---------------------
// I18N (INTERNATIONALIZATION)
// ---------------------
let currentLanguage = 'en';

const translatePage = (lang) => {
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      element.textContent = i18n[lang][key];
    }
  });

  localStorage.setItem('livria-language', lang);
  currentLanguage = lang;
};

// ---------------------
// DOMContentLoaded Initialization
// ---------------------
document.addEventListener('DOMContentLoaded', () => {
  // Init language
  const savedLanguage = localStorage.getItem('livria-language');
  const browserLanguage = navigator.language.startsWith('es') ? 'es' : 'en';
  const initialLanguage = savedLanguage || browserLanguage;
  translatePage(initialLanguage);

  // Language switcher
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      translatePage(lang);
    });
  });

  // Navigation links
  const navLinks = document.querySelectorAll('.header__nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Keyboard accessibility
  document.querySelectorAll('.language-btn, .header__nav-link, .btn').forEach(element => {
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        element.click();
      }
    });
  });
});