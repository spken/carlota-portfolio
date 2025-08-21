"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    // Don't render custom cursor on touch devices
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

    // Add event listeners for interactive elements
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

  // Don't render on touch devices
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
