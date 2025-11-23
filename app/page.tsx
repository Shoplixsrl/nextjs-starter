import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, BarChart3, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <main className="flex flex-col items-center text-center space-y-16">
          {/* Hero Section */}
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Booking App Template
            </h1>
            <p className="text-xl text-muted-foreground">
              Un template completo per gestire prenotazioni con calendario interattivo, timeline e statistiche avanzate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/bookings">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/20 text-lg px-8">
                  Apri Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl pt-8">
            <Card className="p-6 space-y-4 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-xl transition-all hover:scale-105">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-semibold">Calendario Interattivo</h3>
                <p className="text-sm text-muted-foreground">
                  Visualizza tutte le prenotazioni in un calendario intuitivo con viste mensili, settimanali e giornaliere
                </p>
              </div>
            </Card>

            <Card className="p-6 space-y-4 border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5 hover:shadow-xl transition-all hover:scale-105">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-semibold">Timeline Animata</h3>
                <p className="text-sm text-muted-foreground">
                  Lista cronologica con animazioni fluide e dettagli completi per ogni prenotazione
                </p>
              </div>
            </Card>

            <Card className="p-6 space-y-4 border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5 hover:shadow-xl transition-all hover:scale-105">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <BarChart3 className="h-6 w-6 text-secondary" />
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-semibold">Statistiche Avanzate</h3>
                <p className="text-sm text-muted-foreground">
                  Dashboard con metriche di performance e analisi dettagliate delle prenotazioni
                </p>
              </div>
            </Card>
          </div>

          {/* Tech Stack */}
          <div className="w-full max-w-3xl pt-8">
            <Card className="p-8 bg-muted/50 border-2">
              <h3 className="text-2xl font-semibold mb-6">Stack Tecnologico</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="font-semibold text-primary">Next.js 15</div>
                  <div className="text-muted-foreground">App Router</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-primary">shadcn/ui</div>
                  <div className="text-muted-foreground">46 componenti</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-primary">Framer Motion</div>
                  <div className="text-muted-foreground">Animazioni</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-primary">TypeScript</div>
                  <div className="text-muted-foreground">Type-safe</div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
