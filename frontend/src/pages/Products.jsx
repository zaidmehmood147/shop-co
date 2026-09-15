import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart } from 'lucide-react';
import { API_URL, getImageUrl } from '../api/config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">Loading products...</div>
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
        <span className="text-black font-medium">All Products</span>
      </div>

      <section className="container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">All Products</h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer block">
              <div className="bg-[#F0F0F0] rounded-lg overflow-hidden aspect-square relative">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />
                {product.discount > 0 && (
                  <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-500 text-white text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                    -{product.discount}%
                  </div>
                )}
                <button className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-white p-1 sm:p-1.5 md:p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
                  <ShoppingCart size={14} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
                </button>
              </div>

              <div className="mt-1.5 sm:mt-2 md:mt-3">
                <h3 className="font-medium text-[10px] sm:text-xs md:text-sm lg:text-base truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                  {renderStars(product.rating)}
                  <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 ml-0.5 sm:ml-1">
                    {product.rating}/5
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                  <span className="font-bold text-xs sm:text-sm md:text-base lg:text-lg">
                    ${product.price}
                  </span>
                  {product.originalPrice > 0 && (
                    <span className="text-gray-400 line-through text-[8px] sm:text-[10px] md:text-sm">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;