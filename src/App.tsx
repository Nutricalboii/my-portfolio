import './index.css';
import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { PageEntity } from './components/PageEntity';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './sections/Hero';
import { ProofBar } from './sections/ProofBar';
import { Work } from './sections/Work';
import { Marquee } from './sections/Marquee';
import { Skills } from './sections/Skills';
import { Pipeline } from './sections/Pipeline';
import { Experience } from './sections/Experience';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { useRevealOnScroll } from './hooks/useScrollProgress';

function App() {
  useRevealOnScroll();

  useEffect(() => {
    // Smooth reveal for elements added after mount
    const obs = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add('visible');
        }
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Fixed 3D traversal element — above everything, below nav */}
      <PageEntity />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Nav />

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <ProofBar />
        <Work />
        <Marquee />
        <Skills />
        <Pipeline />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
