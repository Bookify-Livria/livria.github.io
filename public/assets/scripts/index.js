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

  // File upload handling
  const fileInput = document.getElementById('cvUpload');
  const fileButton = document.querySelector('.contact__file-button');
  
  if (fileInput && fileButton) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        fileButton.textContent = fileName.length > 20 ? 
          fileName.substring(0, 17) + '...' : fileName;
      } else {
        fileButton.textContent = i18n[currentLanguage]['contact.upload'] || 'Add file';
      }
    });
    
    fileButton.addEventListener('click', () => {
      fileInput.click();
    });
    
    // Keyboard accessibility for file button
    fileButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });
    fileButton.setAttribute('tabindex', '0');
  }
  
  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Form validation
      if (contactForm.checkValidity()) {
        // Collect form data
        const formData = new FormData(contactForm);
        
        // Here you would typically send the data to your server
        // For now, we'll just simulate a successful submission
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'contact__success-message';
        successMessage.textContent = i18n[currentLanguage]['contact.success'] || 
          'Thank you! Your message has been sent successfully.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
        
        // Reset form after 3 seconds for demo purposes
        setTimeout(() => {
          contactForm.reset();
          contactForm.innerHTML = '';
          // Rerender the form (this would be handled differently in production)
          location.reload();
        }, 3000);
      } else {
        // Browser will handle showing validation messages
      }
    });
  }

   // Footer navigation smooth scroll
   const footerLinks = document.querySelectorAll('.footer__link');
   footerLinks.forEach(link => {
     if (link.getAttribute('href').startsWith('#')) {
       link.addEventListener('click', (e) => {
         e.preventDefault();
         const targetId = link.getAttribute('href');
         const targetElement = document.querySelector(targetId);
         if (targetElement) {
           targetElement.scrollIntoView({ behavior: 'smooth' });
         }
       });
     }
   });
   
   // Footer language selector
   const footerLanguageBtns = document.querySelectorAll('.footer__language-btn');
   footerLanguageBtns.forEach(btn => {
     btn.addEventListener('click', () => {
       const lang = btn.dataset.lang;
       translatePage(lang);
     });
   });
 
   // Synchronize header and footer language buttons
   const syncLanguageUI = (lang) => {
     document.querySelectorAll('.language-btn').forEach(btn => {
       btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
     });
   };
   
   // Update the translatePage function to use syncLanguageUI
   const originalTranslatePage = window.translatePage;
   window.translatePage = (lang) => {
     originalTranslatePage(lang);
     syncLanguageUI(lang);
   };

});