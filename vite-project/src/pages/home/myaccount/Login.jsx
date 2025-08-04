import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../../firebase/FirebaseConfig';
import { collection,onSnapshot, query, where  } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
//   const [usernameOrEmail, setUsernameOrEmail] = useState("");
//   const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  //firebase setup

// navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    //login function
    const userLoginFunction = async () => {
        // validation 
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required")
        }
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            // console.log(users.user)

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) )
                    setUserLogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                   
                    if(user.role === "user") {
                        navigate('/user-dashboard');
                    }else{
                        navigate('/admin/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                
            }
             } catch (error) {
            console.log(error);
            
            toast.error("Login Failed");
        }

    }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Logging in with:");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {/* Title and Register Link */}
        <div className="flex justify-center mb-6 gap-5">
          <h2 className="text-2xl font-bold text-gray-800 mr-4">Login</h2>
          <Link
            to="/register"
            className="text-gray-500 hover:underline  font-bold text-2xl"
          >
            Register
          </Link>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 mb-4">
          If you have an account, sign in with your username or email address.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username or Email Input */}
          <div>
            <label
              htmlFor="usernameOrEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={userLogin.email}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                email: e.target.value
                            })
                        }}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
               value={userLogin.password}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                password: e.target.value
                            })
                        }}
              required
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Lost your password?
            </Link>
          </div>

          {/* Login Button */}
          <div>
            <button
            onClick={userLoginFunction}
              type="submit"
              className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

// Dummy Link component for demonstration (replace with react-router-dom Link in your actual app)
// const Link = ({ to, className, children }) => (
//   <a href={to} className={className}>
//     {children}
//   </a>
// );
