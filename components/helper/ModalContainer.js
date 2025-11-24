"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Children, useMemo } from "react";
import ImageCarousel from "./ImageCarousel"; // make sure this path is correct

export default function ModalContainer({ isOpen, onClose, title, children }) {
  // 🔍 Analyze what’s inside
  const { imageSources, hasVideo, hasText } = useMemo(() => {
    let imageSources = [];
    let hasVideo = false;
    let hasText = false;

    function analyze(child) {
      if (!child) return;
      if (typeof child === "string" && child.trim()) hasText = true;
      if (child.type === "img" && child.props?.src) imageSources.push(child.props.src);
      if (child.type === "video") hasVideo = true;

      // recursively check nested JSX
      if (child.props?.children) {
        Children.forEach(child.props.children, analyze);
      }
    }

    Children.forEach(children, analyze);
    return { imageSources, hasVideo, hasText };
  }, [children]);

  const imageCount = imageSources.length;

  // 🧱 Decide width based on content
  let widthClass = "max-w-4xl";
  if (hasVideo && !hasText) widthClass = "max-w-5xl";
  else if (imageCount >= 3) widthClass = "max-w-6xl";
  else if (imageCount === 2) widthClass = "max-w-5xl";
  else if (imageCount === 1 && !hasText) widthClass = "max-w-lg";
  else if (hasText && !imageCount && !hasVideo) widthClass = "max-w-md";

  // 🚦 Choose rendering method
  const shouldUseCarousel = imageCount > 3;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-100 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative bg-white rounded-2xl shadow-2xl
              w-[95%] sm:w-[90%] md:w-[85%]
              ${widthClass}
              my-8 mx-auto p-6 overflow-visible
            `}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ❌ Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-black dark:text-gray-300"
            >
              <X size={24} />
            </button>

            {/* 🏷 Title */}
            {title && (
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 flex justify-center">
                {title}
              </h3>
            )}

            {/* 🧠 Smart Content Area */}
            <div className="overflow-visible">
              {/* If there are >3 images, render carousel */}
              {shouldUseCarousel ? (
                <div className="mb-6">
                  <ImageCarousel
                    images={imageSources.map((src) => ({ src }))}
                    onImageClick={() => {}}
                  />
                </div>
              ) : (
                // Otherwise, render the original children normally
                children
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
