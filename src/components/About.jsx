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
        <h2 className={styles.secLabel}>At a glance</h2>
        <div className={styles.aboutH}>Building tech for people who actually need it.</div>
        <p className={styles.aboutP}>
          Full-stack developer and researcher based in Denver. I build across the stack, including mobile, web, and AI, with a focus on making technology actually work for the people using it.
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
              <ellipse cx="7.5" cy="3.5" rx="5" ry="2" stroke="#6AAEE0" strokeWidth="1.2" />
              <path d="M2.5 3.5v8c0 1.1 2.24 2 5 2s5-0.9 5-2v-8" stroke="#6AAEE0" strokeWidth="1.2" />
              <path d="M2.5 7.5c0 1.1 2.24 2 5 2s5-0.9 5-2" stroke="#6AAEE0" strokeWidth="1.2" />
            </svg>
          }
          val="SQL winner"
          lbl="First woman at MSU Denver"
        />
        <StatRow
          style={{ borderColor: 'rgba(176,144,224,0.13)' }}
          iconStyle={{ background: 'rgba(176,144,224,0.07)', borderColor: 'rgba(176,144,224,0.18)' }}
          icon={
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="4" y="1.5" width="7" height="12" rx="1.5" stroke="#B090E0" strokeWidth="1.2" />
              <path d="M6.3 11.5h2.4" stroke="#B090E0" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          }
          val="App Deployment"
          lbl="To iOS &amp; Android app stores"
        />
      </div>
    </section>
  );
}
