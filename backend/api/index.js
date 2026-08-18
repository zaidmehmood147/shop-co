const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Paths to JSON files (relative to this file)
const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');
const USERS_FILE = path.join(__dirname, '../data/users.json');

// Helper functions
const readProducts = () => {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// ---------- API Routes ----------

// Get all products (with filters)
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

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

// Get categories
app.get('/api/categories', (req, res) => {
  const products = readProducts();
  const categories = [...new Set(products.map(p => p.category))];
  res.json({ success: true, categories });
});

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const users = readUsers();
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      name: name || 'User',
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
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

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Export the app for Vercel
module.exports = app;