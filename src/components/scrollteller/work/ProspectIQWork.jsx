import { useTranslations } from 'next-intl';
import WorkCover from './WorkCover';
import RunReplay from './RunReplay';
import { Architecture, BackLink, Label, NextWork, Section, Evidence } from './WorkParts';

const OVERLAY =
  'linear-gradient(0deg, rgba(9,11,15,1) 0%, rgba(9,11,15,0.82) 38%, rgba(9,11,15,0.35) 75%, rgba(9,11,15,0.6) 100%), rgba(9,11,15,0.25)';

/*
 * ProspectIQ: the system is told as a sequence of claims, each one backed by
 * its own diagram. Diagrams are typographic on purpose. They describe the
 * code's structure, not screens, so they carry no invented figures.
 */

const PROVIDERS = ['Tavily', 'SerpAPI', 'Apify'];

function Arrow({ down = false, className = '' }) {
  return (
    <span aria-hidden="true" className={`text-cinema-steel ${down ? '' : 'rtl:-scale-x-100'} inline-block ${className}`}>
      {down ? '↓' : '→'}
    </span>
  );
}

/** A numbered chapter: the claim on the left, its evidence on the right. */
function Chapter({ n, title, lede, children, className = '' }) {
  return (
    <Section className={`border-t border-white/10 py-20 md:py-28 ${className}`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <span dir="ltr" className="font-mono text-[11px] tracking-[0.2em] text-cinema-muted">
            {n}
          </span>
          <h2 className="mt-4 font-display text-[40px] leading-[1] text-cinema-soft md:text-[clamp(48px,4.4vw,68px)]">{title}</h2>
          {lede && <p className="mt-6 max-w-[30rem] text-[16px] leading-relaxed text-cinema-text/75 md:text-[17px]">{lede}</p>}
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </Section>
  );
}

/** A left-to-right chain that folds into a column on phones. */
function Chain({ items, className = '' }) {
  return (
    <ol className={`flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-x-3 md:gap-y-3 ${className}`}>
      {items.map((s, i) => (
        <li key={s} className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
          <span className="border border-white/15 px-3 py-2 text-[14px] text-cinema-text md:text-[15px]">{s}</span>
          {i < items.length - 1 && (
            <>
              <Arrow className="hidden md:inline-block" />
              <Arrow down className="ps-3 md:hidden" />
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

function Note({ children, className = '' }) {
  return <p className={`max-w-[44rem] text-[14px] leading-relaxed text-cinema-text/55 ${className}`}>{children}</p>;
}

export default function ProspectIQWork({ locale, work }) {
  const t = useTranslations('final.work');
  const p = useTranslations('final.work.prospectiq');
  const home = useTranslations('final.prospectiq');

  const ev = p.raw('evidence');
  const score = p.raw('score');
  const delta = p.raw('delta');
  const kn = p.raw('knowledge');
  const rt = p.raw('runtime');
  const ap = p.raw('approval');
  const rs = p.raw('resume');
  const ver = p.raw('verification');
  const a11y = p.raw('a11y');

  return (
    <>
      <WorkCover
        overlay={OVERLAY}
        className="min-h-[84svh]"
        image={{
          src: '/portfolio/work/prospectiq/app/operational-lead-intelligence-dashboard.webp',
          aspect: 1600 / 882,
          mobileSrc: '/portfolio/work/prospectiq/mobile.webp',
          mobileAspect: 780 / 1390,
          alt: home('imageAlt'),
          focus: [50, 45],
          mobileFocus: [12, 45],
        }}
      >
        <BackLink locale={locale} label={t('back')} />
        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{p('kicker')}</p>
            <h1 dir="ltr" className="mt-5 font-display text-[64px] leading-[0.92] text-cinema-soft md:text-[clamp(96px,10vw,168px)] rtl:text-right">
              {p('title')}
            </h1>
            <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cinema-muted">{p('alias')}</p>
          </div>
          <p className="max-w-[34rem] font-display text-[26px] leading-[1.15] text-cinema-soft md:text-[34px]">{p('lede')}</p>
        </div>
      </WorkCover>

      <Section className="py-20 md:py-28">
        <p className="max-w-[56rem] text-[18px] leading-relaxed text-cinema-text/80 md:text-[21px]">{p('summary')}</p>
        <Label className="mt-16">{p('pathTitle')}</Label>
        <ol className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3">
          {p.raw('path').map((s, i, all) => (
            <li key={s} className="flex items-center gap-3">
              <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-cinema-text/75">{s}</span>
              {i < all.length - 1 && <Arrow />}
            </li>
          ))}
        </ol>
      </Section>

      {/* 01 — Evidence */}
      <Chapter n="01" title={ev.t} lede={ev.d}>
        <div className="grid gap-4">
          <div>
            <Label>{ev.providers}</Label>
            <ul dir="ltr" className="mt-3 flex flex-wrap gap-2 rtl:justify-end">
              {PROVIDERS.map((s) => (
                <li key={s} className="bg-white/[0.06] px-3 py-2 font-mono text-[13px] text-cinema-soft">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <Arrow down className="text-[18px]" />
          <Chain items={ev.chain} />
          <Arrow down className="text-[18px]" />
          <ul className="grid grid-cols-2 border-s border-t border-white/10 md:grid-cols-4">
            {ev.checks.map((c) => (
              <li key={c} className="border-b border-e border-white/10 px-4 py-5 text-[14.5px] text-cinema-soft">
                {c}
              </li>
            ))}
          </ul>
          <Note className="mt-4">{ev.note}</Note>
        </div>
      </Chapter>

      {/* 02 — Deterministic scoring */}
      <Chapter n="02" title={score.t} lede={score.d} className="bg-cinema-bg2">
        <ul className="flex flex-wrap gap-2">
          {score.items.map((s) => (
            <li key={s} className="border border-white/15 px-3 py-2 text-[14px] text-cinema-text">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Label>{score.formulaTitle}</Label>
          <table className="mt-4 w-full max-w-[36rem] border-collapse">
            <tbody>
              {score.formula.map(([k, v]) => (
                <tr key={k} className="border-b border-white/10">
                  <th scope="row" className="py-2.5 text-start text-[14.5px] font-normal text-cinema-text/80">
                    {k}
                  </th>
                  <td dir="ltr" className="py-2.5 text-end font-mono text-[13px] text-cinema-soft rtl:text-left">
                    {v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Note className="mt-4">{score.cap}</Note>
        </div>
      </Chapter>

      {/* 03 — Delta Intelligence */}
      <Chapter n="03" title={delta.t} lede={delta.d}>
        <Chain items={delta.chain} />
        <div className="mt-12">
          <Label>{delta.kindsLabel}</Label>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {delta.kinds.map((k) => (
              <li key={k} className="border-b border-white/10 py-3 text-[15px] text-cinema-text/80">
                {k}
              </li>
            ))}
          </ul>
        </div>
        <Note className="mt-8">{delta.note}</Note>
      </Chapter>

      {/* 04 — Lead evidence vs sales knowledge */}
      <Chapter n="04" title={kn.t} className="bg-cinema-bg2">
        <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
          {[
            [kn.evidenceT, kn.evidenceQ, kn.evidenceD],
            null,
            [kn.salesT, kn.salesQ, kn.salesD],
          ].map((c, i) =>
            c ? (
              <div key={c[0]} className="border border-white/15 p-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-cinema-muted">{c[0]}</p>
                <p className="mt-4 font-display text-[26px] leading-[1.1] text-cinema-soft md:text-[30px]">{c[1]}</p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-cinema-text/65">{c[2]}</p>
              </div>
            ) : (
              <span key={i} aria-hidden="true" className="self-center justify-self-center font-display text-[32px] text-cinema-steel">
                +
              </span>
            ),
          )}
        </div>
        <div className="mt-6 grid gap-6">
          <Arrow down className="text-[18px]" />
          <Chain items={kn.chain} />
          <div className="border border-dashed border-white/25 p-5">
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cinema-cream">{kn.none}</p>
            <p className="mt-3 max-w-[40rem] text-[14.5px] leading-relaxed text-cinema-text/70">{kn.noneD}</p>
          </div>
        </div>
        <div className="mt-14 border-s border-white/15 ps-6">
          <Label>{kn.ragT}</Label>
          <p className="mt-4 max-w-[44rem] text-[15.5px] leading-relaxed text-cinema-text/75">{kn.rag}</p>
        </div>
      </Chapter>

      {/* 05 — Agent runtime */}
      <Chapter n="05" title={rt.t} lede={rt.d}>
        <ol className="border-t border-white/15">
          {rt.loop.map((s, i) => (
            <li key={s} className="flex items-baseline gap-5 border-b border-white/10 py-3.5">
              <span dir="ltr" className="w-6 shrink-0 font-mono text-[10.5px] tracking-[0.18em] text-cinema-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[15.5px] text-cinema-text">{s}</span>
              {i === rt.loop.length - 1 && (
                <span aria-hidden="true" className="ms-auto font-mono text-[15px] text-cinema-steel">
                  ↺
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-14">
          <Label>{rt.classesTitle}</Label>
          <dl className="mt-4 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {rt.classes.map((c) => (
              <div key={c.t} className="bg-cinema-bg p-5">
                <dt className="font-display text-[24px] leading-none text-cinema-soft">{c.t}</dt>
                <dd className="mt-3 text-[13.5px] leading-relaxed text-cinema-text/65">{c.d}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-cinema-muted">{rt.count}</p>
        </div>
        <Note className="mt-8">{rt.bounds}</Note>
      </Chapter>

      {/* 06 — Propose / execute */}
      <Chapter n="06" title={ap.t} className="bg-cinema-bg2">
        <blockquote className="border-s-2 border-cinema-cream/70 ps-6 font-display text-[28px] leading-[1.15] text-cinema-soft md:text-[40px]">
          {ap.quote}
        </blockquote>
        <ol className="mt-12 grid gap-x-10 md:grid-cols-2 md:[grid-auto-flow:column] md:[grid-template-rows:repeat(5,auto)]">
          {ap.chain.map((s, i) => (
            <li key={s} className="flex items-baseline gap-5 border-b border-white/10 py-3.5">
              <span dir="ltr" className="w-6 shrink-0 font-mono text-[10.5px] tracking-[0.18em] text-cinema-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`text-[15.5px] ${i === 3 ? 'text-cinema-cream' : 'text-cinema-text'}`}>{s}</span>
            </li>
          ))}
        </ol>
        <Note className="mt-8">{ap.d}</Note>
      </Chapter>

      {/* 07 — Same-run resume */}
      <Chapter n="07" title={rs.t} lede={rs.d}>
        <RunReplay labels={rs} />
        <Note className="mt-6">{rs.illustrative}</Note>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cinema-muted">{rs.sse}</p>
      </Chapter>

      <Section className="border-t border-white/10 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Label>{ver.t}</Label>
            <p className="mt-4 text-[15px] text-cinema-text/65">{ver.d}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {ver.rows.map((r) => (
              <div key={r.g} className="border-t border-white/20 pt-5">
                <p className="font-display text-[26px] leading-none text-cinema-soft">{r.g}</p>
                <ul className="mt-5 grid gap-2.5">
                  {r.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[14px] text-cinema-text/75">
                      <span aria-hidden="true" className="text-cinema-steel">
                        ✓
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Note className="sm:col-span-3">{ver.modes}</Note>
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/10 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Label>{a11y.t}</Label>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {a11y.items.map((it) => (
                <li key={it} className="border-b border-white/10 py-3 text-[15px] text-cinema-text/80">
                  {it}
                </li>
              ))}
            </ul>
            <Note className="mt-6">{a11y.note}</Note>
          </div>
        </div>
      </Section>

      <Evidence t={t} slug="prospectiq" className="border-t border-white/10" />
      <Architecture t={t} text={p('architecture')} stack={work.stack} url={work.githubUrl} />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
