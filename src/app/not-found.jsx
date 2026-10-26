import Link from 'next/link';
import '@/styles/globals.css';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-cinema-bg font-sans text-cinema-text">
        <main className="flex min-h-screen flex-col items-start justify-center gap-6 px-6 md:px-16">
          <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-cinema-muted">404</p>
          <h1 className="text-[40px] leading-tight text-cinema-soft">This page does not exist.</h1>
          <Link
            href="/en"
            className="inline-flex items-center rounded-[3px] bg-cinema-cream px-5 py-3 text-[14px] font-medium text-cinema-bg transition-colors hover:bg-cinema-soft"
          >
            Go to the home page
          </Link>
        </main>
      </body>
    </html>
  );
}
