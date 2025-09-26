import { useEffect, useState } from "react";
import supabase from "../../SupabaseClient";

const CartItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const { data, error } = await supabase
        .from("cart_items")
        .select("id, user_id, product_id, quantity, created_at");

      if (error) {
        console.error("Error fetching cart items", error);
      } else {
        setItems(data);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
      <table className="min-w-full bg-white shadow">
        <thead>
          <tr>
            <th className="p-2 text-left">User ID</th>
            <th className="p-2 text-left">Product ID</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Added On</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.user_id}</td>
              <td className="p-2">{item.product_id}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartItems;
