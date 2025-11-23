export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type ServiceType = 'consultation' | 'meeting' | 'workshop' | 'training' | 'demo';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Booking {
  id: string;
  customer: Customer;
  service: ServiceType;
  title: string;
  description: string;
  status: BookingStatus;
  startDate: Date;
  endDate: Date;
  duration: number; // in minutes
  price: number;
  notes?: string;
  createdAt: Date;
}

export interface BookingFilters {
  status?: BookingStatus[];
  service?: ServiceType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
  revenue: number;
  todayBookings: number;
}
