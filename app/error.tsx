'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw, Copy, Check } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // Log the error to an error reporting service in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by error boundary:', error);
    }
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === 'development';

  const copyErrorToClipboard = async () => {
    const errorData = {
      timestamp: new Date().toISOString(),
      message: error.message || 'Unknown error occurred',
      digest: error.digest || 'No digest available',
      stack: error.stack || 'No stack trace available',
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(errorData, null, 2));
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy error to clipboard:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <CardTitle>Something went wrong!</CardTitle>
          </div>
          <CardDescription>
            An error occurred while processing your request.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isDevelopment ? (
            <>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Details (Development Only)</AlertTitle>
                <AlertDescription className="mt-2">
                  <div className="space-y-2">
                    <p className="font-mono text-sm break-all">
                      {error.message || 'Unknown error occurred'}
                    </p>
                    {error.digest && (
                      <p className="text-xs text-muted-foreground">
                        Digest: {error.digest}
                      </p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
              
              {error.stack && (
                <details className="cursor-pointer">
                  <summary className="text-sm font-medium">Stack Trace</summary>
                  <pre className="mt-2 p-4 bg-muted rounded-lg overflow-x-auto text-xs">
                    {error.stack}
                  </pre>
                </details>
              )}
            </>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Oops!</AlertTitle>
              <AlertDescription>
                We encountered an unexpected error. Our team has been notified and is working on a fix.
                Please try again in a few moments.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter className="flex gap-4">
          <Button 
            onClick={reset}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          {isDevelopment && (
            <Button 
              variant="outline"
              onClick={copyErrorToClipboard}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Error
                </>
              )}
            </Button>
          )}
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/'}
          >
            Go to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}