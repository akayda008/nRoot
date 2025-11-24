"use client";
import Overview from "@/components/helper/Overview";
import consultancyOverviewData from "@/data/consultancy-services/overview-data";

export default function ConsultancyOverview() {
  return <Overview {...consultancyOverviewData} />;
}
