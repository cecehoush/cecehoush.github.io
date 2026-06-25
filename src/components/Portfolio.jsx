import { useState, useEffect, useMemo } from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import ProjectModal from './ProjectModal.jsx';
import { projects, workExperience, education, certifications, getProjectImages } from '../data/portfolio.js';
import styles from './Portfolio.module.css';

const TABS = [
  { key: 'projects', label: 'Projects' },
  { key: 'work', label: 'Work Experience' },
  { key: 'education', label: 'Education' },
  { key: 'certs', label: 'Certifications' },
];

const LINK_LABELS = { website: 'Website', github: 'GitHub', linkedin: 'LinkedIn', figma: 'Figma Prototype' };

function activeLinks(links) {
  return Object.entries(links || {}).filter(([, v]) => v);
}

function resolveImageSrc(src) {
  if (!src) return '';
  if (/^https?:\/\//.test(src) || src.startsWith('/')) return src;
  return src.includes('/') ? `/${src}` : `/portfolio/${src}`;
}

// Preview thumbnails. An explicit `previewImages` on the project wins (e.g. to
// pin a specific left/right pair). Otherwise: up to 2 for a flat folder, or the
// first image from each of the first two non-empty groups for a grouped folder.
// Empty → none.
function getPreviewImages(project) {
  if (!project) return [];
  if (Array.isArray(project.previewImages) && project.previewImages.length > 0) {
    return project.previewImages.slice(0, 2);
  }
  const data = getProjectImages(project);
  if (Array.isArray(data)) return data.slice(0, 2);
  if (data) {
    return Object.values(data).filter((arr) => arr.length > 0).slice(0, 2).map((arr) => arr[0]);
  }
  return [];
}

function TimelineEntry({ open, onToggle, expandable, header, children }) {
  return (
    <div className={`${styles.tlEntry} ${open ? styles.tlOpen : ''}`}>
      <span className={styles.tlDot} aria-hidden="true"></span>
      {expandable ? (
        <>
          <button type="button" className={styles.tlHeader} onClick={onToggle} aria-expanded={open}>
            {header}
            <span className={styles.tlChevron} aria-hidden="true">⌄</span>
          </button>
          <div className={styles.tlBody}>{children}</div>
        </>
      ) : (
        <div className={styles.tlHeaderStatic}>{header}</div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? null);
  const [modalProject, setModalProject] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const [openWork, setOpenWork] = useState(null);
  const [openEdu, setOpenEdu] = useState(null);

  // Back-to-top visibility after 200px of scroll.
  useEffect(() => {
    function onScroll() { setShowTop(window.scrollY > 200); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      [p.title, p.shortDesc, p.type, ...(p.skills || [])].join(' ').toLowerCase().includes(q)
    );
  }, [query]);

  // Derived so the preview auto-follows the filter: the user's pick if it's
  // still in the list, otherwise the first result.
  const selected = filtered.find((p) => p.id === selectedId) || filtered[0] || null;
  const selectedImages = getPreviewImages(selected);
  const selectedLinks = selected ? activeLinks(selected.links) : [];

  return (
    <>
      <Nav />
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>Portfolio</div>
          <p className={styles.intro}>Projects, experience, and the work behind them.</p>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="Portfolio sections">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={activeTab === t.key}
              className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'projects' && (
            <div>
              <input
                type="search"
                className={styles.search}
                placeholder="Search projects…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search projects"
              />
              {filtered.length === 0 ? (
                <div className={styles.empty}>No projects match.</div>
              ) : (
                <div className={styles.spotlight}>
                  <ol className={styles.projList}>
                    {filtered.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          className={`${styles.projRow} ${selected?.id === p.id ? styles.projRowActive : ''}`}
                          onClick={() => setSelectedId(p.id)}
                        >
                          <span className={styles.projNum}>{p.num}</span>
                          <span className={styles.projRowMain}>
                            <span className={styles.projRowTitle}>{p.title}</span>
                            <span className={styles.projRowMeta}>{p.type}</span>
                          </span>
                          {p.badge && <span className={styles.badge}>{p.badge}</span>}
                        </button>
                      </li>
                    ))}
                  </ol>

                  {selected && (
                    <div className={styles.preview}>
                      <div className={styles.previewTitle}>{selected.title}</div>
                      {selectedImages.length > 0 && (
                        <div className={styles.previewMedia}>
                          {selectedImages.slice(0, 2).map((src, i) => (
                            <img
                              key={src}
                              className={styles.previewImg}
                              src={resolveImageSrc(src)}
                              alt={`${selected.title} preview ${i + 1}`}
                            />
                          ))}
                        </div>
                      )}
                      <p className={styles.previewDesc}>{selected.shortDesc}</p>
                      {selected.skills?.length > 0 && (
                        <div className={styles.tags}>
                          {selected.skills.map((s) => (
                            <span key={s} className={styles.tag}>{s}</span>
                          ))}
                        </div>
                      )}
                      {selectedLinks.length > 0 && (
                        <div className={styles.linkRow}>
                          {selectedLinks.map(([k, url]) => (
                            <a key={k} className={styles.linkPill} href={url} target="_blank" rel="noopener noreferrer">
                              {LINK_LABELS[k] || k} ↗
                            </a>
                          ))}
                        </div>
                      )}
                      <button
                        type="button"
                        className={styles.detailBtn}
                        onClick={() => setModalProject(selected)}
                      >
                        Open full detail ↗
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'work' && (
            <div className={styles.timeline}>
              {workExperience.map((w) => (
                <TimelineEntry
                  key={w.id}
                  expandable
                  open={openWork === w.id}
                  onToggle={() => setOpenWork(openWork === w.id ? null : w.id)}
                  header={
                    <span className={styles.tlHeadInner}>
                      <span className={styles.tlDate}>{w.dateRange}</span>
                      <span className={styles.tlTitle}>{w.title}</span>
                      <span className={styles.tlOrg}>{w.org}{w.location ? ` · ${w.location}` : ''}</span>
                    </span>
                  }
                >
                  <ul className={styles.bullets}>
                    {w.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  {w.skills?.length > 0 && (
                    <div className={styles.tags}>
                      {w.skills.map((s) => <span key={s} className={styles.tag}>{s}</span>)}
                    </div>
                  )}
                  {w.links?.website && (
                    <div className={styles.linkRow}>
                      <a className={styles.linkPill} href={w.links.website} target="_blank" rel="noopener noreferrer">
                        Website ↗
                      </a>
                    </div>
                  )}
                </TimelineEntry>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className={styles.timeline}>
              {education.map((ed) => (
                <TimelineEntry
                  key={ed.id}
                  expandable={!!ed.note}
                  open={openEdu === ed.id}
                  onToggle={() => setOpenEdu(openEdu === ed.id ? null : ed.id)}
                  header={
                    <span className={styles.tlHeadInner}>
                      <span className={styles.tlDate}>{ed.dateRange}</span>
                      <span className={styles.tlTitle}>{ed.degree} · {ed.field}</span>
                      <span className={styles.tlOrg}>
                        {ed.school}{ed.gpa ? <span className={styles.gpa}> · GPA {ed.gpa}</span> : null}
                      </span>
                    </span>
                  }
                >
                  {ed.note && <p className={styles.eduNote}>{ed.note}</p>}
                </TimelineEntry>
              ))}
            </div>
          )}

          {activeTab === 'certs' && (
            <ul className={styles.certList}>
              {certifications.map((c) => (
                <li key={c.id} className={styles.certItem}>
                  <span className={styles.certName}>{c.name}</span>
                  <span className={styles.certMeta}>{c.issuer} · {c.date}</span>
                </li>
              ))}
              {/* GHOST placeholder — REMOVE before deployment. */}
              <li className={`${styles.certItem} ${styles.certGhost}`} aria-hidden="true">
                <span className={styles.certName}>More to come…</span>
                <span className={styles.certMeta}>placeholder</span>
              </li>
            </ul>
          )}
        </div>
      </main>
      <Footer />

      {showTop && (
        <button
          type="button"
          className={styles.backTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </>
  );
}
