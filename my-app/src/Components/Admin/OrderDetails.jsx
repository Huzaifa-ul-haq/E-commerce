// 


import { useEffect, useState } from "react";
import supabase from "../../SupabaseClient";
import { useParams, Link } from "react-router";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (orderError) {
        console.error("Error fetching order:", orderError);
        return;
      }
      setOrder(orderData);

      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

      if (itemsError) {
        console.error("Error fetching order items:", itemsError);
        return;
      }
      setItems(itemsData);
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading order details...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 mt-15 bg-white rounded-lg shadow-lg font-sans ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-700 mb-6 sm:mb-8 border-b-4 border-teal-400 pb-2 tracking-wide">
        Order Details - #{order.id}
      </h2>

      {/* User & Shipping Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-xl sm:text-2xl font-semibold text-teal-600 border-b border-teal-300 pb-1 sm:pb-2">
            Customer Information
          </h3>
          <p><span className="font-semibold">Name:</span> {order.user_name || "N/A"}</p>
          <p><span className="font-semibold">Email:</span> {order.email || "N/A"}</p>
          <p><span className="font-semibold">Phone:</span> {order.phone || "N/A"}</p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-xl sm:text-2xl font-semibold text-teal-600 border-b border-teal-300 pb-1 sm:pb-2">
            Shipping Address
          </h3>
          <p><span className="font-semibold">Address:</span> {order.address || "N/A"}</p>
          <p><span className="font-semibold">City:</span> {order.city || "N/A"}</p>
          <p><span className="font-semibold">Country:</span> {order.country || "N/A"}</p>
        </div>
      </div>

      {/* Order Status & Total */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-10 bg-teal-50 p-4 sm:p-5 rounded-lg shadow-sm">
        <p className="text-base sm:text-lg font-semibold">
          Status:{" "}
          <span className={`${order.status === "completed"
            ? "text-green-600"
            : order.status === "pending"
              ? "text-yellow-600"
              : "text-red-600"
            }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </p>
        <p className="text-lg sm:text-xl font-bold text-teal-700">
          Total: ${order.total_amount?.toFixed(2)}
        </p>
      </div>

      {/* Order Items */}
      <div className="overflow-x-auto">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-5 border-b border-teal-400 pb-1 sm:pb-2">
          Ordered Items
        </h3>
        {items.length === 0 ? (
          <p className="text-gray-500 italic">No items found for this order.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-sm rounded-lg text-sm sm:text-base">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="py-3 px-4 sm:px-6 text-left font-semibold">Product Name</th>
                <th className="py-3 px-4 sm:px-6 text-center font-semibold">Quantity</th>
                <th className="py-3 px-4 sm:px-6 text-right font-semibold">Price</th>
                <th className="py-3 px-4 sm:px-6 text-right font-semibold">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-teal-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4 sm:px-6">{item.product_name}</td>
                  <td className="py-3 px-4 sm:px-6 text-center">{item.quantity}</td>
                  <td className="py-3 px-4 sm:px-6 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-3 px-4 sm:px-6 text-right">${item.total_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link
        to="/admin/orders"
        className="inline-block mt-6 sm:mt-8 text-teal-600 hover:text-teal-800 font-semibold underline text-sm sm:text-base"
      >
        ← Back to Orders
      </Link>
    </div>
  );
};

export default OrderDetails;
