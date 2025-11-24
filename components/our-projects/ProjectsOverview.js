"use client";
import Overview from "@/components/helper/Overview";
import projectsOverviewData from "@/data/our-projects/overview-data";

export default function ProjectsOverview() {
  return <Overview {...projectsOverviewData} />;
}
