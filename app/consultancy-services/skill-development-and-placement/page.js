import SectionWrapper from "@/components/helper/SectionWrapper";
import SkillDevelopmentPlacementOverview from "@/components/consultancy-services/skill-development-and-placement/SkillDevelopmentPlacementOverview";
import SkillDevelopmentPlacementServices from "@/components/consultancy-services/skill-development-and-placement/SkillDevelopmentPlacementServices";

export const metadata = {
  title: "Skill Development & Placement | nRoot Technologies Pvt. Ltd.",
  description:
    "Discover nRoot's Skill Development and Placement consultancy services, focused on empowering talent through training and career opportunities.",
  keywords: [
    "nRoot Technologies",
    "Skill Development",
    "Placement consultancy",
    "Career training",
    "Job readiness",
  ],
};

// Section definitions
const sections = [
  { id: "overview", Component: SkillDevelopmentPlacementOverview },
  { id: "services", Component: SkillDevelopmentPlacementServices },
];

export default function SkillDevelopmentPlacementPage() {
  return (
    <div className="flex flex-col">
      {sections.map(({ id, Component, className }) => (
        <SectionWrapper
          key={id}
          id={id}
          className={className}
        >
          <Component />
        </SectionWrapper>
      ))}
    </div>
  );
}
