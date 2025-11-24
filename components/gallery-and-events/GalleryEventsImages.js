"use client";

import MiniCardWithModal from "@/components/helper/MiniCardWithModal";
import galleryData from "@/data/gallery-and-events/gallery-data";

export default function GalleryEventsImages() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center px-4">
      {/* Heading */}
      <h3 className="text-2xl font-medium">Snapshots from Our Journey</h3>

      {/* Gallery Grid */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-6 max-w-6xl place-items-center">
          {galleryData.map((album, index) => (
            <MiniCardWithModal
              key={index}
              title={album.title}
              imageSrc={album.imageSrc}
              images={album.modalData?.images || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
