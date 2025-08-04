import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB, auth } from '../../../firebase/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

const UserAccountDetail = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); // 👈 New state for user

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setLoading(false);
                setError('User is not logged in.');
                return;
            }

            setCurrentUser(user); // 👈 Set user to state

            try {
                const userRef = doc(fireDB, 'users', user.uid); // ✅ Corrected collection and UID
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    toast.error('User data not found.');
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to fetch user data. Please try again.');
                toast.error('Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-gray-600">Loading user details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-gray-600">No user data found. Please complete your profile.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-8 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Account Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                        <p className="text-sm font-semibold text-gray-500">First Name</p>
                        <p className="text-lg text-gray-900">{userData.firstName || 'N/A'}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Last Name</p>
                        <p className="text-lg text-gray-900">{userData.lastName || 'N/A'}</p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="text-sm font-semibold text-gray-500">Email Address</p>
                        <p className="text-lg text-gray-900">{currentUser?.email || 'N/A'}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Phone Number</p>
                        <p className="text-lg text-gray-900">{userData.phone || 'N/A'}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Account Role</p>
                        <p className="text-lg text-gray-900">{userData.role || 'N/A'}</p>
                    </div>

                    {userData.shopName && (
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Shop Name</p>
                            <p className="text-lg text-gray-900">{userData.shopName}</p>
                        </div>
                    )}

                    {userData.shopUrl && (
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Shop URL</p>
                            <p className="text-lg text-gray-900">{userData.shopUrl}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAccountDetail;
