import React from "react";
import { BsCart4 } from "react-icons/bs";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/Context";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity } = useCart(); // 👈 include updateQuantity

  // 🧮 Total Amount
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // 🛒 If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-center space-y-4">
        <BsCart4 size={80} className="text-gray-black" />
        <p className="border p-5 text-red-700 font-bold text-lg">
          Your Cart is Currently Empty
        </p>
        <Link to="/">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  // 🛍 Cart Items List
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.map((item, index) => (
        <div
          key={index}
          className="border p-4 mb-2 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <img
              src={item.productImageUrl}
              alt={item.title}
              className="w-16 h-16 object-cover"
            />
            <div>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-600">
                ${Number(item.price).toFixed(2)} x {item.quantity} ={" "}
                <span className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </p>
              {/* ➕➖ Quantity Buttons */}
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <span className="font-bold">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}

      {/* 💳 Total & Checkout */}
      <div className="mt-6 text-right space-y-2">
        <p className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-800"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
        <button
          className="bg-gray-300 text-black px-6 py-2 ml-5 rounded hover:bg-gray-400"
          onClick={() => navigate("/shop")}
        >
          Back to Shopping
        </button>
      </div>
    </div>
  );
}
