"use client";

const quickLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Our Projects", href: "/our-projects" },
  { name: "Consultancy", href: "/consultancy-services" },
  { name: "Contact", href: "/contact-us" },
];

const socialLinks = [
  { icon: "🌐", href: "#" },
  { icon: "🔗", href: "#" },
  { icon: "💼", href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1e1e2f] text-white mt-auto shadow-t-lg">
      <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 text-sm">
        {/* Company Info */}
        <div>
          <h3 className="text-white font-semibold mb-2 text-lg">nRoot Technologies Pvt. Ltd.</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Driving innovation through engineering excellence and sustainable development.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-2 text-lg">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-2 text-lg">Contact</h3>
          <address className="not-italic space-y-1 text-gray-300 text-sm">
            <div>📍 Chennai, India</div>
            <div>✉️ info@nroottech.com</div>
            <div>📞 +91 98765 43210</div>
          </address>
        </div>

        {/* Social / Follow */}
        <div>
          <h3 className="text-white font-semibold mb-2 text-lg">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                aria-label="social link"
                className="text-gray-300 hover:text-white text-2xl hover:scale-110 transition-transform duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 text-center text-xs text-gray-300">
        © {currentYear} nRoot Technologies Pvt. Ltd. — All rights reserved.
      </div>
    </footer>
  );
}
