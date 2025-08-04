// pages/UserDashboard.jsx
import React from "react";
import UserSidebar from "./UserSidebar";
// import { useNavigate } from 'react-router-dom';

// const UserDashboard = () => {
//   const user = {
//     name: "Maria",
//     email: "maria@gmail.com",
//   };
const UserDashboard = () => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));
    

//   const handleBecomeAdmin = () => {
//     alert("Redirecting to Admin Registration Form...");
//     // Navigate to /admin form (replace with your router logic)
//     window.location.href = "/admin";
//   }; 
  return (
    <div className="flex">
      <UserSidebar user={user} />

      <div className="flex-1 p-8 bg-gradient-to-tr from-orange-50 to-gray-100 min-h-screen">
        {/* Welcome */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-orange-500">{user.name}</span>!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's a quick overview of your activity.
          </p>
        </div>

        {/* Dashboard Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Orders */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-orange-400">
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <p className="text-3xl font-bold text-orange-500 mt-2">12</p>
            <p className="text-sm text-gray-500 mt-1">Completed orders</p>
          </div>

          {/* Wishlist */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-pink-400">
            <h2 className="text-lg font-semibold text-gray-700">Wishlist</h2>
            <p className="text-3xl font-bold text-pink-500 mt-2">5</p>
            <p className="text-sm text-gray-500 mt-1">Saved items</p>
          </div>

          {/* Downloads */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-400">
            <h2 className="text-lg font-semibold text-gray-700">Downloads</h2>
            <p className="text-3xl font-bold text-blue-500 mt-2">3</p>
            <p className="text-sm text-gray-500 mt-1">Available files</p>
          </div>

          {/* Profile */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-400">
            <h2 className="text-lg font-semibold text-gray-700">Profile</h2>
            <p className="text-3xl font-bold text-green-500 mt-2">100%</p>
            <p className="text-sm text-gray-500 mt-1">Complete profile</p>
          </div>
        </div>

        {/* Become Admin Button */}
        {/* <div className="text-center">
          <button
            onClick={handleBecomeAdmin}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg shadow-md transition"
          >
            Become an Admin
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UserDashboard;
