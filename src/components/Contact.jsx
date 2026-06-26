import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import BubbleField from './BubbleField.jsx';
import styles from './Contact.module.css';

const EMAILJS_SERVICE_ID = 'service_vvpir7f';
const EMAILJS_TEMPLATE_ID = 'template_g5g8xqc';
const EMAILJS_PUBLIC_KEY = 'MLNR7yuIGbcQuyQ1f';

const LINKS = {
  linkedin: 'https://www.linkedin.com/in/cecehoush',
  github: 'https://github.com/cecehoush',
  email: 'mailto:cecehoush@gmail.com',
  resume: '/CeceHoush_Resume.pdf',
};

const MAX = 500;

// Client-side anti-spam cooldown: block resends within 60s of a successful send.
const COOLDOWN_MS = 60000;
const COOLDOWN_KEY = 'cecehoush_contact_last_sent';

function readLastSent() {
  try { return Number(localStorage.getItem(COOLDOWN_KEY)) || 0; } catch { return 0; }
}
function writeLastSent(ts) {
  try { localStorage.setItem(COOLDOWN_KEY, String(ts)); } catch { /* private mode, etc. */ }
}

export default function Contact() {
  const [mode, setMode] = useState('terminal'); // 'terminal' | 'simple'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // '' | 'sending' | 'success' | 'error' | 'limit'
  const [cooldownUntil, setCooldownUntil] = useState(0); // timestamp the cooldown ends
  const [now, setNow] = useState(() => Date.now());

  const termNameRef = useRef(null);
  const simpleNameRef = useRef(null);
  const firstRender = useRef(true);

  // Restore an in-progress cooldown on load, then auto-clear it once it elapses.
  useEffect(() => {
    const until = readLastSent() + COOLDOWN_MS;
    if (until > Date.now()) setCooldownUntil(until);
  }, []);
  useEffect(() => {
    if (!cooldownUntil) return undefined;
    const remaining = cooldownUntil - Date.now();
    if (remaining <= 0) { setCooldownUntil(0); return undefined; }
    const t = setTimeout(() => setCooldownUntil(0), remaining);
    return () => clearTimeout(t);
  }, [cooldownUntil]);

  useEffect(() => {
    if (!cooldownUntil) return undefined;
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [cooldownUntil]);

  const coolingDown = cooldownUntil > Date.now();
  const cooldownRemainingMs = coolingDown ? cooldownUntil - now : 0;
  const cooldownRemainingSeconds = Math.max(1, Math.ceil(cooldownRemainingMs / 1000));
  const cooldownProgress = coolingDown
    ? Math.max(0, Math.min(100, ((COOLDOWN_MS - cooldownRemainingMs) / COOLDOWN_MS) * 100))
    : 0;

  // Move focus to the first field of whichever mode we switch into (but not on
  // initial mount, so we don't steal focus on page load).
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (mode === 'simple') simpleNameRef.current?.focus();
    else termNameRef.current?.focus();
  }, [mode]);

  // Terminal inputs reveal sequentially: each appears once the previous has a value.
  const showEmail = name.trim().length > 0;
  const showMessage = showEmail && email.trim().length > 0;
  const sending = status === 'sending';

  async function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;
    // Re-check storage so a still-active cooldown blocks the send (and refreshes UI).
    const until = readLastSent() + COOLDOWN_MS;
    if (until > Date.now()) { setCooldownUntil(until); return; }
    setStatus('sending');
    try {
      // Template params must match the EmailJS template's variable names.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: name, from_email: email, message },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      const now = Date.now();
      writeLastSent(now);
      setCooldownUntil(now + COOLDOWN_MS);
      setStatus('success');
    } catch (err) {
      // EmailJS rejects with { status, text }; treat 429 / "limit" as quota exhaustion.
      const text = (err?.text || err?.message || '').toLowerCase();
      setStatus(err?.status === 429 || text.includes('limit') ? 'limit' : 'error');
    }
  }

  const statusEl = status === 'success' ? (
    <span
      className={`${styles.status} ${mode === 'terminal' ? styles.statusTerminalOk : styles.statusSimpleOk}`}
      role="status"
    >
      message sent ✦
    </span>
  ) : status === 'limit' ? (
    <span className={`${styles.status} ${styles.statusErr}`} role="status">monthly limit reached — email me directly at cecehoush@gmail.com</span>
  ) : status === 'error' ? (
    <span className={`${styles.status} ${styles.statusErr}`} role="status">something went wrong — try emailing directly</span>
  ) : null;

  const cooldownEl = coolingDown ? (
    <span
      className={`${styles.cooldown} ${mode === 'terminal' ? styles.cooldownTerminal : styles.cooldownSimple}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.cooldownLabel}>cooldown</span>
      <span className={styles.cooldownTime}>{cooldownRemainingSeconds}s</span>
      <span className={styles.cooldownTrack} aria-hidden="true">
        <span className={styles.cooldownFill} style={{ width: `${cooldownProgress}%` }}></span>
      </span>
    </span>
  ) : null;

  const sendButton = (
    <button
      type="submit"
      className={`${styles.send} ${mode === 'terminal' ? styles.sendTerminal : styles.sendSimple}`}
      disabled={sending || coolingDown}
    >
      send <span className={styles.sendArrow} aria-hidden="true">→</span>
      <span className={styles.cursor} aria-hidden="true"></span>
    </button>
  );

  const linksRow = (
    <div className={styles.termLinks}>
      <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">&gt; linkedin</a>
      <span aria-hidden="true">·</span>
      <a href={LINKS.github} target="_blank" rel="noopener noreferrer">&gt; github</a>
      <span aria-hidden="true">·</span>
      <a href={LINKS.email}>&gt; email</a>
      <span aria-hidden="true">·</span>
      <a href={LINKS.resume} target="_blank" rel="noopener noreferrer">&gt; resume</a>
    </div>
  );

  return (
    <>
      <Nav />
      <main className={styles.page}>
        <BubbleField className={styles.canvas} />
        {mode === 'terminal' ? (
          <section className={styles.terminal}>
            <div className={styles.termBar}>
              <div className={styles.dots} aria-hidden="true">
                <span className={styles.dot} style={{ background: '#FF5F57' }}></span>
                <span className={styles.dot} style={{ background: '#FEBC2E' }}></span>
                <span className={styles.dot} style={{ background: '#28C840' }}></span>
              </div>
              <span className={styles.termFile}>contact.sh</span>
              <button
                type="button"
                className={styles.overwhelmed}
                onClick={() => setMode('simple')}
                aria-label="Switch to simple contact form"
              >
                🫧 overwhelmed?
              </button>
            </div>

            <form className={styles.termBody} onSubmit={handleSubmit}>
              <div className={styles.cmd}>~ whoami</div>
              <div className={styles.termOut}>cece housh — hci researcher · flutter dev</div>
              <div className={styles.termSpace}></div>
              <div className={styles.cmd}>~ contact --open</div>
              <div className={styles.termOut}>status: open to opportunities ✦</div>
              <div className={styles.termSpace}></div>
              <div className={styles.cmd}>~ send --message</div>

              <label htmlFor="term-name" className={styles.fieldLbl}>your name:</label>
              <div className={styles.promptRow}>
                <span className={styles.prompt} aria-hidden="true">›</span>
                <input
                  id="term-name"
                  ref={termNameRef}
                  className={styles.termInput}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              {showEmail && (
                <>
                  <label htmlFor="term-email" className={styles.fieldLbl}>your email:</label>
                  <div className={styles.promptRow}>
                    <span className={styles.prompt} aria-hidden="true">›</span>
                    <input
                      id="term-email"
                      type="email"
                      className={styles.termInput}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                </>
              )}

              {showMessage && (
                <>
                  <label htmlFor="term-message" className={styles.fieldLbl}>message:</label>
                  <div className={styles.promptRow}>
                    <span className={styles.prompt} aria-hidden="true">›</span>
                    <input
                      id="term-message"
                      className={styles.termInput}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={MAX}
                    />
                  </div>
                  <div className={styles.sendRow}>
                    {sendButton}
                    {statusEl}
                    {cooldownEl}
                  </div>
                </>
              )}

              {linksRow}
            </form>
          </section>
        ) : (
          <section className={styles.simple}>
            <div className={styles.frost}>
            <div className={styles.simpleLeft}>
              <h1 className={styles.bigHead}>let&apos;s talk.</h1>
              <p className={styles.tagline}>
                Open to research collabs, internship opportunities, and good conversations.
              </p>
            </div>

            <div className={styles.simpleRight}>
              <div className={styles.card}>
              <button
                type="button"
                className={styles.back}
                onClick={() => setMode('terminal')}
                aria-label="Switch back to terminal"
              >
                ← back to terminal
              </button>
              <div className={styles.formLbl}>Send a message</div>
              <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="s-name" className="sr-only">Name</label>
                  <input
                    id="s-name"
                    ref={simpleNameRef}
                    className={styles.field}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                  <label htmlFor="s-email" className="sr-only">Email</label>
                  <input
                    id="s-email"
                    type="email"
                    className={styles.field}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <label htmlFor="s-message" className="sr-only">Message</label>
                  <textarea
                    id="s-message"
                    className={styles.field}
                    placeholder="Message"
                    rows={4}
                    maxLength={MAX}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <div className={styles.charCount}>{message.length} / {MAX}</div>
                  <div className={styles.sendRow}>
                    {sendButton}
                    {statusEl}
                    {cooldownEl}
                  </div>
                </form>
              </div>
            </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
