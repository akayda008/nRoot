"use client";
import Overview from "@/components/helper/Overview";
import galleryEventsOverviewData from "@/data/gallery-and-events/overview-data";

export default function GalleryEventsOverview() {
  return <Overview {...galleryEventsOverviewData} />;
}
