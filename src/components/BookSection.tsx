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

  const totalPages = 20;
  const autoPlayInterval = 6000;
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
      className="flex items-center justify-center px-3 sm:px-6 py-6 sm:py-8 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <ScrollReveal direction="up" delay={0.2}>
            <h2
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-thin tracking-[0.15em] text-stone-800 mb-3 sm:mb-4 text-center"
              style={{ fontFamily: fonts.heading }}
            >
              Featured Work
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="text-center mb-4 sm:mb-6">
              <h3
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-stone-600 font-light mb-2 sm:mb-3"
                style={{ fontFamily: fonts.heading, fontStyle: "italic" }}
              >
                &ldquo;What Goes Around Comes Around&rdquo;
              </h3>
              <p
                className="text-sm sm:text-base md:text-lg text-stone-500 font-light"
                style={{ fontFamily: fonts.body, letterSpacing: "0.05em" }}
              >
                A Children&apos;s Book
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <ScrollReveal direction="left" delay={0.6}>
              <div className="relative group w-full max-w-sm sm:max-w-md mx-auto">
                {/* Main Book Display */}
                <motion.div
                  className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden w-full"
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
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          currentPage > 3 ? 'blur-md' : ''
                        }`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      
                      {/* Buy to Unlock Overlay */}
                      {currentPage > 3 && (
                        <motion.div
                          className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center text-center p-4 sm:p-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl max-w-xs sm:max-w-sm mx-auto border border-white/10 w-full">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto mb-3 sm:mb-4 bg-stone-900 rounded-xl flex items-center justify-center">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                            </div>
                            <h3 
                              className="text-sm sm:text-base md:text-lg font-normal text-stone-900 mb-2 sm:mb-3 tracking-tight"
                              style={{ fontFamily: fonts.heading }}
                            >
                              Interested in this story?
                            </h3>
                            <p 
                              className="text-xs sm:text-sm text-stone-600 mb-3 sm:mb-4 leading-relaxed font-light"
                              style={{ fontFamily: fonts.body }}
                            >
                              Contact me on Instagram to purchase the complete story
                            </p>
                            <a
                              href="https://instagram.com/carlota.vaquer"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center bg-stone-900 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-normal text-xs sm:text-sm tracking-wide hover:bg-stone-800 transition-all duration-200 w-full interactive"
                              style={{ fontFamily: fonts.body }}
                            >
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                              </svg>
                              Contact on Instagram
                            </a>
                          </div>
                        </motion.div>
                      )}
                      
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
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                      <motion.button
                        className="p-2.5 sm:p-3 rounded-full bg-white/25 backdrop-blur-md text-white hover:bg-white/35 transition-all duration-200 touch-manipulation"
                        onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>

                      <div className="flex-1 mx-3 sm:mx-6">
                        <div className="text-center mb-2 sm:mb-3">
                          <span className="text-white/95 text-xs sm:text-sm font-medium" style={{ fontFamily: fonts.body }}>
                            {currentPage + 1} of {totalPages}
                          </span>
                        </div>
                        <div className="w-full bg-white/25 rounded-full h-1.5 sm:h-1">
                          <motion.div 
                            className="h-full bg-white rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <motion.button
                        className="p-2.5 sm:p-3 rounded-full bg-white/25 backdrop-blur-md text-white hover:bg-white/35 transition-all duration-200 touch-manipulation"
                        onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  {/* Auto-play Toggle */}
                  <motion.button
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/25 backdrop-blur-md text-white hover:bg-white/35 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 touch-manipulation"
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
                <div className="mt-3 sm:mt-6 w-full overflow-hidden">
                  <div className="flex justify-center">
                    <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-hide max-w-full">
                      {Array.from({ length: Math.min(totalPages, 6) }).map((_, index) => {
                        const startIndex = Math.max(0, Math.min(currentPage - 3, totalPages - 6));
                        const pageIndex = startIndex + index;
                        if (pageIndex >= totalPages) return null;
                        
                        return (
                          <motion.button
                            key={pageIndex}
                            className={`relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 touch-manipulation ${
                              pageIndex === currentPage 
                                ? 'border-stone-800 shadow-md' 
                                : pageIndex > 3 
                                  ? 'border-stone-400 opacity-75'
                                  : 'border-stone-300 hover:border-stone-500'
                            }`}
                            onClick={() => setCurrentPage(pageIndex)}
                            whileHover={{ scale: pageIndex === currentPage ? 1.1 : 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <img
                              src={getPageImage(pageIndex)}
                              alt={`Page ${pageIndex + 1}`}
                              className={`w-full h-full object-cover ${
                                pageIndex > 3 ? 'blur-sm' : ''
                              }`}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            {pageIndex > 3 && (
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M6 10v-4a6 6 0 1 1 12 0v4h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1zm6-6a2 2 0 0 0-2 2v4h4V6a2 2 0 0 0-2-2z"/>
                                </svg>
                              </div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
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
