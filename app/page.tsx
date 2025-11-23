import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Calendar,
  LayoutGrid,
  Users,
  Clock,
  BarChart3,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  BookingAI
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Restaurant SaaS</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium hover:text-violet-600 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-violet-600 transition-colors">
                Pricing
              </Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-violet-600 transition-colors">
                Dashboard
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700" asChild>
                <Link href="/signup">Inizia Gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800">
            🚀 Annichilisci la Concorrenza
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Gestione Ristorante
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Potenziata dall'AI
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            La piattaforma SaaS multi-tenant che domina il mercato con AI, analytics avanzati e zero commissioni.
            Superiore a FoodCost, Pienissimo e OpenTable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-lg h-14 px-8" asChild>
              <Link href="/signup">
                Inizia Gratis <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
              <Link href="/demo">
                Vedi Demo
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>14 giorni gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Zero commissioni</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Setup in 5 minuti</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
            Features Killer
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Tutto ciò di cui hai bisogno
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Funzionalità enterprise che superano qualsiasi concorrente
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="p-6 border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} w-fit mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl p-12 md:p-16 text-white">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-violet-100">Accuratezza AI</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">40%</div>
              <div className="text-violet-100">Riduzione No-Show</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">0%</div>
              <div className="text-violet-100">Commissioni</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">
            Pronto a Dominare il Mercato?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Unisciti ai ristoranti che hanno scelto l'eccellenza
          </p>
          <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-lg h-14 px-8" asChild>
            <Link href="/signup">
              Inizia Ora Gratis <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold">BookingAI</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                La rivoluzione della gestione ristoranti
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Prodotto</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="/demo">Demo</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Azienda</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><Link href="/about">Chi Siamo</Link></li>
                <li><Link href="/contact">Contatti</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legale</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/gdpr">GDPR</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            © 2025 BookingAI. Made with ❤️ to revolutionize restaurant management.
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Sparkles,
    title: "AI Optimization",
    description: "Ottimizzazione automatica tavoli con machine learning e predizione no-show al 95%",
    gradient: "from-violet-600 to-purple-600"
  },
  {
    icon: Calendar,
    title: "Prenotazioni Intelligenti",
    description: "Sistema prenotazioni multi-source con conferme automatiche via Email/SMS/WhatsApp",
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    icon: LayoutGrid,
    title: "Table Management",
    description: "Gestione tavoli drag-and-drop con planimetrie interattive e stato real-time",
    gradient: "from-emerald-600 to-green-600"
  },
  {
    icon: Clock,
    title: "Waitlist Digitale",
    description: "Sistema code automatico con notifiche SMS quando il tavolo è pronto (Fila Fast)",
    gradient: "from-amber-600 to-orange-600"
  },
  {
    icon: Users,
    title: "CRM 360°",
    description: "Profili clienti completi con preferenze, storico visite e programmi fedeltà",
    gradient: "from-pink-600 to-rose-600"
  },
  {
    icon: BarChart3,
    title: "Analytics Avanzati",
    description: "Dashboard real-time con insights predittivi e report personalizzati PDF/Excel",
    gradient: "from-indigo-600 to-blue-600"
  },
  {
    icon: Zap,
    title: "Real-Time Sync",
    description: "Aggiornamenti istantanei su tutti i dispositivi con WebSocket",
    gradient: "from-yellow-600 to-amber-600"
  },
  {
    icon: Shield,
    title: "Multi-Tenant Sicuro",
    description: "Isolamento completo dati tra ristoranti, GDPR compliant, sicurezza enterprise",
    gradient: "from-red-600 to-pink-600"
  },
  {
    icon: TrendingUp,
    title: "Zero Commissioni",
    description: "Nessuna commissione per prenotazione. I tuoi dati rimangono tuoi per sempre",
    gradient: "from-teal-600 to-emerald-600"
  }
];
