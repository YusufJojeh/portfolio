import SpatialProjects from '@/components/scrollteller/chapters/SpatialProjects';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import StoryShell from '@/components/scrollteller/engine/StoryShell';
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
      <SpatialProjects />
      {/* 03–06 Selected systems, continued */}
      <BusinessToSystem />
      <AppliedAI />
      <MoreSystems />
      <section lang="en" dir="ltr" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm uppercase tracking-widest text-cinema-muted">Selected engineering work</p>
        <h2 className="mt-5 font-display text-4xl md:text-6xl">Agents, payments, and backend delivery.</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-cinema-text/75">Three anonymized case studies: the problem, my contribution, verification results, and what remains unmeasured.</p>
        <div className="mt-8 flex flex-wrap gap-6 text-blue-300">
          <Link href={`/${locale}/case-studies`} className="underline underline-offset-8">Read the case studies</Link>
          <Link href={`/${locale}/qa-handoff`} className="underline underline-offset-8">How I hand off to QA</Link>
        </div>
      </section>
      <section lang="en" dir="ltr" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-display text-4xl">Engineering capabilities</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
      {[
       ['Backend & business systems','PHP / Laravel, custom PHP frameworks, Python / FastAPI, NestJS / TypeScript. REST, GraphQL, payments, ERP/CRM workflows, authorization, queues, and integrations.'],
       ['Applied AI & automation','AI agents, MCP, OAuth 2.1, LLM integration, n8n, coding-agent pipelines, and a QA-agent proof of concept. Continuing training in RAG and vector databases.'],
       ['Full-stack delivery','React.js, Next.js, Vue.js, and Inertia.js. Frontend implementation, API integration, review of frontend code, and web/mobile handoff contracts.'],
       ['Data, quality & delivery','MySQL, MariaDB, PostgreSQL, Redis, Docker, Linux, GitHub Actions, PHPUnit, and Playwright. Payment integrity, concurrency checks, and reproducible QA handoffs.'],
       ['Technical leadership','Architecture decisions, task breakdown and allocation, code review, cross-team delivery, trainee follow-up, and tutoring more than 100 students.']
      ].map(([title,body])=><div key={title} className="border-t border-white/15 pt-6"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-cinema-text/75">{body}</p></div>)}
      </div></section>
      <Experience />
      <About />
      <ContactForm />
      <Closing />
    </StoryShell>
  );
}
