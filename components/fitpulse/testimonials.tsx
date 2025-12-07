"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marathon Runner",
    image: "SJ",
    content: "FitPulse completely transformed my training routine. The AI recommendations are spot-on, and I've improved my marathon time by 15 minutes in just 3 months.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Fitness Enthusiast",
    image: "MC",
    content: "I've tried dozens of fitness apps, but nothing comes close to FitPulse. The personalized workouts and progress tracking keep me motivated every single day.",
    rating: 5
  },
  {
    name: "Emma Williams",
    role: "Busy Professional",
    image: "EW",
    content: "As someone with a hectic schedule, the quick workout options are a lifesaver. I can squeeze in effective sessions even on my busiest days.",
    rating: 5
  },
  {
    name: "David Rodriguez",
    role: "Weight Loss Journey",
    image: "DR",
    content: "Down 30 pounds in 4 months! The nutrition tracking combined with smart workout plans made all the difference. Can't recommend this enough.",
    rating: 5
  },
  {
    name: "Lisa Park",
    role: "Yoga Instructor",
    image: "LP",
    content: "I recommend FitPulse to all my students. The variety of workouts and the attention to recovery is exactly what people need for balanced fitness.",
    rating: 5
  },
  {
    name: "James Thompson",
    role: "CrossFit Athlete",
    image: "JT",
    content: "The progress analytics are incredible. Being able to see my strength gains over time keeps me pushing harder every session.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-[#f4f6fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 shadow-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-[#666]">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight-custom text-[#111] mb-6">
            Loved by
            <span className="text-gradient"> 50,000+ users</span>
          </h2>
          <p className="text-lg text-[#666] leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our community
            has to say about their FitPulse experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 card-hover border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-[#667eea]/20 absolute top-6 right-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-[#111] leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-semibold text-[#111]">{testimonial.name}</p>
                  <p className="text-sm text-[#666]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["SJ", "MC", "EW", "DR"].map((initials, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-[#666]">Join 50K+ members</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="text-[#666]">4.9/5 Rating</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-[#666]">Featured on App Store</span>
          </div>
        </div>
      </div>
    </section>
  );
}
