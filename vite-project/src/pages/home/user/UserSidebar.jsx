// components/UserSidebar.jsx
import React from "react";

const UserSidebar = ({ user }) => {
  const navItems = [
    { name: "Dashboard", href: "#" },
    { name: "Orders", href: "#" },
    { name: "Downloads", href: "#" },
    { name: "Addresses", href: "#" },
    { name: "Account Details", href: "#" },
    { name: "Wishlist", href: "#" },
    { name: "Compare", href: "#" },
    { name: "Log Out", href: "#" },
  ];

  return (
    <aside className="w-full sm:w-64 min-h-screen bg-white border-r shadow-sm">
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
          <a
            key={item.name}
            href={item.href}
            className="block px-6 py-2 text-gray-700 rounded hover:bg-gray-100 transition"
          >
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default UserSidebar;
