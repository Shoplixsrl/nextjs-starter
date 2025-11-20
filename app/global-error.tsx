'use client';

import { useEffect } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log critical errors in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Critical error caught by global error boundary:', error);
    }
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="space-y-4">
              <svg
                className="mx-auto h-16 w-16 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              
              <h1 className="text-3xl font-bold tracking-tight">
                Critical Application Error
              </h1>
              
              <p className="text-muted-foreground">
                {isDevelopment 
                  ? 'A critical error occurred in the application root.'
                  : 'Something went terribly wrong. Please refresh the page or try again later.'
                }
              </p>

              {isDevelopment && error && (
                <div className="mt-4 p-4 bg-destructive/10 rounded-lg text-left">
                  <p className="text-sm font-mono text-destructive break-all">
                    {error.message || 'Unknown critical error'}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Digest: {error.digest}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}