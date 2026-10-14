'use client';

import { useSyncExternalStore } from 'react';

/*
 * The visitor's own motion switch, on top of prefers-reduced-motion. Turning
 * it on gives the same result as the system setting: pinned scenes become
 * still frames, framer-motion stops transform animation, and the CSS loops
 * (marquee, scroll cue, pulses) stop through html[data-reduce-motion].
 * The choice is kept in this browser only.
 */

const KEY = 'yj-reduce-motion';
const listeners = new Set();
let forced = null;

function read() {
  try {
    return window.localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

function getSnapshot() {
  if (forced === null) {
    forced = read();
    document.documentElement.toggleAttribute('data-reduce-motion', forced);
  }
  return forced;
}

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function setForcedReducedMotion(on) {
  forced = on;
  try {
    if (on) window.localStorage.setItem(KEY, '1');
    else window.localStorage.removeItem(KEY);
  } catch {
    // Storage can be blocked; the switch still works for this visit.
  }
  document.documentElement.toggleAttribute('data-reduce-motion', on);
  listeners.forEach((l) => l());
}

/** True when the visitor has switched motion off on this site. Server snapshot is false. */
export function useForcedReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
