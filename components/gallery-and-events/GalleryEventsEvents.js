"use client";

import MiniCardWithModal from "@/components/helper/MiniCardWithModal";
import { eventsData } from "@/data/gallery-and-events/events-data";

export default function GalleryEventsEvents() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full px-4">
      <h3 className="text-2xl font-medium">Our Events</h3>

      <div className="flex justify-center items-stretch flex-wrap gap-8">
        {eventsData.map((event) => (
          <MiniCardWithModal
            key={event.id}
            title={event.title}
            description={event.description}
            imageSrc={event.images[0].src}
            images={event.images}
            button={{
              text: "View Details",
              type: "modal",
            }}
          />
        ))}
      </div>
    </div>
  );
}
