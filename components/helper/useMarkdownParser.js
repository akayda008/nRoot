"use client";

export default function useMarkdownParser() {
  const parseMarkdown = (text) => {
    if (!text) return "";

    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **strong**
      .replace(/\*(.*?)\*/g, "<b>$1</b>")               // *bold*
      .replace(/_(.*?)_/g, "<i>$1</i>")                 // _italic_
      .replace(/__(.*?)__/g, "<u>$1</u>")               // __underline__
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">$1</a>'
      ) // [text](url)
      .replace(/\n/g, "<br />");                        // new lines
  };

  return parseMarkdown; // ✅ return the function
}
