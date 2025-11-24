import SectionWrapper from "@/components/helper/SectionWrapper";
import HomeLanding from "@/components/home/HomeLanding";
import HomeAbout from "@/components/home/HomeAbout";
import HomeProjects from "@/components/home/HomeProjects";
import HomePartners from "@/components/home/HomePartners";

export const metadata = {
  title: "Home | nRoot Technologies Pvt. Ltd.",
  description:
    "Welcome to nRoot Technologies — driving innovation through engineering, R&D, and industrial excellence.",
  keywords: [
    "nRoot Technologies",
    "Engineering solutions",
    "Industrial R&D",
    "Technology innovation",
    "Brownfield projects",
    "Greenfield projects",
  ],
};

// Section definitions (with optional styling)
const sections = [
  { id: "landing", Component: HomeLanding }, //include className for any of the bg changes or design
  { id: "about", Component: HomeAbout },
  { id: "projects", Component: HomeProjects },
  { id: "partners", Component: HomePartners },
];

export default function Home() {
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
