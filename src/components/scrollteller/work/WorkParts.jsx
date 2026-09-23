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
