import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
  Globe,
  ExternalLink,
  ChevronRight,
  Ticket,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { events, getEventBySlug, getEventsByCategory } from "@/lib/mock-data";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.title} | EventHub`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.images.hero],
    },
  };
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const similarEvents = getEventsByCategory(event.category)
    .filter((e) => e.id !== event.id)
    .slice(0, 4);

  const lowestPrice = Math.min(...event.tickets.map((t) => t.price));
  const isFree = lowestPrice === 0;
  const totalAvailable = event.tickets.reduce(
    (sum, t) => sum + t.quantity.available,
    0
  );
  const isAlmostSoldOut = totalAvailable < 50;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
          <Image
            src={event.images.hero}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-primary/90">{event.category}</Badge>
                {event.location.type === "online" && (
                  <Badge variant="secondary" className="bg-sky-500 text-white">
                    <Globe className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                )}
                {event.location.type === "hybrid" && (
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    Hybrid
                  </Badge>
                )}
                {event.isFeatured && (
                  <Badge className="bg-purple-600">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{format(event.date.start, "EEEE, MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>
                    {format(event.date.start, "h:mm a")} -{" "}
                    {format(event.date.end, "h:mm a")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="absolute top-6 right-6 flex gap-2">
            <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="about"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    About
                  </TabsTrigger>
                  {event.schedule && event.schedule.length > 0 && (
                    <TabsTrigger
                      value="schedule"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Schedule
                    </TabsTrigger>
                  )}
                  {event.speakers && event.speakers.length > 0 && (
                    <TabsTrigger
                      value="speakers"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Speakers
                    </TabsTrigger>
                  )}
                  <TabsTrigger
                    value="location"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Location
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {event.description}
                    </p>

                    {event.tags.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {event.schedule && event.schedule.length > 0 && (
                  <TabsContent value="schedule" className="mt-6">
                    <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
                    <div className="space-y-4">
                      {event.schedule.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 rounded-lg border bg-card"
                        >
                          <div className="text-sm font-semibold text-primary min-w-[80px]">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.description}
                            </p>
                            {item.speaker && (
                              <p className="text-sm">
                                <span className="text-muted-foreground">Speaker: </span>
                                {item.speaker}
                              </p>
                            )}
                            {item.location && (
                              <p className="text-sm">
                                <span className="text-muted-foreground">Location: </span>
                                {item.location}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                )}

                {event.speakers && event.speakers.length > 0 && (
                  <TabsContent value="speakers" className="mt-6">
                    <h2 className="text-2xl font-bold mb-6">Speakers</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {event.speakers.map((speaker) => (
                        <Card key={speaker.id}>
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <Avatar className="h-20 w-20">
                                <AvatarImage src={speaker.photo} alt={speaker.name} />
                                <AvatarFallback>
                                  {speaker.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{speaker.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {speaker.title}
                                  {speaker.company && ` at ${speaker.company}`}
                                </p>
                                <p className="text-sm mt-2 line-clamp-3">
                                  {speaker.bio}
                                </p>
                                {speaker.social && (
                                  <div className="flex gap-2 mt-3">
                                    {speaker.social.twitter && (
                                      <a
                                        href={`https://twitter.com/${speaker.social.twitter}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline"
                                      >
                                        Twitter
                                      </a>
                                    )}
                                    {speaker.social.linkedin && (
                                      <a
                                        href={`https://linkedin.com/in/${speaker.social.linkedin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline"
                                      >
                                        LinkedIn
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                )}

                <TabsContent value="location" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Location</h2>
                  {event.location.type === "online" ? (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-sky-100">
                            <Globe className="h-6 w-6 text-sky-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Online Event</h3>
                            <p className="text-sm text-muted-foreground">
                              Join from anywhere in the world
                            </p>
                            {event.location.onlineUrl && (
                              <a
                                href={event.location.onlineUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-2"
                              >
                                Event Link
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : event.location.venue ? (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-primary/10">
                            <MapPin className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              {event.location.venue.name}
                            </h3>
                            <p className="text-muted-foreground">
                              {event.location.venue.address}
                            </p>
                            <p className="text-muted-foreground">
                              {event.location.venue.city},{" "}
                              {event.location.venue.state}{" "}
                              {event.location.venue.country}
                            </p>
                            <Button variant="link" className="px-0 mt-2">
                              Get Directions
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="mt-6 h-[300px] rounded-lg bg-secondary flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Map view</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : null}
                </TabsContent>
              </Tabs>

              {/* Organizer */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Organizer</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={event.organizer.logo}
                          alt={event.organizer.name}
                        />
                        <AvatarFallback>
                          {event.organizer.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {event.organizer.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {event.organizer.eventsCount} events organized
                        </p>
                      </div>
                      <Button variant="outline">Follow</Button>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      {event.organizer.bio}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar - Ticket Selection */}
            <aside className="lg:w-96">
              <div className="sticky top-24">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Select Tickets</span>
                      {isAlmostSoldOut && (
                        <Badge variant="destructive">Almost Sold Out</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {event.tickets.map((ticket) => {
                      const isSoldOut = ticket.quantity.available === 0;
                      return (
                        <div
                          key={ticket.id}
                          className={`p-4 rounded-lg border ${
                            isSoldOut ? "opacity-60 bg-muted" : "bg-card"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{ticket.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {ticket.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">
                                {ticket.price === 0 ? (
                                  <span className="text-green-600">Free</span>
                                ) : (
                                  `$${ticket.price}`
                                )}
                              </p>
                              {!isSoldOut && (
                                <p className="text-xs text-muted-foreground">
                                  {ticket.quantity.available} left
                                </p>
                              )}
                            </div>
                          </div>

                          <ul className="space-y-1 mb-3">
                            {ticket.features.slice(0, 3).map((feature, i) => (
                              <li
                                key={i}
                                className="text-sm flex items-center gap-2"
                              >
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>

                          {isSoldOut ? (
                            <Badge variant="secondary" className="w-full justify-center">
                              Sold Out
                            </Badge>
                          ) : (
                            <Link href={`/events/${event.slug}/tickets`}>
                              <Button className="w-full btn-gradient">
                                Select
                              </Button>
                            </Link>
                          )}
                        </div>
                      );
                    })}

                    <Separator />

                    <div className="text-center">
                      <Link href={`/events/${event.slug}/tickets`}>
                        <Button size="lg" className="w-full btn-gradient">
                          <Ticket className="h-5 w-5 mr-2" />
                          Get Tickets
                        </Button>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-2">
                        Secure checkout powered by Stripe
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-around pt-4 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {event.stats.attendees.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Attending</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {event.stats.saves.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Saved</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {event.stats.views.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>

          {/* Similar Events */}
          {similarEvents.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Similar Events</h2>
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
