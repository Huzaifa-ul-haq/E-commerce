

import { useParams, useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../CardContext";
import { HiArrowLeft } from "react-icons/hi";

const productList = [
  { id: 1, name: "Rompar", img: "/images/kids.avif", price: "80.00", description: "Easy-to-wear romper with button closure and fun design." },
  { id: 2, name: "Baby Suit", img: "/images/kids01.webp", price: "60.00", description: "Cozy baby suit made from 100% organic cotton for sensitive skin." },
  { id: 3, name: "Baby Shirt", img: "/images/kids02.webp", price: "80.00", description: "Stylish baby shirt with snap buttons for easy wear." },
  { id: 4, name: "Baby Sweater", img: "/images/kids03.webp", price: "80.00", description: "Warm knitted sweater perfect for winter days." },
  { id: 5, name: "Summer Clothes", img: "/images/kids_04.jpg", price: "80.00", description: "Lightweight and colorful summer outfit for kids." },
  { id: 6, name: "Baby Boy Dress", img: "/images/kids05.avif", price: "80.00", description: "Cute dress for baby boys with cartoon prints." },
  { id: 7, name: "Baby Rompar", img: "/images/kids0.jpg", price: "80.00", description: "Soft and breathable romper for babies. Ideal for all seasons." },
  { id: 8, name: "Baby Dress", img: "/images/kids07.avif", price: "80.00", description: "Adorable baby dress with frills and soft fabric." },
  { id: 9, name: "Polo Shirt", img: "/images/polo.webp", price: "60.00", description: "Classic polo shirt made from premium cotton blend." },
  { id: 10, name: "Round Neck Men's T-shirt", img: "/images/round.webp", price: "20.00", description: "Basic round neck t-shirt for everyday casual look." },
  { id: 11, name: "Men T-shirt", img: "/images/Men.webp", price: "40.00", description: "Trendy men’s t-shirt with a slim fit design." },
  { id: 12, name: "Black T-shirt", img: "/images/black.webp", price: "90.00", description: "Timeless black t-shirt with breathable fabric." },
  { id: 13, name: "Yellow Striped Shirt", img: "/images/striped.webp", price: "80.00", description: "Bright yellow shirt with bold stripes and modern fit." },
  { id: 14, name: "Polka Dot White Shirt", img: "/images/polka.webp", price: "40.00", description: "Fun polka dot shirt perfect for casual outings." },
  { id: 15, name: "Men's Pink Striped T-shirt", img: "/images/PINK.webp", price: "60.00", description: "Fashion-forward striped t-shirt with a soft finish." },
  { id: 16, name: "Long Sleeved Shirt", img: "/images/LONG-SHIRT.webp", price: "50.00", description: "Versatile long sleeve shirt for formal and casual wear." },
  { id: 17, name: "Twisted Waist Shirt", img: "/images/girls-1.webp", price: "60.00", description: "Chic shirt for women with twisted waist design." },
  { id: 18, name: "Floral Shirt", img: "/images/girls-2.webp", price: "20.00", description: "Bright floral shirt to bring out your summer vibes." },
  { id: 19, name: "Collared Blouse", img: "/images/girls3.webp", price: "40.00", description: "Elegant collared blouse for everyday wear." },
  { id: 20, name: "Women`s Shirt", img: "/images/girls-4.webp", price: "90.00", description: "Trendy women’s shirt with premium detailing." },
  { id: 21, name: "Collar Shirt", img: "/images/girls-5.webp", price: "60.00", description: "Button-up shirt with classic collar and relaxed fit." },
  { id: 22, name: "Beauty Dress", img: "/images/shirt12.jpg", price: "70.00", description: "Graceful beauty dress perfect for parties and functions." },
  { id: 23, name: "Royal Blue Shirt", img: "/images/Royal Blue Shirt.webp", price: "50.00", description: "Royal blue shirt with minimal design and comfort." },
  { id: 24, name: "Wedding Frock", img: "/images/girls07.jpg", price: "80.00", description: "Elegant frock designed for weddings and formal events." }
];

export default function DetailComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = productList.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="pt-10 text-center text-red-600 text-xl font-semibold">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };
return (
  <div className="max-w-6xl mx-auto px-2 py-6 sm:px-4 sm:py-14 mt-16">
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-1 text-teal-600 hover:text-teal-800 font-medium tracking-wide mb-4 sm:mb-8 text-sm transition"
    >
      <HiArrowLeft className="text-lg sm:text-xl !cursor-pointer" />
      <span className="text-xs sm:text-sm uppercase cursor-pointer">Back to Shop</span>
    </button>

    {/* Product Details */}
    <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-12 md:items-start">
      {/* Image Section */}
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-[200px] sm:h-[300px] md:w-[45%] md:h-[400px] object-contain rounded-xl shadow-md bg-white border border-gray-200"
      />

      {/* Product Info */}
      <div className="flex-1 space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-snug">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center text-yellow-400 text-base sm:text-lg font-semibold">
          {"★".repeat(4)}
          <span className="text-xs sm:text-sm text-gray-500 ml-2">(89 verified reviews)</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-2xl sm:text-4xl font-bold text-teal-700 tracking-tight">
          ${product.price}
        </p>

        <button
          onClick={handleAddToCart}
          className="inline-block w-full md:w-auto px-6 py-2.5 sm:px-7 sm:py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-lg hover:from-teal-700 hover:to-cyan-700 shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

}

