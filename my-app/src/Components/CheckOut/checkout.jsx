import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../CardContext';
import { useNavigate } from 'react-router';

const CheckoutForm = () => {
  const { cartItems, checkout } = useContext(CartContext) || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate('/shop');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    if (checkout) {
      await checkout(formData);
      navigate('/shop');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-gray-50 shadow-md rounded-lg mt-22 mb-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 p-3 text-center">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md w-full"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md w-full"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md w-full"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md w-full"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md w-full"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-teal-600 cursor-pointer hover:bg-teal-700 text-white px-8 py-3 rounded-md text-lg font-semibold transition duration-300 "
          >
            Place Order
          </button>
        </div>
      </form>

    </div>
  );
};

export default CheckoutForm;
