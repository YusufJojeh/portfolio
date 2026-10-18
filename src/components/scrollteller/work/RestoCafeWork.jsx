import { useTranslations } from 'next-intl';
import WorkCover from './WorkCover';
import { Architecture, BackLink, Label, NextWork, Section } from './WorkParts';
import { Claims, Decisions, Facts, FlowSteps, Gallery } from './CaseParts';

const OVERLAY =
  'linear-gradient(90deg, rgba(9,11,15,0.94) 0%, rgba(9,11,15,0.7) 40%, rgba(9,11,15,0.4) 100%), linear-gradient(0deg, rgba(9,11,15,1) 0%, rgba(9,11,15,0.45) 42%, rgba(9,11,15,0.35) 100%)';

const SHOTS = ['kitchen', 'order-create', 'tables', 'dashboard', 'invoice', 'reports'];

// The order states as they are spelled in the code, shown beside each step.
const STATES = ['DRAFT', 'CONFIRMED', 'IN_PREPARATION', 'READY', 'SERVED', 'PAID'];

/*
 * RestoCafe OS: the order is the story. The page follows one order through its
 * states, then shows what keeps two terminals, a kitchen screen and a flaky
 * connection from corrupting it.
 */
export default function RestoCafeWork({ locale, work }) {
  const t = useTranslations('final.work');
  const r = useTranslations('final.work.restocafe');

  return (
    <>
      <WorkCover
        overlay={OVERLAY}
        image={{
          src: '/portfolio/more/restocafe/kitchen.webp',
          alt: '',
          aspect: 1600 / 1000,
          focus: [60, 40],
          mobileFocus: [70, 40],
        }}
      >
        <BackLink locale={locale} label={t('back')} />
        <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{r('kicker')}</p>
        <h1 dir="ltr" className="mt-5 font-display text-[64px] leading-[0.92] text-cinema-soft md:text-[clamp(100px,11vw,180px)] rtl:text-right">
          {r('title')}
        </h1>
        <p className="mt-8 max-w-[36rem] text-[17px] leading-relaxed text-cinema-text/80 md:text-[20px]">{r('lede')}</p>
        <p className="mt-6 inline-block border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-cream/85">
          {r('status')}
        </p>
      </WorkCover>

      <Facts facts={r.raw('facts')} />

      <Section className="py-20 md:py-28">
        <Label as="h2">{r('problemTitle')}</Label>
        <p className="mt-8 max-w-[62rem] font-display text-[32px] leading-[1.1] text-cinema-soft md:text-[clamp(42px,4.4vw,68px)]">
          {r('problem')}
        </p>
      </Section>

      <Section className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Label as="h2">{r('flowTitle')}</Label>
            <p className="mt-6 max-w-[26rem] text-[15px] leading-relaxed text-cinema-text/70">{r('flowIntro')}</p>
          </div>
          <FlowSteps steps={r.raw('flow')} stepLabel={t('step')} codes={STATES} />
        </div>
      </Section>

      <Decisions title={r('decisionsTitle')} items={r.raw('decisions')} />

      <Gallery
        label={t('evidence.app.label')}
        intro={r('screensNote')}
        shots={SHOTS.map((f) => ({ src: `/portfolio/more/restocafe/${f}.webp`, alt: r(`screens.${f}`), caption: r(`screens.${f}`) }))}
      />

      <Claims labels={t.raw('claims')} verified={r.raw('verified')} notClaimed={r.raw('notClaimed')} tests={r('tests')} />
      <Architecture t={t} text={r('architecture')} stack={work.stack} url={work.githubUrl} />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
