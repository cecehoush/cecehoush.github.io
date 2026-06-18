import { useTilt } from '../hooks/useTilt.js';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn.js';
import styles from './Projects.module.css';

// Section card copy is intentionally distinct from the drawer's project data,
// matching the "Selected work" cards in the mockup verbatim.
const cards = [
  { num: '01 · Research', title: 'Accessible LLM Interfaces', type: 'NSF · Colorado Sustainability Hub', desc: 'Evaluating and designing LLM interfaces that genuinely serve underserved and rural communities.' },
  { num: '02 · Hackathon · 1st place', title: 'Lucent', type: 'AI Mental Wellness · Flutter', desc: 'AI mental wellness app — winner of the DU / MSU / CU Denver Hackathon.' },
  { num: '03 · Hackathon · 25 hrs', title: 'Lattice', type: 'Flutter · Firebase · Google ADK', desc: 'AI learning path generator built in 25 hours with streak tracking and full branding.' },
  { num: '04 · Mobile · Project lead', title: 'Roadrunner Connect', type: 'Flutter · Firebase · MongoDB', desc: 'Campus engagement app for the University of Denver, led end-to-end.' },
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
    </section>
  );
}
