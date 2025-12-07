"use client";

import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started with basic fitness tracking.",
    features: [
      "Basic workout library",
      "Progress tracking",
      "5 AI recommendations/month",
      "Community access",
      "Basic analytics"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Pro",
    price: "12",
    description: "For serious athletes who want maximum results.",
    features: [
      "Unlimited workout library",
      "Advanced progress tracking",
      "Unlimited AI recommendations",
      "Priority community support",
      "Advanced analytics",
      "Custom workout builder",
      "Nutrition tracking",
      "Recovery insights"
    ],
    cta: "Start 14-Day Trial",
    popular: true
  },
  {
    name: "Team",
    price: "29",
    description: "For trainers and groups who train together.",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team challenges",
      "Trainer dashboard",
      "Group analytics",
      "Custom branding",
      "API access",
      "Dedicated support"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#f4f6fa] rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#667eea]" />
            <span className="text-sm font-medium text-[#666]">Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight-custom text-[#111] mb-6">
            Simple, transparent
            <span className="text-gradient"> pricing</span>
          </h2>
          <p className="text-lg text-[#666] leading-relaxed">
            Choose the plan that fits your fitness journey.
            All plans include a 14-day free trial, no credit card required.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 card-hover ${
                plan.popular
                  ? "bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#667eea] text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-white" : "text-[#111]"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${plan.popular ? "text-white" : "text-[#111]"}`}>
                    ${plan.price}
                  </span>
                  <span className={plan.popular ? "text-white/70" : "text-[#666]"}>
                    /month
                  </span>
                </div>
                <p className={`mt-2 text-sm ${plan.popular ? "text-white/80" : "text-[#666]"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? "bg-white/20" : "bg-green-100"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-white" : "text-green-600"}`} />
                    </div>
                    <span className={plan.popular ? "text-white/90" : "text-[#666]"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full h-12 rounded-full font-semibold ${
                  plan.popular
                    ? "bg-white text-[#667eea] hover:bg-white/90"
                    : "btn-gradient text-white border-0"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <p className="text-[#666] flex items-center justify-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
