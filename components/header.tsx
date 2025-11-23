"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Github, Linkedin, Mail } from "lucide-react";

export function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          className="text-xl font-bold"
          whileHover={{ scale: 1.02 }}
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Portfolio
          </Link>
        </motion.div>

        <div className="flex items-center gap-2">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
          </motion.a>

          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>

          <motion.a
            href="mailto:hello@example.com"
            className="w-10 h-10 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5" />
          </motion.a>

          <div className="w-px h-6 bg-border mx-1" />

          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
