"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import useMarkdownParser from "@/components/helper/useMarkdownParser";

/**
 * ImageCarousel
 * 
 * Props:
 * - images: array of image URLs or objects { src, caption }
 * - onImageClick: function(index) called when image clicked
 * - mode: "single" | "group" (default: "group")
 */
export default function ImageCarousel({ images = [], onImageClick = () => {}, mode = "group" }) {
  const [currentIndex, setCurrentIndex] = useState(0); // for single mode
  const [currentGroup, setCurrentGroup] = useState(0); // for group mode
  const parseMarkdown = useMarkdownParser();

  const imageGroups = useMemo(() => {
    if (!Array.isArray(images) || images.length === 0) return [];
    const groups = [];
    for (let i = 0; i < images.length; i += 3) {
      groups.push(images.slice(i, i + 3));
    }
    return groups;
  }, [images]);

  if (!images || images.length === 0) return null;

  // ----------------- GROUP MODE LOGIC -----------------

  const nextGroup = () => setCurrentGroup(prev => (prev === imageGroups.length - 1 ? 0 : prev + 1));
  const prevGroup = () => setCurrentGroup(prev => (prev === 0 ? imageGroups.length - 1 : prev - 1));

  // ----------------- SINGLE MODE LOGIC -----------------
  const nextSingle = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSingle = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // ----------------- RENDER -----------------
  if (mode === "single") {
  const current = images[currentIndex];

  return (
    <div className="relative flex flex-col items-center w-full">

      {/* ANIMATED IMAGE BOX */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full"
      >
        {/* FIXED IMAGE BOX */}
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-900">
          <Image
            src={typeof current === "string" ? current : current.src}
            alt={current.caption || `Image ${currentIndex + 1}`}
            fill
            className="object-contain cursor-pointer"
            onClick={() => onImageClick(currentIndex)}
          />
        </div>

        {/* CAPTION */}
        {current.caption && (
          <div
            className="text-sm text-gray-700 mt-2 prose prose-sm text-center"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(current.caption) }}
          />
        )}
      </motion.div>

      {/* ===== NAVIGATION ROW (Arrows Left/Right + Bubbles Center) ===== */}
      {images.length > 1 && (
        <div className="flex items-center justify-between w-full mt-3 px-4">

          {/* LEFT ARROW */}
          <button
            onClick={prevSingle}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            aria-label="Previous image"
          >
            <HiArrowLeft />
          </button>

          {/* BUBBLES */}
          <div className="flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentIndex ? "bg-gray-800" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSingle}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            aria-label="Next image"
          >
            <HiArrowRight />
          </button>

        </div>
      )}

    </div>
  );
  }

  // Default: group mode (original behavior)
  const isSmallSet = images.length <= 3;
  return (
    <div className="relative flex flex-col items-center">
      <div className={`overflow-hidden w-full flex items-center px-2 ${isSmallSet ? "justify-center gap-4" : "justify-between gap-4"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGroup}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="flex gap-4 w-full justify-center"
          >
            {imageGroups[currentGroup].map((img, idx) => (
              <div className="shrink-0 text-center" key={idx}>
                <Image
                  src={typeof img === "string" ? img : img.src}
                  alt={img.caption || `Image ${currentGroup * 3 + idx + 1}`}
                  width={isSmallSet ? 300 : 260}
                  height={isSmallSet ? 200 : 160}
                  className="rounded-lg object-cover cursor-pointer transition-transform hover:scale-[1.03]"
                  onClick={() => onImageClick(currentGroup * 3 + idx)}
                />
                {img.caption && (
                  <div
                    className="text-sm text-gray-700 mt-2 prose prose-sm max-w-none text-center"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(img.caption) }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      {imageGroups.length > 1 && (
        <div className="flex justify-between items-center w-full mt-4">
          <button onClick={prevGroup} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            <HiArrowLeft />
          </button>
          <div className="flex gap-1">
            {imageGroups.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentGroup(idx)}
                className={`w-3 h-3 rounded-full transition-colors focus:outline-none ${
                  idx === currentGroup ? "bg-gray-800" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
          <button onClick={nextGroup} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            <HiArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
