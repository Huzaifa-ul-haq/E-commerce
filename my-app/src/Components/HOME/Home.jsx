import React from 'react';
import pic1 from '/images/hh.jpg';
import pic2 from '/images/second-hero.webp';
import pic3 from '/images/modern-2.avif';
import banner from '/images/banner1.avif'
import BoysComponent from '../BoysCollection/boysCollection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';

function HomeComponent() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, [])

  const navigate = useNavigate();

  const HandleButton = () => {
    navigate('Shop')
  }



  return (
    <>
      {/* -----------> Hero Section<----------- */}

      <div className="w-full h-auto md:h-[600px] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-gradient-to-br from-[#fdfcfb] via-[#f1f1f1] to-[#e4e4e4] border-b border-gray-200">

        {/* Text Section */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-2 p-10"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <h2 className="text-sm md:text-base text-gray-500 tracking-widest uppercase font-medium">
            The Best Choice For You
          </h2>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-teal-700 leading-tight drop-shadow-lg">
            Essential Collection
          </h1>

          <h3 className="text-base md:text-lg text-gray-700 tracking-widest  font-medium">

          </h3>

          <button onClick={HandleButton} className=" px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-700  hover:from-cyan-700 hover:to-teal-500 text-white font-semibold tracking-wide rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
            Shop Now
          </button>
        </div>

        {/* Image Section */}
        <div
  className="w-full flex justify-center items-center pt-20 px-4 md:px-8"
  data-aos="zoom-in"
  data-aos-delay="300"
  data-aos-duration="1000"
>
  <div className="relative w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
    <img
      src={pic1}
      alt="Essential Collection"
      className="w-full h-full object-cover rounded-2xl transition-transform duration-500"
    />

    {/* Optional blur/glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent blur-2xl opacity-30 pointer-events-none rounded-2xl"></div>
  </div>
</div>

      </div>


      {/* -----------> Second Section <----------- */}
      <div className="w-full min-h-[500px] md:min-h-[600px] flex flex-col-reverse md:flex-row items-center justify-center bg-gradient-to-bl from-gray-100 to-white px-4 py-10 md:py-16">

        {/* Text Section */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 md:px-8 space-y-4"

          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="p-15">
            <h1 className="text-3xl sm:text-4xl  md:text-5xl font-serif font-bold leading-snug text-teal-500 drop-shadow-md ">
              Elegant Fashion
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-[500px]">
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters...
            </p>

            <button onClick={HandleButton} className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-700  hover:from-cyan-700 hover:to-teal-500 text-white font-semibold tracking-wide rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div
          className="w-full md:w-1/2 flex justify-center items-center px-4 md:px-8 mb-8 md:mb-0"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <img
            src={pic2}
            alt="Fashion"
            className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto object-contain transition-transform duration-500 hover:scale-105 rounded-2xl"
          />
        </div>
      </div>

      {/* ----------->third Section <----------- */}
      <div className="w-full min-h-[500px] md:min-h-[600px] flex flex-col-reverse md:flex-row-reverse items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4 py-10 md:py-16">

        {/* Text Section */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 md:px-8 space-y-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-snug text-teal-500">
            Modern Fashion
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-[500px]">
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters...
          </p>

          <button onClick={HandleButton} className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-700  hover:from-cyan-700 hover:to-teal-500 text-white font-semibold tracking-wide rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
            Shop Now
          </button>
        </div>

        {/* Image Section */}
        <div
          className="w-full md:w-1/2 flex justify-center items-center px-4 md:px-8 mb-8 md:mb-0"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <img
            src={pic3}
            alt="Modern Fashion"
            className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto object-contain transition-transform duration-500 hover:scale-105 rounded-2xl"
          />
        </div>
      </div>



      {/*--------------------> <boys clothing section start> <--------------*/}
      <BoysComponent />
      {/*--------------------> <boys clothing section end> <--------------*/}



      {/* -------------------->Banner section start<--------------------------- */}

      <div className="flex justify-center items-center">
        <button
          onClick={HandleButton}
          className="h-15 px-6 mt-6 w-50 rounded-full font-bold bg-cyan-600 hover:bg-cyan-800 cursor-pointer text-white">

          ALL PRODUCTS
        </button>
      </div>

      <div className="relative w-full h-[60vh] pt-5 overflow-hidden">
        <img
          src={banner}
          alt="Modern Fashion Banner"
          className="w-full h-full object-cover brightness-90"
        />

        <div className="absolute  inset-0 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-20 lg:px-32 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-white drop-shadow-lg">
            Modern Fashion
          </h1>

          <p className="mt-4 max-w-xl text-white text-sm md:text-lg font-semibold drop-shadow-md">
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters...
          </p>

          <button onClick={HandleButton} className="mt-8 px-8 py-3 rounded-xl border-2 border-white bg-white text-black font-bold hover:bg-transparent hover:text-white transition duration-300 drop-shadow-md">
            Shop Now
          </button>
        </div>
      </div>

    </>
  );
}

export default HomeComponent;

