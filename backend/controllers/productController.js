const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { category, isNewArrival, isTopSelling, limit } = req.query;
    let query = {};
    if (category) query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    if (isNewArrival === 'true') query.isNewArrival = true;
    if (isTopSelling === 'true') query.isTopSelling = true;

    let q = Product.find(query).sort({ createdAt: -1 });
    if (limit) q = q.limit(parseInt(limit));

    const products = await q;
const formatted = products.map(p => ({
  id: p._id.toString(),
  _id: p._id,
  name: p.name,
  category: p.category,
  subCategory: p.subCategory,
  gender: p.gender,
  price: p.price,
  originalPrice: p.originalPrice,
  discount: p.discount,
  rating: p.rating,
  reviews: p.reviews,
  image: p.image,
  sizes: p.sizes,
  colors: p.colors,
  description: p.description,
  isNewArrival: p.isNewArrival,
  isTopSelling: p.isTopSelling
}));
res.json({ success: true, count: formatted.length, products: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
if (!product) return res.status(404).json({ success: false, message: 'Not found' });
res.json({
  success: true,
  product: {
    id: product._id.toString(),
    _id: product._id,
    name: product.name,
    category: product.category,
    subCategory: product.subCategory,
    gender: product.gender,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    rating: product.rating,
    reviews: product.reviews,
    image: product.image,
    sizes: product.sizes,
    colors: product.colors,
    description: product.description,
    isNewArrival: product.isNewArrival,
    isTopSelling: product.isTopSelling
  }
});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    if (data.sizes && typeof data.sizes === 'string') {
      data.sizes = data.sizes.split(',').map(s => s.trim());
    }
    if (data.colors && typeof data.colors === 'string') {
      data.colors = data.colors.split(',').map(c => c.trim());
    }
    const product = await Product.create(data);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };