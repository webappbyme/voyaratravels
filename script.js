/* ============ VOYARA TRAVELS — MAIN SCRIPT.JS ============ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- MOBILE NAVIGATION ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  /* ---------- STICKY NAVBAR SHADOW ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 20
        ? '0 6px 24px rgba(26,15,46,0.25)'
        : 'none';
    }
  });

  /* ---------- HERO SLIDER ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  let currentSlide = 0;
  let slideInterval = null;

  function goToSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentSlide = index;
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  if (slides.length > 1) {
    slideInterval = setInterval(nextSlide, 6000);
    dots.forEach(dot => {
      dot.addEventListener('click', function () {
        clearInterval(slideInterval);
        goToSlide(parseInt(this.dataset.index, 10));
        slideInterval = setInterval(nextSlide, 6000);
      });
    });
  }

  /* ---------- SCROLL REVEAL (Intersection Observer) ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('show', window.scrollY > 400);
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- DESTINATION SEARCH (destinations.html) ---------- */
  const destSearch = document.getElementById('destSearch');
  if (destSearch) {
    const cards = document.querySelectorAll('#destGrid .dest-card');
    const emptyMsg = document.getElementById('searchEmpty');

    destSearch.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const text = card.textContent.toLowerCase();
        const matches = title.includes(query) || text.includes(query);
        card.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });

      if (emptyMsg) emptyMsg.hidden = visibleCount !== 0;
    });
  }

  /* ---------- NEWSLETTER FORM ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const msg = document.getElementById('newsletterMsg');
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        msg.textContent = '⚠️ Please enter a valid email address.';
        msg.className = 'form-msg error-msg';
        return;
      }

      msg.textContent = '✅ Thank you for subscribing! Check your inbox for travel inspiration.';
      msg.className = 'form-msg success';
      newsletterForm.reset();
    });
  }

  /* ---------- FOOTER YEAR ---------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

});