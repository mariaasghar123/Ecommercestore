import React, { useState } from "react";
import { AiOutlineAppstore, AiOutlineDown } from "react-icons/ai";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { GiChickenOven, GiMilkCarton, GiBread } from "react-icons/gi";
import { FaCarrot, FaBaby, FaRegSnowflake, FaTooth } from "react-icons/fa";
import { LuCupSoda } from "react-icons/lu";
import { RiFirstAidKitLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Navbar2() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="w-full px-4 py-3 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left - All Categories */}
        <div className="relative z-40">
          <div
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center gap-2 border border-gray-300 p-2 rounded-lg hover:shadow-md transition"
          >
            <AiOutlineAppstore className="text-2xl" />
            <h3 className="text-base font-medium">All Categories</h3>
            <AiOutlineDown className="text-lg ml-2" />
          </div>

          {showDropdown && (
            <div className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg overflow-hidden">
              {[
                { icon: <FaCarrot />, label: "Fruits & Vegetables" },
                { icon: <GiChickenOven />, label: "Meats & Seafood" },
                { icon: <GiMilkCarton />, label: "Breakfast & Dairy" },
                { icon: <GiBread />, label: "Breads & Bakery" },
                { icon: <LuCupSoda />, label: "Beverages" },
                { icon: <FaRegSnowflake />, label: "Frozen Foods" },
                { icon: <IoFastFoodOutline />, label: "Biscuits & Snacks" },
                { icon: <MdOutlineLocalGroceryStore />, label: "Grocery & Staples" },
                { icon: <BsCart3 />, label: "Household Needs" },
                { icon: <RiFirstAidKitLine />, label: "Healthcare" },
                { icon: <FaBaby />, label: "Baby & Pregnancy" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer gap-2 text-sm"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Center - Navigation Links */}
        <div className="flex flex-wrap gap-4 items-center justify-start text-sm font-medium">
          {[
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Fruits & Vegetables", path: "/fruits" },
  { label: "Beverages", path: "/beverages" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
].map((item, idx) => (
  <Link
    key={idx}
    to={item.path}
    className="relative group text-black hover:text-purple-700 transition-colors duration-200 flex items-center"
  >
    {item.label}
    {(item.label === "Home" || item.label === "Shop") && (
      <AiOutlineDown className="text-sm ml-1" />
    )}
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
  </Link>
))}
        </div>

        {/* Right - Trending */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center text-sm font-medium text-black-800">
            <p>Trending Products</p>
            <AiOutlineDown className="text-sm ml-1" />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <p className="text-red-600 font-bold">Almost Finished</p>
            <button className="bg-red-600 px-3 py-1 text-white text-sm font-semibold rounded-md">
              Sale
            </button>
            <AiOutlineDown className="text-sm text-red-600" />
          </div>
        </div>
      </div>
    </nav>
  );
}
