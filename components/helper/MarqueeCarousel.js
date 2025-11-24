"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

export default function MarqueeCarousel({
  items,
  height = 100,
  gap = 24,
  speed = 0.5,
  direction = "left",
}) {
  const containerRef = useRef(null);
  const requestRef = useRef();

  // Compute duplicates to fill space
  const duplicateItems = (() => {
    if (!items || items.length === 0) return [];
    // We assume at least 2 copies to allow continuous scroll
    return [...items, ...items];
  })();

  // Continuous scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let pos = direction === "left" ? 0 : container.scrollWidth / 2;

    const step = () => {
      if (container) {
        if (direction === "left") {
          pos += speed;
          if (pos >= container.scrollWidth / 2) pos = 0;
        } else {
          pos -= speed;
          if (pos <= 0) pos = container.scrollWidth / 2;
        }
        container.scrollLeft = pos;
      }
      requestRef.current = requestAnimationFrame(step);
    };

    requestRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(requestRef.current);
  }, [speed, direction]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      <div className="flex items-center" style={{ gap: `${gap}px` }}>
        {duplicateItems.map((item, idx) => (
          <div
            key={idx}
            className="shrink-0 overflow-hidden rounded-lg flex items-center justify-center"
            style={{ height: `${height}px` }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              height={height}
              width={height}
              className="object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
