/**
 * Projects Module
 * ----------------
 * Renders the project cards from PROJECTS, and opens a detail panel
 * (native <dialog>, so Escape / focus-trap / backdrop come for free)
 * showing the full story of each one.
 */

import { PROJECTS } from './projects-data.js';

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const list = (items) => items.map((t) => `<li>${esc(t)}</li>`).join('');

function cardHTML(p, i) {
  const n = String(i + 1).padStart(2, '0');
  return `
    <button type="button" class="projects__item" data-project="${esc(p.id)}"
            aria-label="Read the story behind ${esc(p.name)}">
      <div class="projects__item-header">
        <span class="projects__item-number">_${n}.</span>
        <div class="projects__item-tags">
          ${p.tags.map((t) => `<span class="projects__tag">${esc(t)}</span>`).join('')}
        </div>
      </div>
      <h3 class="projects__item-name">${esc(p.name)}</h3>
      <p class="projects__item-desc">${esc(p.blurb)}</p>
      <span class="projects__item-more">Read the story &rarr;</span>
    </button>`;
}

function detailHTML(p) {
  const links = [
    p.links.repo && `<a href="${esc(p.links.repo)}" target="_blank" rel="noopener" class="pd__link">View code</a>`,
    p.links.live && `<a href="${esc(p.links.live)}" target="_blank" rel="noopener" class="pd__link pd__link--ghost">Live demo</a>`,
  ].filter(Boolean).join('');

  return `
    <button type="button" class="pd__close" data-close aria-label="Close">&times;</button>
    <article class="pd__body">
      <header class="pd__header">
        <span class="pd__period">${esc(p.period)}</span>
        <h2 class="pd__title">${esc(p.name)}</h2>
        <p class="pd__blurb">${esc(p.blurb)}</p>
      </header>

      <section class="pd__section">
        <h3 class="pd__label">The problem</h3>
        <p class="pd__text">${esc(p.problem)}</p>
      </section>

      <section class="pd__section">
        <h3 class="pd__label">What I built</h3>
        <ul class="pd__list">${list(p.build)}</ul>
      </section>

      <section class="pd__section">
        <h3 class="pd__label">How it works</h3>
        <ul class="pd__list">${list(p.how)}</ul>
      </section>

      <section class="pd__section">
        <h3 class="pd__label">What came out of it</h3>
        <ul class="pd__list pd__list--results">${list(p.results)}</ul>
      </section>

      <section class="pd__section">
        <h3 class="pd__label">Stack</h3>
        <div class="pd__stack">${p.stack.map((s) => `<span class="projects__tag">${esc(s)}</span>`).join('')}</div>
      </section>

      <footer class="pd__links">${links}</footer>
    </article>`;
}

export function initProjects() {
  const listEl = document.getElementById('projects-list');
  const dialog = document.getElementById('project-detail');
  if (!listEl || !dialog) return;

  listEl.innerHTML = PROJECTS.map(cardHTML).join('');

  const unlock = () => { document.body.style.overflow = ''; };

  function openDetail(id) {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;
    dialog.innerHTML = detailHTML(project);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeDetail() {
    dialog.close();
    unlock();
  }

  listEl.addEventListener('click', (e) => {
    const card = e.target.closest('[data-project]');
    if (card) openDetail(card.dataset.project);
  });

  // Close button, and clicks on the dialog's own empty area (reads as the backdrop)
  dialog.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]') || e.target === dialog) closeDetail();
  });

  // Escape closes natively — 'cancel'/'close' are the only hook for that path.
  // Both are wired because 'close' doesn't fire reliably in every headless runtime.
  dialog.addEventListener('cancel', unlock);
  dialog.addEventListener('close', unlock);
}
