"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg"
          : "bg-white/25 backdrop-blur-sm"
      } rounded-full border border-[#757372]/15`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link href="/dreelio" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="dreelio-heading font-semibold text-xl text-[#1a1615]">
            Dreelio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 ml-8">
          <Link
            href="#features"
            className="text-[#1a1615] hover:text-[#453f3d] transition-colors text-sm font-medium"
          >
            Features
          </Link>
          <Link
            href="#benefits"
            className="text-[#1a1615] hover:text-[#453f3d] transition-colors text-sm font-medium"
          >
            Benefits
          </Link>
          <Link
            href="#pricing"
            className="text-[#1a1615] hover:text-[#453f3d] transition-colors text-sm font-medium"
          >
            Pricing
          </Link>
          <Link
            href="#blog"
            className="text-[#1a1615] hover:text-[#453f3d] transition-colors text-sm font-medium"
          >
            Blog
          </Link>
          <Link
            href="#contact"
            className="text-[#1a1615] hover:text-[#453f3d] transition-colors text-sm font-medium"
          >
            Contact Us
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          href="#contact"
          className="hidden md:flex ml-6 bg-[#1a1615] text-white px-5 py-2.5 rounded-full dreelio-heading font-semibold text-sm hover:bg-[#453f3d] transition-colors"
        >
          Try Dreelio free
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-6 h-6 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={`w-5 h-0.5 bg-[#1a1615] transition-transform ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-[#1a1615] transition-opacity ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-[#1a1615] transition-transform ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-xl border border-[#e4e2e2] p-4">
          <div className="flex flex-col gap-3">
            <Link href="#features" className="text-[#1a1615] py-2 px-4 rounded-full hover:bg-[#f4f1ee]">Features</Link>
            <Link href="#benefits" className="text-[#1a1615] py-2 px-4 rounded-full hover:bg-[#f4f1ee]">Benefits</Link>
            <Link href="#pricing" className="text-[#1a1615] py-2 px-4 rounded-full hover:bg-[#f4f1ee]">Pricing</Link>
            <Link href="#blog" className="text-[#1a1615] py-2 px-4 rounded-full hover:bg-[#f4f1ee]">Blog</Link>
            <Link href="#contact" className="text-[#1a1615] py-2 px-4 rounded-full hover:bg-[#f4f1ee]">Contact Us</Link>
            <Link href="#contact" className="bg-[#1a1615] text-white py-3 px-4 rounded-full text-center dreelio-heading font-semibold mt-2">
              Try Dreelio free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #9cc1e7 0%, #f4f1ee 100%)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="dreelio-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-[#1a1615] leading-tight mb-6 animate-fade-in-up">
            Run your freelance business like a pro
          </h1>
          <p className="text-lg md:text-xl text-[#453f3d] mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            All-in-one platform for managing clients, projects, and payments—without the chaos. From first contract to final invoice, we&apos;ve got your back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
            <Link
              href="#contact"
              className="bg-[#1a1615] text-white px-8 py-4 rounded-full dreelio-heading font-semibold hover:bg-[#453f3d] transition-colors"
            >
              Try Dreelio free
            </Link>
            <Link
              href="#features"
              className="bg-white/10 text-[#1a1615] px-8 py-4 rounded-full dreelio-heading font-semibold hover:bg-white/20 transition-colors border border-[#1a1615]/10"
            >
              See features
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 animate-fade-in-up animation-delay-400">
          <div className="relative max-w-5xl mx-auto">
            <Image
              src="/dreelio/images/hero-dashboard.png"
              alt="Dreelio Dashboard"
              width={2880}
              height={2000}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Trust Badge */}
        <p className="text-center text-[#757170] mt-12 text-sm animate-fade-in-up animation-delay-500">
          Trusted by 7,000+ top startups, freelancers and studios
        </p>
      </div>
    </section>
  );
}

// Devices Section
function DevicesSection() {
  return (
    <section className="py-20 bg-[#f9f8f8]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-[#614a44] uppercase tracking-wider text-sm font-medium mb-4 dreelio-heading">
            Seamless across devices
          </p>
          <h2 className="dreelio-heading text-3xl md:text-5xl font-semibold text-[#1a1615]">
            Work from anywhere,{" "}
            <span className="block">stay in sync</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button className="bg-[#1a1615] text-white px-6 py-3 rounded-full dreelio-heading font-semibold">
            Mobile App
          </button>
          <button className="bg-white/10 text-[#1a1615] px-6 py-3 rounded-full dreelio-heading font-semibold border border-[#1a1615]/10">
            Web App
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <Image
              src="/dreelio/images/mobile-app.png"
              alt="Mobile App"
              width={1016}
              height={1230}
              className="rounded-2xl"
            />
          </div>
          <div className="relative">
            <Image
              src="/dreelio/images/phone-mockup.png"
              alt="Phone Mockup"
              width={1016}
              height={1228}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Project Management Section
function ProjectManagementSection() {
  const tags = ["Tasks", "Time tracking", "Timesheets", "Reports"];

  return (
    <section className="py-20 bg-[#f9f8f8]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#614a44] uppercase tracking-wider text-sm font-medium mb-4 dreelio-heading">
              project management
            </p>
            <h2 className="dreelio-heading text-3xl md:text-4xl font-semibold text-[#1a1615] mb-4">
              Keep every project moving forward
            </h2>
            <p className="text-[#453f3d] mb-6">
              Plan, assign, and deliver your work
            </p>
            <Link
              href="#contact"
              className="inline-block bg-[#1a1615] text-white px-6 py-3 rounded-full dreelio-heading font-semibold hover:bg-[#453f3d] transition-colors mb-8"
            >
              Try Dreelio free
            </Link>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white px-4 py-2 rounded-full text-[#1a1615] text-sm font-medium border border-[#e4e2e2]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <Image
              src="/dreelio/images/project-management.png"
              alt="Project Management"
              width={2352}
              height={2800}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Financial Management Section
function FinancialManagementSection() {
  const tags = ["Invoicing", "Budgets", "Forecasting", "Integrations"];

  return (
    <section className="py-20 bg-[#f1ebe5]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <Image
              src="/dreelio/images/financial-management.png"
              alt="Financial Management"
              width={3604}
              height={2710}
              className="rounded-2xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[#614a44] uppercase tracking-wider text-sm font-medium mb-4 dreelio-heading">
              financial management
            </p>
            <h2 className="dreelio-heading text-3xl md:text-4xl font-semibold text-[#1a1615] mb-4">
              Track income, get paid, stress less
            </h2>
            <p className="text-[#453f3d] mb-6">
              Create branded invoices
            </p>
            <Link
              href="#contact"
              className="inline-block bg-[#1a1615] text-white px-6 py-3 rounded-full dreelio-heading font-semibold hover:bg-[#453f3d] transition-colors mb-8"
            >
              Try Dreelio free
            </Link>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white px-4 py-2 rounded-full text-[#1a1615] text-sm font-medium border border-[#e4e2e2]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      title: "Personalize every detail",
      description: "Smart, flexible, and built around your business workflow",
      extra: "Easily toggle between various views, including Kanban, cards, list, table, timeline, and calendar.",
    },
    {
      title: "Seamless integrations",
      description: "Integrates seamlessly with the tools you already use",
      extra: "Set your language, currency, time, and date preferences for a seamless experience that feels truly local.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#f9f8f8]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-[#614a44] uppercase tracking-wider text-sm font-medium mb-4 dreelio-heading">
            features
          </p>
          <h2 className="dreelio-heading text-3xl md:text-5xl font-semibold text-[#1a1615]">
            Built for freelancers,{" "}
            <span className="block">powered by simplicity</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#f1ebe5] rounded-3xl p-8"
            >
              <h3 className="dreelio-heading text-xl font-semibold text-[#1a1615] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#453f3d] mb-4">{feature.description}</p>
              <p className="text-[#757170] text-sm">{feature.extra}</p>
            </div>
          ))}
        </div>

        {/* Collaboration Feature */}
        <div className="bg-[#e2ecf5] rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="dreelio-heading text-2xl font-semibold text-[#1a1615] mb-4">
                Collaborate in realtime
              </h3>
              <p className="text-[#453f3d]">
                Keep every conversation in sync use comments, messages, and project chats to stay on the same page.
              </p>
            </div>
            <div>
              <Image
                src="/dreelio/images/collaboration.png"
                alt="Collaboration"
                width={1200}
                height={673}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Dreelio is by far the best agency tool I have ever used",
      name: "VP Marketing, Meta",
      image: "/dreelio/images/testimonial-1.jpg",
    },
    {
      quote: "As a fast-moving design team, we needed a tool that matched our pace. From client onboarding to getting paid, this just works clean, fast, and beautifully built.",
      name: "Art Director, Pentagram",
      image: "/dreelio/images/testimonial-2.jpg",
    },
    {
      quote: "We used to duct-tape tools together. Now our contracts, time tracking, and payments live in one clean system. It's everything a small team needs to stay pro.",
      name: "Project Manager, Google",
      image: "/dreelio/images/testimonial-3.jpg",
    },
    {
      quote: "Managing projects used to mean spreadsheets, DMs, and missed invoices. This platform keeps our workflows tight and our clients impressed.",
      name: "Agency Owner",
      image: "/dreelio/images/testimonial-4.jpg",
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-[#f4e6da]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Featured Quote */}
        <div className="text-center mb-16">
          <h2 className="dreelio-heading text-2xl md:text-4xl font-semibold text-[#1a1615] max-w-3xl mx-auto">
            &ldquo;Dreelio is by far the best agency tool I have ever used&rdquo;
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.slice(1).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[#1a1615] mb-3">&ldquo;{testimonial.quote}&rdquo;</p>
                  <p className="text-[#757170] text-sm">{testimonial.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: "Dreelio Basic",
      price: "$87",
      period: "/mo",
      description: "For solo use with light needs.",
      features: [
        "Unlimited projects",
        "Time tracking",
        "Invoices & payments",
        "Scheduling",
      ],
      cta: "Get started",
      featured: false,
    },
    {
      name: "Dreelio Enterprise",
      price: "$189",
      period: "/mo",
      description: "For pro use with light needs.",
      features: [
        "Everything in Basic",
        "Advanced onboarding",
        "CRM",
        "Hubspot integration",
        "Custom data import",
      ],
      cta: "Contact sales",
      featured: true,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-[#f9f8f8]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-[#614a44] uppercase tracking-wider text-sm font-medium mb-4 dreelio-heading">
            pricing
          </p>
          <h2 className="dreelio-heading text-3xl md:text-5xl font-semibold text-[#1a1615]">
            Simple plans{" "}
            <span className="block">for serious work</span>
          </h2>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 flex gap-1">
            <button className="bg-[#1a1615] text-white px-4 py-2 rounded-full text-sm dreelio-heading font-semibold">
              Monthly
            </button>
            <button className="text-[#1a1615] px-4 py-2 rounded-full text-sm dreelio-heading font-semibold">
              Yearly
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 ${
                plan.featured
                  ? "bg-[#1a1615] text-white"
                  : "bg-white border border-[#e4e2e2]"
              }`}
            >
              <p
                className={`text-sm font-medium mb-2 ${
                  plan.featured ? "text-white/70" : "text-[#453f3d]"
                }`}
              >
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="dreelio-heading text-4xl font-semibold">
                  {plan.price}
                </span>
                <span
                  className={plan.featured ? "text-white/70" : "text-[#757170]"}
                >
                  {plan.period}
                </span>
              </div>
              <p
                className={`mb-6 ${
                  plan.featured ? "text-white/70" : "text-[#757170]"
                }`}
              >
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg
                      className={`w-5 h-5 ${
                        plan.featured ? "text-white" : "text-[#0ea158]"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full dreelio-heading font-semibold transition-colors ${
                  plan.featured
                    ? "bg-white text-[#1a1615] hover:bg-white/90"
                    : "bg-[#1a1615] text-white hover:bg-[#453f3d]"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Blog Section
function BlogSection() {
  const posts = [
    {
      title: "Top 10 digital agency software",
      category: "Tools",
      image: "/dreelio/images/blog-1.png",
    },
    {
      title: "A complete guide to project success in 2026",
      category: "Insight",
      image: "/dreelio/images/blog-2.png",
    },
    {
      title: "What Are Billable Hours",
      category: "Management",
      image: "/dreelio/images/blog-3.png",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-[#f1ebe5]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-[#614a44] uppercase tracking-wider text-sm font-medium mb-4 dreelio-heading">
            blog
          </p>
          <h2 className="dreelio-heading text-3xl md:text-5xl font-semibold text-[#1a1615]">
            Ideas to level-up your freelance game
          </h2>
        </div>

        <div className="mb-8">
          <span className="text-[#614a44] text-sm font-medium dreelio-heading">
            Must Read
          </span>
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-3xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-2">
            <div className="aspect-video md:aspect-auto">
              <Image
                src="/dreelio/images/blog-1.png"
                alt="Featured Post"
                width={1200}
                height={750}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-[#614a44] text-sm font-medium mb-2">Featured</span>
              <h3 className="dreelio-heading text-2xl font-semibold text-[#1a1615] mb-4">
                Learn how to kickstart your journey into agency ownership with our comprehensive guide.
              </h3>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden"
            >
              <div className="aspect-video">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-[#614a44] text-sm font-medium">
                  {post.category}
                </span>
                <h3 className="dreelio-heading text-lg font-semibold text-[#1a1615] mt-2">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Community Section
function CommunitySection() {
  const socials = [
    {
      name: "X/Twitter",
      followers: "15.2K followers",
      description: "Stay updated on new features and discover how others are using Dreelio.",
      cta: "Follow us",
      image: "/dreelio/images/social-x.png",
    },
    {
      name: "YouTube",
      followers: "32k subscribers",
      description: "Tips, tutorials, and in-depth feature guides to inspire and enhance your Dreelio workflow.",
      cta: "Subscribe",
      image: "/dreelio/images/social-youtube.png",
    },
  ];

  return (
    <section className="py-20 bg-[#f9f8f8]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-[#614a44] uppercase tracking-wider text-sm font-medium mb-4 dreelio-heading">
            Community
          </p>
          <h2 className="dreelio-heading text-3xl md:text-5xl font-semibold text-[#1a1615]">
            Stay in the loop
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {socials.map((social, index) => (
            <div
              key={index}
              className="bg-[#f1ebe5] rounded-3xl overflow-hidden"
            >
              <div className="aspect-video">
                <Image
                  src={social.image}
                  alt={social.name}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-[#757170] text-sm mb-1">{social.followers}</p>
                <h3 className="dreelio-heading text-xl font-semibold text-[#1a1615] mb-2">
                  {social.name}
                </h3>
                <p className="text-[#453f3d] mb-4">{social.description}</p>
                <button className="bg-[#1a1615] text-white px-6 py-2.5 rounded-full dreelio-heading font-semibold text-sm hover:bg-[#453f3d] transition-colors">
                  {social.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section id="contact" className="py-20" style={{ background: "linear-gradient(180deg, #9cc1e7 0%, #84b9ef 100%)" }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <h2 className="dreelio-heading text-3xl md:text-5xl font-semibold text-[#1a1615] mb-4">
          Ready to get started
        </h2>
        <p className="text-[#453f3d] mb-8">
          Download Dreelio for free. No credit card required.
        </p>
        <Link
          href="#"
          className="inline-block bg-[#1a1615] text-white px-8 py-4 rounded-full dreelio-heading font-semibold hover:bg-[#453f3d] transition-colors"
        >
          Try Freelio free
        </Link>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const pages = [
    { name: "Home", href: "/dreelio" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Blog", href: "#blog" },
  ];

  const info = [
    { name: "Contact", href: "#contact" },
    { name: "Privacy", href: "#" },
    { name: "Terms of use", href: "#" },
    { name: "404", href: "#" },
  ];

  return (
    <footer className="py-16 bg-[#f9f8f8]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/dreelio" className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="dreelio-heading font-semibold text-xl text-[#1a1615]">
                Dreelio
              </span>
            </Link>
            <p className="text-[#453f3d] max-w-sm">
              Your favourite business management software. Built for early startup founders.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="dreelio-heading font-semibold text-[#1a1615] mb-4 uppercase tracking-wider text-sm">
              Pages
            </h4>
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.name}>
                  <Link
                    href={page.href}
                    className="text-[#453f3d] hover:text-[#1a1615] transition-colors"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="dreelio-heading font-semibold text-[#1a1615] mb-4 uppercase tracking-wider text-sm">
              Information
            </h4>
            <ul className="space-y-2">
              {info.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#453f3d] hover:text-[#1a1615] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#e4e2e2]">
          <p className="text-[#757170] text-sm">
            © 2025 Dreelio. Created by{" "}
            <Link href="#" className="text-[#1a1615] hover:underline">
              Leon Chike
            </Link>
          </p>
          <p className="text-[#757170] text-sm mt-2 md:mt-0">
            Built in{" "}
            <Link
              href="https://framer.com"
              target="_blank"
              rel="noopener"
              className="text-[#1a1615] hover:underline"
            >
              Framer
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function DreelioPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <DevicesSection />
      <ProjectManagementSection />
      <FinancialManagementSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <BlogSection />
      <CommunitySection />
      <CTASection />
      <Footer />
    </main>
  );
}
