import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { fonts } from "./utils";

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <ScrollReveal direction="up" delay={0.2}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-[0.15em] text-stone-800 mb-6 sm:mb-8 text-center leading-tight"
              style={{ fontFamily: fonts.heading }}
            >
              About Me
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="mb-6 md:mb-0">
              <ScrollReveal direction="left" delay={0.4}>
                <p
                  className="text-lg sm:text-xl text-stone-700 leading-relaxed font-light mb-4"
                  style={{ fontFamily: fonts.body }}
                >
                  I'm a design student at Universidad Europea, driven by an
                  endless passion for creativity in all its forms.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.6}>
                <p
                  className="text-base sm:text-lg text-stone-600 leading-relaxed font-light mb-4"
                  style={{ fontFamily: fonts.body }}
                >
                  Whether it's the delicate strokes of painting, the precision of
                  drawing, the tactile joy of woodworking, the emotional depth of
                  acting, or the rhythm of music; I find inspiration everywhere.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right" delay={0.8}>
              <div className="relative group cursor-pointer">
                <div className="aspect-[3/4] max-w-xs sm:max-w-sm mx-auto bg-white bg-opacity-30 backdrop-blur-md rounded-3xl relative overflow-hidden shadow-lg border border-white border-opacity-50">
                  <Image
                    src="/portrait.jpeg"
                    alt="Carlota Vaquer Rodemann - Portrait"
                    fill
                    className="object-cover scale-130 transition-opacity duration-300 group-hover:opacity-0"
                    style={{ objectPosition: "center 20%" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <Image
                    src="/princess.jpeg"
                    alt="Carlota Vaquer Rodemann - Princess"
                    fill
                    className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0"
                    style={{ objectPosition: "right 20%" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
