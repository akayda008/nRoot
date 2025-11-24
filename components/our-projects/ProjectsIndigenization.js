"use client";

import CardWithModal from "@/components/helper/CardWithModal";
import { projectsIndigenizationData } from "@/data/our-projects/section-data";

export default function ProjectsIndigenization() {
  return (
    <CardWithModal
      title={projectsIndigenizationData.title}
      description={projectsIndigenizationData.content.join("\n")} // markdown parser handles line breaks
      imageSrc={projectsIndigenizationData.imageSrc}
      linkHref={projectsIndigenizationData.linkHref}
      reverse={projectsIndigenizationData.reverse}
    />
  );
}
