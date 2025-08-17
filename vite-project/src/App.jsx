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
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForAdmin } from "./pages/protectedroute/ProtectedRouteForAdmin";
import { ProtectedRouteForUser } from "./pages/protectedroute/ProtectedRouteForUser";
import AddProductPage from "./pages/home/admin/AddProductPage";
import ProductListPage from "./pages/home/admin/ProductListPage";
import EditProduct from "./pages/home/admin/EditProduct";
import ViewProduct from "./pages/home/admin/ViewProduct";
import AdminOrders from "./pages/home/admin/AdminOrders";
import UpdateAdmin from "./pages/home/admin/AdminDashboard";
import UserAccountDetail from "./pages/home/user/UserAccountDetail";
import CategoryProducts from "./components/products/CategoryProducts";
import UserOrder from "./pages/home/user/UserOrder"
import AccountDetail from "./pages/home/user/AccountDetail"
import AllUserAccounts from "./pages/home/admin/AllUserAccounts"
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
            <Route path="/category/:categoryName" element={<CategoryProducts />} />
            
            <Route path="/user-dashboard" element={
              <ProtectedRouteForUser> <UserDashboard /></ProtectedRouteForUser>
             } />
              <Route path="/user-account-detail" element={
              <ProtectedRouteForUser> <UserAccountDetail /></ProtectedRouteForUser>
             } />
              <Route path="/account-detail" element={
              <ProtectedRouteForUser> <AccountDetail /></ProtectedRouteForUser>
             } />
             <Route path="/userorder" element={
              <ProtectedRouteForUser> <UserOrder /></ProtectedRouteForUser>
             } />

            <Route path="/admin" element={<UpdateAdmin />} />

            <Route path="/admin/admin-dashboard" element={
              <ProtectedRouteForAdmin>
                <AdminDashboardDetail />
              </ProtectedRouteForAdmin>
              } />
              <Route path="/admin/admin-dashboard/add-product" element={
              <ProtectedRouteForAdmin>Dashboard
                <AddProductPage />
              </ProtectedRouteForAdmin>
              } />
               <Route path="/admin/admin-dashboard/alluseraccounts" element={
              <ProtectedRouteForAdmin>
                <AllUserAccounts />
              </ProtectedRouteForAdmin>
              } />
              <Route path="/admin/admin-dashboard/products" element={
              <ProtectedRouteForAdmin>
                <ProductListPage />
              </ProtectedRouteForAdmin>}/>
              <Route path="/admin/admin-dashboard/edit-product/:id" element={
              <ProtectedRouteForAdmin>
                <EditProduct />
              </ProtectedRouteForAdmin>}/>
               <Route path="/admin/admin-dashboard/view-product/:id" element={
              <ProtectedRouteForAdmin>
                <ViewProduct />
              </ProtectedRouteForAdmin>}/>
               <Route path="/admin/admin-dashboard/orders" element={
              <ProtectedRouteForAdmin>
                <AdminOrders />
              </ProtectedRouteForAdmin>}/>
                

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/wishlist" element={<Wishlist />}/>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/*" element={<Nopage />} />
          </Routes>
          <Toaster/>
        </Layout>
      </Router>
      </CartProvider>
      
    </div>
  );
}
