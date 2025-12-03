"use client";

import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "29",
    description: "Perfect for entrepreneurs automating routine tasks and small businesses testing AI integration.",
    features: [
      "Up to 1,000 conversations/month",
      "1 AI agent",
      "Email support channel",
      "Basic analytics",
      "5 team members",
      "Community support",
    ],
    cta: "Start Free Trial",
    popular: false,
    color: "var(--agen-green)",
  },
  {
    name: "Professional",
    price: "99",
    description: "Ideal for teams seeking advanced automation and businesses enhancing their support.",
    features: [
      "Up to 10,000 conversations/month",
      "5 AI agents",
      "All support channels",
      "Advanced analytics & reporting",
      "25 team members",
      "Priority email support",
      "Custom workflows",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "var(--agen-yellow)",
  },
  {
    name: "Enterprise",
    price: "299",
    description: "For enterprises needing system integration and huge businesses seeking AI support.",
    features: [
      "Unlimited conversations",
      "Unlimited AI agents",
      "All channels + custom",
      "Real-time analytics",
      "Unlimited team members",
      "24/7 dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    popular: false,
    color: "var(--agen-purple)",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="agen-section relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--agen-purple)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[var(--agen-yellow)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="agen-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="agen-label text-[var(--agen-yellow-dark)] mb-4 block">
            Pricing
          </span>
          <h2 className="agen-heading-2 text-[var(--agen-black)] mb-6">
            Simple, transparent{" "}
            <span className="text-[var(--agen-yellow-dark)]">pricing</span>
          </h2>
          <p className="agen-body">
            Choose the perfect plan for your business. All plans include a 7-day
            free trial with no credit card required.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 agen-card-hover ${
                plan.popular
                  ? "ring-2 ring-[var(--agen-yellow)] shadow-xl"
                  : "border border-[var(--agen-gray-lighter)]"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 bg-[var(--agen-yellow)] text-[var(--agen-black)] px-4 py-1.5 rounded-full text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: plan.color }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-[var(--agen-black)]">
                    ${plan.price}
                  </span>
                  <span className="text-[var(--agen-gray)]">/month</span>
                </div>
                <p className="mt-4 text-sm text-[var(--agen-gray)]">
                  {plan.description}
                </p>
              </div>

              {/* Features list */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${plan.color}20` }}
                    >
                      <Check
                        className="w-3 h-3"
                        style={{ color: plan.color }}
                      />
                    </div>
                    <span className="text-[var(--agen-gray)]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="#"
                className={`block w-full text-center py-4 rounded-full font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-[var(--agen-black)] text-white hover:bg-[var(--agen-yellow)] hover:text-[var(--agen-black)]"
                    : "border-2 border-[var(--agen-black)] text-[var(--agen-black)] hover:bg-[var(--agen-black)] hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Trial banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-[var(--agen-green)]/10 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-[var(--agen-green)] rounded-full animate-pulse" />
            <span className="font-medium text-[var(--agen-black)]">
              Start your 7-day FREE trial today!
            </span>
            <span className="text-[var(--agen-gray)]">
              No credit card required.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
