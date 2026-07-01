import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

const resumeIcon = (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <rect x="2" y="1" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const cvIcon = (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <rect x="2" y="1" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4.5 4.5h5M4.5 7h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="10" cy="10.5" r="2.5" fill="var(--bg)" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9.3 10.5h1.4M10 9.8v1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export default function Nav() {
  const { isDark, toggle } = useTheme();
  const ThemeToggle = TOGGLES[TOGGLE_VARIANT];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close the mobile menu on Escape (return focus to the button) or an outside
  // click — only while it's open.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    function onPointerDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [menuOpen]);

  // If the viewport grows back to the desktop nav, force the menu closed so it
  // can't persist in a broken half-state.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 601px)');
    function onChange(e) { if (e.matches) setMenuOpen(false); }
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  // Home-anchor nav (logo, About). On the home page, smooth-scroll in place;
  // from another route (e.g. /portfolio), navigate to /#hash so the home page
  // mounts and App's ScrollToHash brings the section into view.
  function goToHashSection(e, id) {
    e.preventDefault();
    closeMenu();
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#' + id);
    }
  }

  return (
    <nav className={styles.nav}>
      <a className={styles.logo} href={location.pathname === '/' ? '#hero' : '/#hero'} onClick={(e) => goToHashSection(e, 'hero')}>
        <div className={styles.dot}></div>
        Cece Housh
      </a>
      <div className={styles.right}>
        <div className={styles.links}>
          <Link to="/portfolio" data-text="Portfolio"><span className={styles.linkLabel}>Portfolio</span></Link>
          <a href={location.pathname === '/' ? '#about' : '/#about'} data-text="About" onClick={(e) => goToHashSection(e, 'about')}><span className={styles.linkLabel}>About</span></a>
          <Link to="/contact" data-text="Contact"><span className={styles.linkLabel}>Contact</span></Link>
        </div>
        <div className={styles.menu} ref={menuRef}>
          <button
            type="button"
            ref={hamburgerRef}
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`${styles.menuPanel} ${menuOpen ? styles.menuPanelOpen : ''}`} id="nav-menu">
            <Link className={styles.menuLink} to="/portfolio" onClick={closeMenu}>Portfolio</Link>
            <a className={styles.menuLink} href={location.pathname === '/' ? '#about' : '/#about'} onClick={(e) => goToHashSection(e, 'about')}>About</a>
            <Link className={styles.menuLink} to="/contact" onClick={closeMenu}>Contact</Link>
            <div className={styles.menuDivider}></div>
            <a className={`${styles.btn} ${styles.menuBtn}`} href="/CeceHoush_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
              {resumeIcon}
              Resume
            </a>
            <a className={`${styles.btn} ${styles.lav} ${styles.menuBtn}`} href="/CeceHoushCV.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
              {cvIcon}
              CV
            </a>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.actionsWrap}>
          <div className={styles.actions}>
            <a className={styles.btn} href="/CeceHoush_Resume.pdf" target="_blank" rel="noopener noreferrer">
              {resumeIcon}
              Resume
            </a>
            <a className={`${styles.btn} ${styles.lav}`} href="/CeceHoushCV.pdf" target="_blank" rel="noopener noreferrer">
              {cvIcon}
              CV
            </a>
          </div>
          <ThemeToggle isDark={isDark} toggle={toggle} />
        </div>
      </div>
    </nav>
  );
}
