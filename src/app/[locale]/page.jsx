import dynamic from 'next/dynamic';
import Navbar from '@/components/client/Navbar';
import Hero from '@/components/client/Hero';
import FlagshipSystems from '@/components/client/FlagshipSystems';
import Footer from '@/components/client/Footer';

// Lazy load heavy Three.js background - Client component handles SSR internally
const SpaceBackground = dynamic(
  () => import('@/components/client/SpaceBackground'),
  { loading: () => <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-slate-950" /> }
);

// Lazy load below-the-fold sections for better initial load
const About = dynamic(() => import('@/components/client/About.jsx'));
const SkillsModern = dynamic(() => import('@/components/client/SkillsModern.jsx'));
const Experience = dynamic(() => import('@/components/client/Experience.jsx'));
const Projects = dynamic(() => import('@/components/client/Projects.jsx'));
const Contact = dynamic(() => import('@/components/client/Contact.jsx'));

export default function HomePage() {
  return (
    <>
      <SpaceBackground />
      <div className="min-h-screen relative">
        <Navbar />
        <main className="relative z-10">
          <section id="home">
            <Hero />
          </section>
          <section id="flagship">
            <FlagshipSystems />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="skills">
            <SkillsModern />
          </section>
          <section id="experience">
            <Experience />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contact">
            <Contact />
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}
