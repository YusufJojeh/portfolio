import dynamic from 'next/dynamic';
import Navbar from '@/components/client/Navbar';
import Hero from '@/components/client/Hero';
import FlagshipSystems from '@/components/client/FlagshipSystems';
import Footer from '@/components/client/Footer';

const SpaceBackground = dynamic(
  () => import('@/components/client/SpaceBackground'),
  { loading: () => <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-slate-950" /> }
);

const WhyHireMe = dynamic(() => import('@/components/client/WhyHireMe.jsx'));
const About = dynamic(() => import('@/components/client/About.jsx'));
const SkillsModern = dynamic(() => import('@/components/client/SkillsModern.jsx'));
const Experience = dynamic(() => import('@/components/client/Experience.jsx'));
const Projects = dynamic(() => import('@/components/client/Projects.jsx'));
const CurrentlySeeking = dynamic(() => import('@/components/client/CurrentlySeeking.jsx'));
const Testimonials = dynamic(() => import('@/components/client/Testimonials.jsx'));
const Contact = dynamic(() => import('@/components/client/Contact.jsx'));

export default function HomePage() {
  return (
    <>
      <SpaceBackground />
      <div className="min-h-screen relative">
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <FlagshipSystems />
          <WhyHireMe />
          <About />
          <SkillsModern />
          <Experience />
          <Projects />
          <CurrentlySeeking />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
