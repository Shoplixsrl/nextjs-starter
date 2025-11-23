'use client';

import { Booking, BookingStatus } from '@/lib/bookings/types';
import { format, isToday, isTomorrow, isYesterday, isPast, isFuture } from 'date-fns';
import { it } from 'date-fns/locale';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, User, Calendar, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TimelineViewProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
}

const statusConfig: Record<
  BookingStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  pending: { label: 'In Attesa', variant: 'outline' },
  confirmed: { label: 'Confermata', variant: 'default' },
  cancelled: { label: 'Annullata', variant: 'destructive' },
  completed: { label: 'Completata', variant: 'secondary' },
};

const serviceLabels = {
  consultation: 'Consulenza',
  meeting: 'Riunione',
  workshop: 'Workshop',
  training: 'Formazione',
  demo: 'Demo',
};

function getDateLabel(date: Date): string {
  if (isToday(date)) return 'Oggi';
  if (isTomorrow(date)) return 'Domani';
  if (isYesterday(date)) return 'Ieri';
  return format(date, 'EEEE d MMMM yyyy', { locale: it });
}

export function TimelineView({ bookings, onSelectBooking }: TimelineViewProps) {
  // Group bookings by date
  const groupedBookings = bookings.reduce(
    (groups, booking) => {
      const dateKey = format(booking.startDate, 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(booking);
      return groups;
    },
    {} as Record<string, Booking[]>
  );

  const sortedDates = Object.keys(groupedBookings).sort();

  return (
    <div className="space-y-8">
      {sortedDates.map((dateKey, groupIndex) => {
        const dayBookings = groupedBookings[dateKey];
        const date = new Date(dateKey);
        const isInPast = isPast(date) && !isToday(date);
        const isInFuture = isFuture(date) || isToday(date);

        return (
          <motion.div
            key={dateKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.05 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold',
                  isToday(date) && 'bg-primary text-primary-foreground ring-2 ring-primary/20',
                  !isToday(date) && 'bg-muted text-muted-foreground'
                )}
              >
                {format(date, 'd')}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold capitalize">{getDateLabel(date)}</h3>
                <p className="text-sm text-muted-foreground">
                  {dayBookings.length} {dayBookings.length === 1 ? 'prenotazione' : 'prenotazioni'}
                </p>
              </div>
            </div>

            <div className="ml-5 space-y-3 border-l-2 border-border pl-8">
              {dayBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (groupIndex * 0.05) + (index * 0.03) }}
                >
                  <Card
                    className={cn(
                      'group relative cursor-pointer overflow-hidden transition-all hover:shadow-lg',
                      'border-l-4',
                      booking.status === 'pending' && 'border-l-amber-500',
                      booking.status === 'confirmed' && 'border-l-emerald-500',
                      booking.status === 'cancelled' && 'border-l-red-500',
                      booking.status === 'completed' && 'border-l-blue-500'
                    )}
                    onClick={() => onSelectBooking(booking)}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {booking.customer.avatar}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-2">
                            <div>
                              <h4 className="font-semibold text-base group-hover:text-primary transition-colors">
                                {booking.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <User className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {booking.customer.name}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                <span>
                                  {format(booking.startDate, 'HH:mm')} -{' '}
                                  {format(booking.endDate, 'HH:mm')}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{booking.duration} min</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <DollarSign className="h-3.5 w-3.5" />
                                <span>€{booking.price.toFixed(2)}</span>
                              </div>
                            </div>

                            {booking.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {booking.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={statusConfig[booking.status].variant}>
                            {statusConfig[booking.status].label}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {serviceLabels[booking.service]}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nessuna prenotazione</h3>
          <p className="text-sm text-muted-foreground">
            Non ci sono prenotazioni da visualizzare con i filtri attuali.
          </p>
        </div>
      )}
    </div>
  );
}
