import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../api/config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartDiscount,
    getSubtotal,
    getDeliveryFee,
    getGrandTotal
  } = useCart();

  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE20') {
      alert('Promo code applied!');
    } else {
      alert('Invalid promo code');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <ShoppingBag size={32} className="text-gray-400 sm:w-10 sm:h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6">Looks like you haven't added any items yet.</p>
            <Link
              to="/"
              className="inline-block bg-black text-white px-8 sm:px-10 py-3 rounded-full hover:bg-gray-800 transition text-sm sm:text-base font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-black font-medium">Cart</span>
      </div>

      <section className="flex-1 container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">YOUR CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-3 sm:space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex gap-4 sm:gap-6 border border-gray-200 rounded-xl p-4 sm:p-6">
                  <div className="w-20 sm:w-24 h-20 sm:h-24 bg-[#F0F0F0] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm sm:text-base truncate">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Size: {item.size}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-xs sm:text-sm text-gray-500">Color:</span>
                          <span
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="font-bold text-sm sm:text-base min-w-[60px] text-right">
                          ${(item.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      <div className="flex items-center bg-gray-100 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm font-bold hover:text-gray-600 transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm font-medium min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm font-bold hover:text-gray-600 transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-xl p-4 sm:p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${getSubtotal().toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Discount</span>
                  <span className="text-red-500 font-medium">-${getCartDiscount().toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-medium">
                    {getDeliveryFee() === 0 ? 'Free' : `$${getDeliveryFee().toFixed(0)}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span>${getGrandTotal().toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Add promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-black"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-black text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 mt-4"
              >
                Sign in to Checkout
                <ArrowRight size={18} />
              </Link>
              <p className="text-xs text-gray-400 text-center mt-3">
                Your cart will be saved to your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;