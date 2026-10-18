import { getTranslations, setRequestLocale } from 'next-intl/server';
import StoryShell from '@/components/scrollteller/engine/StoryShell';
import OpeningSequence from '@/components/scrollteller/chapters/OpeningSequence';
import Crma from '@/components/scrollteller/chapters/Crma';
import Dhura from '@/components/scrollteller/chapters/Dhura';
import ProspectIQ from '@/components/scrollteller/chapters/ProspectIQ';
import RestoCafe from '@/components/scrollteller/chapters/RestoCafe';
import BusinessToSystem from '@/components/scrollteller/chapters/BusinessToSystem';
import AppliedAI from '@/components/scrollteller/chapters/AppliedAI';
import MoreSystems from '@/components/scrollteller/chapters/MoreSystems';
import Experience from '@/components/scrollteller/chapters/Experience';
import About from '@/components/scrollteller/chapters/About';
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
      {/* 00 Opening · 01 Engineering signals · 02 Rakez — one pinned sequence */}
      <OpeningSequence />
      {/* 03–06 Selected systems, continued */}
      <Crma />
      <Dhura />
      <ProspectIQ />
      <RestoCafe />
      <BusinessToSystem />
      <AppliedAI />
      <MoreSystems />
      <Experience />
      <About />
      <Closing />
    </StoryShell>
  );
}
