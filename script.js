/* ============================================================
   HM MISHKAT PORTFOLIO — script.js
============================================================ */

/* ---- PAGE LOADER ---- */
window.addEventListener('load', () => {
  document.body.classList.add('no-scroll');
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }, 1100);
});

/* ---- CUSTOM CURSOR ---- */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0;
let rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

const hoverTargets = 'a, button, .skill-chip, .portfolio-card, .service-card, .filter-btn, .skill-tab, .testi-btn, .testi-dot, .social-link, .contact-social-link, .footer-socials a, .back-top, .nav-logo, .logo-badge';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
});

document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity  = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity  = '1';
  cursorRing.style.opacity = '1';
});

/* ---- NAVBAR ---- */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const backTop   = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backTop.classList.toggle('show', window.scrollY > 400);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop;
    const h   = sec.offsetHeight;
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + h);
  });
}

/* ---- PARTICLES CANVAS ---- */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PTCL_COUNT = 55;
const ptcls = [];

class Particle {
  constructor() { this.init(); }
  init() {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.r  = Math.random() * 1.8 + 0.4;
    this.vx = (Math.random() - .5) * .35;
    this.vy = (Math.random() - .5) * .35;
    this.op = Math.random() * .4 + .08;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.init();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(91,142,255,${this.op})`;
    ctx.fill();
  }
}

for (let i = 0; i < PTCL_COUNT; i++) ptcls.push(new Particle());

function connectParticles() {
  for (let i = 0; i < ptcls.length; i++) {
    for (let j = i + 1; j < ptcls.length; j++) {
      const dx   = ptcls[i].x - ptcls[j].x;
      const dy   = ptcls[i].y - ptcls[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 115) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(91,142,255,${.07 * (1 - dist / 115)})`;
        ctx.lineWidth   = .5;
        ctx.moveTo(ptcls[i].x, ptcls[i].y);
        ctx.lineTo(ptcls[j].x, ptcls[j].y);
        ctx.stroke();
      }
    }
  }
}

(function animatePtcl() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ptcls.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animatePtcl);
})();

/* ---- TYPEWRITER ---- */
const typeEl = document.getElementById('typewriter');
const roles  = ['Web Designer', 'Frontend Developer', 'WordPress Expert', 'UI/UX Designer'];
let ri = 0, ci = 0, del = false;

function type() {
  const word = roles[ri];
  typeEl.textContent = del ? word.slice(0, ci--) : word.slice(0, ci++);

  if (!del && ci > word.length) {
    setTimeout(() => { del = true; type(); }, 1800);
    return;
  }
  if (del && ci < 0) {
    del = false;
    ri  = (ri + 1) % roles.length;
  }
  setTimeout(type, del ? 48 : 88);
}
type();

/* ---- SCROLL REVEAL ---- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ---- COUNTER ANIMATION ---- */
const statsEl = document.querySelector('.stats-grid');
if (statsEl) {
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.stat-num').forEach(el => {
        const target = +el.dataset.target;
        const dur    = 1500;
        const step   = target / (dur / 16);
        let cur      = 0;
        const t      = setInterval(() => {
          cur += step;
          if (cur >= target) { el.textContent = target; clearInterval(t); }
          else el.textContent = Math.floor(cur);
        }, 16);
      });
      cntObs.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  cntObs.observe(statsEl);
}

/* ---- SKILLS TABS + BAR ANIMATION ---- */
function animateBarsIn(panel) {
  panel.querySelectorAll('.sk-fill').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { bar.style.width = w; });
    });
  });
}

/* Animate bars when skills section enters viewport */
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  const skillsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const activePanel = document.querySelector('.skills-panel.active');
        if (activePanel) animateBarsIn(activePanel);
        skillsObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  skillsObs.observe(skillsSection);
}

document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById(`tab-${tab.dataset.tab}`);
    if (panel) {
      panel.classList.add('active');
      animateBarsIn(panel);
    }
  });
});

/* ---- PORTFOLIO FILTER ---- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.cat !== filter);
    });
  });
});

/* ---- TESTIMONIALS SLIDER ---- */
const track  = document.getElementById('testiTrack');
const cards  = track ? Array.from(track.querySelectorAll('.testi-card')) : [];
const dotsCt = document.getElementById('testiDots');
let cur = 0;
let autoPlay;

if (cards.length && dotsCt) {
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = `testi-dot${i === 0 ? ' active' : ''}`;
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsCt.appendChild(d);
  });

  function goTo(idx) {
    cur = (idx + cards.length) % cards.length;
    const offset = cur * 100;
    track.style.transform = `translateX(-${offset}%)`;
    dotsCt.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  document.getElementById('testiPrev').addEventListener('click', () => { clearInterval(autoPlay); goTo(cur - 1); startAuto(); });
  document.getElementById('testiNext').addEventListener('click', () => { clearInterval(autoPlay); goTo(cur + 1); startAuto(); });

  function startAuto() { autoPlay = setInterval(() => goTo(cur + 1), 5000); }
  startAuto();
}

/* ---- CONTACT FORM ---- */
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn     = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');

  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

  setTimeout(() => {
    btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    btn.disabled  = false;
    success.classList.add('show');
    e.target.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1800);
});

/* ---- BACK TO TOP ---- */
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- MAGNETIC BUTTONS ---- */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const x  = e.clientX - r.left - r.width / 2;
    const y  = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * .22}px, ${y * .22}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ---- SMOOTH ACTIVE NAV ON LOAD ---- */
updateActiveNav();

/* ---- REFINED: STAGGERED REVEAL (adds delay per grid child) ---- */
document.querySelectorAll('.skills-card-grid, .services-grid, .portfolio-grid, .values-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
  });
});

/* ---- REFINED: TILT + SPOTLIGHT ON CARDS ---- */
const tiltTargets = document.querySelectorAll('.skill-card, .portfolio-card, .service-card, .value-card, .contact-channel');
tiltTargets.forEach(card => {
  card.style.transformStyle = 'preserve-3d';
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -4;
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 4;
    card.style.setProperty('--mx', px + '%');
    card.style.setProperty('--my', py + '%');
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
