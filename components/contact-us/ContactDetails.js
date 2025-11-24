// components/contact-us/ContactDetails.js
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap";

export default function ContactDetails() {
  return (
    <div className="flex w-full flex-wrap gap-8 justify-center items-stretch">
      <div className="flex-1 min-w-[300px] max-w-[45%] flex">
        <ContactInfo className="flex-1" />
      </div>
      <div className="flex-1 min-w-[300px] max-w-[45%] flex">
        <ContactMap className="flex-1" />
      </div>
    </div>
  );
}
