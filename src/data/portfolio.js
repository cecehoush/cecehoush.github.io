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
    shortDesc: 'Full-stack campus engagement app built for and now owned by MSU Denver, combining interactive maps, gamified rewards, and social features. Led end-to-end as Project Lead and Scrum Master, from initial design through public App Store launch.',
    longDesc: `Roadrunner Connect is a student-built mobile app helping the MSU Denver and broader Denver community discover campus events, check in, earn rewards, and connect with each other. I joined as an intern and grew into the Project Lead and Scrum Master role, overseeing a team of 5 through two-week Agile sprints using ZenHub, daily standups, and OKR tracking. My design concept was selected by stakeholders as the base design the team built from.\n\nI led UI/UX in Figma and built the Flutter mobile frontend and React website, collaborating on the Node.js and MongoDB backend hosted on AWS. Integrations include Google Maps API, Firebase for authentication, Gravatar for team profiles, and a Python-based calendar parser pulling events from multiple MSU Denver and Auraria campus sources including Trumba and Roadrunner Link.\n\nKey features include event check-ins, photo and comment uploads, a feather-based rewards system with a confetti animation, leaderboards, giveaways, badges with earned animations, map and list and calendar views, a social friends system, and a comprehensive admin panel for managing users, events, and placemarks. The admin map tool lets administrators trace building outlines by physically walking the campus, encouraging community presence while keeping the map up to date as campus changes.\n\nI implemented light and dark mode with accessibility standards appropriate for a government-affiliated institution.\n\nI handled marketing through Canva including posters, flyers, and merch, documented progress in SharePoint and GitHub READMEs, and conducted beta launches and user testing sessions with iterative feedback cycles via Qualtrics. Getting approvals through school officials and stakeholders was a regular part of the process, covering branding guidelines, mascot use, and app store compliance. I coordinated a photoshoot with Rowdy, the school mascot, and designed the peeking Rowdy cutout used throughout the app.\n\nEvents presented at or tabled: women's volleyball and men's basketball booths with QR code advertising, Undergraduate Research Conference, Faculty Research Symposium, Presidents Cabinet, CS Advisory Board, CS Community Hours, and an OER Celebration.\n\n*The app is now officially owned by MSU Denver. Because of this, the GitHub repository and internal Figma designs are not publicly shareable, but the live app and its website are available below.*`,
    skills: ['Flutter', 'Firebase', 'MongoDB', 'Figma', 'React', 'Node.js', 'Python', 'Google Maps API', 'AWS', 'Git/GitHub', 'ZenHub', 'Agile', 'Scrum', 'Mobile & Web Dev', 'Project Management', 'HCI', 'Accessibility', 'UI/UX Design', 'User Testing', 'Canva', 'Qualtrics', 'SharePoint', 'Documentation', 'Stakeholder Communication', 'Marketing', 'Public Speaking', 'Community Outreach', 'App Store Deployment'],
    links: { website: 'https://roadrunnerconnect.co' },
    badge: 'Project Lead',
    // Explicit preview order: Cece & Kade on the left, community hour audience on the right.
    previewImages: [
      'figma/roadrunner_connect/community_hour_cece_and_kade.jpg',
      'figma/roadrunner_connect/community_hour_1_audience.jpg',
    ],
    lav: true, figma: false,
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
  },
  {
    id: 2, num: '03', title: 'Lattice', type: 'Mobile · Flutter',
    desc: 'AI learning path generator. Grid-inspired UI, onboarding flow, and streaks — all mocked in Figma before development.',
    tags: ['Mobile', 'Education', 'Figma', 'Flutter'],
  },
  {
    id: 3, num: '04', title: 'Roadrunner Connect', type: 'Mobile · Campus App',
    desc: 'Campus engagement app — events, clubs, and student profiles. Multiple Figma iteration rounds before development.',
    tags: ['Mobile', 'Social', 'Figma', 'Flutter'],
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
      'Returned to the same NSF-funded Sustainability Hub project through the University of Denver after starting graduate school there — an interdisciplinary initiative advancing sustainable data access, visualization, and inclusive AI interaction design.',
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
      'Joined as a summer intern on a five-person team building "Roadrunner Connect," a campus engagement mobile app, and was one of two interns selected to continue full-time after the internship concluded — stepping into the Project Lead and Scrum Master role and driving two-week Agile sprints with task tracking via ZenHub, daily standups, and team OKRs.',
      'Pitched the design concept that stakeholders selected as the base design the team built the app from.',
      'Built the Flutter (Dart) mobile frontend and React website, owning UI/UX design in Figma from concept to launch.',
      'Developed the Node.js/Express and MongoDB backend on AWS, indexing queries to optimize API performance.',
      'Integrated the Google Maps API and built a custom admin panel to manage users, events, and placemarks — including a walk-to-trace tool that lets admins outline campus buildings on foot to keep the map current.',
      'Implemented Firebase authentication (Google/iOS) and Gravatar-based team profiles.',
      'Engineered a Python calendar parser aggregating events from multiple MSU Denver and Auraria sources, including Trumba and Roadrunner Link.',
      'Shipped a feather-based rewards system with confetti animations, badges, leaderboards, giveaways, and a social friends system, alongside event check-ins and photo/comment uploads.',
      'Implemented light and dark mode meeting accessibility standards appropriate for a government-affiliated institution.',
      'Drove marketing through Canva — posters, flyers, and merch — and ran beta launches with iterative Qualtrics user-testing and feedback cycles.',
      'Managed stakeholder communication and approval processes spanning branding guidelines, mascot use, and App Store compliance.',
      'Coordinated a photoshoot with Rowdy, the school mascot, and designed the peeking Rowdy cutout used throughout the app.',
      'Presented and tabled at the Undergraduate Research Conference, Faculty Research Symposium, Presidents Cabinet, CS Advisory Board, CS Community Hours, and athletics booths with QR-code advertising.',
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
    bullets: [
      'Earlier research role at the NSF-funded Sustainability Hub, contributing to inclusive AI interaction design and sustainability data work; concluded when I transitioned to the Roadrunner Connect project.',
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
