"use client";

import CardWithModal from "@/components/helper/CardWithModal";
import { projectsGreenfieldData } from "@/data/our-projects/section-data";

export default function ProjectsGreenfield() {
  return (
    <CardWithModal
      title={projectsGreenfieldData.title}
      description={projectsGreenfieldData.content.join("\n")} // markdown parser handles line breaks
      imageSrc={projectsGreenfieldData.imageSrc}
      linkHref={projectsGreenfieldData.linkHref}
      reverse={projectsGreenfieldData.reverse}
    />
  );
}
