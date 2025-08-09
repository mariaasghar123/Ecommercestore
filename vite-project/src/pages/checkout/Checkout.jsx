import React, { useState } from "react";
import { useCart } from "../../context/Context";
import { fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Country, State, City } from "country-state-city";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "United States (US)",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "California",
    zipCode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const formattedSubtotal = subtotal.toFixed(2);

  const shippingCost = subtotal >= 299.11 ? 0 : 15;
  const total = subtotal + shippingCost;
  const formattedTotal = total.toFixed(2);

  const remainingForFreeShipping = (299.11 - subtotal).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };

  const placeOrder = async () => {
    // 1️⃣ Check if user is logged in
    const user = JSON.parse(localStorage.getItem("users"));
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    // 2️⃣ Validate required fields
    if (
      !billingDetails.firstName ||
      !billingDetails.lastName ||
      !billingDetails.streetAddress ||
      !billingDetails.city ||
      !billingDetails.state ||
      !billingDetails.zipCode ||
      !billingDetails.phone ||
      !billingDetails.email
    ) {
      return toast.error("Please fill all required fields");
    }

    setLoading(true);
    try {
      const orderInfo = {
        cartItems,
        billingDetails,
        subtotal: formattedSubtotal,
        shipping: shippingCost,
        total: formattedTotal,
        status: "Pending", // Order initial status
        time: Timestamp.now(), // Firestore timestamp
        date: new Date().toLocaleDateString("en-US"),
        userId: user.uid || user.email, // store who placed the order
      };

      const orderRef = collection(fireDB, "orders");
      await addDoc(orderRef, orderInfo);

      toast.success("Order placed successfully!");
      clearCart(); // Cart empty
      // Redirect user to an order confirmation page, or home page
      // navigate('/order-confirmation');
    } catch (error) {
      console.error("Error placing order: ", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {subtotal < 299.11 && (
        <div className="w-full max-w-4xl mx-auto mb-4">
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded flex items-center">
            <span className="font-semibold mr-2">
              Add{" "}
              <span className="text-red-500">${remainingForFreeShipping}</span>{" "}
              to cart and get free shipping!
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 max-w-7xl mx-auto">
        {/* Main Form */}
        <form
          className="w-full lg:w-2/3 bg-white p-8 rounded shadow-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-4 text-base font-semibold text-gray-900">
            Billing details
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">First name *</label>
              <input
                name="firstName"
                value={billingDetails.firstName}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 border-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last name *</label>
              <input
                name="lastName"
                value={billingDetails.lastName}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 border-gray-500"
                required
              />
            </div>
          </div>
          {/* ... Baki inputs yahan hain ... */}
          {/* Yahan baqi inputs ko bhi `name` aur `value` se bind karen */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Company name (optional)
            </label>
            <input
              name="company"
              value={billingDetails.company}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 border-gray-500"
            />
          </div>
          {/* ... (similarly update all other input fields) ... */}

          {/* Country Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Country / Region *
            </label>
            <select
              name="country"
              value={countryCode}
              onChange={(e) => {
                const code = e.target.value;
                setCountryCode(code);
                setBillingDetails({
                  ...billingDetails,
                  country: Country.getCountryByCode(code)?.name || "",
                });
                setStateCode(""); // Reset state on country change
              }}
              className="w-full border rounded px-3 py-2 border-gray-500"
              required
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Street address *</label>
            <input
              name="streetAddress"
              value={billingDetails.streetAddress}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="House number and street name"
              required
            />
            <input
              name="apartment"
              value={billingDetails.apartment}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 border-gray-500"
              placeholder="Apartment, suite, unit, etc. (optional)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* State Dropdown */}
            <div>
              <label className="block text-gray-700 mb-1">State *</label>
              <select
                name="state"
                value={stateCode}
                onChange={(e) => {
                  const code = e.target.value;
                  setStateCode(code);
                  setBillingDetails({
                    ...billingDetails,
                    state:
                      State.getStateByCodeAndCountry(code, countryCode)?.name ||
                      "",
                  });
                }}
                className="w-full border rounded px-3 py-2 border-gray-500"
                required
                disabled={!countryCode} // Disable until a country is selected
              >
                <option value="">Select State</option>
                {State.getStatesOfCountry(countryCode).map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div>
              <label className="block text-gray-700 mb-1">Town / City *</label>
              <select
                name="city"
                value={billingDetails.city}
                onChange={(e) => {
                  setBillingDetails({
                    ...billingDetails,
                    city: e.target.value,
                  });
                }}
                className="w-full border rounded px-3 py-2 border-gray-500"
                required
                disabled={!stateCode}
              >
                <option value="">Select City</option>
                {City.getCitiesOfState(countryCode, stateCode).map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">ZIP Code *</label>
              <input
                name="zipCode"
                value={billingDetails.zipCode}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 border-gray-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Phone *</label>
            <input
              name="phone"
              value={billingDetails.phone}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 border-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email address *</label>
            <input
              name="email"
              value={billingDetails.email}
              onChange={handleInputChange}
              type="email"
              className="w-full border rounded px-3 py-2 border-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">
              Order notes (optional)
            </label>
            <textarea
              name="orderNotes"
              value={billingDetails.orderNotes}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 border-gray-500"
              rows="2"
              placeholder="Notes about your order, e.g. special notes for delivery."
            />
          </div>
        </form>

        {/* Sidebar: Order Summary */}
        <aside className="w-full lg:w-1/3 bg-white p-6 rounded shadow-md">
          <div className="text-base font-semibold mb-4">Your order</div>
          {cartItems.map((item, index) => (
            <div className="flex justify-between mb-2" key={index}>
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-2 mt-2 text-gray-600">
            <span>Subtotal</span>
            <span>${formattedSubtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>
              {shippingCost === 0
                ? "Free"
                : `Flat rate: $${shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2 mt-2">
            <span>Total</span>
            <span>${formattedTotal}</span>
          </div>
          {/* Payment Options */}
          <div className="mt-4">
            <label className="inline-flex items-center mb-2">
              <input
                type="radio"
                name="payment"
                className="form-radio mr-2"
                defaultChecked
              />
              Direct Bank Transfer
            </label>
            <div className="text-xs text-gray-600 pl-6 mb-2">
              Make your payment directly into our bank account...
            </div>
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
            <span className="text-xs text-gray-700">
              I have read and agree to the website terms and conditions *
            </span>
          </div>
          <button
            type="button"
            onClick={placeOrder}
            className={`mt-2 w-full py-2 rounded text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800"
            }`}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place order"}
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
