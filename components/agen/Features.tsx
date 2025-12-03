"use client";

import { MessageSquare, Zap, BarChart3, Globe, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Omnichannel Support",
    description:
      "Manage all conversations across chat, email, and social media from a single dashboard. Never miss a customer query again.",
    color: "var(--agen-yellow)",
    bgColor: "var(--agen-yellow)",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Provide instant, around-the-clock responses to customers. Your AI agents never sleep, ensuring continuous support.",
    color: "var(--agen-purple)",
    bgColor: "var(--agen-purple)",
  },
  {
    icon: Zap,
    title: "Instant Resolution",
    description:
      "Resolves common questions without human intervention, boosting productivity and freeing up your team for complex issues.",
    color: "var(--agen-pink)",
    bgColor: "var(--agen-pink)",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track performance metrics, customer satisfaction, and response times with comprehensive analytics dashboards.",
    color: "var(--agen-green)",
    bgColor: "var(--agen-green)",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description:
      "Communicate with customers in their preferred language. Our AI understands and responds in 50+ languages.",
    color: "var(--agen-purple-dark)",
    bgColor: "var(--agen-purple-dark)",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and compliance with GDPR, SOC 2, and HIPAA. Your data is always protected.",
    color: "var(--agen-green)",
    bgColor: "var(--agen-green)",
  },
];

export function Features() {
  return (
    <section id="features" className="agen-section bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--agen-yellow)]/5 to-transparent pointer-events-none" />

      <div className="agen-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="agen-label text-[var(--agen-purple)] mb-4 block">
            Features
          </span>
          <h2 className="agen-heading-2 text-[var(--agen-black)] mb-6">
            Everything you need to{" "}
            <span className="text-[var(--agen-purple)]">automate</span> customer
            support
          </h2>
          <p className="agen-body">
            Our AI agents come packed with powerful features designed to transform
            your customer experience and boost team productivity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-[var(--agen-bg)] rounded-2xl p-8 agen-card-hover border border-transparent hover:border-[var(--agen-gray-lighter)]"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${feature.bgColor}20` }}
              >
                <feature.icon
                  className="w-7 h-7"
                  style={{ color: feature.color }}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[var(--agen-black)] mb-3">
                {feature.title}
              </h3>
              <p className="text-[var(--agen-gray)] leading-relaxed">
                {feature.description}
              </p>

              {/* Hover decoration */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: feature.color }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-[var(--agen-black)] text-white px-8 py-4 rounded-2xl">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-[var(--agen-yellow)] flex items-center justify-center text-[var(--agen-black)] font-medium border-2 border-[var(--agen-black)]">
                A
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--agen-purple)] flex items-center justify-center text-white font-medium border-2 border-[var(--agen-black)]">
                B
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--agen-pink)] flex items-center justify-center text-white font-medium border-2 border-[var(--agen-black)]">
                C
              </div>
            </div>
            <div className="text-left">
              <div className="font-semibold">Join 10,000+ companies</div>
              <div className="text-sm text-gray-400">
                Using Agen to transform support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
