import React from "react";
import { Link, Links } from "react-router-dom";
import Navbar2 from "../navbar2/Navbar2";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../../context/Context"; // Importing the useCart hook to access cart items
  
export default function Navbar() {
  const { cartItems } = useCart();
    const navigate = useNavigate();
    const handleCartClick = () => {
    navigate('/cart');
  };
  return (
    <>
      {/* navbar top */}
<div className="bg-white border-b border-gray-300">
  <div className="flex flex-col md:flex-row justify-evenly items-center px-4 py-2 text-gray-800 gap-2 md:gap-0">
    
    {/* Left side */}
    <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-center">
      <p>About Us</p>
      <Link to="/login">My account</Link>
      <Link to="/Wishlist">Wishlist</Link>
      <p className="hidden md:block">|</p>
      <p className="text-center md:text-left">
        We deliver to you every day from{" "}
        <b className="text-orange-900">7:00 to 23:00</b>
      </p>
    </div>

    {/* Right side */}
    <div className="flex flex-col md:flex-row items-center gap-2">
      <p className="flex items-center gap-1">
        English
        <img src="/media/images/763.png" alt="arrow" className="w-3 h-3" />
      </p>
      <p className="flex items-center gap-1">
        USD
        <img src="/media/images/763.png" alt="arrow" className="w-3 h-3" />
      </p>
      <p className="flex items-center">Order Tracking</p>
    </div>
  </div>
</div>
      {/* logo */}
      <div className="bg-white border-b border-gray-300">
  <div className="max-w-[1280px] mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">

    {/* Left: Logo + Address */}
    <div className="flex items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
      <Link to="/">
       <img
        src="/media/images/Group 70@2x.png"
        alt="logo"
        className="h-10 object-contain"
      />
      </Link>
     
      <img
        src="/media/images/724.png"
        alt="address"
        className="w-8 h-8"
      />
      <div className="flex flex-col leading-tight text-sm">
        <span className="text-gray-800">Deliver to</span>
        <span className="text-black font-semibold">All</span>
      </div>
    </div>

    {/* Center: Search Bar */}
    <div className="w-full lg:w-[60%] relative">
      <input
        type="text"
        placeholder="Search for products, categories and brands..."
        className="w-full border border-gray-300 bg-gray-100 text-black rounded-md py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
    </div>

    {/* Right: User + Wishlist + Cart */}
    <div className="flex items-center gap-6 w-full lg:w-auto justify-center lg:justify-end">
      {/* Sign In */}
      <div className="flex items-center gap-2">
        <img src="/media/images/727.png" alt="user icon" className="w-7 h-7" />
        <div className="flex flex-col text-sm leading-tight">
          <span className="text-gray-800">Sign in</span>
          <span className="text-black font-semibold">Account</span>
        </div>
      </div>

      {/* Wishlist */}
      <Link to="/wishlist" className="relative cursor-pointer">
      <div className="relative">
        <img src="/media/images/728.png" alt="Wishlist" className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          0
        </span>
      </div>
      </Link>

      {/* Cart */}
      <div className="relative cursor-pointer" onClick={handleCartClick}>
        <img src="/media/images/730.png" alt="Cart" className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
           {cartItems.length}
        </span>
      </div>
    </div>
  </div>
  <Navbar2 />
</div>

    </>
  );
}
