import SectionWrapper from "@/components/helper/SectionWrapper";
import ConsultancyOverview from "@/components/consultancy-services/ConsultancyOverview";
import ConsultancyProjectManagement from "@/components/consultancy-services/ConsultancyProjectManagement";
import ConsultancyResearchAndDevelopment from "@/components/consultancy-services/ConsultancyResearchAndDevelopment";
import ConsultancySkillDevelopmentPlacement from "@/components/consultancy-services/ConsultancySkillDevelopmentPlacement";

export const metadata = {
  title: "Consultancy Services | nRoot Technologies Pvt. Ltd.",
  description:
    "Explore nRoot's consultancy services including project management, R&D, and skill development initiatives.",
  keywords: [
    "nRoot Technologies",
    "Consultancy services",
    "Project management",
    "Research and development",
    "Skill development",
    "Industrial consultancy",
  ],
};

// Section definitions
const sections = [
  { id: "overview", Component: ConsultancyOverview },
  { id: "project-management", Component: ConsultancyProjectManagement },
  { id: "research-development", Component: ConsultancyResearchAndDevelopment },
  { id: "skill-development", Component: ConsultancySkillDevelopmentPlacement },
];

export default function ConsultancyServicesPage() {
  return (
    <div className="flex flex-col">
      {sections.map(({ id, Component, className }) => (
        <SectionWrapper key={id} id={id} className={className} >
          <Component />
        </SectionWrapper>
      ))}
    </div>
  );
}
