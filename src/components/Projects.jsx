import { Link } from 'react-router-dom';
import { useTilt } from '../hooks/useTilt.js';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn.js';
import styles from './Projects.module.css';

// Section card copy is intentionally distinct from the drawer's project data,
// matching the "Selected work" cards in the mockup verbatim.
const cards = [
  { num: '01 · Mobile · Project Lead', title: 'Roadrunner Connect', type: 'Flutter · Firebase · MongoDB', desc: 'Full-stack campus engagement app, led end-to-end from design to App Store launch.' },
  { num: '02 · Hackathon · 1st place', title: 'Lucent', type: 'AI Mental Wellness · Flutter', desc: 'AI mental wellness app — winner of the DU / MSU / CU Denver Hackathon.' },
  { num: '03 · HCI · Figma', title: 'Align', type: 'Community Care · Figma', desc: 'Community-care app concept supporting real-world belonging over screen time.' },
  { num: '04 · Hackathon · 25 hrs', title: 'Lattice', type: 'Flutter · Firebase · Google ADK', desc: 'AI learning-path generator built in ~25 hours with streak tracking and full branding.' },
];

function ProjectCard({ card }) {
  const { ref, shineRef } = useTilt({
    maxDeg: 26,
    lerp: 0.13,
    perspective: 700,
    tzFactor: 1.3,
    threshold: 0.06,
    shine: true,
    boxShadow: true,
  });

  return (
    <div className={styles.card} ref={ref}>
      <div className={styles.cardShine} ref={shineRef}></div>
      <div className={styles.cardBody}>
        <div className={styles.cardNum}>{card.num}</div>
        <div className={styles.cardTitle}>{card.title}</div>
        <div className={styles.cardType}>{card.type}</div>
        <div className={styles.cardDesc}>{card.desc}</div>
      </div>
      <div className={styles.cardArrow} aria-hidden="true">↗</div>
    </div>
  );
}

export default function Projects() {
  const { ref, visible } = useScrollFadeIn();

  return (
    <section
      className={`${styles.section} ${styles.fadeIn} ${visible ? styles.vis : ''}`}
      id="projects"
      ref={ref}
    >
      <h2 className={styles.secLabel}>Selected work</h2>
      <div className={styles.cardGrid}>
        {cards.map((card, i) => (
          <ProjectCard card={card} key={i} />
        ))}
      </div>
      <div className={styles.seeAllRow}>
        <Link to="/portfolio" className={styles.seeAll}>See full portfolio →</Link>
      </div>
    </section>
  );
}
