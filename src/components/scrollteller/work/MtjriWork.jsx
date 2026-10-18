import { useTranslations } from 'next-intl';
import { Architecture, Label, NextWork, Section, WorkHeader } from './WorkParts';
import { Claims, Decisions, Facts, FlowSteps, Gallery } from './CaseParts';

const SHOTS = ['store-dashboard', 'storefront', 'product-editor', 'pos', 'roles', 'platform-dashboard'];

/*
 * Mtjri opens on type, not footage: the story is a pipeline, so the pipeline
 * runs across the page before any screen appears. Claims stay on the AI
 * content path, which is the part with its own commit history.
 */
export default function MtjriWork({ locale, work }) {
  const t = useTranslations('final.work');
  const m = useTranslations('final.work.mtjri');

  return (
    <>
      <WorkHeader locale={locale} t={t} kicker={m('kicker')} title={m('title')} lede={m('lede')}>
        <p className="mt-6 inline-block border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-cream/85">
          {m('status')}
        </p>
      </WorkHeader>

      <Facts facts={m.raw('facts')} cols={3} />

      <Section className="py-16 md:py-24">
        <Label as="h2">{m('flowTitle')}</Label>
        <p className="mt-6 max-w-[40rem] text-[15px] leading-relaxed text-cinema-text/70">{m('flowIntro')}</p>
        <div className="mt-12">
          <FlowSteps steps={m.raw('flow')} stepLabel={t('step')} horizontal />
        </div>
      </Section>

      <Decisions title={m('decisionsTitle')} items={m.raw('decisions')} />

      <Gallery
        label={t('evidence.app.label')}
        intro={m('screensNote')}
        shots={SHOTS.map((f) => ({ src: `/portfolio/more/mtjri/${f}.webp`, alt: m(`screens.${f}`), caption: m(`screens.${f}`) }))}
      />

      <Claims labels={t.raw('claims')} verified={m.raw('verified')} notClaimed={m.raw('notClaimed')} />
      <Architecture t={t} text={m('architecture')} stack={work.stack} url={work.githubUrl} />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
