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
    <div className="max-w-5xl mx-auto p-8 mt-12 bg-white rounded-lg shadow-lg font-sans">
      <h2 className="text-4xl font-extrabold text-teal-700 mb-8 border-b-4 border-teal-400 pb-3 tracking-wide">
        Order Details - #{order.id}
      </h2>

      {/* User & Shipping Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-teal-600 border-b border-teal-300 pb-2">
            Customer Information
          </h3>
          <p>
            <span className="font-semibold">Name:</span> {order.user_name || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {order.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {order.phone || "N/A"}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-teal-600 border-b border-teal-300 pb-2">
            Shipping Address
          </h3>
          <p>
            <span className="font-semibold">Address:</span> {order.address || "N/A"}
          </p>
          <p>
            <span className="font-semibold">City:</span> {order.city || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Country:</span> {order.country || "N/A"}
          </p>
        </div>
      </div>

      {/* Order Status & Total */}
      <div className="flex justify-between items-center mb-10 bg-teal-50 p-5 rounded-lg shadow-sm">
        <p className="text-lg font-semibold">
          Status:{" "}
          <span
            className={`${order.status === "completed"
                ? "text-green-600"
                : order.status === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </p>
        <p className="text-xl font-bold text-teal-700">
          Total: ${order.total_amount?.toFixed(2)}
        </p>
      </div>

      {/* Order Items */}
      <div>
        <h3 className="text-3xl font-semibold mb-5 border-b border-teal-400 pb-2">
          Ordered Items
        </h3>
        {items.length === 0 ? (
          <p className="text-gray-500 italic">No items found for this order.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-sm rounded-lg">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="py-3 px-6 text-left font-semibold">Product Name</th>
                <th className="py-3 px-6 text-center font-semibold">Quantity</th>
                <th className="py-3 px-6 text-right font-semibold">Price</th>
                <th className="py-3 px-6 text-right font-semibold">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-teal-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">{item.product_name}</td>
                  <td className="py-4 px-6 text-center">{item.quantity}</td>
                  <td className="py-4 px-6 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right">${item.total_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link
        to="/admin/orders"
        className="inline-block mt-8 text-teal-600 hover:text-teal-800 font-semibold underline"
      >
        ← Back to Orders
      </Link>
    </div>
  );
};

export default OrderDetails;
