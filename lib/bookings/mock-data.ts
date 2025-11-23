import { Booking, Customer, BookingStatus, ServiceType } from './types';

const customers: Customer[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    phone: '+39 320 123 4567',
    avatar: 'MR',
  },
  {
    id: '2',
    name: 'Giulia Bianchi',
    email: 'giulia.bianchi@example.com',
    phone: '+39 331 234 5678',
    avatar: 'GB',
  },
  {
    id: '3',
    name: 'Luca Ferrari',
    email: 'luca.ferrari@example.com',
    phone: '+39 342 345 6789',
    avatar: 'LF',
  },
  {
    id: '4',
    name: 'Sofia Romano',
    email: 'sofia.romano@example.com',
    phone: '+39 353 456 7890',
    avatar: 'SR',
  },
  {
    id: '5',
    name: 'Alessandro Conti',
    email: 'alessandro.conti@example.com',
    phone: '+39 364 567 8901',
    avatar: 'AC',
  },
  {
    id: '6',
    name: 'Chiara Ricci',
    email: 'chiara.ricci@example.com',
    phone: '+39 375 678 9012',
    avatar: 'CR',
  },
  {
    id: '7',
    name: 'Francesco Marino',
    email: 'francesco.marino@example.com',
    phone: '+39 386 789 0123',
    avatar: 'FM',
  },
  {
    id: '8',
    name: 'Elena Greco',
    email: 'elena.greco@example.com',
    phone: '+39 397 890 1234',
    avatar: 'EG',
  },
];

const getRandomCustomer = () => customers[Math.floor(Math.random() * customers.length)];

const serviceTypes: ServiceType[] = ['consultation', 'meeting', 'workshop', 'training', 'demo'];
const statuses: BookingStatus[] = ['pending', 'confirmed', 'cancelled', 'completed'];

const serviceTitles: Record<ServiceType, string[]> = {
  consultation: ['Consulenza Strategica', 'Consulenza Tecnica', 'Consulenza Marketing'],
  meeting: ['Riunione di Allineamento', 'Meeting di Progetto', 'Presentazione Risultati'],
  workshop: ['Workshop Design Thinking', 'Workshop Agile', 'Workshop Innovation'],
  training: ['Formazione Team', 'Training Onboarding', 'Corso Avanzato'],
  demo: ['Demo Prodotto', 'Presentazione Soluzione', 'Demo Piattaforma'],
};

const descriptions: string[] = [
  'Discussione degli obiettivi e delle strategie per il prossimo trimestre',
  'Revisione dei progressi del progetto e pianificazione delle prossime milestone',
  'Sessione di brainstorming per nuove funzionalità del prodotto',
  'Presentazione della roadmap e raccolta feedback dal team',
  'Analisi dei KPI e definizione delle azioni correttive',
  'Workshop collaborativo per migliorare i processi interni',
];

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateMockBookings(count: number = 50): Booking[] {
  const bookings: Booking[] = [];
  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const twoMonthsLater = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate());

  for (let i = 1; i <= count; i++) {
    const service = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
    const customer = getRandomCustomer();
    const startDate = getRandomDate(oneMonthAgo, twoMonthsLater);
    const duration = [30, 60, 90, 120, 180][Math.floor(Math.random() * 5)];
    const endDate = new Date(startDate.getTime() + duration * 60000);

    // Set status based on date
    let status: BookingStatus;
    if (startDate < now) {
      status = Math.random() > 0.2 ? 'completed' : 'cancelled';
    } else {
      status = Math.random() > 0.3 ? 'confirmed' : 'pending';
    }

    const titles = serviceTitles[service];
    const title = titles[Math.floor(Math.random() * titles.length)];

    bookings.push({
      id: `booking-${i}`,
      customer,
      service,
      title,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      status,
      startDate,
      endDate,
      duration,
      price: duration * (2 + Math.random() * 3), // €2-5 per minute
      notes: Math.random() > 0.7 ? 'Note importanti per questa prenotazione' : undefined,
      createdAt: new Date(startDate.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    });
  }

  return bookings.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

export const mockBookings = generateMockBookings(50);

export function getBookingStats(bookings: Booking[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  return {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    revenue: bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.price, 0),
    todayBookings: bookings.filter(
      b => b.startDate >= today && b.startDate < tomorrow
    ).length,
  };
}
