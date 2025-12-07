"use client";

import { useState } from "react";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] opacity-10" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#667eea] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#f093fb] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#764ba2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm border border-gray-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-[#666]">
                New: AI-Powered Workout Plans
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight-custom text-[#111] leading-[1.1] mb-6">
              Transform Your
              <span className="block text-gradient">Fitness Journey</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#666] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              The all-in-one fitness app that combines personalized workouts,
              nutrition tracking, and real-time coaching to help you achieve
              your health goals faster.
            </p>

            {/* Email Signup */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 mb-8">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-5 pr-4 rounded-full bg-white border-gray-200 text-base shadow-sm focus:ring-2 focus:ring-[#667eea]/20 focus:border-[#667eea]"
                />
              </div>
              <Button className="h-14 px-8 rounded-full btn-gradient text-white font-semibold text-base border-0 shadow-lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-[#666]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Content - App Mockup */}
          <div className="relative">
            <div className="relative mx-auto lg:mx-0 max-w-sm lg:max-w-none">
              {/* Phone Frame */}
              <div className="relative z-10 bg-white rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* App Screen Content */}
                  <div className="h-full p-6 flex flex-col">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between text-white/80 text-xs mb-8">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2.5 border border-white/80 rounded-sm">
                          <div className="w-3/4 h-full bg-white/80 rounded-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Greeting */}
                    <div className="text-white mb-8">
                      <p className="text-white/70 text-sm mb-1">Good Morning</p>
                      <h2 className="text-2xl font-bold">Ready to workout?</h2>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                        <p className="text-white/70 text-xs mb-1">Calories</p>
                        <p className="text-white text-xl font-bold">1,248</p>
                        <p className="text-white/70 text-xs">kcal burned</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                        <p className="text-white/70 text-xs mb-1">Workouts</p>
                        <p className="text-white text-xl font-bold">12</p>
                        <p className="text-white/70 text-xs">this week</p>
                      </div>
                    </div>

                    {/* Today's Workout Card */}
                    <div className="bg-white rounded-2xl p-4 mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-[#666] mb-1">Today&apos;s Workout</p>
                          <p className="font-semibold text-[#111]">Full Body HIIT</p>
                        </div>
                        <button className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center">
                          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#666]">
                        <span>45 min</span>
                        <span className="w-1 h-1 rounded-full bg-[#666]" />
                        <span>320 kcal</span>
                        <span className="w-1 h-1 rounded-full bg-[#666]" />
                        <span>Intermediate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-4 sm:-left-8 top-1/4 bg-white rounded-2xl p-4 shadow-xl animate-float z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#111]">Goal Achieved!</p>
                    <p className="text-xs text-[#666]">10,000 steps today</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 sm:-right-8 bottom-1/3 bg-white rounded-2xl p-4 shadow-xl animate-float z-20" style={{ animationDelay: "3s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-lg">🔥</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#111]">7 Day Streak</p>
                    <p className="text-xs text-[#666]">Keep it up!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-sm text-[#aaa] mb-8 uppercase tracking-wider font-medium">
            Trusted by 50,000+ fitness enthusiasts
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            {["Apple", "Nike", "Adidas", "Under Armour", "Fitbit"].map((brand) => (
              <div key={brand} className="text-xl md:text-2xl font-bold text-[#666]">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
