'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold">404</CardTitle>
            <CardDescription className="text-lg">
              Page not found
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go to Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}