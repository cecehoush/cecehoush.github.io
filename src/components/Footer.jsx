import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.left}>cecehoush.com · © 2025</div>
      <div className={styles.links}>
        <a href="https://github.com/cecehoush" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/cecehoush" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:cecehoush@gmail.com">Email</a>
      </div>
    </footer>
  );
}
