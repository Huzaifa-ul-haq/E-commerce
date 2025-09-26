

import React, { useContext} from 'react';
import { Card } from "flowbite-react";
import { CartContext } from '../../CardContext';





function BoysComponent() {
  const { addToCart } = useContext(CartContext);               



  const trendingItems = [
    { id: 8, name: "Polo shirt", img: "/images/polo.webp", price: "60.00" },
    { id: 9,  name: "Round neck men's t-shirt", img: "/images/round.webp", price: "20.00" },
    { id: 10, name: "Men T-shirt", img: "/images/Men.webp", price: "40.00" },
    { id: 11, name: "Black t-shirt", img: "/images/black.webp", price: "90.00" },
    { id: 12, name: "Yellow striped shirt", img: "/images/striped.webp", price: "80.00" },
    { id: 13, name: "Polka dot white shirt", img: "/images/polka.webp", price: "40.00" },
    { id: 14, name: "Men's pink striped T-shirt", img: "/images/PINK.webp", price: "60.00" },
    { id: 15, name: "Long sleeved shirt", img: "/images/LONG-SHIRT.webp", price: "50.00" },
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
   
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-center mt-10 text-4xl font-serif font-extrabold leading-tight tracking-wide text-teal-700">
          TRENDING
        </h1>

        <div className="flex justify-center mt-2">
          <div className="h-1 w-24 bg-amber-500 rounded-full shadow-md"></div>
        </div>

    <div className="flex flex-wrap gap-8 justify-center p-2 mt-12 place-items-center">
  {trendingItems.map((item, i) => (
    <Card
      key={`${item.id}-${i}`}
      className="w-[280px] h-[450px] !bg-white group overflow-hidden shadow-lg rounded-3xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="overflow-hidden rounded-t-3xl h-[200px]">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 rounded-t-3xl"
        />
      </div>

      <div className=" flex flex-col justify-between py-4 gap-3">
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
  ))}
</div>

      </div>

     

  
    </>
  );
}

export default BoysComponent;
