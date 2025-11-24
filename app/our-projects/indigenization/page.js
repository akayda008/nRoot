import SectionWrapper from "@/components/helper/SectionWrapper";
import IndigenizationOverview from "@/components/our-projects/indigenization/IndigenizationOverview";
import IndigenizationProjects from "@/components/our-projects/indigenization/IndigenizationProjects";

export const metadata = {
  title: "Indigenization Projects | nRoot Technologies Pvt. Ltd.",
  description:
    "Explore nRoot Technologies’ Indigenization projects that focus on developing local, innovative solutions and enhancing self-reliance through advanced technology.",
  keywords: [
    "nRoot Technologies",
    "Indigenization",
    "Make in India",
    "Self-reliance",
    "Technology localization",
    "Innovation projects",
  ],
};

// Section definitions
const sections = [
  { id: "overview", Component: IndigenizationOverview },
  { id: "projects", Component: IndigenizationProjects },
];

export default function IndigenizationPage() {
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
