// models/Order.js
const mongoose = require('mongoose');
const Counter = require('./counter');  // Import Counter model

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      unit: {
        type: String,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  totalOrderPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Accepted', 'Pending', 'Rejected', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to set orderId and increment counter
OrderSchema.pre('save', async function (next) {
  try {
    const order = this;

    let counter = await Counter.findOne({ userId: order.user });
    if (!counter) {
      counter = new Counter({ userId: order.user });
    }

    order.orderId = counter.orderCount.toString().padStart(3, '0');
    counter.orderCount += 1;
    await counter.save();

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Order', OrderSchema);
