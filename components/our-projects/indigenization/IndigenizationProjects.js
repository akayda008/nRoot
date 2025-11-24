import ProjectSection from "@/components/helper/ProjectSection";
import CardWithModal from "@/components/helper/CardWithModal";
import { indigenizationProjectsModalData } from "@/data/our-projects/indigenization/projects-data";

export default function IndigenizationProjectsPage() {
  return (
    <>
      {indigenizationProjectsModalData.map((project, idx) => (
        <ProjectSection id={`project-${idx}`} key={idx}>
          <CardWithModal
            title={project.title}
            description="Click below to view details"
            imageSrc={project.images[0].src}
            modalData={{
              title: project.title,
              content: project.content,
              images: project.images,
            }}
            buttonText="View Project"
            reverse={project.reverse}
          />
        </ProjectSection>
      ))}
    </>
  );
}
