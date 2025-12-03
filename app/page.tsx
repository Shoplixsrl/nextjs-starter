"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Zap,
  BarChart3,
  Plug,
  Shield,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
  Menu,
  X,
  Star,
  Sparkles,
  Bot,
  Cpu,
  Globe,
  Lock,
  Rocket,
  Target,
  MessageSquare,
  Play
} from "lucide-react";

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1cd3a3] to-[#6aebc9] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold text-white">Agentix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                Products
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-[#1a2231] border border-white/10 rounded-2xl p-4 min-w-[250px]">
                    <Link href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <Bot className="w-5 h-5 text-[#1cd3a3]" />
                      <div>
                        <div className="text-white font-medium">AI Agents</div>
                        <div className="text-gray-400 text-sm">Autonomous task execution</div>
                      </div>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <Cpu className="w-5 h-5 text-[#1cd3a3]" />
                      <div>
                        <div className="text-white font-medium">Workflows</div>
                        <div className="text-gray-400 text-sm">Automate your processes</div>
                      </div>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <Globe className="w-5 h-5 text-[#1cd3a3]" />
                      <div>
                        <div className="text-white font-medium">Integrations</div>
                        <div className="text-gray-400 text-sm">Connect your tools</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-[#1a2231] border border-white/10 rounded-2xl p-4 min-w-[250px]">
                    <Link href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <MessageSquare className="w-5 h-5 text-[#1cd3a3]" />
                      <div>
                        <div className="text-white font-medium">Blog</div>
                        <div className="text-gray-400 text-sm">Latest updates and insights</div>
                      </div>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <Target className="w-5 h-5 text-[#1cd3a3]" />
                      <div>
                        <div className="text-white font-medium">Case Studies</div>
                        <div className="text-gray-400 text-sm">Success stories</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">About</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              href="#"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1cd3a3] to-[#37ea9e] text-black font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors py-2">Products</Link>
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors py-2">Features</Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors py-2">Pricing</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors py-2">Resources</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors py-2">About</Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors py-2">Sign In</Link>
                <Link
                  href="#"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1cd3a3] to-[#37ea9e] text-black font-semibold text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Gradient Blur Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#1cd3a3]/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#6aebc9]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#1cd3a3]/10 to-[#37ea9e]/10 rounded-full blur-[180px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#1cd3a3] animate-pulse" />
              <span className="text-sm text-gray-300">Now with GPT-4 & Claude Integration</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Build AI Agents </span>
              <span className="bg-gradient-to-r from-[#1cd3a3] via-[#6aebc9] to-[#95f4cc] bg-clip-text text-transparent">
                That Work For You
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
              Anyone on your team can launch agents—no setup, no code, no learning curve required. Deploy autonomous AI that handles your tasks 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#1cd3a3] to-[#37ea9e] text-black font-semibold text-lg hover:opacity-90 transition-all hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-[#1cd3a3]/30 to-[#6aebc9]/30 flex items-center justify-center"
                  >
                    <span className="text-xs text-white font-medium">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-400">Trusted by 10,000+ teams worldwide</p>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a2231] to-[#0d1117] p-1">
              <div className="rounded-[20px] overflow-hidden bg-[#0d1117]">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1a2231] border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-black/50 rounded-lg px-4 py-1.5 text-sm text-gray-400 text-center">
                      app.agentix.ai/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="text-2xl font-bold text-white">847</div>
                      <div className="text-sm text-gray-400">Tasks Completed</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="text-2xl font-bold text-[#1cd3a3]">12.5h</div>
                      <div className="text-sm text-gray-400">Hours Saved</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="text-2xl font-bold text-white">98%</div>
                      <div className="text-sm text-gray-400">Success Rate</div>
                    </div>
                  </div>

                  {/* Agent Cards */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#1cd3a3]/10 to-transparent border border-[#1cd3a3]/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1cd3a3]/20 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-[#1cd3a3]" />
                        </div>
                        <div>
                          <div className="text-white font-medium">Sales Agent</div>
                          <div className="text-sm text-gray-400">Processing 24 leads</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#1cd3a3] animate-pulse" />
                        <span className="text-sm text-[#1cd3a3]">Active</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">Support Agent</div>
                          <div className="text-sm text-gray-400">Handled 156 tickets today</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#1cd3a3] animate-pulse" />
                        <span className="text-sm text-[#1cd3a3]">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-[#1a2231] border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1cd3a3]/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#1cd3a3]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">+127%</div>
                  <div className="text-xs text-gray-400">Efficiency</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Logos Section
function LogosSection() {
  const logos = [
    "Stripe", "Notion", "Slack", "Vercel", "Linear", "Figma", "GitHub", "Discord"
  ];

  return (
    <section className="py-16 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider">
          Trusted by industry leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo) => (
            <div key={logo} className="text-gray-500 hover:text-gray-300 transition-colors">
              <span className="text-xl font-semibold">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "No-Code Deployment",
      description: "Anyone on your team can launch agents—no setup, no code, no learning curve required."
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Instantly track hours saved, tasks completed, and the true impact of every deployed agent."
    },
    {
      icon: Plug,
      title: "Seamless Integrations",
      description: "Connect your favorite tools in seconds — from communication to data, your agents work wherever you do."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and SOC 2 compliance ensure your data stays protected at all times."
    },
    {
      icon: Clock,
      title: "24/7 Automation",
      description: "Your AI agents never sleep. They work around the clock to keep your business running smoothly."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share agents across your team, set permissions, and collaborate on workflows effortlessly."
    }
  ];

  return (
    <section id="features" className="py-24 lg:py-32 bg-[#0a0f14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Rocket className="w-4 h-4 text-[#1cd3a3]" />
            <span className="text-sm text-gray-300">Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-[#1cd3a3] to-[#6aebc9] bg-clip-text text-transparent">
              scale with AI
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Built for modern teams who want to automate tasks, increase productivity, and focus on what matters most.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#1cd3a3]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1cd3a3]/20 to-[#6aebc9]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-[#1cd3a3]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Your Tools",
      description: "Integrate your existing tools and data sources in just a few clicks. No technical setup required."
    },
    {
      number: "02",
      title: "Configure Your Agent",
      description: "Define what you want your AI agent to do using simple, natural language instructions."
    },
    {
      number: "03",
      title: "Deploy & Monitor",
      description: "Launch your agent and track its performance in real-time through our intuitive dashboard."
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Get started in{" "}
            <span className="bg-gradient-to-r from-[#1cd3a3] to-[#6aebc9] bg-clip-text text-transparent">
              minutes
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Three simple steps to transform how your team works
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-[#1cd3a3]/50 to-transparent -translate-x-1/2" />
              )}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1cd3a3] to-[#37ea9e] text-black font-bold text-xl mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Agentix has completely transformed how we handle customer support. Our response time dropped by 80% and customer satisfaction is at an all-time high.",
      author: "Sarah Chen",
      role: "VP of Customer Success",
      company: "TechFlow Inc.",
      avatar: "SC"
    },
    {
      quote: "The ROI was immediate. Within the first week, our sales team was closing 40% more deals because they could focus on high-value conversations.",
      author: "Marcus Johnson",
      role: "Head of Sales",
      company: "GrowthLabs",
      avatar: "MJ"
    },
    {
      quote: "I was skeptical about AI automation, but Agentix made it so easy. No code, no complexity—just results. Our team saved 200+ hours in the first month.",
      author: "Elena Rodriguez",
      role: "Operations Director",
      company: "ScaleUp Solutions",
      avatar: "ER"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#0a0f14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Star className="w-4 h-4 text-[#1cd3a3]" />
            <span className="text-sm text-gray-300">Customer Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Loved by teams{" "}
            <span className="bg-gradient-to-r from-[#1cd3a3] to-[#6aebc9] bg-clip-text text-transparent">
              everywhere
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#1cd3a3]/30 transition-colors"
            >
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1cd3a3] to-[#6aebc9] flex items-center justify-center text-black font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-sm text-[#1cd3a3]">{testimonial.company}</div>
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
      name: "Starter",
      description: "Perfect for small teams getting started",
      price: "29",
      period: "per month",
      features: [
        "Up to 5 AI agents",
        "1,000 tasks/month",
        "Basic integrations",
        "Email support",
        "7-day history"
      ],
      highlighted: false
    },
    {
      name: "Pro",
      description: "For growing teams that need more power",
      price: "99",
      period: "per month",
      features: [
        "Unlimited AI agents",
        "25,000 tasks/month",
        "Advanced integrations",
        "Priority support",
        "90-day history",
        "Custom workflows",
        "Team collaboration"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      price: "Custom",
      period: "contact sales",
      features: [
        "Everything in Pro",
        "Unlimited tasks",
        "Custom integrations",
        "Dedicated support",
        "Unlimited history",
        "SSO & SAML",
        "SLA guarantee",
        "On-premise option"
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-[#1cd3a3]" />
            <span className="text-sm text-gray-300">Simple Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Start free, scale as{" "}
            <span className="bg-gradient-to-r from-[#1cd3a3] to-[#6aebc9] bg-clip-text text-transparent">
              you grow
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            7-day free trial. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[#1cd3a3]/20 to-[#6aebc9]/10 border-2 border-[#1cd3a3]'
                  : 'bg-gradient-to-br from-white/5 to-transparent border border-white/10'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#1cd3a3] to-[#37ea9e] text-black text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">
                  {plan.price === "Custom" ? "" : "$"}{plan.price}
                </span>
                <span className="text-gray-400 ml-2">/{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#1cd3a3] flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className={`block w-full py-3 rounded-full text-center font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-[#1cd3a3] to-[#37ea9e] text-black hover:opacity-90'
                    : 'border border-white/20 text-white hover:bg-white/5'
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is an AI agent?",
      answer: "An AI agent is an autonomous software program that can perform tasks on your behalf. Unlike traditional automation, AI agents can understand context, make decisions, and handle complex workflows without constant human supervision."
    },
    {
      question: "Do I need coding skills to use Agentix?",
      answer: "Not at all! Agentix is designed for everyone. You can create and deploy AI agents using our intuitive no-code interface. Simply describe what you want the agent to do in plain English, and our system handles the rest."
    },
    {
      question: "What integrations do you support?",
      answer: "We support 100+ integrations including Slack, Notion, Gmail, Salesforce, HubSpot, Jira, GitHub, and many more. We're constantly adding new integrations based on customer feedback."
    },
    {
      question: "How secure is my data?",
      answer: "Security is our top priority. We use bank-grade encryption (AES-256), are SOC 2 Type II certified, and GDPR compliant. Your data is never used to train AI models, and you maintain full ownership and control."
    },
    {
      question: "Can I try Agentix for free?",
      answer: "Yes! We offer a 7-day free trial with full access to all Pro features. No credit card required. You can upgrade, downgrade, or cancel at any time."
    },
    {
      question: "What kind of support do you offer?",
      answer: "All plans include email support. Pro plans get priority support with faster response times. Enterprise customers receive dedicated support with a named account manager and SLA guarantees."
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#0a0f14]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-[#1cd3a3] to-[#6aebc9] bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to know about Agentix
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#1cd3a3] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-6 pt-0 bg-white/5">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
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
    <section className="py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-[40px] overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1cd3a3]/20 via-[#1a2231] to-[#6aebc9]/10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1cd3a3]/30 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#6aebc9]/20 rounded-full blur-[100px]" />

          <div className="relative z-10 p-12 lg:p-20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">
              Ready to transform your workflow with{" "}
              <span className="bg-gradient-to-r from-[#1cd3a3] to-[#6aebc9] bg-clip-text text-transparent">
                AI agents?
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Join thousands of teams already using Agentix to automate their work and focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#1cd3a3] to-[#37ea9e] text-black font-semibold text-lg hover:opacity-90 transition-all hover:scale-105"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all"
              >
                Talk to Sales
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
    Company: ["About", "Blog", "Careers", "Press", "Contact"],
    Resources: ["Documentation", "Help Center", "Community", "Templates", "API"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"]
  };

  return (
    <footer className="py-16 lg:py-20 bg-[#0a0f14] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1cd3a3] to-[#6aebc9] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold text-white">Agentix</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Build AI agents that work for you. No code required.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Agentix. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <LogosSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
