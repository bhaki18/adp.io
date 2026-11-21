/* ============================================================
   ADP.IO — main.js
   Dynamic Age · Theme · i18n · Live GitHub Sync · Modals · EmailJS
   ============================================================ */

'use strict';

/* ────────────────────────────────────────
   1. CONFIG & VERIFIED GITHUB SNAPSHOT
──────────────────────────────────────── */
const GITHUB_USER = 'bhaki18';
const CACHE_KEY = 'adp_gh_repos_v3';
const CACHE_TTL_MS = 15 * 60 * 1000;

const PINNED_REPOS = [
  'AIman',
  'manga-gui',
  'manga-cli',
  'cyberPunch67',
  'phaserPlugInFx',
  'adp.io'
];

const LANG_COLORS = {
  Rust: '#dea584',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  C: '#7b8496',
  'C++': '#f34b7d',
  'C#': '#178600',
  Python: '#3572A5',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051'
};

const REPO_OVERRIDES = {
  cyberPunch67: {
    pinned: true,
    playUrl: 'https://mellow-paprenjak-b3d7d3.netlify.app',
    description: 'Futuristic 2D cyberpunk fighting game in Phaser 3 with Socket.io ranked multiplayer, 100-NPC arcade mode, and gamepad support.'
  },
  'phaser-3D': {
    playUrl: 'https://bhaki18.github.io/phaser-3D/',
    description: 'Native 3D software rasterizer and rigid-body physics engine for Phaser 3 (Z-buffer, backface culling, UV mapping, LOD).'
  },
  neutraled: {
    playUrl: 'https://bhaki18.github.io/neutraled/',
    description: 'Playable alpha 1 of a Phaser web game inspired by classic squad arena fighters.'
  },
  AIman: {
    pinned: true
  },
  'manga-gui': {
    pinned: true,
    liveUrl: 'https://bhaki18.github.io/manga-ui-site/#confronto'
  },
  'manga-cli': {
    pinned: true,
    liveUrl: 'https://bhaki18.github.io/manga-ui-site/'
  },
  'manga-gui-mobile': {
    liveUrl: 'https://bhaki18.github.io/manga-ui-site/'
  },
  'manga-ui-site': {
    liveUrl: 'https://bhaki18.github.io/manga-ui-site/',
    description: 'Official web hub and download showcase for the open-source Manga & Anime Ecosystem.'
  },
  phaserPlugInFx: {
    pinned: true
  },
  'adp.io': {
    pinned: true,
    liveUrl: 'https://bhaki18.github.io/adp.io/',
    description: 'Personal developer portfolio & live GitHub project showcase built with vanilla HTML, CSS, and JavaScript.'
  },
  gas_saver: {
    liveUrl: 'https://gas-saver-rho.vercel.app'
  },
  OverTheWire: {
    description: 'Linux terminal notes and shell challenge scripts for OverTheWire wargames.'
  }
};

const FALLBACK_REPOS = [
  {
    name: 'manga-gui-mobile',
    description: 'An Android app in Kotlin & Jetpack Compose for watching anime and reading manga.',
    language: 'Kotlin',
    topics: ['anime', 'manga', 'android'],
    homepage: 'https://bhaki18.github.io/manga-ui-site/',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-11-21T18:34:29Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/manga-gui-mobile',
    license: { spdx_id: 'GPL-3.0' }
  },
  {
    name: 'fast-compress',
    description: 'A lossless CLI file and directory compressor/extractor (.cmpr) written in Rust with LZ77, RLE, and CRC-32 checks.',
    language: 'Rust',
    topics: ['rust', 'compression', 'lz77', 'cli'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-11-21T18:10:04Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/fast-compress',
    license: { spdx_id: 'MIT' }
  },
  {
    name: 'AIman',
    description: 'Lightweight Rust CLI manager & autonomous agent runner for local GGUF AI models.',
    language: 'Rust',
    topics: ['rust', 'gguf', 'local-ai', 'agent'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-11-19T20:47:39Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/AIman',
    license: { spdx_id: 'GPL-3.0' }
  },
  {
    name: 'printer_cli',
    description: 'Una semplice CLI in italiano per la stampante Brother MFC-7320 su Linux.',
    language: 'JavaScript',
    topics: ['linux', 'cli'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-11-10T16:57:05Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/printer_cli',
    license: null
  },
  {
    name: 'manga-gui-linux',
    description: 'Linux packaging and source distribution (Arch, Debian/Ubuntu, Tarball) for Manga GUI.',
    language: 'JavaScript',
    topics: ['anime', 'manga', 'linux'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-11-09T21:26:40Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/manga-gui-linux',
    license: { spdx_id: 'GPL-3.0' }
  },
  {
    name: 'manga-cli',
    description: 'A fast Linux CLI to read manga (RAM-cached in /dev/shm) and stream anime in 1080p via mpv.',
    language: 'JavaScript',
    topics: ['anime', 'manga', 'cli'],
    homepage: 'https://bhaki18.github.io/manga-ui-site/',
    has_pages: true,
    stargazers_count: 1,
    forks_count: 0,
    pushed_at: '2026-11-09T21:26:12Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/manga-cli',
    license: { spdx_id: 'MIT' }
  },
  {
    name: 'manga-gui',
    description: 'A modern desktop app (C# + Avalonia UI) for watching anime and reading manga online and offline.',
    language: 'JavaScript',
    topics: ['anime', 'manga', 'avalonia'],
    homepage: 'https://bhaki18.github.io/manga-ui-site/#confronto',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-11-09T20:27:44Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/manga-gui',
    license: { spdx_id: 'GPL-3.0' }
  },
  {
    name: 'phaserPlugInFx',
    description: 'Modular visual effects (FX) npm library for Phaser 3 GameObjects and scenes.',
    language: 'JavaScript',
    topics: ['phaser3', 'effects', 'npm'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-11-08T23:40:39Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/phaserPlugInFx',
    license: null
  },
  {
    name: 'manga-ui-site',
    description: 'Official web hub and download showcase for the open-source Manga & Anime Ecosystem.',
    language: 'HTML',
    topics: ['website', 'manga-suite'],
    homepage: 'https://bhaki18.github.io/manga-ui-site/',
    has_pages: true,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-11-07T10:49:36Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/manga-ui-site',
    license: null
  },
  {
    name: 'adp.io',
    description: 'Personal developer portfolio & live GitHub project showcase built with vanilla HTML, CSS, and JavaScript.',
    language: 'HTML',
    topics: ['portfolio', 'vanilla-js'],
    homepage: 'https://bhaki18.github.io/adp.io/',
    has_pages: true,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-10-25T17:58:11Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/adp.io',
    license: null
  },
  {
    name: 'OverTheWire',
    description: 'Linux terminal notes and shell challenge scripts for OverTheWire wargames.',
    language: 'Shell',
    topics: ['linux', 'security'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-10-21T00:39:15Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/OverTheWire',
    license: null
  },
  {
    name: 'cyberPunch67',
    description: 'Futuristic 2D cyberpunk fighting game in Phaser 3 with Socket.io ranked multiplayer and 100-NPC arcade mode.',
    language: 'JavaScript',
    topics: ['phaser3', 'socket.io', 'multiplayer'],
    homepage: 'https://mellow-paprenjak-b3d7d3.netlify.app',
    has_pages: false,
    stargazers_count: 1,
    forks_count: 1,
    pushed_at: '2026-10-17T15:19:41Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/cyberPunch67',
    license: { spdx_id: 'ISC' }
  },
  {
    name: 'ani-cli-it',
    description: 'Italian anime streaming CLI for AnimeWorld with an integrated episode tracker.',
    language: 'TypeScript',
    topics: ['typescript', 'cli', 'anime'],
    homepage: '',
    has_pages: true,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-10-12T18:19:29Z',
    default_branch: 'master',
    html_url: 'https://github.com/bhaki18/ani-cli-it',
    license: { spdx_id: 'GPL-3.0' }
  },
  {
    name: 'WardrobeLight',
    description: 'Arduino embedded LED lighting script for automated wardrobe illumination.',
    language: 'C++',
    topics: ['arduino', 'embedded'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-10-07T16:37:57Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/WardrobeLight',
    license: { spdx_id: 'MIT' }
  },
  {
    name: 'gameboy-from-scratch',
    description: 'A terminal GameBoy launcher and retro games suite written in C with ncurses.',
    language: 'C',
    topics: ['c', 'ncurses', 'retro-games'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-10-04T10:20:12Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/gameboy-from-scratch',
    license: { spdx_id: 'MIT' }
  },
  {
    name: 'pacminal',
    description: 'Pac-Man for terminal in ASCII written in C.',
    language: 'C',
    topics: ['c', 'terminal-game'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-10-02T11:38:07Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/pacminal',
    license: { spdx_id: 'MIT' }
  },
  {
    name: 'terton',
    description: 'Simple Snake game for terminal in ASCII written in C.',
    language: 'C',
    topics: ['c', 'terminal-game'],
    homepage: '',
    has_pages: true,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-09-28T02:53:25Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/terton',
    license: { spdx_id: 'MIT' }
  },
  {
    name: 'tiny_jarvis',
    description: 'Simple local AI agent written in JavaScript.',
    language: 'JavaScript',
    topics: ['ai-agent', 'javascript'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-09-26T02:23:01Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/tiny_jarvis',
    license: { spdx_id: 'MIT' }
  },
  {
    name: 'gas_saver',
    description: 'Web app for monitoring fuel prices across Italian gas stations.',
    language: 'JavaScript',
    topics: ['web-app', 'italy'],
    homepage: 'https://gas-saver-rho.vercel.app',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-08-22T13:20:05Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/gas_saver',
    license: null
  },
  {
    name: 'Jarvis',
    description: 'Offline executive voice assistant for Linux powered by local LLaMA LLMs and Piper ONNX TTS.',
    language: 'Python',
    topics: ['python', 'llama-cpp', 'piper-tts', 'linux'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-08-03T07:07:21Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/Jarvis',
    license: { spdx_id: 'MIT' }
  },
  {
    name: 'agent_AI_homeMade',
    description: 'Offline Italian multimodal assistant powered by a PyTorch micro-neural network, Vosk STT, and MediaPipe hand gestures.',
    language: 'Python',
    topics: ['pytorch', 'mediapipe', 'vosk', 'opencv'],
    homepage: '',
    has_pages: false,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-08-02T21:44:53Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/agent_AI_homeMade',
    license: null
  },
  {
    name: 'phaser-3D',
    description: 'Native 3D software rasterizer and rigid-body physics engine for Phaser 3 (Z-buffer, backface culling, UV mapping, LOD).',
    language: 'JavaScript',
    topics: ['phaser3', '3d-engine', 'rasterizer'],
    homepage: 'https://bhaki18.github.io/phaser-3D/',
    has_pages: true,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-07-05T05:32:34Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/phaser-3D',
    license: null
  },
  {
    name: 'neutraled',
    description: 'Playable alpha 1 of a Phaser web game inspired by classic squad arena fighters.',
    language: 'JavaScript',
    topics: ['phaser', 'web-game'],
    homepage: 'https://bhaki18.github.io/neutraled/',
    has_pages: true,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-03-20T16:18:10Z',
    default_branch: 'main',
    html_url: 'https://github.com/bhaki18/neutraled',
    license: null
  }
];

/* ────────────────────────────────────────
   2. HELPERS
──────────────────────────────────────── */
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

function showToast(message, type = 'success') {
  document.querySelectorAll('.toast').forEach(el => el.remove());

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3400);
}

/* ────────────────────────────────────────
   3. DYNAMIC AGE
──────────────────────────────────────── */
function updateDynamicAge() {
  const birth = new Date('2009-05-02');
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  document.querySelectorAll('.dynamic-age').forEach(el => {
    el.textContent = String(age);
  });

  const statAge = document.getElementById('stat-age');
  if (statAge) {
    statAge.textContent = String(age);
  }

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute(
      'content',
      `Angelo Del Piano (@bhaki18) — ${age}-year-old Italian developer building Rust CLI tools, local AI agents, cross-platform apps, and Phaser games.`
    );
  }
}

/* ────────────────────────────────────────
   4. THEME TOGGLE (DARK / LIGHT)
──────────────────────────────────────── */
(function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('adp_theme');
  const initialTheme = stored === 'light' || stored === 'dark' ? stored : 'dark';

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('adp_theme', theme);
    if (toggleBtn) {
      toggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  applyTheme(initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }
})();

/* ────────────────────────────────────────
   5. BILINGUAL SUPPORT (EN / IT)
──────────────────────────────────────── */
let currentLang = localStorage.getItem('adp_lang') === 'it' ? 'it' : 'en';

const I18N = {
  en: {
    'nav.featured': 'Featured',
    'nav.repos': 'Repositories',
    'nav.craft': 'Craft',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.badge': 'Open to ideas & collaborations · Italy',
    'hero.greeting': "Hi, I'm Angelo.",
    'hero.subPrefix': "I'm a",
    'hero.subBody': '-year-old self-taught developer from Italy. I build fast CLI tools in Rust and C, offline AI runners, cross-platform apps, and Phaser games — all in the open.',
    'hero.ctaExplore': 'Explore Projects',
    'hero.ctaContact': 'Get in Touch',
    'hero.italy': 'Italy',
    'hero.activeGithub': 'GitHub Synced',
    'stats.repos': 'Public Repos',
    'stats.langs': 'Languages',
    'stats.age': 'Years Old',
    'stats.since': 'Coding Since',
    'snapshot.langMix': 'Language Mix',
    'snapshot.acrossRepos': 'across public repos',
    'snapshot.latestPush': 'latest push',
    'featured.eyebrow': 'Selected Work',
    'featured.title': 'Featured projects.',
    'featured.desc': 'Pinned builds and flagship experiments spanning Rust systems tools, offline AI agents, cross-platform anime/manga apps, and browser games.',
    'proj.aiman': 'Lightweight Rust CLI manager & autonomous agent runner for local GGUF AI models. Download models directly from Hugging Face, run an interactive TUI, and switch seamlessly between llama.cpp, ik_llama.cpp, and mistralrs.',
    'proj.fastCompress': 'Lossless CLI file and directory archiver written in Rust for packing arbitrary binary and text trees into compact .cmpr archives with LZ77, PackBits RLE, CRC-32 checksums, and path-traversal safety.',
    'proj.cyberpunch': 'Futuristic 2D cyberpunk fighting game in Phaser 3 with Socket.io ranked multiplayer, 100-NPC arcade survival, hitstop combat feedback, and full keyboard + gamepad support.',
    'proj.manga': 'A 100% free, ad-free open-source suite for reading manga and streaming anime across every device: desktop client in C# & Avalonia UI (Windows & Linux), native Android app in Kotlin & Jetpack Compose, and ultra-fast Linux CLI with /dev/shm RAM caching.',
    'proj.phaser3d': 'Native 3D software rasterizer and rigid-body physics engine built from scratch for Phaser 3 — Z-buffer, backface culling, UV mapping, and LOD without WebGL.',
    'proj.phaserfx': 'Modular, extensible visual FX library for Phaser 3 adding dynamic GameObject micro-interactions, scene transitions, and ready-to-use effect prefabs.',
    'proj.gameboy': 'Terminal retro game console launcher written in C with ncurses, bundling custom ASCII arcade games including Pacminal (Pac-Man) and Terton (Snake).',
    'btn.readme': 'Read README',
    'btn.play': 'Play Demo',
    'btn.visitSite': 'Download Hub ↗',
    'btn.cliReadme': 'CLI README',
    'repos.eyebrow': 'Open Source',
    'repos.title': 'All repositories.',
    'repos.desc': "Synced directly with github.com/bhaki18 — filter by stack, search by keyword, or inspect any project's README inline.",
    'repos.syncing': 'Syncing with GitHub…',
    'repos.syncedLive': 'Live from GitHub',
    'repos.syncedCache': 'Cached snapshot',
    'repos.searchPlaceholder': 'Search repos, tech, or topics...',
    'sort.updated': 'Recently Updated',
    'sort.pinned': 'Pinned First',
    'sort.name': 'Name A–Z',
    'filter.all': 'All',
    'filter.pinned': 'Pinned',
    'filter.live': 'Playable & Live',
    'craft.eyebrow': 'What I Build',
    'craft.title': 'Across the stack.',
    'craft.desc': 'From memory-safe CLI binaries and offline AI runners to 3D rasterizers and cross-platform desktop/mobile apps.',
    'craft.c1Title': 'Systems & CLI Engineering',
    'craft.c1Desc': 'Fast, zero-bloat terminal tools in Rust and C — lossless LZ77/RLE compression, ncurses arcade suites, Linux printer utilities, and custom Arch Linux package repos.',
    'craft.c2Title': 'Local AI & Autonomous Agents',
    'craft.c2Desc': "Privacy-first local inference tools built for running GGUF LLMs offline — from AIman's agentic shell runner to PyTorch intent nets, Vosk STT, and MediaPipe gesture tracking.",
    'craft.c3Title': 'Games & 3D Graphics',
    'craft.c3Desc': 'Real-time Socket.io multiplayer fighting games in Phaser 3, custom FX packages on npm, and a scratch-built 3D software rasterizer with Z-buffer and rigid-body physics.',
    'craft.c4Title': 'Cross-Platform & Web Apps',
    'craft.c4Desc': 'Cohesive user-focused software across every screen — Avalonia UI desktop clients in C#, native Android apps in Kotlin & Jetpack Compose, and clean web utilities.',
    'about.eyebrow': 'About Me',
    'about.title': 'Built from curiosity.',
    'about.p1Start': "I'm Angelo Del Piano (ADP), a",
    'about.p1End': '-year-old self-taught developer from Italy. What started as building browser games and interactive web pages quickly expanded into writing low-level C programs, Rust systems CLIs, local AI agents, and cross-platform desktop and mobile suites.',
    'about.p2': "I love understanding how things work underneath the abstraction — whether that's projecting 3D triangles onto a 2D canvas without WebGL, packing files with LZ77 and CRC-32 checksums, caching manga pages directly in /dev/shm, or wiring an Arduino LED trigger.",
    'stack.systems': 'Systems & Embedded',
    'stack.apps': 'Web & Native Apps',
    'stack.ai': 'AI & Machine Learning',
    'stack.games': 'Games & Tooling',
    'contact.eyebrow': 'Contact',
    'contact.title': "Let's build something together.",
    'contact.lead': 'Have a project idea, collaboration proposal, or feedback on one of my repositories? Send a message directly or reach me via email and GitHub.',
    'contact.copy': 'Copy',
    'contact.locationLabel': 'Location',
    'contact.locationValue': 'Italy · CET (UTC+1)',
    'form.name': 'Name',
    'form.namePh': 'Your name',
    'form.email': 'Email',
    'form.subject': 'Subject',
    'form.subjectPh': 'Project idea, collaboration, or question',
    'form.message': 'Message',
    'form.messagePh': "Tell me about what you'd like to build...",
    'form.submit': 'Send Message',
    'footer.copy': '© 2024–2026 Angelo Del Piano · Built in Italy',
    'modal.loadingDemo': 'Loading interactive demo…',
    'modal.loadingReadme': 'Fetching README from GitHub…',
    'roles': ['Systems & Rust Builder', 'Local AI Explorer', 'Game & Graphics Dev', 'Cross-Platform Coder'],
    'ui.showing': 'Showing {shown} of {total} repositories',
    'ui.showAll': 'Show all {total} repositories',
    'ui.showLess': 'Show fewer repositories',
    'ui.noResults': 'No repositories match your current filter or search.',
    'ui.liveSite': 'Live ↗',
    'ui.play': 'Play ▶',
    'ui.pushed': 'Pushed'
  },
  it: {
    'nav.featured': 'In Evidenza',
    'nav.repos': 'Repository',
    'nav.craft': 'Competenze',
    'nav.about': 'Chi Sono',
    'nav.contact': 'Contatti',
    'hero.badge': 'Aperto a idee e collaborazioni · Italia',
    'hero.greeting': 'Ciao, sono Angelo.',
    'hero.subPrefix': 'Sono uno sviluppatore autodidatta italiano di',
    'hero.subBody': ' anni. Creo CLI veloci in Rust e C, runner AI locali, app multipiattaforma e giochi in Phaser — tutto open source.',
    'hero.ctaExplore': 'Esplora i Progetti',
    'hero.ctaContact': 'Contattami',
    'hero.italy': 'Italia',
    'hero.activeGithub': 'Sync GitHub',
    'stats.repos': 'Repo Pubbliche',
    'stats.langs': 'Linguaggi',
    'stats.age': 'Anni',
    'stats.since': 'Dal',
    'snapshot.langMix': 'Mix Linguaggi',
    'snapshot.acrossRepos': 'sulle repo pubbliche',
    'snapshot.latestPush': 'ultimo push',
    'featured.eyebrow': 'Progetti Selezionati',
    'featured.title': 'Progetti in evidenza.',
    'featured.desc': 'Le repository pinnate e i progetti principali tra tool di sistema in Rust, agenti AI offline, suite multipiattaforma manga/anime e giochi web.',
    'proj.aiman': 'Gestore CLI leggero in Rust e runner autonomo per modelli AI locali in formato GGUF. Scarica modelli da Hugging Face, naviga con TUI interattiva e usa llama.cpp, ik_llama.cpp o mistralrs.',
    'proj.fastCompress': 'Compressore ed estrattore CLI lossless in Rust per impacchettare file e cartelle in archivi .cmpr con LZ77, RLE PackBits, verifica CRC-32 e sicurezza anti path-traversal.',
    'proj.cyberpunch': 'Picchiaduro 2D cyberpunk in Phaser 3 con multiplayer ranked via Socket.io, modalità Arcade contro 100 NPC, hitstop e supporto completo tastiera e gamepad.',
    'proj.manga': 'Suite open source gratuita e senza pubblicità per leggere manga e guardare anime su ogni dispositivo: desktop in C# e Avalonia UI (Windows & Linux), app Android nativa in Kotlin & Jetpack Compose e CLI Linux con cache RAM in /dev/shm.',
    'proj.phaser3d': 'Rasterizzatore software 3D nativo e motore fisico rigid-body scritto da zero per Phaser 3 — Z-buffer, backface culling, texture UV e LOD senza WebGL.',
    'proj.phaserfx': 'Libreria modulare di effetti visivi (FX) per Phaser 3 pensata per micro-interazioni sui GameObject, transizioni di scena ed effetti riutilizzabili.',
    'proj.gameboy': 'Launcher console retro da terminale scritto in C con ncurses, che integra giochi arcade ASCII come Pacminal (Pac-Man) e Terton (Snake).',
    'btn.readme': 'Leggi README',
    'btn.play': 'Gioca Demo',
    'btn.visitSite': 'Sito Download ↗',
    'btn.cliReadme': 'README CLI',
    'repos.eyebrow': 'Open Source',
    'repos.title': 'Tutte le repository.',
    'repos.desc': 'Sincronizzate con github.com/bhaki18 — filtra per linguaggio, cerca per parola chiave o leggi qualsiasi README direttamente qui.',
    'repos.syncing': 'Sincronizzazione GitHub…',
    'repos.syncedLive': 'Live da GitHub',
    'repos.syncedCache': 'Snapshot locale',
    'repos.searchPlaceholder': 'Cerca repo, linguaggi o topic...',
    'sort.updated': 'Aggiornate di Recente',
    'sort.pinned': 'Prima le Pinnate',
    'sort.name': 'Nome A–Z',
    'filter.all': 'Tutte',
    'filter.pinned': 'Pinnate',
    'filter.live': 'Giocabili & Live',
    'craft.eyebrow': 'Cosa Costruisco',
    'craft.title': 'A tutto stack.',
    'craft.desc': 'Dai binari CLI memory-safe e runner AI offline fino a rasterizzatori 3D e app desktop/mobile multipiattaforma.',
    'craft.c1Title': 'Sistemi & CLI Engineering',
    'craft.c1Desc': 'Tool da terminale leggeri e veloci in Rust e C — compressione lossless LZ77/RLE, giochi ASCII ncurses, utility di stampa Linux e repository Arch Linux personalizzate.',
    'craft.c2Title': 'AI Locale & Agenti Autonomi',
    'craft.c2Desc': 'Strumenti per inferenza LLM locale privacy-first — dal runner agentico di AIman a micro-reti PyTorch, riconoscimento vocale Vosk e tracking gesture con MediaPipe.',
    'craft.c3Title': 'Giochi & Grafica 3D',
    'craft.c3Desc': 'Giochi multiplayer in tempo reale con Phaser 3 e Socket.io, librerie FX pubblicate su npm e un rasterizzatore 3D software scritto da zero con Z-buffer e fisica.',
    'craft.c4Title': 'App Multipiattaforma & Web',
    'craft.c4Desc': 'Software curato su ogni schermo — client desktop in C# e Avalonia UI, app Android native in Kotlin e Jetpack Compose e applicazioni web moderne.',
    'about.eyebrow': 'Chi Sono',
    'about.title': 'Guidato dalla curiosità.',
    'about.p1Start': 'Sono Angelo Del Piano (ADP), uno sviluppatore autodidatta italiano di',
    'about.p1End': ' anni. Quello che è iniziato creando giochi nel browser si è presto evoluto in programmi low-level in C, CLI di sistema in Rust, agenti AI locali e suite multipiattaforma desktop e mobile.',
    'about.p2': 'Amo capire cosa succede sotto il cofano — che si tratti di proiettare triangoli 3D su un canvas 2D senza WebGL, comprimere dati con LZ77 e CRC-32, gestire manga direttamente in /dev/shm o programmare un LED su Arduino.',
    'stack.systems': 'Sistemi & Embedded',
    'stack.apps': 'Web & App Native',
    'stack.ai': 'AI & Machine Learning',
    'stack.games': 'Giochi & Tooling',
    'contact.eyebrow': 'Contatti',
    'contact.title': 'Costruiamo qualcosa insieme.',
    'contact.lead': "Hai un'idea per un progetto, una proposta di collaborazione o un feedback sulle mie repo? Scrivimi direttamente dal modulo o via email e GitHub.",
    'contact.copy': 'Copia',
    'contact.locationLabel': 'Posizione',
    'contact.locationValue': 'Italia · CET (UTC+1)',
    'form.name': 'Nome',
    'form.namePh': 'Il tuo nome',
    'form.email': 'Email',
    'form.subject': 'Oggetto',
    'form.subjectPh': 'Idea progetto, collaborazione o domanda',
    'form.message': 'Messaggio',
    'form.messagePh': 'Raccontami cosa vorresti realizzare...',
    'form.submit': 'Invia Messaggio',
    'footer.copy': '© 2024–2026 Angelo Del Piano · Realizzato in Italia',
    'modal.loadingDemo': 'Caricamento demo interattiva…',
    'modal.loadingReadme': 'Recupero README da GitHub…',
    'roles': ['Sviluppatore Rust & Sistemi', 'Esploratore AI Locale', 'Game & Graphics Dev', 'Dev Multipiattaforma'],
    'ui.showing': 'Mostrando {shown} di {total} repository',
    'ui.showAll': 'Mostra tutte le {total} repository',
    'ui.showLess': 'Mostra meno repository',
    'ui.noResults': 'Nessuna repository corrisponde ai filtri o alla ricerca.',
    'ui.liveSite': 'Sito ↗',
    'ui.play': 'Gioca ▶',
    'ui.pushed': 'Push'
  }
};

function t(key, vars = {}) {
  const dict = I18N[currentLang] || I18N.en;
  let value = dict[key] ?? I18N.en[key] ?? key;
  if (typeof value === 'string') {
    Object.entries(vars).forEach(([k, v]) => {
      value = value.replace(`{${k}}`, String(v));
    });
  }
  return value;
}

function applyTranslations() {
  document.documentElement.lang = currentLang;

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    const codeSpan = langBtn.querySelector('.lang-code');
    if (codeSpan) codeSpan.textContent = currentLang.toUpperCase();
    langBtn.setAttribute(
      'aria-label',
      currentLang === 'en' ? 'Passa alla lingua italiana' : 'Switch to English'
    );
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (typeof translated === 'string') {
      el.textContent = translated;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translated = t(key);
    if (typeof translated === 'string') {
      el.setAttribute('placeholder', translated);
    }
  });

  updateDynamicAge();
}

/* ────────────────────────────────────────
   6. NAVIGATION & SCROLL SPY
──────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navShell = navbar ? navbar.querySelector('.nav-shell') : null;
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  function updateScrollState() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 36);
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      if (navShell) navShell.classList.toggle('menu-open', isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        if (navShell) navShell.classList.remove('menu-open');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 84;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (match) match.classList.add('active');
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach(sec => spy.observe(sec));
  }
})();

/* ────────────────────────────────────────
   7. HERO ROLE ROTATOR
──────────────────────────────────────── */
const roleRotatorCtrl = (function initRoleRotator() {
  const el = document.getElementById('role-rotator');
  if (!el) return { refresh: () => {} };

  let index = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderImmediate() {
    const roles = t('roles');
    if (Array.isArray(roles) && roles.length) {
      el.textContent = roles[index % roles.length];
    }
  }

  if (!reducedMotion) {
    setInterval(() => {
      const roles = t('roles');
      if (!Array.isArray(roles) || !roles.length) return;
      el.classList.add('is-changing');
      setTimeout(() => {
        index = (index + 1) % roles.length;
        el.textContent = roles[index];
        el.classList.remove('is-changing');
      }, 240);
    }, 3200);
  }

  return { refresh: renderImmediate };
})();

/* ────────────────────────────────────────
   8. BENTO SPOTLIGHT HOVER
──────────────────────────────────────── */
(function initSpotlight() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });
})();

/* ────────────────────────────────────────
   9. MODALS (PLAYABLE DEMO & README)
──────────────────────────────────────── */
const projectPlayer = (function initProjectPlayer() {
  const modal = document.getElementById('project-modal');
  if (!modal) return { open: () => {} };

  const iframe = document.getElementById('modal-iframe');
  const titleEl = document.getElementById('modal-title');
  const externalLink = document.getElementById('modal-external');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  const loader = document.getElementById('modal-loader');
  const modalBody = modal.querySelector('.modal-body');

  let lastFocus = null;

  function open(url, title) {
    lastFocus = document.activeElement;
    titleEl.textContent = title || 'Project Demo';
    externalLink.href = url;
    iframe.classList.remove('loaded');
    if (loader) loader.style.opacity = '1';
    iframe.src = url;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    iframe.onload = () => {
      if (loader) loader.style.opacity = '0';
      iframe.classList.add('loaded');
      try {
        iframe.contentWindow && iframe.contentWindow.focus();
      } catch (_) {}
    };

    if (closeBtn) closeBtn.focus();
  }

  function close() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      iframe.src = '';
      iframe.classList.remove('loaded');
    }, 260);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  if (modalBody) {
    modalBody.addEventListener('click', () => {
      try {
        iframe.contentWindow && iframe.contentWindow.focus();
      } catch (_) {}
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) close();
  });

  return { open };
})();

const readmeViewer = (function initReadmeModal() {
  const modal = document.getElementById('readme-modal');
  if (!modal) return { open: () => {} };

  const titleEl = document.getElementById('readme-modal-title');
  const contentEl = document.getElementById('readme-content');
  const externalLink = document.getElementById('readme-modal-external');
  const closeBtn = document.getElementById('readme-modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  const loader = document.getElementById('readme-loader');

  let lastFocus = null;

  function fetchText(url) {
    return fetch(url).then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    });
  }

  function loadMarkdownWithFallbacks(repoName, branch) {
    const normalized = repoName.toLowerCase();
    if (normalized === 'adp.io') {
      return fetchText('./README.md').then(md => ({ md, resolvedBranch: branch || 'main' }));
    }

    const candidates = [branch, 'main', 'master'].filter((b, i, arr) => b && arr.indexOf(b) === i);
    const rawUrls = candidates.map(
      b => ({ url: `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/${b}/README.md`, branch: b })
    );

    if (normalized === 'cyberpunch67') {
      rawUrls.push({ url: './html/cyberpunch67-readme.md', branch: 'main' });
    } else if (normalized === 'phaser-3d') {
      rawUrls.push({ url: './html/phaser-3D-readme.md', branch: 'main' });
    }

    let chain = Promise.reject(new Error('init'));
    rawUrls.forEach(item => {
      chain = chain.catch(() =>
        fetchText(item.url).then(md => ({ md, resolvedBranch: item.branch }))
      );
    });
    return chain;
  }

  function postProcessMarkdownDom(container, repoName, branch) {
    container.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) return;
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });

    container.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if (src.includes('shields.io') || src.includes('badge')) {
        img.classList.add('md-badge');
      }
      if (src && !/^(https?:|data:|\/\/)/i.test(src)) {
        const cleanPath = src.replace(/^\.?\//, '');
        img.setAttribute(
          'src',
          `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/${branch}/${cleanPath}`
        );
      }
    });
  }

  function open(repoName, defaultBranch, githubUrl) {
    lastFocus = document.activeElement;
    titleEl.textContent = `${repoName} — README.md`;
    externalLink.href = githubUrl || `https://github.com/${GITHUB_USER}/${repoName}`;
    contentEl.innerHTML = '';

    if (loader) {
      loader.style.display = 'flex';
      loader.style.opacity = '1';
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();

    loadMarkdownWithFallbacks(repoName, defaultBranch || 'main')
      .then(({ md, resolvedBranch }) => {
        if (loader) {
          loader.style.opacity = '0';
          loader.style.display = 'none';
        }

        if (typeof window.marked !== 'undefined') {
          window.marked.setOptions({ gfm: true, breaks: true });
          const parsed = window.marked.parse(md);
          contentEl.innerHTML =
            typeof window.DOMPurify !== 'undefined' ? window.DOMPurify.sanitize(parsed) : parsed;
          postProcessMarkdownDom(contentEl, repoName, resolvedBranch);
        } else {
          contentEl.innerHTML = `<pre><code>${escapeHTML(md)}</code></pre>`;
        }
      })
      .catch(() => {
        if (loader) {
          loader.style.opacity = '0';
          loader.style.display = 'none';
        }
        const safeUrl = escapeHTML(externalLink.href);
        contentEl.innerHTML = `
          <div style="text-align:center;padding:36px 16px;">
            <h3 style="margin-bottom:10px;">README.md unavailable</h3>
            <p style="margin-bottom:20px;">This repository does not expose a root README.md or could not be fetched right now.</p>
            <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Open Repository on GitHub ↗</a>
          </div>
        `;
      });
  }

  function close() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      contentEl.innerHTML = '';
    }, 260);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) close();
  });

  return { open };
})();

/* Global click delegation for Featured cards, Latest Push strip, and Repo grid */
document.addEventListener('click', e => {
  const playBtn = e.target.closest('[data-play-url]');
  if (playBtn) {
    e.preventDefault();
    projectPlayer.open(playBtn.dataset.playUrl, playBtn.dataset.playTitle || 'Project Demo');
    return;
  }

  const readmeBtn = e.target.closest('[data-readme-repo]');
  if (readmeBtn) {
    e.preventDefault();
    readmeViewer.open(
      readmeBtn.dataset.readmeRepo,
      readmeBtn.dataset.readmeBranch || 'main',
      readmeBtn.dataset.readmeUrl
    );
  }
});

/* ────────────────────────────────────────
   11. LIVE GITHUB SYNC & REPO EXPLORER
──────────────────────────────────────── */
const githubExplorer = (function initGitHub() {
  const grid = document.getElementById('github-projects');
  const filterWrap = document.getElementById('repo-filters');
  const searchInput = document.getElementById('repo-search');
  const clearBtn = document.getElementById('clear-search');
  const sortSelect = document.getElementById('repo-sort');
  const countLabel = document.getElementById('repo-count');
  const expandWrap = document.getElementById('repo-expand-wrap');
  const expandBtn = document.getElementById('repo-expand-btn');
  const syncStatus = document.getElementById('sync-status');
  const syncStatusText = document.getElementById('sync-status-text');

  let allRepos = [];
  let activeFilter = 'all';
  let searchQuery = '';
  let sortMode = 'updated';
  let showAll = false;
  let syncState = 'syncing';

  const FILTER_LABELS = {
    all: () => t('filter.all'),
    pinned: () => t('filter.pinned'),
    rust: () => 'Rust',
    javascript: () => 'JavaScript',
    c: () => 'C / C++',
    python: () => 'Python',
    'kotlin-ts': () => 'Kotlin & TS',
    live: () => t('filter.live')
  };

  if (!grid) return { refresh: () => {} };

  function normalizeRepo(raw) {
    const override = REPO_OVERRIDES[raw.name] || {};
    const pinned = Boolean(
      override.pinned || PINNED_REPOS.some(p => p.toLowerCase() === raw.name.toLowerCase())
    );
    const playUrl = override.playUrl || '';
    const liveUrl = override.liveUrl || (!playUrl && raw.homepage ? raw.homepage : '');

    return {
      name: raw.name,
      description: override.description || raw.description || '',
      language: raw.language || 'Code',
      topics: Array.isArray(raw.topics) ? raw.topics : [],
      homepage: raw.homepage || '',
      hasPages: Boolean(raw.has_pages),
      stars: Number(raw.stargazers_count) || 0,
      forks: Number(raw.forks_count) || 0,
      pushedAt: raw.pushed_at || raw.updated_at || new Date().toISOString(),
      defaultBranch: raw.default_branch || 'main',
      htmlUrl: raw.html_url || `https://github.com/${GITHUB_USER}/${raw.name}`,
      license: raw.license && raw.license.spdx_id && raw.license.spdx_id !== 'NOASSERTION'
        ? raw.license.spdx_id
        : '',
      pinned,
      playUrl,
      liveUrl
    };
  }

  function renderSkeletons() {
    grid.innerHTML = Array.from({ length: 6 })
      .map(
        () => `
        <div class="skeleton-card" aria-hidden="true">
          <div class="sk-line sk-sm"></div>
          <div class="sk-line sk-title"></div>
          <div class="sk-line sk-body"></div>
          <div class="sk-line sk-body" style="width:78%;"></div>
          <div class="sk-line sk-foot"></div>
        </div>
      `
      )
      .join('');
  }

  function updateSnapshotCard(repos) {
    const repoCountEl = document.getElementById('stat-repos');
    if (repoCountEl) {
      repoCountEl.textContent = String(repos.length);
    }

    const langCounts = {};
    repos.forEach(r => {
      if (!r.language || r.language === 'Code') return;
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    });

    const uniqueLangs = Object.keys(langCounts).length;
    const langsEl = document.getElementById('stat-langs');
    if (langsEl) {
      langsEl.textContent = `${uniqueLangs}+`;
    }

    const sortedLangs = Object.entries(langCounts).sort((a, b) => b[1] - a[1]);
    const totalTyped = sortedLangs.reduce((acc, [, n]) => acc + n, 0) || 1;
    const topLangs = sortedLangs.slice(0, 6);

    const langBar = document.getElementById('lang-bar');
    const langLegend = document.getElementById('lang-legend');

    if (langBar && langLegend) {
      langBar.innerHTML = topLangs
        .map(([lang, count]) => {
          const pct = ((count / totalTyped) * 100).toFixed(1);
          const color = LANG_COLORS[lang] || '#94a3b8';
          return `<span class="lang-bar-seg" style="width:${pct}%;background:${color};" title="${escapeHTML(lang)}: ${count}"></span>`;
        })
        .join('');

      langLegend.innerHTML = topLangs
        .map(([lang, count]) => {
          const color = LANG_COLORS[lang] || '#94a3b8';
          return `<span class="lang-legend-item"><span class="lang-dot" style="--dot:${color};"></span><span>${escapeHTML(lang)} (${count})</span></span>`;
        })
        .join('');
    }

    const latest = [...repos].sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt))[0];
    const latestBtn = document.getElementById('latest-push');
    const latestName = document.getElementById('latest-push-name');
    const latestMeta = document.getElementById('latest-push-meta');
    if (latest && latestBtn && latestName && latestMeta) {
      const shortDate = new Date(latest.pushedAt).toLocaleDateString(
        currentLang === 'it' ? 'it-IT' : 'en-US',
        { month: 'short', day: 'numeric' }
      );
      latestName.textContent = latest.name;
      latestMeta.textContent = `${latest.language} · ${shortDate}`;
      latestBtn.dataset.readmeRepo = latest.name;
      latestBtn.dataset.readmeBranch = latest.defaultBranch;
      latestBtn.dataset.readmeUrl = latest.htmlUrl;
    }
  }

  function matchesFilterFor(repo, filterKey) {
    const lang = repo.language.toLowerCase();
    switch (filterKey) {
      case 'pinned':
        return repo.pinned;
      case 'rust':
        return lang === 'rust';
      case 'javascript':
        return lang === 'javascript';
      case 'c':
        return lang === 'c' || lang === 'c++';
      case 'python':
        return lang === 'python';
      case 'kotlin-ts':
        return lang === 'kotlin' || lang === 'typescript';
      case 'live':
        return Boolean(repo.playUrl || repo.liveUrl);
      default:
        return true;
    }
  }

  function matchesFilter(repo) {
    return matchesFilterFor(repo, activeFilter);
  }

  function updateFilterPillLabels(sourceRepos) {
    if (!filterWrap) return;
    const source = sourceRepos || (allRepos.length ? allRepos : FALLBACK_REPOS.map(normalizeRepo));
    filterWrap.querySelectorAll('.filter-pill').forEach(pill => {
      const key = pill.dataset.filter || 'all';
      const labelFn = FILTER_LABELS[key];
      const label = labelFn ? labelFn() : key;
      const count = source.filter(r => matchesFilterFor(r, key)).length;
      pill.innerHTML = `${escapeHTML(label)}<span class="filter-count">${count}</span>`;
    });
  }

  function renderSyncStatus() {
    if (!syncStatus || !syncStatusText) return;
    syncStatus.classList.toggle('is-fallback', syncState === 'cache');
    if (syncState === 'live') {
      syncStatusText.textContent = t('repos.syncedLive');
    } else if (syncState === 'cache') {
      syncStatusText.textContent = t('repos.syncedCache');
    } else {
      syncStatusText.textContent = t('repos.syncing');
    }
  }

  function matchesSearch(repo) {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      repo.name.toLowerCase().includes(q) ||
      repo.description.toLowerCase().includes(q) ||
      repo.language.toLowerCase().includes(q) ||
      repo.topics.some(topic => topic.toLowerCase().includes(q))
    );
  }

  function sortRepos(list) {
    const copy = [...list];
    if (sortMode === 'name') {
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortMode === 'pinned') {
      return copy.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return new Date(b.pushedAt) - new Date(a.pushedAt);
      });
    }
    return copy.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));
  }

  function renderRepos() {
    const filtered = sortRepos(allRepos.filter(r => matchesFilter(r) && matchesSearch(r)));
    const isUnfiltered = activeFilter === 'all' && !searchQuery;
    const limit = isUnfiltered && !showAll ? 9 : filtered.length;
    const visible = filtered.slice(0, limit);

    if (countLabel) {
      countLabel.textContent = t('ui.showing', {
        shown: visible.length,
        total: filtered.length
      });
    }

    if (expandWrap && expandBtn) {
      if (isUnfiltered && filtered.length > 9) {
        expandWrap.classList.remove('d-none');
        expandBtn.textContent = showAll
          ? t('ui.showLess')
          : t('ui.showAll', { total: filtered.length });
      } else {
        expandWrap.classList.add('d-none');
      }
    }

    if (!visible.length) {
      grid.innerHTML = `<div class="repo-empty"><p>${escapeHTML(t('ui.noResults'))}</p></div>`;
      return;
    }

    grid.innerHTML = visible
      .map(repo => {
        const dotColor = LANG_COLORS[repo.language] || '#94a3b8';
        const pushedStr = new Date(repo.pushedAt).toLocaleDateString(
          currentLang === 'it' ? 'it-IT' : 'en-US',
          { year: 'numeric', month: 'short', day: 'numeric' }
        );
        const safeName = escapeHTML(repo.name);
        const safeDesc = escapeHTML(
          repo.description || 'Open-source repository on GitHub. Inspect the README for full details.'
        );
        const safeLang = escapeHTML(repo.language);
        const safeLicense = escapeHTML(repo.license);
        const safeUrl = escapeHTML(repo.htmlUrl);
        const safeBranch = escapeHTML(repo.defaultBranch);

        const flags = [
          repo.pinned ? `<span class="repo-badge repo-badge-pinned">Pinned</span>` : '',
          repo.playUrl
            ? `<span class="repo-badge repo-badge-live">Playable</span>`
            : repo.liveUrl
            ? `<span class="repo-badge repo-badge-live">Live</span>`
            : '',
          safeLicense ? `<span class="repo-badge">${safeLicense}</span>` : ''
        ]
          .filter(Boolean)
          .join('');

        const playAction = repo.playUrl
          ? `<button type="button" class="btn-card btn-card-primary" data-play-url="${escapeHTML(repo.playUrl)}" data-play-title="${safeName}">${escapeHTML(t('ui.play'))}</button>`
          : repo.liveUrl
          ? `<a href="${escapeHTML(repo.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card btn-card-primary">${escapeHTML(t('ui.liveSite'))}</a>`
          : '';

        const topicsHTML = repo.topics
          .slice(0, 3)
          .map(topic => `<span class="tech-chip">${escapeHTML(topic)}</span>`)
          .join('');

        return `
          <article class="repo-card">
            <div class="repo-card-head">
              <span class="repo-lang">
                <span class="lang-dot" style="--dot:${dotColor};"></span>
                <span>${safeLang}</span>
              </span>
              <div class="repo-flags">${flags}</div>
            </div>

            <h3 class="repo-title">${safeName}</h3>
            <p class="repo-desc">${safeDesc}</p>

            ${topicsHTML ? `<div class="chip-row">${topicsHTML}</div>` : ''}

            <div class="repo-meta">
              <span>${escapeHTML(t('ui.pushed'))} ${escapeHTML(pushedStr)}</span>
              <span class="repo-stats">
                <span title="Stars">★ ${repo.stars}</span>
                <span title="Forks">⑂ ${repo.forks}</span>
              </span>
            </div>

            <div class="repo-actions">
              ${playAction}
              <button type="button" class="btn-card" data-readme-repo="${safeName}" data-readme-branch="${safeBranch}" data-readme-url="${safeUrl}">
                README
              </button>
              <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="btn-card btn-card-ghost">
                GitHub ↗
              </a>
            </div>
          </article>
        `;
      })
      .join('');
  }

  function applyLoadedRepos(rawList, isLive) {
    allRepos = rawList.filter(r => !r.fork).map(normalizeRepo);
    syncState = isLive ? 'live' : 'cache';

    renderSyncStatus();
    updateSnapshotCard(allRepos);
    updateFilterPillLabels(allRepos);
    renderRepos();
  }

  function fetchRepos() {
    const fallbackSnapshot = FALLBACK_REPOS.map(normalizeRepo);
    updateSnapshotCard(fallbackSnapshot);
    updateFilterPillLabels(fallbackSnapshot);
    renderSyncStatus();
    renderSkeletons();

    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.data) && Date.now() - parsed.ts < CACHE_TTL_MS) {
          applyLoadedRepos(parsed.data, true);
          return;
        }
      }
    } catch (_) {}

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data) || !data.length) throw new Error('Empty GitHub response');
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
        } catch (_) {}
        applyLoadedRepos(data, true);
      })
      .catch(() => {
        applyLoadedRepos(FALLBACK_REPOS, false);
      });
  }

  if (filterWrap) {
    filterWrap.addEventListener('click', e => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;
      filterWrap.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter || 'all';
      renderRepos();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim();
      if (clearBtn) clearBtn.classList.toggle('visible', searchQuery.length > 0);
      renderRepos();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearBtn.classList.remove('visible');
      renderRepos();
      searchInput.focus();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortMode = sortSelect.value;
      renderRepos();
    });
  }

  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      showAll = !showAll;
      renderRepos();
    });
  }

  fetchRepos();

  return {
    refresh: () => {
      renderSyncStatus();
      updateFilterPillLabels();
      if (allRepos.length) {
        updateSnapshotCard(allRepos);
        renderRepos();
      }
    }
  };
})();

/* ────────────────────────────────────────
   12. LANGUAGE SWITCHER BINDING
──────────────────────────────────────── */
(function initLanguageToggle() {
  applyTranslations();
  roleRotatorCtrl.refresh();

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'it' : 'en';
      localStorage.setItem('adp_lang', currentLang);
      applyTranslations();
      roleRotatorCtrl.refresh();
      githubExplorer.refresh();
    });
  }
})();

/* ────────────────────────────────────────
   13. CONTACT FORM (EMAILJS) & COPY EMAIL
──────────────────────────────────────── */
(function initContact() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.dataset.email || 'angelodelpiano2317@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(email)
          .then(() => {
            showToast(
              currentLang === 'it' ? 'Email copiata negli appunti!' : 'Email copied to clipboard!'
            );
          })
          .catch(() => showToast(email));
      } else {
        showToast(email);
      }
    });
  }

  const form = document.getElementById('contact-form');
  if (!form) return;

  const feedback = document.getElementById('form-feedback');
  const PUBLIC_KEY = 'ufQXC2QkfbIlLz-Jx';
  const SERVICE_ID = 'service_qyyzulh';
  const TEMPLATE_ID = 'template_wepk9qh';

  if (typeof window.emailjs !== 'undefined') {
    window.emailjs.init(PUBLIC_KEY);
  }

  function setFeedback(text, kind) {
    if (!feedback) return;
    if (!text) {
      feedback.className = 'form-feedback d-none';
      feedback.textContent = '';
      return;
    }
    feedback.className = `form-feedback ${kind === 'error' ? 'is-error' : 'is-success'}`;
    feedback.textContent = text;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    setFeedback('', '');

    const hp = form.querySelector('input[name="honeypot"]');
    if (hp && hp.value) return;

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      const errMsg =
        currentLang === 'it'
          ? 'Compila nome, email e messaggio prima di inviare.'
          : 'Please fill in your name, email, and message before sending.';
      setFeedback(errMsg, 'error');
      showToast(errMsg, 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const errMsg =
        currentLang === 'it'
          ? 'Inserisci un indirizzo email valido.'
          : 'Please enter a valid email address.';
      setFeedback(errMsg, 'error');
      showToast(errMsg, 'error');
      return;
    }

    if (typeof window.emailjs === 'undefined') {
      const errMsg =
        currentLang === 'it'
          ? 'Servizio email non disponibile. Scrivimi direttamente a angelodelpiano2317@gmail.com.'
          : 'Email service unavailable. Please reach out directly at angelodelpiano2317@gmail.com.';
      setFeedback(errMsg, 'error');
      showToast(errMsg, 'error');
      return;
    }

    const submitBtn = form.querySelector('.form-submit');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.textContent = currentLang === 'it' ? 'Invio in corso…' : 'Sending…';
    submitBtn.disabled = true;

    const templateParams = { name, email, subject, message };

    window.emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        form.reset();
        const okMsg =
          currentLang === 'it'
            ? 'Messaggio inviato! Ti risponderò presto.'
            : "Message sent! I'll get back to you soon.";
        setFeedback(okMsg, 'success');
        showToast(okMsg);
      })
      .catch(error => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        const reason = (error && (error.text || error.message)) || 'Unknown error';
        const errMsg =
          currentLang === 'it'
            ? `Invio non riuscito (${reason}). Puoi scrivermi a angelodelpiano2317@gmail.com.`
            : `Failed to send (${reason}). You can email angelodelpiano2317@gmail.com directly.`;
        setFeedback(errMsg, 'error');
        showToast(errMsg, 'error');
      });
  });
})();
