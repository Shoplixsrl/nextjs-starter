"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How quickly can I get started with Agen?",
    answer:
      "You can set up your first AI agent in less than 10 minutes. Our intuitive onboarding process guides you through connecting your support channels, training your agent with your knowledge base, and going live. Most customers see results within the first day.",
  },
  {
    question: "Do I need technical expertise to use Agen?",
    answer:
      "Not at all! Agen is designed for everyone, from small business owners to enterprise teams. Our no-code interface makes it easy to create, train, and deploy AI agents. For advanced customization, we offer API access and developer tools.",
  },
  {
    question: "How does Agen handle complex or sensitive inquiries?",
    answer:
      "Our AI agents are smart enough to know their limits. When a query requires human expertise or involves sensitive matters, Agen seamlessly escalates to your human team with full context. You can customize escalation rules based on topics, sentiment, or keywords.",
  },
  {
    question: "What channels does Agen support?",
    answer:
      "Agen works across all major support channels including live chat, email, WhatsApp, Facebook Messenger, Instagram DMs, Twitter, SMS, and more. All conversations are unified in a single dashboard for easy management.",
  },
  {
    question: "Is my data secure with Agen?",
    answer:
      "Absolutely. We take security seriously with bank-grade encryption, SOC 2 Type II compliance, GDPR compliance, and optional HIPAA compliance for healthcare customers. Your data is encrypted at rest and in transit, and we never use your data to train public AI models.",
  },
  {
    question: "Can I train the AI with my own knowledge base?",
    answer:
      "Yes! You can easily upload documents, FAQs, product information, and more to train your AI agent. Agen also learns from your past support tickets and continuously improves based on customer interactions and your team's corrections.",
  },
  {
    question: "What happens if I exceed my plan's conversation limit?",
    answer:
      "Don't worry, your service won't be interrupted. We'll notify you when you're approaching your limit and give you the option to upgrade or purchase additional conversations. We believe in transparent pricing with no surprise charges.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes! All plans come with a 7-day free trial with full access to features. No credit card required to start. We want you to experience the power of Agen before making any commitment.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="agen-section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="agen-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="agen-label text-[var(--agen-green)] mb-4 block">
            FAQ
          </span>
          <h2 className="agen-heading-2 text-[var(--agen-black)] mb-6">
            Find quick answers to your{" "}
            <span className="text-[var(--agen-green)]">common questions</span>
          </h2>
          <p className="agen-body">
            Everything you need to know about Agen. Can&apos;t find what you&apos;re
            looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl px-6 border border-[var(--agen-gray-lighter)] data-[state=open]:ring-2 data-[state=open]:ring-[var(--agen-green)]/20"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-[var(--agen-black)] hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--agen-gray)] pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-[var(--agen-gray)] mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:contact@agen.ai"
            className="inline-flex items-center gap-2 text-[var(--agen-black)] font-semibold hover:text-[var(--agen-purple)] transition-colors"
          >
            Contact our support team
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
