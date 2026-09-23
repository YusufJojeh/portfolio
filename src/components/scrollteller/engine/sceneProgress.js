'use client';

import { createContext, useContext } from 'react';

/** The 0→1 progress of the enclosing StickyScene track. */
export const SceneProgressContext = createContext(null);

export function useSceneProgress() {
  return useContext(SceneProgressContext);
}
