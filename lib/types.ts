export type Category =
  | "music"
  | "tech"
  | "food"
  | "sports"
  | "arts"
  | "networking"
  | "education"
  | "health";

export interface Organizer {
  id: string;
  name: string;
  logo: string;
  bio: string;
  website?: string;
  eventsCount: number;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  quantity: {
    total: number;
    available: number;
  };
  salesEnd?: Date;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company?: string;
  bio: string;
  photo: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  speaker?: string;
  location?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: Category;
  organizer: Organizer;
  date: {
    start: Date;
    end: Date;
  };
  location: {
    type: "in-person" | "online" | "hybrid";
    venue?: {
      name: string;
      address: string;
      city: string;
      state: string;
      country: string;
      coordinates: { lat: number; lng: number };
    };
    onlineUrl?: string;
  };
  images: {
    hero: string;
    thumbnail: string;
    gallery?: string[];
  };
  tickets: TicketTier[];
  schedule?: ScheduleItem[];
  speakers?: Speaker[];
  tags: string[];
  stats: {
    attendees: number;
    views: number;
    saves: number;
  };
  isFeatured: boolean;
  isTrending: boolean;
}

export interface CartItem {
  ticketId: string;
  eventId: string;
  quantity: number;
  price: number;
  tierName: string;
}

export interface Order {
  id: string;
  eventId: string;
  tickets: CartItem[];
  total: number;
  fees: number;
  email: string;
  name: string;
  phone?: string;
  createdAt: Date;
  confirmationNumber: string;
}
