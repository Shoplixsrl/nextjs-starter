'use client';

import { useState, useMemo } from 'react';
import { mockBookings, getBookingStats } from '@/lib/bookings/mock-data';
import { Booking, BookingStatus } from '@/lib/bookings/types';
import { CalendarView } from '@/components/bookings/calendar-view';
import { TimelineView } from '@/components/bookings/timeline-view';
import { BookingModal } from '@/components/bookings/booking-modal';
import { BookingFilters, FilterState } from '@/components/bookings/booking-filters';
import { StatsDashboard } from '@/components/bookings/stats-dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, List, Plus, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'calendar' | 'timeline' | 'stats'>('calendar');

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: [],
    service: [],
    dateFrom: undefined,
    dateTo: undefined,
  });

  // Filter bookings based on filters
  const filteredBookings = useMemo(() => {
    return mockBookings.filter((booking) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          booking.title.toLowerCase().includes(searchLower) ||
          booking.customer.name.toLowerCase().includes(searchLower) ||
          booking.description.toLowerCase().includes(searchLower) ||
          booking.customer.email.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(booking.status)) {
        return false;
      }

      // Service filter
      if (filters.service.length > 0 && !filters.service.includes(booking.service)) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom && booking.startDate < filters.dateFrom) {
        return false;
      }

      if (filters.dateTo) {
        const endOfDay = new Date(filters.dateTo);
        endOfDay.setHours(23, 59, 59, 999);
        if (booking.startDate > endOfDay) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const stats = useMemo(() => getBookingStats(filteredBookings), [filteredBookings]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    count += filters.status.length;
    count += filters.service.length;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    return count;
  }, [filters]);

  const handleSelectBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    // In a real app, this would open a create booking modal
    console.log('Selected slot:', slotInfo);
  };

  const handleUpdateStatus = (bookingId: string, newStatus: BookingStatus) => {
    // In a real app, this would update the booking in the backend
    console.log('Update booking', bookingId, 'to status', newStatus);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Gestione Prenotazioni
            </h1>
            <p className="text-muted-foreground mt-2">
              Visualizza e gestisci tutte le tue prenotazioni in un unico posto
            </p>
          </div>
          <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
            <Plus className="h-5 w-5" />
            Nuova Prenotazione
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <BookingFilters
            filters={filters}
            onFiltersChange={setFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs
            value={activeView}
            onValueChange={(value) => setActiveView(value as 'calendar' | 'timeline' | 'stats')}
            className="space-y-6"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3 h-12">
              <TabsTrigger value="calendar" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Calendario</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="gap-2">
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Statistiche</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Vista Calendario</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredBookings.length} {filteredBookings.length === 1 ? 'prenotazione trovata' : 'prenotazioni trovate'}
                  </p>
                </div>
              </div>
              <CalendarView
                bookings={filteredBookings}
                onSelectBooking={handleSelectBooking}
                onSelectSlot={handleSelectSlot}
              />
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Vista Timeline</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredBookings.length} {filteredBookings.length === 1 ? 'prenotazione trovata' : 'prenotazioni trovate'}
                  </p>
                </div>
              </div>
              <TimelineView bookings={filteredBookings} onSelectBooking={handleSelectBooking} />
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold">Statistiche e Metriche</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Analisi delle performance delle prenotazioni
                </p>
              </div>
              <StatsDashboard stats={stats} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Booking Details Modal */}
      <BookingModal
        booking={selectedBooking}
        open={isModalOpen}
        onClose={handleCloseModal}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
