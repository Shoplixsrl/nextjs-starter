"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Grid3X3,
  List,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EventCard } from "@/components/events/event-card";
import { CategoryCard } from "@/components/events/category-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { events, categories } from "@/lib/mock-data";
import type { Category, Event } from "@/lib/types";

const dateOptions = [
  { value: "any", label: "Any Date" },
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Date" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popularity", label: "Popularity" },
];

const eventTypeOptions = [
  { value: "all", label: "All Events" },
  { value: "in-person", label: "In-Person" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid" },
];

function EventsPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [dateFilter, setDateFilter] = useState("any");
  const [eventType, setEventType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((e) => selectedCategories.includes(e.category));
    }

    // Event type filter
    if (eventType !== "all") {
      result = result.filter((e) => e.location.type === eventType);
    }

    // Date filter
    if (dateFilter !== "any") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const weekEnd = new Date(today);
      weekEnd.setDate(weekEnd.getDate() + 7);
      const monthEnd = new Date(today);
      monthEnd.setMonth(monthEnd.getMonth() + 1);

      result = result.filter((e) => {
        const eventDate = new Date(e.date.start);
        switch (dateFilter) {
          case "today":
            return eventDate >= today && eventDate < tomorrow;
          case "tomorrow":
            const dayAfter = new Date(tomorrow);
            dayAfter.setDate(dayAfter.getDate() + 1);
            return eventDate >= tomorrow && eventDate < dayAfter;
          case "this-week":
            return eventDate >= today && eventDate <= weekEnd;
          case "this-month":
            return eventDate >= today && eventDate <= monthEnd;
          default:
            return true;
        }
      });
    }

    // Price filter
    if (showFreeOnly) {
      result = result.filter((e) => e.tickets.some((t) => t.price === 0));
    } else {
      result = result.filter((e) => {
        const minPrice = Math.min(...e.tickets.map((t) => t.price));
        return minPrice >= priceRange[0] && minPrice <= priceRange[1];
      });
    }

    // Sorting
    switch (sortBy) {
      case "date":
        result.sort((a, b) => a.date.start.getTime() - b.date.start.getTime());
        break;
      case "price-low":
        result.sort((a, b) => {
          const aMin = Math.min(...a.tickets.map((t) => t.price));
          const bMin = Math.min(...b.tickets.map((t) => t.price));
          return aMin - bMin;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const aMin = Math.min(...a.tickets.map((t) => t.price));
          const bMin = Math.min(...b.tickets.map((t) => t.price));
          return bMin - aMin;
        });
        break;
      case "popularity":
        result.sort((a, b) => b.stats.attendees - a.stats.attendees);
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, dateFilter, eventType, priceRange, showFreeOnly, sortBy]);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setDateFilter("any");
    setEventType("all");
    setPriceRange([0, 500]);
    setShowFreeOnly(false);
    setSortBy("relevance");
  };

  const activeFiltersCount = [
    selectedCategories.length > 0,
    dateFilter !== "any",
    eventType !== "all",
    showFreeOnly || priceRange[0] > 0 || priceRange[1] < 500,
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-semibold">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label
                    htmlFor={category.id}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {category.name}
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Date */}
      <Accordion type="single" collapsible defaultValue="date">
        <AccordionItem value="date">
          <AccordionTrigger className="text-sm font-semibold">
            Date
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {dateOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`date-${option.value}`}
                    checked={dateFilter === option.value}
                    onCheckedChange={() => setDateFilter(option.value)}
                  />
                  <Label
                    htmlFor={`date-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Event Type */}
      <Accordion type="single" collapsible defaultValue="type">
        <AccordionItem value="type">
          <AccordionTrigger className="text-sm font-semibold">
            Event Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {eventTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${option.value}`}
                    checked={eventType === option.value}
                    onCheckedChange={() => setEventType(option.value)}
                  />
                  <Label
                    htmlFor={`type-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Price */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-semibold">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free-only"
                  checked={showFreeOnly}
                  onCheckedChange={(checked) => setShowFreeOnly(checked as boolean)}
                />
                <Label htmlFor="free-only" className="text-sm font-normal cursor-pointer">
                  Free events only
                </Label>
              </div>
              {!showFreeOnly && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-secondary/30">
        {/* Search Header */}
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search input */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>

              {/* Mobile filter button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden relative">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center btn-gradient">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View toggle */}
              <div className="hidden sm:flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedCategories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => toggleCategory(cat)}
                  >
                    {categories.find((c) => c.id === cat)?.name}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
                {dateFilter !== "any" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setDateFilter("any")}
                  >
                    {dateOptions.find((d) => d.value === dateFilter)?.label}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {eventType !== "all" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setEventType("all")}
                  >
                    {eventTypeOptions.find((t) => t.value === eventType)?.label}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {showFreeOnly && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setShowFreeOnly(false)}
                  >
                    Free only
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-40 bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Filters</h3>
                <FilterContent />
              </div>
            </aside>

            {/* Events Grid */}
            <div className="flex-1">
              {/* Results count */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">
                  {filteredEvents.length} events found
                </h1>
                <p className="text-muted-foreground">
                  Discover amazing experiences near you
                </p>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} variant="horizontal" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function EventsPageLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-muted rounded-xl h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<EventsPageLoading />}>
      <EventsPageContent />
    </Suspense>
  );
}
