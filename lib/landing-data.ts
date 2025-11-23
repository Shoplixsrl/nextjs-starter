import { Zap, Shield, Gauge, Cloud, Users, BarChart3 } from "lucide-react"

export const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built on cutting-edge infrastructure for unparalleled performance and speed.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.",
  },
  {
    icon: Gauge,
    title: "Real-time Analytics",
    description: "Monitor your metrics in real-time with comprehensive dashboards and insights.",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    description: "Scalable architecture that grows with your business needs automatically.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless collaboration tools designed for modern distributed teams.",
  },
  {
    icon: BarChart3,
    title: "Advanced Reports",
    description: "Generate detailed reports and export data in multiple formats instantly.",
  },
]

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechVision",
    company: "TechVision Inc.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "CloudFlow transformed how we manage our workflow. The ROI was immediate and the team adopted it seamlessly.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Operations",
    company: "Innovate Labs",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    content: "We've seen a 3x increase in productivity since implementing CloudFlow. It's simply the best tool we've used.",
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    company: "Digital Dynamics",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content: "The analytics and reporting features are outstanding. We can make data-driven decisions faster than ever.",
  },
  {
    name: "James Kim",
    role: "CEO",
    company: "StartupX",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    content: "CloudFlow scaled perfectly with our rapid growth. The enterprise features at this price point are unbeatable.",
  },
  {
    name: "Lisa Anderson",
    role: "VP Engineering",
    company: "CloudScale",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    content: "Security and compliance were our top priorities. CloudFlow exceeded our expectations in every aspect.",
  },
  {
    name: "David Park",
    role: "Founder",
    company: "GrowthHQ",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    content: "The customer support is phenomenal and the platform is incredibly intuitive. Best decision for our business.",
  },
]

export const pricingPlans = [
  {
    name: "Starter",
    price: "29",
    period: "month",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 5 team members",
      "10 GB storage",
      "Basic analytics",
      "Email support",
      "Core features",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "79",
    period: "month",
    description: "For growing teams and businesses",
    features: [
      "Up to 25 team members",
      "100 GB storage",
      "Advanced analytics",
      "Priority support",
      "All core features",
      "Custom integrations",
      "API access",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "199",
    period: "month",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited team members",
      "Unlimited storage",
      "Advanced analytics + AI",
      "24/7 dedicated support",
      "All features included",
      "Custom integrations",
      "API access",
      "SLA guarantee",
      "Custom training",
    ],
    highlighted: false,
  },
]

export const faqs = [
  {
    question: "How does the free trial work?",
    answer:
      "You can start a 14-day free trial with no credit card required. Access all Professional plan features during the trial period. Cancel anytime without any charges.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges or credits.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, security is our top priority. We use bank-level 256-bit encryption, regular security audits, and are compliant with SOC 2, GDPR, and HIPAA standards.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact us within 30 days for a full refund, no questions asked.",
  },
  {
    question: "How does customer support work?",
    answer:
      "All plans include email support. Professional plans get priority support with faster response times. Enterprise plans include 24/7 dedicated support with a dedicated account manager.",
  },
]

export const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Testimonials", href: "#testimonials" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Community", href: "#" },
    { name: "Support", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#" },
    { name: "Cookies", href: "#" },
  ],
}
