'use client';

import { BookingStatus, ServiceType } from '@/lib/bookings/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Search, Calendar as CalendarIcon, X, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

export interface FilterState {
  search: string;
  status: BookingStatus[];
  service: ServiceType[];
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
}

interface BookingFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeFiltersCount: number;
}

const statusOptions: { value: BookingStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'In Attesa', color: 'bg-amber-500' },
  { value: 'confirmed', label: 'Confermata', color: 'bg-emerald-500' },
  { value: 'cancelled', label: 'Annullata', color: 'bg-red-500' },
  { value: 'completed', label: 'Completata', color: 'bg-blue-500' },
];

const serviceOptions: { value: ServiceType; label: string }[] = [
  { value: 'consultation', label: 'Consulenza' },
  { value: 'meeting', label: 'Riunione' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'training', label: 'Formazione' },
  { value: 'demo', label: 'Demo' },
];

export function BookingFilters({ filters, onFiltersChange, activeFiltersCount }: BookingFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleStatus = (status: BookingStatus) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    onFiltersChange({ ...filters, status: newStatus });
  };

  const toggleService = (service: ServiceType) => {
    const newService = filters.service.includes(service)
      ? filters.service.filter((s) => s !== service)
      : [...filters.service, service];
    onFiltersChange({ ...filters, service: newService });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: [],
      service: [],
      dateFrom: undefined,
      dateTo: undefined,
    });
  };

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Filter className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Filtri</h3>
            <p className="text-sm text-muted-foreground">
              {hasActiveFilters ? `${activeFiltersCount} filtri attivi` : 'Nessun filtro attivo'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9">
              <X className="h-4 w-4 mr-1" />
              Cancella
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-9"
          >
            {isExpanded ? 'Nascondi' : 'Espandi'}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca per nome cliente, titolo o descrizione..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-9 h-11"
        />
      </div>

      {/* Expanded Filters */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="space-y-4 pt-2">
          {/* Status Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Stato</Label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={filters.status.includes(option.value) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-all hover:scale-105',
                    filters.status.includes(option.value) && 'shadow-md'
                  )}
                  onClick={() => toggleStatus(option.value)}
                >
                  <div className={cn('h-2 w-2 rounded-full mr-1.5', option.color)} />
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Service Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Tipo di Servizio</Label>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={filters.service.includes(option.value) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-all hover:scale-105',
                    filters.service.includes(option.value) && 'shadow-md'
                  )}
                  onClick={() => toggleService(option.value)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Data Inizio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal h-11',
                      !filters.dateFrom && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateFrom ? (
                      format(filters.dateFrom, 'PPP', { locale: it })
                    ) : (
                      <span>Seleziona data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateFrom}
                    onSelect={(date) => onFiltersChange({ ...filters, dateFrom: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Data Fine</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal h-11',
                      !filters.dateTo && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateTo ? (
                      format(filters.dateTo, 'PPP', { locale: it })
                    ) : (
                      <span>Seleziona data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateTo}
                    onSelect={(date) => onFiltersChange({ ...filters, dateTo: date })}
                    disabled={(date) =>
                      filters.dateFrom ? date < filters.dateFrom : false
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
