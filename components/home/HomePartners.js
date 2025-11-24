import Image from "next/image";

export default function HomePartners() {
  const partners = [
    "/home/placeholder.jpg",
    "/home/placeholder.jpg",
    "/home/placeholder.jpg",
  ];

  return (
    <div className="flex flex-col items-center text-center gap-8 px-4 sm:px-8 lg:px-20">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Our Partners
      </h2>

      {/* Partner Logos */}
      <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-12">
        {partners.map((p, i) => (
          <div
            key={i}
            className="w-[100px] sm:w-[130px] lg:w-[150px] flex justify-center"
          >
            <Image
              src={p}
              alt={`Partner ${i + 1}`}
              width={150}
              height={100}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
