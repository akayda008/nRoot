"use client";

import CardWithModal from "@/components/helper/CardWithModal";
import { projectsBrownfieldData } from "@/data/our-projects/section-data";

export default function ProjectsBrownfield() {
  return (
    <CardWithModal
      title={projectsBrownfieldData.title}
      description={projectsBrownfieldData.content.join("\n")} // markdown parser handles line breaks
      imageSrc={projectsBrownfieldData.imageSrc}
      linkHref={projectsBrownfieldData.linkHref}
      reverse={projectsBrownfieldData.reverse}
    />
  );
}
