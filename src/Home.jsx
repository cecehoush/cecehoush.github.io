import { useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import MarqueeBar from './components/MarqueeBar.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import ProjectModal from './components/ProjectModal.jsx';

export default function Home() {
  // Any skill-drawer project card opens its full-detail modal.
  const [modalProject, setModalProject] = useState(null);

  return (
    <>
      <Nav />
      <Hero />
      <MarqueeBar onOpenProject={setModalProject} />
      <Projects />
      <About />
      <Footer />
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </>
  );
}
