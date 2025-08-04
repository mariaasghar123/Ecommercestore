import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";


export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 px-6 py-10 text-sm">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 border-b border-gray-300 pb-6">
          <div className="text-center md:text-left">
            <p className="font-semibold text-lg text-black">
              Join our newsletter for <span className="font-bold">£10 offs</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Register now to get latest updates on promotions & coupons.<br />
              Don&apos;t worry, we not spam!
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2">
            <input

              type="email"
              placeholder="  Enter your email address"
              className="flex-grow border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
            >
              SEND
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-8 text-xs md:text-sm">
          {/* Need Help */}
          <div>
            <h4 className="font-semibold mb-3 text-black">Do You Need Help ?</h4>
            <p className="flex items-center gap-2 mb-2">
             <FiPhone />
              Monday-Friday: <b className="text-black">08am-9pm</b>
              
            </p>
            <div className="text-black font-bold ml-5">0 800 300-353</div>
            <p className="flex mt-3 items-center gap-2">
              <MdOutlineMail/>
              Need help with your order? <br />
              
            </p>
            <a href="mailto:info@example.com" className="font-semibold hover:underline">
                info@example.com
              </a>
          </div>

          {/* Make Money with Us */}
          <div>
            <h4 className="font-semibold mb-3 text-black">Make Money with Us</h4>
            <ul className="space-y-1 text-gray-600">
              <li className="hover:underline cursor-pointer">Sell on Grogin</li>
              <li className="hover:underline cursor-pointer">Sell Your Services on Grogin</li>
              <li className="hover:underline cursor-pointer">Sell on Grogin Business</li>
              <li className="hover:underline cursor-pointer">Sell Your Apps on Grogin</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Advertise Your Products</li>
              <li className="hover:underline cursor-pointer">Sell-Publish with Us</li>
              <li className="hover:underline cursor-pointer">Become an Blowwe Vendor</li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h4 className="font-semibold mb-3 text-black">Let Us Help You</h4>
            <ul className="space-y-1 text-gray-600">
              <li className="hover:underline cursor-pointer">Accessibility Statement</li>
              <li className="hover:underline cursor-pointer">Your Orders</li>
              <li className="hover:underline cursor-pointer">Returns & Replacements</li>
              <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
              <li className="hover:underline cursor-pointer">Refund and Returns Policy</li>
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">Terms and Conditions</li>
              <li className="hover:underline cursor-pointer">Cookie Settings</li>
              <li className="hover:underline cursor-pointer">Help Center</li>
            </ul>
          </div>

          {/* Get To Know Us */}
          <div>
            <h4 className="font-semibold mb-3 text-black">Get to Know Us</h4>
            <ul className="space-y-1 text-gray-600">
              <li className="hover:underline cursor-pointer">Careers for Grogin</li>
              <li className="hover:underline cursor-pointer">About Grogin</li>
              <li className="hover:underline cursor-pointer">Investor Relations</li>
              <li className="hover:underline cursor-pointer">Grogin Devices</li>
              <li className="hover:underline cursor-pointer">Customer reviews</li>
              <li className="hover:underline cursor-pointer">Social Responsibility</li>
              <li className="hover:underline cursor-pointer">Store Locations</li>
            </ul>
          </div>

          {/* Download Our App */}
          <div>
            <h4 className="font-semibold mb-3 text-black">Download our app</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="inline-block">
                <img
                  src="/media/images/792.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
              <p className="text-xs text-gray-500">Download App Get -10% Discount</p>

              <a href="#" className="inline-block">
                <img
                  src="/media/images/793.png"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
              <p className="text-xs text-gray-500">Download App Get -20% Discount</p>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 mt-5">
              <a href="#" aria-label="Facebook">
                <svg
                  fill="currentColor"
                  className="w-5 h-5 text-blue-600"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9v-2.9h2.54V9.5c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg
                  fill="currentColor"
                  className="w-5 h-5 text-black"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.933 4.933 0 002.165-2.724c-.951.565-2.005.974-3.127 1.196a4.916 4.916 0 00-8.375 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.708.869 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.917 4.917 0 003.946 4.827 4.996 4.996 0 01-2.224.085 4.924 4.924 0 004.6 3.417 9.867 9.867 0 01-6.102 2.105c-.396 0-.79-.023-1.17-.067a13.978 13.978 0 007.556 2.212c9.054 0 14.003-7.496 14.003-13.987 0-.21 0-.423-.015-.633A9.936 9.936 0 0024 4.557z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg
                  fill="currentColor"
                  className="w-5 h-5 text-pink-600"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.056 2.007.248 2.478.415.6.211 1.03.463 1.48.912.45.45.702.88.913 1.48.167.471.36 1.272.416 2.478.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.248 2.007-.415 2.478-.211.6-.463 1.03-.912 1.48-.45.45-.88.702-1.48.913-.471.167-1.272.36-2.478.416-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-2.007-.248-2.478-.415-.6-.211-1.03-.463-1.48-.912-.45-.45-.702-.88-.913-1.48-.167-.471-.36-1.272-.416-2.478C2.175 15.584 2.163 15.204 2.163 12c0-3.204.012-3.584.07-4.85.056-1.206.248-2.007.415-2.478.211-.6.463-1.03.912-1.48.45-.45.88-.702 1.48-.913.471-.167 1.272-.36 2.478-.416C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.015 7.052.072 5.78.129 4.6.395 3.545.897a4.92 4.92 0 00-1.776 1.176 4.92 4.92 0 00-1.176 1.776C.395 4.6.129 5.78.072 7.052.015 8.332 0 8.741 0 12c0 3.259.015 3.668.072 4.948.057 1.272.323 2.452.825 3.507a4.92 4.92 0 001.176 1.776 4.92 4.92 0 001.776 1.176c1.055.502 2.235.768 3.507.825 1.28.057 1.689.072 4.948.072s3.668-.015 4.948-.072c1.272-.057 2.452-.323 3.507-.825a4.92 4.92 0 001.776-1.176 4.92 4.92 0 001.176-1.776c.502-1.055.768-2.235.825-3.507.057-1.28.072-1.689.072-4.948s-.015-3.668-.072-4.948c-.057-1.272-.323-2.452-.825-3.507a4.92 4.92 0 00-1.176-1.776A4.92 4.92 0 0020.455.897C19.4.395 18.22.129 16.948.072 15.668.015 15.259 0 12 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.879 0 1.44 1.44 0 012.879 0z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg
                  fill="currentColor"
                  className="w-5 h-5 text-blue-700"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8.9h4.6v13.5H.2V8.9zM10.4 8.9h-4.4v13.5h4.4v-7.7c0-3.6 4.6-3.9 4.6 0v7.7h4.4v-8.5c0-7-7.8-6.7-8.6-3.3V8.9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & policies */}
        <div className="mt-10 flex flex-col md:flex-row justify-between text-gray-600 text-xs md:text-sm px-2">
          <div>Copyright 2024 © Jinstore WooCommerce WordPress Theme. All right reserved. Powered by <a href="#" className="text-purple-700 hover:underline">BlackRise Themes.</a></div>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a href="#" className="underline">Terms and Conditions</a>
            <a href="#" className="underline">Privacy Policy</a>
            <a href="#" className="underline">Order Tracking</a>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 flex gap-4 items-center justify-center md:justify-start">
          <img
            src="/media/images/List Item SVG.png"
            alt="Visa"
            className="h-6"
          />
          <img
            src="/media/images/mastercard.png"
            alt="Mastercard"
            className="h-6"
          />
          <img
            src="/media/images/paypal.png"
            alt="PayPal"
            className="h-6"
          />
          <img
            src="/media/images/skrill.png"
            alt="Skrill"
            className="h-6"
          />
          <img
            src="/media/images/klarna.png"
            alt="Klarna"
            className="h-6"
          />
        </div>
      </div>
    </footer>
  );
}
