import { useEffect, useRef } from 'react';
import styles from './BubbleToggle.module.css';

const SIZE = 36;

// Mirrors the hero's bubble drawing (hollow rings + white highlight dot, with a
// few filled dots), scaled down to ~12 particles inside the toggle button.
export default function BubbleToggle({ isDark, toggle }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const bg = isDark ? '#070A12' : '#D8EAF8';
    const cols = isDark
      ? ['rgba(106,174,224,0.6)', 'rgba(176,144,224,0.6)']
      : ['rgba(20,80,160,0.45)', 'rgba(100,60,180,0.45)'];

    const particles = Array.from({ length: 12 }, () => {
      const big = Math.random() > 0.35;
      return {
        x: Math.random() * SIZE, y: Math.random() * SIZE,
        vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
        r: big ? 1.8 + Math.random() * 2.8 : 0.6 + Math.random() * 1.1,
        c: cols[Math.floor(Math.random() * cols.length)],
        a: big ? 0.45 + Math.random() * 0.4 : 0.5 + Math.random() * 0.4,
        lw: 0.5 + Math.random() * 0.6, bubble: big,
      };
    });

    let raf = 0;
    function loop() {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, SIZE, SIZE);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -6) p.x = SIZE + 6; if (p.x > SIZE + 6) p.x = -6;
        if (p.y < -6) p.y = SIZE + 6; if (p.y > SIZE + 6) p.y = -6;
        if (p.bubble) {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.strokeStyle = p.c; ctx.globalAlpha = p.a; ctx.lineWidth = p.lw; ctx.stroke();
          ctx.beginPath(); ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.18, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.55)';
          ctx.globalAlpha = p.a * 0.5; ctx.fill();
        } else {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.c; ctx.globalAlpha = p.a; ctx.fill();
        }
        ctx.globalAlpha = 1;
      });
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [isDark]);

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <canvas ref={canvasRef} className={styles.canvas} width={SIZE} height={SIZE} />
      <span className={styles.badge} aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
}
