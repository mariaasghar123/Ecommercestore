import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const AdminDashboardDetail = () => {
  const user = JSON.parse(localStorage.getItem("users"));

  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
    const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔸 Products
        const productsSnapshot = await getDocs(collection(fireDB, "products"));
        setProductCount(productsSnapshot.size);

        // 🔸 Users
        const usersSnapshot = await getDocs(collection(fireDB, "user"));
        setUserCount(usersSnapshot.size);

        // 🔸 Orders
        const ordersSnapshot = await getDocs(collection(fireDB, "orders"));
        setOrderCount(ordersSnapshot.size);

        // 🔸 Revenue
        let total = 0;
        ordersSnapshot.forEach(doc => {
          const data = doc.data();
          total += data.totalAmount || 0;
        });
        setRevenue(total);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-700 to-indigo-800 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:text-yellow-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-yellow-300 cursor-pointer">Users</li>
          <Link to="/admin/admin-dashboard/products">
            <li className="hover:text-yellow-300 cursor-pointer mt-2">Products</li>
          </Link>
          <Link to="/admin/admin-dashboard/orders">
            <li className="hover:text-yellow-300 cursor-pointer mt-2">Orders</li>
          </Link>
          <li className="hover:text-yellow-300 cursor-pointer">Settings</li>
           <Link onClick={logout}>
            <li className="hover:text-yellow-300 cursor-pointer mt-2">Log out</li>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Welcome */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, <span className="text-purple-600">{user?.name}</span> 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Manage your platform here</p>
        </div>

        {/* Dashboard Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
            <h3 className="text-gray-700 text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{userCount}</p>
          </div>

          {/* Products */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-pink-500">
            <h3 className="text-gray-700 text-lg font-semibold">Products</h3>
            <p className="text-3xl font-bold text-pink-600 mt-2">{productCount}</p>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-700 text-lg font-semibold">Orders</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{orderCount}</p>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-700 text-lg font-semibold">Revenue</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">${revenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardDetail;
