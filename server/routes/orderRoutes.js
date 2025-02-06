const express = require('express');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new order - protected by 'protect' middleware
router.post('/', protect, createOrder);   // Place a new order

// Route to get all orders of a user - protected by 'protect' middleware
router.get('/', protect, getUserOrders);  // Fetch user orders

// Admin route to fetch all orders - protected by 'protect' and 'admin' middleware
router.get('/all', protect, admin, getAllOrders);  // Admin: fetch all orders

// Admin route to update the order status - protected by 'protect' and 'admin' middleware
router.put('/:id/status', protect, admin, updateOrderStatus);  // Admin: update order status

// Middleware to validate address and phone for order creation
router.post('/', protect, (req, res, next) => {
  const { address, phone } = req.body;

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  next();
}, createOrder);

module.exports = router;
