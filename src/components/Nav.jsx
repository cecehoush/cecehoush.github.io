import styles from './Nav.module.css';

export default function Nav() {
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
        <div className={styles.actions}>
          <a className={styles.btn} href="/CeceHoush_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            Resume
          </a>
          <a className={`${styles.btn} ${styles.lav}`} href="/CeceHoushCV.pdf" target="_blank" rel="noopener noreferrer">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4.5 4.5h5M4.5 7h3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="10" cy="10.5" r="2.5" fill="#070A12" stroke="currentColor" strokeWidth="1.1" />
              <path d="M9.3 10.5h1.4M10 9.8v1.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            CV
          </a>
        </div>
      </div>
    </nav>
  );
}
