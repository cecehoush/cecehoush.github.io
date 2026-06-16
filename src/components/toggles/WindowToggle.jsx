import { useState } from 'react';
import styles from './WindowToggle.module.css';

// A window onto the sky: night (dark) shows a cat awake watching the stars;
// day (light) shows the cat napping in warm golden sun on the sill.
export default function WindowToggle({ isDark, toggle }) {
  const [bouncing, setBouncing] = useState(false);

  function handleClick() {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 420);
    toggle();
  }

  const sky = isDark ? '#080C1E' : '#F2C450';
  const sill = isDark ? '#3A2818' : '#7A5828';
  const cat = isDark ? '#C0D4F0' : '#5A8CB8';
  const frame = '#241A12';
  const muntin = isDark ? '#2E2214' : '#4A3318';

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg
        className={`${styles.window} ${bouncing ? styles.bounce : ''}`}
        width="66" height="66" viewBox="0 0 66 66" fill="none"
        aria-hidden="true"
      >
        {/* outer frame */}
        <rect x="3" y="3" width="60" height="60" rx="11" fill={frame} />
        {/* clip the scene to a rounded inner area */}
        <defs>
          <clipPath id="winClip">
            <rect x="8" y="8" width="50" height="50" rx="6" />
          </clipPath>
        </defs>
        <g clipPath="url(#winClip)">
          {/* sky */}
          <rect className={styles.sky} x="8" y="8" width="50" height="50" fill={sky} />
          {/* stars at night */}
          {isDark && (
            <>
              <circle cx="16" cy="16" r="0.8" fill="rgba(255,255,255,0.8)" />
              <circle cx="24" cy="13" r="0.5" fill="rgba(255,255,255,0.6)" />
              <circle cx="40" cy="14" r="0.6" fill="rgba(255,255,255,0.7)" />
              <circle cx="14" cy="26" r="0.5" fill="rgba(255,255,255,0.5)" />
            </>
          )}
          {/* sill */}
          <rect className={styles.sill} x="8" y="46" width="50" height="12" fill={sill} />
          {/* cat sitting on the sill */}
          {/* ears */}
          <path d="M27 41 L29 34 L33 41 Z" fill={cat} />
          <path d="M39 41 L37 34 L33 41 Z" fill={cat} />
          {/* body */}
          <ellipse cx="33" cy="51" rx="9" ry="7" fill={cat} />
          {/* head */}
          <circle cx="33" cy="43" r="6.5" fill={cat} />
          {/* tail */}
          <path d="M42 52 Q49 49 46 43" stroke={cat} strokeWidth="3" strokeLinecap="round" fill="none" />

          {isDark ? (
            <>
              {/* open eyes watching the night */}
              <circle cx="30.3" cy="43" r="1.5" fill="#0C1422" />
              <circle cx="35.7" cy="43" r="1.5" fill="#0C1422" />
              <circle cx="30.3" cy="43" r="0.9" fill="#5A9ED8" />
              <circle cx="35.7" cy="43" r="0.9" fill="#5A9ED8" />
            </>
          ) : (
            <>
              {/* closed sleeping eyes napping in the sun */}
              <path d="M28 43 Q30.3 45 32.6 43" stroke="#243748" strokeWidth="1.1" strokeLinecap="round" fill="none" />
              <path d="M33.4 43 Q35.7 45 38 43" stroke="#243748" strokeWidth="1.1" strokeLinecap="round" fill="none" />
            </>
          )}
          {/* nose */}
          <path d="M32 45.4 L34 45.4 L33 46.6 Z" fill="#243748" />

          {/* window pane cross-lines (muntins) */}
          <line x1="33" y1="8" x2="33" y2="46" stroke={muntin} strokeWidth="2" />
          <line x1="8" y1="27" x2="58" y2="27" stroke={muntin} strokeWidth="2" />
        </g>
        {/* frame inner edge */}
        <rect x="8" y="8" width="50" height="50" rx="6" stroke="rgba(0,0,0,0.35)" strokeWidth="1" fill="none" />
      </svg>
      <span className={styles.emoji} aria-hidden="true">{isDark ? '🌙' : '☀️'}</span>
    </button>
  );
}
