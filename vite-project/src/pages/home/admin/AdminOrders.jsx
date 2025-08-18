import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(fireDB, "orders"));
        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
        All Orders (Admin)
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-purple-700">
                  Order ID: {order.id}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              {/* Customer Info (billingDetails) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p>
                    <strong>Name:</strong> {order.billingDetails?.firstName}{" "}
                    {order.billingDetails?.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.billingDetails?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.billingDetails?.phone}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Address:</strong>{" "}
                    {order.billingDetails?.streetAddress},{" "}
                    {order.billingDetails?.apartment}
                  </p>
                  <p>
                    <strong>City:</strong> {order.billingDetails?.city},{" "}
                    {order.billingDetails?.state},{" "}
                    {order.billingDetails?.zipCode}
                  </p>
                  <p>
                    <strong>Country:</strong> {order.billingDetails?.country}
                  </p>
                </div>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Order Date:</strong> {order.date}
                </p>
                <p>
                  <strong>Shipping:</strong> ${order.shipping}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total}
                </p>
              </div>

              {order.orderNotes && (
                <p className="mb-4">
                  <strong>Notes:</strong> {order.orderNotes}
                </p>
              )}

              {/* Cart Items */}
              <div>
                <h4 className="font-semibold text-lg mb-2 text-purple-600">
                  Products:
                </h4>
                <table className="w-full border border-gray-200 rounded">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Image</th>
                      <th className="p-2 text-left">Title</th>
                      <th className="p-2 text-left">Category</th>
                      <th className="p-2 text-left">Qty</th>
                      <th className="p-2 text-left">Price</th>
                      <th className="p-2 text-left">Discount</th>
                      <th className="p-2 text-left">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems?.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">
                          <img
                            src={item.productImageUrl}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-2">{item.title}</td>
                        <td className="p-2">{item.category}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">${item.price}</td>
                        <td className="p-2">{item.discount}%</td>
                        <td className="p-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
