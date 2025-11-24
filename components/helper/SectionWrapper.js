export default function SectionWrapper({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`
        flex flex-col justify-center items-center
        min-h-[calc(100vh-var(--header-height))]
        border-b border-gray-200 dark:border-gray-700
        px-4 py-12 ${className}
      `}
    >
      <div className="w-full max-w-7xl">{children}</div>
    </section>
  );
}
