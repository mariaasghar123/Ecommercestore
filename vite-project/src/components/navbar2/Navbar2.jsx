import React, { useState } from "react";
import { AiOutlineAppstore, AiOutlineDown, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { GiChickenOven, GiMilkCarton, GiBread } from "react-icons/gi";
import { FaCarrot, FaBaby, FaRegSnowflake } from "react-icons/fa";
import { LuCupSoda } from "react-icons/lu";
import { RiFirstAidKitLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar2() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Categories with their Firebase names
  const categories = [
    { 
      icon: <FaCarrot />, 
      label: "Fruits & Vegetables", 
      firebaseName: "fruits-vegetables" 
    },
    { 
      icon: <GiChickenOven />, 
      label: "Meats & Seafood", 
      firebaseName: "meats-seafood" 
    },
    { 
      icon: <GiMilkCarton />, 
      label: "Breakfast & Dairy", 
      firebaseName: "breakfast-dairy" 
    },
    { 
      icon: <GiBread />, 
      label: "Breads & Bakery", 
      firebaseName: "Breads & Bakery" 
    },
    { 
      icon: <LuCupSoda />, 
      label: "Beverages", 
      firebaseName: "Beverages" 
    },
    { 
      icon: <FaRegSnowflake />, 
      label: "Frozen Foods", 
      firebaseName: "Frozen Foods" 
    },
    { 
      icon: <IoFastFoodOutline />, 
      label: "Biscuits & Snacks", 
      firebaseName: "Biscuits & Snacks" 
    },
    { 
      icon: <MdOutlineLocalGroceryStore />, 
      label: "Grocery & Staples", 
      firebaseName: "Grocery & Staples" 
    },
    { 
      icon: <BsCart3 />, 
      label: "Household Needs", 
      firebaseName: "Household Needs" 
    },
    { 
      icon: <RiFirstAidKitLine />, 
      label: "Healthcare", 
      firebaseName: "Healthcare" 
    },
    { 
      icon: <FaBaby />, 
      label: "Baby & Pregnancy", 
      firebaseName: "Baby & Pregnancy" 
    },
  ];

  // Category click handler
  const handleCategoryClick = (category) => {
    setShowDropdown(false); 
    navigate(`/category/${category.firebaseName}`);
  };

  return (
    <nav className="w-full bg-white px-4 py-3 relative border-b border-gray-300">
      <div className="container mx-auto flex flex-col lg:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left Section: All Categories Dropdown and Mobile Menu Button */}
        <div className="relative z-40 w-full md:w-auto flex items-center justify-between md:justify-start">
          <div
             onClick={toggleDropdown}
            // onMouseEnter={() => setShowDropdown(true)}
            // onMouseLeave={() => setShowDropdown(false)}
            className="cursor-pointer flex items-center justify-between md:justify-start gap-2 border border-gray-300 p-3 rounded-lg hover:shadow-md transition bg-gray-100 md:bg-white w-full md:w-auto"
          >
            <div className="flex items-center gap-2">
              <AiOutlineAppstore className="text-2xl" />
              <h3 className="text-base font-medium whitespace-nowrap">All Categories</h3>
            </div>
            <AiOutlineDown className={`text-lg transition-transform duration-300 ${showDropdown ? 'rotate-180' : 'rotate-0'}`} />
          </div>

          <button 
            onClick={toggleMobileMenu}
            className="md:hidden ml-4 p-2 border border-gray-300 rounded-lg hover:shadow-md transition"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose className="text-2xl" />
            ) : (
              <AiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Center Section: Navigation Links */}
        <div 
          className={`
            ${isMobileMenuOpen ? 'flex' : 'hidden'} 
            md:flex 
            flex-col md:flex-row
            items-start md:items-center
            justify-start md:justify-center
            text-sm font-medium
            gap-x-6 gap-y-4
            w-full md:w-auto
            mt-2 md:mt-0
            p-4 md:p-0
            bg-white md:bg-transparent
            border md:border-0
            rounded-lg md:rounded-none
            shadow-lg md:shadow-none
          `}
        >
          {[
            { label: "Home", path: "/" },
            { label: "Shop", path: "/shop" },
            { label: "Fruits & Vegetables", path: "/category/fruits & vegetables", firebaseName: "fruits & vegetables" },
            { label: "Beverages", path: "/category/Beverages", firebaseName: "Beverages"},
            { label: "Blog", path: "/blog" },
            { label: "Contact", path: "/contact" },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="relative group text-black hover:text-purple-700 transition-colors duration-200 flex items-center whitespace-nowrap"
            >
              {item.label}
              {(item.label === "Home" || item.label === "Shop") && (
                <AiOutlineDown className="text-sm ml-1" />
              )}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Section: Trending Products */}
        <div className={`${isMobileMenuOpen ? 'hidden' : 'flex'} w-full md:w-auto flex lg:flex-col xl:flex-row items-start sm:items-center gap-3 md:gap-4 md:justify-end`}>
          <div className="flex items-center text-sm font-medium text-black-800">
            <p>Trending Products</p>
            <AiOutlineDown className="text-sm ml-1" />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <p className="text-red-600 font-bold whitespace-nowrap">Almost Finished</p>
            <button className="bg-red-600 px-3 py-1 text-white text-sm font-semibold rounded-md">
              Sale
            </button>
            <AiOutlineDown className="text-sm text-red-600" />
          </div>
        </div>
      </div>

      {/* Categories Dropdown */}
      {showDropdown && (
        <div className="absolute z-40 mt-2 w-full md:w-64 bg-white border rounded-lg shadow-lg overflow-hidden">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(item)}
              className="flex items-center px-4 py-3 hover:bg-purple-50 hover:text-purple-700 cursor-pointer gap-2 text-sm transition-colors duration-200 group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="group-hover:font-medium transition-all duration-200">
                {item.label}
              </span>
              <AiOutlineDown className="text-xs ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}