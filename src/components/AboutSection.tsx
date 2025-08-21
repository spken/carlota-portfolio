import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fonts } from "./utils";

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-20 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2
            className="text-4xl md:text-6xl font-thin tracking-[0.15em] text-stone-800 mb-16 text-center"
            style={{ fontFamily: fonts.heading }}
          >
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <p
                className="text-xl text-stone-700 leading-relaxed font-light mb-8"
                style={{ fontFamily: fonts.body }}
              >
                I'm a design student at Universidad Europea, driven by an
                endless passion for creativity in all its forms.
              </p>
              <p
                className="text-lg text-stone-600 leading-relaxed font-light mb-8"
                style={{ fontFamily: fonts.body }}
              >
                Whether it's the delicate strokes of painting, the precision of
                drawing, the tactile joy of woodworking, the emotional depth of
                acting, or the rhythm of music; I find inspiration everywhere.
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
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ◊
                  </motion.div>
                  <p
                    className="text-stone-600 font-light text-sm"
                    style={{ fontFamily: fonts.heading, fontStyle: "italic" }}
                  >
                    "Art is not what you see,
                    <br />
                    but what you make others see."
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

export default AboutSection;
