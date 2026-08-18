import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Star, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Category = () => {
  const { category } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState('default');

  const colors = ['#000000', '#FFFFFF', '#FF6B6B', '#4A90D9', '#2E7D32', '#8B4513'];
  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large'];

  const getCategoryName = () => {
    if (category === 'casual') return 'Casual';
    if (category === 'formal') return 'Formal';
    if (category === 'party') return 'Party';
    if (category === 'gym') return 'Gym';
    return category || 'All Products';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:5000/api/products';
        const params = new URLSearchParams();
        
        if (category && category !== 'all') {
          params.append('category', category.charAt(0).toUpperCase() + category.slice(1));
        }
        
        // Add price filter
        if (priceRange[0] > 0) params.append('minPrice', priceRange[0]);
        if (priceRange[1] < 1000) params.append('maxPrice', priceRange[1]);
        
        // Add color filter
        if (selectedColors.length > 0) {
          params.append('colors', selectedColors.join(','));
        }
        
        // Add size filter
        if (selectedSizes.length > 0) {
          params.append('sizes', selectedSizes.join(','));
        }
        
        const response = await axios.get(`${url}?${params.toString()}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [category, priceRange, selectedColors, selectedSizes]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i < fullStars ? '#FFC633' : 'none'}
          color={i < fullStars ? '#FFC633' : '#D1D5DB'}
          className="inline"
        />
      );
    }
    return stars;
  };

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortBy('default');
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          Loading products...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-black font-medium">{getCategoryName()}</span>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="container mx-auto px-4 mb-4 lg:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-black text-white px-4 py-3 rounded-full flex items-center justify-center gap-2 text-sm font-medium"
        >
          <SlidersHorizontal size={18} />
          Filters
          {(selectedColors.length > 0 || selectedSizes.length > 0) && (
            <span className="bg-white text-black text-xs px-2 py-0.5 rounded-full">
              {selectedColors.length + selectedSizes.length}
            </span>
          )}
        </button>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Filters */}
          <div className={`
            lg:block lg:w-64 flex-shrink-0
            ${showFilters ? 'block' : 'hidden'}
            fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:static lg:p-0
          `}>
            {/* Mobile close button */}
            <button
              onClick={() => setShowFilters(false)}
              className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>

            <h3 className="text-lg font-bold mb-6">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Price</h4>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">${priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1 accent-black"
                />
                <span className="text-sm text-gray-500">${priceRange[1]}</span>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Colors</h4>
              <div className="flex flex-wrap gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => toggleColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      selectedColors.includes(color) ? 'border-black ring-2 ring-black ring-offset-2' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Size</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      selectedSizes.includes(size)
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply / Clear */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-black text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition"
              >
                Apply Filter
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Overlay for mobile */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{getCategoryName()}</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Showing {products.length} Products
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:border-black"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-black underline hover:no-underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
                    <div className="bg-[#F0F0F0] rounded-lg overflow-hidden aspect-square relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-xs sm:text-sm truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {renderStars(product.rating)}
                        <span className="text-[10px] text-gray-500 ml-1">{product.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-bold text-sm sm:text-base">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-xs">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Category;