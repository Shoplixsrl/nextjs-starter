import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, ArrowRight, Calendar, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EventCard } from "@/components/events/event-card";
import { CategoryCard } from "@/components/events/category-card";
import {
  events,
  categories,
  getFeaturedEvents,
  getTrendingEvents,
  getUpcomingEvents,
  getFreeEvents,
} from "@/lib/mock-data";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents().slice(0, 3);
  const trendingEvents = getTrendingEvents().slice(0, 6);
  const upcomingEvents = getUpcomingEvents().slice(0, 4);
  const freeEvents = getFreeEvents().slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">
                <Sparkles className="h-3 w-3 mr-1" />
                Over 250,000 events this month
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Discover experiences
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-orange-300">
                  that inspire
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Find and book tickets to the best concerts, conferences, workshops, and
                more. Join millions of people discovering unforgettable experiences.
              </p>

              {/* Search bar */}
              <div className="bg-white rounded-xl p-2 shadow-2xl max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search events, artists, or venues..."
                      className="pl-10 h-12 border-0 bg-gray-50 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div className="relative flex-1 md:max-w-[200px]">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Location"
                      className="pl-10 h-12 border-0 bg-gray-50 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <Button size="lg" className="btn-gradient h-12 px-8">
                    Search
                  </Button>
                </div>
              </div>

              {/* Quick links */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
                <span className="text-white/60">Popular:</span>
                <Link href="/events?category=music" className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  Concerts
                </Link>
                <Link href="/events?category=tech" className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  Tech Events
                </Link>
                <Link href="/events?category=food" className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  Food Festivals
                </Link>
                <Link href="/events?type=free" className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  Free Events
                </Link>
              </div>
            </div>
          </div>

          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Browse by Category</h2>
                <p className="text-muted-foreground">Explore events in your favorite categories</p>
              </div>
              <Link href="/events" className="hidden sm:flex items-center gap-1 text-primary hover:underline">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  variant="icon-only"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h2 className="text-2xl md:text-3xl font-bold">Featured Events</h2>
                </div>
                <p className="text-muted-foreground">Hand-picked experiences you don&apos;t want to miss</p>
              </div>
              <Link href="/events?featured=true" className="hidden sm:flex items-center gap-1 text-primary hover:underline">
                See all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
                </div>
                <p className="text-muted-foreground">Events everyone is talking about</p>
              </div>
              <Link href="/events?trending=true" className="hidden sm:flex items-center gap-1 text-primary hover:underline">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming This Week */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-sky-400" />
                  <h2 className="text-2xl md:text-3xl font-bold">Happening Soon</h2>
                </div>
                <p className="text-slate-400">Don&apos;t miss these upcoming events</p>
              </div>
              <Link href="/events?date=this-week" className="hidden sm:flex items-center gap-1 text-sky-400 hover:underline">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Free Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Free Events</h2>
                <p className="text-muted-foreground">Great experiences that won&apos;t cost a thing</p>
              </div>
              <Link href="/events?price=free" className="hidden sm:flex items-center gap-1 text-primary hover:underline">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {freeEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to create your own event?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of organizers using EventHub to create, manage, and sell
              tickets to amazing events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-white/90">
                Create Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">10M+</p>
                <p className="text-muted-foreground">Events hosted</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">50M+</p>
                <p className="text-muted-foreground">Tickets sold</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">180+</p>
                <p className="text-muted-foreground">Countries</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">4.9</p>
                <p className="text-muted-foreground">User rating</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
