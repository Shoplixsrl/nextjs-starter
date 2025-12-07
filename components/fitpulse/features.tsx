"use client";

import {
  Dumbbell,
  Heart,
  LineChart,
  Smartphone,
  Users,
  Zap,
  Target,
  Calendar
} from "lucide-react";

const features = [
  {
    icon: Dumbbell,
    title: "Personalized Workouts",
    description: "AI-powered workout plans tailored to your fitness level, goals, and available equipment.",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Heart,
    title: "Health Tracking",
    description: "Monitor your heart rate, sleep patterns, and recovery to optimize your training.",
    color: "bg-pink-100 text-pink-600"
  },
  {
    icon: LineChart,
    title: "Progress Analytics",
    description: "Detailed insights and progress tracking to keep you motivated and on track.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Smartphone,
    title: "Smart Integration",
    description: "Seamlessly sync with your favorite fitness devices and wearables.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join challenges, share achievements, and get motivation from fellow members.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Zap,
    title: "Quick Workouts",
    description: "Short on time? Access 10-30 minute high-intensity sessions anywhere.",
    color: "bg-yellow-100 text-yellow-600"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-[#f4f6fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 shadow-sm">
            <Target className="w-4 h-4 text-[#667eea]" />
            <span className="text-sm font-medium text-[#666]">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight-custom text-[#111] mb-6">
            Everything you need to
            <span className="text-gradient"> crush your goals</span>
          </h2>
          <p className="text-lg text-[#666] leading-relaxed">
            Our comprehensive platform combines cutting-edge technology with proven
            fitness science to deliver results that last.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 card-hover border border-gray-100"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#111] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#666] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-16 md:mt-24">
          <div className="bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden relative">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                  <Calendar className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Smart Scheduling</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight-custom mb-6">
                  AI-Powered Workout Planning
                </h3>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  Our intelligent algorithm creates the perfect workout schedule
                  based on your availability, recovery needs, and fitness objectives.
                  Never wonder what to do at the gym again.
                </p>
                <ul className="space-y-4">
                  {[
                    "Automatic schedule optimization",
                    "Recovery-based recommendations",
                    "Progressive overload tracking",
                    "Equipment alternatives"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-[#111]">This Week</h4>
                    <span className="text-sm text-[#666]">Dec 2024</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { day: "Mon", workout: "Upper Body", time: "45 min", done: true },
                      { day: "Tue", workout: "HIIT Cardio", time: "30 min", done: true },
                      { day: "Wed", workout: "Rest Day", time: "Recovery", done: true },
                      { day: "Thu", workout: "Lower Body", time: "50 min", done: false, active: true },
                      { day: "Fri", workout: "Core & Abs", time: "25 min", done: false },
                      { day: "Sat", workout: "Full Body", time: "60 min", done: false },
                      { day: "Sun", workout: "Active Recovery", time: "Yoga", done: false }
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                          item.active
                            ? "bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 border-2 border-[#667eea]"
                            : item.done
                              ? "bg-gray-50"
                              : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-medium w-8 ${item.done ? "text-[#aaa]" : "text-[#111]"}`}>
                            {item.day}
                          </span>
                          <span className={`font-medium ${item.done ? "text-[#aaa] line-through" : "text-[#111]"}`}>
                            {item.workout}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#666]">{item.time}</span>
                          {item.done && (
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-green-600 text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
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
