"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  CreditCard,
  Lock,
  Shield,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getEventById } from "@/lib/mock-data";
import type { Event } from "@/lib/types";

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  confirmEmail: z.string().email("Please enter a valid email"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().optional(),
  cardNumber: z.string().min(16, "Card number is required"),
  expiryDate: z.string().min(5, "Expiry date is required"),
  cvv: z.string().min(3, "CVV is required"),
  billingName: z.string().min(2, "Cardholder name is required"),
  billingZip: z.string().min(5, "ZIP code is required"),
  agreeToTerms: z.boolean().refine((v) => v === true, {
    message: "You must agree to the terms",
  }),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface TicketSelection {
  eventId: string;
  eventSlug: string;
  selections: { ticketId: string; quantity: number }[];
  subtotal: number;
  serviceFee: number;
  processingFee: number;
  total: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<TicketSelection | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
      firstName: "",
      lastName: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      billingName: "",
      billingZip: "",
      agreeToTerms: false,
    },
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("ticketSelection");
    if (stored) {
      const data = JSON.parse(stored) as TicketSelection;
      setOrderData(data);
      const foundEvent = getEventById(data.eventId);
      if (foundEvent) {
        setEvent(foundEvent);
      }
    }
  }, []);

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate confirmation number
    const confirmationNumber = `EVT-${Date.now().toString(36).toUpperCase()}`;

    // Store confirmation data
    sessionStorage.setItem(
      "orderConfirmation",
      JSON.stringify({
        confirmationNumber,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        eventId: orderData?.eventId,
        eventSlug: orderData?.eventSlug,
        selections: orderData?.selections,
        total: orderData?.total,
        purchaseDate: new Date().toISOString(),
      })
    );

    // Clear ticket selection
    sessionStorage.removeItem("ticketSelection");

    // Redirect to confirmation
    router.push("/confirmation");
  };

  if (!orderData || !event) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary/30">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">No tickets selected</h2>
              <p className="text-muted-foreground mb-4">
                Please select tickets before proceeding to checkout.
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

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Progress indicator */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Contact</span>
              </div>
              <div className="w-16 h-0.5 bg-muted mx-2" />
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Payment</span>
              </div>
              <div className="w-16 h-0.5 bg-muted mx-2" />
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 text-sm font-medium">Confirm</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
            {/* Form */}
            <div className="flex-1">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (tickets will be sent here)</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Confirm your email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="4242 4242 4242 4242"
                                maxLength={19}
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value
                                    .replace(/\s/g, "")
                                    .replace(/(\d{4})/g, "$1 ")
                                    .trim();
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  {...field}
                                  onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, "");
                                    if (value.length >= 2) {
                                      value = value.slice(0, 2) + "/" + value.slice(2);
                                    }
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="123"
                                  maxLength={4}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="billingName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="billingZip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Billing ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="12345" maxLength={10} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Terms */}
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full btn-gradient"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Complete Purchase - ${orderData.total.toFixed(2)}
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="h-4 w-4" />
                      <span>Secure Payment</span>
                    </div>
                  </div>
                </form>
              </Form>
            </div>

            {/* Order Summary */}
            <aside className="lg:w-80">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Event info */}
                    <div className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={event.images.thumbnail}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(event.date.start, "EEE, MMM d")} at{" "}
                          {format(event.date.start, "h:mm a")}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Tickets */}
                    {orderData.selections.map((sel) => {
                      const ticket = event.tickets.find(
                        (t) => t.id === sel.ticketId
                      );
                      if (!ticket) return null;
                      return (
                        <div
                          key={sel.ticketId}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {ticket.name} x {sel.quantity}
                          </span>
                          <span>${(ticket.price * sel.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${orderData.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service fee</span>
                        <span>${orderData.serviceFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing fee</span>
                        <span>${orderData.processingFee.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${orderData.total.toFixed(2)}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center gap-2 text-green-700 text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>100% money-back guarantee</span>
                      </div>
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
