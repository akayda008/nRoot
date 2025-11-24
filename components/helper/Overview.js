"use client";

import useMarkdownParser from "./useMarkdownParser"; // ✅ import your hook

export default function Overview({ title, paragraphs = [], align = "center" }) {
  const textAlignClasses =
    align === "center"
      ? "text-center justify-center items-center"
      : align === "left"
      ? "text-left items-start"
      : "text-right items-end";

  const parseMarkdown = useMarkdownParser(); // ✅ use the hook

  return (
    <div className={`flex flex-col ${textAlignClasses} gap-5 px-6 sm:px-8 lg:px-0`}>
      {title && (
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">{title}</h2>
      )}

      {paragraphs.map((text, index) => (
        <p
          key={index}
          className="text-gray-700 max-w-2xl leading-relaxed text-justify"
          style={{ textAlignLast: align }}
          dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }}
        />
      ))}
    </div>
  );
}
