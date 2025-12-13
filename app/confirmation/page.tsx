"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Download,
  Mail,
  Share2,
  CalendarPlus,
  QrCode,
  Ticket,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getEventById, getEventsByCategory } from "@/lib/mock-data";
import type { Event } from "@/lib/types";

interface OrderConfirmation {
  confirmationNumber: string;
  email: string;
  name: string;
  eventId: string;
  eventSlug: string;
  selections: { ticketId: string; quantity: number }[];
  total: number;
  purchaseDate: string;
}

export default function ConfirmationPage() {
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [similarEvents, setSimilarEvents] = useState<Event[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("orderConfirmation");
    if (stored) {
      const data = JSON.parse(stored) as OrderConfirmation;
      setConfirmation(data);
      const foundEvent = getEventById(data.eventId);
      if (foundEvent) {
        setEvent(foundEvent);
        const similar = getEventsByCategory(foundEvent.category)
          .filter((e) => e.id !== foundEvent.id)
          .slice(0, 4);
        setSimilarEvents(similar);
      }
    }
  }, []);

  if (!confirmation || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">No order found</h2>
              <p className="text-muted-foreground mb-4">
                We couldn&apos;t find your order confirmation.
              </p>
              <Link href="/events">
                <Button>Browse Events</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const totalTickets = confirmation.selections.reduce(
    (sum, sel) => sum + sel.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">You&apos;re Going!</h1>
            <p className="text-lg text-white/90">
              Your tickets have been confirmed and sent to {confirmation.email}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Confirmation Details */}
            <Card className="mb-8 shadow-lg -mt-8 relative z-10">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* QR Code */}
                  <div className="flex flex-col items-center">
                    <div className="w-40 h-40 bg-white border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="h-24 w-24 text-gray-800 mx-auto" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Scan at entry
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge className="mb-2">Confirmed</Badge>
                        <h2 className="text-xl font-bold">{event.title}</h2>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(event.date.start, "EEEE, MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {format(event.date.start, "h:mm a")} -{" "}
                          {format(event.date.end, "h:mm a")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {event.location.type === "online"
                            ? "Online Event"
                            : `${event.location.venue?.name}, ${event.location.venue?.city}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Ticket className="h-4 w-4" />
                        <span>{totalTickets} ticket(s)</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Confirmation #</p>
                        <p className="font-mono font-semibold">
                          {confirmation.confirmationNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Order Total</p>
                        <p className="font-semibold">${confirmation.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Attendee</p>
                        <p className="font-semibold">{confirmation.name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Purchase Date</p>
                        <p className="font-semibold">
                          {format(new Date(confirmation.purchaseDate), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Cards */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Your Tickets</h3>
              <div className="grid gap-4">
                {confirmation.selections.map((sel, index) => {
                  const ticket = event.tickets.find((t) => t.id === sel.ticketId);
                  if (!ticket) return null;

                  return Array.from({ length: sel.quantity }).map((_, i) => (
                    <Card key={`${sel.ticketId}-${i}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Ticket className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">{ticket.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Ticket {i + 1} of {sel.quantity}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">
                            #{confirmation.confirmationNumber}-{index + 1}-{i + 1}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ));
                })}
              </div>
            </div>

            {/* Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <CalendarPlus className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold">Add to Calendar</p>
                      <p className="text-xs text-muted-foreground">
                        Google, Apple, Outlook
                      </p>
                    </div>
                  </Button>

                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Download className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold">Download Tickets</p>
                      <p className="text-xs text-muted-foreground">Save as PDF</p>
                    </div>
                  </Button>

                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Mail className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold">Resend Email</p>
                      <p className="text-xs text-muted-foreground">
                        To {confirmation.email}
                      </p>
                    </div>
                  </Button>

                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Share2 className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold">Share Event</p>
                      <p className="text-xs text-muted-foreground">
                        Invite friends to join
                      </p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Info Box */}
            <Card className="mb-8 bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Important Information
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Please arrive at least 30 minutes before the event starts
                  </li>
                  <li>• Bring a valid photo ID that matches the ticket name</li>
                  <li>• Your QR code is your ticket - have it ready at entry</li>
                  <li>
                    • Contact the organizer if you have any questions about the event
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* View Event Link */}
            <div className="text-center mb-12">
              <Link href={`/events/${event.slug}`}>
                <Button variant="outline">
                  View Event Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Similar Events */}
          {similarEvents.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">You Might Also Like</h2>
                <Link
                  href={`/events?category=${event.category}`}
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarEvents.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
