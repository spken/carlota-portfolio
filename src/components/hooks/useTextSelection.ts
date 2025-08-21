"use client";

import { useEffect } from 'react';

interface SelectionColors {
  background: string;
  color: string;
}

const sectionSelectionColors: Record<string, SelectionColors> = {
  hero: {
    background: 'rgba(200, 160, 130, 0.4)',
    color: '#3c2414'
  },
  about: {
    background: 'rgba(220, 180, 160, 0.4)',
    color: '#2d1810'
  },
  book: {
    background: 'rgba(190, 150, 130, 0.4)',
    color: '#3a251a'
  },
  contact: {
    background: 'rgba(210, 170, 150, 0.4)',
    color: '#2a1c14'
  }
};

export const useTextSelection = (currentSection: string) => {
  useEffect(() => {
    const colors = sectionSelectionColors[currentSection] || sectionSelectionColors.hero;
    
    // Create dynamic CSS for text selection
    const styleId = 'dynamic-text-selection';
    let existingStyle = document.getElementById(styleId);
    
    if (existingStyle) {
      existingStyle.remove();
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      ::selection {
        background: ${colors.background} !important;
        color: ${colors.color} !important;
        text-shadow: none !important;
      }
      
      ::-moz-selection {
        background: ${colors.background} !important;
        color: ${colors.color} !important;
        text-shadow: none !important;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [currentSection]);
};
