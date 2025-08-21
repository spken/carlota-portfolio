import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { BookDetail } from "./types";
import { fonts } from "./utils";

const BookSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const bookDetails: BookDetail[] = [
    { label: "Target Age", value: "4-8 years" },
    { label: "Theme", value: "Kindness & Karma" },
    { label: "Style", value: "Illustrated Fable" },
  ];

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
                "What Goes Around Comes Around"
              </h3>
              <p
                className="text-base md:text-lg text-stone-500 font-light"
                style={{ fontFamily: fonts.body, letterSpacing: "0.05em" }}
              >
                A Children's Book
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal direction="left" delay={0.6}>
              <div className="relative group">
                <motion.div
                  className="aspect-[3/4] max-w-sm mx-auto bg-white bg-opacity-30 backdrop-blur-md rounded-3xl relative overflow-hidden shadow-lg border border-white border-opacity-50"
                  whileHover={{
                    scale: 1.01,
                    y: -2,
                    transition: { duration: 0.4 },
                  }}
                >
                  <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col justify-center items-center text-center">
                    <motion.div
                      className="text-4xl lg:text-5xl mb-6 lg:mb-8 text-stone-500"
                      animate={{
                        rotate: [0, 2, -2, 0],
                        scale: [1, 1.01, 1],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    >
                      ◈
                    </motion.div>
                    <h4
                      className="text-lg lg:text-xl text-stone-700 font-light mb-3 lg:mb-4"
                      style={{ fontFamily: fonts.heading }}
                    >
                      Book Cover
                    </h4>
                    <p
                      className="text-stone-500 font-light text-sm"
                      style={{ fontFamily: fonts.body, letterSpacing: "0.05em" }}
                    >
                      Coming Soon
                    </p>
                  </div>
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </motion.div>
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
                  This children's book explores the beautiful concept of karma
                  through engaging storytelling and vibrant illustrations. It
                  teaches young readers about kindness, empathy, and how our
                  actions create ripples that come back to us.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={1.2}>
                <p
                  className="text-base lg:text-lg text-stone-600 leading-relaxed font-light mb-4 lg:mb-6"
                  style={{ fontFamily: fonts.body }}
                >
                  Created as part of my journey to blend storytelling with visual
                  art, this book represents my passion for meaningful design that
                  can inspire and educate. And I love cats.
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
