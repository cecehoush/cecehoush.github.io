import styles from './Nav.module.css';
import { useTheme } from '../context/ThemeContext.jsx';
import BubbleToggle from './toggles/BubbleToggle.jsx';
import CatBadgeToggle from './toggles/CatBadgeToggle.jsx';
import WindowToggle from './toggles/WindowToggle.jsx';

const TOGGLE_VARIANT = 'bubble'; // options: 'bubble' | 'cat-badge' | 'window'

const TOGGLES = {
  'bubble': BubbleToggle,
  'cat-badge': CatBadgeToggle,
  'window': WindowToggle,
};

export default function Nav() {
  const { isDark, toggle } = useTheme();
  const ThemeToggle = TOGGLES[TOGGLE_VARIANT];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <div className={styles.dot}></div>
        Cece Housh
      </div>
      <div className={styles.right}>
        <div className={styles.links}>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.actionsWrap}>
          <div className={styles.actions}>
            <a className={styles.btn} href="/CeceHoush_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="1" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Resume
            </a>
            <a className={`${styles.btn} ${styles.lav}`} href="/CeceHoushCV.pdf" target="_blank" rel="noopener noreferrer">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="1" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4.5 4.5h5M4.5 7h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="10" cy="10.5" r="2.5" fill="var(--bg)" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9.3 10.5h1.4M10 9.8v1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              CV
            </a>
          </div>
          <ThemeToggle isDark={isDark} toggle={toggle} />
        </div>
      </div>
    </nav>
  );
}
