import { figmaImageManifest } from './generated/figmaManifest.js';

// ── DATA ──
// Verbatim from the design mockup. SVG screen strings are kept exactly as-is
// and rendered via dangerouslySetInnerHTML so the Figma phone frames match.

// `id` is a string slug (used for routing/keys); `desc`, `num`, `title`, `type`,
// `skills`, `lav`, `figma` remain for the home MarqueeBar skill-drawer (the only
// other consumer). `shortDesc`/`longDesc`/`links`/`images`/`badge` power the
// /portfolio page + ProjectModal. Omit link fields that don't apply.
export const projects = [
  {
    id: 'accessible-llm', num: '01', title: 'Accessible LLM Interfaces', type: 'Research · NSF',
    desc: 'Evaluating LLM interfaces for underserved communities.',
    shortDesc: 'NSF-funded research evaluating and designing LLM interfaces that work for underserved and non-technical users.',
    // FLAG: longDesc drafted from the resume Sustainability Hub bullets — review wording.
    longDesc: 'As a Graduate Research Assistant on the NSF-funded Colorado Sustainability Hub, I research accessible and inclusive LLM interfaces — improving usability across technical and non-technical users — and co-author a survey paper on LLM evaluation benchmarks. The work spans UI/UX design in Figma, chatbot interaction models, and machine-learning models that surface sustainability data patterns.',
    skills: ['Accessibility', 'HCI', 'LLM Evaluation', 'AI', 'Research'],
    links: { website: 'https://sustainabilityhub.co' },
    badge: 'NSF',
    lav: false, figma: false,
  },
  {
    id: 'lucent', num: '02', title: 'Lucent', type: 'Hackathon · 1st place',
    desc: 'AI mental wellness app — DU/MSU/CU Denver Hackathon winner.',
    shortDesc: 'AI-driven mental wellness app and 1st-place winner of the DU/MSU/UCD hackathon.',
    // FLAG: resume lists FastAPI / Supabase / GPT-4.1, which aren't in the skills taxonomy
    // (skill tags kept as the existing matched labels for MarqueeBar) — review.
    longDesc: 'Co-developed Lucent, an AI-driven mental wellness app that won 1st place at the DU/MSU/UCD hackathon. Built with Flutter, FastAPI, and Supabase (PostgreSQL), it uses GPT-4.1 for reflective chatbot interactions and features an interactive bonsai tree for daily emotional reflection and user retention. Designed end-to-end in Figma before development.',
    skills: ['Flutter', 'Firebase', 'Figma', 'AI', 'HCI', 'Mobile & Web Dev'],
    links: {},
    badge: '1st place',
    lav: false, figma: true,
  },
  {
    id: 'lattice', num: '03', title: 'Lattice', type: 'Hackathon · 25 hrs',
    desc: 'AI learning path generator with Firebase, MongoDB, Google ADK.',
    shortDesc: 'AI learning-path generator built in ~25 hours with streak tracking and a grid-inspired UI.',
    // FLAG: not on the resume yet — longDesc drafted from the site description; review.
    longDesc: 'Lattice is an AI learning-path generator built in roughly 25 hours, featuring a grid-inspired UI, an onboarding flow, and streak tracking. Built with Flutter, Firebase, MongoDB, and Google ADK, with the full experience mocked in Figma before development.',
    skills: ['Flutter', 'Firebase', 'MongoDB', 'Google ADK', 'Figma', 'AI', 'Mobile & Web Dev'],
    links: {},
    lav: true, figma: true,
  },
  {
    id: 'roadrunner-connect', num: '04', title: 'Roadrunner Connect', type: 'Mobile · Project Lead',
    desc: 'Campus engagement app for the University of Denver.',
    shortDesc: 'Interactive campus engagement app I led end-to-end as Project Lead.',
    longDesc: 'Led Roadrunner Connect, an interactive campus engagement app, as Project Lead. Built the mobile app in Flutter (Dart), the back end with MongoDB/Node.js/Express, and the website in React, with Firebase authentication (Google/iOS), event check-ins, photo/comment uploads, and a rewards system (badges, challenges, giveaways, leaderboards). Ran an Agile team of 5 on two-week sprints and presented updates to 15+ stakeholders.',
    skills: ['Flutter', 'Firebase', 'MongoDB', 'Figma', 'Mobile & Web Dev', 'HCI', 'Project Management'],
    links: { website: 'https://roadrunnerconnect.co' },
    lav: true, figma: true,
  },
  {
    id: 'spiderbyte', num: '05', title: 'SpiderByte', type: 'Hackathon · 2nd place',
    desc: 'Course-aligned coding-challenge website — MLH hackathon 2nd place.',
    shortDesc: 'Course-aligned coding-challenge website and 2nd-place winner of the MLH DU/MSU hackathon.',
    longDesc: 'Co-created SpiderByte, a course-aligned coding-challenge website, during a 28+ hour MLH hackathon — winning 2nd place among 6+ teams. Built with Python, Flask, SQLAlchemy, HTML/CSS, PythonTutor, and CodeMirror.',
    // FLAG: stack (Python/Flask/SQLAlchemy) isn't in the skills taxonomy; tagged 'Mobile & Web Dev' only.
    // Note: adding this to `projects` also surfaces it in the home skill-drawer under 'Mobile & Web Dev'.
    skills: ['Mobile & Web Dev'],
    links: {},
    badge: '2nd place',
    lav: false, figma: false,
  },
  {
    id: 'align', num: '06', title: 'Align', type: 'HCI · Figma · Project Lead',
    desc: 'Community-care app concept designed to support real-world belonging, not more screen time.',
    shortDesc: 'Team-led HCI/Figma project focused on helping people identify their values and needs before joining communities, then supporting sustained real-world engagement.',
    longDesc: 'Align was a Fall 2025 HCI project at the University of Denver centered on social connection and community care. After a class-wide critique and gallery walk, my concept was selected as one of six projects advanced into team development, and I led a team of four through weekly deliverables, user testing, and final presentation. I drove most of the Figma design and prototype wiring, taught teammates Figma workflows, wrote the recurring deliverables, and pushed accessibility throughout the product, including WCAG AA contrast checks, clearer interaction patterns, and more inclusive UX decisions. The final concept helps users reflect on their values, needs, and sense of belonging before searching for communities, then uses careful gamification, event tools, and community matching to encourage offline connection rather than keeping people on their phones.',
    skills: ['Figma', 'HCI', 'Accessibility', 'Research', 'Project Management'],
    links: {
      figma: 'https://www.figma.com/proto/ePgAD4G1wp6b4fWzM0cYMD/Align?node-id=51-6501&p=f&t=wZfrCJtynyH6KwH5-1&scaling=scale-down&content-scaling=fixed&page-id=51%3A5391&starting-point-node-id=51%3A6501',
    },
    // Explicit preview order (overrides the default first-two-from-manifest):
    // landing screen on the left, home screen on the right.
    previewImages: [
      'figma/align/landingscreen.png',
      'figma/align/home-screen.png',
    ],
    lav: false, figma: true,
  },
];

// Project images come from the generated manifest, keyed by the project's id
// slug (hyphens → underscores to match the public/figma/<key> folder names).
// Returns a flat array, a { group: [...] } object for grouped folders, or [].
export function getProjectImages(project) {
  if (!project) return [];
  const key = project.id.replace(/-/g, '_');
  return figmaImageManifest[key] || [];
}

export const skills = [
  { label: 'Accessibility', lav: false, fig: false },
  { label: 'Flutter', lav: false, fig: false }, { label: 'Firebase', lav: false, fig: false },
  { label: 'Figma', lav: false, fig: true }, { label: 'HCI', lav: false, fig: false },
  { label: 'AI', lav: false, fig: false }, { label: 'LLM Evaluation', lav: true, fig: false },
  { label: 'MongoDB', lav: false, fig: false }, { label: 'Mobile & Web Dev', lav: false, fig: false },
  { label: 'Research', lav: true, fig: false }, { label: 'Google ADK', lav: false, fig: false },
  { label: 'Project Management', lav: false, fig: false },
];

export const figmaData = [
  {
    id: 1, num: '02', title: 'Lucent', type: 'Mobile · Flutter',
    desc: 'AI mental wellness app. Mood tracking, journaling, and AI check-ins. Designed end-to-end in Figma before development.',
    tags: ['Mobile', 'Health', 'Figma', 'Flutter'],
    screens: [
      { label: 'Home', svg: `<svg width="116" height="224" viewBox="0 0 116 224" xmlns="http://www.w3.org/2000/svg"><rect width="116" height="224" fill="#0D1020"/><rect x="8" y="10" width="100" height="18" rx="5" fill="#1A1F35"/><circle cx="21" cy="19" r="6" fill="#7B8CDE"/><rect x="33" y="15" width="40" height="4" rx="2" fill="#252B48"/><rect x="78" y="15" width="18" height="4" rx="2" fill="#252B48"/><rect x="8" y="36" width="100" height="56" rx="8" fill="#141828"/><circle cx="58" cy="58" r="16" fill="rgba(123,140,222,0.12)" stroke="#7B8CDE" stroke-width="1"/><text x="58" y="63" text-anchor="middle" fill="#7B8CDE" font-size="14" font-family="sans-serif">✦</text><rect x="16" y="82" width="52" height="4" rx="2" fill="#252B48"/><rect x="16" y="88" width="36" height="3" rx="1.5" fill="#1E2440"/><rect x="8" y="102" width="48" height="44" rx="7" fill="#141828"/><rect x="62" y="102" width="46" height="44" rx="7" fill="#141828"/><rect x="15" y="110" width="30" height="3" rx="1.5" fill="#252B48"/><rect x="15" y="116" width="22" height="10" rx="3" fill="rgba(123,140,222,0.2)"/><rect x="15" y="129" width="26" height="3" rx="1.5" fill="#1A2040"/><rect x="15" y="134" width="18" height="3" rx="1.5" fill="#1A2040"/><rect x="69" y="110" width="30" height="3" rx="1.5" fill="#252B48"/><rect x="69" y="116" width="22" height="10" rx="3" fill="rgba(176,144,224,0.2)"/><rect x="69" y="129" width="26" height="3" rx="1.5" fill="#1A2040"/><rect x="8" y="154" width="100" height="3" rx="1.5" fill="#1A1F35"/><rect x="8" y="164" width="100" height="34" rx="7" fill="#141828"/><rect x="16" y="172" width="62" height="3" rx="1.5" fill="#252B48"/><rect x="16" y="178" width="42" height="3" rx="1.5" fill="#1E2440"/><rect x="84" y="170" width="16" height="16" rx="4" fill="rgba(123,140,222,0.15)"/><rect x="17" y="208" width="18" height="10" rx="3" fill="#1E2440"/><rect x="43" y="208" width="18" height="10" rx="3" fill="rgba(123,140,222,0.22)"/><rect x="69" y="208" width="18" height="10" rx="3" fill="#1E2440"/><rect x="90" y="208" width="18" height="10" rx="3" fill="#1E2440"/></svg>` },
      { label: 'Journal', svg: `<svg width="116" height="224" viewBox="0 0 116 224" xmlns="http://www.w3.org/2000/svg"><rect width="116" height="224" fill="#0D1020"/><rect x="8" y="10" width="62" height="6" rx="3" fill="#252B48"/><rect x="8" y="20" width="42" height="4" rx="2" fill="#1A1F35"/><rect x="8" y="32" width="100" height="52" rx="8" fill="#141828" stroke="rgba(123,140,222,0.18)" stroke-width="0.5"/><rect x="16" y="42" width="84" height="3" rx="1.5" fill="#252B48"/><rect x="16" y="48" width="72" height="3" rx="1.5" fill="#1A2040"/><rect x="16" y="54" width="77" height="3" rx="1.5" fill="#1A2040"/><rect x="16" y="60" width="57" height="3" rx="1.5" fill="#1A2040"/><rect x="16" y="70" width="32" height="9" rx="3" fill="rgba(123,140,222,0.28)"/><rect x="8" y="94" width="100" height="1" rx="0.5" fill="#1A1F35"/><rect x="8" y="102" width="47" height="6" rx="3" fill="#252B48"/><rect x="8" y="115" width="100" height="30" rx="6" fill="#141828"/><circle cx="23" cy="130" r="9" fill="rgba(176,144,224,0.14)"/><rect x="38" y="123" width="52" height="3" rx="1.5" fill="#252B48"/><rect x="38" y="130" width="40" height="3" rx="1.5" fill="#1A2040"/><rect x="38" y="137" width="30" height="3" rx="1.5" fill="#1A2040"/><rect x="8" y="151" width="100" height="30" rx="6" fill="#141828"/><circle cx="23" cy="166" r="9" fill="rgba(123,140,222,0.14)"/><rect x="38" y="159" width="52" height="3" rx="1.5" fill="#252B48"/><rect x="38" y="166" width="40" height="3" rx="1.5" fill="#1A2040"/><rect x="38" y="173" width="30" height="3" rx="1.5" fill="#1A2040"/><rect x="23" y="195" width="70" height="22" rx="7" fill="#7B8CDE"/><rect x="46" y="203" width="28" height="4" rx="2" fill="rgba(255,255,255,0.72)"/></svg>` }
    ]
  },
  {
    id: 2, num: '03', title: 'Lattice', type: 'Mobile · Flutter',
    desc: 'AI learning path generator. Grid-inspired UI, onboarding flow, and streaks — all mocked in Figma before development.',
    tags: ['Mobile', 'Education', 'Figma', 'Flutter'],
    screens: [
      { label: 'Onboarding', svg: `<svg width="116" height="224" viewBox="0 0 116 224" xmlns="http://www.w3.org/2000/svg"><rect width="116" height="224" fill="#080C10"/><defs><pattern id="g" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M14 0L0 0 0 14" fill="none" stroke="rgba(106,174,224,0.07)" stroke-width="0.5"/></pattern></defs><rect width="116" height="224" fill="url(#g)"/><circle cx="58" cy="54" r="24" fill="rgba(106,174,224,0.07)" stroke="rgba(106,174,224,0.28)" stroke-width="1"/><circle cx="58" cy="54" r="13" fill="rgba(106,174,224,0.1)" stroke="#6AAEE0" stroke-width="1"/><line x1="49" y1="54" x2="67" y2="54" stroke="#6AAEE0" stroke-width="1.5" stroke-linecap="round"/><line x1="58" y1="45" x2="58" y2="63" stroke="#6AAEE0" stroke-width="1.5" stroke-linecap="round"/><line x1="49" y1="45" x2="67" y2="63" stroke="rgba(106,174,224,0.38)" stroke-width="0.8"/><line x1="67" y1="45" x2="49" y2="63" stroke="rgba(106,174,224,0.38)" stroke-width="0.8"/><rect x="25" y="86" width="66" height="7" rx="3.5" fill="#1A2535"/><rect x="33" y="88" width="36" height="3" rx="1.5" fill="#6AAEE0"/><rect x="21" y="99" width="74" height="5" rx="2.5" fill="#1A2535"/><rect x="21" y="107" width="74" height="5" rx="2.5" fill="#1A2535"/><rect x="8" y="120" width="100" height="24" rx="6" fill="#0E1825" stroke="rgba(106,174,224,0.18)" stroke-width="0.5"/><rect x="16" y="128" width="57" height="3" rx="1.5" fill="#1A2535"/><rect x="77" y="126" width="14" height="8" rx="3" fill="rgba(106,174,224,0.28)"/><rect x="8" y="150" width="100" height="24" rx="6" fill="#0E1825" stroke="rgba(106,174,224,0.18)" stroke-width="0.5"/><rect x="16" y="158" width="47" height="3" rx="1.5" fill="#1A2535"/><rect x="77" y="156" width="14" height="8" rx="3" fill="rgba(106,174,224,0.12)"/><rect x="15" y="184" width="86" height="24" rx="7" fill="#6AAEE0"/><rect x="39" y="193" width="38" height="4" rx="2" fill="rgba(255,255,255,0.8)"/></svg>` },
      { label: 'Path', svg: `<svg width="116" height="224" viewBox="0 0 116 224" xmlns="http://www.w3.org/2000/svg"><rect width="116" height="224" fill="#080C10"/><rect x="8" y="10" width="62" height="5" rx="2.5" fill="#1A2535"/><rect x="8" y="18" width="42" height="3" rx="1.5" fill="#0E1825"/><rect x="8" y="30" width="100" height="40" rx="8" fill="#0E1825" stroke="rgba(106,174,224,0.22)" stroke-width="0.5"/><rect x="16" y="40" width="50" height="3" rx="1.5" fill="#6AAEE0"/><rect x="16" y="46" width="72" height="3" rx="1.5" fill="#1A2535"/><rect x="16" y="52" width="57" height="3" rx="1.5" fill="#1A2535"/><rect x="16" y="58" width="24" height="7" rx="3" fill="rgba(106,174,224,0.18)" stroke="rgba(106,174,224,0.38)" stroke-width="0.5"/><line x1="23" y1="77" x2="23" y2="86" stroke="rgba(106,174,224,0.28)" stroke-width="1" stroke-dasharray="2,2"/><circle cx="23" cy="86" r="5" fill="rgba(106,174,224,0.2)" stroke="#6AAEE0" stroke-width="1"/><rect x="35" y="81" width="72" height="19" rx="5" fill="#0E1825" stroke="rgba(106,174,224,0.14)" stroke-width="0.5"/><rect x="41" y="87" width="47" height="3" rx="1.5" fill="#1A2535"/><rect x="41" y="93" width="32" height="2" rx="1" fill="#0A1220"/><line x1="23" y1="104" x2="23" y2="113" stroke="rgba(106,174,224,0.18)" stroke-width="1" stroke-dasharray="2,2"/><circle cx="23" cy="113" r="5" fill="rgba(106,174,224,0.09)" stroke="rgba(106,174,224,0.38)" stroke-width="1"/><rect x="35" y="108" width="72" height="19" rx="5" fill="#0E1825" stroke="rgba(106,174,224,0.09)" stroke-width="0.5"/><rect x="41" y="114" width="47" height="3" rx="1.5" fill="#1A2535"/><rect x="41" y="120" width="32" height="2" rx="1" fill="#0A1220"/><line x1="23" y1="131" x2="23" y2="140" stroke="rgba(106,174,224,0.08)" stroke-width="1" stroke-dasharray="2,2"/><circle cx="23" cy="140" r="5" fill="rgba(106,174,224,0.04)" stroke="rgba(106,174,224,0.18)" stroke-width="0.5"/><rect x="35" y="135" width="72" height="19" rx="5" fill="#0A1220" stroke="rgba(106,174,224,0.05)" stroke-width="0.5"/><rect x="41" y="141" width="47" height="3" rx="1.5" fill="#0E1825"/><rect x="8" y="168" width="100" height="40" rx="8" fill="#0E1825"/><rect x="16" y="177" width="37" height="3" rx="1.5" fill="#1A2535"/><rect x="16" y="184" width="82" height="3" rx="1.5" fill="#0A1220"/><rect x="16" y="190" width="62" height="3" rx="1.5" fill="#0A1220"/><rect x="16" y="198" width="42" height="7" rx="3" fill="rgba(106,174,224,0.22)"/></svg>` }
    ]
  },
  {
    /* TODO: remove SVG mockups once real screenshots are added to public/figma/roadrunner_connect/ */
    id: 3, num: '04', title: 'Roadrunner Connect', type: 'Mobile · Campus App',
    desc: 'Campus engagement app — events, clubs, and student profiles. Multiple Figma iteration rounds before development.',
    tags: ['Mobile', 'Social', 'Figma', 'Flutter'],
    screens: [
      { label: 'Events', svg: `<svg width="116" height="224" viewBox="0 0 116 224" xmlns="http://www.w3.org/2000/svg"><rect width="116" height="224" fill="#080A0F"/><rect x="0" y="0" width="116" height="38" fill="#0D1118"/><circle cx="21" cy="19" r="10" fill="rgba(220,60,60,0.14)" stroke="rgba(220,60,60,0.38)" stroke-width="0.8"/><rect x="37" y="15" width="44" height="4" rx="2" fill="#1A1E28"/><rect x="86" y="13" width="22" height="11" rx="3" fill="rgba(220,60,60,0.18)"/><rect x="8" y="46" width="100" height="50" rx="7" fill="rgba(220,60,60,0.05)" stroke="rgba(220,60,60,0.14)" stroke-width="0.5"/><rect x="16" y="56" width="57" height="5" rx="2.5" fill="#1E2535"/><rect x="16" y="64" width="42" height="3" rx="1.5" fill="#151B25"/><rect x="16" y="70" width="72" height="3" rx="1.5" fill="#151B25"/><rect x="16" y="77" width="30" height="9" rx="3" fill="rgba(220,60,60,0.2)"/><rect x="8" y="104" width="48" height="44" rx="7" fill="#0D1118" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/><rect x="62" y="104" width="46" height="44" rx="7" fill="#0D1118" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/><rect x="15" y="111" width="29" height="16" rx="3" fill="#151B25"/><rect x="15" y="130" width="37" height="3" rx="1.5" fill="#1E2535"/><rect x="15" y="136" width="24" height="3" rx="1.5" fill="#151B25"/><rect x="68" y="111" width="29" height="16" rx="3" fill="#151B25"/><rect x="68" y="130" width="37" height="3" rx="1.5" fill="#1E2535"/><rect x="68" y="136" width="24" height="3" rx="1.5" fill="#151B25"/><rect x="8" y="156" width="100" height="28" rx="6" fill="#0D1118" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/><rect x="16" y="163" width="57" height="3" rx="1.5" fill="#1E2535"/><rect x="16" y="170" width="42" height="3" rx="1.5" fill="#151B25"/><rect x="84" y="160" width="17" height="13" rx="3" fill="rgba(220,60,60,0.14)"/><rect x="0" y="200" width="116" height="24" fill="#0D1118"/><rect x="19" y="208" width="15" height="9" rx="2" fill="#1E2535"/><rect x="43" y="208" width="15" height="9" rx="2" fill="rgba(220,60,60,0.24)"/><rect x="67" y="208" width="15" height="9" rx="2" fill="#1E2535"/><rect x="91" y="208" width="15" height="9" rx="2" fill="#1E2535"/></svg>` },
      { label: 'Profile', svg: `<svg width="116" height="224" viewBox="0 0 116 224" xmlns="http://www.w3.org/2000/svg"><rect width="116" height="224" fill="#080A0F"/><rect x="0" y="0" width="116" height="72" fill="#0D1118"/><circle cx="58" cy="40" r="21" fill="#151B25" stroke="rgba(220,60,60,0.28)" stroke-width="1"/><circle cx="58" cy="33" r="9" fill="#1E2535"/><ellipse cx="58" cy="53" rx="14" ry="8" fill="#1E2535"/><rect x="34" y="68" width="48" height="4" rx="2" fill="#1E2535"/><rect x="8" y="82" width="100" height="20" rx="5" fill="#0D1118" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/><rect x="16" y="90" width="30" height="3" rx="1.5" fill="#1E2535"/><rect x="16" y="96" width="22" height="3" rx="1.5" fill="#151B25"/><rect x="72" y="88" width="28" height="3" rx="1.5" fill="#1E2535"/><rect x="72" y="94" width="20" height="3" rx="1.5" fill="#151B25"/><rect x="8" y="110" width="100" height="1" rx="0.5" fill="#151B25"/><rect x="8" y="118" width="100" height="24" rx="5" fill="#0D1118" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/><rect x="16" y="127" width="57" height="3" rx="1.5" fill="#1E2535"/><rect x="90" y="124" width="10" height="8" rx="2" fill="#151B25"/><rect x="8" y="148" width="100" height="24" rx="5" fill="#0D1118" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/><rect x="16" y="157" width="47" height="3" rx="1.5" fill="#1E2535"/><rect x="90" y="154" width="10" height="8" rx="2" fill="#151B25"/><rect x="8" y="178" width="100" height="24" rx="5" fill="#0D1118" stroke="rgba(220,60,60,0.1)" stroke-width="0.5"/><rect x="16" y="187" width="47" height="3" rx="1.5" fill="#1E2535"/><rect x="90" y="184" width="10" height="8" rx="2" fill="rgba(220,60,60,0.18)"/></svg>` }
    ]
  }
];

// ── WORK EXPERIENCE ── (reverse-chronological by start date)
export const workExperience = [
  {
    id: 'gra-sustainability',
    dateRange: 'Sep 2025 – May 2026',
    title: 'Graduate Research Assistant',
    org: 'Colorado Sustainability Hub · University of Denver',
    location: 'Denver, CO',
    bullets: [
      'Contributing to the NSF-funded Sustainability Hub, an interdisciplinary initiative advancing sustainable data access, visualization, and inclusive AI interaction design.',
      'Designing UI/UX systems, visual assets, and chatbot interaction models in Figma to boost public engagement and data understanding.',
      'Co-authoring a survey paper on LLM evaluation benchmarks and conducting independent research on accessible, inclusive LLM interfaces across technical and non-technical users.',
      'Developing machine-learning models to surface sustainability data patterns, collaborating with 10+ researchers in an Agile environment.',
    ],
    skills: ['Figma', 'Accessibility', 'LLM Evaluation', 'AI', 'Research', 'HCI'],
    links: { website: 'https://sustainabilityhub.co' },
  },
  {
    id: 'roadrunner-lead',
    dateRange: 'Jun 2024 – Jul 2025',
    title: 'Full-Stack Mobile App Development Intern & Project Lead',
    org: 'MSU Denver',
    location: 'Denver, CO',
    bullets: [
      'Led "Roadrunner Connect," an interactive campus engagement app — Flutter (Dart) mobile app, MongoDB/Node.js/Express back end, and a React website.',
      'Integrated Firebase authentication (Google/iOS), Gravatar team profiles, and optimized API calls by indexing queries.',
      'Implemented event check-ins, photo/comment uploads, and a rewards system (badges, challenges, giveaways, leaderboards).',
      'Ran an Agile team of 5 on two-week sprints — task distribution and tracking via ZenHub, daily standups, team OKRs, and Git/GitHub.',
      'Presented updates to 15+ stakeholders, created Qualtrics surveys, and deployed to the app stores.',
    ],
    skills: ['Flutter', 'Firebase', 'MongoDB', 'Mobile & Web Dev', 'Project Management', 'HCI'],
    links: { website: 'https://roadrunnerconnect.co' },
  },
  {
    id: 'learning-assistant',
    dateRange: 'Jan 2024 – Dec 2024',
    title: 'Learning Assistant — Discrete Structures & Computer Science 1',
    org: 'MSU Denver',
    location: 'Denver, CO',
    bullets: [
      'Tutored 60+ students across CS and math; one-on-one sessions for 20+ students raised exam scores by 12%.',
      'Held 10+ office hours weekly, reducing assignment issues and late submissions by 20%.',
    ],
    skills: [],
    links: {},
  },
  {
    id: 'ura-sustainability',
    dateRange: 'Sep 2023 – Jun 2024',
    title: 'Undergraduate Research Assistant',
    org: 'Colorado Sustainability Hub · MSU Denver',
    location: 'Denver, CO',
    // FLAG: the resume lists the Sustainability Hub bullets once across both the GRA and URA
    // roles; the role-specific split is approximate — review.
    bullets: [
      'Earlier research role at the Sustainability Hub (later continued as a Graduate Research Assistant), contributing to inclusive AI interaction design and sustainability data work.',
    ],
    skills: ['Research', 'AI'],
    links: { website: 'https://sustainabilityhub.co' },
  },
  {
    id: 'gamestop-asl',
    dateRange: 'Apr 2023 – Jun 2024',
    title: 'Assistant Store Leader (ASL)',
    org: 'GameStop Inc.',
    location: 'Aurora / Denver, CO',
    bullets: [
      'Led store operations — P&L management, scheduling, and loss prevention.',
      'Consistently ranked at the top of the district in sales performance and KPI metrics.',
    ],
    skills: ['Project Management'],
    links: {},
  },
];

// ── EDUCATION ──
export const education = [
  {
    id: 'phd-du',
    dateRange: 'Sep 2025 – May 2026',
    degree: 'Doctor of Philosophy',
    field: 'Computer Science',
    school: 'University of Denver',
    gpa: '4.0',
    note: 'Chose to transition from doctoral research to industry to apply graduate-level research in real-world product development — with the full support of my advisor.',
  },
  {
    id: 'bs-msu',
    dateRange: 'Jan 2022 – Dec 2024',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    school: 'Metropolitan State University of Denver',
    gpa: '3.7',
    // FLAG: coursework/activities note drafted from the resume — review.
    note: 'Coursework across data structures & algorithms, discrete structures, and full-stack development. Served as a Learning Assistant for Discrete Structures & CS 1, competed in hackathons (2nd place, MLH DU/MSU), and began research at the Colorado Sustainability Hub during the program.',
  },
];

// ── CERTIFICATIONS ──
export const certifications = [
  { id: 'nvidia-dl', name: 'Fundamentals of Deep Learning', issuer: 'NVIDIA', date: 'Dec 2023' },
  // FLAG: issuer not stated on the resume — placeholder, review.
  { id: 'sql-competition', name: 'SQL Competition Winner', issuer: 'MSU Denver', date: 'Apr 2024' },
  // FLAG: independent study (listed under "Studies"), not a formal certificate; issuer assumed MSU Denver — review.
  { id: 'dl-edu-content', name: 'Deep Learning for Generating Educational Content (Independent Study)', issuer: 'MSU Denver', date: 'Aug 2024 – Dec 2024' },
];
