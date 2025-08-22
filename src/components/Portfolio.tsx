"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import CustomCursor from "./CustomCursor";
import FloatingElements from "./FloatingElements";
import InteractiveSVGDecoration from "./InteractiveSVGDecoration";
import DramaticSVGElements from "./DramaticSVGElements";
import ReceiptScrollContent from "./ReceiptScrollContent";
import { backgroundGradients } from "./utils";
import { useTextSelection } from "./hooks/useTextSelection";

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    backgroundGradients,
  );

  // Use dynamic text selection based on current section
  useTextSelection(currentSection);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Update current section based on scroll position for hero + receipt layout
      if (scrollPosition < windowHeight * 0.8) {
        setCurrentSection("hero");
      } else if (scrollPosition < windowHeight * 1.8) {
        setCurrentSection("about");
      } else if (scrollPosition < windowHeight * 2.8) {
        setCurrentSection("book");
      } else {
        setCurrentSection("contact");
      }

      // Show/hide scroll to top button
      setShowScrollTop(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const sectionOffsets = {
      hero: 0,
      about: window.innerHeight * 1.2,
      book: window.innerHeight * 2.2,
      contact: window.innerHeight * 3.2,
    };

    window.scrollTo({
      top: sectionOffsets[section as keyof typeof sectionOffsets],
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative cursor-none">
      <CustomCursor />
      <DramaticSVGElements />
      <FloatingElements scrollYProgress={scrollYProgress} />
      <InteractiveSVGDecoration />
      <motion.div
        className="fixed inset-0 -z-10"
        style={{ background: backgroundColor }}
      />

      <Navigation
        currentSection={currentSection}
        scrollToSection={scrollToSection}
      />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-white bg-opacity-40 backdrop-blur-md rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-white border-opacity-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5 text-stone-600" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section - Always visible */}
      <HeroSection scrollYProgress={scrollYProgress} />

      {/* Receipt Content that scrolls over the hero */}
      <ReceiptScrollContent />
    </div>
  );
};

export default Portfolio;
