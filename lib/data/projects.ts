export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    year: "2024",
    link: "#",
  },
  {
    id: "2",
    title: "AI Content Generator",
    description: "SaaS platform leveraging GPT-4 API for automated content creation with SEO optimization and multi-language support.",
    tags: ["React", "Node.js", "OpenAI", "Redis"],
    year: "2024",
    link: "#",
  },
  {
    id: "3",
    title: "Real-Time Analytics Dashboard",
    description: "Enterprise analytics platform processing millions of events daily with customizable widgets and data visualization.",
    tags: ["Vue.js", "Python", "Apache Kafka", "D3.js"],
    year: "2023",
    link: "#",
  },
  {
    id: "4",
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication, instant transfers, and budget tracking features.",
    tags: ["React Native", "GraphQL", "AWS", "MongoDB"],
    year: "2023",
    link: "#",
  },
  {
    id: "5",
    title: "DevOps Automation Suite",
    description: "Comprehensive CI/CD pipeline automation tool with infrastructure provisioning and monitoring capabilities.",
    tags: ["Go", "Docker", "Kubernetes", "Terraform"],
    year: "2023",
    link: "#",
  },
  {
    id: "6",
    title: "Social Media Scheduler",
    description: "Multi-platform social media management tool with AI-powered posting optimization and analytics.",
    tags: ["TypeScript", "Express", "PostgreSQL", "Bull"],
    year: "2022",
    link: "#",
  },
];
