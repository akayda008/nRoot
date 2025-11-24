import SectionWrapper from "@/components/helper/SectionWrapper";
import AwardsOverview from "@/components/awards-and-achievements/AwardsOverview";
import AwardsList from "@/components/awards-and-achievements/AwardsList";

export const metadata = {
  title: "Awards & Achievements | nRoot Technologies Pvt. Ltd.",
  description: "Discover the accolades and recognitions achieved by nRoot Technologies.",
  keywords: [
    "nRoot Technologies",
    "Awards",
    "Achievements",
    "Recognition",
    "Innovation",
  ],
};

// Section definitions
const sections = [
  { id: "overview", Component: AwardsOverview },
  { id: "list", Component: AwardsList },
];

export default function AwardsAndAchievementsPage() {
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
