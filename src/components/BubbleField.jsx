import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

// Atmospheric background field reusing the hero's particle system (same bubble
// rings + filled dots, drifting orb rings, proximity connectors, same colors and
// light/dark palettes). Difference from the hero: no cursor repulsion and no
// velocity damping, so it drifts gently and perpetually as a calm backdrop.
// Sizes itself to its parent element; pair with a CSS blur on `className`.
const pCols = ['#6AAEE0', '#B090E0', '#9ACAE8', '#D0C0F0', 'rgba(255,255,255,0.82)'];

export default function BubbleField({ className }) {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext('2d');

    const cs = getComputedStyle(document.documentElement);
    const lightPalette = [
      cs.getPropertyValue('--bubble-stroke-1').trim(),
      cs.getPropertyValue('--bubble-stroke-2').trim(),
    ];
    const orbStrokeLight = cs.getPropertyValue('--orb-stroke').trim();
    const connectorLight = cs.getPropertyValue('--connector').trim();
    const palette = isDark ? pCols : lightPalette;

    let particles = [];
    let gt = 0;
    let raf = 0;

    function resize() {
      canvas.width = parent.offsetWidth || window.innerWidth;
      canvas.height = parent.offsetHeight || window.innerHeight;
    }

    function initParticles() {
      particles = Array.from({ length: 58 }, () => {
        const big = Math.random() > 0.3;
        return {
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
          r: big ? 8 + Math.random() * 16 : 2.5 + Math.random() * 4,
          c: palette[Math.floor(Math.random() * palette.length)],
          // Dark alphas pushed to near-full so the canvas reads vivid and colorful,
          // giving the frosted panel rich content to blur through. Light alphas
          // already read well, so they stay as-is.
          a: big
            ? (isDark ? 0.5 + Math.random() * 0.5 : 0.6 + Math.random() * 0.35)
            : (isDark ? 0.8 + Math.random() * 0.2 : 0.7 + Math.random() * 0.3),
          lw: 1.0 + Math.random() * 1.8, bubble: big,
        };
      });
    }

    resize();
    initParticles();

    // Track parent size (viewport changes, mode switches that change height).
    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);

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
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = canvas.width + 20; if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20; if (p.y > canvas.height + 20) p.y = -20;
        if (p.bubble) {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.strokeStyle = p.c; ctx.globalAlpha = isDark ? p.a : 1; ctx.lineWidth = p.lw; ctx.stroke();
          if (isDark) {
            ctx.beginPath(); ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.17, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.65)'; ctx.globalAlpha = p.a * 0.52; ctx.fill();
          }
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
      ro.disconnect();
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
