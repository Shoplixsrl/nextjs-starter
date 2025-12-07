"use client";

import { useEffect, useRef } from "react";

interface MorphingGradientProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export function MorphingGradient({
  className = "",
  colors = ["#f5949b", "#f28ea6", "#bc7cb7", "#439fb8", "#44abb4"],
  speed = 15
}: MorphingGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : { r: 0, g: 0, b: 0 };
    };

    const rgbColors = colors.map(hexToRgb);

    const animate = () => {
      time += 0.002;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create animated gradient
      const gradient = ctx.createLinearGradient(
        width * (0.5 + 0.5 * Math.sin(time)),
        0,
        width * (0.5 + 0.5 * Math.cos(time)),
        height
      );

      // Animate colors through the gradient
      rgbColors.forEach((color, index) => {
        const offset = (index / (rgbColors.length - 1) + time * 0.1) % 1;
        const alpha = 0.7 + 0.3 * Math.sin(time + index);
        gradient.addColorStop(
          Math.abs(offset),
          `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
        );
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add noise texture for premium feel
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ mixBlendMode: "overlay", opacity: 0.5 }}
    />
  );
}

export function FloatingOrbs({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Orb 1 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-30"
        style={{
          background: "radial-gradient(circle, #ff6d99 0%, transparent 70%)",
          animation: "float1 20s ease-in-out infinite",
          top: "-20%",
          left: "-10%"
        }}
      />
      {/* Orb 2 */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[80px] opacity-25"
        style={{
          background: "radial-gradient(circle, #44abb4 0%, transparent 70%)",
          animation: "float2 25s ease-in-out infinite",
          bottom: "-10%",
          right: "-5%"
        }}
      />
      {/* Orb 3 */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[60px] opacity-20"
        style={{
          background: "radial-gradient(circle, #bc7cb7 0%, transparent 70%)",
          animation: "float3 18s ease-in-out infinite",
          top: "40%",
          left: "50%"
        }}
      />
    </div>
  );
}
