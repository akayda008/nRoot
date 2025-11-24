"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight, HiX } from "react-icons/hi";
import useMarkdownParser from "@/components/helper/useMarkdownParser"; // ✅ Import Markdown parser

export default function FullscreenViewer({ images = [], startIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const parseMarkdown = useMarkdownParser(); // ✅ Initialize Markdown parser

  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // Close with Esc key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!images || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-999"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // close when clicking outside
      >
        <div onClick={(e) => e.stopPropagation()} className="relative max-w-[95vw] max-h-[95vh]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:scale-110 transition"
          >
            <HiX />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:scale-110 transition"
                aria-label="Previous image"
              >
                <HiArrowLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:scale-110 transition"
                aria-label="Next image"
              >
                <HiArrowRight />
              </button>
            </>
          )}

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <Image
              src={
                typeof images[currentIndex] === "string"
                  ? images[currentIndex]
                  : images[currentIndex].src
              }
              alt={`Fullscreen ${currentIndex + 1}`}
              width={1000}
              height={650}
              className="rounded-xl object-contain max-h-[85vh] select-none"
            />

            {/* Markdown Caption (optional) */}
            {images[currentIndex]?.caption && (
              <div
                className="text-gray-300 text-center mt-4 text-base px-4 prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(images[currentIndex].caption),
                }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
