import SectionWrapper from "@/components/helper/SectionWrapper";
import AboutOverview from "@/components/about-us/AboutOverview";
import AboutPeople from "@/components/about-us/AboutPeople";
import AboutText from "@/components/about-us/AboutText";

export const metadata = {
  title: "About Us | nRoot Technologies Pvt. Ltd.",
  description:
    "Learn more about nRoot Technologies — our mission, our people, and our commitment to innovation.",
  keywords: [
    "nRoot Technologies",
    "About Us",
    "Our Team",
    "Technology Innovation",
    "Engineering R&D",
    "Industrial Excellence",
  ],
};

// Section definitions (with optional styling)
const sections = [
  { id: "overview", Component: AboutOverview },
  { id: "people", Component: AboutPeople },
  { id: "text", Component: AboutText },
];

export default function AboutPage() {
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
