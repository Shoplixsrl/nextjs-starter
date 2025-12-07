"use client";

import Image from "next/image";
import { Camera } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80",
    alt: "Weight training",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
    alt: "Group fitness class",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
    alt: "Running outdoors",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=80",
    alt: "Yoga session",
    span: "col-span-1 row-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    alt: "Gym workout",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80",
    alt: "Cardio training",
    span: "col-span-1 row-span-1"
  }
];

export function Gallery() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#f4f6fa] rounded-full px-4 py-2 mb-6">
            <Camera className="w-4 h-4 text-[#667eea]" />
            <span className="text-sm font-medium text-[#666]">Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight-custom text-[#111] mb-6">
            Join our
            <span className="text-gradient"> active community</span>
          </h2>
          <p className="text-lg text-[#666] leading-relaxed">
            See what our members are achieving every day. From beginners to pros,
            everyone is welcome in the FitPulse family.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats below gallery */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "💪", value: "500+", label: "Workout Types" },
            { icon: "🏃", value: "10M+", label: "Workouts Done" },
            { icon: "🌍", value: "150+", label: "Countries" },
            { icon: "⭐", value: "4.9", label: "App Rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-extrabold text-[#111] tracking-tight-custom">
                {stat.value}
              </div>
              <p className="text-[#666] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
