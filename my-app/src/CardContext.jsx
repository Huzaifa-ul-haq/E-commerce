

import React, { createContext, useState, useEffect } from "react";
import supabase from "./SupabaseClient";
import Toast from "./Components/Toast/toast";






export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  
  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session ? data.session.user : null;
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      setIsLoading(true);
      const user = await checkAuth();
      if (!user) {
        setCartItems([]);
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error loading cart items:", error);
        showToast("Error loading cart", "error");
        return;
      }

      if (data) {
        const formattedItems = data.map(item => ({
          id: item.product_id, 
          name: item.name,
          price: `$${item.price}`,
          quantity: item.quantity,
          totalPrice: item.totalPrice || item.price * item.quantity,
          image: item.img || null
        }));
        setCartItems(formattedItems);
      }
    } catch (error) {
      console.error("Unexpected error loading cart:", error);
    } finally {
      setIsLoading(false);
    }
  };






const addToCart = async (product) => {
  const user = await checkAuth();
  if (!user) {
    showToast("Please login first", "error");
    return;
  }

  setCartItems(prevItems => {
    const existingItem = prevItems.find(item => item.id === product.id);
    if (existingItem) {
      return prevItems.map(item =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: (item.quantity + 1) * parseFloat(product.price.replace("$", ""))
            }
          : item
      );
    } else {
      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
          totalPrice: parseFloat(product.price.replace("$", ""))
        }
      ];
    }
  });

  showToast("Item added to cart 🛒", "success");


  setTimeout(async () => {

    try {
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", Number(product.id))
        .maybeSingle();

      if (existingItem) {
        await supabase
          .from("cart_items")
          .update({
            quantity: existingItem.quantity + 1,
            totalPrice: (existingItem.quantity + 1) * existingItem.price
          })
          .eq("id", existingItem.id);
      } else {
        await supabase.from("cart_items").insert([{
          user_id: user.id,
          product_id: Number(product.id),
          name: product.name,
          price: parseFloat(product.price.replace("$", "")),
          quantity: 1,
          totalPrice: parseFloat(product.price.replace("$", "")),
          img: product.image || product.img || null
        }]);
      }
    } catch (error) {
      console.error("Sync error:", error.message);
      
      setCartItems(prevItems => 
        prevItems.filter(item => item.id !== product.id)
      );
      showToast("Failed to save item ", "error");
    }
  }, 0);
};


const handleAdd = async (productId) => {
  const user = await checkAuth();
  if (!user) {
    showToast("Please login first", "error");
    return;
  }

  const item = cartItems.find((item) => item.id === productId);
  if (!item) return;

  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.quantity + 1) * parseFloat(item.price.replace("$", "")),
          }
        : item
    )
  );

  try {
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", Number(productId))
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error finding item:", fetchError);
      return;
    }

    if (existingItem) {
      const newQuantity = existingItem.quantity + 0; 
      const newTotalPrice =
        newQuantity * parseFloat(item.price.replace("$", ""));

      const { error } = await supabase
        .from("cart_items")
        .update({
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        })
        .eq("id", existingItem.id);

      if (error) {
        console.error("Supabase update error:", error);
      }
    } else {
      const priceValue = parseFloat(item.price.replace("$", ""));
      const { error } = await supabase.from("cart_items").insert([
        {
          user_id: user.id,
          product_id: Number(productId),
          name: item.name,
          price: priceValue,
          quantity: 1,
          totalPrice: priceValue,
          img: item.img || item.image || null,
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
      }
    }
  } catch (error) {
    console.error("Unexpected error in handleAdd:", error);
  }
};


const handleRemove = async (productId) => {
  const user = await checkAuth();
  if (!user) {
    showToast("Please login first", "error"); 
    return;
  }

  const item = cartItems.find((item) => item.id === productId);
 
  const newQuantity = item.quantity - 1;

  if (newQuantity > 0) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: newQuantity * parseFloat(item.price.replace("$", "")),
            }
          : item
      )
    );
    
  } else {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
   
  }
  try {
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", Number(productId))
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching item:", fetchError);
      return;
    }

    if (!existingItem) return;

    if (newQuantity > 0) {
      const newTotalPrice = newQuantity * parseFloat(item.price.replace("$", ""));
      const { error } = await supabase
        .from("cart_items")
        .update({
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        })
        .eq("id", existingItem.id);

      if (error) {
        console.error("Supabase update error:", error);
      }
    } else {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", existingItem.id);

      if (error) {
        console.error("Supabase delete error:", error);
      }
    }
  } catch (error) {
    console.error("Unexpected error in handleRemove:", error);
  }
};


const handleDelete = async (productId) => {
  const user = await checkAuth();
  if (!user) {
    showToast("Please login first", "error");
    return;
  }

  setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  showToast("Item removed", "success");

  try {
    
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", Number(productId));

    if (error) {
      console.error("Supabase delete error:", error);
    }
  } catch (error) {
    console.error("Unexpected error in handleDelete:", error);
  }
};


  const clearCart = async () => {
    const user = await checkAuth();
    if (!user) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      if (error) {
        console.error("Error clearing cart:", error);
        return;
      }

      setCartItems([]);
      showToast("Cart cleared", "info");
    } catch (error) {
      console.error("Unexpected error clearing cart:", error);
    }
  };


  const checkout = async () => {
  const user = await checkAuth();
  if (!user) {
    showToast("Please login to checkout", "error");
    return;
  }
  const itemsToOrder = [...cartItems]; 
  setCartItems([]);
  showToast(`Your order is being placed...`, "success");

  try {
    const totalPrice = itemsToOrder.reduce((sum, item) => sum + item.totalPrice, 0);   
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          user_name: user.user_metadata?.full_name || "Guest",
          total_amount: totalPrice,
          status: "completed",
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      return;
    }
    for (const item of itemsToOrder) {
      const { error: itemError } = await supabase.from("order_items").insert([
        {
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          price: parseFloat(item.price.replace("$", "")),
          quantity: item.quantity,
          total_price: item.totalPrice,
        },
      ]);
      if (itemError) {
        console.error("Order item error:", itemError);
    
      }
    }
    const { error: deleteError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Cart clear error:", deleteError);
    }
  } catch (error) {
    console.error("Checkout error:", error);
  
  }
};





  return (
    <CartContext.Provider
      value={{ 
        cartItems , 
        addToCart, 
        handleAdd, 
        handleRemove, 
        handleDelete, 
        clearCart,
        setCartItems,
        checkout,
        

        
        isLoading
      }}
    >
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </CartContext.Provider>
  );
};






