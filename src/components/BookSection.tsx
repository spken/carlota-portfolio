import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookDetail } from "./types";
import { fonts } from "./utils";

const BookSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const bookDetails: BookDetail[] = [
    { label: "Target Age", value: "4-8 years" },
    { label: "Theme", value: "Kindness & Karma" },
    { label: "Style", value: "Illustrated Fiction" },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-20 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2
            className="text-4xl md:text-6xl font-thin tracking-[0.15em] text-stone-800 mb-8 text-center"
            style={{ fontFamily: fonts.heading }}
          >
            Featured Work
          </h2>

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h3
              className="text-2xl md:text-3xl text-stone-600 font-light mb-4"
              style={{ fontFamily: fonts.heading, fontStyle: "italic" }}
            >
              "What Goes Around Comes Around"
            </h3>
            <p
              className="text-lg text-stone-500 font-light"
              style={{ fontFamily: fonts.body, letterSpacing: "0.05em" }}
            >
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
                  scale: 1.01,
                  y: -2,
                  transition: { duration: 0.4 },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-20" />
                <div className="relative z-10 p-12 h-full flex flex-col justify-center items-center text-center">
                  <motion.div
                    className="text-5xl mb-8 text-stone-500"
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
                    className="text-xl text-stone-700 font-light mb-4"
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <h4
                className="text-2xl text-stone-800 font-light mb-8"
                style={{ fontFamily: fonts.heading }}
              >
                About the Book
              </h4>
              <p
                className="text-lg text-stone-700 leading-relaxed font-light mb-8"
                style={{ fontFamily: fonts.body }}
              >
                This children's book explores the beautiful concept of karma
                through engaging storytelling and vibrant illustrations. It
                teaches young readers about kindness, empathy, and how our
                actions create ripples that come back to us.
              </p>
              <p
                className="text-lg text-stone-600 leading-relaxed font-light mb-8"
                style={{ fontFamily: fonts.body }}
              >
                Created as part of my journey to blend storytelling with visual
                art, this book represents my passion for meaningful design that
                can inspire and educate.
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
                    <span className="text-stone-600 font-light">
                      {item.label}
                    </span>
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

export default BookSection;
