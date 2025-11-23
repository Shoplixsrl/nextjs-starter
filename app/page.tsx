"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, QrCode, FileText, BarChart3, Palette, Globe, ChefHat, Image as ImageIcon, TrendingUp, CheckCircle2, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: Sparkles,
    title: "AI Menu Generation",
    description: "Generate complete restaurant menus in seconds with advanced AI. Just describe your concept and watch magic happen.",
    color: "text-purple-500"
  },
  {
    icon: ImageIcon,
    title: "Professional Food Photography",
    description: "AI-generated food images using fal.ai that look like they're from a professional photo shoot.",
    color: "text-pink-500"
  },
  {
    icon: QrCode,
    title: "Smart QR Codes",
    description: "Dynamic QR codes with real-time analytics, A/B testing, and table-specific tracking.",
    color: "text-blue-500"
  },
  {
    icon: FileText,
    title: "Multi-Format Export",
    description: "Export to web, PDF, or print-ready formats with one click. Perfect for any use case.",
    color: "text-green-500"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track menu performance, customer preferences, and optimize pricing with AI insights.",
    color: "text-orange-500"
  },
  {
    icon: Palette,
    title: "Brand Customization",
    description: "Full control over colors, fonts, layouts. Make it truly yours with drag-and-drop design.",
    color: "text-red-500"
  },
  {
    icon: TrendingUp,
    title: "Food Cost Management",
    description: "Automatic cost calculation, margin optimization, and profitability insights per dish.",
    color: "text-yellow-600"
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Automatically translate your menu into 50+ languages with AI-powered localization.",
    color: "text-teal-500"
  },
];

const stats = [
  { label: "Menus Generated", value: "10K+", icon: ChefHat },
  { label: "Revenue Increase", value: "+32%", icon: TrendingUp },
  { label: "Time Saved", value: "95%", icon: Zap },
  { label: "Customer Rating", value: "4.9/5", icon: Star },
];

const pricing = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Perfect to get started",
    features: [
      "1 restaurant",
      "2 menus",
      "Basic AI generation",
      "Web menu viewer",
      "QR code (static)",
      "Basic analytics"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Professional",
    price: "€29",
    period: "month",
    description: "For growing restaurants",
    features: [
      "5 restaurants",
      "Unlimited menus",
      "Advanced AI generation",
      "AI image generation",
      "PDF export",
      "Dynamic QR codes",
      "Advanced analytics",
      "Food cost management",
      "Multi-language support",
      "Priority support"
    ],
    cta: "Start 14-Day Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "€99",
    period: "month",
    description: "For restaurant chains",
    features: [
      "Unlimited restaurants",
      "Unlimited everything",
      "Custom AI training",
      "White-label solution",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 phone support",
      "SLA guarantee"
    ],
    cta: "Contact Sales",
    popular: false
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by Advanced AI
            </Badge>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              AI Menu Generator
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Create stunning restaurant menus in seconds with AI.<br />
              From concept to print-ready PDF with professional food photography.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Your First Menu
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <FileText className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to dominate
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Built to crush the competition with features that actually matter
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
                  <CardHeader>
                    <feature.icon className={`w-12 h-12 mb-3 ${feature.color}`} />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Pricing</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Start free, upgrade when you're ready
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`relative h-full ${plan.popular ? 'border-purple-500 border-2 shadow-xl' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      <span className="text-slate-600 dark:text-slate-400">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <Button
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>

                    <div className="space-y-3 pt-4">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to revolutionize your menu?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of restaurants already using AI to boost their revenue
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Free Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <ChefHat className="w-6 h-6" />
                MenuAI
              </h3>
              <p className="text-sm">
                The most advanced AI-powered menu generation platform for restaurants.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/demo">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            © 2025 MenuAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
