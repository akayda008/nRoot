import SectionWrapper from "@/components/helper/SectionWrapper";
import ContactForm from "@/components/contact-us/ContactForm";
import ContactDetails from "@/components/contact-us/ContactDetails";

export const metadata = {
  title: "Contact Us | nRoot Technologies Pvt. Ltd.",
  description:
    "Get in touch with nRoot Technologies Pvt. Ltd. for inquiries, collaborations, or support. We'd love to hear from you.",
  keywords: [
    "nRoot Technologies",
    "Contact nRoot",
    "Customer support",
    "Business inquiries",
    "Partnerships",
  ],
};

// Section definitions
const sections = [
  { id: "contact-form", Component: ContactForm },
  { id: "contact-details", Component: ContactDetails },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {sections.map(({ id, Component, className }) => (
        <SectionWrapper
          key={id}
          id={id}
          className={className}
        >
          <Component />
        </SectionWrapper>
      ))}
    </div>
  );
}
