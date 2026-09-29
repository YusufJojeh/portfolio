import { getTranslations, setRequestLocale } from 'next-intl/server';
import StoryShell from '@/components/scrollteller/engine/StoryShell';
import OpeningSequence from '@/components/scrollteller/chapters/OpeningSequence';
import BusinessToSystem from '@/components/scrollteller/chapters/BusinessToSystem';
import HireLens from '@/components/scrollteller/chapters/HireLens';
import LinguaCoach from '@/components/scrollteller/chapters/LinguaCoach';
import ProspectIQ from '@/components/scrollteller/chapters/ProspectIQ';
import Dhura from '@/components/scrollteller/chapters/Dhura';
import AppliedAI from '@/components/scrollteller/chapters/AppliedAI';
import Experience from '@/components/scrollteller/chapters/Experience';
import MoreSystems from '@/components/scrollteller/chapters/MoreSystems';
import Closing from '@/components/scrollteller/chapters/Closing';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'final.meta' });
  return { title: { absolute: t('title') }, description: t('description') };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <StoryShell locale={locale} rail={false}>
      {/* 00 Opening · 01 Real operations · 02 Rakez — one pinned sequence */}
      <OpeningSequence />
      <BusinessToSystem />
      <HireLens />
      <LinguaCoach />
      <ProspectIQ />
      <Dhura />
      <AppliedAI />
      <Experience />
      <MoreSystems />
      <Closing />
    </StoryShell>
  );
}
