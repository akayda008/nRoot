"use client";

import CardWithModal from "@/components/helper/CardWithModal";
import { servicesSkillDevelopmentData } from "@/data/consultancy-services/section-data";

export default function ConsultancySkillDevelopmentPlacement() {
  return (
    <CardWithModal
      title={servicesSkillDevelopmentData.title}
      description={servicesSkillDevelopmentData.content.join("\n")}
      imageSrc={servicesSkillDevelopmentData.imageSrc}
      linkHref={servicesSkillDevelopmentData.linkHref}
      reverse={servicesSkillDevelopmentData.reverse}
    />
  );
}
