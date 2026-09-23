import Image from 'next/image';
import Link from 'next/link';
import { CONTACT } from '../contact';

/*
 * Small shared pieces for the /work pages. Each page composes its own
 * rhythm from these; none of them is a page template.
 */

export function Arrow({ back = false }) {
  return (
    <span aria-hidden="true" className={`inline-block ${back ? '-scale-x-100 rtl:scale-x-100' : 'rtl:-scale-x-100'}`}>
      →
    </span>
  );
}

export function BackLink({ locale, label }) {
  return (
    <Link
      href={`/${locale}#rakez`}
      className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-cinema-muted transition-colors duration-200 hover:text-cinema-cream"
    >
      <Arrow back /> {label}
    </Link>
  );
}

export function Label({ children, className = '' }) {
  return (
    <p className={`font-mono text-[10.5px] uppercase tracking-[0.22em] text-cinema-muted ${className}`}>{children}</p>
  );
}

export function Section({ children, className = '' }) {
  return <section className={`px-6 md:px-12 lg:px-16 ${className}`}>{children}</section>;
}

/** Stack as one quiet mono line, not a wall of badges. */
export function StackLine({ label, stack, className = '' }) {
  if (!stack?.length) return null;
  return (
    <div className={className}>
      <Label>{label}</Label>
      <p dir="ltr" className="mt-3 font-mono text-[12px] leading-relaxed tracking-[0.04em] text-cinema-text/70 rtl:text-right">
        {stack.join('  ·  ')}
      </p>
    </div>
  );
}

export function SourceLine({ t, url, className = '' }) {
  return (
    <div className={className}>
      <Label>{t('source')}</Label>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-[14px] text-cinema-text/80 underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:decoration-cinema-cream"
        >
          {t('viewSource')} <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <p className="mt-3 text-[14px] text-cinema-text/60">{t('private')}</p>
      )}
    </div>
  );
}

export function Architecture({ t, text, stack, url }) {
  return (
    <Section className="border-t border-white/10 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
        <Label>{t('architecture')}</Label>
        <div>
          <p className="max-w-[46rem] text-[17px] leading-relaxed text-cinema-text/80 md:text-[19px]">{text}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <StackLine label={t('stack')} stack={stack} />
            <SourceLine t={t} url={url} />
          </div>
        </div>
      </div>
    </Section>
  );
}

/** The last thing on every page: the next system, set large. */
export function NextWork({ locale, t, next }) {
  return (
    <Section className="border-t border-white/10 py-20 md:py-28">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <Link href={`/${locale}/work/${next.slug}`} className="group block">
          <Label>{t('next')}</Label>
          <span
            dir="ltr"
            className="mt-4 flex items-baseline gap-4 font-display text-[52px] leading-none text-cinema-soft transition-colors duration-200 group-hover:text-cinema-cream md:text-[clamp(72px,8vw,128px)]"
          >
            {next.title}
            <span aria-hidden="true" className="text-[0.5em] transition-transform duration-200 ease-cinematic group-hover:translate-x-2">
              →
            </span>
          </span>
        </Link>
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex w-fit items-center gap-2 rounded-[3px] border border-white/25 px-5 py-3 text-[13.5px] font-medium text-cinema-text transition-colors duration-200 hover:border-white/60"
        >
          {t('discuss')}
        </a>
      </div>
    </Section>
  );
}

/** A plain typographic opening for pages that do not lead with an image. */
export function WorkHeader({ locale, t, kicker, title, lede, children }) {
  return (
    <Section className="pb-16 pt-32 md:pb-24 md:pt-44">
      <BackLink locale={locale} label={t('back')} />
      <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{kicker}</p>
      <h1 dir="ltr" className="mt-5 font-display text-[64px] leading-[0.92] text-cinema-soft md:text-[clamp(96px,11vw,176px)] rtl:text-right">
        {title}
      </h1>
      <p className="mt-8 max-w-[38rem] text-[17px] leading-relaxed text-cinema-text/75 md:text-[20px]">{lede}</p>
      {children}
    </Section>
  );
}

/** Where each project's real screenshots live, and what each one shows. */
const SCREENS = {
  rakez: [{ file: 'login', ratio: 1440 / 900 }],
  hirelens: [{ file: 'home', ratio: 1440 / 900 }, { file: 'login', ratio: 1440 / 900 }],
  linguacoach: [{ file: 'home', ratio: 1440 / 900 }, { file: 'login', ratio: 1440 / 900 }],
  prospectiq: [{ file: 'home', ratio: 1440 / 672, mobileRatio: 780 / 1400 }, { file: 'login', ratio: 1440 / 900 }],
  careerguide: [{ file: 'home', ratio: 1440 / 900 }, { file: 'login', ratio: 1440 / 900 }],
  dhura: [{ file: 'login', ratio: 1440 / 900 }, { file: 'register', ratio: 1440 / 900 }],
  algoag: [{ file: 'home', ratio: 1440 / 900 }, { file: 'login', ratio: 1440 / 900 }],
};

/**
 * Real, unretouched screens from the running product. These are the evidence
 * layer, so they sit plainly on the page: no blur, no device mockup, no
 * generated overlay. The caption says where each capture came from.
 */
// Logged-in screens from local builds running on each repo's own demo seed.
const APP = {
  rakez: { ratio: 1600 / 1000, files: ['marketing-performance-dashboard', 'unit-inventory-search', 'sales-reservation-operations', 'accounting-finance-dashboard', 'credit-booking-pipeline', 'workforce-analytics'] },
  prospectiq: { ratio: 1600 / 882, files: ['operational-lead-intelligence-dashboard', 'evidence-first-lead-portfolio', 'lead-intelligence-detail', 'evidence-grounded-ai-analysis', 'ai-outreach-drafts', 'crm-sales-pipeline'] },
  hirelens: { ratio: 1280 / 800, files: ['dashboard', 'evaluation', 'human-review', 'interview-kit', 'rubric', 'audit'] },
  linguacoach: { ratio: 1280 / 800, files: ['dashboard', 'coach', 'reading', 'listening', 'admin-audit'] },
  dhura: { ratio: 1600 / 1000, files: ['executive-overview', 'unit-inventory', 'crm-lead-workspace', 'finance-reporting', 'governed-ai-control-room', 'customer-portal-dashboard'] },
};

function AppGallery({ t, slug }) {
  const app = APP[slug];
  if (!app) return null;
  return (
    <div className="mt-20 md:mt-28">
      <Label>{t('evidence.app.label')}</Label>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-cinema-text/70">{t('evidence.app.demo')}</p>
      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
        {app.files.map((file) => (
          <figure key={file} className="m-0">
            <div className="overflow-hidden rounded-[3px] border border-white/10 bg-cinema-bg2" style={{ aspectRatio: app.ratio }}>
              <Image
                src={`/portfolio/work/${slug}/app/${file}.webp`}
                alt={t(`evidence.app.${slug}.${file}`)}
                sizes="(min-width: 768px) 44vw, 100vw"
                width={1600}
                height={Math.round(1600 / app.ratio)}
                className="block h-full w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cinema-muted">
              {t(`evidence.app.${slug}.${file}`)}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Evidence({ t, slug, className = '' }) {
  const shots = SCREENS[slug];
  if (!shots) return null;
  const caption = (file) => (
    <figcaption className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cinema-muted">
      {t(`evidence.caption.${file}`)}
    </figcaption>
  );
  return (
    <Section className={`py-20 md:py-28 ${className}`}>
      <Label>{t('evidence.label')}</Label>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-cinema-text/70">{t(`evidence.source.${slug}`)}</p>
      <div className="mt-12 hidden gap-16 md:grid">
        {shots.map((s) => (
          <figure key={s.file} className="m-0">
            <div className="overflow-hidden rounded-[3px] border border-white/10 bg-cinema-bg2" style={{ aspectRatio: s.ratio }}>
              <Image
                src={`/portfolio/work/${slug}/${s.file}.webp`}
                alt={t(`evidence.alt.${slug}.${s.file}`)}
                sizes="88vw"
                width={1440}
                height={Math.round(1440 / s.ratio)}
                className="block h-full w-full object-cover object-top"
              />
            </div>
            {caption(s.file)}
          </figure>
        ))}
      </div>
      {/* Phones get the app's own phone layout, captured at 390px, two to a row. */}
      <div className={`mt-10 grid gap-4 md:hidden ${shots.length > 1 ? 'grid-cols-2' : 'mx-auto max-w-[62%]'}`}>
        {shots.map((s) => {
          const ratio = s.mobileRatio ?? 780 / 1688;
          return (
            <figure key={s.file} className="m-0">
              <div className="overflow-hidden rounded-[10px] border border-white/10 bg-cinema-bg2" style={{ aspectRatio: ratio }}>
                <Image
                  src={`/portfolio/work/${slug}/${s.file}-mobile.webp`}
                  alt={t(`evidence.alt.${slug}.${s.file}`)}
                  sizes="(max-width: 767px) 50vw, 1px"
                  width={780}
                  height={Math.round(780 / ratio)}
                  className="block h-full w-full object-cover object-top"
                />
              </div>
              {caption(s.file)}
            </figure>
          );
        })}
      </div>
      <AppGallery t={t} slug={slug} />
    </Section>
  );
}
