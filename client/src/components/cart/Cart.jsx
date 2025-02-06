import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../cart/CartContext"; // Assuming CartContext is available
import { toast } from "react-toastify"; // Importing toast

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    removeAllItems,
  } = useContext(CartContext);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Calculate the total order price
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.totalPrice; // Assuming totalPrice is computed in cart
    });

    const savings = 0; // No savings for now
    const storePickup = 10; // Store pickup charges
    const tax = 0; // Placeholder for tax
    const grandTotal = total + storePickup + tax;

    return {
      total,
      savings,
      storePickup,
      tax,
      grandTotal,
    };
  };

  const { total, savings, storePickup, tax, grandTotal } = calculateTotal();

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty! Add items before placing an order.");
      return;
    }

    if (!phone.trim()) {
      toast.error("Phone number is required!");
      return;
    }

    if (!address.trim()) {
      toast.error("Address is required!");
      return;
    }

    const orderItems = cart.map((item) => ({
      product: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      totalPrice: item.price * item.quantity,
    }));

    const orderData = {
      items: orderItems,
      totalOrderPrice: grandTotal,
      phone,
      address,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        removeAllItems();
        setPhone("");
        setAddress("");
      } else {
        toast.error(`Unexpected response: ${response.statusText}`);
      }
    } catch (error) {
      let errorMessage = "Failed to place the order";

      if (error.response && error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = "Unauthorized. Please log in again.";
      }

      toast.error(`Error: ${errorMessage}`);
      console.error("Error placing the order:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-headings text-textPrimary mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 px-6 border-b border-border"
            >
              <div className="flex items-center">
                <img
                  className="w-16 h-16 object-cover rounded-md"
                  src={`http://localhost:8080/${item.image}`}
                  alt={item.name}
                />
                <div className="ml-4">
                  <p className="font-headings text-lg text-textPrimary">
                    {item.name}
                  </p>
                  <p className="text-sm text-textSecondary">
                    Price: ₹{item.price}
                  </p>
                  <p className="text-sm text-textSecondary">Unit: {item.unit}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => decreaseQuantity(item)}
                  className="px-2 py-1 bg-background text-textPrimary rounded-full"
                >
                  -
                </button>
                <span className="text-lg font-bold">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item)}
                  className="px-2 py-1 bg-background text-textPrimary rounded-full"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <h3 className="text-lg font-headings text-textPrimary mb-4">
              Contact Information
            </h3>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-border rounded-md mb-4"
            />
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-border rounded-md"
              rows="3"
            />
          </div>

          <div className="mt-6 bg-white shadow-card rounded-lg p-6">
            <h3 className="text-xl font-headings text-textPrimary mb-4">
              Order Summary
            </h3>
            <div className="flex justify-between py-2">
              <p className="text-textSecondary">Original Price:</p>
              <p className="font-semibold text-textPrimary">
                ₹{total.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-textSecondary">Savings:</p>
              <p className="font-semibold text-textPrimary">
                ₹{savings.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-textSecondary">Store Pickup:</p>
              <p className="font-semibold text-textPrimary">
                ₹{storePickup.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-textSecondary">Tax:</p>
              <p className="font-semibold text-textPrimary">
                ₹{tax.toFixed(2)}
              </p>
            </div>
            <div className="border-t pt-4 flex justify-between font-semibold text-lg text-textPrimary">
              <p>Total:</p>
              <p>₹{grandTotal.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={removeAllItems}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-2 bg-button text-white font-semibold rounded-lg hover:bg-buttonHover"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
