import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order for modal

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/orders/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch user orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/orders/${orderId}/status`, 
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
        toast.success(`Order status updated to ${newStatus}`);
      }
    } catch {
      setError('Failed to update order status');
      toast.error('Error updating order status');
    }
  };

  const calculateGrandTotal = (order) => {
    return order.items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);
  };

  const handleViewItems = (order) => {
    setSelectedOrder(order); // Open the modal with the selected order
  };

  const handleCloseModal = () => {
    setSelectedOrder(null); // Close the modal
  };

  // Get the background color class based on order status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-600 text-white';
      case 'Rejected':
        return 'bg-red-600 text-white';
      case 'Pending':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-gray-200 text-black';
    }
  };

  if (loading) return <p className="text-center text-xl">Loading orders...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left border-b">Order ID</th>
              <th className="px-6 py-3 text-left border-b">Order Date</th>
              <th className="px-6 py-3 text-left border-b">Phone</th>
              <th className="px-6 py-3 text-left border-b">Address</th>
              <th className="px-6 py-3 text-left border-b">Status</th>
              <th className="px-6 py-3 text-left border-b">Grand Total</th>
              <th className="px-6 py-3 text-left border-b">Actions</th>
              <th className="px-6 py-3 text-left border-b">Details</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition duration-200 border-b">
                <td className="px-6 py-4">{order.orderId}</td>
                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">{order.phone}</td>
                <td className="px-6 py-4">{order.address}</td>
                <td className={`px-6 py-4 ${getStatusClass(order.status)}`}>{order.status}</td>
                <td className="px-6 py-4">₹{calculateGrandTotal(order)}</td>
                <td className="px-6 py-4">
                  {order.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'Accepted')}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'Rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleViewItems(order)} 
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    View Items
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Viewing Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full"
            >
              X
            </button>
            <h3 className="text-xl font-semibold mb-4">Order: {selectedOrder._id}</h3>
            <p className="text-gray-700"><strong>User:</strong> {selectedOrder.user.name}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p className="text-gray-700"><strong>Address:</strong> {selectedOrder.address}</p>
            <p className="text-gray-700"><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Status:</strong> {selectedOrder.status}</p>
            <p className="text-gray-700"><strong>Grand Total:</strong> ₹{calculateGrandTotal(selectedOrder)}</p>
            
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Order Items</h4>
              <ul>
                {selectedOrder.items.map((item) => (
                  <li key={item.product._id} className="py-2">
                    {item.product.name} - {item.quantity} {item.unit} @ ₹{item.product.price}/unit
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              {selectedOrder.status === 'Pending' && (
                <>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder._id, 'Accepted')}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder._id, 'Rejected')}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
