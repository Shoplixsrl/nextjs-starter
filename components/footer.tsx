"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer id="contact" className="py-12 px-4 border-t border-border bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can collaborate to
            bring your ideas to life.
          </p>

          <motion.a
            href="mailto:hello@example.com"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-lg font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
          </motion.a>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Portfolio. Built with Next.js & Framer Motion.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
