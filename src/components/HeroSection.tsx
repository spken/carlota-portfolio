import React from "react";
import { motion, useTransform } from "framer-motion";
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

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="text-center z-10 px-4">
        <motion.h1
          className="text-7xl md:text-9xl lg:text-[10rem] font-light tracking-[0.1em] text-stone-800 mb-4"
          style={{
            y: titleY,
            scale,
            fontFamily: fonts.heading,
            fontStyle: "italic",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Carlota
        </motion.h1>
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] text-stone-700 mb-8"
          style={{
            y: subtitleY,
            fontFamily: fonts.heading,
            fontStyle: "italic",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          Vaquer Rodemann
        </motion.h2>
        <motion.div
          className="w-32 h-0.5 bg-stone-400 mx-auto mb-12"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.p
          className="text-xl md:text-2xl text-stone-600 font-light tracking-[0.15em] uppercase"
          style={{
            y: descriptionY,
            fontFamily: fonts.body,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Design Student & Creative Artist
        </motion.p>
        <motion.p
          className="text-lg md:text-xl text-stone-500 font-light tracking-[0.1em] mt-4"
          style={{
            y: descriptionY,
            fontFamily: fonts.body,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Portfolio 2025
        </motion.p>
      </div>
    </motion.section>
  );
};

export default HeroSection;
