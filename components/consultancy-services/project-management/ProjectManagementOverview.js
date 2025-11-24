"use client";
import Overview from "@/components/helper/Overview";
import projectManagementOverviewData from "@/data/consultancy-services/project-management/overview-data";

export default function ProjectManagementOverview() {
  return <Overview {...projectManagementOverviewData} />;
}
