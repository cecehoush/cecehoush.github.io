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
    id: 'lucent', num: '01', title: 'Lucent', type: 'Hackathon · 1st place',
    dateRange: 'Apr 2025',
    desc: 'AI mental wellness app — DU/MSU/CU Denver Hackathon winner.',
    shortDesc: 'AI-driven mental wellness app and 1st-place winner of the DU/MSU/UCD hackathon.',
    longDesc: `Lucent is an AI-powered mental wellness app built for college students, faculty, staff, and alumni — designed as a low-friction first step toward emotional support rather than a replacement for professional care. Built by a team of 6 in 26 continuous hours, winning 1st place at the DU/MSU Denver/CU Denver Hackathon in April 2025.\n\nThe core experience is a reflective listening chatbot powered by GPT-4.1, grounded in a Rutgers University study showing GPT-4 reflections are comparable to trained human therapists in specificity, appropriateness, and engagement. Rather than giving advice, the chatbot restates and explores the user's emotions — guiding them toward understanding and, when relevant, connecting them to campus-specific resources like counseling, legal aid, financial advisors, disability services, and recovery programs.\n\nWellness is tracked across 7 dimensions: Emotional, Spiritual, Social, Creative, Environmental, Physical, and Financial. Daily check-ins grow a bonsai tree — each completed day adds a new leaf, missed days leave an empty one. The streak mechanic was designed to build consistent emotional reflection habits without punishing users for missing days.\n\nBuilt with Flutter for the mobile frontend, FastAPI for the backend, Supabase/PostgreSQL for the database, and GPT-4.1 via the OpenAI API. During the hackathon, I personally taught teammates Git, terminal workflows, and Flutter in real time — the team prioritized shared learning alongside shipping.`,
    skills: ['Flutter', 'Firebase', 'Figma', 'AI', 'HCI', 'Mobile & Web Dev'],
    links: {},
    badge: '1st place',
    lav: false, figma: true,
  },
  {
    id: 'lattice', num: '02', title: 'Lattice', type: 'Hackathon · 25 hrs',
    dateRange: 'Apr 2025',
    desc: 'AI learning path generator with Firebase, MongoDB, Google ADK.',
    shortDesc: 'AI learning-path generator built in ~25 hours with streak tracking and a grid-inspired UI.',
    longDesc: `Lattice is an AI-powered learning path generator built at BlasterHacks (Colorado School of Mines) in approximately 25 hours by a team of 4. The core insight: generic learning plans from apps or chatbots don't adapt to a person's actual skill level, time constraints, or budget — and users lose progress when life gets in the way. Lattice solves both problems.\n\nAn LLM agent built on Google's Agent Development Kit, with GPT-4.1 running via LiteLLM, onboards users through conversation: what do you want to learn, where are you starting from, how much time do you have, what are your constraints? It then generates a fully personalized plan populated with curated YouTube videos, readings, book recommendations, homework tasks, and local in-person events via Eventbrite and Google Places, filtered by skill level and location.\n\nThe most technically distinctive feature is git-like plan branching. Users can modify any day in their plan, branch to an alternative route, or return to their original path, with all previous versions stored for 60 days. Progress is visualized as a roguelike-style map showing where you are in your learning journey, with streak tracking across multiple active plans simultaneously.\n\nBuilt with Flutter for the mobile app, FastAPI on Railway for the backend, MongoDB Atlas for the database, and Firebase Auth. The team deliberately costed out every service at the free tier — a production-aware approach for a hackathon. WCAG accessibility compliance was a deliberate design goal from the start, built Figma-first.\n\nFor the hackathon presentation, I built a companion website in React hosted on GitHub Pages that served as both a live slideshow for judges and a lasting project home. It includes a description of Lattice, a showcase of key features, team profiles with Gravatar photos and LinkedIn/GitHub links, and a download link for the Android beta. iOS distribution was not possible within the hackathon timeline since Apple's TestFlight process requires advance setup, so the beta was Android-only. The site gave judges and attendees somewhere to revisit the project after the event and download it themselves.`,
    skills: ['Flutter', 'Firebase', 'MongoDB', 'Google ADK', 'Figma', 'AI', 'Mobile & Web Dev'],
    links: { github: 'https://github.com/cecehoush' },
    lav: true, figma: true,
  },
  {
    id: 'roadrunner-connect', num: '03', title: 'Roadrunner Connect', type: 'Mobile · Project Lead',
    dateRange: 'Jun 2024 – Jul 2025',
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
    id: 'spiderbyte', num: '04', title: 'SpiderByte', type: 'Hackathon · 2nd place',
    dateRange: 'Oct 2023',
    desc: 'Course-aligned coding-challenge website — MLH hackathon 2nd place.',
    shortDesc: 'Course-aligned coding-challenge website and 2nd-place winner of the MLH DU/MSU hackathon.',
    longDesc: `SpiderByte is a course-aligned coding practice platform designed to make CS education more accessible and less overwhelming. Tools like LeetCode are powerful but often scope beyond what a class is currently teaching — leaving students stuck on concepts they haven't encountered yet. SpiderByte takes a different approach: professors can curate problem sets tied directly to their course material, building linear learning paths where each problem builds on the last. Students practice what they're actually learning, in the order they're learning it, with gamification to keep them engaged.\n\nIt began as a 2-person hackathon prototype at MLH DU/MSU in October 2023, where my partner Vincent Cordova and I competed against teams of up to 6 people and won 2nd place in 28 hours. The prototype used Python, Flask, SQLAlchemy, and PythonTutor for algorithm visualization. Seeing the potential, we continued development as our senior capstone project, rebuilding the entire platform from scratch with a team of 5, logging 120+ hours per person over a full semester with proper PR reviews, branch protection, and documented standups.\n\nThe production architecture spans 4 separate services: a React/Vite frontend, a Node.js/Express/MongoDB API server, a Python/Gemini/Sentence Transformers model service for AI-generated challenges, and a sandboxed code execution pipeline using Docker and RabbitMQ. User-submitted code enters a RabbitMQ queue, gets picked up by a Python manager, runs in an isolated Docker container, and returns results safely without touching the server.\n\nKey features include an in-browser Monaco Editor (the same editor powering VS Code), PythonTutor integration for step-by-step algorithm visualization, Gemini-generated coding challenges scored for quality using Sentence Transformers, a favorites system, badges and ranking, daily challenges via cron job, and real-time sessions over WebSocket. Development was feature-based rather than front/back-end split — each person owned full features end to end.`,
    // Note: adding this to `projects` also surfaces it in the home skill-drawer under 'Mobile & Web Dev'.
    skills: ['Mobile & Web Dev'],
    links: { github: 'https://github.com/cecehoush' },
    badge: '2nd place',
    lav: false, figma: false,
  },
  {
    id: 'accessible-llm', num: '05', title: 'Accessible LLM Interfaces', type: 'Research · NSF',
    dateRange: 'Sep 2025 – May 2026',
    desc: 'Evaluating LLM interfaces for underserved communities.',
    shortDesc: 'NSF-funded research evaluating and designing LLM interfaces that work for underserved and non-technical users.',
    longDesc: 'As a Graduate Research Assistant on the NSF-funded Colorado Sustainability Hub, I research accessible and inclusive LLM interfaces — improving usability across technical and non-technical users — and co-author a survey paper on LLM evaluation benchmarks. The work spans UI/UX design in Figma, chatbot interaction models, and machine-learning models that surface sustainability data patterns.',
    skills: ['Accessibility', 'HCI', 'LLM Evaluation', 'AI', 'Research'],
    links: { website: 'https://sustainabilityhub.co' },
    badge: 'NSF',
    lav: false, figma: false,
  },
  {
    id: 'align', num: '06', title: 'Align', type: 'HCI · Figma · Project Lead',
    dateRange: 'Spring 2026',
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
  {
    id: 'deep-learning-quiz',
    num: '07',
    title: 'Deep Learning Educational Tool',
    type: 'INDEPENDENT STUDY',
    dateRange: 'Aug 2024 – Dec 2024',
    // `desc`/`lav` added (not in the original spec) so the home MarqueeBar skill
    // drawer (AI/Research) renders a description and tint like the other projects.
    desc: 'RAG-powered educational chatbot for reviewing Discrete Structures quiz material.',
    shortDesc: 'RAG-powered educational chatbot that helps students review quiz material from Discrete Structures, generating tailored follow-up questions based on individual quiz responses.',
    longDesc: 'Built in a team of three as an independent study under faculty guidance. The chatbot uses Retrieval-Augmented Generation to pull context from textbook PDFs, then generates personalized follow-up questions to guide students toward understanding rather than just giving answers.\n\nIntegrated Ollama running Llama 3 as the local LLM, OpenAI embeddings with SKLearnVectorStore for semantic retrieval, and PyPDF2 for textbook ingestion. Built a Streamlit frontend for student interaction. Designed the system to ask guiding questions rather than provide direct answers, supporting deeper learning.\n\nPlanned next steps include expanding to additional courses, conducting user testing for a potential research publication, and integrating with the Canvas API for automatic quiz and class retrieval.',
    skills: ['Python', 'LangChain', 'RAG', 'Llama 3', 'OpenAI', 'Streamlit', 'Machine Learning', 'AI', 'Research'],
    links: {},
    images: [],
    badge: null,
    lav: false, figma: false,
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
