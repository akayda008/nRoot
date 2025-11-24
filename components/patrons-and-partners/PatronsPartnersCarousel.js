import MarqueeCarousel from "@/components/helper/MarqueeCarousel";

const patrons = [
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Patron 1" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Patron 2" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Patron 3" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Patron 4" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Patron 5" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Patron 6" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Patron 7" },
];

const partners = [
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Partner 1" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Partner 2" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Partner 3" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Partner 4" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Partner 5" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Partner 6" },
  { src: "/patrons-and-partners/placeholder.jpg", alt: "Partner 7" },
];

export default function PatronsPartnersCarousel() {
  return (
    <div className="flex flex-col gap-16 px-4">
      <div>
        <h3 className="text-2xl font-medium text-center mb-6">Our Patrons</h3>
        <MarqueeCarousel
          items={patrons}
          height={180}
          gap={32}
          speed={0.5}
          direction="left"
        />
      </div>

      <div>
        <h3 className="text-2xl font-medium text-center mb-6">Our Partners</h3>
        <MarqueeCarousel
          items={partners}
          height={180}
          gap={32}
          speed={0.5}
          direction="left"
        />
      </div>
    </div>
  );
}
