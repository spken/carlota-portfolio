import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AboutSection from "./AboutSection";
import BookSection from "./BookSection";
import ContactSection from "./ContactSection";
import { fonts } from "./utils";

const ReceiptScrollContent: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform for the receipt movement - starts off-screen and slides down
  const receiptY = useTransform(scrollYProgress, [0, 0.3, 1], ["100vh", "0vh", "0vh"]);

  return (
    <motion.div
      className="relative z-20 px-4 sm:px-6 lg:px-8"
      style={{ 
        y: receiptY
      }}
    >
      {/* Receipt Paper Container */}
      <div className="min-h-screen bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl mx-auto max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mt-16 mb-16 overflow-hidden">
        {/* Receipt Header - Perforated edge effect */}
        <div className="relative">
          {/* Perforated top edge */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-white">
            <svg
              width="100%"
              height="16"
              viewBox="0 0 800 16"
              className="absolute top-0"
              preserveAspectRatio="none"
            >
              {[...Array(40)].map((_, i) => (
                <circle
                  key={i}
                  cx={i * 20 + 10}
                  cy="8"
                  r="3"
                  fill="transparent"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
          
          {/* Receipt styling elements */}
          <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8 border-l-2 border-r-2 border-stone-200 border-dashed">
            {/* Receipt header lines */}
            <div className="space-y-1 mb-6 sm:mb-8">
              <div className="h-px bg-stone-300 w-full"></div>
              <div className="h-px bg-stone-200 w-3/4"></div>
              <div className="h-px bg-stone-200 w-1/2"></div>
            </div>
            
            {/* Date stamp */}
            <motion.div 
              className="text-xs text-stone-500 font-mono text-right mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              2025 - PORTFOLIO.v1
            </motion.div>
          </div>
        </div>

        {/* Content Sections - Remove Hero, start with About */}
        <div className="border-l-2 border-r-2 border-stone-200 border-dashed">
          {/* About Section */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-stone-300"></div>
              <div className="text-xs text-stone-500 font-mono px-2">SECTION 02</div>
              <div className="flex-1 h-px bg-stone-300"></div>
            </div>
          </div>

          <motion.div
            className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AboutSection />
          </motion.div>

          {/* Section divider */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-stone-300"></div>
              <div className="text-xs text-stone-500 font-mono px-2">SECTION 03</div>
              <div className="flex-1 h-px bg-stone-300"></div>
            </div>
          </div>

          {/* Book Section */}
          <motion.div
            className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BookSection />
          </motion.div>

          {/* Section divider */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-stone-300"></div>
              <div className="text-xs text-stone-500 font-mono px-2">SECTION 04</div>
              <div className="flex-1 h-px bg-stone-300"></div>
            </div>
          </div>

          {/* Contact Section */}
          <motion.div
            className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ContactSection />
          </motion.div>
        </div>

        {/* Receipt Footer */}
        <div className="border-l-2 border-r-2 border-b-2 border-stone-200 border-dashed px-4 sm:px-6 lg:px-8">          
          {/* Bottom perforated edge */}
          <div className="relative mt-4 -mb-2">
            <svg
              width="100%"
              height="16"
              viewBox="0 0 800 16"
              className="absolute bottom-0"
              preserveAspectRatio="none"
            >
              {[...Array(40)].map((_, i) => (
                <circle
                  key={i}
                  cx={i * 20 + 10}
                  cy="8"
                  r="3"
                  fill="transparent"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReceiptScrollContent;
