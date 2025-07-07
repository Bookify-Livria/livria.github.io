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
document.addEventListener('DOMContentLoaded', function() {
  const videoContainer = document.querySelector('.about__video-container');
  const video = document.querySelector('.about__video');
  const videoButton = document.querySelector('.about__video-button');
  const centralPlayBtn = document.getElementById('centralPlayBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const timeDisplay = document.getElementById('timeDisplay');
  const volumeSlider = document.getElementById('volumeSlider');
  const muteBtn = document.getElementById('muteBtn');
  const volumeIcon = document.getElementById('volumeIcon');
  const muteIcon = document.getElementById('muteIcon');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const playOverlay = document.querySelector('.video-play-overlay');

  if (!video) return;

  let lastVolume = 1;

  // Format time helper
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Update time display
  function updateTimeDisplay() {
    const current = video.currentTime || 0;
    const duration = video.duration || 0;
    timeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
  }

  // Play/Pause functionality
  function togglePlayPause() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  // Central play button
  centralPlayBtn.addEventListener('click', togglePlayPause);

  // Control bar play/pause button
  playPauseBtn.addEventListener('click', togglePlayPause);

  // Video state changes
  video.addEventListener('play', function() {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    videoContainer.classList.add('playing');
    playOverlay.classList.add('hidden');
    hideButton();
  });

  video.addEventListener('pause', function() {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    videoContainer.classList.remove('playing');
    if (video.currentTime === 0 || video.ended) {
      playOverlay.classList.remove('hidden');
    }
  });

  video.addEventListener('ended', function() {
    videoContainer.classList.remove('playing');
    playOverlay.classList.remove('hidden');
    showButton();
    updateProgress(0);
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  });

  // Progress bar updates
  video.addEventListener('timeupdate', function() {
    if (video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      updateProgress(progress);
      updateTimeDisplay();
    }
  });

  // Clickable progress bar
  progressBar.addEventListener('click', function(e) {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  });

  // Update progress bar fill
  function updateProgress(percent) {
    progressFill.style.width = `${percent}%`;
  }

  // Volume controls
  volumeSlider.addEventListener('input', function() {
    video.volume = volumeSlider.value;
    updateVolumeIcon();
  });

  // Mute/unmute
  muteBtn.addEventListener('click', function() {
    if (video.muted || video.volume === 0) {
      video.muted = false;
      video.volume = lastVolume;
      volumeSlider.value = lastVolume;
    } else {
      lastVolume = video.volume;
      video.muted = true;
      video.volume = 0;
      volumeSlider.value = 0;
    }
    updateVolumeIcon();
  });

  function updateVolumeIcon() {
    if (video.muted || video.volume === 0) {
      volumeIcon.style.display = 'none';
      muteIcon.style.display = 'block';
    } else {
      volumeIcon.style.display = 'block';
      muteIcon.style.display = 'none';
    }
  }

  // Fullscreen
  fullscreenBtn.addEventListener('click', function() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoContainer.requestFullscreen();
    }
  });


  const videoButtons = document.querySelectorAll('.video-switch-btn');

  videoButtons.forEach(button => {
    button.addEventListener('click', () => {
      const videoSrc = button.getAttribute('data-video');
      const video = document.querySelector('.about__video');
      const source = video.querySelector('source');
    
      // Cambiar fuente del video
      source.src = videoSrc;
      video.load();
      video.play(); // Opcional: reproducción automática
    });
  });

  // Show/hide video button
  function showButton() {
    if (videoButton) {
      videoButton.classList.add('show');
    }
  }

  function hideButton() {
    if (videoButton) {
      videoButton.classList.remove('show');
    }
  }

  // Initialize
  updateTimeDisplay();
  updateVolumeIcon();

  // Auto pause on scroll
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting && !video.paused) {
        video.pause();
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(video);

  // Keyboard controls
  document.addEventListener('keydown', function(e) {
    if (document.activeElement === video || videoContainer.contains(document.activeElement)) {
      switch(e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
          break;
        case 'KeyM':
          e.preventDefault();
          muteBtn.click();
          break;
        case 'KeyF':
          e.preventDefault();
          fullscreenBtn.click();
          break;
      }
    }
  });

  // Make video container focusable
  videoContainer.setAttribute('tabindex', '0');

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

        // Simulate successful submission
        const successMessage = document.createElement('div');
        successMessage.className = 'contact__success-message';
        successMessage.textContent = i18n[currentLanguage]['contact.success'] || 
          'Thank you! Your message has been sent successfully.';

        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);

        setTimeout(() => {
          contactForm.reset();
          contactForm.innerHTML = '';
          location.reload();
        }, 3000);
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