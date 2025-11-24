import SectionWrapper from "./SectionWrapper";

export default function ProjectSection({ id, children }) {
  return (
    <SectionWrapper
      id={id}
      className="py-0"     // removes vertical padding from SectionWrapper
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        {children}
      </div>
    </SectionWrapper>
  );
}
