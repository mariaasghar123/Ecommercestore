import { Button } from "@material-tailwind/react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Nopage from "./pages/nopage/Nopage";
import AllProducts from "./components/products/AllProducts";
import Products from "./components/products/Products";
import ProductDetail from "./components/products/ProductDetail";
import Layout from "./components/layout/Layout";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "./context/Context";
import Contact from "./pages/contact/Contact";
import ShopPage from "./pages/home/shop/ShopPage";
import Login from "./pages/home/myaccount/Login";
import Register from "./pages/home/myaccount/Register";
import UpdateVendor from "./pages/home/admin/AdminDashboard";
import PageNotFound from "./pages/nopage/PageNotFound";
import Checkout from "./pages/checkout/Checkout";
import Blog from "./pages/blog/Blog";
import Wishlist from "./pages/wishlist/Wishlist";
import UserDashboard from "./pages/home/user/UserDashboard";
import AdminDashboardDetail from "./pages/home/admin/AdminDashboardDetail";
export default function App() {
  
  return (
    <div>
      <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/all-products" element={<Products/>} />
            <Route path="/all-products/:id" element={<ProductDetail />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />

            <Route path="/admin" element={<UpdateVendor />} />
            <Route path="/admin/admin-dashboard" element={<AdminDashboardDetail />} />

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/wishlist" element={<Wishlist />}/>

            <Route path="*" element={<PageNotFound />} />
            <Route path="/*" element={<Nopage />} />
          </Routes>
        </Layout>
      </Router>
      </CartProvider>
      
    </div>
  );
}
