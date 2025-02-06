const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Counter', CounterSchema);