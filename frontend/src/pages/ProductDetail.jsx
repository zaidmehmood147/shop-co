import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_URL, getImageUrl } from '../api/config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart } = useCart();

  const faqs = [
    { id: 1, question: 'What is the delivery time?', answer: 'Standard delivery takes 3-5 working days. Express delivery is next day for orders placed before 4pm.' },
    { id: 2, question: 'Can I return this item?', answer: 'Yes, we offer a 30-day return policy. Items must be unworn and in original packaging.' },
    { id: 3, question: 'How do I choose the right size?', answer: 'Check our size guide on the product page. We also offer free exchanges if the size doesn\'t fit.' },
    { id: 4, question: 'What materials are used?', answer: 'We use 100% organic cotton for all our products, ensuring comfort and sustainability.' }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        const productData = response.data.product;
        setProduct(productData);
        setSelectedColor(productData.colors?.[0] || '');
        setSelectedSize(productData.sizes?.[0] || '');

        const relatedRes = await axios.get(
          `${API_URL}/products?category=${productData.category}&limit=5`
        );
        let related = relatedRes.data.products.filter(p => p.id !== id);
        if (related.length < 4) {
          const needed = 4 - related.length;
          const otherResponse = await axios.get(`${API_URL}/products?limit=${needed + 1}`);
          const otherProducts = otherResponse.data.products.filter(
            p => p.id !== id && !related.some(r => r.id === p.id)
          );
          related = [...related, ...otherProducts];
        }
        setRelatedProducts(related.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} size={16} fill={i < fullStars ? '#FFC633' : 'none'} color={i < fullStars ? '#FFC633' : '#D1D5DB'} className="inline" />
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedSize, selectedColor, quantity);
    setTimeout(() => setIsAdding(false), 500);
  };

  const toggleFAQ = (id) => setOpenFAQ(openFAQ === id ? null : id);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">Loading product...</div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">›</span>
        <Link to="/products" className="hover:text-black">Shop</Link>
        <span className="mx-2">›</span>
        <span className="text-black">{product.category}</span>
        <span className="mx-2">›</span>
        <span className="text-black font-medium">{product.name}</span>
      </div>

      <section className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative">
            <div className="bg-[#F0F0F0] rounded-2xl overflow-hidden aspect-square">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                }}
              />
            </div>
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{product.discount}%
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-500">{product.rating}/5</span>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-500">{product.reviews} Reviews</span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice > 0 && (
                <>
                  <span className="text-gray-400 line-through text-xl">${product.originalPrice}</span>
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              {product.description || 'High-quality product designed for comfort and style.'}
            </p>

            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-sm mb-2">Select Colors</h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-sm mb-2">Choose Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="flex items-center bg-gray-100 rounded-full">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-lg font-bold hover:text-gray-600 transition">-</button>
                <span className="px-4 py-3 text-lg font-medium min-w-[40px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-lg font-bold hover:text-gray-600 transition">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart size={20} />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>

            <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-gray-200">
                <div className="p-3 bg-gray-50 font-medium text-sm">Material</div>
                <div className="p-3 text-sm">100% Organic Cotton</div>
                <div className="p-3 bg-gray-50 font-medium text-sm">Fit</div>
                <div className="p-3 text-sm">Regular</div>
                <div className="p-3 bg-gray-50 font-medium text-sm">Care</div>
                <div className="p-3 text-sm">Machine wash at 30°</div>
                <div className="p-3 bg-gray-50 font-medium text-sm">Style</div>
                <div className="p-3 text-sm">Essentials</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 sm:py-12 border-t border-gray-200">
        <div className="flex flex-wrap border-b border-gray-200 mb-6">
          <button onClick={() => setActiveTab('details')} className={`pb-3 px-4 sm:px-6 font-medium text-sm transition ${activeTab === 'details' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>Product Details</button>
          <button onClick={() => setActiveTab('reviews')} className={`pb-3 px-4 sm:px-6 font-medium text-sm transition ${activeTab === 'reviews' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>Rating & Reviews</button>
          <button onClick={() => setActiveTab('faq')} className={`pb-3 px-4 sm:px-6 font-medium text-sm transition ${activeTab === 'faq' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>FAQs</button>
        </div>

        {activeTab === 'details' && (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <div className="p-3 bg-gray-50 font-medium text-sm">Material</div>
              <div className="p-3 text-sm">100% Organic Cotton</div>
              <div className="p-3 bg-gray-50 font-medium text-sm">Fit</div>
              <div className="p-3 text-sm">Regular</div>
              <div className="p-3 bg-gray-50 font-medium text-sm">Care</div>
              <div className="p-3 text-sm">Machine wash at 30°</div>
              <div className="p-3 bg-gray-50 font-medium text-sm">Style</div>
              <div className="p-3 text-sm">Essentials</div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">All Reviews ({product.reviews || 0})</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-500">No reviews yet for this product.</p>
              <p className="text-sm text-gray-400 mt-2">Be the first to review!</p>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => toggleFAQ(faq.id)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition">
                  <span className="font-medium text-sm">{faq.question}</span>
                  {openFAQ === faq.id ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                </button>
                {openFAQ === faq.id && (
                  <div className="p-4 pt-0 text-sm text-gray-600 border-t border-gray-100">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-8 sm:py-12 border-t border-gray-200">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">YOU MIGHT ALSO LIKE</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map((item) => (
              <Link to={`/product/${item.id}`} key={item.id} className="group cursor-pointer">
                <div className="bg-[#F0F0F0] rounded-lg overflow-hidden aspect-square relative">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-{item.discount}%</div>
                  )}
                </div>
                <div className="mt-2">
                  <h3 className="font-medium text-xs sm:text-sm truncate">{item.name}</h3>
                  <div className="flex items-center gap-0.5 mt-1">
                    {renderStars(item.rating)}
                    <span className="text-xs text-gray-500 ml-1">{item.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-sm sm:text-base">${item.price}</span>
                    {item.originalPrice > 0 && (
                      <span className="text-gray-400 line-through text-xs sm:text-sm">${item.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;