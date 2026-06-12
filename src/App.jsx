import { useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import MarqueeBar from './components/MarqueeBar.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import FigmaModal from './components/FigmaModal.jsx';

export default function App() {
  // The Figma modal is opened from the Figma skill drawer (in MarqueeBar).
  const [figmaProject, setFigmaProject] = useState(null);

  return (
    <>
      <Nav />
      <Hero />
      <MarqueeBar onOpenFigma={setFigmaProject} />
      <Projects />
      <About />
      <Footer />
      <FigmaModal project={figmaProject} onClose={() => setFigmaProject(null)} />
    </>
  );
}
