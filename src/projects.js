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

const li = (items) => items.map((t) => `<li>${esc(t)}</li>`).join('');

const chips = (items) => items.map((t) => `<span class="projects__tag">${esc(t)}</span>`).join('');

function metricsHTML(metrics, cls) {
  if (!metrics || !metrics.length) return '';
  return `<div class="${cls}">${metrics
    .map(
      (m) => `<div class="metric">
        <span class="metric__value">${esc(m.value)}</span>
        <span class="metric__label">${esc(m.label)}</span>
        ${m.note ? `<span class="metric__note">${esc(m.note)}</span>` : ''}
      </div>`
    )
    .join('')}</div>`;
}

/* Column-by-column flow. Used when a project has no screenshot to show —
   the architecture is the thing worth looking at anyway. */
function diagramHTML(diagram) {
  if (!diagram) return '';
  const stages = diagram.stages
    .map(
      (s) => `<div class="flow__stage">
        <span class="flow__stage-label">${esc(s.label)}</span>
        <div class="flow__nodes">${s.items.map((i) => `<span class="flow__node">${esc(i)}</span>`).join('')}</div>
      </div>`
    )
    .join('<span class="flow__arrow" aria-hidden="true"></span>');

  return `<figure class="pd__figure">
      <div class="flow">${stages}</div>
      ${diagram.caption ? `<figcaption class="pd__caption">${esc(diagram.caption)}</figcaption>` : ''}
    </figure>`;
}

function galleryHTML(images) {
  if (!images || !images.length) return '';
  return `<div class="pd__gallery">${images
    .map(
      (img) => `<figure class="pd__shot">
        <img src="${esc(img.src)}" alt="${esc(img.caption)}" loading="lazy" decoding="async" />
        <figcaption class="pd__caption">${esc(img.caption)}</figcaption>
      </figure>`
    )
    .join('')}</div>`;
}

function cardHTML(p, i) {
  const n = String(i + 1).padStart(2, '0');
  return `
    <button type="button" class="projects__item" data-project="${esc(p.id)}"
            aria-label="Read the story behind ${esc(p.name)}">
      <div class="projects__item-header">
        <span class="projects__item-number">_${n}.</span>
        <div class="projects__item-tags">${chips(p.tags)}</div>
      </div>
      <h3 class="projects__item-name">${esc(p.name)}</h3>
      ${p.org ? `<span class="projects__item-org">${esc(p.org)} · ${esc(p.period)}</span>` : ''}
      <p class="projects__item-desc">${esc(p.blurb)}</p>
      ${metricsHTML(p.metrics, 'projects__item-metrics')}
      <span class="projects__item-more">Read the story &rarr;</span>
    </button>`;
}

function detailHTML(p) {
  const links = [
    p.links.repo && `<a href="${esc(p.links.repo)}" target="_blank" rel="noopener" class="pd__link">View code</a>`,
    p.links.live && `<a href="${esc(p.links.live)}" target="_blank" rel="noopener" class="pd__link pd__link--ghost">Live demo</a>`,
  ]
    .filter(Boolean)
    .join('');

  // Lead with whatever is most worth looking at: a real screenshot, else the architecture.
  const lead = p.images ? galleryHTML(p.images.slice(0, 1)) : diagramHTML(p.diagram);
  const rest = p.images ? galleryHTML(p.images.slice(1)) : '';

  return `
    <button type="button" class="pd__close" data-close aria-label="Close">&times;</button>
    <article class="pd__body">
      <header class="pd__header">
        <span class="pd__period">${esc(p.period)}${p.org ? ` &middot; ${esc(p.org)}` : ''}</span>
        <h2 class="pd__title">${esc(p.name)}</h2>
        <p class="pd__blurb">${esc(p.blurb)}</p>
      </header>

      ${metricsHTML(p.metrics, 'pd__metrics')}
      ${lead}

      <section class="pd__section">
        <h3 class="pd__label">The problem</h3>
        <p class="pd__text">${esc(p.problem)}</p>
      </section>

      <section class="pd__section">
        <h3 class="pd__label">What I built</h3>
        <ul class="pd__list">${li(p.build)}</ul>
      </section>

      <section class="pd__section">
        <h3 class="pd__label">How it works</h3>
        <ul class="pd__list">${li(p.how)}</ul>
        ${p.images && p.diagram ? diagramHTML(p.diagram) : ''}
      </section>

      ${rest ? `<section class="pd__section"><h3 class="pd__label">More of it</h3>${rest}</section>` : ''}

      <section class="pd__section">
        <h3 class="pd__label">What came out of it</h3>
        <ul class="pd__list pd__list--results">${li(p.results)}</ul>
      </section>

      <section class="pd__section">
        <h3 class="pd__label">Stack</h3>
        <div class="pd__stack">${chips(p.stack)}</div>
      </section>

      <footer class="pd__links">${links}</footer>
    </article>`;
}

export function initProjects() {
  const listEl = document.getElementById('projects-list');
  const dialog = document.getElementById('project-detail');
  if (!listEl || !dialog) return;

  listEl.innerHTML = PROJECTS.map(cardHTML).join('');

  // The dialog renders in the top layer, above the custom cursor's fixed
  // elements — so inside it the custom cursor is invisible. Hand the pointer
  // back to the OS while the panel is open (see project-detail.css).
  const setOpen = (on) => {
    document.body.classList.toggle('pd-open', on);
    document.body.style.overflow = on ? 'hidden' : '';
  };

  function openDetail(id) {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;
    dialog.innerHTML = detailHTML(project);
    dialog.showModal();
    setOpen(true);
  }

  function closeDetail() {
    dialog.close();
    setOpen(false);
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
  dialog.addEventListener('cancel', () => setOpen(false));
  dialog.addEventListener('close', () => setOpen(false));
}
