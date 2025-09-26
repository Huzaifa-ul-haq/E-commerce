
import { Card } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../CardContext';
import { HiOutlineEye } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ShopComponent() {
  const { addToCart } = useContext(CartContext);
  const [toast, setToast] = useState({ show: false, message: '' });

 


  const handleAddToCart = (item) => {
    addToCart(item);
  
  };

  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const trendingItems = [
    { id: 0, name: "Baby Rompar", img: "/images/kids0.jpg", price: "80.00" },
    { id: 1, name: "Baby Suit", img: "/images/kids01.webp", price: "60.00" },
    { id: 2, name: "Baby Shirt", img: "/images/kids02.webp", price: "80.00" },
    { id: 3, name: "Baby sweeter", img: "/images/kids03.webp", price: "80.00" },
    { id: 4, name: "summer clothes", img: "/images/kids_04.jpg", price: "80.00" },
    { id: 5, name: "baby boy dress", img: "/images/kids05.avif", price: "80.00" },
    { id: 6, name: "Rompar", img: "/images/kids.avif", price: "80.00" },
    { id: 7, name: "baby Dress", img: "/images/kids07.avif", price: "80.00" },
    { id: 8, name: "Polo shirt", img: "/images/polo.webp", price: "60.00" },
    { id: 9, name: "Round neck men's t-shirt", img: "/images/round.webp", price: "20.00" },
    { id: 10, name: "Men T-shirt", img: "/images/Men.webp", price: "40.00" },
    { id: 11, name: "Black t-shirt", img: "/images/black.webp", price: "90.00" },
    { id: 12, name: "Yellow striped shirt", img: "/images/striped.webp", price: "80.00" },
    { id: 13, name: "Polka dot white shirt", img: "/images/polka.webp", price: "40.00" },
    { id: 14, name: "Men's pink striped T-shirt", img: "/images/PINK.webp", price: "60.00" },
    { id: 15, name: "Long sleeved shirt", img: "/images/LONG-SHIRT.webp", price: "50.00" },
    { id: 16, name: "Twisted waist shirt", img: "/images/girls-1.webp", price: "60.00" },
    { id: 17, name: "Floral Shirt", img: "/images/girls-2.webp", price: "20.00" },
    { id: 18, name: "Collared blouse", img: "/images/girls3.webp", price: "40.00" },
    { id: 19, name: "Women`s Shirt", img: "/images/girls-4.webp", price: "90.00" },
    { id: 20, name: "Collar Shirt", img: "/images/girls-5.webp", price: "60.00" },
    { id: 21, name: "beauty dress", img: "/images/shirt12.jpg", price: "70.00" },
    { id: 22, name: "Royal Blue Shirt", img: "/images/Royal Blue Shirt.webp", price: "50.00" },
    { id: 23, name: "Wedding frock", img: "/images/girls07.jpg", price: "80.00" },
  ];

  return (
    <div className="bg-gradient-to-b text-gray-800 font-sans pt-10">

      {/* Section Header */}
      <div className="text-center py-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-teal-700 drop-shadow-sm">
          All Products
        </h2>
        <p className="mt-3 text-gray-500 text-md md:text-lg tracking-wide">
          Handpicked styles curated for modern fashion lovers
        </p>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 bg-teal-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transition-all duration-500">
          {toast.message}
        </div>
      )}

      {/* Product Cards */}
      <div className="flex flex-wrap gap-8 justify-center p-2 mt-12 place-items-center">
        {trendingItems.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <Card
              className="relative w-[300px] h-[450px] !bg-white group overflow-hidden shadow-lg rounded-3xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Eye Icon Button */}
              <button
                onClick={() => handleViewDetails(item.id)}
                className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow hover:bg-teal-100 transition"
                title="View Details"
              >
                <HiOutlineEye className="text-teal-600 text-xl" />
              </button>

              {/* Product Image */}
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-[250px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 rounded-t-3xl"
                />
              </div>

              {/* Product Content */}
              <div className="flex flex-col justify-between py-4 gap-3">
                <h5 className="text-lg font-semibold tracking-wide text-gray-800 text-center">
                  {item.name}
                </h5>

                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-700">${item.price}</span>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-3 cursor-pointer rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold tracking-wide shadow-lg hover:from-teal-700 hover:to-cyan-700 hover:scale-105 transition-transform duration-300"
                >
                  Add To Cart
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>

    </div>
  );
}
