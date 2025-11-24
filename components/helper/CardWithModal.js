"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ModalContainer from "@/components/helper/ModalContainer";
import ImageCarousel from "@/components/helper/ImageCarousel";
import FullscreenViewer from "@/components/helper/FullscreenViewer";
import useMarkdownParser from "@/components/helper/useMarkdownParser";

export default function CardWithModal({
  title,
  description,
  imageSrc,
  reverse = false,
  buttonText = "Learn More",
  linkHref,
  modalData, // { title: string, content: string[], images: array } optional
}) {
  const [isOpen, setIsOpen] = useState(false);
  const parseMarkdown = useMarkdownParser();

  const displayImages = modalData?.images?.length
    ? modalData.images
    : modalData?.image
    ? [modalData.image]
    : [];

    const [fullscreen, setFullscreen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageClick = (index = 0) => {
  setCurrentIndex(index);
  setFullscreen(true);
};

  return (
    <>
      {/* Card Section */}
      <div
        className={`flex flex-col md:flex-row items-center justify-between gap-8 w-4/5 max-w-5xl mx-auto ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image */}
        {imageSrc && (
          <div className="w-full md:w-[45%] flex justify-center">
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border-0 bg-gray-900">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}

        {/* Text & Button */}
        <div className="flex flex-col gap-4 flex-1 md:w-[45%] text-center md:text-left">
          {title && <h3 className="text-2xl font-semibold">{title}</h3>}
          {description && <p className="text-gray-600">{description}</p>}

          {buttonText && (
            <>
              {/* If only link (no modal) */}
              {linkHref && !modalData && (
                <Link
                  href={linkHref}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md w-fit hover:bg-blue-700 transition hover:scale-105"
                >
                  {buttonText}
                </Link>
              )}

              {/* If modal */}
              {modalData && !linkHref && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md w-fit hover:bg-blue-700 transition hover:scale-105"
                >
                  {buttonText}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <ModalContainer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={modalData?.title ?? title}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Image Carousel */}
          {displayImages.length > 0 && (
            <div className="w-full md:w-5/12 flex justify-center">
              <ImageCarousel 
                images={displayImages} 
                mode="single"
                onImageClick={handleImageClick}
              />
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col gap-4 text-gray-700 md:w-7/12 text-justify self-center">
            {modalData?.content?.map((para, idx) => (
              <p
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(para),
                }}
              />
            ))}
          </div>
        </div>
      </ModalContainer>
      {fullscreen && (
        <FullscreenViewer
          images={displayImages}
          startIndex={currentIndex}
          onClose={() => setFullscreen(false)}
        />
      )}

    </>
  );
}
