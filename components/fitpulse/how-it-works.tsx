"use client";

import { Download, User, Rocket, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Download the App",
    description: "Get started in seconds. Available on iOS and Android with seamless sync across all your devices."
  },
  {
    number: "02",
    icon: User,
    title: "Create Your Profile",
    description: "Tell us about your fitness goals, experience level, and preferences. Our AI will personalize everything for you."
  },
  {
    number: "03",
    icon: Rocket,
    title: "Start Training",
    description: "Follow your custom workout plan with video guides, real-time tracking, and smart adjustments."
  },
  {
    number: "04",
    icon: Trophy,
    title: "Achieve Results",
    description: "Track your progress, celebrate milestones, and watch yourself transform week after week."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#f4f6fa] rounded-full px-4 py-2 mb-6">
            <Rocket className="w-4 h-4 text-[#667eea]" />
            <span className="text-sm font-medium text-[#666]">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight-custom text-[#111] mb-6">
            Get started in
            <span className="text-gradient"> 4 simple steps</span>
          </h2>
          <p className="text-lg text-[#666] leading-relaxed">
            From download to your first workout in under 5 minutes.
            No complicated setup, no confusion - just results.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20" />
              )}

              <div className="relative bg-white rounded-3xl p-8 border border-gray-100 card-hover text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-bold px-4 py-1 rounded-full">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 flex items-center justify-center mx-auto mb-6 mt-4">
                  <step.icon className="w-8 h-8 text-[#667eea]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#111] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#666] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 md:mt-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Active Users" },
              { value: "1M+", label: "Workouts Completed" },
              { value: "98%", label: "User Satisfaction" },
              { value: "4.9", label: "App Store Rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-gradient tracking-tight-custom mb-2">
                  {stat.value}
                </div>
                <p className="text-[#666] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
