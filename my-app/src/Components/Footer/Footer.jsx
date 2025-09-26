import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function FooterComponent() {
  return (
    <footer className="bg-gradient-to-r p-10 from-teal-50 via-cyan-100 to-cyan-200 px-8 py-14 text-gray-700">
      <div className="max-w-7xl mx-auto grid grid-ols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* Brand & Tagline */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-teal-600 mb-3">
            FASHION         </h1>
          <p className="text-sm max-w-xs leading-relaxed">
            Bringing effortless style with a modern twist — for those who dare to be different.
          </p>

          {/* Social Icons */}
          <div className="flex mt-6 space-x-4 text-teal-600">
            <a href="#" aria-label="Facebook" className="hover:text-cyan-500 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-cyan-500 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-cyan-500 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-cyan-500 transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-teal-700 mb-5">Quick Links</h2>
          <ul className="space-y-3 text-sm">
            {["Shop", "About Us", "Blog", "Contact Us"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-cyan-600 transition-colors duration-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h2 className="text-xl font-semibold text-teal-700 mb-5">Customer Care</h2>
          <ul className="space-y-3 text-sm">
            {["Help Center", "Returns", "Shipping", "FAQs"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-cyan-600 transition-colors duration-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-teal-700 mb-5">Contact</h2>
          <address className="not-italic text-sm space-y-2">
            <p>123 Fashion Ave</p>
            <p>New York, NY 10001</p>
            <p>Email: <a href="mailto:support@akstyle.com" className="text-cyan-600 hover:underline">support@akstyle.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="text-cyan-600 hover:underline">+1 (234) 567-890</a></p>
          </address>
        </div>
      </div>

      <div className="mt-14 border-t border-teal-100 pt-6 text-center text-xs text-gray-400 select-none">
        © {new Date().getFullYear()} AK. All rights reserved.
      </div>
    </footer>
  );
}
