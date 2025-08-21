"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TextSelectionIndicator: React.FC = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBounds, setSelectionBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      
      if (selection && selection.toString().length > 0) {
        setIsSelecting(true);
        
        // Get the bounds of the selection
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelectionBounds({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        });

        // Clear the timeout if it exists
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Hide the indicator after a delay
        timeoutId = setTimeout(() => {
          setIsSelecting(false);
        }, 2000);
      } else {
        setIsSelecting(false);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    };

    const handleMouseUp = () => {
      // Small delay to allow selection to be processed
      setTimeout(handleSelectionChange, 50);
    };

    const handleScroll = () => {
      // Clear the actual text selection when scrolling
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }
      
      // Hide indicator immediately when scrolling
      setIsSelecting(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    const handleResize = () => {
      // Hide indicator when window is resized
      setIsSelecting(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('scroll', handleScroll, true); // Use capture to catch all scroll events
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isSelecting && selectionBounds.width > 0 && (
        <motion.div
          className="fixed pointer-events-none z-[9996] border-2 border-stone-400/30 rounded-sm"
          style={{
            left: selectionBounds.x - 2,
            top: selectionBounds.y - 2,
            width: selectionBounds.width + 4,
            height: selectionBounds.height + 4,
          }}
          initial={{ 
            opacity: 0,
            scale: 0.8,
            boxShadow: '0 0 0 rgba(200, 160, 130, 0)'
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            boxShadow: '0 0 20px rgba(200, 160, 130, 0.3)'
          }}
          exit={{ 
            opacity: 0,
            scale: 0.9,
            boxShadow: '0 0 0 rgba(200, 160, 130, 0)'
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default TextSelectionIndicator;
