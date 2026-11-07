import { setRequestLocale } from 'next-intl/server';
import StoryShell from '@/components/scrollteller/engine/StoryShell';
import CareerDocument from '@/components/CareerDocument';
import evidence from '@/content/career-evidence.json';
import Link from 'next/link';
export const metadata = { title: 'How I Hand Off to QA | Yusuf Jojeh' };
export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StoryShell locale={locale} rail={false}>
    <CareerDocument text={evidence.qa} />
    <nav aria-label="Related engineering work" className="mx-auto flex max-w-3xl flex-wrap gap-6 px-6 pb-16 text-blue-300">
      <Link href={`/${locale}`}>Back to portfolio</Link>
      <Link href={`/${locale}/case-studies`}>Case studies</Link>
      <Link href={`/${locale}/qa-handoff`}>QA handoff</Link>
    </nav>
  </StoryShell>;
}
