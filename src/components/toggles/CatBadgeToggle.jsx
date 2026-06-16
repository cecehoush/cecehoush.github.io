import { useState } from 'react';
import styles from './CatBadgeToggle.module.css';

// Cat watches the night (open blue eyes) in dark mode, naps in the sun (closed
// eyes + ZZZ) in light mode. Eye swap bounces on click.
export default function CatBadgeToggle({ isDark, toggle }) {
  const [bouncing, setBouncing] = useState(false);

  function handleClick() {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);
    toggle();
  }

  const body = isDark ? '#C0D4F0' : '#8AAEC8';
  const line = isDark ? '#2A3A52' : '#3A5570';
  const iris = '#5A9ED8';

  const badgeStyle = isDark
    ? { background: '#111828', border: '1px solid var(--blue)' }
    : { background: '#2A1F08', border: '1px solid var(--orange)' };

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg
        className={`${styles.cat} ${bouncing ? styles.bounce : ''}`}
        width="54" height="54" viewBox="0 0 54 54" fill="none"
        aria-hidden="true"
      >
        {/* ears */}
        <path d="M14 20 L18 7 L26 18 Z" fill={body} />
        <path d="M40 20 L36 7 L28 18 Z" fill={body} />
        <path d="M16 18 L18.5 11 L22 17 Z" fill={line} opacity="0.5" />
        <path d="M38 18 L35.5 11 L32 17 Z" fill={line} opacity="0.5" />
        {/* head */}
        <ellipse cx="27" cy="31" rx="16" ry="14" fill={body} />

        {isDark ? (
          <>
            {/* open eyes watching the night */}
            <ellipse cx="21" cy="29" rx="3" ry="3.6" fill="#0C1422" />
            <ellipse cx="33" cy="29" rx="3" ry="3.6" fill="#0C1422" />
            <circle cx="21" cy="29" r="2.1" fill={iris} />
            <circle cx="33" cy="29" r="2.1" fill={iris} />
            <ellipse cx="21" cy="29" rx="0.7" ry="2" fill="#0A0F1A" />
            <ellipse cx="33" cy="29" rx="0.7" ry="2" fill="#0A0F1A" />
            <circle cx="20.2" cy="28.1" r="0.6" fill="rgba(255,255,255,0.85)" />
            <circle cx="32.2" cy="28.1" r="0.6" fill="rgba(255,255,255,0.85)" />
          </>
        ) : (
          <>
            {/* closed sleeping eyes napping in the sun */}
            <path d="M18 29 Q21 32 24 29" stroke={line} strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d="M30 29 Q33 32 36 29" stroke={line} strokeWidth="1.4" strokeLinecap="round" fill="none" />
            {/* ZZZ */}
            <text x="39" y="13" fontSize="7" fontFamily="'Syne', sans-serif" fontWeight="700" fill={iris} opacity="0.8">z</text>
            <text x="43.5" y="9" fontSize="5.5" fontFamily="'Syne', sans-serif" fontWeight="700" fill={iris} opacity="0.6">z</text>
            <text x="47" y="6" fontSize="4.5" fontFamily="'Syne', sans-serif" fontWeight="700" fill={iris} opacity="0.45">z</text>
          </>
        )}

        {/* nose + mouth */}
        <path d="M25.6 34 L28.4 34 L27 35.8 Z" fill={iris} />
        <path d="M27 35.8 L27 37.5 M27 37.5 Q24.5 38.5 23 37 M27 37.5 Q29.5 38.5 31 37" stroke={line} strokeWidth="0.9" strokeLinecap="round" fill="none" />
        {/* whiskers */}
        <path d="M12 31 L19 31.5 M12 34 L19 33.5 M42 31 L35 31.5 M42 34 L35 33.5" stroke={line} strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
      </svg>
      <span className={styles.badge} style={badgeStyle} aria-hidden="true">{isDark ? '🌙' : '☀️'}</span>
    </button>
  );
}
