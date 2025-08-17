// pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { fireDB, auth } from "../../../firebase/FirebaseConfig";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/Context";

const UserDashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const { wishlistItems } = useCart();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const userObj = {
          name: firebaseUser.displayName || "Guest User",
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        };
        setUser(userObj);
        
        fetchUserOrders(userObj.uid);
        fetchUserMessages(userObj.email); 
      } else {
        setUser(null);
        setOrderCount(0);
        setMessages([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchUserOrders = async (uid) => {
    try {
      const q = query(collection(fireDB, "orders"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      setOrderCount(querySnapshot.size);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchUserMessages = (email) => {
    try {
      const q = query(
        collection(fireDB, "messages"),
        where("email", "==", email),
      );

      const unsubscribeMessages = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
      });

      return unsubscribeMessages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return () => {};
    }
  };

  if (!user) {
    return (
      <p className="text-center mt-20 text-lg text-gray-600">
        Loading Dashboard...
      </p>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 to-orange-50">
      {/* Sidebar */}
      <UserSidebar user={user} />

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 lg:p-16">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            👋 Welcome, <span className="text-orange-600">{user.name}</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Your personalized dashboard overview
          </p>
        </div>

        {/* User Info Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 mb-10 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Details</h2>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="px-5 py-2 bg-orange-100 text-orange-700 rounded-full font-medium shadow-inner">
                User ID: {user.uid?.slice(0, 8)}...
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Orders */}
          <Link to="/userorder">
            <div className="bg-white hover:scale-105 transform transition-all duration-300 shadow-xl rounded-3xl p-6 border-l-8 border-orange-500 cursor-pointer">
              <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
              <p className="text-4xl font-bold text-orange-600 mt-2">{orderCount}</p>
              <p className="text-sm text-gray-500 mt-1">Completed orders</p>
            </div>
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist">
            <div className="bg-white hover:scale-105 transform transition-all duration-300 shadow-xl rounded-3xl p-6 border-l-8 border-pink-500 cursor-pointer">
              <h2 className="text-lg font-semibold text-gray-700">Wishlist</h2>
              <p className="text-4xl font-bold text-pink-600 mt-2">{wishlistItems.length}</p>
              <p className="text-sm text-gray-500 mt-1">Saved items</p>
            </div>
          </Link>

          {/* Profile */}
          <div className="bg-white hover:scale-105 transform transition-all duration-300 shadow-xl rounded-3xl p-6 border-l-8 border-green-500">
            <h2 className="text-lg font-semibold text-gray-700">Profile</h2>
            <p className="text-4xl font-bold text-green-600 mt-2">100%</p>
            <p className="text-sm text-gray-500 mt-1">Complete profile</p>
          </div>
        </div>

        {/* Messages Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">📩 Your Messages</h2>
          <div className="h-80 overflow-y-auto pr-2">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No messages found.</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-orange-50 to-orange-100 shadow-md transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex justify-between items-center text-sm font-medium text-gray-600 mb-2">
                    <p className="text-orange-800">
                      <strong className="text-orange-900">Subject:</strong> {msg.subject}
                    </p>
                    <p className="text-gray-500">
                      {new Date(msg.createdAt?.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{msg.message}</p>
                  <div className="mt-4 pt-2 border-t border-orange-200 text-sm text-gray-600">
                    <p><strong>From:</strong> {msg.name} ({msg.email})</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;