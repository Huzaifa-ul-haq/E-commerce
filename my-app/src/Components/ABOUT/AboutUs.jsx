import React, { useLayoutEffect } from 'react';


import aboutBanner from '/images/banner1.avif';

function AboutUsComponent() {


  return (
    <>
      <div className="pt-10">
        {/* Hero Section */}
        <div className="relative w-auto h-[50vh] sm:h-[60vh] overflow-hidden mt-9">
          <img
            src={aboutBanner}
            alt="About Us Banner"
            className="w-[100%] h-[400px] object-cover brightness-90"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-extrabold text-white drop-shadow-lg">
              About Us
            </h1>
            <p className="mt-3 max-w-xl sm:max-w-2xl text-white text-sm sm:text-base md:text-lg font-medium drop-shadow-md">
              Discover our story, values, and what makes Fashion AK a brand that stands out.
            </p>
          </div>
        </div>

        {/* Who We Are Section */}
        <div
          className="w-full bg-gradient-to-br from-white to-gray-100 py-12 sm:py-16 px-4 sm:px-6 md:px-20 min-h-[220px]"

        >
          <div className="max-w-6xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-teal-700">
              Who We Are
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Fashion AK is a modern clothing brand focused on delivering quality, style, and comfort.
              With a blend of traditional and contemporary design, we aim to bring elegance to your
              everyday wardrobe. We’re not just a brand — we’re a lifestyle.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="min-h-[100px]" >
            <h3 className="text-xl sm:text-2xl font-semibold text-teal-600 mb-2">Our Mission</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              To create timeless and affordable fashion pieces that empower people to express their
              unique identities with confidence and authenticity.
            </p>
          </div>

          <div className="min-h-[100px]" >
            <h3 className="text-xl sm:text-2xl font-semibold text-teal-600 mb-2">Our Vision</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              To become a globally recognized brand known for innovation, sustainability, and
              exceptional customer experience in the world of fashion.
            </p>
          </div>
        </div>

        {/* Why Choose Fashion */}
        <div className="w-full bg-gray-100 py-12 sm:py-16 px-4 sm:px-6 md:px-20 max-w-6xl mx-auto text-center min-h-[320px]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-teal-700 mb-6">
            Why Choose Fashion?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10 text-left">
            <div className="bg-white p-5 sm:p-6  rounded-xl shadow-md hover:shadow-xl transition-all min-h-[100px]">
              <h4 className="text-base sm:text-lg font-semibold mb-2">Premium Quality</h4>
              <p className="text-sm text-gray-600">
                Our products are crafted with top-notch materials and attention to detail.
              </p>
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all min-h-[100px]">
              <h4 className="text-base sm:text-lg font-semibold mb-2">Modern Designs</h4>
              <p className="text-sm text-gray-600">
                Stay in trend with fashion-forward styles that reflect your personality.
              </p>
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all min-h-[100px]">
              <h4 className="text-base sm:text-lg font-semibold mb-2">Sustainability</h4>
              <p className="text-sm text-gray-600">
                We care about the planet. Our production process is eco-friendly and conscious.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUsComponent;
