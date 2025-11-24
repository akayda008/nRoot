"use client";

import CardWithModal from "@/components/helper/CardWithModal";
import { skillDevelopmentPlacementServicesData } from "@/data/consultancy-services/skill-development-and-placement/services-data";

export default function SkillDevelopmentPlacementServices() {
  return (
    <div className="flex flex-col gap-12 py-12">
      {skillDevelopmentPlacementServicesData.map((project, idx) => (
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
