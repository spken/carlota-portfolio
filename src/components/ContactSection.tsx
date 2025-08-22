import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Instagram, Linkedin, ExternalLink } from "lucide-react";
import { ContactItem } from "./types";
import { fonts } from "./utils";

const ContactSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const contactItems: ContactItem[] = [
    {
      icon: Mail,
      title: "Email",
      info: "carlotastar@icloud.com",
      link: "mailto:carlotastar@icloud.com",
    },
    {
      icon: Instagram,
      title: "Instagram",
      info: "@carlota.vaquer",
      link: "https://instagram.com/carlota.vaquer",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      info: "Carlota Vaquer Rodemann",
      link: "https://www.linkedin.com/in/carlota-vaquer-rodemann-290177352/",
    },
  ];

  return (
    <section
      ref={ref}
      className="flex items-center justify-center px-8 py-8 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2
            className="text-4xl md:text-6xl font-thin tracking-[0.15em] text-stone-800 mb-8"
            style={{ fontFamily: fonts.heading }}
          >
            Let&apos;s Connect
          </h2>

          <motion.p
            className="text-xl text-stone-700 leading-relaxed font-light mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: fonts.body }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            I&apos;m always excited to collaborate on creative projects, discuss art,
            or share stories about design and creativity.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {contactItems.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <motion.a
                  key={contact.title}
                  href={contact.link}
                  target={
                    contact.link.startsWith("mailto:") ? "_self" : "_blank"
                  }
                  rel={
                    contact.link.startsWith("mailto:")
                      ? ""
                      : "noopener noreferrer"
                  }
                  className="group block p-6 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                >
                  <div className="text-center">
                    <div className="flex justify-center items-center mb-4">
                      <IconComponent
                        size={24}
                        className="text-stone-500 group-hover:text-stone-700 transition-colors duration-300"
                      />
                    </div>
                    <h3
                      className="text-lg text-stone-700 font-medium mb-3 group-hover:text-stone-800 transition-colors duration-300"
                      style={{ fontFamily: fonts.heading }}
                    >
                      {contact.title}
                    </h3>
                    <p
                      className="text-stone-500 font-light text-sm group-hover:text-stone-600 transition-colors duration-300"
                      style={{
                        fontFamily: fonts.body,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {contact.info}
                    </p>
                    <div className="mt-3 text-xs text-stone-400 group-hover:text-stone-500 transition-colors duration-300 flex items-center justify-center">
                      Click to{" "}
                      {contact.link.startsWith("mailto:") ? "email" : "visit"}
                      <ExternalLink
                        size={12}
                        className="ml-2 opacity-60 group-hover:opacity-80 transition-opacity duration-300 text-stone-400"
                      />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div
            className="pt-8 border-t border-stone-200 border-opacity-50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <p
              className="text-stone-500 font-light"
              style={{ fontFamily: fonts.body, letterSpacing: "0.02em" }}
            >
              © 2025 Carlota Vaquer Rodemann. Crafted with passion and
              creativity.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
