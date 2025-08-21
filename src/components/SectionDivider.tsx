import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionDividerProps {
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ className = "" }) => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <div className={`flex justify-center items-center py-20 ${className}`}>
      <motion.div
        className="relative"
        style={{ rotate, scale }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-40">
          <defs>
            <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" className="text-stone-400" />
              <stop offset="100%" stopColor="currentColor" className="text-stone-600" />
            </linearGradient>
          </defs>
          
          {/* Central circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="5"
            fill="url(#dividerGradient)"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Radiating lines */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <line x1="60" y1="15" x2="60" y2="35" stroke="url(#dividerGradient)" strokeWidth="2" />
            <line x1="60" y1="85" x2="60" y2="105" stroke="url(#dividerGradient)" strokeWidth="2" />
            <line x1="15" y1="60" x2="35" y2="60" stroke="url(#dividerGradient)" strokeWidth="2" />
            <line x1="85" y1="60" x2="105" y2="60" stroke="url(#dividerGradient)" strokeWidth="2" />
            
            <line x1="32" y1="32" x2="45" y2="45" stroke="url(#dividerGradient)" strokeWidth="2" />
            <line x1="75" y1="75" x2="88" y2="88" stroke="url(#dividerGradient)" strokeWidth="2" />
            <line x1="88" y1="32" x2="75" y2="45" stroke="url(#dividerGradient)" strokeWidth="2" />
            <line x1="45" y1="75" x2="32" y2="88" stroke="url(#dividerGradient)" strokeWidth="2" />
          </motion.g>
          
          {/* Outer ring */}
          <motion.circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="url(#dividerGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1 }}
          />
          
          {/* Inner ring */}
          <motion.circle
            cx="60"
            cy="60"
            r="25"
            fill="none"
            stroke="url(#dividerGradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default SectionDivider;
