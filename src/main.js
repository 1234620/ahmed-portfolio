/**
 * Main Entry Point
 * -----------------
 * Imports all CSS stylesheets (Vite handles bundling)
 * and initializes every module after the DOM is ready.
 *
 * Load order matters:
 *  1. Cursor   — needs to register mousemove before any interactions
 *  2. Particles — async, doesn't block anything
 *  3. Menu     — drawer + filter tabs + scroll bar
 *  4. Animations — GSAP (runs hero immediately, registers ScrollTriggers)
 */

/* ── Styles ──────────────────────────────────────────── */
import './styles/globals.css';
import './styles/cursor.css';
import './styles/menu.css';
import './styles/hero.css';
import './styles/about.css';
import './styles/education.css';
import './styles/stack.css';
import './styles/experience.css';
import './styles/projects.css';
import './styles/project-detail.css';
import './styles/contact.css';
import './styles/cat.css';

/* ── Modules ─────────────────────────────────────────── */
import { initCursor } from './cursor.js';
import { initParticles } from './particles.js';
import { initMenu, initStackFilter, initScrollProgress } from './menu.js';
import { initProjects } from './projects.js';
import { initAnimations } from './animations.js';
import { initCat } from './cat.js';

/* ── Bootstrap ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor (must go first to catch initial mouse position)
  initCursor();

  // Particle star-field (async — fires and forgets)
  initParticles();

  // Navigation drawer, stack filter tabs, scroll progress bar
  initMenu();
  initStackFilter();
  initScrollProgress();

  // Project cards + detail panel — must render before GSAP queries .projects__item
  initProjects();

  // GSAP animations — hero plays immediately, others on scroll.
  // Everything on the page starts at opacity:0 waiting for these, so if the
  // module throws, fall back to showing the content unanimated.
  try {
    initAnimations();
  } catch (err) {
    console.warn('[animations] failed, revealing content unanimated:', err);
    document.body.classList.add('no-anim');
    document.querySelectorAll('.hero__stat-number[data-count]').forEach((el) => {
      el.textContent = el.dataset.count;
    });
    document.querySelectorAll('.projects__item').forEach((el) => el.classList.add('revealed'));
  }

  // Peeking cat with cursor-tracking eyes
  initCat();
});
