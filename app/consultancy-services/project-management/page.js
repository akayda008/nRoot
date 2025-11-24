import SectionWrapper from "@/components/helper/SectionWrapper";
import ProjectManagementOverview from "@/components/consultancy-services/project-management/ProjectManagementOverview";
import ProjectManagementServices from "@/components/consultancy-services/project-management/ProjectManagementServices";

export const metadata = {
  title: "Project Management Consultancy | nRoot Technologies Pvt. Ltd.",
  description:
    "Explore nRoot's Project Management Consultancy services — delivering expert solutions for efficient, precise, and timely completion of industrial and engineering projects.",
  keywords: [
    "nRoot Technologies",
    "Project Management Consultancy",
    "Industrial projects",
    "Engineering projects",
    "Efficiency",
    "R&D",
  ],
};

// Section definitions
const sections = [
  { id: "overview", Component: ProjectManagementOverview },
  { id: "services", Component: ProjectManagementServices },
];

export default function ProjectManagementPage() {
  return (
    <div className="flex flex-col">
      {sections.map(({ id, Component }) => (
        <SectionWrapper key={id} id={id}>
          <Component />
        </SectionWrapper>
      ))}
    </div>
  );
}
