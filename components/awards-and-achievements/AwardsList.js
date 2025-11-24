import MiniCardWithModal from "@/components/helper/MiniCardWithModal";
import { awardsData } from "@/data/awards-and-achievements/awards-data";

export default function AwardsList() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-12 gap-10">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Awards & Achievements
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {awardsData.map((award) => (
          <MiniCardWithModal
            key={award.id}
            title={award.title}
            description={award.description}
            imageSrc={award.imageSrc}
            images={award.images}
            button={award.button}
          />
        ))}
      </div>
    </div>
  );
}
