import React, { createContext, useState, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add a product to the cart
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.name === product.name);

    if (existingProductIndex === -1) {
      // Add new product to the cart
      setCart([...cart, { ...product, quantity: 1, totalPrice: product.price }]);
    } else {
      // Update existing product's quantity and total price
      setCart((prevCart) =>
        prevCart.map((item, index) =>
          index === existingProductIndex
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.price,
              }
            : item
        )
      );
    }
  };

  // Increase the quantity of a product in the cart
  const increaseQuantity = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === product.name
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: (item.quantity + 1) * item.price,
            }
          : item
      )
    );
  };

  // Decrease the quantity of a product in the cart
  const decreaseQuantity = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === product.name && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: (item.quantity - 1) * item.price,
            }
          : item
      )
    );
  };

  // Remove a product from the cart
  const removeItem = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== product.name));
  };

  // Remove all items from the cart
  const removeAllItems = () => {
    setCart([]);
  };

  // Calculate total quantity of items in the cart
  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  // Calculate total price of items in the cart
  const totalCartPrice = useMemo(() => cart.reduce((total, item) => total + item.totalPrice, 0), [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalCartPrice,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        removeAllItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
