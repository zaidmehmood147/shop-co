const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// ---------- PRODUCT DATA (Read-only from JSON) ----------
const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');
const readProducts = () => {
  try {
    return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  } catch {
    return [];
  }
};

// ---------- IN-MEMORY STORAGE (for users, reviews) ----------
// Data resets on function restart – fine for demo
let users = [];
let reviews = [];
let userIdCounter = 1;
let reviewIdCounter = 1;

// ---------- PRODUCT ROUTES ----------
app.get('/api/products', (req, res) => {
  const products = readProducts();
  const { category, isNewArrival, isTopSelling, limit } = req.query;
  let filtered = products;
  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (isNewArrival === 'true') {
    filtered = filtered.filter(p => p.isNewArrival === true);
  }
  if (isTopSelling === 'true') {
    filtered = filtered.filter(p => p.isTopSelling === true);
  }
  if (limit) {
    filtered = filtered.slice(0, parseInt(limit));
  }
  res.json({ success: true, count: filtered.length, products: filtered });
});

app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
});

// ---------- USER AUTH (in-memory) ----------
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: userIdCounter++,
      name: name || 'User',
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ success: true, message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------- REVIEWS (in-memory) ----------
app.get('/api/products/:id/reviews', (req, res) => {
  const productId = parseInt(req.params.id);
  const productReviews = reviews.filter(r => r.productId === productId);
  res.json({ success: true, count: productReviews.length, reviews: productReviews });
});

app.post('/api/products/:id/reviews', (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }
  const newReview = {
    id: reviewIdCounter++,
    productId,
    name,
    rating: parseInt(rating),
    comment,
    date: new Date().toISOString()
  };
  reviews.push(newReview);
  res.status(201).json({ success: true, message: 'Review added', review: newReview });
});

module.exports = app;