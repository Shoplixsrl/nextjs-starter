export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "TechCorp Inc.",
    role: "Senior Full-Stack Developer",
    period: "2023 - Present",
    description: "Leading development of microservices architecture serving 2M+ users. Architected and implemented real-time data processing pipeline reducing latency by 60%.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: "2",
    company: "StartupXYZ",
    role: "Full-Stack Developer",
    period: "2021 - 2023",
    description: "Built MVP from scratch and scaled to 500K users. Implemented CI/CD pipeline reducing deployment time by 75%. Mentored junior developers and conducted code reviews.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Redis", "GCP"],
  },
  {
    id: "3",
    company: "Digital Agency Co.",
    role: "Frontend Developer",
    period: "2020 - 2021",
    description: "Developed responsive web applications for Fortune 500 clients. Optimized performance achieving 95+ Lighthouse scores. Collaborated with design team to create reusable component library.",
    technologies: ["Vue.js", "Tailwind CSS", "JavaScript", "Webpack"],
  },
  {
    id: "4",
    company: "Freelance",
    role: "Web Developer",
    period: "2019 - 2020",
    description: "Delivered 15+ client projects ranging from landing pages to full-stack applications. Specialized in e-commerce solutions and custom CMS development.",
    technologies: ["React", "PHP", "WordPress", "MySQL"],
  },
];
