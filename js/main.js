/* ============================================================
   WEBSTER PRODUCTIONS — main.js
   Cinematic portfolio interaction logic
   ============================================================ */

'use strict';

/* ── PROJECT DATA ───────────────────────────────────────────── */
/* Each entry: client, title, job, hero (path or ''), thumb (path or ''),
   color (CSS gradient string used when hero image is absent).
   Drop real images into assets/images/hero/ & thumbs/ and update paths. */

const PROJECTS = [
  {
    /* 01 — Hero video project */
    id:     'project-01',
    client: 'ELIZAS PRODUCTION',
    title:  'SHOWREEL 2025',
    job:    'EP 2501',
    hero:   '',
    thumb:  '',
    video:  '/assets/videos/project-01.mp4',
    color:  'linear-gradient(160deg, #080810 0%, #12122a 60%, #0a0a18 100%)'
  },
  {
    /* 02 — Burberry: misty forest, deep sage */
    id:     'project-02',
    client: 'BURBERRY',
    title:  'OPEN SPACES',
    job:    'EP 2502',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #060e08 0%, #0d1f10 50%, #091508 100%)'
  },
  {
    /* 03 — Land Rover: dark clay earth, terracotta shadow */
    id:     'project-03',
    client: 'LAND ROVER',
    title:  'NEW DEFENDER',
    job:    'EP 2503',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #120a04 0%, #221408 50%, #180e05 100%)'
  },
  {
    /* 04 — Arctic Monkeys: deep amber rust, late-night warmth */
    id:     'project-04',
    client: 'ARCTIC MONKEYS',
    title:  'TRANQUILITY',
    job:    'EP 2504',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #150900 0%, #2a1200 50%, #1c0e00 100%)'
  },
  {
    /* 05 — Harrods: bottle green, black marble */
    id:     'project-05',
    client: 'HARRODS',
    title:  'WINTER EDIT',
    job:    'EP 2505',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #040e06 0%, #071a09 50%, #040c06 100%)'
  },
  {
    /* 06 — Moët: dark champagne gold, deep shadow */
    id:     'project-06',
    client: 'MOËT & CHANDON',
    title:  'EFFERVESCENCE',
    job:    'EP 2506',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #141000 0%, #2a1e04 50%, #1a1200 100%)'
  },
  {
    /* 07 — Vogue Britain: deep navy, editorial slate */
    id:     'project-07',
    client: 'VOGUE BRITAIN',
    title:  'NORTHERN LIGHT',
    job:    'EP 2507',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #04080f 0%, #08122a 50%, #060e1e 100%)'
  },
  {
    /* 08 — Channel 4: deep crimson, broadcast drama */
    id:     'project-08',
    client: 'CHANNEL 4',
    title:  'NORTHERN SOUL',
    job:    'EP 2508',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #0f0404 0%, #220808 50%, #180505 100%)'
  },
  {
    /* 09 — Rolls-Royce: near-black, silver shadow */
    id:     'project-09',
    client: 'ROLLS-ROYCE',
    title:  'THE SILENT HOUR',
    job:    'EP 2509',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #080808 0%, #111111 40%, #0c0d0e 100%)'
  },
  {
    /* 10 — Spotify: dark teal, sound wave depth */
    id:     'project-10',
    client: 'SPOTIFY',
    title:  'SOUNDS OF THE NORTH',
    job:    'EP 2510',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #040e0e 0%, #081a18 50%, #061210 100%)'
  },
  {
    /* 11 — Hunter: original hunter green, field darkness */
    id:     'project-11',
    client: 'HUNTER',
    title:  'ORIGINAL FIELD',
    job:    'EP 2511',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #050e06 0%, #0a1a0c 50%, #071208 100%)'
  },
  {
    /* 12 — Aesop: warm dark taupe, ritual quiet */
    id:     'project-12',
    client: 'AESOP',
    title:  'RITUAL',
    job:    'EP 2512',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #100e0a 0%, #1e1a12 50%, #161208 100%)'
  },
  {
    /* 13 — The National: deep blue-grey, melancholic dusk */
    id:     'project-13',
    client: 'THE NATIONAL',
    title:  'BLOODBUZZ',
    job:    'EP 2513',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #060810 0%, #0c1020 50%, #080c18 100%)'
  },
  {
    /* 14 — Bettys: warm dark brown, century of craft */
    id:     'project-14',
    client: 'BETTYS',
    title:  'A CENTURY IN HARROGATE',
    job:    'EP 2514',
    hero:   '',
    thumb:  '',
    color:  'linear-gradient(160deg, #0e0a06 0%, #1c1408 50%, #140e05 100%)'
  }
];

/* ── BOOTSTRAP ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── STATE ────────────────────────────────────────────────── */
  let activeIndex = 0;
  let isPlaying   = true;
  let isMuted     = true;
  let autoTimer   = null;
  const AUTO_DELAY = 6000;

  /* prefers-reduced-motion */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── DOM REFS ─────────────────────────────────────────────── */
  const heroBg         = document.getElementById('heroBg');
  const heroVideo      = document.getElementById('heroVideo');
  const labelClient    = document.getElementById('labelClient');
  const labelProject   = document.getElementById('labelProject');
  const labelJob       = document.getElementById('labelJob');
  const stripTrack     = document.getElementById('stripTrack');
  const btnPlayPause   = document.getElementById('btnPlayPause');
  const btnMute        = document.getElementById('btnMute');
  const panelInfo      = document.getElementById('panelInfo');
  const panelWork      = document.getElementById('panelWork');
  const panelInfoClose = document.getElementById('panelInfoClose');
  const panelWorkClose = document.getElementById('panelWorkClose');
  const workList       = document.getElementById('workList');

  /* ── INIT ─────────────────────────────────────────────────── */
  function init() {
    buildThumbnailStrip();
    buildWorkList();
    activateProject(0, false);
    startAutoAdvance();
    bindEvents();
    /* Mark FEED as active on initial load */
    const feedLink = document.querySelector('.nav-link[data-panel="feed"]');
    if (feedLink) feedLink.classList.add('is-active');
    /* Sync mute button visual state if button is present */
    if (btnMute) {
      btnMute.classList.toggle('is-muted', isMuted);
      btnMute.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
      btnMute.setAttribute('aria-pressed', String(isMuted));
    }
  }

  /* ── BUILD THUMBNAIL STRIP ────────────────────────────────── */
  function buildThumbnailStrip() {
    PROJECTS.forEach((proj, idx) => {
      const btn = document.createElement('button');
      btn.className = 'thumb';
      btn.id = 'thumb-' + proj.id;
      btn.setAttribute('aria-label', proj.client + ' — ' + proj.title);
      btn.setAttribute('data-index', idx);
      btn.setAttribute('type', 'button');

      /* Set background: real image if available, else gradient */
      if (proj.thumb) {
        btn.style.backgroundImage = 'url("' + proj.thumb + '")';
      } else {
        btn.style.background = proj.color;
      }

      btn.addEventListener('click', () => {
        activateProject(idx, !reducedMotion);
        startAutoAdvance(); /* reset timer on manual pick */
      });

      stripTrack.appendChild(btn);
    });
  }

  /* ── BUILD WORK LIST (panel) ──────────────────────────────── */
  function buildWorkList() {
    PROJECTS.forEach((proj, idx) => {
      const li = document.createElement('li');
      li.className = 'work-item';
      li.innerHTML =
        '<span class="work-item-num">' + String(idx + 1).padStart(2, '0') + '</span>' +
        '<span class="work-item-client">' + proj.client + '</span>' +
        '<span class="work-item-title">'  + proj.title  + '</span>';

      li.addEventListener('click', () => {
        closePanel('panelWork');
        activateProject(idx, !reducedMotion);
        startAutoAdvance();
      });

      workList.appendChild(li);
    });
  }

  /* ── ACTIVATE PROJECT ─────────────────────────────────────── */
  function activateProject(idx, animate) {
    const prev = activeIndex;
    activeIndex = idx;
    const proj = PROJECTS[idx];

    /* Update hero background (image or video) */
    const applyHeroBg = () => {
      if (proj.video) {
        /* Video project — show video element, hide bg image */
        if (heroVideo.src !== location.origin + proj.video) {
          heroVideo.src = proj.video;
          heroVideo.load();
        }
        heroVideo.muted = isMuted;
        heroVideo.classList.add('is-active');
        heroVideo.play().catch(() => {});
        heroBg.style.background = proj.color; /* fallback colour while video loads */
        heroBg.style.backgroundImage = '';
      } else {
        /* Image / gradient project — hide video */
        heroVideo.classList.remove('is-active');
        heroVideo.pause();
        heroVideo.removeAttribute('src');
        if (proj.hero) {
          heroBg.style.backgroundImage = 'url("' + proj.hero + '")';
          heroBg.style.background = '';
        } else {
          heroBg.style.background = proj.color;
          heroBg.style.backgroundImage = '';
        }
      }
    };

    if (animate) {
      hideLabels();
      heroBg.classList.add('is-transitioning');

      const onEnd = () => {
        applyHeroBg();
        heroBg.classList.remove('is-transitioning');
        updateLabels(proj);
        showLabels();
      };

      heroBg.addEventListener('transitionend', onEnd, { once: true });
    } else {
      applyHeroBg();
      updateLabels(proj);
      showLabels();
    }

    updateThumbStates(prev, idx);
    scrollThumbIntoView(idx);
  }

  /* ── LABEL HELPERS ────────────────────────────────────────── */
  function updateLabels(proj) {
    labelClient.textContent  = proj.client;
    labelProject.textContent = proj.title;
    labelJob.textContent     = proj.job;
  }

  function hideLabels() {
    [labelClient, labelProject, labelJob].forEach(el => {
      el.classList.remove('is-visible');
    });
  }

  function showLabels() {
    if (reducedMotion) {
      [labelClient, labelProject, labelJob].forEach(el => el.classList.add('is-visible'));
      return;
    }
    /* Stagger: client → title → job */
    const delays = [0, 70, 140];
    [labelClient, labelProject, labelJob].forEach((el, i) => {
      setTimeout(() => el.classList.add('is-visible'), delays[i]);
    });
  }

  /* ── THUMBNAIL STATE ──────────────────────────────────────── */
  function updateThumbStates(prevIdx, nextIdx) {
    const prev = stripTrack.querySelector('[data-index="' + prevIdx + '"]');
    const next = stripTrack.querySelector('[data-index="' + nextIdx + '"]');
    if (prev) {
      prev.classList.remove('thumb--active');
      prev.setAttribute('aria-current', 'false');
    }
    if (next) {
      next.classList.add('thumb--active');
      next.setAttribute('aria-current', 'true');
    }
  }

  function scrollThumbIntoView(idx) {
    const thumb = stripTrack.querySelector('[data-index="' + idx + '"]');
    if (thumb) {
      thumb.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  /* ── AUTO-ADVANCE ─────────────────────────────────────────── */
  function startAutoAdvance() {
    stopAutoAdvance();
    if (!isPlaying) return;
    autoTimer = setInterval(() => {
      const next = (activeIndex + 1) % PROJECTS.length;
      activateProject(next, !reducedMotion);
    }, AUTO_DELAY);
  }

  function stopAutoAdvance() {
    if (autoTimer !== null) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  /* ── PLAY / PAUSE ─────────────────────────────────────────── */
  function togglePlayPause() {
    isPlaying = !isPlaying;
    btnPlayPause.classList.toggle('is-paused', !isPlaying);
    btnPlayPause.setAttribute('aria-label', isPlaying ? 'Pause slideshow' : 'Play slideshow');
    btnPlayPause.setAttribute('aria-pressed', String(!isPlaying));
    /* Control video playback if current project has video */
    if (heroVideo.classList.contains('is-active')) {
      isPlaying ? heroVideo.play().catch(() => {}) : heroVideo.pause();
    }
    isPlaying ? startAutoAdvance() : stopAutoAdvance();
  }

  /* ── MUTE ─────────────────────────────────────────────────── */
  function toggleMute() {
    isMuted = !isMuted;
    btnMute.classList.toggle('is-muted', isMuted);
    btnMute.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
    btnMute.setAttribute('aria-pressed', String(isMuted));
    heroVideo.muted = isMuted;
  }

  /* ── PANEL MANAGEMENT ─────────────────────────────────────── */
  function openPanel(id) {
    const panel = document.getElementById(id);
    if (!panel) return;
    /* Close any open panels first */
    document.querySelectorAll('.panel.is-open').forEach(p => {
      if (p.id !== id) closePanel(p.id);
    });
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    stopAutoAdvance();
  }

  function closePanel(id) {
    const panel = document.getElementById(id);
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    /* Deactivate the matching nav link */
    const panelKey = id.replace('panel', '').toLowerCase(); /* 'panelInfo' → 'info' */
    document.querySelectorAll('.nav-link').forEach(l => {
      if (l.dataset.panel === panelKey) l.classList.remove('is-active');
    });
    if (isPlaying) startAutoAdvance();
  }

  function closeAllPanels() {
    document.querySelectorAll('.panel.is-open').forEach(p => closePanel(p.id));
  }

  /* ── KEYBOARD NAVIGATION ──────────────────────────────────── */
  function handleKeydown(e) {
    /* Ignore if typing in an input */
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        activateProject((activeIndex + 1) % PROJECTS.length, !reducedMotion);
        startAutoAdvance();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        activateProject((activeIndex - 1 + PROJECTS.length) % PROJECTS.length, !reducedMotion);
        startAutoAdvance();
        break;
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'm':
        toggleMute();
        break;
      case 'Escape':
        closeAllPanels();
        break;
    }
  }

  /* ── TOUCH SWIPE (hero) ───────────────────────────────────── */
  let touchStartX = 0;

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].clientX;
  }

  function handleTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 44) return; /* minimum swipe distance */
    if (dx < 0) {
      activateProject((activeIndex + 1) % PROJECTS.length, !reducedMotion);
    } else {
      activateProject((activeIndex - 1 + PROJECTS.length) % PROJECTS.length, !reducedMotion);
    }
    startAutoAdvance();
  }

  /* ── BIND EVENTS ──────────────────────────────────────────── */
  function bindEvents() {
    /* Controls */
    btnPlayPause.addEventListener('click', togglePlayPause);
    if (btnMute) btnMute.addEventListener('click', toggleMute);

    /* Panel close buttons */
    panelInfoClose.addEventListener('click', () => closePanel('panelInfo'));
    panelWorkClose.addEventListener('click', () => closePanel('panelWork'));

    /* Nav links */
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        const target = link.dataset.panel;
        /* Inner pages — let the browser navigate normally */
        if (target === 'about' || target === 'services' || target === 'contact') return;
        e.preventDefault();
        if (target === 'info') {
          openPanel('panelInfo');
        } else if (target === 'work') {
          openPanel('panelWork');
        } else if (target === 'feed') {
          closeAllPanels(); /* FEED = back to main view */
        }
        /* Update active nav link */
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('is-active'));
        if (target !== 'feed') link.classList.add('is-active');
        else link.classList.add('is-active'); /* FEED gets active too */
      });
    });

    /* Pause auto-advance when hovering strip */
    stripTrack.addEventListener('mouseenter', stopAutoAdvance);
    stripTrack.addEventListener('mouseleave', () => {
      if (isPlaying) startAutoAdvance();
    });

    /* Keyboard */
    document.addEventListener('keydown', handleKeydown);

    /* Touch swipe on hero */
    const heroEl = document.getElementById('hero');
    heroEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    heroEl.addEventListener('touchend',   handleTouchEnd,   { passive: true });

    /* Close panel on backdrop click */
    document.querySelectorAll('.panel').forEach(panel => {
      panel.addEventListener('click', e => {
        if (e.target === panel) closePanel(panel.id);
      });
    });
  }

  /* ── START ────────────────────────────────────────────────── */
  init();

});
