"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="agen-section relative overflow-hidden">
      <div className="agen-container">
        <div className="relative bg-[var(--agen-black)] rounded-3xl overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-[var(--agen-yellow)]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[var(--agen-purple)]/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-[var(--agen-pink)]/10 via-transparent to-[var(--agen-green)]/10" />
          </div>

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-20 md:px-16 md:py-28 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-[var(--agen-yellow)]" />
              <span className="text-white/80 text-sm font-medium">
                Start your 7-day FREE trial today!
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
              Ready to transform your{" "}
              <span className="text-[var(--agen-yellow)]">customer support</span>?
            </h2>

            {/* Subtitle */}
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of companies using Agen to deliver exceptional
              customer experiences with AI-powered automation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 bg-[var(--agen-yellow)] text-[var(--agen-black)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transition-colors duration-300"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors duration-300"
              >
                Schedule Demo
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Setup in under 10 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
