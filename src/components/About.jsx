import { useTilt } from '../hooks/useTilt.js';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn.js';
import styles from './About.module.css';

function StatRow({ style, iconStyle, icon, val, lbl }) {
  const { ref } = useTilt({
    maxDeg: 12,
    lerp: 0.15,
    perspective: 500,
    tzFactor: 0.6,
    threshold: 0.05,
    shine: false,
    boxShadow: false,
  });

  return (
    <div className={styles.stat} style={style} ref={ref}>
      <div className={styles.statIcon} style={iconStyle}>{icon}</div>
      <div>
        <div className={styles.statVal}>{val}</div>
        <div className={styles.statLbl}>{lbl}</div>
      </div>
    </div>
  );
}

export default function About() {
  const { ref, visible } = useScrollFadeIn();

  return (
    <section
      className={`${styles.about} ${styles.fadeIn} ${visible ? styles.vis : ''}`}
      id="about"
      ref={ref}
    >
      <div>
        <h2 className={styles.secLabel}>About</h2>
        <div className={styles.aboutH}>Building tech for people who actually need it.</div>
        <p className={styles.aboutP}>
          First-year CS PhD student at the University of Denver specializing in HCI. Graduate Research Assistant on the NSF Colorado Sustainability Hub — building accessible LLM interfaces and researching health pattern recognition for underserved communities.
          <br /><br />
          Two-time hackathon winner. Flutter developer. Proud cat servant.
        </p>
      </div>
      <div className={styles.stats}>
        <StatRow
          icon={
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 2L9.1 5.7L13 6.4L10.2 9L10.9 13L7.5 11.2L4.1 13L4.8 9L2 6.4L5.9 5.7L7.5 2Z" stroke="#6AAEE0" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
            </svg>
          }
          val="2× winner"
          lbl="Hackathon champion"
        />
        <StatRow
          style={{ borderColor: 'rgba(176,144,224,0.13)' }}
          iconStyle={{ background: 'rgba(176,144,224,0.07)', borderColor: 'rgba(176,144,224,0.18)' }}
          icon={
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="2" y="2.5" width="11" height="10" rx="2" stroke="#B090E0" strokeWidth="1.2" />
              <path d="M4.5 6.5h6M4.5 9h4" stroke="#B090E0" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          }
          val="NSF funded"
          lbl="Graduate Research Assistant"
        />
        <StatRow
          icon={
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="5" stroke="#6AAEE0" strokeWidth="1.2" />
              <circle cx="7.5" cy="7.5" r="2" fill="#6AAEE0" />
            </svg>
          }
          val="HCI · AI"
          lbl="Health equity · Accessibility"
        />
      </div>
    </section>
  );
}
