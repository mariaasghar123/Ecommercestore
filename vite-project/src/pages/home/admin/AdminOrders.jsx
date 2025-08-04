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
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Total Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.userName || "N/A"}</td>
                <td className="py-2 px-4">${order.totalAmount?.toFixed(2)}</td>
                <td className="py-2 px-4">{order.date || "N/A"}</td>
                <td className="py-2 px-4">
                  <ul className="list-disc pl-5">
                    {order.cartItems?.map((item, index) => (
                      <li key={index}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
