export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-50 rounded-xl shadow-md flex-1">
      <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>

      <p className="text-gray-700">
        <strong>Address:</strong>
        <br />
        123 Innovation Drive, Chennai, India
      </p>
      <p className="text-gray-700">
        <strong>Email:</strong>
        <br />
        <a
          href="mailto:info@yourcompany.com"
          className="text-blue-600 hover:text-blue-800"
        >
          info@yourcompany.com
        </a>
      </p>
      <p className="text-gray-700">
        <strong>Phone:</strong>
        <br />
        <a
          href="tel:+911234567890"
          className="text-blue-600 hover:text-blue-800"
        >
          +91 12345 67890
        </a>
      </p>

      <div className="flex gap-4 mt-2">
        <a href="#" className="font-medium text-blue-600 hover:text-blue-800">
          LinkedIn
        </a>
        <a href="#" className="font-medium text-blue-600 hover:text-blue-800">
          Twitter
        </a>
        <a href="#" className="font-medium text-blue-600 hover:text-blue-800">
          Instagram
        </a>
      </div>
    </div>
  );
}
