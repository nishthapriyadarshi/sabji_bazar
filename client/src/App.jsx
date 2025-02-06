import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

import Navbar from './components/layout/navbar/Navbar';
import Hero from './components/pages/Home/Hero';
import Footer from './components/layout/footer/Footer';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AdminDashboard from './components/pages/AdminDashboard';
import CustomerDashboard from './components/pages/CustomerDashboard';
import AddProductForm from './components/pages/AddProductForm';
import Cart from './components/cart/Cart';
import ProductComponent from './components/product/Product'; // Make sure to import this
import { CartProvider } from './components/cart/CartContext'; // Import the CartProvider
import UserOrders from './components/pages/orders/UserOrders';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <CartProvider> {/* Wrap with CartProvider */}
      <main className='overflow-hidden'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/product" element={<ProductComponent />} />
          <Route path="/about" element={<h1>About Us</h1>} />
          <Route path="/user/orders" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminDash" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/adminDash/add-product" element={<AddProductForm />} />
          <Route path="/adminDash/user-order" element={<UserOrders />} />
        </Routes>
        <Footer />
      </main>
      <ToastContainer />
    </CartProvider>
  )
};

export default App;
