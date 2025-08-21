import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const InteractiveSVGDecoration: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      
      // Create parallax effect based on mouse position
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const offsetX = (clientX - centerX) * 0.02;
      const offsetY = (clientY - centerY) * 0.02;
      
      x.set(offsetX);
      y.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Main decorative element that follows mouse subtly */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ x: springX, y: springY }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400" className="opacity-15">
          <defs>
            <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-stone-600" />
            </pattern>
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" className="text-stone-400" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" className="text-stone-600" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <rect width="400" height="400" fill="url(#dots)" />
          <circle cx="200" cy="200" r="150" fill="url(#centerGradient)" />
        </svg>
      </motion.div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/3"
        style={{ 
          x: useSpring(x, { ...springConfig, damping: 20 }),
          y: useSpring(y, { ...springConfig, damping: 20 })
        }}
      >
        <motion.svg 
          width="100" 
          height="100" 
          viewBox="0 0 100 100" 
          className="opacity-25"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <polygon
            points="50,10 85,75 15,75"
            fill="currentColor"
            className="text-stone-400"
            opacity="0.3"
          />
          <polygon
            points="50,10 85,75 15,75"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-600"
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4"
        style={{ 
          x: useSpring(x, { ...springConfig, damping: 30 }),
          y: useSpring(y, { ...springConfig, damping: 30 })
        }}
      >
        <motion.svg 
          width="80" 
          height="80" 
          viewBox="0 0 80 80" 
          className="opacity-30"
          animate={{ 
            rotate: [0, 45, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <rect
            x="10"
            y="10"
            width="60"
            height="60"
            fill="currentColor"
            className="text-stone-500"
            opacity="0.2"
            transform="rotate(45 40 40)"
          />
          <rect
            x="10"
            y="10"
            width="60"
            height="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-600"
            transform="rotate(45 40 40)"
          />
        </motion.svg>
      </motion.div>

      {/* Curved lines that respond to mouse */}
      <motion.div
        className="absolute top-2/3 left-1/5"
        style={{ 
          x: useSpring(x, { ...springConfig, damping: 35 }),
          y: useSpring(y, { ...springConfig, damping: 35 })
        }}
      >
        <motion.svg 
          width="160" 
          height="80" 
          viewBox="0 0 160 80" 
          className="opacity-20"
          animate={{ 
            scaleY: [1, 1.3, 1],
            scaleX: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <path
            d="M20,40 Q80,10 140,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-stone-500"
          />
          <path
            d="M20,50 Q80,70 140,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-400"
          />
          <circle cx="20" cy="40" r="4" fill="currentColor" className="text-stone-600" />
          <circle cx="140" cy="40" r="4" fill="currentColor" className="text-stone-600" />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default InteractiveSVGDecoration;
