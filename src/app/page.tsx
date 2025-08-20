'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, MotionValue } from 'framer-motion';

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
}

interface ContactItem {
  icon: string;
  title: string;
  info: string;
}

interface SkillItem {
  label: string;
  value: string;
}

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background color transitions
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "linear-gradient(135deg, #f5f1eb 0%, #e8ddd4 100%)", // Light beige
      "linear-gradient(135deg, #faf8f5 0%, #f0ebe3 100%)", // Warm white
      "linear-gradient(135deg, #f9f6f1 0%, #ede4d8 100%)", // Soft cream
      "linear-gradient(135deg, #f7f3ee 0%, #e9dfd6 100%)", // Gentle beige
      "linear-gradient(135deg, #f3ede6 0%, #e6d9cd 100%)"  // Warm sand
    ]
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed background */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ background: backgroundColor }}
      />

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
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="text-center z-10">
        <motion.h1 
          className="text-6xl md:text-8xl font-light tracking-wider text-stone-800 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Carlota
        </motion.h1>
        <motion.h2 
          className="text-3xl md:text-4xl font-light text-stone-600 mb-8"
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
          className="text-lg text-stone-600 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Design Student & Creative Artist
        </motion.p>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 left-20 w-2 h-2 bg-amber-300 rounded-full"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-32 right-32 w-3 h-3 bg-rose-300 rounded-full"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 right-20 w-1 h-1 bg-emerald-300 rounded-full"
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.section>
  );
};

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const skills: string[] = ['Painting', 'Drawing', 'Woodwork', 'Acting', 'Music', 'Design'];
  
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-stone-800 mb-16 text-center">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <p className="text-xl text-stone-700 leading-relaxed font-light mb-8">
                I'm a design student at Universidad Europea, driven by an endless passion for creativity in all its forms.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed font-light mb-8">
                Whether it's the delicate strokes of painting, the precision of drawing, the tactile joy of woodworking, the emotional depth of acting, or the rhythm of music—I find inspiration everywhere.
              </p>
              <motion.div 
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {skills.map((skill, index) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-white bg-opacity-60 backdrop-blur-sm rounded-full text-stone-700 text-sm font-light border border-stone-200"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-rose-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm" />
                <div className="relative z-10 text-center p-8">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-stone-700 font-light">
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
    <section ref={ref} className="min-h-screen flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-stone-800 mb-8 text-center">
            Featured Work
          </h2>
          
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl text-stone-600 font-light mb-4">
              "What Goes Around Comes Around"
            </h3>
            <p className="text-lg text-stone-500 font-light">
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
              <div className="aspect-[4/5] bg-gradient-to-br from-emerald-100 via-blue-50 to-purple-100 rounded-3xl relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm" />
                <div className="relative z-10 p-12 h-full flex flex-col justify-center items-center text-center">
                  <motion.div 
                    className="text-8xl mb-8"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    📚
                  </motion.div>
                  <h4 className="text-2xl text-stone-800 font-light mb-4">
                    Book Cover
                  </h4>
                  <p className="text-stone-600 font-light">
                    Coming Soon
                  </p>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <h4 className="text-2xl text-stone-800 font-light mb-8">
                About the Book
              </h4>
              <p className="text-lg text-stone-700 leading-relaxed font-light mb-8">
                This children's book explores the beautiful concept of karma through engaging storytelling and vibrant illustrations. It teaches young readers about kindness, empathy, and how our actions create ripples that come back to us.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed font-light mb-8">
                Created as part of my journey to blend storytelling with visual art, this book represents my passion for meaningful design that can inspire and educate.
              </p>
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1 }}
              >
                {bookDetails.map((item, index) => (
                  <div key={item.label} className="flex justify-between items-center py-3 border-b border-stone-200">
                    <span className="text-stone-600 font-light">{item.label}</span>
                    <span className="text-stone-800">{item.value}</span>
                  </div>
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
    { icon: "✉️", title: "Email", info: "carlotastar@icloud.com" },
    { icon: "📱", title: "Instagram", info: "@carlota.vaquer" },
    { icon: "🏫", title: "University", info: "Universidad Europea" }
  ];
  
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-8 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-stone-800 mb-16">
            Let's Connect
          </h2>
          
          <motion.p 
            className="text-xl text-stone-700 leading-relaxed font-light mb-16 max-w-2xl mx-auto"
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
            {contactItems.map((contact, index) => (
              <motion.div 
                key={contact.title}
                className="p-8 bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl border border-stone-200 hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3 className="text-lg text-stone-800 font-light mb-2">{contact.title}</h3>
                <p className="text-stone-600 font-light">{contact.info}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="pt-8 border-t border-stone-200"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-stone-500 font-light">
              © 2025 Carlota Vaquer Rodemann. Crafted with passion and creativity.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;