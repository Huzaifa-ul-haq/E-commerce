



import { Card } from 'flowbite-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../../CardContext';
import { HiOutlineEye } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ShopComponent() {
  const { addToCart } = useContext(CartContext);
  const [toast, setToast] = useState({ show: false, message: '' });

  const navigate = useNavigate();
  const location = useLocation();
  const categoryRefs = useRef({});

  const trendingItems = [
    // Kids
    { id: 1, name: "Rompar", img: "/images/kids.avif", price: "80.00", category: "Kids" }, 
    { id: 2, name: "Baby Suit", img: "/images/kids01.webp", price: "60.00", category: "Kids" },
    { id: 3, name: "Baby Shirt", img: "/images/kids02.webp", price: "80.00", category: "Kids" },
    { id: 4, name: "Baby Sweater", img: "/images/kids03.webp", price: "80.00", category: "Kids" },
    { id: 5, name: "Summer Clothes", img: "/images/kids_04.jpg", price: "80.00", category: "Kids" },
    { id: 6, name: "Baby Boy Dress", img: "/images/kids05.avif", price: "80.00", category: "Kids" },
    { id: 7, name: "Baby Rompar", img: "/images/kids0.jpg", price: "80.00", category: "Kids" },
    { id: 8, name: "Baby Dress", img: "/images/kids07.avif", price: "80.00", category: "Kids" },
    // Men
    { id: 9, name: "Polo Shirt", img: "/images/polo.webp", price: "60.00", category: "Men" },
    { id: 10, name: "Round Neck Men's T-shirt", img: "/images/round.webp", price: "20.00", category: "Men" },
    { id: 11, name: "Men T-shirt", img: "/images/Men.webp", price: "40.00", category: "Men" },
    { id: 12, name: "Black T-shirt", img: "/images/black.webp", price: "90.00", category: "Men" },
    { id: 13, name: "Yellow Striped Shirt", img: "/images/striped.webp", price: "80.00", category: "Men" },
    { id: 14, name: "Polka Dot White Shirt", img: "/images/polka.webp", price: "40.00", category: "Men" },
    { id: 15, name: "Men's Pink Striped T-shirt", img: "/images/PINK.webp", price: "60.00", category: "Men" },
    { id: 16, name: "Long Sleeved Shirt", img: "/images/LONG-SHIRT.webp", price: "50.00", category: "Men" },

    // Women
    { id: 17, name: "Twisted Waist Shirt", img: "/images/girls-1.webp", price: "60.00", category: "Women" },
    { id: 18, name: "Floral Shirt", img: "/images/girls-2.webp", price: "20.00", category: "Women" },
    { id: 19, name: "Collared Blouse", img: "/images/girls3.webp", price: "40.00", category: "Women" },
    { id: 20, name: "Women`s Shirt", img: "/images/girls-4.webp", price: "90.00", category: "Women" },
    { id: 21, name: "Collar Shirt", img: "/images/girls-5.webp", price: "60.00", category: "Women" },
    { id: 22, name: "Beauty Dress", img: "/images/shirt12.jpg", price: "70.00", category: "Women" },
    { id: 23, name: "Royal Blue Shirt", img: "/images/Royal Blue Shirt.webp", price: "50.00", category: "Women" },
    { id: 24, name: "Wedding Frock", img: "/images/girls07.jpg", price: "80.00", category: "Women" }
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
    setToast({ show: true, message: `${item.name} added to cart!` });

    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2000);
  };

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    AOS.init({
      duration: 300,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');

    if (category && categoryRefs.current[category]) {
      setTimeout(() => {
        categoryRefs.current[category].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300);
    }
  }, [location.search]);

  const renderCategorySection = (categoryName) => {
    const filteredItems = trendingItems.filter(item => item.category === categoryName);

    return (
      <div
        key={categoryName}
        ref={(el) => (categoryRefs.current[categoryName] = el)}
        className="mb-16"
      >
        <h3 className="text-5xl font-bold text-white p-2 mb-6 text-center bg-cyan-500">
          {categoryName} Collections
        </h3>
        <div className="flex flex-wrap gap-8 justify-center place-items-center p-5">
          {filteredItems.map((item, i) => (
            <div key={`${item.id}-${i}`} data-aos="fade-up" data-aos-delay={i * 50}>
              <Card className="relative w-[300px] h-[450px] !bg-white group overflow-hidden shadow-lg rounded-3xl !border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                {/* View Details Button */}
                <button
                  onClick={() => handleViewDetails(item.id)}
                  className="absolute top-3 right-3 z-10 p-5 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition cursor-pointer"
                  title="View Details"
                >
                  <HiOutlineEye className="text-teal-900 text-xl" />
                </button>

                {/* Product Image */}
                <div className="overflow-hidden rounded-t-3xl">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-[250px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 rounded-t-3xl"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between py-4 gap-3">
                  <h5 className="text-lg font-semibold tracking-wide text-gray-800 text-center">{item.name}</h5>
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
  };

  return (
    <div className="bg-gradient-to-b text-gray-800 font-sans pt-15">
      {/* Page Header */}
      <div className="text-center py-7">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-teal-500 drop-shadow-sm">All Products</h2>
        <p className="mt-3 text-gray-500 text-md md:text-lg tracking-wide">
          Handpicked styles curated for modern fashion lovers
        </p>
      </div>

      {/* Category Sections */}
      {renderCategorySection("Kids")}
      {renderCategorySection("Men")}
      {renderCategorySection("Women")}
    </div>
  );
}
