'use client';

import React, { Component, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Copy, Check } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  isolate?: boolean;
  level?: 'page' | 'section' | 'component';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorCount: number;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: NodeJS.Timeout | null = null;
  private errorCounter = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
      copied: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError } = this.props;
    
    // Log error details in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 ErrorBoundary caught an error (Level: ${this.props.level || 'component'})`);
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // Update error count
    this.errorCounter++;
    this.setState({
      errorInfo,
      errorCount: this.errorCounter,
    });

    // Auto-reset after multiple errors (circuit breaker pattern)
    if (this.errorCounter >= 3) {
      if (this.resetTimeoutId) {
        clearTimeout(this.resetTimeoutId);
      }
      this.resetTimeoutId = setTimeout(() => {
        this.resetErrorBoundary();
        this.errorCounter = 0;
      }, 5000);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;
    
    // Reset on prop changes if specified
    if (hasError && prevProps.resetKeys !== resetKeys && resetOnPropsChange) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
      this.resetTimeoutId = null;
    }
    
    this.errorCounter = 0;
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
      copied: false,
    });
  };

  copyErrorToClipboard = async () => {
    const { error, errorInfo, errorCount } = this.state;
    
    if (!error) return;

    const errorData = {
      timestamp: new Date().toISOString(),
      level: this.props.level || 'component',
      errorCount,
      message: error.message || 'Unknown error',
      stack: error.stack || 'No stack trace available',
      componentStack: errorInfo?.componentStack || 'No component stack available',
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(errorData, null, 2));
      this.setState({ copied: true });
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy error to clipboard:', err);
    }
  };

  render() {
    const { hasError, error, errorInfo, errorCount, copied } = this.state;
    const { children, fallback, isolate = true, level = 'component' } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return <>{fallback}</>;
      }

      const isDevelopment = process.env.NODE_ENV === 'development';

      // Default error UI based on level
      const errorUI = (
        <div className={`${isolate ? 'p-4' : 'min-h-[200px] flex items-center justify-center p-4'}`}>
          <div className="w-full max-w-2xl">
            <Alert variant={isDevelopment ? 'destructive' : 'default'}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {level === 'page' && 'Page Error'}
                {level === 'section' && 'Section Error'}
                {level === 'component' && 'Component Error'}
                {!level && 'Something went wrong'}
              </AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <p>
                  {isDevelopment
                    ? error.message || 'An unexpected error occurred'
                    : 'We encountered an issue displaying this content.'}
                </p>
                
                {isDevelopment && (
                  <>
                    {errorCount > 1 && (
                      <p className="text-xs text-muted-foreground">
                        Error occurred {errorCount} times
                      </p>
                    )}
                    
                    {errorInfo && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-xs font-medium">
                          Component Stack
                        </summary>
                        <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-x-auto">
                          {errorInfo.componentStack}
                        </pre>
                      </details>
                    )}

                    {error.stack && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-xs font-medium">
                          Error Stack
                        </summary>
                        <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-x-auto">
                          {error.stack}
                        </pre>
                      </details>
                    )}
                  </>
                )}
                
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    onClick={this.resetErrorBoundary}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Try Again
                  </Button>
                  {isDevelopment && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={this.copyErrorToClipboard}
                      className="flex items-center gap-1"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy Error
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      );

      return errorUI;
    }

    return children;
  }
}

// Convenience wrapper for functional components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}