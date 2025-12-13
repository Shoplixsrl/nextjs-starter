"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Minus,
  Plus,
  CheckCircle2,
  AlertCircle,
  Shield,
  Clock,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getEventBySlug } from "@/lib/mock-data";

interface TicketSelection {
  ticketId: string;
  quantity: number;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function TicketSelectionPage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const event = getEventBySlug(slug);

  const [selections, setSelections] = useState<TicketSelection[]>([]);

  if (!event) {
    return null;
  }

  const updateQuantity = (ticketId: string, delta: number) => {
    setSelections((prev) => {
      const existing = prev.find((s) => s.ticketId === ticketId);
      const ticket = event.tickets.find((t) => t.id === ticketId);
      if (!ticket) return prev;

      const currentQty = existing?.quantity || 0;
      const newQty = Math.max(0, Math.min(currentQty + delta, ticket.quantity.available, 10));

      if (newQty === 0) {
        return prev.filter((s) => s.ticketId !== ticketId);
      }

      if (existing) {
        return prev.map((s) =>
          s.ticketId === ticketId ? { ...s, quantity: newQty } : s
        );
      }

      return [...prev, { ticketId, quantity: newQty }];
    });
  };

  const getQuantity = (ticketId: string) => {
    return selections.find((s) => s.ticketId === ticketId)?.quantity || 0;
  };

  const subtotal = selections.reduce((sum, sel) => {
    const ticket = event.tickets.find((t) => t.id === sel.ticketId);
    return sum + (ticket?.price || 0) * sel.quantity;
  }, 0);

  const serviceFee = subtotal * 0.1;
  const processingFee = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + serviceFee + processingFee;

  const totalTickets = selections.reduce((sum, s) => sum + s.quantity, 0);

  const handleCheckout = () => {
    if (totalTickets === 0) return;

    // Store selection in sessionStorage for checkout
    sessionStorage.setItem(
      "ticketSelection",
      JSON.stringify({
        eventId: event.id,
        eventSlug: event.slug,
        selections,
        subtotal,
        serviceFee,
        processingFee,
        total,
      })
    );

    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />

      <main className="flex-1">
        {/* Event Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link
              href={`/events/${event.slug}`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to event
            </Link>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={event.images.thumbnail}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold mb-2">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(event.date.start, "EEE, MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{format(event.date.start, "h:mm a")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {event.location.type === "online"
                        ? "Online Event"
                        : event.location.venue?.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Ticket Options */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-6">Select Tickets</h2>

              <div className="space-y-4">
                {event.tickets.map((ticket) => {
                  const isSoldOut = ticket.quantity.available === 0;
                  const quantity = getQuantity(ticket.id);
                  const isLowStock = ticket.quantity.available < 20 && ticket.quantity.available > 0;

                  return (
                    <Card
                      key={ticket.id}
                      className={`transition-all ${
                        quantity > 0 ? "ring-2 ring-primary" : ""
                      } ${isSoldOut ? "opacity-60" : ""}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{ticket.name}</h3>
                              {ticket.name.toLowerCase().includes("vip") && (
                                <Badge className="bg-purple-600">Popular</Badge>
                              )}
                              {isLowStock && (
                                <Badge variant="destructive" className="text-xs">
                                  Only {ticket.quantity.available} left
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-3">
                              {ticket.description}
                            </p>
                            <ul className="space-y-1">
                              {ticket.features.map((feature, i) => (
                                <li
                                  key={i}
                                  className="text-sm flex items-center gap-2"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-col items-end gap-3">
                            <div className="text-right">
                              <p className="text-2xl font-bold">
                                {ticket.price === 0 ? (
                                  <span className="text-green-600">Free</span>
                                ) : (
                                  `$${ticket.price}`
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                per ticket
                              </p>
                            </div>

                            {isSoldOut ? (
                              <Badge variant="secondary" className="px-4 py-2">
                                Sold Out
                              </Badge>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(ticket.id, -1)}
                                  disabled={quantity === 0}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-semibold">
                                  {quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(ticket.id, 1)}
                                  disabled={quantity >= Math.min(ticket.quantity.available, 10)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Info */}
              <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Ticket Information</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Maximum 10 tickets per order</li>
                      <li>Tickets are non-refundable unless event is cancelled</li>
                      <li>E-tickets will be sent to your email</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="lg:w-96">
              <div className="sticky top-24">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selections.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">
                        Select tickets to continue
                      </p>
                    ) : (
                      <>
                        {selections.map((sel) => {
                          const ticket = event.tickets.find(
                            (t) => t.id === sel.ticketId
                          );
                          if (!ticket) return null;
                          return (
                            <div
                              key={sel.ticketId}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {ticket.name} x {sel.quantity}
                              </span>
                              <span className="font-medium">
                                ${(ticket.price * sel.quantity).toFixed(2)}
                              </span>
                            </div>
                          );
                        })}

                        <Separator />

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Service fee
                            </span>
                            <span>${serviceFee.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Processing fee
                            </span>
                            <span>${processingFee.toFixed(2)}</span>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </>
                    )}

                    <Button
                      size="lg"
                      className="w-full btn-gradient"
                      disabled={totalTickets === 0}
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>

                    {/* Trust badges */}
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                      <Shield className="h-4 w-4" />
                      <span>Secure checkout powered by Stripe</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
