import Link from "next/link";
import Overview from "@/components/helper/Overview";
import homeAboutData from "@/data/home/about-data";

export default function HomeAbout() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 sm:px-8 lg:px-20 py-12 text-center">
      {/* Overview Section */}
      <Overview
        title={homeAboutData.title}
        paragraphs={homeAboutData.paragraphs}
        align="center"
      />

      {/* CTA Button */}
      <Link
        href="/about-us"
        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium 
                   hover:bg-blue-700 transition-colors duration-200 shadow-sm"
      >
        Learn More
      </Link>
    </div>
  );
}
