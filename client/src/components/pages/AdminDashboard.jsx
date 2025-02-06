import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddProductForm from "./AddProductForm";  // Import AddProductForm
import UserOrders from "./orders/UserOrders";          // Import UserOrders
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [showOrdersPopup, setShowOrdersPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:8080/api/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(data);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const toggleAddProductPopup = () => {
    setShowAddProductPopup(!showAddProductPopup);
  };

  const toggleOrdersPopup = () => {
    setShowOrdersPopup(!showOrdersPopup);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-6">
      <nav className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded">
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded p-4">
          <h3 className="text-lg font-semibold">Number of Users</h3>
          <p className="text-2xl">{users.length}</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
            onClick={toggleOrdersPopup}
          >
            {showOrdersPopup ? "Close User Orders" : "View User Orders"}
          </button>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
            onClick={toggleAddProductPopup}
          >
            {showAddProductPopup ? "Cancel Add Product" : "Add Product"}
          </button>
        </div>
      </div>

 {showOrdersPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full max-w-full max-h-full flex flex-col">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 self-end"
        onClick={toggleOrdersPopup}
      >
        Close
      </button>
      <div className="flex-1 overflow-y-auto">
        <UserOrders />
      </div>
    </div>
  </div>
)}



      {showAddProductPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={toggleAddProductPopup}
            >
              Close
            </button>
            <AddProductForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
