"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { MapPin, Users, Calendar, Heart, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
}

export function EventCard({ event, variant = "default", className }: EventCardProps) {
  const lowestPrice = Math.min(...event.tickets.map((t) => t.price));
  const isFree = lowestPrice === 0;

  if (variant === "horizontal") {
    return (
      <Link href={`/events/${event.slug}`}>
        <Card className={cn("overflow-hidden card-hover group", className)}>
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0">
              <Image
                src={event.images.thumbnail}
                alt={event.title}
                fill
                className="object-cover"
              />
              {event.isTrending && (
                <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
                  Trending
                </Badge>
              )}
            </div>
            <CardContent className="flex-1 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{format(event.date.start, "EEE, MMM d 'at' h:mm a")}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="line-clamp-1">
                  {event.location.type === "online"
                    ? "Online Event"
                    : `${event.location.venue?.city}, ${event.location.venue?.state}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.stats.attendees} attending</span>
                </div>
                <div className="font-semibold text-primary">
                  {isFree ? "Free" : `From $${lowestPrice}`}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/events/${event.slug}`}>
        <Card className={cn("overflow-hidden card-hover group h-full", className)}>
          <div className="relative aspect-[4/3]">
            <Image
              src={event.images.thumbnail}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-3">
            <p className="text-xs text-primary font-medium mb-1">
              {format(event.date.start, "EEE, MMM d")}
            </p>
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/events/${event.slug}`}>
      <Card className={cn("overflow-hidden card-hover group h-full", className)}>
        <div className="relative aspect-video">
          <Image
            src={event.images.thumbnail}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Date badge */}
          <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-1 text-center shadow-md">
            <p className="text-xs font-bold text-primary uppercase">
              {format(event.date.start, "MMM")}
            </p>
            <p className="text-lg font-bold leading-none">
              {format(event.date.start, "d")}
            </p>
          </div>

          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {event.isFeatured && (
              <Badge className="bg-purple-600 hover:bg-purple-700">Featured</Badge>
            )}
            {event.isTrending && (
              <Badge className="bg-orange-500 hover:bg-orange-600">Trending</Badge>
            )}
            {event.location.type === "online" && (
              <Badge variant="secondary" className="bg-sky-500 text-white hover:bg-sky-600">
                Online
              </Badge>
            )}
          </div>

          {/* Favorite button */}
          <button
            className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to favorites
            }}
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-pink-500 transition-colors" />
          </button>
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            {event.category}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">
              {event.location.type === "online"
                ? "Online Event"
                : `${event.location.venue?.name}, ${event.location.venue?.city}`}
            </span>
          </div>

          {/* Attendees */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Users className="h-4 w-4" />
            <span>{event.stats.attendees.toLocaleString()} attending</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="font-semibold">
              {isFree ? (
                <span className="text-green-600">Free</span>
              ) : (
                <span>
                  From <span className="text-primary">${lowestPrice}</span>
                </span>
              )}
            </div>
            <Button size="sm" className="btn-gradient">
              <Ticket className="h-4 w-4 mr-1" />
              Get Tickets
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
