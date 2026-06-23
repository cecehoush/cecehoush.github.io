import { useEffect, useState } from 'react';
import { figmaData, getProjectImages } from '../data/portfolio.js';
import styles from './ProjectModal.module.css';

const figmaBadgeIcon = (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5C7 1.5 4 1.5 4 4.5C4 6 5.5 7 7 7C5.5 7 4 8 4 9.5C4 11.5 5.5 12.5 7 12.5V7M7 1.5C7 1.5 10 1.5 10 4.5C10 6 8.5 7 7 7M7 1.5V7" stroke="#FF9D4D" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="10.5" cy="10.5" r="1.8" stroke="#FF9D4D" strokeWidth="1.2" />
  </svg>
);

const LINK_LABELS = { website: 'Website', github: 'GitHub', linkedin: 'LinkedIn', figma: 'Figma Prototype' };

function resolveImageSrc(src) {
  if (!src) return '';
  if (/^https?:\/\//.test(src) || src.startsWith('/')) return src;
  // Manifest paths look like "figma/<dir>/<file>"; bare names fall back to /project-images/.
  return src.includes('/') ? `/${src}` : `/project-images/${src}`;
}

function getFigmaEmbedUrl(url) {
  if (!url || !/^https:\/\/www\.figma\.com\//.test(url)) return '';
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
}

// General-purpose project modal. The `figma: true` flag on the project data is
// the authoritative switch for the warm Figma panel treatment ("Figma Design"
// badge, orange accents). Figma media comes from SVG screens (figmaData, matched
// by title) and/or an interactive prototype iframe (links.figma). Screenshot
// galleries come from the generated manifest via getProjectImages (a flat array,
// or a { group: [...] } object rendered as labeled rows).
export default function ProjectModal({ project, onClose }) {
  // Keep the last project mounted so content stays visible while fading out.
  const [current, setCurrent] = useState(null);
  const open = !!project;

  useEffect(() => {
    if (project) setCurrent(project);
  }, [project]);

  // Escape to close, and lock body scroll while open.
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isFigma = !!current?.figma;
  const description = current?.longDesc || current?.desc || '';
  const pills = current?.skills || current?.tags || [];
  const links = current?.links || {};
  const linkEntries = Object.entries(links).filter(([, v]) => v);

  // SVG phone screens (Lucent/Lattice/Roadrunner) — looked up by title; figmaData
  // entries passed straight from the home drawer already carry their own screens.
  const screens = current?.screens
    || (isFigma ? figmaData.find((f) => f.title === current?.title)?.screens : null)
    || [];
  const figmaEmbedUrl = getFigmaEmbedUrl(links.figma);

  // Manifest images: flat array or grouped object.
  const imagesData = getProjectImages(current);
  const grouped = imagesData && !Array.isArray(imagesData) ? imagesData : null;
  const flatImages = Array.isArray(imagesData) ? imagesData : [];
  const groupRows = grouped ? Object.entries(grouped).filter(([, imgs]) => imgs.length > 0) : [];
  const hasImages = grouped ? groupRows.length > 0 : flatImages.length > 0;

  const hasMedia = screens.length > 0 || !!figmaEmbedUrl || hasImages;

  return (
    <div className={`${styles.modal} ${open ? styles.open : ''}`}>
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Close project detail"></button>
      <div className={`${styles.panel} ${isFigma ? '' : styles.plain}`}>
        <div className={styles.topbar}>
          <div className={styles.titleWrap}>
            {isFigma ? (
              <div className={styles.badge}>{figmaBadgeIcon} Figma Design</div>
            ) : current?.badge ? (
              <div className={`${styles.badge} ${styles.plain}`}>{current.badge}</div>
            ) : null}
            <div className={styles.projName}>{current?.title ?? '—'}</div>
          </div>
          <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className={styles.body}>
          {current && (
            <>
              {hasMedia && (
                <div className={styles.mediaCol}>
                  {screens.length > 0 && (
                    <div className={styles.screens}>
                      {screens.map((s, i) => (
                        <div
                          className={styles.phoneWrap}
                          key={i}
                          style={{ transform: i === 0 ? 'scale(1)' : 'scale(0.88)' }}
                        >
                          <div className={styles.phone} style={{ opacity: i === 0 ? 1 : 0.72 }}>
                            <div className={styles.phoneNotch}></div>
                            <div className={styles.phoneScreen} dangerouslySetInnerHTML={{ __html: s.svg }}></div>
                            <div className={styles.phoneHome}></div>
                          </div>
                          <div className={styles.phoneLbl}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {figmaEmbedUrl && (
                    <div className={styles.embedWrap}>
                      {/* TODO before deploy: confirm Figma prototype is shared as "anyone with the link can view" or iframe will show login wall */}
                      <div className={styles.phoneFrame}>
                        <div className={styles.phoneNotch}></div>
                        <div className={styles.embedScreen}>
                          <iframe
                            className={styles.embedFrame}
                            src={figmaEmbedUrl}
                            title={`${current.title} Figma prototype`}
                            loading="lazy"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className={styles.phoneHome}></div>
                      </div>
                      <div className={styles.phoneLbl}>Interactive prototype</div>
                    </div>
                  )}
                  {grouped ? (
                    groupRows.map(([label, imgs]) => {
                      // Folders may be number-prefixed for ordering (e.g. "1-mobile");
                      // strip it for the display label so it reads "Mobile".
                      const displayLabel = label.replace(/^\d+-/, '');
                      return (
                        <div key={label} className={styles.imageGroup}>
                          <div className={styles.groupLabel}>{displayLabel}</div>
                          <div className={styles.imageRow}>
                            {imgs.map((src, i) => (
                              <img
                                key={src}
                                className={styles.imageCover}
                                src={resolveImageSrc(src)}
                                alt={`${current.title} ${displayLabel} ${i + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })
                  ) : flatImages.length > 0 ? (
                    <div className={styles.images}>
                      {flatImages.map((src, i) => (
                        <img
                          key={i}
                          className={styles.image}
                          src={resolveImageSrc(src)}
                          alt={`${current.title} screenshot ${i + 1}`}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
              <div className={`${styles.info} ${hasMedia ? '' : styles.infoWide}`}>
                <div>
                  <div className={styles.infoTitle}>{current.title}</div>
                  <div className={`${styles.infoType} ${isFigma ? '' : styles.plain}`}>{current.type}</div>
                </div>
                <div className={styles.infoDesc}>{description}</div>
                {pills.length > 0 && (
                  <div className={styles.tags}>
                    {pills.map((t, i) => (
                      <span className={`${styles.tag} ${isFigma ? '' : styles.plain}`} key={i}>{t}</span>
                    ))}
                  </div>
                )}
                {linkEntries.length > 0 && (
                  <div className={styles.links}>
                    {linkEntries.map(([key, url]) => (
                      <a key={key} className={styles.linkBtn} href={url} target="_blank" rel="noopener noreferrer">
                        {LINK_LABELS[key] || key} ↗
                      </a>
                    ))}
                  </div>
                )}
                {figmaEmbedUrl && (
                  <div className={styles.note}>
                    ↑ Interactive Figma embed inside the site. If the prototype ever fails to load, the Figma link above is the fallback.
                  </div>
                )}
                {screens.length > 0 && (
                  <div className={styles.note}>
                    ↑ Illustrated mockups representing Figma designs. Swap in real exported frames or Figma embeds when building.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
