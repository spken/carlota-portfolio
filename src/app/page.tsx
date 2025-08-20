'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, MotionValue, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, GraduationCap, ArrowUp } from 'lucide-react';

// Import Google Fonts
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
}

interface ContactItem {
  icon: React.ComponentType<any>;
  title: string;
  info: string;
}

interface SkillItem {
  label: string;
  value: string;
}

interface NavigationProps {
  currentSection: string;
  scrollToSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, scrollToSection }) => {
  const sections = [
    { id: 'hero', label: 'Home'},
    { id: 'about', label: 'About'},
    { id: 'book', label: 'Work'},
    { id: 'contact', label: 'Contact'}
  ];

  return (
    <motion.nav 
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <div className="flex space-x-1 bg-white bg-opacity-40 backdrop-blur-md rounded-full px-4 py-2 shadow-sm border border-white border-opacity-50">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
              currentSection === section.id
                ? 'bg-stone-600 text-white shadow-sm backdrop-blur-sm'
                : 'text-stone-600 hover:bg-white hover:bg-opacity-50 hover:text-stone-700'
            }`}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xs font-light hidden md:block">{section.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [currentSection, setCurrentSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

    // Softened background color transitions with gentle tones
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "linear-gradient(135deg, #fefbf7 0%, #fef1e7 25%, #f7f3ef 100%)", // Gentle cream with soft orange hints
      "linear-gradient(135deg, #f8fcff 0%, #f0f7fd 25%, #eef2f6 100%)", // Soft blue-gray
      "linear-gradient(135deg, #f8fefb 0%, #f2f9f4 25%, #edf1ef 100%)", // Subtle green-gray
      "linear-gradient(135deg, #fcfaff 0%, #f6f3fc 25%, #f2f5f8 100%)", // Gentle purple-gray
      "linear-gradient(135deg, #fffbf7 0%, #fef1e7 25%, #f5f1eb 100%)"  // Warm beige
    ]
  );

  // Parallax elements
  const floatingElement1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const floatingElement2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const floatingElement3Y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Update current section based on scroll position
      if (scrollPosition < windowHeight * 0.8) {
        setCurrentSection('hero');
      } else if (scrollPosition < windowHeight * 1.8) {
        setCurrentSection('about');
      } else if (scrollPosition < windowHeight * 2.8) {
        setCurrentSection('book');
      } else {
        setCurrentSection('contact');
      }

      // Show/hide scroll to top button
      setShowScrollTop(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const sectionOffsets = {
      hero: 0,
      about: window.innerHeight,
      book: window.innerHeight * 2,
      contact: window.innerHeight * 3
    };

    window.scrollTo({
      top: sectionOffsets[section as keyof typeof sectionOffsets],
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Enhanced fixed background with parallax elements */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ background: backgroundColor }}
      >
        {/* Subtle floating parallax elements */}
                {/* Subtle floating parallax elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-white bg-opacity-8 rounded-full blur-xl"
          style={{ y: floatingElement1Y }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-white bg-opacity-6 rounded-full blur-lg"
          style={{ y: floatingElement2Y }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-white bg-opacity-7 rounded-full blur-2xl"
          style={{ y: floatingElement3Y }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-14 h-14 bg-white bg-opacity-5 rounded-full blur-xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-white bg-opacity-6 rounded-full blur-lg"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -250]) }}
        />
      </motion.div>

      {/* Navigation */}
      <Navigation currentSection={currentSection} scrollToSection={scrollToSection} />

      {/* Scroll to top button */}
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

      {/* Hero Section */}
      <HeroSection scrollYProgress={scrollYProgress} />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Book Showcase Section */}
      <BookSection />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

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
      <div className="text-center z-10">
        <motion.h1 
          className="text-6xl md:text-8xl font-thin tracking-[0.2em] text-stone-800 mb-6"
          style={{ 
            y: titleY, 
            scale,
            fontFamily: "'Playfair Display', serif"
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Carlota
        </motion.h1>
        <motion.h2 
          className="text-3xl md:text-4xl font-extralight tracking-[0.15em] text-stone-600 mb-8"
          style={{ 
            y: subtitleY,
            fontFamily: "'Playfair Display', serif"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          Vaquer Rodemann
        </motion.h2>
        <motion.div 
          className="w-24 h-0.5 bg-stone-400 mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.p 
          className="text-lg text-stone-600 font-light tracking-[0.1em]"
          style={{ 
            y: descriptionY,
            fontFamily: "'Inter', sans-serif"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Design Student & Creative Artist
        </motion.p>
      </div>
      
      {/* Elegant floating elements - only subtle circles */}
      <motion.div 
        className="absolute top-20 left-20 w-3 h-3 bg-stone-300 bg-opacity-40 rounded-full shadow-sm"
        animate={{ 
          y: [-10, 10, -10],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
      />
      <motion.div 
        className="absolute bottom-32 right-32 w-2 h-2 bg-stone-400 bg-opacity-30 rounded-full shadow-sm"
        animate={{ 
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
      />
      <motion.div 
        className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-stone-300 bg-opacity-50 rounded-full shadow-sm"
        animate={{ 
          y: [-8, 8, -8],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
      />
      
      {/* Additional elegant decorative elements */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-2.5 h-2.5 bg-stone-400 bg-opacity-40 rounded-full shadow-sm"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-stone-300 bg-opacity-35 rounded-full shadow-sm"
        animate={{ 
          scale: [1, 1.3, 0.8, 1],
          y: [-5, 5, -5]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -120]) }}
      />
    </motion.section>
  );
};

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-8 py-20 relative overflow-hidden">
      {/* Subtle section-specific floating elements */}
      <motion.div 
        className="absolute top-20 right-20 w-14 h-14 bg-blue-100 bg-opacity-15 rounded-full blur-xl"
        animate={{ 
          y: [-20, 20, -20],
          x: [-8, 8, -8],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-18 h-18 bg-cyan-100 bg-opacity-12 rounded-full blur-2xl"
        animate={{ 
          y: [15, -15, 15],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-thin tracking-[0.15em] text-stone-800 mb-16 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <p className="text-xl text-stone-700 leading-relaxed font-light mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                I'm a design student at Universidad Europea, driven by an endless passion for creativity in all its forms.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed font-light mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Whether it's the delicate strokes of painting, the precision of drawing, the tactile joy of woodworking, the emotional depth of acting, or the rhythm of music; I find inspiration everywhere.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <div className="aspect-square bg-white bg-opacity-30 backdrop-blur-md rounded-3xl flex items-center justify-center relative overflow-hidden shadow-lg border border-white border-opacity-50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-15" />
                <div className="relative z-10 text-center p-8">
                  <motion.div 
                    className="text-4xl mb-4 text-stone-500"
                    animate={{ rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ◊
                  </motion.div>
                  <p className="text-stone-600 font-light text-sm" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                    "Art is not what you see,<br />but what you make others see."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BookSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const bookDetails: SkillItem[] = [
    { label: "Target Age", value: "4-8 years" },
    { label: "Theme", value: "Kindness & Karma" },
    { label: "Style", value: "Illustrated Fiction" }
  ];
  
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-8 py-20 relative overflow-hidden">
      {/* Subtle section-specific floating elements */}
      <motion.div 
        className="absolute top-32 left-32 w-16 h-16 bg-green-100 bg-opacity-12 rounded-full blur-xl"
        animate={{ 
          y: [-18, 18, -18],
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-40 w-14 h-14 bg-emerald-100 bg-opacity-15 rounded-full blur-lg"
        animate={{ 
          x: [-15, 15, -15],
          y: [8, -8, 8],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-thin tracking-[0.15em] text-stone-800 mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Featured Work
          </h2>
          
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl text-stone-600 font-light mb-4" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              "What Goes Around Comes Around"
            </h3>
            <p className="text-lg text-stone-500 font-light" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}>
              A Children's Book
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative group"
            >
              <motion.div 
                className="aspect-[4/5] bg-white bg-opacity-30 backdrop-blur-md rounded-3xl relative overflow-hidden shadow-lg border border-white border-opacity-50"
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-20" />
                <div className="relative z-10 p-12 h-full flex flex-col justify-center items-center text-center">
                  <motion.div 
                    className="text-5xl mb-8 text-stone-500"
                    animate={{ 
                      rotate: [0, 2, -2, 0],
                      scale: [1, 1.01, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  >
                    ◈
                  </motion.div>
                  <h4 className="text-xl text-stone-700 font-light mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Book Cover
                  </h4>
                  <p className="text-stone-500 font-light text-sm" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}>
                    Coming Soon
                  </p>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <h4 className="text-2xl text-stone-800 font-light mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                About the Book
              </h4>
              <p className="text-lg text-stone-700 leading-relaxed font-light mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                This children's book explores the beautiful concept of karma through engaging storytelling and vibrant illustrations. It teaches young readers about kindness, empathy, and how our actions create ripples that come back to us.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed font-light mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Created as part of my journey to blend storytelling with visual art, this book represents my passion for meaningful design that can inspire and educate.
              </p>
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1 }}
              >
                {bookDetails.map((item, index) => (
                  <motion.div 
                    key={item.label} 
                    className="flex justify-between items-center py-3 border-b border-stone-200"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  >
                    <span className="text-stone-600 font-light">{item.label}</span>
                    <span className="text-stone-800">{item.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const contactItems: ContactItem[] = [
    { icon: Mail, title: "Email", info: "carlotastar@icloud.com" },
    { icon: Instagram, title: "Instagram", info: "@carlota.vaquer" },
    { icon: GraduationCap, title: "University", info: "Universidad Europea" }
  ];
  
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-8 py-20 relative overflow-hidden">
      {/* Subtle section-specific floating elements */}
      <motion.div 
        className="absolute top-20 left-1/4 w-20 h-20 bg-purple-100 bg-opacity-15 rounded-full blur-2xl"
        animate={{ 
          y: [-25, 25, -25],
          x: [-10, 10, -10],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-32 right-1/3 w-18 h-18 bg-pink-100 bg-opacity-17 rounded-full blur-xl"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-thin tracking-[0.15em] text-stone-800 mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
            Let's Connect
          </h2>
          
          <motion.p 
            className="text-xl text-stone-700 leading-relaxed font-light mb-16 max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            I'm always excited to collaborate on creative projects, discuss art, or share stories about design and creativity.
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {contactItems.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <motion.div 
                  key={contact.title}
                  className="p-6 bg-white bg-opacity-30 backdrop-blur-md rounded-2xl border border-white border-opacity-60 hover:shadow-lg transition-all duration-300 shadow-sm"
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    transition: { duration: 0.3 }
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-15 rounded-2xl" />
                  <div className="relative z-10">
                    <motion.div 
                      className="flex justify-center mb-3 text-stone-500"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent size={20} />
                    </motion.div>
                    <h3 className="text-base text-stone-700 font-light mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{contact.title}</h3>
                    <p className="text-stone-500 font-light text-sm" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.02em" }}>{contact.info}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
          <motion.div 
            className="pt-8 border-t border-stone-200 border-opacity-50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <p className="text-stone-500 font-light" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.02em" }}>
              © 2025 Carlota Vaquer Rodemann. Crafted with passion and creativity.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;