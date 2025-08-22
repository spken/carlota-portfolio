import React, { useState, useEffect } from "react";
import { motion, useTransform, AnimatePresence } from "framer-motion";
import { HeroSectionProps } from "./types";
import { fonts } from "./utils";

const HeroSection: React.FC<HeroSectionProps> = ({ scrollYProgress }) => {
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Individual parallax effects for elements
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const descriptionY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  // Rotating text animation
  const rotatingTexts = [
    "Creative Artist",
    "Visual Storyteller & Innovator",
    "Creative Visionary & Designer",
    "Digital Creator & Artist"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        (prevIndex + 1) % rotatingTexts.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="text-center z-10 px-4 max-w-6xl mx-auto">
        <motion.h1
          className="text-[7rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[17rem] font-light tracking-[0.1em] text-stone-800 leading-none"
          style={{
            y: titleY,
            scale,
            fontFamily: fonts.name,
            //fontStyle: "italic",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Carlota
        </motion.h1>
        <motion.h2
          className="text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7rem] font-light tracking-[0.15em] text-stone-700 mb-8 -mt-4 sm:-mt-8 lg:-mt-12 leading-none"
          style={{
            y: subtitleY,
            fontFamily: fonts.name,
            //fontStyle: "italic",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          Vaquer Rodemann
        </motion.h2>
        <motion.div
          className="w-20 sm:w-24 md:w-32 h-0.5 bg-stone-400 mx-auto mb-8 sm:mb-10 md:mb-12"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <div className="relative h-12 sm:h-14 md:h-16 lg:h-20 mb-6 overflow-hidden px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              className="text-[1.125rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] xl:text-[2rem] text-stone-600 font-light tracking-[0.15em] uppercase absolute inset-0 flex items-center justify-center text-center leading-tight"
              style={{
                y: descriptionY,
                fontFamily: fonts.body,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {rotatingTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.p
          className="text-[1.125rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] xl:text-[2rem] text-stone-500 font-light tracking-[0.1em] mt-4"
          style={{
            fontFamily: fonts.body,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Portfolio 2025
        </motion.p>
        
        {/* Decorative SVG elements */}
        <motion.div
          className="absolute top-1/4 left-4 sm:left-8 lg:left-10 opacity-25 hidden sm:block"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 0.25, rotate: 0 }}
          transition={{ duration: 2, delay: 2 }}
          style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, -40]) }}
        >
          <motion.svg 
            width="40" 
            height="40" 
            viewBox="0 0 60 60"
            className="sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M30,8 L35,22 L50,22 L39,32 L42,47 L30,39 L18,47 L21,32 L10,22 L25,22 Z"
              fill="currentColor"
              className="text-stone-500"
              opacity="0.3"
            />
            <path
              d="M30,8 L35,22 L50,22 L39,32 L42,47 L30,39 L18,47 L21,32 L10,22 L25,22 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-stone-600"
            />
          </motion.svg>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-4 sm:right-8 lg:right-10 opacity-20 hidden sm:block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 2.5, delay: 2.5 }}
          style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, -20]) }}
        >
          <motion.svg 
            width="60" 
            height="60" 
            viewBox="0 0 90 90"
            className="sm:w-[70px] sm:h-[70px] lg:w-[90px] lg:h-[90px]"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="45"
              cy="45"
              r="35"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8,8"
              className="text-stone-400"
            />
            <circle
              cx="45"
              cy="45"
              r="20"
              fill="currentColor"
              className="text-stone-500"
              opacity="0.15"
            />
            <circle
              cx="45"
              cy="45"
              r="5"
              fill="currentColor"
              className="text-stone-600"
            />
          </motion.svg>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
