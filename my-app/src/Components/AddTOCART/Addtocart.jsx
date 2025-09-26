


import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useContext, useState } from "react";
import { FiShoppingCart, FiTrash } from "react-icons/fi";
import { CartContext } from "../../CardContext";
import supabase from "../../SupabaseClient";

export function AddCartComponent() {
  const { cartItems, handleAdd, handleRemove, handleDelete } = useContext(CartContext) || {};
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  const totalPrice = cartItems ? cartItems.reduce((sum, item) => sum + item.totalPrice, 0) : 0;

  const handleClose = () => setIsOpen(false);

  const handleAddWithDB = async (item) => {
  
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      console.error("User not logged in:", sessionError?.message);
      return;
    }

    const user = sessionData.session.user;
    
    
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", Number(item.id))
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error("Error checking existing item:", fetchError);
      return;
    }

    if (existingItem) {
    
      const newQuantity = existingItem.quantity + 1;
      const newTotalPrice = newQuantity * parseFloat(item.price.replace("$", ""));
      
      const { error } = await supabase
        .from("cart_items")
        .update({ 
          quantity: newQuantity,
          totalPrice: newTotalPrice
        })
        .eq("id", existingItem.id);

      if (error) {
        console.error("Supabase update error:", error);
        return;
      }
    } else {
      
      const priceValue = parseFloat(item.price.replace("$", ""));
      const { error } = await supabase.from("cart_items").insert([
        {
          user_id: user.id,
          product_id: item.id,
          name: item.name,
          price: priceValue,
          quantity: 1,
          totalPrice: priceValue,
          img: item.img || item.image || null,
        },
      ]);
      
      if (error) {
        console.error("Supabase insert error:", error);
        return;
      }
    }
    handleAdd(item.id);
  };
  const {  checkout } = useContext(CartContext) || {};

const handleCheckout = async () => {
  if (checkout) {
    await checkout();
  }
};

  const handleRemoveWithDB = async (itemId) => {
    
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) return;
    
    const user = sessionData.session.user;
    
    
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
       .eq("product_id", Number(itemId))
      .single();

    if (fetchError) {
      console.error("Error finding item:", fetchError);
      return;
    }

    if (existingItem) {
      if (existingItem.quantity === 1) {
        // Delete if quantity is 1
        await supabase
          .from("cart_items")
          .delete()
          .eq("id", existingItem.id);
      } else {
        // Update quantity
        const newQuantity = existingItem.quantity - 1;
        const newTotalPrice = newQuantity * existingItem.price;
        
        await supabase
          .from("cart_items")
          .update({ 
            quantity: newQuantity,
            totalPrice: newTotalPrice
          })
          .eq("id", existingItem.id);
      }
    }
    
    
    handleRemove(itemId);
  };

  const handleDeleteWithDB = async (itemId) => {
   
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) return;
    
    const user = sessionData.session.user;
    
   
    await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
    .eq("product_id", Number(itemId))
    
    handleDelete(itemId);
  };


  
  return (
    <>
      <div className="relative flex items-center justify-center">
        {totalItems > 0 && (
          <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-2 rounded-full select-none pointer-events-none shadow-lg">
            {totalItems}
          </span>
        )}
        <h1
          className="cursor-pointer text-3xl text-blue-600 hover:text-blue-800 transition-colors duration-300"
          onClick={() => setIsOpen(true)}
          aria-label="Open shopping cart"
        >
          <FiShoppingCart />
        </h1>
      </div>

      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="max-w-md w-full !bg-white text-gray-900 shadow-2xl rounded-l-3xl flex flex-col"
        style={{ height: "100vh" }}
      >
        <DrawerHeader className="px-6 pt-6 pb-4 border-b border-gray-300" title="Your Shopping Cart" />

        <DrawerItems className="flex-grow overflow-y-auto px-6 py-4 space-y-6 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          {!cartItems || cartItems.length === 0 ? (
            <p className="text-gray-400 italic text-center mt-20">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-start gap-5 bg-gray-100 rounded-xl p-4 shadow">
                <img
                  src={item.img || item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl border-2 border-blue-400 shadow-sm"
                  loading="lazy"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-blue-700">{item.name}</h3>
                    <button
                      onClick={() => handleDeleteWithDB(item.id)}
                      className="text-red-500 hover:bg-red-700 hover:text-white transition p-2.5 cursor-pointer rounded-full"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FiTrash size={18} />
                    </button>
                  </div>

                  <p className="text-gray-700 text-base font-medium mt-1">
                    <span className="text-blue-600">
                      ${item.price ? item.price.replace("$", "") : "0.00"}
                    </span>
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => handleRemoveWithDB(item.id)}
                      className="w-9 h-9 text-2xl pb-1 flex items-center justify-center rounded-full border border-blue-400 text-blue-600 hover:bg-blue-800 hover:text-white transition cursor-pointer"
                      aria-label={`Remove one ${item.name}`}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-800 w-10 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleAddWithDB(item)}
                      className="w-9 h-9 text-xl pb-1 flex items-center justify-center rounded-full border border-blue-400 text-blue-600 hover:bg-blue-800 hover:text-white transition cursor-pointer"
                      aria-label={`Add one more ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </DrawerItems>

{cartItems && cartItems.length > 0 && (
  <div className="px-6 py-4 border-t border-gray-300 bg-gray-50 rounded-b-3xl">
    <h3 className="text-xl font-bold text-blue-700 mb-4">
      Total Price: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
    </h3>
    
    
   
    
    <button
      onClick={handleCheckout}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
    >
      🛒 Checkout Now
      
    </button>
    
  </div>
)}
      </Drawer>
    </>
  );
}