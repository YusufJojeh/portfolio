import dynamic from 'next/dynamic';
import Navbar from '@/components/client/Navbar';
import Footer from '@/components/client/Footer';
import HeroScene from '@/components/story/scenes/HeroScene';
import TransitionScene from '@/components/story/scenes/TransitionScene';
import AbstractionScene from '@/components/story/scenes/AbstractionScene';
import GalleryChapter from '@/components/story/scenes/GalleryChapter';
import ExperienceTimeline from '@/components/story/scenes/ExperienceTimeline';
import { caseStudies } from '@/lib/data/portfolio';

const CaseStudyChapter = dynamic(() => import('@/components/story/scenes/CaseStudyChapter'));
const Contact = dynamic(() => import('@/components/client/Contact.jsx'));

export default function HomePage() {
  const rakez = caseStudies.find((c) => c.id === 'rakez-erp');
  const leadscope = caseStudies.find((c) => c.id === 'leadscope');

  return (
    <div className="min-h-screen bg-cinema-bg relative">
      <Navbar />
      <main className="relative z-10" id="case-studies">
        <HeroScene />

        <TransitionScene variant="mid" id="story-transition" />

        <CaseStudyChapter
          caseKey="rakez-erp"
          chapterLabel="CASE STUDY 01"
          coverSrc="/portfolio/story/rakez/rakez-cinematic-cover.webp"
          coverAlt="Cinematic art direction: real-estate office scene with a floating ERP dashboard concept"
          githubUrl={rakez?.githubUrl}
          stack={rakez?.stack}
        />

        <AbstractionScene />

        <CaseStudyChapter
          caseKey="leadscope"
          chapterLabel="CASE STUDY 02"
          coverSrc="/portfolio/story/prospectiq/prospectiq-cinematic-cover.webp"
          coverAlt="Cinematic art direction: dark business-intelligence workspace concept for LeadScope AI"
          githubUrl={leadscope?.githubUrl}
          stack={leadscope?.stack}
        />

        <GalleryChapter />

        <ExperienceTimeline />

        <TransitionScene variant="closing" id="closing" />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
