"use client";

import CardWithModal from "@/components/helper/CardWithModal";
import { projectsReengineeredData } from "@/data/our-projects/section-data";

export default function ProjectsReengineered() {
  return (
    <CardWithModal
      title={projectsReengineeredData.title}
      description={projectsReengineeredData.content.join("\n")} // markdown parser handles line breaks
      imageSrc={projectsReengineeredData.imageSrc}
      linkHref={projectsReengineeredData.linkHref}
      reverse={projectsReengineeredData.reverse}
    />
  );
}
