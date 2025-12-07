"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function Parallax({
  children,
  className = "",
  speed = 0.5,
  direction = "up"
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when element enters viewport, 1 when it leaves
      const progress = 1 - (rect.bottom / (windowHeight + rect.height));
      const clampedProgress = Math.max(0, Math.min(1, progress));

      const movement = (clampedProgress - 0.5) * 200 * speed;
      setOffset(direction === "up" ? -movement : movement);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return (
    <div ref={ref} className={`parallax-wrapper ${className}`}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: "transform 0.1s linear",
          willChange: "transform"
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // 0 = foreground, 1 = background
}

export function ParallaxContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`parallax-container relative ${className}`}>
      {children}
    </div>
  );
}

export function ParallaxLayer({
  children,
  className = "",
  depth = 0.5
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * depth * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * depth * 50;
      setTransform({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [depth]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: "transform 0.3s ease-out",
        willChange: "transform"
      }}
    >
      {children}
    </div>
  );
}
