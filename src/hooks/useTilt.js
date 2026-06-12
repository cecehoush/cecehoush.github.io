import { useEffect, useRef } from 'react';

// 3D spring-tilt loop ported verbatim from the mockup. A `running` boolean
// guards the RAF (no stored RAF id), so the loop ends when motion settles and
// re-triggers cleanly on every fresh hover. Returns a ref for the tilt target
// and a shineRef for the optional radial-gradient highlight overlay.
export function useTilt({
  maxDeg,
  lerp,
  perspective,
  tzFactor,
  threshold,
  shine = false,
  boxShadow = false,
}) {
  const ref = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let running = false, hovered = false;
    let tRx = 0, tRy = 0, cRx = 0, cRy = 0;
    let raf = 0;

    function step() {
      cRx += (tRx - cRx) * lerp;
      cRy += (tRy - cRy) * lerp;
      const tz = Math.abs(cRx) + Math.abs(cRy);
      el.style.transform = `perspective(${perspective}px) rotateX(${cRx}deg) rotateY(${cRy}deg) translateZ(${tz * tzFactor}px)`;
      if (boxShadow) {
        const str = Math.min(tz / 46, 1);
        el.style.boxShadow = `${-cRy * 2}px ${cRx * 2}px 36px rgba(106,174,224,${str * 0.3}),0 0 0 1px rgba(106,174,224,${str * 0.25})`;
      }
      if (hovered || Math.abs(cRx) > threshold || Math.abs(cRy) > threshold) {
        raf = requestAnimationFrame(step);
      } else {
        running = false;
        el.style.transform = '';
        if (boxShadow) el.style.boxShadow = '';
      }
    }

    function go() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    }

    function onEnter(e) {
      hovered = true;
      const r = el.getBoundingClientRect();
      tRx = (r.height / 2 - (e.clientY - r.top)) / r.height * maxDeg;
      tRy = (e.clientX - r.left - r.width / 2) / r.width * maxDeg;
      go();
    }

    function onMove(e) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      tRx = (r.height / 2 - y) / r.height * maxDeg;
      tRy = (x - r.width / 2) / r.width * maxDeg;
      if (shine && shineRef.current) {
        shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px,rgba(106,174,224,0.15) 0%,transparent 62%)`;
      }
    }

    function onLeave() {
      hovered = false;
      tRx = 0;
      tRy = 0;
      if (shine && shineRef.current) shineRef.current.style.background = 'none';
      go();
    }

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [maxDeg, lerp, perspective, tzFactor, threshold, shine, boxShadow]);

  return { ref, shineRef };
}
