const Order = require('../models/Order');
const Product = require('../models/Product');
const Counter = require('../models/counter');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, address, phone } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    if (!address) {
      return res.status(400).json({ message: 'Address is required' });
    }

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    let totalOrderPrice = 0;
    const orderItems = [];

    // Loop through each item to validate and calculate total price
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product} not found` });
      }

      // Ensure unit is provided for each item
      if (!item.unit) {
        return res.status(400).json({ message: `Unit is required for product ${item.name}` });
      }

      const totalPrice = product.price * item.quantity;
      totalOrderPrice += totalPrice;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        unit: item.unit, // Ensure unit is added here
        totalPrice,
      });
    }

    // Handle Counter for orderId
    let counter = await Counter.findOne({ userId: req.user.id });
    if (!counter) {
      counter = new Counter({ userId: req.user.id, orderCount: 1 });
    } else {
      counter.orderCount += 1;
    }
    await counter.save();

    // Create the order and handle automatic orderId generation
    const order = new Order({
      user: req.user.id,
      userName: req.user.name,
      address,
      phone,
      items: orderItems,
      totalOrderPrice,
      orderId: counter.orderCount.toString().padStart(3, '0'),  // Auto generate orderId
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Get all orders for the logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });  // Sort orders by most recent
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
  }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve all orders', error: error.message });
  }
};

// Admin: Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Accepted', 'Rejected', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
};
