"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-10" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <Badge variant="secondary" className="inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              New: AI-Powered Analytics
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Streamline Your
              <span className="block text-primary mt-2">Workflow Today</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              The all-in-one platform that helps teams collaborate, automate, and scale their operations effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-base gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Isometric Illustration */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />

              {/* SVG Isometric Illustration */}
              <svg
                viewBox="0 0 400 400"
                className="relative w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Main platform/base */}
                <g className="animate-[float_6s_ease-in-out_infinite]">
                  <rect
                    x="100"
                    y="250"
                    width="200"
                    height="10"
                    className="fill-primary/20"
                    rx="5"
                  />
                </g>

                {/* Central cube/server */}
                <g className="animate-[float_6s_ease-in-out_infinite_0.5s]">
                  {/* Front face */}
                  <path
                    d="M 150 200 L 250 200 L 250 280 L 150 280 Z"
                    className="fill-primary/30 stroke-primary stroke-2"
                  />
                  {/* Top face */}
                  <path
                    d="M 150 200 L 200 170 L 300 170 L 250 200 Z"
                    className="fill-primary/50 stroke-primary stroke-2"
                  />
                  {/* Right face */}
                  <path
                    d="M 250 200 L 300 170 L 300 250 L 250 280 Z"
                    className="fill-primary/40 stroke-primary stroke-2"
                  />

                  {/* Server details */}
                  <circle cx="180" cy="230" r="4" className="fill-primary" />
                  <circle cx="180" cy="250" r="4" className="fill-primary" />
                  <rect x="210" y="220" width="30" height="4" className="fill-primary/60" rx="2" />
                  <rect x="210" y="240" width="20" height="4" className="fill-primary/60" rx="2" />
                </g>

                {/* Floating elements */}
                <g className="animate-[float_4s_ease-in-out_infinite]">
                  <circle
                    cx="80"
                    cy="150"
                    r="15"
                    className="fill-primary/30 stroke-primary stroke-2"
                  />
                  <path
                    d="M 75 150 L 80 145 L 85 150 L 80 155 Z"
                    className="fill-primary"
                  />
                </g>

                <g className="animate-[float_5s_ease-in-out_infinite_1s]">
                  <rect
                    x="305"
                    y="120"
                    width="30"
                    height="30"
                    className="fill-primary/30 stroke-primary stroke-2"
                    rx="5"
                  />
                  <circle cx="320" cy="135" r="8" className="fill-primary/60" />
                </g>

                <g className="animate-[float_4.5s_ease-in-out_infinite_0.5s]">
                  <path
                    d="M 120 100 L 140 90 L 160 100 L 140 110 Z"
                    className="fill-primary/30 stroke-primary stroke-2"
                  />
                </g>

                {/* Data connection lines */}
                <g className="opacity-50">
                  <path
                    d="M 80 150 Q 120 180 150 200"
                    className="stroke-primary stroke-2 fill-none"
                    strokeDasharray="5,5"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="10"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M 320 135 Q 280 160 250 200"
                    className="stroke-primary stroke-2 fill-none"
                    strokeDasharray="5,5"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-10"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  )
}
