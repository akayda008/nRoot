"use client";
import Overview from "@/components/helper/Overview";
import awardsOverviewData from "@/data/awards-and-achievements/overview-data";

export default function AwardsOverview() {
  return <Overview {...awardsOverviewData} />;
}
