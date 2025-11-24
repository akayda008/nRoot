// data/consultancy-services/section-data.js
import projectImg from "@/public/consultancy-services/placeholder.jpg";
import rndImg from "@/public/consultancy-services/placeholder.jpg";
import placementImg from "@/public/consultancy-services/placeholder.jpg";

export const servicesProjectManagementData = {
  title: "Project Management Consultancy",
  content: [
    "We deliver expert project management solutions tailored to ensure efficiency, precision, and timely completion of industrial and engineering projects."
  ],
  imageSrc: projectImg,
  linkHref: "/consultancy-services/project-management",
  // reverse: false,
};

export const servicesResearchAndDevelopmentData = {
  title: "Research & Development Consultancy",
  content: [
    "Our R&D consultancy fosters innovation and provides technical expertise to support product development and process optimization."
  ],
  imageSrc: rndImg,
  linkHref: "/consultancy-services/research-and-development",
  // reverse: true,
};

export const servicesSkillDevelopmentData = {
  title: "Training & Placement Consultancy",
  content: [
    "Our consultancy extends to training and placement services, helping organizations and institutions equip individuals with the right skills for industry readiness and career advancement."
  ],
  imageSrc: placementImg,
  linkHref: "/consultancy-services/skill-development-and-placement",
  // reverse: false,
};
