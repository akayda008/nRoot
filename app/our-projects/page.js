import SectionWrapper from "@/components/helper/SectionWrapper";
import ProjectsOverview from "@/components/our-projects/ProjectsOverview";
import ProjectsBrownfield from "@/components/our-projects/ProjectsBrownfield";
import ProjectsGreenfield from "@/components/our-projects/ProjectsGreenfield";
import ProjectsIndigenization from "@/components/our-projects/ProjectsIndigenization";
import ProjectsReengineered from "@/components/our-projects/ProjectsReengineered";

export const metadata = {
  title: "Our Projects | nRoot Technologies Pvt. Ltd.",
  description:
    "Discover nRoot's projects across Brownfield, Greenfield, indigenization, and re-engineering initiatives.",
  keywords: [
    "nRoot Technologies",
    "Brownfield projects",
    "Greenfield projects",
    "Indigenization projects",
    "Re-engineered projects",
    "Industrial projects",
  ],
};

const sections = [
  { id: "overview", Component: ProjectsOverview },
  { id: "brownfield", Component: ProjectsBrownfield },
  { id: "greenfield", Component: ProjectsGreenfield },
  { id: "indigenization", Component: ProjectsIndigenization },
  { id: "reengineered", Component: ProjectsReengineered },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {sections.map(({ id, Component, className }) => (
        <SectionWrapper key={id} id={id} className={className}>
          <Component />
        </SectionWrapper>
      ))}
    </div>
  );
}
