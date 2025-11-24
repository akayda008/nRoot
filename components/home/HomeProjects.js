"use client";

import MiniCardWithModal from "@/components/helper/MiniCardWithModal";
import projectsData from "@/data/home/projects-data";

export default function HomeProjects() {
  return (
    <div className="flex flex-col items-center gap-10 px-4 sm:px-8 lg:px-20 text-center">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Our Projects
      </h2>

      {/* Projects Grid */}
      <div className="flex flex-wrap justify-center gap-8">
          {projectsData.map((project, index) => (
            <MiniCardWithModal
              key={index}
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              button={{
                type: "link",
                href: project.button.href,
                text: project.button.text,
              }}
            />
          ))}
      </div>
    </div>
  );
}
