"use client";
import Overview from "@/components/helper/Overview";
import patronsPartnersOverviewData from "@/data/patrons-and-partners/overview-data";

export default function PatronsPartnersOverview() {
  return <Overview {...patronsPartnersOverviewData} />;
}
