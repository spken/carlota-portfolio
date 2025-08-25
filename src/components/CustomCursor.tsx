"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      // Check if device is primarily touch-only (mobile/tablet)
      // rather than a device that supports both mouse and touch (laptop with touchscreen)
      const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const hasNoHover = window.matchMedia('(hover: none)').matches;
      const isMobileViewport = window.innerWidth <= 768; // Typical mobile breakpoint
      
      // Device is considered touch-only if:
      // 1. It has touch support AND
      // 2. It has a coarse pointer (finger) as the primary input AND
      // 3. It doesn't support hover (typical of mobile devices) OR has a mobile viewport
      const isTouchOnlyDevice = hasTouchSupport && hasCoarsePointer && (hasNoHover || isMobileViewport);
      
      setIsTouchDevice(isTouchOnlyDevice);
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    if (isTouchDevice) {
      return () => {
        window.removeEventListener('resize', checkTouchDevice);
      };
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"], .interactive, input, textarea, select'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener('resize', checkTouchDevice);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isTouchDevice]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-colors duration-200 ${
          isHovering ? 'bg-stone-700' : 'bg-stone-900'
        }`}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
        }}
      />
      
      {/* Cursor ring/trail */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9998] transition-colors duration-200 ${
          isHovering ? 'border-stone-700/80' : 'border-stone-500/60'
        }`}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.4 : 0.7,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      />
      
      {/* Outer glow effect on hover */}
      <motion.div
        className={`fixed top-0 left-0 w-12 h-12 border rounded-full pointer-events-none z-[9997] transition-colors duration-200 ${
          isHovering ? 'border-stone-600/30' : 'border-stone-400/20'
        }`}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 2.2 : 0.8,
          opacity: isHovering ? 0.2 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 25,
        }}
      />
    </>
  );
};

export default CustomCursor;
