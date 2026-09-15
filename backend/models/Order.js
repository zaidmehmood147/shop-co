const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    size: String,
    color: String,
    image: String
  }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  address: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);