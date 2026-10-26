'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { CONTACT } from '../contact';

// One delegated listener instead of an onClick on every link, so server-rendered
// links (footer) are counted too. Placement is the nearest landmark.
function placement(el) {
  if (el.closest('header, #site-drawer')) return 'nav';
  if (el.closest('footer')) return 'footer';
  return el.closest('section[id], [id]')?.id || 'page';
}

function channel(href) {
  if (href.startsWith('mailto:')) return 'email';
  if (href === CONTACT.github) return 'github';
  if (href === CONTACT.linkedin) return 'linkedin';
  return null;
}

export default function ClickTracking({ locale }) {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href === CONTACT.cv) {
        track('cv_download', { locale, placement: placement(a) });
        return;
      }
      const c = channel(href);
      if (c) track('contact_click', { locale, channel: c, placement: placement(a) });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [locale]);

  return null;
}
