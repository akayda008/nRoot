// ReengineeredProjects.js
"use client";

import CardWithModal from "@/components/helper/CardWithModal";
import { reengineeredProjectsModalData } from "@/data/our-projects/reengineered-projects/projects-data";

export default function ReengineeredProjectsPage() {
  return (
    <div className="flex flex-col gap-12 py-12">
      {reengineeredProjectsModalData.map((project, idx) => (
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
