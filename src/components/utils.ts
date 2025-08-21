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
  "linear-gradient(135deg, #fdf0f0 0%, #fce8eb 25%, #f8eff0 100%)", // Gentle rose/red
  "linear-gradient(135deg, #f5f1eb 0%, #f0ebe5 25%, #f7f3ed 100%)", // Warm neutral beige
  "linear-gradient(135deg, #f7f0ff 0%, #f0e8fc 25%, #ede8f5 100%)", // Soft lavender
  "linear-gradient(135deg, #fdf0f0 0%, #fce8eb 25%, #f8eff0 100%)", // Gentle rose
];

// Font family constants using CSS variables from layout.tsx
export const fonts = {
  name: "var(--font-allura)",
  heading: "var(--font-playfair)",
  body: "var(--font-inter)",
};
