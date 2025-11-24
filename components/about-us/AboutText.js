"use client";

import Overview from "@/components/helper/Overview";
import aboutTextData from "@/data/about-us/text-data";

export default function AboutText() {
  return (
    <Overview
      title={aboutTextData.title}
      paragraphs={aboutTextData.paragraphs}
      align="center"
    />
  );
}
