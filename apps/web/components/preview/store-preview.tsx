"use client";

import { useState } from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type DeviceType = "desktop" | "tablet" | "mobile";

interface StorePreviewProps {
  storeData?: any;
}

export function StorePreview({ storeData }: StorePreviewProps) {
  const [device, setDevice] = useState<DeviceType>("desktop");

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <p className="text-sm text-muted-foreground">
            See your store in real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={device === "desktop" ? "default" : "outline"}
            size="icon"
            onClick={() => setDevice("desktop")}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={device === "tablet" ? "default" : "outline"}
            size="icon"
            onClick={() => setDevice("tablet")}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={device === "mobile" ? "default" : "outline"}
            size="icon"
            onClick={() => setDevice("mobile")}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex flex-1 items-center justify-center bg-muted/30 p-8">
        <div
          className={cn(
            "bg-background shadow-2xl transition-all",
            device === "desktop" && "h-full w-full rounded-lg",
            device === "tablet" && "h-[768px] w-[1024px] rounded-xl",
            device === "mobile" && "h-[812px] w-[375px] rounded-3xl"
          )}
        >
          {!storeData ? (
            <div className="flex h-full items-center justify-center p-8 text-center">
              <div>
                <div className="mb-4 text-6xl">🏪</div>
                <h3 className="mb-2 text-xl font-semibold">
                  No Store Preview Yet
                </h3>
                <p className="text-sm text-muted-foreground">
                  Start chatting with AI to generate your store
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-auto">
              {/* Store Preview Content */}
              <StoreContent data={storeData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StoreContent({ data }: { data: any }) {
  return (
    <div className="min-h-full">
      {/* Header */}
      <header
        className="border-b px-6 py-4"
        style={{
          backgroundColor: data.theme?.primaryColor || "#000000",
          color: "#ffffff",
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{data.name || "Your Store"}</h1>
          <nav className="flex gap-4">
            <a href="#" className="text-sm font-medium">
              Shop
            </a>
            <a href="#" className="text-sm font-medium">
              About
            </a>
            <a href="#" className="text-sm font-medium">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center">
        <h2 className="mb-4 text-4xl font-bold">
          {data.pages?.homepage?.hero?.title || "Welcome to Our Store"}
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          {data.pages?.homepage?.hero?.subtitle ||
            "Discover amazing products"}
        </p>
        <Button size="lg">
          {data.pages?.homepage?.hero?.cta || "Shop Now"}
        </Button>
      </section>

      {/* Products Grid */}
      <section className="px-6 py-12">
        <h3 className="mb-6 text-2xl font-semibold">Featured Products</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.sampleProducts?.slice(0, 6).map((product: any, i: number) => (
            <div key={i} className="rounded-lg border bg-card p-4">
              <div className="mb-4 aspect-square rounded-lg bg-muted" />
              <h4 className="mb-2 font-semibold">{product.name}</h4>
              <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                {product.shortDescription}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${product.price}</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted px-6 py-8">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; 2025 {data.name || "Your Store"}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
