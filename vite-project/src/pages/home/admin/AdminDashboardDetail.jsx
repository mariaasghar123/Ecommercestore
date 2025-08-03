// pages/AdminDashboard.jsx
import React from "react";

const AdminDashboardDetail = () => {
  const admin = {
    name: "Admin Maria",
    email: "admin@maria.com",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-700 to-indigo-800 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:text-yellow-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-yellow-300 cursor-pointer">Users</li>
          <li className="hover:text-yellow-300 cursor-pointer">Products</li>
          <li className="hover:text-yellow-300 cursor-pointer">Orders</li>
          <li className="hover:text-yellow-300 cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Welcome */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, <span className="text-purple-600">{admin.name}</span> 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Manage your platform here</p>
        </div>

        {/* Dashboard Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
            <h3 className="text-gray-700 text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">320</p>
          </div>

          {/* Products */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-pink-500">
            <h3 className="text-gray-700 text-lg font-semibold">Products</h3>
            <p className="text-3xl font-bold text-pink-600 mt-2">88</p>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-700 text-lg font-semibold">Orders</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">542</p>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-700 text-lg font-semibold">Revenue</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">$12.4K</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardDetail;
