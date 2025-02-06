import React from "react";
import { FaUser, FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";

const CustomerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Customer</h2>
        <ul>
          <li className="flex items-center py-3 pl-4 hover:bg-gray-700 rounded">
            <FaUser className="mr-4" />
            Profile
          </li>
          <li className="flex items-center py-3 pl-4 hover:bg-gray-700 rounded">
            <FaShoppingCart className="mr-4" />
            Orders
          </li>
          <li className="flex items-center py-3 pl-4 hover:bg-gray-700 rounded">
            <FaCog className="mr-4" />
            Settings
          </li>
          <li className="flex items-center py-3 pl-4 hover:bg-gray-700 rounded">
            <FaSignOutAlt className="mr-4" />
            Logout
          </li>
        </ul>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center bg-white shadow-md p-4 mb-6">
          <h1 className="text-2xl font-bold">Customer Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, John Doe</span>
            <button className="text-white bg-blue-500 px-4 py-2 rounded">Logout</button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Profile */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">My Profile</h3>
            <p className="text-gray-600 mt-4">Update your personal information.</p>
            <button className="mt-4 text-white bg-green-500 px-4 py-2 rounded">Edit Profile</button>
          </div>

          {/* Card 2: Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">My Orders</h3>
            <p className="text-gray-600 mt-4">View and track your orders.</p>
            <button className="mt-4 text-white bg-blue-500 px-4 py-2 rounded">View Orders</button>
          </div>

          {/* Card 3: Account Settings */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Account Settings</h3>
            <p className="text-gray-600 mt-4">Change your password and other settings.</p>
            <button className="mt-4 text-white bg-orange-500 px-4 py-2 rounded">Settings</button>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Product</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">#12345</td>
                <td className="px-4 py-2 border-b">Fresh Avocados</td>
                <td className="px-4 py-2 border-b text-green-500">Shipped</td>
                <td className="px-4 py-2 border-b">Jan 8, 2025</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">#12346</td>
                <td className="px-4 py-2 border-b">Fresh Oranges</td>
                <td className="px-4 py-2 border-b text-yellow-500">Pending</td>
                <td className="px-4 py-2 border-b">Jan 7, 2025</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">#12347</td>
                <td className="px-4 py-2 border-b">Fresh Red Apples</td>
                <td className="px-4 py-2 border-b text-red-500">Cancelled</td>
                <td className="px-4 py-2 border-b">Jan 6, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
