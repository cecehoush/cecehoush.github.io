import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';
import { useTheme } from '../context/ThemeContext.jsx';

const pCols = ['#6AAEE0', '#B090E0', '#9ACAE8', '#D0C0F0', 'rgba(255,255,255,0.82)'];
const finalWord = 'people';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [word, setWord] = useState(finalWord);
  const { isDark } = useTheme();

  // ── CANVAS PARTICLES + ORB RINGS ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const heroEl = heroRef.current;
    if (!canvas || !heroEl) return;
    const ctx = canvas.getContext('2d');

    // In light mode, pull stroke colors from the active scheme's CSS vars so the
    // canvas follows whichever LIGHT_SCHEME block is uncommented. Dark mode keeps
    // its original hardcoded colors.
    const cs = getComputedStyle(document.documentElement);
    const lightPalette = [
      cs.getPropertyValue('--bubble-stroke-1').trim(),
      cs.getPropertyValue('--bubble-stroke-2').trim(),
    ];
    const orbStrokeLight = cs.getPropertyValue('--orb-stroke').trim();
    const connectorLight = cs.getPropertyValue('--connector').trim();
    const palette = isDark ? pCols : lightPalette;

    let particles = [];
    let mx = -999, my = -999, gt = 0;
    let raf = 0;

    function resizeCanvas() {
      canvas.width = heroEl.offsetWidth || window.innerWidth;
      canvas.height = heroEl.offsetHeight || 420;
    }

    function initParticles() {
      particles = Array.from({ length: 58 }, () => {
        const big = Math.random() > 0.28;
        return {
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
          // PARTICLE SIZE — adjust first number (min radius) and second (range) to taste
          // big bubbles: currently 8–24px | small dots: currently 2.5–6.5px
          r: big ? 8 + Math.random() * 16 : 2.5 + Math.random() * 4,
          c: palette[Math.floor(Math.random() * palette.length)],
          a: big
            ? (isDark ? 0.15 + Math.random() * 0.32 : 0.55 + Math.random() * 0.35)
            : (isDark ? 0.4 + Math.random() * 0.55 : 0.65 + Math.random() * 0.35),
          lw: 0.6 + Math.random() * 1.2, bubble: big,
        };
      });
    }

    function setup() {
      resizeCanvas();
      initParticles();
    }

    // Size to the hero div after the window has fully loaded (as in the mockup).
    if (document.readyState === 'complete') setup();
    else window.addEventListener('load', setup);
    window.addEventListener('resize', resizeCanvas);

    function onMouseMove(e) {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    }
    function onMouseLeave() { mx = -999; my = -999; }
    heroEl.addEventListener('mousemove', onMouseMove);
    heroEl.addEventListener('mouseleave', onMouseLeave);

    function animLoop() {
      gt += 0.011;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const orbs = [
        { x: 0.11, y: 0.26, r: 90, c: 'rgba(106,174,224,0.22)', d: 18 },
        { x: 0.89, y: 0.36, r: 60, c: 'rgba(176,144,224,0.2)', d: 12 },
        { x: 0.21, y: 0.78, r: 40, c: 'rgba(106,174,224,0.18)', d: 20 },
        { x: 0.79, y: 0.72, r: 108, c: 'rgba(176,144,224,0.15)', d: 14 },
      ];
      orbs.forEach((o, i) => {
        const pulse = Math.sin(gt * 0.65 + i * 1.6) * 0.1 + 1;
        const ox = o.x * canvas.width + Math.sin(gt * 0.38 + i) * o.d;
        const oy = o.y * canvas.height + Math.cos(gt * 0.3 + i) * o.d;
        const orbColor = isDark ? o.c : orbStrokeLight;
        ctx.beginPath(); ctx.arc(ox, oy, o.r * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = orbColor; ctx.lineWidth = 1.5; ctx.globalAlpha = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(ox, oy, o.r * pulse * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = orbColor; ctx.lineWidth = 0.5; ctx.globalAlpha = 0.36; ctx.stroke();
        ctx.globalAlpha = 1;
      });
      particles.forEach((p, i) => {
        const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 155 && d > 0) { const f = (155 - d) / 155 * 0.62; p.vx += dx / d * f; p.vy += dy / d * f; }
        p.vx *= 0.966; p.vy *= 0.966; p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = canvas.width + 20; if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20; if (p.y > canvas.height + 20) p.y = -20;
        if (p.bubble) {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.strokeStyle = p.c; ctx.globalAlpha = isDark ? p.a : 1; ctx.lineWidth = p.lw; ctx.stroke();
          // White highlight reads as a soap-bubble glint on the dark hero, but is
          // invisible/washed on a pale light-mode background — skip it in light mode.
          if (isDark) {
            ctx.beginPath(); ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.17, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.65)'; ctx.globalAlpha = p.a * 0.52; ctx.fill();
          }
          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (spd > 0.45) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 1.38, 0, Math.PI * 2); ctx.strokeStyle = p.c; ctx.globalAlpha = p.a * (spd / 2) * 0.22; ctx.lineWidth = 0.4; ctx.stroke(); }
        } else {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.c; ctx.globalAlpha = isDark ? p.a : 1; ctx.fill();
        }
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j], ex = p.x - q.x, ey = p.y - q.y, ed = Math.sqrt(ex * ex + ey * ey);
          if (ed < 95) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = isDark ? '#6AAEE0' : connectorLight; ctx.globalAlpha = isDark ? (1 - ed / 95) * 0.12 : 1; ctx.lineWidth = 0.4; ctx.stroke(); }
        }
        ctx.globalAlpha = 1;
      });
      raf = requestAnimationFrame(animLoop);
    }
    raf = requestAnimationFrame(animLoop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', setup);
      window.removeEventListener('resize', resizeCanvas);
      heroEl.removeEventListener('mousemove', onMouseMove);
      heroEl.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isDark]);

  // ── TEXT SCRAMBLE ──
  useEffect(() => {
    let progress = 0;
    const scramble = setInterval(() => {
      const s = finalWord.split('').map((c, i) => (i < progress ? c : chars[Math.floor(Math.random() * chars.length)])).join('');
      setWord(s);
      progress += 0.4;
      if (progress > finalWord.length) {
        setWord(finalWord);
        clearInterval(scramble);
      }
    }, 25);
    return () => clearInterval(scramble);
  }, []);

  return (
    <section className={styles.hero} id="hero" ref={heroRef}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>HCI Researcher · University of Denver · 2025</div>
        <div className={styles.heading}>
          <div className={styles.pre}>building for</div>
          <h1 className={styles.main}>
            <span className={styles.outlined}>{word}</span><span className={styles.heroDot}>.</span>
          </h1>
        </div>
        <div className={styles.sub}>First-year CS PhD student designing AI interfaces that work for those who need them most.</div>
        <div className={styles.hint}>↓ move your cursor · click a skill below · try Figma ✦</div>
      </div>
    </section>
  );
}
