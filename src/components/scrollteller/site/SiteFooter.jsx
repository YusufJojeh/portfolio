import { getTranslations } from 'next-intl/server';
import { CONTACT } from '../contact';
import MotionToggle from './MotionToggle';

export default async function SiteFooter({ locale }) {
  const t = await getTranslations({ locale, namespace: 'final' });
  const year = new Date().getFullYear();
  const links = [
    { label: t('closing.email'), href: `mailto:${CONTACT.email}` },
    { label: t('closing.github'), href: CONTACT.github },
    { label: t('closing.linkedin'), href: CONTACT.linkedin },
    { label: t('closing.cv'), href: CONTACT.cv, download: true },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-cinema-bg px-6 py-10 md:px-12 lg:px-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="name-script font-grotesk text-[15px] font-medium text-cinema-cream">{t('nav.name')}</p>
          <p className="mt-1.5 text-[13px] text-cinema-muted">{t('footer.role')}</p>
          <p className="mt-0.5 text-[13px] text-cinema-muted">{t('footer.location')}</p>
          <p className="mt-0.5 text-[13px] text-cinema-muted">{t('closing.availability')}</p>
        </div>
        <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[13px]">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...(l.download ? { download: true, hrefLang: 'en', type: 'application/pdf' } : {})}
                className="hit text-cinema-text/80 transition-colors duration-200 hover:text-cinema-cream"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-7 gap-y-4 border-t border-white/5 pt-6 font-mono text-[11px] tracking-[0.14em] text-cinema-muted">
        <span dir="ltr">© {year} Yusuf Mohammad Jojeh</span>
        <div className="flex items-center gap-7">
          <MotionToggle label={t('footer.motion')} systemNote={t('footer.motionSystem')} />
          <a href="#content" className="hit uppercase transition-colors duration-200 hover:text-cinema-cream">
            {t('footer.top')}
          </a>
        </div>
      </div>
    </footer>
  );
}
