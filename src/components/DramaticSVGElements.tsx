import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const DramaticSVGElements: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Different parallax speeds for dramatic effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -270]);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Large animated circle - top left */}
      <motion.div
        className="absolute -top-20 -left-20"
        style={{ y: y1, rotate: rotate1 }}
      >
        <motion.svg 
          width="300" 
          height="300" 
          viewBox="0 0 300 300" 
          className="opacity-20"
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <circle
            cx="150"
            cy="150"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-stone-400"
            strokeDasharray="20,15"
          />
          <circle
            cx="150"
            cy="150"
            r="80"
            fill="currentColor"
            className="text-stone-300"
            opacity="0.1"
          />
        </motion.svg>
      </motion.div>

      {/* Flowing wave - right side */}
      <motion.div
        className="absolute top-1/3 -right-10"
        style={{ y: y2 }}
      >
        <motion.svg 
          width="200" 
          height="400" 
          viewBox="0 0 200 400" 
          className="opacity-25"
          animate={{ 
            scaleX: [0.8, 1.3, 0.8],
            x: [0, 30, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <path
            d="M50,0 Q150,100 50,200 Q150,300 50,400"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-stone-500"
            opacity="0.6"
          />
          <path
            d="M80,0 Q120,100 80,200 Q120,300 80,400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-400"
            opacity="0.4"
          />
        </motion.svg>
      </motion.div>

      {/* Geometric pattern - bottom */}
      <motion.div
        className="absolute -bottom-10 left-1/4"
        style={{ y: y3, rotate: rotate2 }}
      >
        <motion.svg 
          width="250" 
          height="150" 
          viewBox="0 0 250 150" 
          className="opacity-30"
          animate={{ 
            y: [0, -20, 0],
            scaleY: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Triangle pattern */}
          <polygon
            points="125,20 180,100 70,100"
            fill="currentColor"
            className="text-stone-400"
            opacity="0.2"
          />
          <polygon
            points="125,20 180,100 70,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-600"
          />
          
          {/* Side triangles */}
          <polygon
            points="70,100 20,130 125,130"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-stone-500"
          />
          <polygon
            points="180,100 230,130 125,130"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-stone-500"
          />
        </motion.svg>
      </motion.div>

      {/* Floating hexagon - top right */}
      <motion.div
        className="absolute top-20 right-1/4"
        style={{ y: y1, rotate: rotate1 }}
      >
        <motion.svg 
          width="120" 
          height="140" 
          viewBox="0 0 120 140" 
          className="opacity-25"
          animate={{ 
            rotate: [0, 360],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <polygon
            points="60,10 105,35 105,85 60,110 15,85 15,35"
            fill="currentColor"
            className="text-stone-500"
            opacity="0.15"
          />
          <polygon
            points="60,10 105,35 105,85 60,110 15,85 15,35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-600"
          />
          <circle
            cx="60"
            cy="60"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-stone-500"
            strokeDasharray="5,5"
          />
        </motion.svg>
      </motion.div>

      {/* Abstract curves - left side */}
      <motion.div
        className="absolute top-2/3 -left-5"
        style={{ y: y2 }}
      >
        <motion.svg 
          width="150" 
          height="200" 
          viewBox="0 0 150 200" 
          className="opacity-20"
          animate={{ 
            scaleX: [1, 1.4, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <path
            d="M10,50 Q80,20 100,80 Q120,140 80,180 Q40,160 10,120 Q20,80 10,50"
            fill="currentColor"
            className="text-stone-400"
            opacity="0.2"
          />
          <path
            d="M10,50 Q80,20 100,80 Q120,140 80,180"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-stone-500"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default DramaticSVGElements;
