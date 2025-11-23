'use client';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { it } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Booking } from '@/lib/bookings/types';
import { cn } from '@/lib/utils';
import './calendar-styles.css';

const locales = {
  it: it,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarViewProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
}

const statusColors = {
  pending: 'bg-amber-500/10 border-amber-500/50 text-amber-700 dark:text-amber-300',
  confirmed: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-700 dark:text-emerald-300',
  cancelled: 'bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-300',
  completed: 'bg-blue-500/10 border-blue-500/50 text-blue-700 dark:text-blue-300',
};

export function CalendarView({ bookings, onSelectBooking, onSelectSlot }: CalendarViewProps) {
  const events = bookings.map((booking) => ({
    id: booking.id,
    title: booking.title,
    start: booking.startDate,
    end: booking.endDate,
    resource: booking,
  }));

  return (
    <div className="h-[800px] rounded-lg border border-border bg-card p-6 shadow-lg">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        culture="it"
        onSelectEvent={(event) => onSelectBooking(event.resource)}
        onSelectSlot={(slotInfo) => onSelectSlot(slotInfo)}
        selectable
        popup
        eventPropGetter={(event) => {
          const booking = event.resource as Booking;
          return {
            className: cn(
              'border-l-4 px-2 py-1 rounded-md text-xs font-medium transition-all hover:shadow-md',
              statusColors[booking.status]
            ),
          };
        }}
        components={{
          event: ({ event }) => {
            const booking = event.resource as Booking;
            return (
              <div className="flex flex-col gap-0.5">
                <div className="font-semibold truncate">{event.title}</div>
                <div className="text-xs opacity-80 truncate">{booking.customer.name}</div>
              </div>
            );
          },
        }}
        className="booking-calendar"
      />
    </div>
  );
}
