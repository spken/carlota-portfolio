import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { BookDetail } from "./types";
import { fonts } from "./utils";

const BookSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const totalPages = 22;
  const autoPlayInterval = 10000;
  const getPageImage = (pageIndex: number) => `fable_page-${String(pageIndex + 1).padStart(4, '0')}.jpg`;

  const bookDetails: BookDetail[] = [
    { label: "Target Age", value: "4-12 years" },
    { label: "Theme", value: "Kindness & Karma" },
    { label: "Style", value: "Illustrated Fable" },
  ];

  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView, totalPages, autoPlayInterval]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section
      ref={ref}
      className="flex items-center justify-center px-6 py-8 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <ScrollReveal direction="up" delay={0.2}>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-thin tracking-[0.15em] text-stone-800 mb-4 text-center"
              style={{ fontFamily: fonts.heading }}
            >
              Featured Work
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="text-center mb-6">
              <h3
                className="text-xl md:text-2xl lg:text-3xl text-stone-600 font-light mb-3"
                style={{ fontFamily: fonts.heading, fontStyle: "italic" }}
              >
                &ldquo;What Goes Around Comes Around&rdquo;
              </h3>
              <p
                className="text-base md:text-lg text-stone-500 font-light"
                style={{ fontFamily: fonts.body, letterSpacing: "0.05em" }}
              >
                A Children&apos;s Book
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal direction="left" delay={0.6}>
              <div className="relative group max-w-lg mx-auto">
                {/* Main Book Display */}
                <motion.div
                  className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ aspectRatio: '1/1' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img
                        src={getPageImage(currentPage)}
                        alt={`Fable Page ${currentPage + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      
                      {/* Fallback content */}
                      <div className="hidden w-full h-full flex flex-col items-center justify-center bg-stone-50 text-center p-8">
                        <motion.div
                          className="text-6xl mb-4 text-stone-400"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          📖
                        </motion.div>
                        <h4 className="text-xl text-stone-600 font-light mb-2" style={{ fontFamily: fonts.heading }}>
                          Page {currentPage + 1}
                        </h4>
                        <p className="text-stone-400 text-sm" style={{ fontFamily: fonts.body }}>
                          Image not available
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Elegant Navigation */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                      <motion.button
                        className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200"
                        onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>

                      <div className="flex-1 mx-6">
                        <div className="text-center mb-3">
                          <span className="text-white/90 text-sm font-light" style={{ fontFamily: fonts.body }}>
                            {currentPage + 1} of {totalPages}
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1">
                          <motion.div 
                            className="h-full bg-white rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <motion.button
                        className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200"
                        onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  {/* Auto-play Toggle */}
                  <motion.button
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isAutoPlaying ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </motion.button>
                </motion.div>

                {/* Thumbnail Strip */}
                <div className="mt-6 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                  {Array.from({ length: Math.min(totalPages, 8) }).map((_, index) => {
                    const startIndex = Math.max(0, Math.min(currentPage - 4, totalPages - 8));
                    const pageIndex = startIndex + index;
                    if (pageIndex >= totalPages) return null;
                    
                    return (
                      <motion.button
                        key={pageIndex}
                        className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          pageIndex === currentPage 
                            ? 'border-stone-800 shadow-md' 
                            : 'border-stone-300 hover:border-stone-500'
                        }`}
                        onClick={() => setCurrentPage(pageIndex)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={getPageImage(pageIndex)}
                          alt={`Page ${pageIndex + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal direction="right" delay={0.8}>
                <h4
                  className="text-xl lg:text-2xl text-stone-800 font-light mb-4 lg:mb-6"
                  style={{ fontFamily: fonts.heading }}
                >
                  About the Book
                </h4>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={1.0}>
                <p
                  className="text-base lg:text-lg text-stone-700 leading-relaxed font-light mb-3 lg:mb-4"
                  style={{ fontFamily: fonts.body }}
                >
                  This children&apos;s book explores the beautiful concept of karma
                  through engaging storytelling and vibrant illustrations. It
                  teaches young readers about kindness, empathy, and how our
                  actions create ripples that come back to us.
                </p>
              </ScrollReveal>

              <div className="space-y-3">
                {bookDetails.map((item, index) => (
                  <ScrollReveal key={item.label} direction="right" delay={1.4 + index * 0.1}>
                    <div className="flex justify-between items-center py-2 border-b border-stone-200">
                      <span className="text-stone-600 font-light text-sm lg:text-base">
                        {item.label}
                      </span>
                      <span className="text-stone-800 text-sm lg:text-base">{item.value}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookSection;
