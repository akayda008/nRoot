import SectionWrapper from "@/components/helper/SectionWrapper";
import ReengineeredOverview from "@/components/our-projects/reengineered-projects/ReengineeredOverview";
import ReengineeredProjects from "@/components/our-projects/reengineered-projects/ReengineeredProjects";

export const metadata = {
  title: "Reengineered Projects | nRoot Technologies Pvt. Ltd.",
  description:
    "Explore nRoot Technologies’ Reengineered projects that revitalize existing systems with modern technologies and enhanced efficiency.",
  keywords: [
    "nRoot Technologies",
    "Reengineered projects",
    "System modernization",
    "Process improvement",
    "Technology upgrade",
    "Digital transformation",
  ],
};

// Section definitions
const sections = [
  { id: "overview", Component: ReengineeredOverview },
  { id: "projects", Component: ReengineeredProjects },
];

export default function ReengineeredPage() {
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
