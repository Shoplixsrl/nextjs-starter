"use client";

import { useEffect, useState } from "react";

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  hoverScale: number;
  mixBlendMode: "difference" | "normal";
}

export function CustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: -100,
    y: -100,
    isHovering: false,
    isClicking: false,
    hoverScale: 1,
    mixBlendMode: "difference"
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursor(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY
      }));
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setCursor(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursor(prev => ({ ...prev, isClicking: false }));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add hover effects for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-hover'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setCursor(prev => ({ ...prev, isHovering: true, hoverScale: 2.5 }));
        });
        el.addEventListener("mouseleave", () => {
          setCursor(prev => ({ ...prev, isHovering: false, hoverScale: 1 }));
        });
      });

      // Special hover for images and cards
      const cards = document.querySelectorAll(".card-fitflow, .tilt-card-wrapper, img");
      cards.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setCursor(prev => ({ ...prev, isHovering: true, hoverScale: 3, mixBlendMode: "normal" }));
        });
        el.addEventListener("mouseleave", () => {
          setCursor(prev => ({ ...prev, isHovering: false, hoverScale: 1, mixBlendMode: "difference" }));
        });
      });
    };

    // Initial setup
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    // Delay adding hover listeners to ensure DOM is ready
    setTimeout(addHoverListeners, 100);

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: cursor.x,
          top: cursor.y,
          width: "8px",
          height: "8px",
          backgroundColor: "#ff6d99",
          transform: `translate(-50%, -50%) scale(${cursor.isClicking ? 0.5 : 1})`,
          transition: "transform 0.15s ease-out",
          mixBlendMode: "difference"
        }}
      />
      {/* Cursor ring */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full border-2 border-[#ff6d99]"
        style={{
          left: cursor.x,
          top: cursor.y,
          width: "40px",
          height: "40px",
          transform: `translate(-50%, -50%) scale(${cursor.isClicking ? 0.8 : cursor.hoverScale})`,
          transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease",
          opacity: cursor.isHovering ? 0.6 : 0.3,
          mixBlendMode: cursor.mixBlendMode
        }}
      />
    </>
  );
}
