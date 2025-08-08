// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Close mobile nav on link click
siteNav?.querySelectorAll('a')?.forEach((a) => {
  a.addEventListener('click', () => {
    if (siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Improve details/summary keyboard behavior
const detailsEls = document.querySelectorAll('details');
detailsEls.forEach((el) => {
  el.addEventListener('toggle', () => {
    if (el.open) {
      detailsEls.forEach((other) => {
        if (other !== el) other.open = false;
      });
    }
  });
});