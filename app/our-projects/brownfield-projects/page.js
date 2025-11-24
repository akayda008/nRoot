import SectionWrapper from "@/components/helper/SectionWrapper";
import BrownfieldOverview from "@/components/our-projects/brownfield-projects/BrownfieldOverview";
import BrownfieldProjects from "@/components/our-projects/brownfield-projects/BrownfieldProjects";

export const metadata = {
  title: "Brownfield Projects | nRoot Technologies Pvt. Ltd.",
  description:
    "Explore nRoot Technologies’ Brownfield projects focused on modernizing and optimizing existing infrastructures for enhanced performance.",
  keywords: [
    "nRoot Technologies",
    "Brownfield projects",
    "Infrastructure modernization",
    "Optimization",
    "Technology transformation",
  ],
};

// Section definitions
const sections = [
  { id: "overview", Component: BrownfieldOverview },
  { id: "projects", Component: BrownfieldProjects },
];

export default function BrownfieldPage() {
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
