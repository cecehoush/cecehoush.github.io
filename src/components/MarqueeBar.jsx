import { useState } from 'react';
import { skills, projects, figmaData } from '../data/portfolio.js';
import styles from './MarqueeBar.module.css';

const figmaPinkSvg = (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5C7 1.5 4 1.5 4 4.5C4 6 5.5 7 7 7C5.5 7 4 8 4 9.5C4 11.5 5.5 12.5 7 12.5V7M7 1.5C7 1.5 10 1.5 10 4.5C10 6 8.5 7 7 7M7 1.5V7" stroke="#FF9D4D" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="10.5" cy="10.5" r="1.8" stroke="#FF9D4D" strokeWidth="1.2" />
  </svg>
);

function matchProjects(skillLabel, isFig) {
  if (isFig) return figmaData;
  const key = skillLabel.replace(' / WCAG', '').replace('A11y', 'Accessibility');
  return projects.filter((p) =>
    p.skills.some(
      (s) =>
        s.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(s.toLowerCase())
    )
  );
}

export default function MarqueeBar({ onOpenFigma }) {
  const [open, setOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  // Persists while the drawer collapses, so content doesn't vanish mid-transition.
  const [drawerData, setDrawerData] = useState(null);

  function handleSkillClick(sk) {
    if (activeSkill === sk.label) {
      // Same skill clicked again → close.
      setOpen(false);
      setActiveSkill(null);
      return;
    }
    setActiveSkill(sk.label);
    setDrawerData({
      skillLabel: sk.label,
      isFig: sk.fig,
      isLav: sk.lav,
      matched: matchProjects(sk.label, sk.fig),
    });
    setOpen(true);
  }

  function closeDrawer() {
    setOpen(false);
    setActiveSkill(null);
  }

  const isFig = drawerData?.isFig;

  return (
    <div className={styles.wrap}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {[...skills, ...skills].map((sk, i) => (
            <span className={styles.item} key={i}>
              <button
                type="button"
                className={[
                  styles.tag,
                  sk.fig ? styles.fig : '',
                  activeSkill === sk.label ? styles.active : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleSkillClick(sk)}
              >
                {sk.label}
              </button>
              <span className={styles.sep}></span>
            </span>
          ))}
        </div>
      </div>

      <div className={`${styles.drawer} ${open ? styles.open : ''}`}>
        <div className={`${styles.drawerInner} ${isFig ? styles.figmaMode : ''}`}>
          <div className={styles.drawerHeader}>
            <div className={styles.drawerLabel}>
              Projects using{' '}
              <span className={[styles.drawerSkillName, drawerData?.isLav ? styles.lav : ''].filter(Boolean).join(' ')}>
                {drawerData?.skillLabel ?? '—'}
              </span>
            </div>
            <button className={styles.drawerClose} onClick={closeDrawer}>✕ close</button>
          </div>
          <div className={styles.projList}>
            {drawerData && drawerData.matched.length === 0 && (
              <div className={styles.empty}>No projects tagged yet.</div>
            )}
            {drawerData && drawerData.matched.map((p) => {
              const className = [
                styles.projItem,
                (p.lav && !isFig) ? styles.lavCard : '',
                isFig ? styles.figCard : '',
              ].filter(Boolean).join(' ');
              const inner = (
                <>
                  <div className={styles.projItemBar}></div>
                  <div className={styles.piNum}>{p.num}</div>
                  <div className={styles.piTitle}>{p.title}</div>
                  <div
                    className={[
                      styles.piType,
                      (p.lav && !isFig) ? styles.lav : '',
                      isFig ? styles.fig : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {p.type}
                  </div>
                  <div className={styles.piDesc}>{p.desc}</div>
                  {isFig && (
                    <div className={styles.piFigmaHint}>
                      {figmaPinkSvg} View screens
                    </div>
                  )}
                  <div className={styles.piArrow} aria-hidden="true">↗</div>
                </>
              );
              // Figma projects open the modal (interactive → button); others are
              // static info cards and stay as non-interactive divs.
              return isFig ? (
                <button type="button" key={p.id} className={className} onClick={() => onOpenFigma(p)}>
                  {inner}
                </button>
              ) : (
                <div key={p.id} className={className}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
