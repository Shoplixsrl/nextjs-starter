"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "API", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Partners", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:contact@agen.ai", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--agen-gray-lighter)]">
      <div className="agen-container py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo and description */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[var(--agen-yellow)] rounded-xl flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#090a0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#090a0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#090a0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-[var(--agen-black)]">
                Agen
              </span>
            </Link>
            <p className="text-[var(--agen-gray)] mb-6 max-w-xs">
              Build AI agents that work for you. Transform customer support with
              intelligent automation.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-[var(--agen-bg)] flex items-center justify-center text-[var(--agen-gray)] hover:bg-[var(--agen-yellow)] hover:text-[var(--agen-black)] transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-semibold text-[var(--agen-black)] mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[var(--agen-gray)] hover:text-[var(--agen-black)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold text-[var(--agen-black)] mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[var(--agen-gray)] hover:text-[var(--agen-black)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="font-semibold text-[var(--agen-black)] mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[var(--agen-gray)] hover:text-[var(--agen-black)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold text-[var(--agen-black)] mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[var(--agen-gray)] hover:text-[var(--agen-black)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-[var(--agen-bg)] rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-xl font-semibold text-[var(--agen-black)] mb-2">
                Subscribe to our newsletter
              </h4>
              <p className="text-[var(--agen-gray)]">
                Get the latest updates, tips, and insights delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 rounded-full border border-[var(--agen-gray-lighter)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--agen-yellow)] min-w-[250px]"
              />
              <button className="agen-btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-[var(--agen-gray-lighter)]">
          <p className="text-[var(--agen-gray)] text-sm">
            &copy; {new Date().getFullYear()} Agen. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[var(--agen-gray)]">
            <span>Made with</span>
            <span className="text-red-500">&#10084;</span>
            <span>by Grooic LLC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
