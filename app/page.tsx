"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "rgb(240, 241, 242)" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-[142px] h-[55px]">
            <Image
              src="/geniai/pTjMKbpgqUMuwl5KBCRw0sFjoEM.png"
              alt="GeniAI Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2 glass rounded-full px-6 py-3">
            <Link href="#about" className="nav-link px-4 py-2 text-[16px] font-medium text-[rgb(42,42,42)] hover:text-[rgb(26,75,237)] transition-colors" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              About
            </Link>
            <Link href="#features" className="nav-link px-4 py-2 text-[16px] font-medium text-[rgb(42,42,42)] hover:text-[rgb(26,75,237)] transition-colors" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              Features
            </Link>
            <Link href="#pricing" className="nav-link px-4 py-2 text-[16px] font-medium text-[rgb(42,42,42)] hover:text-[rgb(26,75,237)] transition-colors" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              Pricing
            </Link>
            <Link href="#contact" className="nav-link px-4 py-2 text-[16px] font-medium text-[rgb(42,42,42)] hover:text-[rgb(26,75,237)] transition-colors" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 bg-white rounded-[11px] border-4 border-[rgb(240,241,242)] card-shadow"
          >
            <div className="flex gap-[3px]">
              <div className="w-[5px] h-[5px] rounded-full bg-black"></div>
              <div className="w-[5px] h-[5px] rounded-full bg-black"></div>
              <div className="w-[5px] h-[5px] rounded-full bg-black"></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 glass rounded-[24px] p-6">
            <div className="flex flex-col gap-4">
              <Link href="#about" className="text-[16px] font-medium text-[rgb(42,42,42)]">About</Link>
              <Link href="#features" className="text-[16px] font-medium text-[rgb(42,42,42)]">Features</Link>
              <Link href="#pricing" className="text-[16px] font-medium text-[rgb(42,42,42)]">Pricing</Link>
              <Link href="#contact" className="text-[16px] font-medium text-[rgb(42,42,42)]">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-[120px] md:pt-[160px] pb-16 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto">
          {/* Hero Content */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            {/* Left Side - Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                <span className="text-[rgb(26,75,237)]">Your</span><br />
                <span className="text-black">smart</span><br />
                <span className="text-black">assist</span><br />
                <span className="text-black">pocket</span>
              </h1>
            </div>

            {/* Right Side - Phone Mockup with Chat */}
            <div className="flex-1 relative flex justify-center">
              <div className="relative w-[300px] md:w-[400px] h-[500px] md:h-[600px]">
                {/* Main Phone Image */}
                <Image
                  src="/geniai/Dnpvup1NyF3hzpSZcFDgQYUY.webp"
                  alt="GeniAI App"
                  fill
                  className="object-contain animate-float"
                  priority
                />
                {/* Floating Chat Bubble */}
                <div className="absolute -right-10 top-20 bg-white rounded-2xl p-4 shadow-lg card-shadow max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[rgb(117,183,240)] to-[rgb(26,75,237)]"></div>
                    <span className="font-medium text-sm">Geni</span>
                  </div>
                  <p className="text-sm text-[rgb(112,112,112)]">Thanks for helping</p>
                </div>
              </div>
            </div>
          </div>

          {/* Get App Button & Unlock Text */}
          <div className="mt-16 text-center">
            <p className="text-[24px] md:text-[32px] font-semibold mb-6 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
              Unlock the Power of Gen AI
            </p>
            <button className="btn-primary px-8 py-4 rounded-full text-[16px] font-medium inline-flex items-center gap-2">
              Get App
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto">
          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AI Writing Assistant */}
            <div className="bg-white rounded-[24px] p-6 card-shadow">
              <div className="relative w-full h-[223px] mb-4 rounded-[16px] overflow-hidden">
                <Image
                  src="/geniai/cFl24iPInxckRrL32eRgadp9ZJM.png"
                  alt="AI Writing Assistant"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[20px] font-semibold mb-3 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                AI Writing Assistant
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Get instant responses
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Maintain grammar and tone
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Write faster with completions
                </li>
              </ul>
            </div>

            {/* Image Generation Tool */}
            <div className="bg-white rounded-[24px] p-6 card-shadow">
              <div className="relative w-full h-[223px] mb-4 rounded-[16px] overflow-hidden">
                <Image
                  src="/geniai/AeGQJ6DBAVtxnjfQLKh4Esch6Ww.png"
                  alt="Image Generation Tool"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[20px] font-semibold mb-2 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                Image Generation Tool
              </h3>
              <p className="text-[14px] text-[rgb(112,112,112)] mb-3">
                Create stunning visuals with just a few words. No design skills required just describe and generate.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Brand-ready outputs
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Multiple styles and layouts
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Quick image-to-canvas
                </li>
              </ul>
            </div>

            {/* Custom Bot Builder */}
            <div className="bg-white rounded-[24px] p-6 card-shadow">
              <div className="relative w-full h-[223px] mb-4 rounded-[16px] overflow-hidden">
                <Image
                  src="/geniai/GS7HuOVJOBQp6fKrWKy8uGltpc.png"
                  alt="Custom Bot Builder"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[20px] font-semibold mb-2 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                Custom Bot Builder
              </h3>
              <p className="text-[14px] text-[rgb(112,112,112)] mb-3">
                Automate tasks with personalized bots from editing to scheduling and customer support.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  No coding required
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Build your bots
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Works with Slack & Chat
                </li>
              </ul>
            </div>

            {/* Workflow Integrations */}
            <div className="bg-white rounded-[24px] p-6 card-shadow">
              <div className="relative w-full h-[223px] mb-4 rounded-[16px] overflow-hidden">
                <Image
                  src="/geniai/KUGxz5L9S9WjGZRGJlIwmhqwBg.png"
                  alt="Workflow Integrations"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[20px] font-semibold mb-2 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                Workflow Integrations
              </h3>
              <p className="text-[14px] text-[rgb(112,112,112)] mb-3">
                Connect Geni AI with your favorite apps to automate everyday tasks and sync work.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Works with Slack, Notion, etc
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Reduces copy-paste work
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-4 h-4 text-[rgb(26,75,237)]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="3"/>
                  </svg>
                  Keeps all your tools in sync
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Intelligence Section */}
      <section id="about" className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-semibold mb-4 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
              Unmatched and Adaptive AI Intelligence
            </h2>
            <p className="text-[16px] md:text-[18px] text-[rgb(112,112,112)] max-w-[600px] mx-auto">
              From scheduling meetings with Google Calendar to automating communication in Slack.
            </p>
          </div>

          {/* AI Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ultrafast Response */}
            <div className="bg-white rounded-[24px] p-8 card-shadow">
              <div className="relative w-full h-[200px] mb-6 rounded-[16px] overflow-hidden">
                <Image
                  src="/geniai/wvBInyirgU6rsT6Ztwk6dKjQc2s.webp"
                  alt="Ultrafast Response"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[24px] font-semibold mb-3 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                Ultrafast Response Rate
              </h3>
              <p className="text-[16px] text-[rgb(112,112,112)]">
                Get instant responses, whether you&apos;re generating content, images, etc.
              </p>
            </div>

            {/* OpenAI Powered */}
            <div className="bg-black rounded-[24px] p-8 card-shadow text-white">
              <div className="relative w-full h-[200px] mb-6 rounded-[16px] overflow-hidden">
                <Image
                  src="/geniai/lrIBxPzwtFsSFVoxt985gH7DLE.webp"
                  alt="OpenAI Powered"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[24px] font-semibold mb-3" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                Powered by OpenAI&apos;s Advanced Model
              </h3>
            </div>

            {/* Always Learning */}
            <div className="bg-white rounded-[24px] p-8 card-shadow">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[rgb(240,241,242)]">
                <Image
                  src="/geniai/D9ezxGCVrqINYM87ZiVL8r0BwOw.svg"
                  alt="Learning Icon"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-[24px] font-semibold mb-3 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                Always Learning
              </h3>
              <p className="text-[16px] text-[rgb(112,112,112)]">
                Continuous evolving to deliver better outputs.
              </p>
            </div>

            {/* Secure and Reliable */}
            <div className="bg-white rounded-[24px] p-8 card-shadow">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[rgb(240,241,242)]">
                <Image
                  src="/geniai/OX7vNAfYiPqXJtSgJa7LQ4oVwag.svg"
                  alt="Security Icon"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-[24px] font-semibold mb-3 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                Secure and Reliable
              </h3>
              <p className="text-[16px] text-[rgb(112,112,112)]">
                Built with robust and advance security measures.
              </p>
            </div>

            {/* Bring Any Imagination */}
            <div className="bg-[rgb(26,75,237)] rounded-[24px] p-8 card-shadow text-white md:col-span-2">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-[32px] font-semibold mb-4" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                    Bring Any Imagination to Life
                  </h3>
                  <p className="text-[16px] opacity-90">
                    From content creation to automation, making it the ultimate productivity tool.
                  </p>
                </div>
                <div className="relative w-[200px] h-[200px]">
                  <Image
                    src="/geniai/wMNOxG6LOOonVd53Ohd5WufRlM.webp"
                    alt="Imagination"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Versatility Section */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Designed for Versatility */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 card-shadow">
              <h2 className="text-[32px] md:text-[40px] font-semibold mb-4 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                Designed for Versatility
              </h2>
              <p className="text-[16px] md:text-[18px] text-[rgb(112,112,112)] mb-8">
                From content creation to automation, making it the ultimate productivity tool.
              </p>
              <div className="relative w-full h-[300px] rounded-[24px] overflow-hidden">
                <Image
                  src="/geniai/30LMM3mZCcoHLvpa2qLjMTKT0.png"
                  alt="Versatility"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right - Cards Stack */}
            <div className="flex flex-col gap-6">
              {/* Empowering Every User */}
              <div className="bg-[rgb(25,25,25)] rounded-[32px] p-8 md:p-12 card-shadow text-white">
                <h3 className="text-[28px] md:text-[32px] font-semibold mb-4" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                  Empowering Every User
                </h3>
                <p className="text-[16px] opacity-80">
                  From entrepreneurs to educators, Geni AI provides tools to simplify work.
                </p>
              </div>

              {/* Integrate and Automate */}
              <div className="bg-white rounded-[32px] p-8 md:p-12 card-shadow flex items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-[28px] md:text-[32px] font-semibold mb-4 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                    Integrate and Automate with Ease
                  </h3>
                  <p className="text-[16px] text-[rgb(112,112,112)]">
                    From connecting with your favorite tools to automating workflows, Geni AI simplifies business tasks.
                  </p>
                </div>
                <div className="relative w-[100px] h-[100px] flex-shrink-0">
                  <Image
                    src="/geniai/daksv7JfW8KiSgEerD2Vte1oQ.svg"
                    alt="Integration"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-6 md:px-10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-[32px] md:text-[48px] font-semibold text-center mb-16 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
            Users Share Their Geni AI Success
          </h2>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-[24px] p-6 card-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/geniai/3tKsVb3psNppIRvC1PoQT4FgoQ.jpg"
                    alt="Riya Malhotra"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-black">Riya Malhotra</h4>
                  <p className="text-[12px] text-[rgb(112,112,112)]">Content Manager, PixelEdge</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-[14px] text-[rgb(112,112,112)]">
                &quot;Geni AI has completely changed how I approach content creation. It saves me hours every week!&quot;
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-[24px] p-6 card-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/geniai/48Cqhfwpt7z7CH4A5eVCCMQGbEg.jpg"
                    alt="Daniel Kim"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-black">Daniel Kim</h4>
                  <p className="text-[12px] text-[rgb(112,112,112)]">Growth Strategist, NovaTech</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-[14px] text-[rgb(112,112,112)]">
                &quot;The automation features are incredible. I&apos;ve integrated it with all my tools seamlessly.&quot;
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-[24px] p-6 card-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/geniai/1Xgl1PlC5smj4eYkISyoxGtyRk.jpg"
                    alt="Ayesha Shaikh"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-black">Ayesha Shaikh</h4>
                  <p className="text-[12px] text-[rgb(112,112,112)]">UX Writer, BrightNest Apps</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-[14px] text-[rgb(112,112,112)]">
                &quot;As a UX writer, I need precise and creative copy. Geni AI delivers every time!&quot;
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-[24px] p-6 card-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/geniai/MYlrVK7d5fXdfloNrfa5uiX75UI.jpg"
                    alt="Miguel Torres"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-black">Miguel Torres</h4>
                  <p className="text-[12px] text-[rgb(112,112,112)]">Co-founder, Launchlane</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-[14px] text-[rgb(112,112,112)]">
                &quot;We&apos;ve built our entire startup workflow around Geni AI. It&apos;s an essential tool for us.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[48px] font-semibold mb-4 text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
              Innovative Pricing for Modern Needs
            </h2>
            <p className="text-[16px] md:text-[18px] text-[rgb(112,112,112)] max-w-[600px] mx-auto mb-8">
              From flexible monthly plans to powerful features at no extra cost, Geni AI offers smart pricing.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 card-shadow">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full text-[14px] font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-black text-white"
                    : "text-[rgb(112,112,112)]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full text-[14px] font-medium transition-all ${
                  billingCycle === "yearly"
                    ? "bg-black text-white"
                    : "text-[rgb(112,112,112)]"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-[32px] p-8 card-shadow">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[rgb(240,241,242)] rounded-full text-[12px] text-[rgb(112,112,112)] mb-2">
                  New User
                </span>
                <h3 className="text-[24px] font-semibold text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                  Starter
                </h3>
              </div>
              <div className="mb-6">
                <span className="text-[48px] font-bold text-black">$0</span>
                <span className="text-[rgb(112,112,112)]">/month</span>
              </div>
              <p className="text-[14px] text-[rgb(112,112,112)] mb-6">
                Vital functions for beginners who have embarked on AI education
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-5 h-5 text-[rgb(26,75,237)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access to essential AI features
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-5 h-5 text-[rgb(26,75,237)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Powered by standard AI model
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-5 h-5 text-[rgb(26,75,237)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Standard response time
                </li>
              </ul>
              <button className="w-full py-3 border-2 border-black rounded-full text-[14px] font-medium hover:bg-black hover:text-white transition-all">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-black rounded-[32px] p-8 card-shadow text-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[rgb(26,75,237)] rounded-full text-[12px] font-medium">
                Most Popular
              </div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[12px] text-white/80 mb-2">
                  Best Value
                </span>
                <h3 className="text-[24px] font-semibold" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                  Pro
                </h3>
              </div>
              <div className="mb-6">
                <span className="text-[48px] font-bold">${billingCycle === "monthly" ? "19" : "15"}</span>
                <span className="text-white/60">/month</span>
              </div>
              <p className="text-[14px] text-white/60 mb-6">
                Advanced features for professionals seeking maximum productivity
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[14px] text-white/80">
                  <svg className="w-5 h-5 text-[rgb(117,183,240)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All Starter features included
                </li>
                <li className="flex items-center gap-2 text-[14px] text-white/80">
                  <svg className="w-5 h-5 text-[rgb(117,183,240)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Powered by GPT-4 model
                </li>
                <li className="flex items-center gap-2 text-[14px] text-white/80">
                  <svg className="w-5 h-5 text-[rgb(117,183,240)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority response time
                </li>
                <li className="flex items-center gap-2 text-[14px] text-white/80">
                  <svg className="w-5 h-5 text-[rgb(117,183,240)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom integrations
                </li>
              </ul>
              <button className="w-full py-3 bg-white text-black rounded-full text-[14px] font-medium hover:bg-white/90 transition-all">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-[32px] p-8 card-shadow">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[rgb(240,241,242)] rounded-full text-[12px] text-[rgb(112,112,112)] mb-2">
                  For Teams
                </span>
                <h3 className="text-[24px] font-semibold text-black" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                  Enterprise
                </h3>
              </div>
              <div className="mb-6">
                <span className="text-[48px] font-bold text-black">$49</span>
                <span className="text-[rgb(112,112,112)]">/month</span>
              </div>
              <p className="text-[14px] text-[rgb(112,112,112)] mb-6">
                Complete solution for teams with advanced needs and support
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-5 h-5 text-[rgb(26,75,237)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All Pro features included
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-5 h-5 text-[rgb(26,75,237)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited team members
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-5 h-5 text-[rgb(26,75,237)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 dedicated support
                </li>
                <li className="flex items-center gap-2 text-[14px] text-[rgb(112,112,112)]">
                  <svg className="w-5 h-5 text-[rgb(26,75,237)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom AI training
                </li>
              </ul>
              <button className="w-full py-3 border-2 border-black rounded-full text-[14px] font-medium hover:bg-black hover:text-white transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative bg-black rounded-[32px] p-8 md:p-16 text-white text-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: "radial-gradient(circle at 20% 80%, rgba(26, 75, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(117, 183, 240, 0.3) 0%, transparent 50%)"
              }}></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[48px] font-semibold mb-4" style={{ fontFamily: "var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif" }}>
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-[16px] md:text-[18px] opacity-80 mb-8 max-w-[500px] mx-auto">
                Join thousands of users who are already experiencing the power of Geni AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-black rounded-full text-[16px] font-medium hover:bg-white/90 transition-all">
                  Get Started Free
                </button>
                <button className="px-8 py-4 border-2 border-white rounded-full text-[16px] font-medium hover:bg-white hover:text-black transition-all">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-6 md:px-10 border-t border-[rgba(0,0,0,0.08)]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <Link href="/" className="relative inline-block w-[142px] h-[55px] mb-4">
                <Image
                  src="/geniai/pTjMKbpgqUMuwl5KBCRw0sFjoEM.png"
                  alt="GeniAI Logo"
                  fill
                  className="object-contain"
                />
              </Link>
              <p className="text-[14px] text-[rgb(112,112,112)]">
                Your AI-powered assistant for productivity and creativity.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-black mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">Integrations</Link></li>
                <li><Link href="#" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">API</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-black mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#about" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">About</Link></li>
                <li><Link href="#" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">Careers</Link></li>
                <li><Link href="#contact" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-black mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-[14px] text-[rgb(112,112,112)] hover:text-black transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[rgba(0,0,0,0.08)]">
            <p className="text-[14px] text-[rgb(112,112,112)] mb-4 md:mb-0">
              2024 GeniAI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgb(240,241,242)] hover:bg-black hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgb(240,241,242)] hover:bg-black hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgb(240,241,242)] hover:bg-black hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
