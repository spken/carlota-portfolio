import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface FloatingElementsProps {
  scrollYProgress: MotionValue<number>;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ scrollYProgress }) => {
  // Create different parallax speeds for various elements
  const circle1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const circle2Y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const shape1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating circle 1 */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        style={{ y: circle1Y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <motion.svg 
          width="180" 
          height="180" 
          viewBox="0 0 180 180"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-400"
            strokeDasharray="10,5"
          />
          <circle
            cx="90"
            cy="90"
            r="50"
            fill="currentColor"
            className="text-stone-300"
            opacity="0.1"
          />
        </motion.svg>
      </motion.div>

      {/* Floating circle 2 */}
      <motion.div
        className="absolute bottom-1/3 left-1/4"
        style={{ y: circle2Y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 2.5, delay: 1.5 }}
      >
        <motion.svg 
          width="140" 
          height="140" 
          viewBox="0 0 140 140"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="currentColor"
            className="text-stone-400"
            opacity="0.15"
          />
          <circle
            cx="70"
            cy="70"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-stone-600"
          />
        </motion.svg>
      </motion.div>

      {/* Organic shape 1 */}
      <motion.div
        className="absolute top-1/2 left-1/6"
        style={{ y: shape1Y }}
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
        transition={{ duration: 3, delay: 2 }}
      >
        <motion.svg 
          width="160" 
          height="160" 
          viewBox="0 0 160 160"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <path
            d="M30,80 Q80,30 130,80 Q80,130 30,80 Z"
            fill="currentColor"
            className="text-stone-500"
            opacity="0.4"
          />
          <path
            d="M40,80 Q80,40 120,80 Q80,120 40,80 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-600"
          />
        </motion.svg>
      </motion.div>

      {/* Organic shape 2 */}
      <motion.div
        className="absolute top-1/3 right-1/8"
        style={{ y: shape2Y }}
        initial={{ opacity: 0, scale: 0, rotate: 45 }}
        animate={{ opacity: 0.18, scale: 1, rotate: 0 }}
        transition={{ duration: 2.8, delay: 2.3 }}
      >
        <motion.svg 
          width="200" 
          height="100" 
          viewBox="0 0 200 100"
          animate={{ 
            x: [0, 20, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <path
            d="M20,50 Q60,20 100,50 Q140,80 180,50 Q140,20 100,50 Q60,80 20,50 Z"
            fill="currentColor"
            className="text-stone-400"
            opacity="0.3"
          />
          <path
            d="M20,50 Q60,20 100,50 Q140,80 180,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-500"
          />
        </motion.svg>
      </motion.div>

      {/* Floating dots pattern */}
      <motion.div
        className="absolute bottom-1/4 right-1/3"
        style={{ y: dotsY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2, delay: 1.8 }}
      >
        <motion.svg 
          width="120" 
          height="120" 
          viewBox="0 0 120 120"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(6)].map((_, row) =>
            [...Array(6)].map((_, col) => (
              <motion.circle
                key={`${row}-${col}`}
                cx={20 + col * 16}
                cy={20 + row * 16}
                r="3"
                fill="currentColor"
                className="text-stone-500"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  delay: (row + col) * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            ))
          )}
        </motion.svg>
      </motion.div>

      {/* Decorative lines */}
      <motion.div
        className="absolute top-2/3 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 0.2, scaleX: 1 }}
        transition={{ duration: 3, delay: 2.5 }}
      >
        <motion.svg 
          width="300" 
          height="60" 
          viewBox="0 0 300 60"
          animate={{ 
            scaleX: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <line
            x1="0"
            y1="30"
            x2="300"
            y2="30"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-500"
            strokeDasharray="20,10"
          />
          <line
            x1="0"
            y1="20"
            x2="200"
            y2="20"
            stroke="currentColor"
            strokeWidth="1"
            className="text-stone-400"
          />
          <line
            x1="100"
            y1="40"
            x2="300"
            y2="40"
            stroke="currentColor"
            strokeWidth="1"
            className="text-stone-400"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default FloatingElements;
