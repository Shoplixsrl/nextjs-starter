'use client';

import { Booking, BookingStatus, ServiceType } from '@/lib/bookings/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Clock,
  DollarSign,
  Mail,
  Phone,
  User,
  FileText,
  Tag,
  X,
  Edit2,
  Check,
  Ban,
} from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  booking: Booking | null;
  open: boolean;
  onClose: () => void;
  onUpdateStatus?: (bookingId: string, status: BookingStatus) => void;
}

const statusConfig: Record<BookingStatus, { label: string; icon: React.ReactNode; color: string }> = {
  pending: {
    label: 'In Attesa',
    icon: <Clock className="h-4 w-4" />,
    color: 'text-amber-600 dark:text-amber-400',
  },
  confirmed: {
    label: 'Confermata',
    icon: <Check className="h-4 w-4" />,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  cancelled: {
    label: 'Annullata',
    icon: <Ban className="h-4 w-4" />,
    color: 'text-red-600 dark:text-red-400',
  },
  completed: {
    label: 'Completata',
    icon: <Check className="h-4 w-4" />,
    color: 'text-blue-600 dark:text-blue-400',
  },
};

const serviceLabels = {
  consultation: 'Consulenza',
  meeting: 'Riunione',
  workshop: 'Workshop',
  training: 'Formazione',
  demo: 'Demo',
};

export function BookingModal({ booking, open, onClose, onUpdateStatus }: BookingModalProps) {
  if (!booking) return null;

  const statusActions: { status: BookingStatus; label: string; variant: 'default' | 'outline' | 'destructive' }[] = [
    { status: 'confirmed', label: 'Conferma', variant: 'default' },
    { status: 'completed', label: 'Completa', variant: 'outline' },
    { status: 'cancelled', label: 'Annulla', variant: 'destructive' },
  ];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold mb-2">{booking.title}</DialogTitle>
                  <DialogDescription className="text-base">
                    Dettagli completi della prenotazione
                  </DialogDescription>
                </div>
                <Badge
                  variant="outline"
                  className={cn('flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold', statusConfig[booking.status].color)}
                >
                  {statusConfig[booking.status].icon}
                  {statusConfig[booking.status].label}
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Customer Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-lg border border-border bg-muted/50 p-4"
              >
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Informazioni Cliente
                </h3>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                      {booking.customer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{booking.customer.name}</p>
                    <div className="flex flex-col gap-1 mt-1.5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        <a
                          href={`mailto:${booking.customer.email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {booking.customer.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        <a
                          href={`tel:${booking.customer.phone}`}
                          className="hover:text-primary transition-colors"
                        >
                          {booking.customer.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Booking Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">Data e Ora</span>
                  </div>
                  <p className="font-semibold">
                    {format(booking.startDate, 'EEEE d MMMM yyyy', { locale: it })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(booking.startDate, 'HH:mm')} - {format(booking.endDate, 'HH:mm')}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">Durata</span>
                  </div>
                  <p className="font-semibold">{booking.duration} minuti</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {(booking.duration / 60).toFixed(1)} ore
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Tag className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">Servizio</span>
                  </div>
                  <p className="font-semibold">{serviceLabels[booking.service]}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {booking.service}
                  </Badge>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">Prezzo</span>
                  </div>
                  <p className="font-semibold text-2xl">€{booking.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    €{(booking.price / (booking.duration / 60)).toFixed(2)}/ora
                  </p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Descrizione</span>
                </div>
                <p className="text-sm leading-relaxed p-4 rounded-lg border border-border bg-muted/30">
                  {booking.description}
                </p>
              </motion.div>

              {/* Notes */}
              {booking.notes && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4"
                >
                  <p className="text-sm font-medium mb-1 text-amber-700 dark:text-amber-400">Note:</p>
                  <p className="text-sm text-muted-foreground">{booking.notes}</p>
                </motion.div>
              )}

              <Separator />

              {/* Actions */}
              {onUpdateStatus && booking.status !== 'completed' && booking.status !== 'cancelled' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {statusActions
                    .filter((action) => action.status !== booking.status)
                    .map((action) => (
                      <Button
                        key={action.status}
                        variant={action.variant}
                        onClick={() => {
                          onUpdateStatus(booking.id, action.status);
                          onClose();
                        }}
                        className="flex items-center gap-2"
                      >
                        {statusConfig[action.status].icon}
                        {action.label}
                      </Button>
                    ))}
                </motion.div>
              )}

              <div className="flex justify-between items-center text-xs text-muted-foreground pt-2">
                <span>
                  Creata il {format(booking.createdAt, 'dd/MM/yyyy HH:mm', { locale: it })}
                </span>
                <span>ID: {booking.id}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
