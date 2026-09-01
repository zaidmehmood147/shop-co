import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart } from 'lucide-react';

const ProductSection = ({ title, viewAll, filter }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       import { API_URL } from '../api/config';

const response = await axios.get(`${API_URL}/products?${filter}`);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filter]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={12}
          className="inline sm:w-[14px] sm:h-[14px]"
          fill={i < fullStars ? '#FFC633' : 'none'}
          color={i < fullStars ? '#FFC633' : '#D1D5DB'}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center">Loading products...</div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center">No products found.</div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-integral font-bold">
          {title}
        </h2>
        {viewAll && (
          <Link 
            to="/products" 
            className="text-xs sm:text-sm font-medium border border-gray-300 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full hover:bg-gray-50 transition"
          >
            View All
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer block">
            <div className="bg-[#F0F0F0] rounded-lg overflow-hidden aspect-square relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
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
                {product.originalPrice && (
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
  );
};

export default ProductSection;