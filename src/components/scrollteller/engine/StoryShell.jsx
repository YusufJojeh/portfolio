import MotionRoot from './MotionRoot';
import ScrollProgress from './ScrollProgress';
import SiteNav from '../site/SiteNav';
import SiteFooter from '../site/SiteFooter';

/** Page chrome for the cinematic experience: nav, progress, main, footer. */
export default function StoryShell({ locale, rail = true, children }) {
  return (
    <MotionRoot>
      <div className="cinema-root relative min-h-screen bg-cinema-bg font-sans text-cinema-text antialiased">
        <SiteNav />
        <ScrollProgress showRail={rail} />
        <main id="content" tabIndex={-1} className="relative outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </div>
    </MotionRoot>
  );
}
