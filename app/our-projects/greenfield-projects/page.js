import SectionWrapper from "@/components/helper/SectionWrapper";
import GreenfieldOverview from "@/components/our-projects/greenfield-projects/GreenfieldOverview";
import GreenfieldProjects from "@/components/our-projects/greenfield-projects/GreenfieldProjects";

export const metadata = {
  title: "Greenfield Projects | nRoot Technologies Pvt. Ltd.",
  description:
    "Discover nRoot Technologies’ Greenfield projects that focus on building innovative, sustainable, and future-ready infrastructures from the ground up.",
  keywords: [
    "nRoot Technologies",
    "Greenfield projects",
    "Infrastructure development",
    "Sustainable technology",
    "New project design",
  ],
};

// Section definitions
const sections = [
  { id: "overview", Component: GreenfieldOverview },
  { id: "projects", Component: GreenfieldProjects },
];

export default function GreenfieldPage() {
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
