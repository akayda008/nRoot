import SectionWrapper from "@/components/helper/SectionWrapper";
import ResearchAndDevelopmentOverview from "@/components/consultancy-services/research-and-development/ResearchAndDevelopmentOverview";
import ResearchAndDevelopmentServices from "@/components/consultancy-services/research-and-development/ResearchAndDevelopmentServices";

export const metadata = {
  title: "Research & Development | nRoot Technologies Pvt. Ltd.",
  description:
    "Explore nRoot's R&D consultancy services including technical expertise, product development, and process optimization.",
  keywords: [
    "nRoot Technologies",
    "Research and Development",
    "R&D consultancy",
    "Product development",
    "Process optimization",
  ],
};

// Section definitions
const sections = [
  { id: "overview", Component: ResearchAndDevelopmentOverview },
  { id: "services", Component: ResearchAndDevelopmentServices },
];

export default function ResearchAndDevelopmentPage() {
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
