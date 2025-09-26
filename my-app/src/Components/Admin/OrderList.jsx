import { useEffect, useState } from "react";
import supabase from "../../SupabaseClient";
import { Link } from "react-router";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        console.error("Error fetching orders:", error.message);
      } else {
        setOrders(data);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-cyan-50 to-teal-50 min-h-screen font-sans pt-20">
      <h2 className="text-4xl font-extrabold text-teal-700 mb-8 border-b-4 border-teal-400 pb-2 tracking-wide">
        Orders
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-teal-200 bg-white">
        <table className="min-w-full table-auto">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left font-semibold tracking-wider">Order ID</th>
              <th className="py-3 px-6 text-left font-semibold tracking-wider">User</th>
              <th className="py-3 px-6 text-left font-semibold tracking-wider">Status</th>
              <th className="py-3 px-6 text-left font-semibold tracking-wider">Total</th>
              <th className="py-3 px-6 text-left font-semibold tracking-wider">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500 font-medium">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-teal-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 text-gray-700 font-mono">{order.id}</td>
                  <td className="py-4 px-6 text-gray-800 font-semibold">{order.user_name || "N/A"}</td>
                  <td
                    className={`py-4 px-6 font-semibold ${
                      order.status === "completed"
                        ? "text-green-600"
                        : order.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">${order.total_amount?.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/admin/order/${order.id}`}
                      className="text-teal-600 hover:text-teal-800 font-semibold underline transition-colors duration-200"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
