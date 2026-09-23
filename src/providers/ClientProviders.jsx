'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

export function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
