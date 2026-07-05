/* ============================================================
   ADP.IO — main.js
   Particle Canvas · Cursor Glow · Scroll Reveal · Stats Counter
   Typed Effect · Mobile Nav · Form Handling
   ============================================================ */

'use strict';

/* ────────────────────────────────────────
   0. DYNAMIC AGE CALCULATION
──────────────────────────────────────── */
(function initAge() {
  function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const age = calculateAge('2009-05-02');
  
  // Update all elements with class 'dynamic-age'
  document.querySelectorAll('.dynamic-age').forEach(el => {
    el.textContent = age;
  });

  // Update stat age counter data-count attribute
  const statAge = document.getElementById('stat-age');
  if (statAge) {
    statAge.setAttribute('data-count', age);
    statAge.textContent = age;
  }

  // Also update meta description for SEO (if exists)
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `Angelo Del Piano — ${age} year old web & game developer from Italy. I love creating projects for everyone. Let's build something together!`);
  }
})();

/* ────────────────────────────────────────
   1. CANVAS BACKGROUND — Particle Network
──────────────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf;

  // Particle pool
  const PARTICLE_COUNT = 80;
  const MAX_DIST = 140;
  const particles = [];

  // Color palette for particles
  const COLORS = ['#7c3aed', '#06b6d4', '#ec4899', '#a855f7', '#22d3ee'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    return {
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      vx: randomBetween(-0.35, 0.35),
      vy: randomBetween(-0.35, 0.35),
      r: randomBetween(1.2, 2.8),
      alpha: randomBetween(0.3, 0.8),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const opacity = (1 - dist / MAX_DIST) * 0.25;
          const rgb = hexToRgb(particles[i].color);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${rgb},${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      const rgb = hexToRgb(p.color);
      ctx.fillStyle = `rgba(${rgb},${p.alpha})`;

      // Glow
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Bounce
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    });

    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize();
  initParticles();
  draw();

  // Mouse interaction: push particles away
  let mx = -9999, my = -9999;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    particles.forEach(p => {
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100 * 0.6;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2.5) { p.vx = p.vx / speed * 2.5; p.vy = p.vy / speed * 2.5; }
      }
    });
  });
})();


/* ────────────────────────────────────────
   2. CURSOR GLOW
──────────────────────────────────────── */
(function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function lerpGlow() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';
    requestAnimationFrame(lerpGlow);
  }

  lerpGlow();
})();


/* ────────────────────────────────────────
   3. NAVBAR — Scroll & Mobile
──────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });

  // Mobile toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;  // skip bare # links
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();


/* ────────────────────────────────────────
   4. SCROLL REVEAL
──────────────────────────────────────── */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();


/* ────────────────────────────────────────
   5. STATS COUNTER ANIMATION
──────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out expo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = target * easedProgress;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* ────────────────────────────────────────
   6. TYPED HEADLINE EFFECT
──────────────────────────────────────── */
(function initTyped() {
  const el = document.querySelector('.typed-text');
  if (!el) return;

  const words = el.dataset.words ? el.dataset.words.split('|') : [];
  if (!words.length) return;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const word = words[wordIndex];
    const current = deleting
      ? word.substring(0, charIndex - 1)
      : word.substring(0, charIndex + 1);

    el.textContent = current;
    charIndex = deleting ? charIndex - 1 : charIndex + 1;

    let delay = deleting ? 60 : 100;

    if (!deleting && charIndex === word.length + 1) {
      delay = 1600;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
})();


/* ────────────────────────────────────────
   7. PROJECT CARDS — Tilt Effect
──────────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.project-card, .feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const maxRot = 6;

      card.style.transform = `perspective(800px) rotateX(${-dy * maxRot}deg) rotateY(${dx * maxRot}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ────────────────────────────────────────
   8. CONTACT FORM
──────────────────────────────────────── */
/* ────────────────────────────────────────
   8. CONTACT FORM — EmailJS Integration
──────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // SOSTITUISCI CON LE TUE CHIAVI ESATTE
  const PUBLIC_KEY = "ufQXC2QkfbIlLz-Jx";
  const SERVICE_ID = "service_qyyzulh";
  const TEMPLATE_ID = "template_wepk9qh";

  if (typeof window.emailjs !== 'undefined') {
    window.emailjs.init(PUBLIC_KEY);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Spam check
    const honeypotField = form.querySelector('input[name="honeypot"]');
    if (honeypotField && honeypotField.value) return;

    const btn = form.querySelector('.form-submit');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<span>⏳ Sending…</span>';
    btn.disabled = true;

    // Collect data to ensure we know exactly what is being sent
    const templateParams = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      subject: form.querySelector('[name="subject"]').value,
      message: form.querySelector('[name="message"]').value
    };

    // We use emailjs.send instead of sendForm to avoid any HTMLFormElement parsing issues
    window.emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        btn.innerHTML = originalContent;
        btn.disabled = false;
        form.reset();
        showToast('✓ Message sent! I\'ll get back to you soon. 🚀');
      }, (error) => {
        btn.innerHTML = originalContent;
        btn.disabled = false;

        // STAMPA ERRORE COMPLETO COME RICHIESTO
        const errorMsg = error.text || error.message || "Errore sconosciuto";
        console.error("EmailJS Error: ", errorMsg);
        alert("EmailJS API Error 400: " + errorMsg + "\n\nVerifica Service ID e Template ID!");
        showToast(`❌ Errore: ${errorMsg}`, 'error');
      });
  });
})();


/* ────────────────────────────────────────
   9. TOAST NOTIFICATIONS
──────────────────────────────────────── */
function showToast(message, type = 'success') {
  // Remove existing
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { toast.classList.add('show'); });
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 600);
  }, 3500);
}


/* ────────────────────────────────────────
   10. PARALLAX HERO
──────────────────────────────────────── */
(function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
        heroContent.style.opacity = Math.max(0, 1 - scrollY / 600);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ────────────────────────────────────────
   11. ACTIVE NAV LINK — Scroll Spy
──────────────────────────────────────── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observer.observe(s));
})();


/* ────────────────────────────────────────
   12. MAGNETIC BUTTONS
──────────────────────────────────────── */
(function initMagneticBtns() {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


/* ────────────────────────────────────────
   13. PROJECT PLAYER MODAL
──────────────────────────────────────── */
(function initProjectPlayer() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const iframe = document.getElementById('modal-iframe');
  const title = document.getElementById('modal-title');
  const externalLink = document.getElementById('modal-external');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  const loader = modal.querySelector('.modal-loader');

  // Re-focus the iframe whenever the user clicks inside the modal body
  const modalBody = modal.querySelector('.modal-body');
  modalBody.addEventListener('mousedown', () => {
    try { iframe.contentWindow && iframe.contentWindow.focus(); } catch (e) { }
  });
  modalBody.addEventListener('click', () => {
    try { iframe.contentWindow && iframe.contentWindow.focus(); } catch (e) { }
  });

  function openModal(url, projectTitle) {
    title.textContent = projectTitle;
    externalLink.href = url;
    iframe.src = url;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll

    loader.style.opacity = '1';
    iframe.classList.remove('loaded');

    iframe.onload = () => {
      loader.style.opacity = '0';
      iframe.classList.add('loaded');
      // Give focus to the game as soon as it loads
      try { iframe.contentWindow && iframe.contentWindow.focus(); } catch (e) { }
    };
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      iframe.src = '';
      iframe.classList.remove('loaded');
    }, 400);
  }

  // Bind to playable cards
  document.querySelectorAll('.project-card.playable').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      const projectTitle = card.dataset.title;
      if (url) openModal(url, projectTitle);
    });
  });

  // Bind to play buttons inside cards
  document.querySelectorAll('.play-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.project-card');
      const url = card.dataset.url;
      const projectTitle = card.dataset.title;
      if (url) openModal(url, projectTitle);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // Close on Escape
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Expose play modal function globally for dynamic card bindings
  window.openProjectPlayer = openModal;
})();


/* ────────────────────────────────────────
   13.5. GITHUB API INTEGRATION
──────────────────────────────────────── */
(function initGitHubIntegration() {
  const githubUser = 'bhaki18';
  const githubGrid = document.getElementById('github-projects');
  const filterWrap = document.getElementById('github-filter-wrap');
  const searchInput = document.getElementById('repo-search');
  const clearSearchBtn = document.getElementById('clear-search');
  
  // README Modal elements
  const readmeModal = document.getElementById('readme-modal');
  const readmeTitle = document.getElementById('readme-modal-title');
  const readmeContent = document.getElementById('readme-content');
  const readmeExternal = document.getElementById('readme-modal-external');
  const readmeClose = document.getElementById('readme-modal-close');
  const readmeBackdrop = readmeModal ? readmeModal.querySelector('.modal-backdrop') : null;
  const readmeLoader = document.getElementById('readme-loader');

  let repositories = [];

  if (!githubGrid) return;

  // 1. Fetch Repositories on page load
  fetchRepositories();

  // 2. Fetch Repositories from GitHub API (with offline fallback)
  function fetchRepositories() {
    renderSkeletons();
    
    // Curated fallback repositories in case of API failure, rate limiting, or offline mode
    const fallbackRepos = [
      {
        name: 'cyberPunch67',
        description: 'Un picchiaduro 2D futuristico sviluppato in Phaser JS, Socket.io e Node.js. Modalità Arcade a 100 NPC, multiplayer ranked e sblocchi progressivi.',
        language: 'JavaScript',
        stargazers_count: 5,
        forks_count: 1,
        pushed_at: new Date().toISOString(),
        default_branch: 'main',
        html_url: 'https://github.com/bhaki18/cyberPunch67',
        homepage: 'https://mellow-paprenjak-b3d7d3.netlify.app',
        topics: ['Phaser', 'Socket.io', 'Node.js', 'Multiplayer']
      },
      {
        name: 'neutraled',
        description: 'A real-time multiplayer game built with Phaser 3 and Colyseus. Experience authoritative movement and seamless synchronization.',
        language: 'JavaScript',
        stargazers_count: 5,
        forks_count: 2,
        pushed_at: '2026-07-01T12:00:00Z',
        default_branch: 'main',
        html_url: 'https://github.com/bhaki18/neutraled',
        homepage: 'https://bhaki18.github.io/neutraled',
        topics: ['Phaser-3', 'Colyseus', 'Node.js', 'Multiplayer']
      },
      {
        name: 'phaser-3D',
        description: 'A high-performance rendering engine featuring custom shaders, real-time lighting, and advanced geometry processing.',
        language: 'WebGL',
        stargazers_count: 8,
        forks_count: 1,
        pushed_at: '2026-06-15T12:00:00Z',
        default_branch: 'main',
        html_url: 'https://github.com/bhaki18/phaser-3D',
        homepage: 'https://bhaki18.github.io/phaser-3D/',
        topics: ['WebGL', 'Three.js', 'GLSL', 'Graphics']
      },
      {
        name: 'adp.io',
        description: 'This very portfolio — a handcrafted dark glassmorphism experience built with vanilla technologies. No frameworks, pure performance.',
        language: 'HTML',
        stargazers_count: 3,
        forks_count: 0,
        pushed_at: '2026-07-05T07:00:00Z',
        default_branch: 'main',
        html_url: 'https://github.com/bhaki18/adp.io',
        homepage: '',
        topics: ['HTML5', 'CSS3', 'Vanilla-JS', 'Portfolio']
      },
      {
        name: 'Neural-Workbench',
        description: 'A workspace or laboratory for experimenting with neural networks and machine learning models.',
        language: 'TypeScript',
        stargazers_count: 0,
        forks_count: 0,
        pushed_at: new Date().toISOString(),
        default_branch: 'main',
        html_url: 'https://github.com/bhaki18/Neural-Workbench',
        homepage: '',
        topics: ['Neural-Networks', 'Machine-Learning', 'TypeScript']
      }
    ];

    fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch repositories (Status ${res.status})`);
        return res.json();
      })
      .then(data => {
        // Filter out forks and keep only public user repos
        repositories = data.filter(repo => !repo.fork);
        
        // Force inject cyberPunch67 if it's missing (since it's a private repo and won't show up in public API)
        if (!repositories.some(repo => repo.name.toLowerCase() === 'cyberpunch67')) {
          repositories.push({
            name: 'cyberPunch67',
            description: 'Un picchiaduro 2D futuristico sviluppato in Phaser JS, Socket.io e Node.js. Modalità Arcade a 100 NPC, multiplayer ranked e sblocchi progressivi.',
            language: 'JavaScript',
            stargazers_count: 5,
            forks_count: 1,
            pushed_at: new Date().toISOString(),
            default_branch: 'main',
            html_url: 'https://github.com/bhaki18/cyberPunch67',
            homepage: 'https://mellow-paprenjak-b3d7d3.netlify.app',
            topics: ['Phaser', 'Socket.io', 'Node.js', 'Multiplayer']
          });
        }
        
        // Sort repositories so ones with more stars or recent pushes are shown
        repositories.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
        
        renderRepositories(repositories);
        updateProjectCount(repositories.length);
      })
      .catch(err => {
        console.warn("GitHub API failed or rate-limited. Loading fallback offline projects:", err);
        repositories = fallbackRepos;
        renderRepositories(repositories);
        updateProjectCount(repositories.length);
        
        // Show warning toast for local developers
        if (typeof showToast === 'function') {
          showToast('⚠️ GitHub API rate limit reached. Showing offline cache.', 'warning');
        }
      });
  }

  // 3. Render Skeleton Loaders
  function renderSkeletons() {
    let skeletonHTML = '';
    for (let i = 0; i < 6; i++) {
      skeletonHTML += `
        <div class="glass-card skeleton-card">
          <div class="skeleton-shimmer"></div>
          <div class="skeleton-body">
            <div class="skeleton-thumb"></div>
            <div class="skeleton-line title"></div>
            <div class="skeleton-line text1"></div>
            <div class="skeleton-line text2"></div>
            <div class="skeleton-line footer"></div>
          </div>
        </div>
      `;
    }
    githubGrid.innerHTML = skeletonHTML;
  }

  // Update Projects Stat value in hero section dynamically
  function updateProjectCount(count) {
    const statProj = document.getElementById('stat-projects');
    if (statProj) {
      const prevCount = parseInt(statProj.textContent) || 3;
      statProj.setAttribute('data-count', count);
      
      // Animate from prevCount to new count smoothly
      let start = null;
      const duration = 1500;
      function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(prevCount + (count - prevCount) * eased);
        statProj.textContent = current + '+';
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }

  // 4. Render Repository Cards
  function renderRepositories(repos) {
    if (repos.length === 0) {
      githubGrid.innerHTML = `
        <div class="glass-card" style="grid-column: 1/-1; padding: 40px; text-align: center;">
          <p style="color: var(--clr-text2);">No repositories match your search query.</p>
        </div>
      `;
      return;
    }

    // Thumb gradients and glow colors based on language
    const getGradientsForLang = (lang) => {
      const l = (lang || '').toLowerCase();
      if (l.includes('javascript') || l.includes('js')) {
        return {
          bg: 'linear-gradient(135deg, #1e1b04 0%, #3a320b 50%, #0d0c03 100%)',
          glow: 'radial-gradient(#eab308, transparent)',
          tagColor: '#eab308',
          tagBg: 'rgba(234, 179, 8, 0.1)',
          tagBorder: 'rgba(234, 179, 8, 0.3)'
        };
      } else if (l.includes('typescript') || l.includes('ts')) {
        return {
          bg: 'linear-gradient(135deg, #05142a 0%, #08244f 50%, #020b18 100%)',
          glow: 'radial-gradient(#3b82f6, transparent)',
          tagColor: '#3b82f6',
          tagBg: 'rgba(59, 130, 246, 0.1)',
          tagBorder: 'rgba(59, 130, 246, 0.3)'
        };
      } else if (l.includes('html')) {
        return {
          bg: 'linear-gradient(135deg, #2a0c02 0%, #4f1d07 50%, #150802 100%)',
          glow: 'radial-gradient(#f97316, transparent)',
          tagColor: '#f97316',
          tagBg: 'rgba(249, 115, 22, 0.1)',
          tagBorder: 'rgba(249, 115, 22, 0.3)'
        };
      } else if (l.includes('css')) {
        return {
          bg: 'linear-gradient(135deg, #05202a 0%, #083c4f 50%, #021118 100%)',
          glow: 'radial-gradient(#06b6d4, transparent)',
          tagColor: '#06b6d4',
          tagBg: 'rgba(6, 182, 212, 0.1)',
          tagBorder: 'rgba(6, 182, 212, 0.3)'
        };
      } else if (l.includes('c#') || l.includes('csharp')) {
        return {
          bg: 'linear-gradient(135deg, #15052a 0%, #29084f 50%, #0b0218 100%)',
          glow: 'radial-gradient(#a855f7, transparent)',
          tagColor: '#a855f7',
          tagBg: 'rgba(168, 85, 247, 0.1)',
          tagBorder: 'rgba(168, 85, 247, 0.3)'
        };
      }
      // Default purple-cyan gradient
      return {
        bg: 'linear-gradient(135deg, #100520 0%, #081d2c 50%, #03080e 100%)',
        glow: 'radial-gradient(var(--clr-purple), transparent)',
        tagColor: 'var(--clr-purple-l)',
        tagBg: 'rgba(124, 58, 237, 0.1)',
        tagBorder: 'rgba(124, 58, 237, 0.3)'
      };
    };

    githubGrid.innerHTML = repos.map((repo, idx) => {
      const styleTokens = getGradientsForLang(repo.language);
      const numLabel = String(idx + 1).padStart(2, '0');
      const date = new Date(repo.pushed_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      const language = repo.language || 'Code';

      // Check if project has a play URL (homepage)
      const playUrl = repo.homepage || '';
      const hasPlayUrl = playUrl.length > 0;
      const cardPlayableClass = hasPlayUrl ? 'playable' : '';
      const playOverlayHTML = hasPlayUrl ? `
        <div class="play-overlay">
          <span class="play-icon">▶</span>
          <span class="play-text">Click to Play</span>
        </div>
      ` : '';

      return `
        <article class="glass-card project-card ${cardPlayableClass} reveal revealed" 
                 data-url="${playUrl}" data-title="${repo.name}"
                 style="transition-delay: ${ (idx % 3) * 0.1 }s;">
          <div class="project-thumb">
            <div class="project-thumb-bg" style="background: ${styleTokens.bg};"></div>
            <div class="project-thumb-glow" style="background: ${styleTokens.glow}; opacity: 0.8;"></div>
            <div class="project-thumb-label">${numLabel}</div>
            ${playOverlayHTML}
          </div>
          <div class="project-body">
            <div class="github-status-badge">
              <span class="status-indicator"></span>
              <span>Pushed ${date}</span>
            </div>
            <span class="project-tag" style="color: ${styleTokens.tagColor}; border-color: ${styleTokens.tagBorder}; background: ${styleTokens.tagBg};">
              ${language}
            </span>
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description provided. Click below to inspect the codebase and read the documentation.'}</p>
            
            <div class="repo-meta">
              <div class="repo-meta-item" title="Stars">
                <span>⭐</span>
                <span>${repo.stargazers_count}</span>
              </div>
              <div class="repo-meta-item" title="Forks">
                <span>🍴</span>
                <span>${repo.forks_count}</span>
              </div>
            </div>

            <div class="project-footer">
              <div class="project-tech">
                ${repo.topics ? repo.topics.slice(0, 3).map(topic => `<span class="tech-pill">${topic}</span>`).join('') : ''}
              </div>
              <div style="display: flex; gap: 8px;">
                ${hasPlayUrl ? `<button class="project-link play-trigger" data-url="${playUrl}" data-title="${repo.name}">Play →</button>` : ''}
                <button class="project-link readme-trigger" data-repo="${repo.name}" data-branch="${repo.default_branch}" data-url="${repo.html_url}">
                  Readme →
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    setupDynamicTilt();

    // Bind click events on playable cards (card body)
    githubGrid.querySelectorAll('.project-card.playable').forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent click trigger if they click footer buttons
        if (e.target.closest('.project-link') || e.target.closest('.readme-trigger') || e.target.closest('.play-trigger')) return;
        const url = card.dataset.url;
        const projectTitle = card.dataset.title;
        if (url && typeof window.openProjectPlayer === 'function') {
          window.openProjectPlayer(url, projectTitle);
        }
      });
    });

    // Bind to play button click
    githubGrid.querySelectorAll('.play-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = btn.dataset.url;
        const projectTitle = btn.dataset.title;
        if (url && typeof window.openProjectPlayer === 'function') {
          window.openProjectPlayer(url, projectTitle);
        }
      });
    });

    // Setup README click triggers
    document.querySelectorAll('.readme-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const repoName = btn.dataset.repo;
        const defaultBranch = btn.dataset.branch || 'main';
        const githubUrl = btn.dataset.url;
        openReadmeModal(repoName, defaultBranch, githubUrl);
      });
    });
  }

  function setupDynamicTilt() {
    githubGrid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const maxRot = 6;
        card.style.transform = `perspective(800px) rotateX(${-dy * maxRot}deg) rotateY(${dx * maxRot}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.toLowerCase().trim();
      
      if (val.length > 0) {
        clearSearchBtn.classList.add('visible');
      } else {
        clearSearchBtn.classList.remove('visible');
      }

      const filtered = repositories.filter(repo => {
        const nameMatch = repo.name.toLowerCase().includes(val);
        const descMatch = (repo.description || '').toLowerCase().includes(val);
        const langMatch = (repo.language || '').toLowerCase().includes(val);
        const topicMatch = repo.topics ? repo.topics.some(t => t.toLowerCase().includes(val)) : false;
        return nameMatch || descMatch || langMatch || topicMatch;
      });

      renderRepositories(filtered);
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearSearchBtn.classList.remove('visible');
      renderRepositories(repositories);
      searchInput.focus();
    });
  }

  function openReadmeModal(repoName, defaultBranch, githubUrl) {
    if (!readmeModal) return;

    readmeTitle.textContent = `${repoName} — README.md`;
    readmeExternal.href = githubUrl;
    readmeContent.innerHTML = '';
    readmeModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    readmeLoader.style.opacity = '1';
    readmeLoader.style.display = 'flex';

    fetchReadme(repoName, defaultBranch)
      .catch(() => fetchReadme(repoName, 'master'))
      .catch(() => fetchReadme(repoName, 'main'))
      .catch(err => {
        console.error(err);
        readmeLoader.style.opacity = '0';
        readmeLoader.style.display = 'none';
        readmeContent.innerHTML = `
          <div style="text-align:center; padding: 40px 0;">
            <span style="font-size: 48px; display:block; margin-bottom:16px;">📄</span>
            <h3 style="color:#fff; margin-bottom:10px;">README.md Not Found</h3>
            <p style="color:var(--clr-text2); max-width:460px; margin: 0 auto 20px;">
              This repository doesn't have a standard README.md file in its root directory or it could not be fetched.
            </p>
            <a href="${githubUrl}" target="_blank" class="btn btn-primary">Open Repository on GitHub</a>
          </div>
        `;
      });
  }

  function fetchReadme(repoName, branch) {
    const normalizedName = repoName.toLowerCase();
    const isLocalCyberPunch = normalizedName === 'cyberpunch67';
    const isLocalPhaser3D = normalizedName === 'phaser-3d' || normalizedName === 'phaser3d';
    const isLocalAdp = normalizedName === 'adp.io';
    
    const url = isLocalCyberPunch 
      ? `./html/cyberpunch67-readme.md` 
      : isLocalPhaser3D
      ? `./html/phaser-3D-readme.md`
      : isLocalAdp
      ? `./README.md`
      : `https://raw.githubusercontent.com/${githubUser}/${repoName}/${branch}/README.md`;
      
    return fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Not found on branch ${branch} (Status ${res.status})`);
        return res.text();
      })
      .then(markdown => {
        readmeLoader.style.opacity = '0';
        readmeLoader.style.display = 'none';
        
        if (typeof marked !== 'undefined') {
          marked.setOptions({
            gfm: true,
            breaks: true
          });
          const parsedHTML = marked.parse(markdown);
          const cleanHTML = typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(parsedHTML) : parsedHTML;
          readmeContent.innerHTML = cleanHTML;
        } else {
          readmeContent.innerHTML = `<pre><code>${escapeHTML(markdown)}</code></pre>`;
        }
      });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function closeReadmeModal() {
    if (!readmeModal) return;
    readmeModal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      readmeContent.innerHTML = '';
    }, 400);
  }

  if (readmeClose) readmeClose.addEventListener('click', closeReadmeModal);
  if (readmeBackdrop) readmeBackdrop.addEventListener('click', closeReadmeModal);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && readmeModal && readmeModal.classList.contains('active')) {
      closeReadmeModal();
    }
  });
})();

/* ────────────────────────────────────────
   14. LOG WELCOME
──────────────────────────────────────── */
console.log(
  '%c ADP.IO ',
  'background: linear-gradient(135deg, #7c3aed, #06b6d4); color: #fff; font-size: 18px; font-weight: 800; padding: 8px 20px; border-radius: 8px;'
);
console.log('%c Angelo Del Piano · Web & Game Developer · Italy 🇮🇹', 'color: #a8b4cc; font-size: 13px; margin-top: 4px;');
