import brownfieldImg from "@/public/our-projects/placeholder.jpg";
import greenfieldImg from "@/public/our-projects/greenfield-projects/placeholder.jpg";
import indigenizationImg from "@/public/our-projects/indigenization/placeholder.jpg";
import reengineeredImg from "@/public/our-projects/reengineered-projects/placeholder.jpg";

export const projectsBrownfieldData = {
  title: "Brownfield Projects",
  content: [
    "We upgrade existing infrastructures with modern technologies, minimizing downtime while enhancing efficiency and sustainability across operations."
  ],
  imageSrc: brownfieldImg,
  linkHref: "/our-projects/brownfield-projects", // navigates to subpage
  // reverse: false,
};

export const projectsGreenfieldData = {
  title: "Greenfield Projects",
  content: [
    "Our Greenfield projects involve building innovative solutions from scratch, driven by cutting-edge design and technology."
  ],
  imageSrc: greenfieldImg,
  linkHref: "/our-projects/greenfield-projects",
  // reverse: true,
};

export const projectsIndigenizationData = {
  title: "Indigenization Projects",
  content: [
    "We focus on creating self-reliant solutions by localizing technology and processes, promoting efficiency and sustainability."
  ],
  imageSrc: indigenizationImg,
  linkHref: "/our-projects/indigenization-projects",
  // reverse: false,
};

export const projectsReengineeredData = {
  title: "Reengineered Projects",
  content: [
    "Our Reengineered projects modernize and optimize existing systems to deliver higher performance, reliability, and sustainability."
  ],
  imageSrc: reengineeredImg,
  linkHref: "/our-projects/reengineered-projects",
  // reverse: true,
};
