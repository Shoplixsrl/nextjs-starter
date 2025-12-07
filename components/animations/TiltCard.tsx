"use client";

import { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  glare?: boolean;
  glareMaxOpacity?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 15,
  scale = 1.02,
  perspective = 1000,
  glare = true,
  glareMaxOpacity = 0.2
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1
  });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
    const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;

    // Glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;

    setTransform({ rotateX, rotateY, scale });
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card-wrapper relative overflow-hidden ${className}`}
      style={{
        transform: `perspective(${perspective}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
        transition: transform.scale === 1
          ? "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)"
          : "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${transform.scale > 1 ? glareMaxOpacity : 0}) 0%, transparent 60%)`,
            transition: transform.scale === 1 ? "opacity 0.6s ease" : "none",
            borderRadius: "inherit"
          }}
        />
      )}
    </div>
  );
}
