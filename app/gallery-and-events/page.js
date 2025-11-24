import SectionWrapper from "@/components/helper/SectionWrapper";
import GalleryEventsOverview from "@/components/gallery-and-events/GalleryEventsOverview";
import GalleryEventsEvents from "@/components/gallery-and-events/GalleryEventsEvents";
import GalleryEventsImages from "@/components/gallery-and-events/GalleryEventsImages";

export const metadata = {
  title: "Gallery & Events | nRoot Technologies Pvt. Ltd.",
  description: "Explore the gallery and highlights of events organized by nRoot Technologies.",
  keywords: [
    "nRoot Technologies",
    "Gallery",
    "Events",
    "Exhibition",
    "Highlights",
  ],
};

const sections = [
  { id: "overview", Component: GalleryEventsOverview },
  { id: "events", Component: GalleryEventsEvents },
  { id: "images", Component: GalleryEventsImages },
];

export default function GalleryAndEventsPage() {
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
