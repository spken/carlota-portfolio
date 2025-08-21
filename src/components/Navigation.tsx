import React from "react";
import { motion } from "framer-motion";
import { NavigationProps } from "./types";
import { navigationSections } from "./utils";

const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  scrollToSection,
}) => {
  return (
    <motion.nav
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <div className="flex space-x-1">
        {navigationSections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
              currentSection === section.id
                ? "bg-stone-600 text-white"
                : "text-stone-600 hover:text-stone-700"
            }`}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xs font-light hidden md:block">
              {section.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
