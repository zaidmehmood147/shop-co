import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, color, quantity = 1) => {
    setIsLoading(true);
    const existingItem = cartItems.find(
      item => item.id === product.id && item.size === size && item.color === color
    );
    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      toast.success(`Added more ${product.name} to cart!`);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: size || 'M',
          color: color || '#000000',
          quantity: quantity,
          originalPrice: product.originalPrice,
          discount: product.discount
        }
      ]);
      toast.success(`${product.name} added to cart!`);
    }
    setIsLoading(false);
  };

  const removeFromCart = (id, size, color) => {
    setCartItems(
      cartItems.filter(
        item => !(item.id === id && item.size === size && item.color === color)
      )
    );
    toast.success('Item removed from cart');
  };

  const updateQuantity = (id, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, size, color);
      return;
    }
    setCartItems(
      cartItems.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.originalPrice) {
        return total + (item.originalPrice - item.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.originalPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getDeliveryFee = () => {
    const subtotal = getSubtotal();
    if (subtotal > 200) return 0;
    return 15;
  };

  const getGrandTotal = () => {
    return getCartTotal() + getDeliveryFee();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getCartDiscount,
        getSubtotal,
        getDeliveryFee,
        getGrandTotal,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};