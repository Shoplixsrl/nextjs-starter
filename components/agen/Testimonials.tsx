"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Head of Customer Success",
    company: "TechFlow Inc.",
    image: null,
    initials: "SJ",
    color: "var(--agen-purple)",
    rating: 5,
    text: "Agen has transformed our customer support. We've reduced response times by 80% and our team can now focus on complex issues that truly need human attention.",
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "StartupLabs",
    image: null,
    initials: "MC",
    color: "var(--agen-yellow)",
    rating: 5,
    text: "The AI agents are incredibly smart. They handle 70% of our inquiries automatically, and customers love the instant responses. Best investment we've made this year.",
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director",
    company: "GlobalRetail Co.",
    image: null,
    initials: "ER",
    color: "var(--agen-pink)",
    rating: 5,
    text: "We were skeptical at first, but Agen proved us wrong. The setup was easy, and within a week, we saw a 50% reduction in support tickets. Absolutely game-changing.",
  },
  {
    name: "David Park",
    role: "CTO",
    company: "InnovateTech",
    image: null,
    initials: "DP",
    color: "var(--agen-green)",
    rating: 5,
    text: "The multi-language support is fantastic. We serve customers in 12 countries, and Agen handles all of them seamlessly. Our international NPS scores have never been higher.",
  },
  {
    name: "Lisa Thompson",
    role: "VP of Customer Experience",
    company: "FinServe Solutions",
    image: null,
    initials: "LT",
    color: "var(--agen-purple-dark)",
    rating: 5,
    text: "Security was our main concern, but Agen's enterprise-grade protection gave us confidence. Now we're handling sensitive financial queries with complete peace of mind.",
  },
  {
    name: "James Wilson",
    role: "Founder",
    company: "EcommerceHub",
    image: null,
    initials: "JW",
    color: "var(--agen-yellow-dark)",
    rating: 5,
    text: "From order tracking to returns, Agen handles it all. Our support team went from overwhelmed to proactive. Customer satisfaction is at an all-time high.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="agen-section bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--agen-yellow)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[var(--agen-purple)]/10 rounded-full blur-3xl" />
      </div>

      <div className="agen-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="agen-label text-[var(--agen-pink)] mb-4 block">
            Testimonials
          </span>
          <h2 className="agen-heading-2 text-[var(--agen-black)] mb-6">
            Loved by{" "}
            <span className="text-[var(--agen-pink)]">10,000+</span> companies
            worldwide
          </h2>
          <p className="agen-body">
            See what our customers have to say about transforming their customer
            support with Agen&apos;s AI agents.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[var(--agen-bg)] rounded-2xl p-6 agen-card-hover relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12" style={{ color: testimonial.color }} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[var(--agen-yellow)] text-[var(--agen-yellow)]"
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-[var(--agen-black)] mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: testimonial.color }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-[var(--agen-black)]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[var(--agen-gray)]">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos section */}
        <div className="mt-20">
          <p className="text-center text-[var(--agen-gray)] mb-8">
            Trusted by innovative companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
            {["TechFlow", "StartupLabs", "GlobalRetail", "InnovateTech", "FinServe", "EcommerceHub"].map(
              (company, index) => (
                <div
                  key={index}
                  className="text-2xl font-bold text-[var(--agen-gray)]"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
