import { useEffect, useRef, useState } from 'react';

// IntersectionObserver fade-in, mirroring the mockup: adds the visible state
// once the element scrolls into view (threshold 0.08), with a 150ms fallback
// that reveals everything in case the observer never fires.
export function useScrollFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setVisible(true); }),
      { threshold: 0.08 }
    );
    observer.observe(el);

    const fallback = setTimeout(() => setVisible(true), 150);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return { ref, visible };
}
