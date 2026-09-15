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
    console.error('getProducts error:', error);
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
    console.error('getProductById error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.name || !data.name.trim()) {
      return res.status(400).json({ success: false, message: 'Product name is required' });
    }
    if (!data.category) {
      return res.status(400).json({ success: false, message: 'Category is required' });
    }
    if (!data.price) {
      return res.status(400).json({ success: false, message: 'Price is required' });
    }

    data.price = Number(data.price);
    if (data.originalPrice) data.originalPrice = Number(data.originalPrice);
    if (data.discount) data.discount = Number(data.discount);
    if (data.rating) data.rating = Number(data.rating);
    if (data.reviews) data.reviews = Number(data.reviews);

    data.isTopSelling = data.isTopSelling === 'true' || data.isTopSelling === true;
    data.isNewArrival = data.isNewArrival === 'true' || data.isNewArrival === true;

    if (data.colors && typeof data.colors === 'string') {
      data.colors = data.colors.split(',').map(c => c.trim()).filter(Boolean);
    }

    if (data.sizes && typeof data.sizes === 'string') {
      data.sizes = data.sizes.split(',').map(s => s.trim()).filter(Boolean);
    } else if (!data.sizes) {
      data.sizes = ['S', 'M', 'L', 'XL'];
    }

    if (req.files && req.files.length > 0) {
      const main = req.files.find(f => f.fieldname === 'image');
      if (main) {
        const base64 = main.buffer.toString('base64');
        data.image = `data:${main.mimetype};base64,${base64}`;
      }

      const additional = req.files.filter(f => f.fieldname === 'additionalImages');
      if (additional.length > 0) {
        data.additionalImages = additional.map(f => `data:${f.mimetype};base64,${f.buffer.toString('base64')}`);
      }
    }

    if (!data.image) data.image = 'https://via.placeholder.com/600x600?text=No+Image';

    delete data.color;

    const product = await Product.create(data);
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('createProduct error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.price) data.price = Number(data.price);
    if (data.originalPrice) data.originalPrice = Number(data.originalPrice);
    if (data.discount) data.discount = Number(data.discount);
    if (data.rating) data.rating = Number(data.rating);

    data.isTopSelling = data.isTopSelling === 'true' || data.isTopSelling === true;
    data.isNewArrival = data.isNewArrival === 'true' || data.isNewArrival === true;

    if (data.colors && typeof data.colors === 'string') {
      data.colors = data.colors.split(',').map(c => c.trim()).filter(Boolean);
    }

    if (req.files && req.files.length > 0) {
      const main = req.files.find(f => f.fieldname === 'image');
      if (main) {
        const base64 = main.buffer.toString('base64');
        data.image = `data:${main.mimetype};base64,${base64}`;
      }
    }

    delete data.color;

    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, product });
  } catch (error) {
    console.error('updateProduct error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    console.error('deleteProduct error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };