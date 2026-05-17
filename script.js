/* ============================================================
   A Quiet Cosmology — interactions
   ============================================================ */

(() => {
  const root = document.documentElement;
  const body = document.body;

  /* ---------- pointer / spotlight tracking ---------- */
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let targetX = mx, targetY = my;

  // smooth follow loop
  function loop() {
    mx += (targetX - mx) * 0.18;
    my += (targetY - my) * 0.18;
    root.style.setProperty('--mx', mx + 'px');
    root.style.setProperty('--my', my + 'px');
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.addEventListener('pointermove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
      targetX = e.touches[0].clientX;
      targetY = e.touches[0].clientY;
    }
  }, { passive: true });

  // on touch devices, gently breathe the spotlight near the face area
  if (matchMedia('(hover: none)').matches) {
    let t = 0;
    setInterval(() => {
      t += 0.04;
      // bias upward — face sits in upper third of most photos
      targetX = window.innerWidth / 2 + Math.sin(t) * 50;
      targetY = window.innerHeight * 0.38 + Math.cos(t * 0.7) * 35;
    }, 50);

    // also allow taps to move the spotlight
    window.addEventListener('touchstart', (e) => {
      if (e.touches[0]) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
      }
    }, { passive: true });
  }

  /* ---------- IntersectionObserver: activate chapter on view ---------- */
  const chapters = document.querySelectorAll('.ch');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && e.intersectionRatio > 0.4) {
        e.target.classList.add('active');
      }
    });
  }, { threshold: [0.4] });
  chapters.forEach((c) => io.observe(c));

  // activate the first chapter immediately
  if (chapters[0]) chapters[0].classList.add('active');

  /* ---------- starfield generation (Chapter 2) ---------- */
  const starfield = document.querySelector('.starfield');
  if (starfield) {
    const COUNT = 140;
    for (let i = 0; i < COUNT; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      if (Math.random() < 0.12) s.classList.add('gold');
      if (Math.random() < 0.18) s.classList.add('big');
      s.style.setProperty('--x', Math.random() * 100 + '%');
      s.style.setProperty('--y', Math.random() * 100 + '%');
      s.style.setProperty('--t', (2 + Math.random() * 4) + 's');
      s.style.setProperty('--d', (Math.random() * 4) + 's');
      s.style.setProperty('--o', (0.4 + Math.random() * 0.6));
      starfield.appendChild(s);
    }

    // constellation lines — a stylized "her" constellation
    const svg = document.querySelector('.constellation-svg');
    if (svg) {
      // approximate human-face-like constellation, centered upper third
      // coordinates in viewBox 0..100, 0..100
      const points = [
        [42, 24], [58, 24],            // eyes
        [50, 36],                       // nose
        [42, 46], [58, 46],            // mouth corners
        [50, 50],                       // chin
        [30, 30], [70, 30],            // temples
        [50, 14],                       // crown
      ];
      const lines = [
        [0,1], [0,6], [1,7], [0,2], [1,2],
        [2,3], [2,4], [3,4], [3,5], [4,5],
        [6,8], [7,8],
      ];
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      lines.forEach(([a, b], i) => {
        const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        ln.setAttribute('x1', points[a][0]);
        ln.setAttribute('y1', points[a][1]);
        ln.setAttribute('x2', points[b][0]);
        ln.setAttribute('y2', points[b][1]);
        ln.style.setProperty('--delay', (1.5 + i * 0.15) + 's');
        svg.appendChild(ln);
      });
      points.forEach((p, i) => {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', p[0]);
        c.setAttribute('cy', p[1]);
        c.setAttribute('r', '0.6');
        c.style.setProperty('--delay', (1.2 + i * 0.1) + 's');
        svg.appendChild(c);
      });
    }
  }

  /* ---------- dust motes (Chapter 3) ---------- */
  const dust = document.querySelector('.dust');
  if (dust) {
    const N = 28;
    for (let i = 0; i < N; i++) {
      const m = document.createElement('div');
      m.className = 'mote';
      m.style.setProperty('--x', (10 + Math.random() * 80) + '%');
      m.style.setProperty('--t', (16 + Math.random() * 14) + 's');
      m.style.setProperty('--d', (Math.random() * 20) + 's');
      m.style.setProperty('--dx', (-30 + Math.random() * 20) + 'vw');
      dust.appendChild(m);
    }
  }

  /* ---------- "constellation of you" face stars (Chapter 5) ---------- */
  // Positions are relative to the viewport; the photo is full-bleed cover, so
  // these land on roughly the upper-center area where a face typically sits.
  const faceStars = document.querySelector('.face-stars');
  const faceLines = document.querySelector('.face-lines');
  if (faceStars && faceLines) {
    // the five S's — sweet, slender, surreal, stunning, spontaneous
    // positions land on her face given IMG_0896 + object-position 55% 12%
    const points = [
      { x: 55, y: 13, label: 'surreal' },
      { x: 43, y: 22, label: 'sweet' },
      { x: 67, y: 22, label: 'stunning' },
      { x: 48, y: 33, label: 'slender' },
      { x: 62, y: 33, label: 'spontaneous' },
    ];
    const connections = [
      [0,1], [0,2], [1,2], [1,3], [2,4], [3,4], [0,3], [0,4],
    ];

    faceLines.setAttribute('viewBox', '0 0 100 100');
    faceLines.setAttribute('preserveAspectRatio', 'none');
    connections.forEach(([a, b], i) => {
      const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('x1', points[a].x);
      ln.setAttribute('y1', points[a].y);
      ln.setAttribute('x2', points[b].x);
      ln.setAttribute('y2', points[b].y);
      ln.style.setProperty('--delay', (1.6 + i * 0.2) + 's');
      faceLines.appendChild(ln);
    });

    points.forEach((p, i) => {
      const el = document.createElement('div');
      el.className = 'face-star';
      el.style.setProperty('--x', p.x + '%');
      el.style.setProperty('--y', p.y + '%');
      el.style.setProperty('--delay', (1 + i * 0.35) + 's');
      el.innerHTML = `
        <div class="face-star-dot"></div>
        <div class="face-star-label">${p.label}</div>
      `;
      faceStars.appendChild(el);
    });
  }

  /* ---------- AUDIO ---------- */
  const audio = document.getElementById('song');
  const toggle = document.getElementById('audio-toggle');
  let userInteracted = false;

  function reflectState() {
    if (!audio) return;
    toggle.classList.toggle('paused', audio.paused);
  }

  if (audio && toggle) {
    audio.volume = 0.6;
    audio.loop = true;

    // try to autoplay; browsers will often block, so we retry on first interaction
    audio.play().then(reflectState).catch(() => reflectState());

    const startOnce = () => {
      if (userInteracted) return;
      userInteracted = true;
      audio.play().then(reflectState).catch(reflectState);
    };
    ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'].forEach((ev) => {
      window.addEventListener(ev, startOnce, { once: true, passive: true });
    });

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      userInteracted = true;
      if (audio.paused) audio.play().then(reflectState).catch(reflectState);
      else { audio.pause(); reflectState(); }
    });

    audio.addEventListener('play', reflectState);
    audio.addEventListener('pause', reflectState);
    audio.addEventListener('error', () => {
      // if the song is missing, hide the toggle quietly
      toggle.style.display = 'none';
    });
    // if the audio element has no usable source, also hide
    audio.addEventListener('stalled', () => {});
    reflectState();
  }

  /* ---------- hide custom cursor on chapters where it's distracting ---------- */
  // (left enabled everywhere — the cursor IS the spotlight)
})();
