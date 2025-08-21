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
import AboutSection from "./AboutSection";
import BookSection from "./BookSection";
import ContactSection from "./ContactSection";
import CustomCursor from "./CustomCursor";
import TextSelectionIndicator from "./TextSelectionIndicator";
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
    [0, 0.25, 0.5, 0.75, 1],
    backgroundGradients,
  );

  // Use dynamic text selection based on current section
  useTextSelection(currentSection);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Update current section based on scroll position
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
      about: window.innerHeight,
      book: window.innerHeight * 2,
      contact: window.innerHeight * 3,
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
      <TextSelectionIndicator />
      <motion.div
        className="fixed inset-0 -z-10"
        style={{ background: backgroundColor }}
      />

      <Navigation
        currentSection={currentSection}
        scrollToSection={scrollToSection}
      />
      
      {/* Content fade mask - fades content as it reaches navigation area */}
      <div className="fixed top-0 left-0 right-0 h-36 bg-gradient-to-b from-white via-white/80 to-transparent z-40 pointer-events-none"></div>

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

      <HeroSection scrollYProgress={scrollYProgress} />
      <AboutSection />
      <BookSection />
      <ContactSection />
    </div>
  );
};

export default Portfolio;
