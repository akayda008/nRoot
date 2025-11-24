"use client";

import CardWithModal from "@/components/helper/CardWithModal";
import { servicesProjectManagementData } from "@/data/consultancy-services/section-data";

export default function ConsultancyProjectManagement() {
  return (
    <CardWithModal
      title={servicesProjectManagementData.title}
      description={servicesProjectManagementData.content.join("\n")}
      imageSrc={servicesProjectManagementData.imageSrc}
      linkHref={servicesProjectManagementData.linkHref}
      reverse={servicesProjectManagementData.reverse}
    />
  );
}
