'use client';

import { useCallback } from 'react';

/**
 * A pinned scene hides its copy by scroll position, so a keyboard user can tab
 * onto a link that is still invisible. Attach the returned handler to the layer
 * that holds the link: when focus lands there outside its readable range
 * `[from, to]` of the track's progress, the page jumps to progress `at`.
 */
export function useRevealOnFocus(progress, [from, to], at) {
  return useCallback(
    (event) => {
      const v = progress.get();
      if (v >= from && v <= to) return;
      const track = event.currentTarget.closest('section');
      if (!track) return;
      const top = track.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + at * (track.offsetHeight - window.innerHeight), behavior: 'instant' });
    },
    [progress, from, to, at],
  );
}
