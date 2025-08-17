import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const UserSidebar = ({ user }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar's visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Logout function
  const logout = () => {
    localStorage.clear('users');
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/userorder" },
    { name: "Account Details", href: "/account-detail" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Become an Admin", href: "/admin" },
  ];

  return (
    <>
      {/* Mobile Menu Button - Visible only on small screens */}
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

      <aside 
        className={`fixed top-0 left-0 w-64 min-h-screen bg-white border-r shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          sm:relative sm:translate-x-0 sm:shadow-sm sm:block`}
      >
        {/* Close button for mobile sidebar */}
        <button 
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-700 sm:hidden"
        >
          <AiOutlineClose className="text-2xl" />
        </button>

        <div className="flex items-center px-6 py-8 border-b">
          <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4a4 4 0 100 8 4 4 0 000-8zM4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2"
              />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Welcome back,</div>
            <div className="text-base font-semibold text-gray-900">
              {user?.email || "user@example.com"}
            </div>
          </div>
        </div>

        <nav className="mt-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={toggleSidebar} // Close sidebar on link click
              className="block px-6 py-2 text-gray-700 rounded hover:bg-gray-100 transition"
            >
              {item.name}
            </Link>
          ))}
          {/* Log Out button with a specific function */}
          <button
            onClick={() => {
              logout();
              toggleSidebar();
            }}
            className="block w-full text-left px-6 py-2 text-gray-700 rounded hover:bg-gray-100 transition"
          >
            Log Out
          </button>
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;
