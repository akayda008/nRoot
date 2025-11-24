import SectionWrapper from "@/components/helper/SectionWrapper";
import PatronsPartnersOverview from "@/components/patrons-and-partners/PatronsPartnersOverview";
import PatronsPartnersCarousel from "@/components/patrons-and-partners/PatronsPartnersCarousel";

export const metadata = {
  title: "Patrons & Partners | nRoot Technologies Pvt. Ltd.",
  description:
    "Meet the esteemed patrons and partners of nRoot Technologies who support our mission of innovation and excellence.",
  keywords: [
    "nRoot Technologies",
    "Patrons",
    "Partners",
    "Collaborators",
    "Innovation",
  ],
};

const sections = [
  { id: "overview", Component: PatronsPartnersOverview },
  { id: "carousel", Component: PatronsPartnersCarousel },
];

export default function PatronsPartnersPage() {
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