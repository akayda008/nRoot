// GreenfieldProjects.js
"use client";

import CardWithModal from "@/components/helper/CardWithModal";
import { greenfieldProjectsModalData } from "@/data/our-projects/greenfield-projects/projects-data";

export default function GreenfieldProjectsPage() {
  return (
    <div className="flex flex-col gap-12 py-12">
      {greenfieldProjectsModalData.map((project, idx) => (
        <CardWithModal
          key={idx}
          title={project.title}
          description="Click below to view details"
          imageSrc={project.images[0]}
          modalData={{
            title: project.title,
            content: project.content,
            images: project.images,
          }}
          buttonText="View Project"
          reverse={project.reverse}
        />
      ))}
    </div>
  );
}
