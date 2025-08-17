import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB, auth } from "../../../firebase/FirebaseConfig";

export default function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async (user) => {
      try {
        // User ka UID check karen. Agar user ya uska UID nahi hai, to ruk jayen.
        if (!user || !user.uid) {
          setLoading(false);
          return;
        }

        // Firestore query: 'orders' collection se sirf current user ke orders fetch karen
        // Yahan 'userId' field ka istemal ho raha hai, jo zyada reliable hai
        const q = query(
          collection(fireDB, "orders"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("🔥 Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    const user = auth.currentUser || JSON.parse(localStorage.getItem("user"));
    fetchOrders(user);

    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        fetchOrders(firebaseUser);
      } else {
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="p-5 text-center">Loading orders...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        📦 My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-2xl p-6 shadow-md bg-white hover:shadow-lg transition"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Order ID:{" "}
                  <span className="text-orange-600 font-mono">{order.id}</span>
                </h3>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2">Qty</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems?.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2 flex items-center gap-2">
                          <img
                            src={item.productImageUrl}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <span>{item.title}</span>
                        </td>
                        <td className="p-2 text-center">{item.quantity}</td>
                        <td className="p-2 text-center">${item.price}</td>
                        <td className="p-2 text-center">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Totals */}
              <div className="mt-4 text-right text-gray-800">
                <p>
                  <strong>Shipping:</strong> ${order.shipping}
                </p>
                <p>
                  <strong>Subtotal:</strong> ${order.subtotal}
                </p>
                <p className="text-xl font-bold text-orange-600">
                  Total: ${order.total}
                </p>
              </div>

              {/* Order Date */}
              <p className="text-sm text-gray-500 mt-2">
                Ordered on: {order.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}