export default function ContactMap() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-md flex-1">
      <iframe
        title="Company Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.467511865192!2d80.27071831480158!3d13.082680390782088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265cf1dd6b8bb%3A0x7ab2e9cde7e3a3c4!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}
