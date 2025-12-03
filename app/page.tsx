import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Check,
  ChevronDown,
  Zap,
  BarChart3,
  MessageSquare,
  Layers,
  Shield,
  Clock,
  Users,
  Globe,
  Star,
  Play
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#151515] text-white overflow-x-hidden">
      {/* Background Gradient Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7FF7BD]/20 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#B57FF7]/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-[#549EFF]/15 rounded-full blur-[160px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#151515]/80 border-b border-white/5">
        <nav className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7FF7BD] to-[#549EFF] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <span className="font-semibold text-lg tracking-tight">Aira</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it works</Link>
            <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Testimonials</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="#"
              className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="w-4 h-4 text-[#F4B674]" />
              <span className="text-sm text-gray-300">Just launched on ProductHunt</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Automate </span>
            <span className="bg-gradient-to-r from-[#7FF7BD] to-[#549EFF] bg-clip-text text-transparent">
              and simplify
            </span>
            <br />
            <span className="text-white">your workflow with ease</span>
          </h1>

          {/* Subheadline */}
          <p className="text-center text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Experience a seamless integration of AI into your workflow.
            Generate, edit and transform workflows with our intelligent platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="#"
              className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="px-6 py-3 bg-white/5 border border-white/10 font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Watch demo
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/airate/dashboard-1.jpg"
                  alt="Aira Dashboard"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#7FF7BD]/20 via-[#B57FF7]/20 to-[#549EFF]/20 blur-3xl -z-10 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-gray-500 text-sm mb-8">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {['Vercel', 'Stripe', 'Notion', 'Linear', 'Figma', 'Framer'].map((logo) => (
              <div key={logo} className="text-xl font-semibold text-gray-400">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7FF7BD]/10 border border-[#7FF7BD]/20 mb-4">
              <span className="text-sm text-[#7FF7BD]">Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Explore features designed to
              <br />
              <span className="bg-gradient-to-r from-[#7FF7BD] to-[#549EFF] bg-clip-text text-transparent">
                enhance your business
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our range of innovative tools designed for your success
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[#7FF7BD]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7FF7BD]/20 to-[#7FF7BD]/5 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#7FF7BD]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-gray-400">Real-time processing for insights and decisions that drive your business forward.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[#B57FF7]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B57FF7]/20 to-[#B57FF7]/5 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-[#B57FF7]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Natural Language</h3>
              <p className="text-gray-400">Natural language understanding that makes interaction intuitive and effortless.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[#549EFF]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#549EFF]/20 to-[#549EFF]/5 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-[#549EFF]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
              <p className="text-gray-400">Advanced predictive models that help you stay ahead of market trends.</p>
            </div>

            {/* Feature Card 4 */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[#F4B674]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F4B674]/20 to-[#F4B674]/5 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-[#F4B674]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Integrations</h3>
              <p className="text-gray-400">Integration with popular apps for a unified workflow experience.</p>
            </div>

            {/* Feature Card 5 */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[#7FF7BD]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7FF7BD]/20 to-[#7FF7BD]/5 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#7FF7BD]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scalable Solutions</h3>
              <p className="text-gray-400">Scalable solutions that grow with your business needs.</p>
            </div>

            {/* Feature Card 6 */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[#B57FF7]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B57FF7]/20 to-[#B57FF7]/5 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#B57FF7]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Intelligent Time Management</h3>
              <p className="text-gray-400">Smart scheduling and time optimization for maximum productivity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B57FF7]/10 border border-[#B57FF7]/20 mb-4">
              <span className="text-sm text-[#B57FF7]">How it works</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Simple setup in just
              <br />
              <span className="bg-gradient-to-r from-[#B57FF7] to-[#549EFF] bg-clip-text text-transparent">
                a few steps
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get started quickly with our intuitive onboarding process
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="text-6xl font-bold text-white/5 absolute -top-4 -left-2">01</div>
              <div className="relative pt-12">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7FF7BD] to-[#549EFF] flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Create your account</h3>
                <p className="text-gray-400">Sign up in seconds and get immediate access to all features with our free tier.</p>
              </div>
            </div>

            <div className="relative">
              <div className="text-6xl font-bold text-white/5 absolute -top-4 -left-2">02</div>
              <div className="relative pt-12">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B57FF7] to-[#7FF7BD] flex items-center justify-center mb-6">
                  <Layers className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect your tools</h3>
                <p className="text-gray-400">Integrate with your favorite apps and services in just a few clicks.</p>
              </div>
            </div>

            <div className="relative">
              <div className="text-6xl font-bold text-white/5 absolute -top-4 -left-2">03</div>
              <div className="relative pt-12">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#549EFF] to-[#B57FF7] flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Start automating</h3>
                <p className="text-gray-400">Let AI handle the repetitive tasks while you focus on what matters most.</p>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/airate/dashboard-2.jpg"
                  alt="Aira Dashboard Preview"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4B674]/10 border border-[#F4B674]/20 mb-4">
              <span className="text-sm text-[#F4B674]">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Hear from our
              <br />
              <span className="bg-gradient-to-r from-[#F4B674] to-[#B57FF7] bg-clip-text text-transparent">
                satisfied customers
              </span>
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F4B674] text-[#F4B674]" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;Experience the enchanting magic of AI as it transforms data into insights.
                This tool has completely revolutionized how we work.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7FF7BD] to-[#549EFF]" />
                <div>
                  <p className="font-medium">John Umbridge</p>
                  <p className="text-sm text-gray-400">Marketing Director</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F4B674] text-[#F4B674]" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;The integration capabilities are outstanding. We connected all our tools
                in minutes and saw immediate productivity gains.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B57FF7] to-[#F4B674]" />
                <div>
                  <p className="font-medium">Sarah Chen</p>
                  <p className="text-sm text-gray-400">Product Manager</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F4B674] text-[#F4B674]" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;Chat that grows with you. The continuous learning feature means
                the AI keeps getting better at understanding our specific needs.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#549EFF] to-[#7FF7BD]" />
                <div>
                  <p className="font-medium">Michael Torres</p>
                  <p className="text-sm text-gray-400">Entrepreneur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#549EFF]/10 border border-[#549EFF]/20 mb-4">
              <span className="text-sm text-[#549EFF]">Pricing</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Choose the plan that
              <br />
              <span className="bg-gradient-to-r from-[#549EFF] to-[#7FF7BD] bg-clip-text text-transparent">
                fits your needs
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>

          {/* Pricing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-4 p-1 rounded-full bg-white/5 border border-white/10">
              <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium">
                Monthly
              </button>
              <button className="px-4 py-2 rounded-full text-gray-400 text-sm font-medium hover:text-white transition-colors">
                Annual <span className="text-[#7FF7BD]">-20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Basic Plan */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <p className="text-gray-400 text-sm mb-6">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <Link
                href="#"
                className="block w-full py-3 text-center rounded-full bg-white/10 border border-white/10 font-medium hover:bg-white/20 transition-colors mb-8"
              >
                Get started
              </Link>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Access to core AI tools
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Basic analytics and reporting
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Community forum access
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Email support
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#7FF7BD]/10 to-transparent border-2 border-[#7FF7BD]/30">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#7FF7BD] text-black text-xs font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-gray-400 text-sm mb-6">For growing teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-400">/month</span>
              </div>
              <Link
                href="#"
                className="block w-full py-3 text-center rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors mb-8"
              >
                Get started
              </Link>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  All Basic Plan features
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Enhanced analytics and insights
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Integration with popular apps
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Priority email support
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Built-in smart citations
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-gray-400 text-sm mb-6">For large organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-gray-400">/month</span>
              </div>
              <Link
                href="#"
                className="block w-full py-3 text-center rounded-full bg-white/10 border border-white/10 font-medium hover:bg-white/20 transition-colors mb-8"
              >
                Contact sales
              </Link>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  All Pro Plan features
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Comprehensive training and support
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Multi-platform integration
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  LLM transformer models
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-[#7FF7BD]" />
                  Features in experimentation mode
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Common questions
              <br />
              <span className="bg-gradient-to-r from-[#7FF7BD] to-[#B57FF7] bg-clip-text text-transparent">
                answered
              </span>
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {[
              {
                q: "How does the AI-powered workflow automation work?",
                a: "Our AI analyzes your existing workflows and suggests optimizations. It learns from your patterns to automate repetitive tasks while keeping you in control."
              },
              {
                q: "Can I integrate with my existing tools?",
                a: "Yes! We support integrations with over 100+ popular tools including Slack, Notion, Google Workspace, and more. Setting up takes just a few clicks."
              },
              {
                q: "Is my data secure?",
                a: "Absolutely. We use enterprise-grade encryption and never share your data with third parties. Your information stays private and secure."
              },
              {
                q: "What happens when I exceed my plan limits?",
                a: "We'll notify you before you reach your limits. You can upgrade anytime, or we offer pay-as-you-go options for occasional overages."
              },
              {
                q: "Do you offer a free trial?",
                a: "Yes! Our Basic plan is free forever with core features. For Pro features, we offer a 14-day free trial with no credit card required."
              }
            ].map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium pr-6">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7FF7BD]/20 via-[#B57FF7]/20 to-[#549EFF]/20" />
            <div className="absolute inset-0 bg-[#151515]/80" />
            <div className="absolute inset-[1px] rounded-3xl border border-white/10" />

            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Start simplifying your
                <br />
                <span className="bg-gradient-to-r from-[#7FF7BD] to-[#549EFF] bg-clip-text text-transparent">
                  workflow today
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                Join thousands of teams already using Aira to automate their workflows and boost productivity.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#"
                  className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  Get started free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="px-8 py-4 bg-white/5 border border-white/10 font-medium rounded-full hover:bg-white/10 transition-all"
                >
                  Talk to sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7FF7BD] to-[#549EFF] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <span className="font-semibold text-lg tracking-tight">Aira</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Automate and simplify your workflow with ease.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Changelog</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Roadmap</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Community</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Aira. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
