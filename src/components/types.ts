import { MotionValue } from "framer-motion";

export interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
}

export interface ContactItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  info: string;
  link: string;
}

export interface BookDetail {
  label: string;
  value: string;
}

export interface NavigationProps {
  currentSection: string;
  scrollToSection: (section: string) => void;
}

export interface Section {
  id: string;
  label: string;
}
