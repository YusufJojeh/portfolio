import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/site';
import StoryShell from '@/components/scrollteller/engine/StoryShell';
import { WORK_SLUGS, getWork } from '@/components/scrollteller/projects';
import RakezWork from '@/components/scrollteller/work/RakezWork';
import HireLensWork from '@/components/scrollteller/work/HireLensWork';
import LinguaCoachWork from '@/components/scrollteller/work/LinguaCoachWork';
import ProspectIQWork from '@/components/scrollteller/work/ProspectIQWork';
import CrmaWork from '@/components/scrollteller/work/CrmaWork';
import DhuraWork from '@/components/scrollteller/work/DhuraWork';
import CareerGuideWork from '@/components/scrollteller/work/CareerGuideWork';
import RestoCafeWork from '@/components/scrollteller/work/RestoCafeWork';
import MtjriWork from '@/components/scrollteller/work/MtjriWork';

const PAGES = {
  crma: CrmaWork,
  dhura: DhuraWork,
  prospectiq: ProspectIQWork,
  restocafe: RestoCafeWork,
  rakez: RakezWork,
  mtjri: MtjriWork,
  hirelens: HireLensWork,
  linguacoach: LinguaCoachWork,
  careerguide: CareerGuideWork,
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
  const title = `${t('title')} — Yusuf Jojeh`;
  return {
    title: { absolute: title },
    description,
    alternates: localeAlternates(locale, `/work/${slug}`),
    // Next replaces openGraph wholesale rather than merging it with the layout's.
    openGraph: {
      type: 'article',
      url: `/${locale}/work/${slug}`,
      siteName: 'Yusuf Jojeh',
      title,
      description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
  };
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
