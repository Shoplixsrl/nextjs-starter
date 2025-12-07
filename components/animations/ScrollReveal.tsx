"use client";

import { useEffect, useRef, useState } from "react";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "rotate"
  | "blur"
  | "slide-up"
  | "clip-up"
  | "flip";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const animations: Record<AnimationType, { initial: React.CSSProperties; animate: React.CSSProperties }> = {
  "fade-up": {
    initial: { opacity: 0, transform: "translateY(60px)" },
    animate: { opacity: 1, transform: "translateY(0)" }
  },
  "fade-down": {
    initial: { opacity: 0, transform: "translateY(-60px)" },
    animate: { opacity: 1, transform: "translateY(0)" }
  },
  "fade-left": {
    initial: { opacity: 0, transform: "translateX(60px)" },
    animate: { opacity: 1, transform: "translateX(0)" }
  },
  "fade-right": {
    initial: { opacity: 0, transform: "translateX(-60px)" },
    animate: { opacity: 1, transform: "translateX(0)" }
  },
  scale: {
    initial: { opacity: 0, transform: "scale(0.8)" },
    animate: { opacity: 1, transform: "scale(1)" }
  },
  rotate: {
    initial: { opacity: 0, transform: "rotate(-10deg) scale(0.9)" },
    animate: { opacity: 1, transform: "rotate(0) scale(1)" }
  },
  blur: {
    initial: { opacity: 0, filter: "blur(20px)", transform: "scale(1.1)" },
    animate: { opacity: 1, filter: "blur(0px)", transform: "scale(1)" }
  },
  "slide-up": {
    initial: { transform: "translateY(100%)" },
    animate: { transform: "translateY(0)" }
  },
  "clip-up": {
    initial: { clipPath: "inset(100% 0 0 0)" },
    animate: { clipPath: "inset(0 0 0 0)" }
  },
  flip: {
    initial: { opacity: 0, transform: "perspective(1000px) rotateX(-80deg)", transformOrigin: "top" },
    animate: { opacity: 1, transform: "perspective(1000px) rotateX(0deg)" }
  }
};

export function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  once = true
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, once]);

  const { initial, animate } = animations[animation];
  const currentStyles = isVisible ? animate : initial;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...currentStyles,
        transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}s`,
        willChange: "transform, opacity, filter, clip-path"
      }}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: AnimationType;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  animation = "fade-up"
}: StaggerContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const { initial, animate } = animations[animation];

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              style={{
                ...(isVisible ? animate : initial),
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${index * staggerDelay}s`,
                willChange: "transform, opacity"
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
