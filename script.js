// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Counter animation for stat numbers
function animateCounter(el, target, duration = 1400) {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Intersection Observer for scroll animations + counters + stat bars
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    // Fade-in elements
    if (el.classList.contains('fade-in')) {
      el.classList.add('visible');
    }

    // Stat cards — counter + bar
    if (el.classList.contains('stat-card')) {
      const numEl = el.querySelector('.stat-number');
      const barEl = el.querySelector('.stat-fill');
      if (numEl) {
        const target = parseInt(numEl.dataset.target, 10);
        animateCounter(numEl, target);
      }
      if (barEl) {
        setTimeout(() => barEl.classList.add('animated'), 100);
      }
    }

    observer.unobserve(el);
  });
}, { threshold: 0.15 });

// Register fade-in elements
document.querySelectorAll('.section-header, .timeline-item, .skill-card, .edu-card, .contact-card, .rating-badge').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Register stat cards separately
document.querySelectorAll('.stat-card').forEach(el => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
