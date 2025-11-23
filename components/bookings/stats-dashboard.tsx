'use client';

import { BookingStats } from '@/lib/bookings/types';
import { Card } from '@/components/ui/card';
import { CalendarDays, Clock, CheckCircle2, XCircle, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatsDashboardProps {
  stats: BookingStats;
}

const statCards = [
  {
    key: 'total' as const,
    label: 'Totale Prenotazioni',
    icon: CalendarDays,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    key: 'pending' as const,
    label: 'In Attesa',
    icon: Clock,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    key: 'confirmed' as const,
    label: 'Confermate',
    icon: CheckCircle2,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    key: 'completed' as const,
    label: 'Completate',
    icon: CheckCircle2,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    key: 'cancelled' as const,
    label: 'Annullate',
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-500/10',
  },
  {
    key: 'todayBookings' as const,
    label: 'Oggi',
    icon: TrendingUp,
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-500/10',
  },
];

export function StatsDashboard({ stats }: StatsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Revenue Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-6 shadow-xl">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Ricavi Totali
              </p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                €{stats.revenue.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                Da {stats.completed} prenotazioni completate
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">
              <DollarSign className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((statCard, index) => {
          const Icon = statCard.icon;
          const value = stats[statCard.key];

          return (
            <motion.div
              key={statCard.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className={cn(
                "relative overflow-hidden p-5 transition-all hover:shadow-lg hover:scale-105 cursor-default",
                "border border-border"
              )}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", statCard.bgColor)}>
                      <Icon className={cn("h-5 w-5", statCard.color)} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {statCard.label}
                    </p>
                  </div>
                </div>

                {/* Decorative gradient */}
                <div className={cn(
                  "absolute bottom-0 left-0 right-0 h-1 opacity-50",
                  statCard.bgColor
                )} />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="p-5 border-emerald-500/30 bg-emerald-500/5">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Tasso Conferma
              </p>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {stats.total > 0 ? ((stats.confirmed / stats.total) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-muted-foreground">
                {stats.confirmed} su {stats.total} prenotazioni
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.45 }}
        >
          <Card className="p-5 border-blue-500/30 bg-blue-500/5">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Tasso Completamento
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-muted-foreground">
                {stats.completed} su {stats.total} prenotazioni
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="p-5 border-primary/30 bg-primary/5">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Revenue Medio
              </p>
              <p className="text-3xl font-bold text-primary">
                €{stats.completed > 0 ? (stats.revenue / stats.completed).toFixed(2) : '0.00'}
              </p>
              <p className="text-xs text-muted-foreground">
                Per prenotazione completata
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
