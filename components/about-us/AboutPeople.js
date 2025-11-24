"use client";

import MiniCardWithModal from "@/components/helper/MiniCardWithModal";
import peopleData from "@/data/about-us/people-data";

export default function AboutPeople() {
  return (
    <div className="flex flex-col items-center text-center gap-10 px-6 sm:px-12 lg:px-20">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Our Team
      </h2>

      {/* Team Grid */}
      <div className="flex flex-wrap justify-center gap-8">
          {peopleData.map((person, index) => (
            <MiniCardWithModal
              key={index}
              title={person.title}
              description={person.role}
              imageSrc={person.imageSrc}
              modalData={{
                images: person.modalData.images,
                description: person.modalData.description,
              }}
              button={{
                type: "modal",
                text: "View Profile",
              }}
            />
          ))}
      </div>
    </div>
  );
}
