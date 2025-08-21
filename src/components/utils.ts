// Section navigation data
export const navigationSections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "book", label: "Work" },
  { id: "contact", label: "Contact" },
];

// Background gradient configurations
export const backgroundGradients = [
  "linear-gradient(135deg, #f8f0e3 0%, #f5e8d3 25%, #f9f3ed 100%)", // Warm cream with more saturation
  "linear-gradient(135deg, #fae8e8 0%, #f5d7d7 25%, #f7e3e3 100%)", // Subtle rose/red
  "linear-gradient(135deg, #f3ebe0 0%, #ede3d5 25%, #f1e9de 100%)", // Subtle warm beige
  "linear-gradient(135deg, #f9e5e5 0%, #f4d4d4 25%, #f6dede 100%)", // Gentle rose
];

// Font family constants using CSS variables from layout.tsx
export const fonts = {
  name: "var(--font-allura)",
  heading: "var(--font-playfair)",
  body: "var(--font-inter)",
};
