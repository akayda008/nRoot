"use client";

import CardWithModal from "@/components/helper/CardWithModal";
import { servicesResearchAndDevelopmentData } from "@/data/consultancy-services/section-data";

export default function ConsultancyResearchAndDevelopment() {
  return (
    <CardWithModal
      title={servicesResearchAndDevelopmentData.title}
      description={servicesResearchAndDevelopmentData.content.join("\n")}
      imageSrc={servicesResearchAndDevelopmentData.imageSrc}
      linkHref={servicesResearchAndDevelopmentData.linkHref}
      reverse={servicesResearchAndDevelopmentData.reverse}
    />
  );
}
