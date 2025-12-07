"use client";

import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  as: Component = "span"
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = children.split(" ");

  return (
    <Component
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`text-reveal-container ${className}`}
      aria-label={children}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className="inline-block"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(110%)",
              opacity: isVisible ? 1 : 0,
              transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease`,
              transitionDelay: `${delay + wordIndex * staggerDelay}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}

interface CharRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function CharReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.02
}: CharRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const chars = children.split("");

  return (
    <span ref={ref} className={`char-reveal-container ${className}`} aria-label={children}>
      {chars.map((char, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            transform: isVisible ? "translateY(0) rotateX(0)" : "translateY(40px) rotateX(-90deg)",
            opacity: isVisible ? 1 : 0,
            transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease`,
            transitionDelay: `${delay + index * staggerDelay}s`,
            transformOrigin: "center bottom",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
