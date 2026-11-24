import { setRequestLocale } from 'next-intl/server';
import StoryShell from '@/components/scrollteller/engine/StoryShell';
import CareerDocument from '@/components/CareerDocument';
import evidence from '@/content/career-evidence.json';
import Link from 'next/link';
export const metadata = { title: 'Engineering Case Studies' };
export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StoryShell locale={locale} rail={false}>
    <CareerDocument text={evidence.cases} />
    <nav lang="en" dir="ltr" aria-label="Related engineering work" className="mx-auto flex max-w-3xl flex-wrap gap-6 px-6 pb-16 text-blue-300">
      <Link href={`/${locale}`}>Back to portfolio</Link>
      <Link href={`/${locale}/qa-handoff`}>QA handoff</Link>
      <a href="https://github.com/YusufJojeh/ProspectIQ">ProspectIQ source</a>
      <a href="https://github.com/YusufJojeh/RecafeOS">RestoCafe OS source</a>
    </nav>
  </StoryShell>;
}
