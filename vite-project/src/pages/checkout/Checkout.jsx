import React from 'react';
import { useCart } from '../../context/Context'; 

function Checkout() {
    const { cartItems } = useCart();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const formattedSubtotal = subtotal.toFixed(2);

  const shippingCost = subtotal >= 299.11 ? 0 : 15;
  const total = subtotal + shippingCost;
  const formattedTotal = total.toFixed(2);

  const remainingForFreeShipping = (299.11 - subtotal).toFixed(2);
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {subtotal < 299.11 && (
        <div className="w-full max-w-4xl mx-auto mb-4">
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded flex items-center">
            <span className="font-semibold mr-2">
              Add <span className="text-red-500">${remainingForFreeShipping}</span> to cart and get free shipping!
            </span>
        </div>
      </div>)}
      {/* Form and Sidebar Wrapper */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 max-w-7xl mx-auto">
        {/* Main Form */}
        <form className="w-full lg:w-2/3 bg-white p-8 rounded shadow-md">
          <div className="mb-4 text-base font-semibold text-gray-900">Billing details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">First name *</label>
              <input className="w-full border rounded px-3 py-2 border-gray-500" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last name *</label>
              <input className="w-full border rounded px-3 py-2 border-gray-500" required />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Company name (optional)</label>
            <input className="w-full border rounded px-3 py-2 border-gray-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Country / Region *</label>
            <select className="w-full border rounded px-3 py-2 border-gray-500">
              <option>United States (US)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Street address *</label>
            <input className="w-full border rounded px-3 py-2 mb-2" placeholder="House number and street name" required />
            <input className="w-full border rounded px-3 py-2 border-gray-500" placeholder="Apartment, suite, unit, etc. (optional)" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Town / City *</label>
              <input className="w-full border rounded px-3 py-2 border-gray-500" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">State *</label>
              <select className="w-full border rounded px-3 py-2 border-gray-500">
                <option>California</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">ZIP Code *</label>
              <input className="w-full border rounded px-3 py-2 border-gray-500" required />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Phone *</label>
            <input className="w-full border rounded px-3 py-2 border-gray-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email address *</label>
            <input type="email" className="w-full border rounded px-3 py-2 border-gray-500" required />
          </div>
          <div className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 border rounded" id="create-account" />
            <label htmlFor="create-account" className="text-gray-700 border-gray-500">Create an account?</label>
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2 border rounded" id="ship-different" />
            <label htmlFor="ship-different" className="text-gray-700 border-gray-500">Ship to a different address?</label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Order notes (optional)</label>
            <textarea className="w-full border rounded px-3 py-2 border-gray-500" rows="2" placeholder="Notes about your order, e.g. special notes for delivery." />
          </div>
        </form>

        {/* Sidebar: Order Summary */}
        {/* <aside className="w-full lg:w-1/3 bg-white p-6 rounded shadow-md">
          <div className="text-base font-semibold mb-4">Your order</div>
          <div className="flex justify-between mb-2">
            <span>Marketcise Fresh Organic Bananas, Bunch x 1</span>
            <span>$0.89</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2 text-gray-600">
            <span>Subtotal</span>
            <span>$0.89</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Flat rate: $15.00</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2 mt-2">
            <span>Total</span>
            <span>$15.89</span>
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center mb-2">
              <input type="radio" name="payment" className="form-radio mr-2" defaultChecked />
              Direct Bank Transfer
            </label>
            <div className="text-xs text-gray-600 pl-6 mb-2">Make your payment directly into our bank account...</div>
            <label className="inline-flex items-center mb-2">
              <input type="radio" name="payment" className="form-radio mr-2" />
              Check Payments
            </label>
            <label className="inline-flex items-center mb-2">
              <input type="radio" name="payment" className="form-radio mr-2" />
              Cash On Delivery
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 border rounded" required />
            <span className="text-xs text-gray-700">I have read and agree to the website terms and conditions *</span>
          </div>
          <button type="button" className="mt-2 w-full py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition">Place order</button>
        </aside> */}
        <aside className="w-full lg:w-1/3 bg-white p-6 rounded shadow-md">
          <div className="text-base font-semibold mb-4">Your order</div>

          {cartItems.map((item, index) => (
            <div className="flex justify-between mb-2" key={index}>
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="flex justify-between border-t pt-2 mt-2 text-gray-600">
            <span>Subtotal</span>
            <span>${formattedSubtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? 'Free' : `Flat rate: $${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2 mt-2">
            <span>Total</span>
            <span>${formattedTotal}</span>
          </div>

          {/* Payment Options */}
          <div className="mt-4">
            <label className="inline-flex items-center mb-2">
              <input type="radio" name="payment" className="form-radio mr-2" defaultChecked />
              Direct Bank Transfer
            </label>
            <div className="text-xs text-gray-600 pl-6 mb-2">Make your payment directly into our bank account...</div>
            <label className="inline-flex items-center mb-2">
              <input type="radio" name="payment" className="form-radio mr-2" />
              Check Payments
            </label>
            <label className="inline-flex items-center mb-2">
              <input type="radio" name="payment" className="form-radio mr-2" />
              Cash On Delivery
            </label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 border rounded" required />
            <span className="text-xs text-gray-700">I have read and agree to the website terms and conditions *</span>
          </div>

          <button type="button" className="mt-2 w-full py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition">Place order</button>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
 