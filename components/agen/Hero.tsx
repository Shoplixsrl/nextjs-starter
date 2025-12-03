"use client";

import Link from "next/link";
import { Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Yellow blob */}
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-[var(--agen-yellow)]/20 rounded-full blur-3xl animate-float" />
        {/* Purple blob */}
        <div className="absolute bottom-32 left-[5%] w-96 h-96 bg-[var(--agen-purple)]/10 rounded-full blur-3xl animate-float stagger-2" />
        {/* Pink blob */}
        <div className="absolute top-1/2 right-[20%] w-64 h-64 bg-[var(--agen-pink)]/10 rounded-full blur-3xl animate-float stagger-3" />
        {/* Green blob */}
        <div className="absolute bottom-20 right-[30%] w-48 h-48 bg-[var(--agen-green)]/15 rounded-full blur-2xl animate-float stagger-4" />
      </div>

      <div className="agen-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[var(--agen-gray-lighter)] mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-[var(--agen-green)] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[var(--agen-gray)]">
              AI-Powered Customer Support Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="agen-heading-1 text-[var(--agen-black)] mb-6 animate-slide-up">
            Build AI agents that{" "}
            <span className="relative inline-block">
              work for you
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C47.6667 2.16667 141 -2.4 199 5.5"
                  stroke="#fdd512"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="agen-body max-w-2xl mx-auto mb-10 animate-slide-up stagger-1">
            Create intelligent automation solutions that handle customer support,
            sales, and marketing with instant responses across chat, email, and
            social media. Boost efficiency and transform customer experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2">
            <Link
              href="#pricing"
              className="agen-btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Start Building
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <button className="agen-btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
              <Play className="w-5 h-5" />
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-[var(--agen-gray-lighter)] animate-slide-up stagger-3">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[var(--agen-black)]">
                99%
              </div>
              <div className="text-[var(--agen-gray)] mt-2">
                Response Rate
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[var(--agen-black)]">
                24/7
              </div>
              <div className="text-[var(--agen-gray)] mt-2">
                Availability
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[var(--agen-black)]">
                10x
              </div>
              <div className="text-[var(--agen-gray)] mt-2">
                Faster Support
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image / Dashboard Preview */}
        <div className="mt-20 relative animate-slide-up stagger-4">
          <div className="relative mx-auto max-w-5xl">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--agen-yellow)]/20 via-[var(--agen-purple)]/20 to-[var(--agen-pink)]/20 rounded-3xl blur-2xl" />

            {/* Dashboard mockup */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-[var(--agen-gray-lighter)] overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[var(--agen-gray-lighter)]/50 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-4 py-1.5 text-sm text-[var(--agen-gray)] max-w-md mx-auto">
                    app.agen.ai/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Sidebar */}
                  <div className="hidden md:block space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-[var(--agen-yellow)]/10 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--agen-yellow)] rounded-lg flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#090a0b" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <span className="font-medium">Conversations</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl text-[var(--agen-gray)]">
                      <div className="w-10 h-10 bg-[var(--agen-gray-lighter)] rounded-lg flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <span className="font-medium">Customers</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl text-[var(--agen-gray)]">
                      <div className="w-10 h-10 bg-[var(--agen-gray-lighter)] rounded-lg flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                          <path d="M22 12A10 10 0 0 0 12 2v10z" />
                        </svg>
                      </div>
                      <span className="font-medium">Analytics</span>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="md:col-span-2 space-y-4">
                    {/* Chat messages */}
                    <div className="bg-[var(--agen-bg)] rounded-xl p-4 space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-[var(--agen-purple)] rounded-full flex items-center justify-center text-white text-sm font-medium">
                          J
                        </div>
                        <div className="flex-1">
                          <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm">
                            <p className="text-sm">Hi! I need help with my recent order #12345</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <div className="flex-1 max-w-[80%]">
                          <div className="bg-[var(--agen-black)] text-white rounded-xl rounded-tr-none p-3">
                            <p className="text-sm">Hello! I&apos;d be happy to help you with order #12345. I can see it was shipped yesterday and is currently in transit. Would you like tracking details?</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1 justify-end">
                            <span className="text-xs text-[var(--agen-gray)]">AI Agent</span>
                            <div className="w-4 h-4 bg-[var(--agen-yellow)] rounded flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#090a0b" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-[var(--agen-green)]/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[var(--agen-green)]">847</div>
                        <div className="text-xs text-[var(--agen-gray)]">Resolved Today</div>
                      </div>
                      <div className="bg-[var(--agen-purple)]/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[var(--agen-purple)]">2.3s</div>
                        <div className="text-xs text-[var(--agen-gray)]">Avg Response</div>
                      </div>
                      <div className="bg-[var(--agen-pink)]/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[var(--agen-pink)]">98%</div>
                        <div className="text-xs text-[var(--agen-gray)]">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
