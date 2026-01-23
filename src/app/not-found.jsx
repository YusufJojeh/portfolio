import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-b from-slate-900 to-slate-950 text-white" suppressHydrationWarning>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
              404
            </h1>
            <p className="text-2xl mb-2">Page Not Found</p>
            <p className="text-slate-400 mb-8">
              The page you're looking for doesn't exist.
            </p>
            <Link
              href="/en"
              className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
