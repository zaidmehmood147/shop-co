const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subCategory: { type: String, default: 'Shirts' },
  category: { type: String, required: true },
  gender: { type: String, default: 'Men' },
  style: { type: String, default: '' },
  dressCode: { type: String, default: 'Shirts' },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  image: { type: String, default: '' },
  additionalImages: { type: [String], default: [] },
  sizes: { type: [String], default: ['S', 'M', 'L', 'XL'] },
  colors: { type: [String], default: ['#000000'] },
  description: { type: String, default: '' },
  isNewArrival: { type: Boolean, default: false },
  isTopSelling: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);