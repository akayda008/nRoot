"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

import ImageCarousel from "./ImageCarousel";
import FullscreenViewer from "./FullscreenViewer";
import useMarkdownParser from "@/components/helper/useMarkdownParser";

export default function MiniCardWithModal({
  title,
  description,
  imageSrc,
  images = [],
  button,
}) {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasGallery = images && images.length > 0;
  const parseMarkdown = useMarkdownParser();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (fullscreen) setFullscreen(false);
        else if (open) setOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, fullscreen]);

  const handleImageClick = (index = 0) => {
    setCurrentIndex(index);
    setFullscreen(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center w-72 hover:shadow-lg transition-shadow duration-300">
      {/* === Card Image === */}
      <div
        className={`relative w-full h-44 mb-4 ${hasGallery || button?.type === "modal"
            ? "cursor-pointer hover:opacity-90 transition"
            : ""
          }`}
        onClick={() => {
          // Only open modal if it's a gallery or modal-type button
          if (hasGallery || button?.type === "modal") setOpen(true);
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain rounded-lg border-2 bg-gray-900"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>

      {/* === Title & Description === */}
      {title && <h4 className="text-lg font-semibold mb-1">{title}</h4>}
      {description && (
        <p
          className="text-gray-600 mb-3 text-center"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }}
        />
      )}

      {/* === Optional Button === */}
      {button && (
        <>
          {button.type === "link" && button.href ? (
            <Link
              href={button.href}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition hover:scale-105"
            >
              {button.text}
            </Link>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition hover:scale-105"
            >
              {button.text}
            </button>
          )}
        </>
      )}

      {/* === Modal === */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              // 🟢 Dynamic modal width — scales automatically based on image count
              className={`bg-white rounded-xl shadow-xl p-6 w-full relative overflow-hidden ${images.length === 1
                  ? "max-w-lg"
                  : images.length === 2
                    ? "max-w-2xl"
                    : images.length === 3
                      ? "max-w-5xl"
                      : "max-w-4xl"
                }`}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
              >
                <HiX />
              </button>

              {title && <h3 className="text-2xl font-semibold mb-4">{title}</h3>}

              {/* === Image Carousel Section === */}
              {hasGallery ? (
                <ImageCarousel
                  images={images}
                  onImageClick={handleImageClick}
                  mode="group"
                />
              ) : (
                <div className="flex justify-center mb-4">
                  <Image
                    src={imageSrc}
                    alt={title}
                    width={350}
                    height={240}
                    className="rounded-lg object-cover cursor-pointer "
                    onClick={() => handleImageClick(0)}
                  />
                </div>
              )}

              {/* Description */}
              {description && (
                <p
                  className="text-gray-700 leading-relaxed text-justify mt-4"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Fullscreen Viewer === */}
      {/* === Fullscreen Viewer (opens only when fullscreen is true) === */}
      {fullscreen && (
        <FullscreenViewer
          images={images}
          startIndex={currentIndex} // ✅ correct prop name for your viewer
          onClose={() => setFullscreen(false)}
        />
      )}
    </div>
  );
}
