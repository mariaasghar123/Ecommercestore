import React, { useEffect, useState } from "react";
import { auth, fireDB } from "../../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function AccountDetail() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userRef = doc(fireDB, "user", auth.currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            console.log("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, []);

  if (!auth.currentUser) {
    return <p className="text-center mt-10 text-red-500">Please login first</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Account Details</h2>
      {userData ? (
        <div className="space-y-2">
          <p><span className="font-semibold">UID:</span> {auth.currentUser.uid}</p>
          <p><span className="font-semibold">Name:</span> {userData.shopName ||"N/A"} </p>
          <p><span className="font-semibold">Email:</span> {auth.currentUser.email}</p>
          <p><span className="font-semibold">Role:</span> {userData.role || "user"}</p>
          <p><span className="font-semibold">First name:</span> {userData.firstName || "N/A"}</p>
          <p><span className="font-semibold">Last name:</span> {userData.lastName || "N/A"}</p>
          <p><span className="font-semibold">shop url:</span> {userData.shopUrl || "N/A"}</p>
          <p><span className="font-semibold">phone:</span> {userData.phone || "N/A"}</p>
          <p><span className="font-semibold">Created At:</span> {userData.date || "N/A"}</p>

        </div>
      ) : (
        <p className="text-gray-500">Loading user data...</p>
      )}
    </div>
  );
}
