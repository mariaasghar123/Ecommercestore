import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const AdminDashboardDetail = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();

  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility on small screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsSnapshot = await getDocs(collection(fireDB, "products"));
        setProductCount(productsSnapshot.size);

        // Fetch users
        const usersSnapshot = await getDocs(collection(fireDB, "user"));
        setUserCount(usersSnapshot.size);

        // Fetch orders and calculate revenue
        const ordersSnapshot = await getDocs(collection(fireDB, "orders"));
        setOrderCount(ordersSnapshot.size);
        let total = 0;
        ordersSnapshot.forEach((doc) => {
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

  // Logout function
  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-100">
      {/* Mobile Menu Button - visible only on small screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 text-gray-700 bg-white rounded-lg shadow-md sm:hidden"
      >
        <AiOutlineMenu className="text-2xl" />
      </button>

      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"
        ></div>
      )}

      {/* Sidebar - responsive to screen size */}
      <aside
        className={`fixed top-0 left-0 w-64 min-h-screen bg-gradient-to-b from-purple-700 to-indigo-800 text-white p-6 shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          sm:relative sm:translate-x-0 sm:shadow-sm sm:block`}
      >
        {/* Close button for mobile sidebar */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white sm:hidden"
        >
          <AiOutlineClose className="text-2xl" />
        </button>

        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/admin-dashboard"
              className="block hover:text-yellow-300 transition"
              onClick={toggleSidebar}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/admin-dashboard/alluseraccounts"
              className="block hover:text-yellow-300 transition"
              onClick={toggleSidebar}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/admin-dashboard/products"
              className="block hover:text-yellow-300 transition"
              onClick={toggleSidebar}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/admin-dashboard/orders"
              className="block hover:text-yellow-300 transition"
              onClick={toggleSidebar}
            >
              Orders
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                logout();
                toggleSidebar();
              }}
              className="block w-full text-left hover:text-yellow-300 transition"
            >
              Log out
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8">
        <div className="text-center mb-10 mt-10 sm:mt-0">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            Welcome, <span className="text-purple-600">{user?.name}</span> 👋
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-lg">
            Manage your platform here
          </p>
        </div>

        {/* Dashboard Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/admin/admin-dashboard/alluseraccounts">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-gray-700 text-lg font-semibold">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {userCount}
              </p>
            </div>
          </Link>
          <Link to="/admin/admin-dashboard/products">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-pink-500">
              <h3 className="text-gray-700 text-lg font-semibold">Products</h3>
              <p className="text-3xl font-bold text-pink-600 mt-2">
                {productCount}
              </p>
            </div>
          </Link>
          <Link to="/admin/admin-dashboard/orders">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
              <h3 className="text-gray-700 text-lg font-semibold">Orders</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {orderCount}
              </p>
            </div>
          </Link>
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-700 text-lg font-semibold">Revenue</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ${revenue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardDetail;
