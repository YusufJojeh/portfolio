import dynamic from 'next/dynamic';
import Navbar from '@/components/client/Navbar';
import Footer from '@/components/client/Footer';
import OpeningIdentityScene from '@/components/story/scenes/OpeningIdentityScene';
import TransitionScene from '@/components/story/scenes/TransitionScene';
import AbstractionScene from '@/components/story/scenes/AbstractionScene';
import GalleryChapter from '@/components/story/scenes/GalleryChapter';
import ExperienceTimeline from '@/components/story/scenes/ExperienceTimeline';
import { caseStudies } from '@/lib/data/portfolio';

const CaseStudyChapter = dynamic(() => import('@/components/story/scenes/CaseStudyChapter'));
const TypographyCaseStudyChapter = dynamic(() => import('@/components/story/scenes/TypographyCaseStudyChapter'));
const Contact = dynamic(() => import('@/components/client/Contact.jsx'));

export default function HomePage() {
  const rakez = caseStudies.find((c) => c.id === 'rakez-erp');
  const hirelens = caseStudies.find((c) => c.id === 'hirelens');
  const linguacoach = caseStudies.find((c) => c.id === 'linguacoach');
  const leadscope = caseStudies.find((c) => c.id === 'leadscope');
  const dhura = caseStudies.find((c) => c.id === 'dhura');
  const careerguide = caseStudies.find((c) => c.id === 'careerguide');

  return (
    <div className="min-h-screen bg-cinema-bg relative">
      <Navbar />
      <main className="relative z-10" id="case-studies">
        <OpeningIdentityScene />

        <TransitionScene variant="mid" id="story-transition" />

        <CaseStudyChapter
          caseKey="rakez-erp"
          chapterLabel="CASE STUDY 01"
          coverSrc="/portfolio/story/rakez/rakez-cinematic-cover.webp"
          coverAlt="Cinematic art direction: real-estate office scene with a floating ERP dashboard concept"
          githubUrl={rakez?.githubUrl}
          stack={rakez?.stack}
        />

        <TypographyCaseStudyChapter
          caseKey="hirelens"
          chapterLabel="CASE STUDY 02"
          githubUrl={hirelens?.githubUrl}
          stack={hirelens?.stack}
          tier="flagship"
        />

        <TypographyCaseStudyChapter
          caseKey="linguacoach"
          chapterLabel="CASE STUDY 03"
          githubUrl={linguacoach?.githubUrl}
          stack={linguacoach?.stack}
          tier="flagship"
        />

        <CaseStudyChapter
          caseKey="leadscope"
          chapterLabel="CASE STUDY 04"
          coverSrc="/portfolio/story/prospectiq/prospectiq-cinematic-cover.webp"
          coverAlt="Cinematic art direction: dark business-intelligence workspace concept for LeadScope AI"
          githubUrl={leadscope?.githubUrl}
          stack={leadscope?.stack}
        />

        <AbstractionScene />

        <CaseStudyChapter
          caseKey="dhura"
          chapterLabel="CASE STUDY 05"
          coverSrc="/portfolio/story/dhura/dhura-cinematic-cover.webp"
          coverAlt="Cinematic art direction: Arabic-first real-estate CRM/ERP concept"
          githubUrl={dhura?.githubUrl}
          stack={dhura?.stack}
        />

        <TypographyCaseStudyChapter
          caseKey="careerguide"
          chapterLabel="CASE STUDY 06"
          githubUrl={careerguide?.githubUrl}
          stack={careerguide?.stack}
          tier="supporting"
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
