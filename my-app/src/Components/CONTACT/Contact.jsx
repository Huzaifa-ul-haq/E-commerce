import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const updatedMessages = [...existingMessages, formData];
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-12 bg-cyan-200 shadow-xl rounded-3xl my-20 border border-cyan-200">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-cyan-700 tracking-tight">
        Get in Touch
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-6 text-cyan-900">
          <h3 className="text-2xl font-semibold text-cyan-700">Contact Information</h3>
          <ul className="space-y-5 text-lg">
            <li className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-cyan-600 text-xl mt-1" />
              <span>Karachi, Pakistan</span>
            </li>
            <li className="flex items-start gap-4">
              <FaPhoneAlt className="text-cyan-600 text-xl mt-1" />
              <span>+92 1234567</span>
            </li>
            <li className="flex items-start gap-4">
              <FaEnvelope className="text-cyan-600 text-xl mt-1" />
              <span>support@fashion.pk</span>
            </li>
            <li className="flex items-start gap-4">
              <FaClock className="text-cyan-600 text-xl mt-1" />
              <span>Mon - Fri: 9am - 9pm</span>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-100 p-8 rounded-2xl shadow-md border border-cyan-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-transparent border-b-2 border-cyan-900 focus:outline-none focus:ring-0 text-cyan-900 placeholder-cyan-900 py-2"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full bg-transparent border-b-2 border-cyan-900 focus:outline-none focus:ring-0 text-cyan-900 placeholder-cyan-900 py-2"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              className="w-full bg-transparent border-b-2 border-cyan-900 focus:outline-none focus:ring-0 text-cyan-900 placeholder-cyan-900 py-2"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
            >
              Send Message
            </button>
            {isSubmitted && (
              <div className="text-green-600 text-center mt-4 font-medium animate-pulse">
                ✅ Thank you! Your message has been received.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
