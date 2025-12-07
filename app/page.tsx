import Image from "next/image";
import Link from "next/link";

// Header Component
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="section-container">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ff6d99] rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="white"/>
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-[#111]">FitFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-[#666] hover:text-[#111] font-medium text-[15px] transition-colors">Features</Link>
            <Link href="#about" className="text-[#666] hover:text-[#111] font-medium text-[15px] transition-colors">About</Link>
            <Link href="#testimonials" className="text-[#666] hover:text-[#111] font-medium text-[15px] transition-colors">Testimonials</Link>
            <Link href="#pricing" className="text-[#666] hover:text-[#111] font-medium text-[15px] transition-colors">Pricing</Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Link href="#contact" className="btn-primary text-[15px] hidden sm:inline-flex">
              Get Started
            </Link>
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/fitflow/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container flex flex-col justify-end min-h-screen pb-20 pt-32">
        <div className="max-w-4xl">
          <h1 className="font-heading font-extrabold text-[56px] md:text-[72px] lg:text-[88px] leading-[1.05] text-white mb-6">
            Transform Your<br />
            <span className="text-white/90">Fitness Journey</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-xl mb-10 font-medium leading-relaxed">
            Join thousands of people who have transformed their lives with personalized coaching and proven fitness programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#contact" className="inline-flex items-center justify-center bg-white text-[#111] rounded-full px-8 py-4 font-semibold text-[16px] hover:bg-white/90 transition-all">
              Start Free Trial
            </Link>
            <Link href="#features" className="inline-flex items-center justify-center border-2 border-white text-white rounded-full px-8 py-4 font-semibold text-[16px] hover:bg-white/10 transition-all">
              Learn More
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-12 mt-16">
          <div>
            <p className="font-heading font-extrabold text-4xl md:text-5xl text-white">10K+</p>
            <p className="text-white/70 text-sm mt-1">Active Members</p>
          </div>
          <div>
            <p className="font-heading font-extrabold text-4xl md:text-5xl text-white">95%</p>
            <p className="text-white/70 text-sm mt-1">Success Rate</p>
          </div>
          <div>
            <p className="font-heading font-extrabold text-4xl md:text-5xl text-white">50+</p>
            <p className="text-white/70 text-sm mt-1">Expert Coaches</p>
          </div>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="absolute right-0 bottom-0 hidden lg:block w-[400px] h-[600px]">
        <Image
          src="/images/fitflow/phone-mockup.png"
          alt="FitFlow App"
          fill
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#ff6d99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Personalized Plans",
      description: "Custom workout and nutrition plans tailored to your specific goals and fitness level."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#ff6d99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Progress Tracking",
      description: "Track your progress with detailed analytics and visual reports of your fitness journey."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#ff6d99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Expert Coaches",
      description: "Get guidance from certified fitness professionals who are passionate about your success."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#ff6d99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Community Support",
      description: "Join a supportive community of like-minded individuals on their fitness journey."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#ff6d99" strokeWidth="2"/>
          <line x1="16" y1="2" x2="16" y2="6" stroke="#ff6d99" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="2" x2="8" y2="6" stroke="#ff6d99" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="#ff6d99" strokeWidth="2"/>
        </svg>
      ),
      title: "Flexible Schedule",
      description: "Work out on your own time with flexible scheduling that fits your lifestyle."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#ff6d99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Safe & Secure",
      description: "Your data is protected with enterprise-grade security and privacy controls."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12zM4 22v-7" stroke="#ff6d99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Goal Setting",
      description: "Set achievable goals and milestones to keep you motivated throughout your journey."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#ff6d99" strokeWidth="2"/>
          <polyline points="12,6 12,12 16,14" stroke="#ff6d99" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "24/7 Access",
      description: "Access your workouts, meal plans, and coaching anytime, anywhere."
    }
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#ff6d99] font-semibold text-sm uppercase tracking-wider mb-4">Features</p>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-[#111] mb-6">
            Everything you need to succeed
          </h2>
          <p className="text-[#666] text-lg leading-relaxed">
            Our comprehensive platform provides all the tools and support you need to achieve your fitness goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-fitflow p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#f4f6fa] flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-heading font-bold text-xl text-[#111] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#666] text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// App Showcase Section
function AppShowcaseSection() {
  return (
    <section className="py-24 md:py-32 bg-[#f4f6fa]">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[#ff6d99] font-semibold text-sm uppercase tracking-wider mb-4">Mobile App</p>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-[#111] mb-6">
              Your fitness coach in your pocket
            </h2>
            <p className="text-[#666] text-lg leading-relaxed mb-8">
              Download our app and take your workouts anywhere. Track progress, follow personalized plans, and connect with your coach - all from your phone.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ff6d99] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-[#111] mb-1">Offline Mode</h4>
                  <p className="text-[#666] text-[15px]">Access your workouts even without internet connection.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ff6d99] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-[#111] mb-1">Video Tutorials</h4>
                  <p className="text-[#666] text-[15px]">HD video guides for every exercise in your plan.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ff6d99] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-[#111] mb-1">Real-time Sync</h4>
                  <p className="text-[#666] text-[15px]">Your progress syncs automatically across all devices.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="#" className="inline-block">
                <Image src="/images/fitflow/app-screenshot-1.png" alt="App Store" width={140} height={48} className="h-12 w-auto" />
              </Link>
              <Link href="#" className="inline-block">
                <Image src="/images/fitflow/app-screenshot-2.png" alt="Play Store" width={140} height={48} className="h-12 w-auto" />
              </Link>
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="relative flex justify-center">
            <div className="relative w-[300px] h-[600px] md:w-[350px] md:h-[700px]">
              <Image
                src="/images/fitflow/phone-full.png"
                alt="FitFlow App Screenshot"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// About/Coach Section
function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden">
              <Image
                src="/images/fitflow/coach.jpg"
                alt="Personal Coach"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl max-w-[240px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  <Image src="/images/fitflow/testimonial-1.jpg" alt="" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-white" />
                  <Image src="/images/fitflow/testimonial-2.jpg" alt="" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-white" />
                  <Image src="/images/fitflow/testimonial-3.jpg" alt="" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-white" />
                </div>
                <span className="text-[#ff6d99] font-bold text-sm">+2.5k</span>
              </div>
              <p className="text-[#111] font-semibold text-sm">Happy clients worldwide</p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-[#ff6d99] font-semibold text-sm uppercase tracking-wider mb-4">About Us</p>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-[#111] mb-6">
              We&apos;re passionate about your transformation
            </h2>
            <p className="text-[#666] text-lg leading-relaxed mb-6">
              Founded by fitness enthusiasts and certified professionals, FitFlow was created to make personalized coaching accessible to everyone. We believe that with the right guidance and support, anyone can achieve their fitness goals.
            </p>
            <p className="text-[#666] text-lg leading-relaxed mb-8">
              Our team of expert coaches brings decades of combined experience in fitness, nutrition, and wellness. We&apos;re committed to helping you become the best version of yourself.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <p className="font-heading font-extrabold text-4xl text-[#ff6d99]">8+</p>
                <p className="text-[#666] text-sm">Years Experience</p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-4xl text-[#ff6d99]">15K+</p>
                <p className="text-[#666] text-sm">Transformations</p>
              </div>
            </div>

            <Link href="#contact" className="btn-primary inline-flex items-center gap-2">
              Meet Our Team
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
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
      image: "/images/fitflow/testimonial-1.jpg",
      name: "Sarah Johnson",
      role: "Lost 30 lbs",
      quote: "FitFlow completely changed my life. The personalized coaching and support helped me achieve goals I never thought possible."
    },
    {
      image: "/images/fitflow/testimonial-2.jpg",
      name: "Michael Chen",
      role: "Gained Muscle",
      quote: "The app is incredibly intuitive and my coach is always there when I need guidance. Best investment in my health ever."
    },
    {
      image: "/images/fitflow/testimonial-3.jpg",
      name: "Emily Davis",
      role: "Marathon Runner",
      quote: "From couch to marathon in 8 months. The structured plans and expert advice made all the difference."
    },
    {
      image: "/images/fitflow/testimonial-4.jpg",
      name: "James Wilson",
      role: "Fitness Enthusiast",
      quote: "I've tried many fitness apps, but FitFlow's personalized approach and community support is unmatched."
    }
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#f4f6fa]">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#ff6d99] font-semibold text-sm uppercase tracking-wider mb-4">Testimonials</p>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-[#111] mb-6">
            Real results from real people
          </h2>
          <p className="text-[#666] text-lg leading-relaxed">
            Join thousands of satisfied members who have transformed their lives with FitFlow.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-[32px] p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-heading font-bold text-lg text-[#111]">{testimonial.name}</h4>
                  <p className="text-[#ff6d99] font-medium text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-[#666] text-lg leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              {/* Star Rating */}
              <div className="flex gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#ff6d99">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trainers Section
function TrainersSection() {
  const trainers = [
    {
      image: "/images/fitflow/trainer-1.jpg",
      name: "Alex Thompson",
      specialty: "Strength & Conditioning"
    },
    {
      image: "/images/fitflow/trainer-2.jpg",
      name: "Maria Garcia",
      specialty: "Yoga & Flexibility"
    },
    {
      image: "/images/fitflow/trainer-3.jpg",
      name: "David Kim",
      specialty: "HIIT & Cardio"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#ff6d99] font-semibold text-sm uppercase tracking-wider mb-4">Our Team</p>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-[#111] mb-6">
            Meet your expert coaches
          </h2>
          <p className="text-[#666] text-lg leading-relaxed">
            Our certified professionals are dedicated to helping you achieve your fitness goals.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="group">
              <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden mb-6">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h4 className="font-heading font-bold text-xl text-[#111] mb-1">{trainer.name}</h4>
              <p className="text-[#666]">{trainer.specialty}</p>
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
      name: "Basic",
      price: "29",
      description: "Perfect for beginners starting their fitness journey",
      features: [
        "Personalized workout plan",
        "Basic nutrition guide",
        "Progress tracking",
        "Email support"
      ],
      highlighted: false
    },
    {
      name: "Pro",
      price: "59",
      description: "For dedicated individuals who want faster results",
      features: [
        "Everything in Basic",
        "1-on-1 coaching sessions",
        "Advanced meal plans",
        "Priority support",
        "Video exercise library"
      ],
      highlighted: true
    },
    {
      name: "Elite",
      price: "99",
      description: "Complete transformation package with premium support",
      features: [
        "Everything in Pro",
        "Weekly video calls",
        "Custom supplement guide",
        "24/7 chat support",
        "Exclusive community"
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#f4f6fa]">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#ff6d99] font-semibold text-sm uppercase tracking-wider mb-4">Pricing</p>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-[#111] mb-6">
            Choose your plan
          </h2>
          <p className="text-[#666] text-lg leading-relaxed">
            Flexible pricing options to fit your budget and goals. Cancel anytime.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-[32px] p-8 ${plan.highlighted ? 'bg-[#111] text-white' : 'bg-white'}`}
            >
              <h3 className={`font-heading font-bold text-xl mb-2 ${plan.highlighted ? 'text-white' : 'text-[#111]'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/70' : 'text-[#666]'}`}>
                {plan.description}
              </p>
              <div className="mb-8">
                <span className={`font-heading font-extrabold text-5xl ${plan.highlighted ? 'text-white' : 'text-[#111]'}`}>
                  ${plan.price}
                </span>
                <span className={plan.highlighted ? 'text-white/70' : 'text-[#666]'}>/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke={plan.highlighted ? '#ff6d99' : '#ff6d99'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={plan.highlighted ? 'text-white/90' : 'text-[#666]'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-full font-semibold transition-all ${
                plan.highlighted
                  ? 'bg-[#ff6d99] text-white hover:bg-[#ff5588]'
                  : 'bg-[#111] text-white hover:bg-[#333]'
              }`}>
                Get Started
              </button>
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
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="section-container">
        <div className="relative rounded-[48px] overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/images/fitflow/about-bg.jpg"
              alt="CTA Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 hero-gradient opacity-80" />
          </div>

          {/* Content */}
          <div className="relative z-10 py-20 md:py-32 px-8 md:px-16 text-center">
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6 max-w-3xl mx-auto">
              Ready to start your transformation?
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Join FitFlow today and get access to personalized coaching, workout plans, and a supportive community.
            </p>

            {/* Email Form */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-fitflow flex-1 text-[#111]"
              />
              <button className="bg-[#111] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#333] transition-colors whitespace-nowrap">
                Start Free Trial
              </button>
            </div>
            <p className="text-white/60 text-sm mt-4">
              No credit card required. Start your 7-day free trial today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#111] text-white py-16 md:py-20">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#ff6d99] rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="white"/>
                </svg>
              </div>
              <span className="font-heading font-bold text-xl text-white">FitFlow</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Your personal fitness companion for achieving your health and wellness goals.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-white/60 hover:text-white transition-colors text-sm">Features</Link></li>
              <li><Link href="#pricing" className="text-white/60 hover:text-white transition-colors text-sm">Pricing</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">Mobile App</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#about" className="text-white/60 hover:text-white transition-colors text-sm">About</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">Careers</Link></li>
              <li><Link href="#contact" className="text-white/60 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} FitFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/40 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </Link>
            <Link href="#" className="text-white/40 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            <Link href="#" className="text-white/40 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
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
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AppShowcaseSection />
      <AboutSection />
      <TestimonialsSection />
      <TrainersSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
