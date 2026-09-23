import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import StoryShell from '@/components/scrollteller/engine/StoryShell';
import { WORK_SLUGS, getWork } from '@/components/scrollteller/projects';
import RakezWork from '@/components/scrollteller/work/RakezWork';
import HireLensWork from '@/components/scrollteller/work/HireLensWork';
import LinguaCoachWork from '@/components/scrollteller/work/LinguaCoachWork';
import ProspectIQWork from '@/components/scrollteller/work/ProspectIQWork';
import DhuraWork from '@/components/scrollteller/work/DhuraWork';
import CareerGuideWork from '@/components/scrollteller/work/CareerGuideWork';
import AlgoagWork from '@/components/scrollteller/work/AlgoagWork';

const PAGES = {
  rakez: RakezWork,
  hirelens: HireLensWork,
  linguacoach: LinguaCoachWork,
  prospectiq: ProspectIQWork,
  dhura: DhuraWork,
  careerguide: CareerGuideWork,
  algoag: AlgoagWork,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return ['en', 'ar'].flatMap((locale) => WORK_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!PAGES[slug]) return {};
  const t = await getTranslations({ locale, namespace: `final.work.${slug}` });
  const description = t.has('lede') ? t('lede') : t('body');
  return { title: { absolute: `${t('title')} — Yusuf Jojeh` }, description };
}

export default async function WorkPage({ params }) {
  const { locale, slug } = await params;
  const Page = PAGES[slug];
  const work = getWork(slug);
  if (!Page || !work) notFound();
  setRequestLocale(locale);

  return (
    <StoryShell locale={locale} rail={false}>
      <Page locale={locale} work={work} />
    </StoryShell>
  );
}
