const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
    const token = jwt.sign({ id: admin._id, email: admin.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: 'admin' }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({ name, email, password: hashedPassword, role: 'admin' });
    res.status(201).json({
      success: true,
      user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    const totalTopSelling = await Product.countDocuments({ isTopSelling: true });
    const totalCategories = (await Product.distinct('category')).length;

    const categoryCounts = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const recentUsers = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    const topSellingProducts = await Product.find({ isTopSelling: true })
      .sort({ rating: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: { totalUsers, totalProducts, totalTopSelling, totalCategories },
      categoryCounts,
      recentUsers,
      topSellingProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { adminLogin, createAdmin, getStats };