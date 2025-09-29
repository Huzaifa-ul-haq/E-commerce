// src/pages/NotFound.jsx

import React, { useEffect } from 'react';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BiErrorAlt } from 'react-icons/bi';
import { FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4 text-center">
      {/* Icon and 404 Text */}
      <div data-aos="fade-down" className="flex flex-col items-center space-y-4">
        <BiErrorAlt className="text-blue-600 text-7xl sm:text-8xl drop-shadow-md" />
        <h1 className="text-6xl sm:text-7xl font-extrabold text-blue-700 drop-shadow-lg">404</h1>
        <p className="text-xl sm:text-2xl font-semibold text-gray-800">Oops! Page Not Found</p>
        <p className="text-gray-600 max-w-md">
          The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

  
      {/* Back Home Button */}
      <Link
        to="/"
        data-aos="fade-up"
        className="mt-10 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition duration-300"
      >
        <FaArrowLeft className="text-sm" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
