/* ============================================================
   ADP.IO — main.js
   Particle Canvas · Cursor Glow · Scroll Reveal · Stats Counter
   Typed Effect · Mobile Nav · Form Handling
   ============================================================ */

'use strict';

/* ────────────────────────────────────────
   1. CANVAS BACKGROUND — Particle Network
──────────────────────────────────────── */
(function initCanvas() {
  const canvas  = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx     = canvas.getContext('2d');
  let   W, H, raf;

  // Particle pool
  const PARTICLE_COUNT = 80;
  const MAX_DIST       = 140;
  const particles      = [];

  // Color palette for particles
  const COLORS = ['#7c3aed', '#06b6d4', '#ec4899', '#a855f7', '#22d3ee'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    return {
      x:       randomBetween(0, W),
      y:       randomBetween(0, H),
      vx:      randomBetween(-0.35, 0.35),
      vy:      randomBetween(-0.35, 0.35),
      r:       randomBetween(1.2, 2.8),
      alpha:   randomBetween(0.3, 0.8),
      color:   COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `${r},${g},${b}`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const opacity = (1 - dist / MAX_DIST) * 0.25;
          const rgb     = hexToRgb(particles[i].color);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${rgb},${opacity})`;
          ctx.lineWidth   = 0.8;
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
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.shadowBlur  = 0;

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
      const dx   = p.x - mx;
      const dy   = p.y - my;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        const force = (100 - dist) / 100 * 0.6;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
        // Clamp velocity
        const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
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
    glow.style.top  = currentY + 'px';
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
    else                     navbar.classList.remove('scrolled');
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
      const target = document.querySelector(a.getAttribute('href'));
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
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 1800;
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    let start      = null;

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

  const words   = el.dataset.words ? el.dataset.words.split('|') : [];
  if (!words.length) return;

  let wordIndex  = 0;
  let charIndex  = 0;
  let deleting   = false;

  function type() {
    const word    = words[wordIndex];
    const current = deleting
      ? word.substring(0, charIndex - 1)
      : word.substring(0, charIndex + 1);

    el.textContent = current;
    charIndex = deleting ? charIndex - 1 : charIndex + 1;

    let delay = deleting ? 60 : 100;

    if (!deleting && charIndex === word.length + 1) {
      delay    = 1600;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting  = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay     = 400;
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
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
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
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    const original = btn.innerHTML;

    btn.innerHTML  = '⏳ Sending…';
    btn.disabled   = true;

    // Simulate async send
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled  = false;
      form.reset();
      showToast('✓ Message sent! I\'ll get back to you soon. 🚀');
    }, 1800);
  });
})();


/* ────────────────────────────────────────
   9. TOAST NOTIFICATIONS
──────────────────────────────────────── */
function showToast(message, type = 'success') {
  // Remove existing
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
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
        heroContent.style.opacity   = Math.max(0, 1 - scrollY / 600);
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
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

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
      const dx   = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const dy   = (e.clientY - rect.top  - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


/* ────────────────────────────────────────
   13. LOG WELCOME
──────────────────────────────────────── */
console.log(
  '%c ADP.IO ',
  'background: linear-gradient(135deg, #7c3aed, #06b6d4); color: #fff; font-size: 18px; font-weight: 800; padding: 8px 20px; border-radius: 8px;'
);
console.log('%c Angelo Del Piano · Web & Game Developer · Italy 🇮🇹', 'color: #a8b4cc; font-size: 13px; margin-top: 4px;');
