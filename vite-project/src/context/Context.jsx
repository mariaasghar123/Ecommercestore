import React, { createContext, useState, useContext } from 'react';

// 1. Create Context
const CartContext = createContext();

// 2. Custom hook for using cart
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

// 3. CartProvider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 4. Add to Cart with Quantity Logic
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Product already in cart -> increase quantity
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      // New product -> add with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // 5. Remove item from cart (optional)
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // 6. Update item quantity manually (optional)
  const updateQuantity = (productId, newQty) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
  };

  // 7. Clear entire cart (optional)
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
