import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useCart } from "../../context/Context";
import Navbar2 from "../navbar2/Navbar2";
import { Country } from "country-state-city";
import _ from "lodash";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false); // <-- ADD
  const [selectedCountry, setSelectedCountry] = useState("All"); // <-- ADD
  const navigate = useNavigate();
  const { cartItems, wishlistItems } = useCart();
  const user = JSON.parse(localStorage.getItem("users"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchSearchResults = async (text) => {
    if (text.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const productsRef = collection(fireDB, "products");
      const snapshot = await getDocs(productsRef);

      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filtered = allProducts.filter(
        (item) =>
          item.title?.toLowerCase().includes(text.toLowerCase()) ||
          item.name?.toLowerCase().includes(text.toLowerCase())
      );

      setSearchResults(filtered);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const debouncedSearch = useCallback(
    _.debounce((text) => fetchSearchResults(text), 500),
    []
  );

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchTerm(text);
    debouncedSearch(text);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-300">
        <div className="container mx-auto px-4 py-2 flex flex-wrap justify-center md:justify-between items-center text-gray-800 text-sm gap-2">
          {/* Left Side Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1">
            <Link to="/about">About Us</Link>
            {!user && <Link to={"/register"}>Signup</Link>}
            {!user && <Link to={"/login"}>Login</Link>}

            {/* {user?.role === "user" && <Link to={"/user-dashboard"}>User</Link>} */}
            {/* {user?.role === "admin" && (
              <Link to={"/admin/admin-dashboard"}>Admin</Link>
            )} */}

            {/* {user && (
              <Link
                to={
                  user.role === "admin"
                    ? "/admin/admin-dashboard"
                    : "/user-dashboard"
                }
                className="font-medium"
              >
                My Account
              </Link>
            )} */}

            {user && (
              <div className="cursor-pointer" onClick={logout}>
                Logout
              </div>
            )}

            <Link to="/wishlist">Wishlist</Link>
            <p className="hidden lg:block text-gray-400">|</p>
            <p className="text-center">
              We deliver to you from{" "}
              <b className="text-orange-900">7:00 to 23:00</b>
            </p>
          </div>

          {/* Right Side Info */}
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              English
              <img
                src="/media/images/763.png"
                alt="arrow"
                className="w-3 h-3"
              />
            </p>
            <p className="flex items-center gap-1">
              USD
              <img
                src="/media/images/763.png"
                alt="arrow"
                className="w-3 h-3"
              />
            </p>
            <p className="hidden md:flex items-center">Order Tracking</p>
          </div>
        </div>
      </div>

      {/* Logo, Search, and Cart */}
      <div className="bg-white border-b border-gray-300">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Address */}
          <div className="flex items-center gap-4 w-full lg:w-auto justify-center md:justify-start">
            <Link to="/">
              <img
                src="/media/images/Group 70@2x.png"
                alt="logo"
                className="h-10 object-contain"
              />
            </Link>

            {/* Address Icon with Country Dropdown */}
            <div
              className="hidden sm:flex items-center gap-2 cursor-pointer relative"
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
            >
              <img
                src="/media/images/724.png"
                alt="address"
                className="w-7 h-7"
              />
              <div className="flex flex-col leading-tight text-sm">
                <span className="text-gray-800">Deliver to</span>
                <span className="text-black font-semibold">
                  {selectedCountry}
                </span>
              </div>

              {/* Dropdown */}
              {countryDropdownOpen && (
                <div className="absolute top-10 left-0 bg-white shadow-lg border rounded-md w-60 max-h-60 overflow-y-auto z-50">
                  {Country.getAllCountries().map((country) => (
                    <div
                      key={country.isoCode}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSelectedCountry(country.name);
                        setCountryDropdownOpen(false);
                      }}
                    >
                      {country.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-2/4  max-w-2xl relative">
            <input
              type="text"
              placeholder="Search for products, categories and brands..."
              className="w-full border border-gray-300 bg-gray-100 text-black rounded-md py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={handleSearchChange}
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

            {searchTerm && searchResults.length > 0 && (
              <div className="absolute z-50 bg-white w-full mt-1 shadow-lg rounded-md max-h-60 overflow-y-auto border border-gray-200">
                {searchResults.map((item) => (
                  <Link
                    to={`/all-products/${item.id}`}
                    key={item.id}
                    onClick={() => {
                      setSearchTerm("");
                      setSearchResults([]);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-black"
                  >
                    {item.name || item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6 w-full lg:w-auto justify-center md:justify-end">
            {/* Sign In */}
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                // If user is signed in
                <Link
                  to={
                    user.role === "admin"
                      ? "/admin/admin-dashboard"
                      : "/user-dashboard"
                  }
                  className="flex items-center gap-2"
                >
                  <img
                    src="/media/images/727.png"
                    alt="user icon"
                    className="w-7 h-7"
                  />
                  <div className="flex flex-col text-sm leading-tight">
                    <span className="text-gray-800">Welcome</span>
                    <span className="text-black font-semibold">
                      {user.role === "admin"
                        ? "Admin Dashboard"
                        : "My Dashboard"}
                    </span>
                  </div>
                </Link>
              ) : (
                // If user is NOT signed in
                <Link to="/login" className="flex items-center gap-2">
                  <img
                    src="/media/images/727.png"
                    alt="user icon"
                    className="w-7 h-7"
                  />
                  <div className="flex flex-col text-sm leading-tight">
                    <span className="text-gray-800">Sign in</span>
                    <span className="text-black font-semibold">Account</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative cursor-pointer">
              <div className="relative">
                <img
                  src="/media/images/728.png"
                  alt="Wishlist"
                  className="w-6 h-6"
                />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
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
