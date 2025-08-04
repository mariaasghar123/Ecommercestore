import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../../firebase/FirebaseConfig';
import { Timestamp, collection, addDoc } from 'firebase/firestore';



const Register = () => {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer'); // 'customer' or 'vendor'

    //firebase setup 
    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });
        //signup function
    const userSignupFunction = async () => {
    // validation
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
        toast.error("All Fields are required");
        return; // 🛑 important to stop here if validation fails
    }

    try {
        const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

        // create user object with correct role
        const user = {
            name: userSignup.name,
            email: users.user.email,
            uid: users.user.uid,
            role: userType === 'vendor' ? 'admin' : 'user', // 🔁 check selected userType
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            })
        };

        // Firestore collection
        const userRef = collection(fireDB, "user");

        // Store user data
        await addDoc(userRef, user);

        // Reset form state
        setUserSignup({ name: "", email: "", password: "" });
        setUserType("customer");

        toast.success("Signup Successfully");

        navigate('/login');
    } catch (error) {
        console.error("Signup Error:", error.message);
        toast.error("Signup failed. Email might already be in use.");
    }
};


    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle registration logic here
        console.log('Registering with:', { userType });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                {/* Title and Login Link */}
                <div className="flex justify-center mb-6">
                    <Link to="/login" className="text-2xl hover:underline font-bold text-gray-400 mr-4">Login</Link>
                    <Link to="/register" className="text-2xl font-bold text-gray-800">Register</Link>
                </div>

                {/* Description */}
                <p className="text-center text-gray-600 mb-6">
                    There are many advantages to creating an account: the payment process is faster, shipment tracking is possible and much more.
                </p>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Input */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="username"

                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            value={userSignup.name}
                            onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            })
                        }}
                            required
                        />
                    </div>

                    {/* Email Address Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            value={userSignup.email}
                            onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            })
                        }}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            value={userSignup.password}
                            onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            })
                        }}
                        />
                    </div>

                    {/* User Type Radio Buttons */}
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                id="customer"
                                name="userType"
                                type="radio"
                                value="customer"
                                checked={userType === 'customer'}
                                onChange={(e) => setUserType(e.target.value)}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                            />
                            <label htmlFor="customer" className="ml-2 block text-sm text-gray-900">
                                I am a customer
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="vendor"
                                name="userType"
                                type="radio"
                                value="vendor"
                                checked={userType === 'vendor'}
                                onChange={(e) => setUserType(e.target.value)}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                            />
                            <label htmlFor="vendor" className="ml-2 block text-sm text-gray-900">
                                I am a vendor
                            </label>
                        </div>
                    </div>

                    {/* Privacy Policy */}
                    <p className="text-gray-600 text-sm">
                        Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}
                        <Link to="/privacy-policy" className="text-purple-600 hover:underline">
                            privacy policy.
                        </Link>
                    </p>

                    {/* Register Button */}
                    <div>
                        <button
                        onClick={userSignupFunction}
                            type="submit"
                            className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;