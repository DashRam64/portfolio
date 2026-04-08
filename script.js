'use strict';

/* ─────────────────────────────────────────
   Typed text effect
───────────────────────────────────────── */
const phrases = [
  'Software Engineer',
  'Backend Developer',
  'MEng @ University of Maryland',
  'Systems & Integrations',
];

let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }

  setTimeout(type, deleting ? 45 : 85);
}

type();

/* ─────────────────────────────────────────
   Navbar scroll effect
───────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightNavLink();
}, { passive: true });

/* ─────────────────────────────────────────
   Active nav link on scroll
───────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function highlightNavLink() {
  const scrollY = window.scrollY + 80;
  let current = '';

  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ─────────────────────────────────────────
   Theme toggle
───────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const savedTheme  = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') applyLight();

function applyLight() {
  document.body.classList.add('light');
  themeIcon.className = 'fas fa-sun';
}

function applyDark() {
  document.body.classList.remove('light');
  themeIcon.className = 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light');
  if (isLight) {
    applyDark();
    localStorage.setItem('theme', 'dark');
  } else {
    applyLight();
    localStorage.setItem('theme', 'light');
  }
});

/* ─────────────────────────────────────────
   Hamburger mobile menu
───────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

/* ─────────────────────────────────────────
   Scroll reveal (IntersectionObserver)
───────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals slightly
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ─────────────────────────────────────────
   Smooth scroll for all anchor links
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
