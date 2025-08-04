import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { fireDB, auth } from '../../../firebase/FirebaseConfig';
import UserSidebar from '../user/UserSidebar';
import toast from 'react-hot-toast';

// AdminForm component jisme data fetching logic shamil ki gai hai
const AdminForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    shopName: '',
    shopUrl: '',
    termsAccepted: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // useEffect hook jo page load hote hi user ka data fetch karega
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userRef = doc(fireDB, 'user', currentUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            // Agar document maujood hai, to uska data state mein set karo
            const userData = docSnap.data();
            setFormData(prev => ({
              ...prev,
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              phone: userData.phone || '',
              shopName: userData.shopName || '',
              shopUrl: userData.shopUrl || '',
            }));
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [currentUser]); // currentUser par depend karega

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    try {
      const userRef = doc(fireDB, 'user', currentUser.uid);
      await setDoc(userRef, {
        role: 'admin',
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        shopName: formData.shopName,
        shopUrl: formData.shopUrl
      }, { merge: true });

      toast.success("Account updated successfully");

      onSuccess(); // hide the form
      navigate('/admin/admin-dashboard'); // redirect
    } catch (err) {
      console.error("Firestore update failed:", err);
      setError("Failed to update account. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-8 text-gray-600">Loading form...</div>;
  }

  return (
    <form className="w-full max-w-4xl mx-auto p-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-6">Update account to Admin</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name *</label>
          <input id="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-500 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name *</label>
          <input id="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-500 rounded px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-gray-700 mb-1">Email (Read Only)</label>
          <input id="email" value={currentUser?.email || ''} readOnly className="w-full border border-gray-500 rounded px-3 py-2 bg-gray-100" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="shopName" className="block text-gray-700 mb-1">Shop Name *</label>
          <input
            id="shopName"
            value={formData.shopName}
            onChange={handleChange}
            className="w-full border border-gray-500 rounded px-3 py-2"
            placeholder="Enter your shop name"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="shopUrl" className="block text-gray-700 mb-1">Shop URL *</label>
          <input
            id="shopUrl"
            value={formData.shopUrl}
            onChange={handleChange}
            className="w-full border border-gray-500 rounded px-3 py-2"
            placeholder="https://yourshop.com"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number *</label>
          <input id="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-500 rounded px-3 py-2" />
        </div>
        <div className="md:col-span-2 flex items-center mt-2">
          <input id="termsAccepted" type="checkbox" checked={formData.termsAccepted} onChange={handleChange} className="mr-2" />
          <label htmlFor="termsAccepted" className="text-gray-700">
            I agree to the <span className="text-blue-600 underline cursor-pointer">Terms & Conditions.</span>
          </label>
        </div>
        <div className="md:col-span-2 mt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Become an Admin
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    </form>
  );
};


// Main UpdateAdmin component, jisme koi tabdeeli nahi ki
export default function UpdateAdmin() {
  const [showAdminForm, setShowAdminForm] = useState(true);

  return (
    <div className="flex min-h-screen">
      <UserSidebar onBecomeAdminClick={() => setShowAdminForm(true)} />
      <main className="flex-1 px-10 py-12">
        {showAdminForm && (
          <AdminForm onSuccess={() => setShowAdminForm(false)} />
        )}
      </main>
    </div>
  );
}