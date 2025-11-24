import CardWithModal from "@/components/helper/CardWithModal";
import { brownfieldProjectsModalData } from "@/data/our-projects/brownfield-projects/projects-data";

export default function BrownfieldProjectsPage() {
  return (
    <div className="flex flex-col gap-12 py-12">
      {brownfieldProjectsModalData.map((project, idx) => (
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
