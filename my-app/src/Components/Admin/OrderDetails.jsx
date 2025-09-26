import { useEffect, useState } from "react";
import { useParams } from "react-router";
import supabase from "../../SupabaseClient";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();

      if (error) {
        console.log("Error fetching order:", error);
      } else {
        setOrder(data);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-teal-600 font-semibold text-lg">
        Loading...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto pt-30  my-12 p-8 bg-white rounded-xl shadow-lg font-sans text-gray-800">
      <h2 className="text-3xl font-extrabold mb-6 text-teal-700 tracking-wide border-b-4 border-teal-400 pb-2">
        Order Details
      </h2>

      <div className="space-y-4 text-lg">
        <p>
          <span className="font-semibold text-teal-600">User:</span>{" "}
          <span className="font-mono">{order.user_name || "N/A"}</span>
        </p>
        <p>
          <span className="font-semibold text-teal-600">Status:</span>{" "}
          <span
            className={`font-semibold ${
              order.status === "completed"
                ? "text-green-600"
                : order.status === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {order.status}
          </span>
        </p>
        <p>
          <span className="font-semibold text-teal-600">Total Amount:</span>{" "}
          <span className="font-mono">${order.total_amount?.toFixed(2)}</span>
        </p>
        <p>
          <span className="font-semibold text-teal-600">Order ID:</span>{" "}
          <span className="font-mono">{order.id}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
