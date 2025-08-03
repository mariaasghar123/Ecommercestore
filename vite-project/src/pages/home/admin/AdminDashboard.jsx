import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-64 ml-10 min-h-screen bg-white border-r">
    <div className="flex items-center px-6 py-8">
      <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center mr-4">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a4 4 0 100 8 4 4 0 000-8zM4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2"/>
        </svg>
      </div>
      <div>
        <div className="text-sm text-gray-500">Welcome back,</div>
        <div className="text-base font-semibold text-gray-900">name@gmail.com</div>
      </div>
    </div>
    <nav className="mt-4 space-y-2">
      {['Dashboard', 'Orders', 'Downloads', 'Addresses', 'Account details', 'Wishlist', 'Compare', 'Log out'].map(item => (
        <a
          key={item}
          href="#"
          className="block px-6 py-2 rounded hover:bg-gray-100 transition"
        >
          {item}
        </a>
      ))}
    </nav>
  </aside>
);

const VendorForm = () => (
  <form className="w-full max-w-4xl mx-auto p-4" onSubmit={e => e.preventDefault()}>
    <h2 className="text-xl font-semibold mb-6">Update account to Vendor</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="firstName">First Name *</label>
        <input id="firstName" className="w-full border border-gray-500 rounded px-3 py-2" placeholder="" />
      </div>
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="lastName">Last Name *</label>
        <input id="lastName" className="w-full border border-gray-500 rounded px-3 py-2" placeholder="" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-gray-700 mb-1" htmlFor="shopName">Shop Name *</label>
        <input id="shopName" className="w-full border border-gray-500 rounded px-3 py-2" placeholder="" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-gray-700 mb-1" htmlFor="shopUrl">Shop URL *</label>
        <input id="shopUrl" className="w-full border border-gray-500 rounded px-3 py-2" value="shawonetc42fdgf@gmail.com" readOnly />
        <div className="text-sm text-gray-500 mt-1">https://klbtheme.com/grogin/store/</div>
      </div>
      <div className="md:col-span-2">
        <label className="block text-gray-700 mb-1" htmlFor="phone">Phone Number*</label>
        <input id="phone" className="w-full border border-gray-500 rounded px-3 py-2" placeholder="" />
      </div>
      <div className="md:col-span-2 flex items-center mt-2">
        <input id="terms" type="checkbox" className="mr-2 border border-gray-500 rounded" />
        <label htmlFor="terms" className="text-gray-700">
          I have read and agree to the <span className="text-blue-600 underline cursor-pointer">Terms & Conditions.</span>
        </label>
      </div>
      <div className="md:col-span-2">
        <Link to="/admin/admin-dashboard">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Become a Vendor
        </button>
        </Link>
      </div>
    </div>
  </form>
);

export default function UpdateVendor() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 px-10 py-12">
        <VendorForm />
      </main>
    </div>
  );
}
