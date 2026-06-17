import { useEffect, useState } from 'react';
import styles from './FigmaModal.module.css';

export default function FigmaModal({ project, onClose }) {
  // Keep the last project mounted so content stays visible while fading out.
  const [current, setCurrent] = useState(null);
  const open = !!project;

  useEffect(() => {
    if (project) setCurrent(project);
  }, [project]);

  // Escape to close, and lock body scroll while open (as in the mockup).
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className={`${styles.modal} ${open ? styles.open : ''}`}>
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Close Figma preview"></button>
      <div className={styles.panel}>
        <div className={styles.topbar}>
          <div className={styles.titleWrap}>
            <div className={styles.badge}>
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5C7 1.5 4 1.5 4 4.5C4 6 5.5 7 7 7C5.5 7 4 8 4 9.5C4 11.5 5.5 12.5 7 12.5V7M7 1.5C7 1.5 10 1.5 10 4.5C10 6 8.5 7 7 7M7 1.5V7" stroke="#FF9D4D" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="10.5" cy="10.5" r="1.8" stroke="#FF9D4D" strokeWidth="1.2" />
              </svg>
              Figma Design
            </div>
            <div className={styles.projName}>{current?.title ?? '—'}</div>
          </div>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>
        <div className={styles.body}>
          {current && (
            <>
              <div className={styles.screens}>
                {current.screens.map((s, i) => (
                  <div
                    className={styles.phoneWrap}
                    key={i}
                    style={{ transform: i === 0 ? 'scale(1)' : 'scale(0.88)' }}
                  >
                    {/* Dim only the phone frame/screen for hierarchy — the label
                        below keeps full opacity so it stays legible. */}
                    <div className={styles.phone} style={{ opacity: i === 0 ? 1 : 0.72 }}>
                      <div className={styles.phoneNotch}></div>
                      <div
                        className={styles.phoneScreen}
                        dangerouslySetInnerHTML={{ __html: s.svg }}
                      ></div>
                      <div className={styles.phoneHome}></div>
                    </div>
                    <div className={styles.phoneLbl}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className={styles.info}>
                <div>
                  <div className={styles.infoTitle}>{current.title}</div>
                  <div className={styles.infoType}>{current.type}</div>
                </div>
                <div className={styles.infoDesc}>{current.desc}</div>
                <div className={styles.tags}>
                  {current.tags.map((t, i) => (
                    <span className={styles.tag} key={i}>{t}</span>
                  ))}
                </div>
                <div className={styles.note}>
                  ↑ Illustrated mockups representing Figma designs. Swap in real exported frames or Figma embeds when building.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
