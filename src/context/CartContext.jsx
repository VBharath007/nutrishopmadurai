import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('suriya_cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from local storage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('suriya_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const playCoinDropSound = () => {
    try {
      const audio = new Audio('/coin drop.mp3');
      audio.play().catch(e => console.warn("Audio playback prevented:", e));
    } catch (err) {
      console.error("Audio blocked or not supported", err);
    }
  };

  const flyToCart = (e, imgSrc) => {
    if (!e || !imgSrc) return;
    
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    
    const cartIcon = document.getElementById('global-cart-icon');
    if (!cartIcon) return;
    const cartRect = cartIcon.getBoundingClientRect();
    
    const clone = document.createElement('img');
    clone.src = imgSrc;
    clone.style.position = 'fixed';
    clone.style.top = `${buttonRect.top}px`;
    clone.style.left = `${buttonRect.left + buttonRect.width / 2 - 25}px`;
    clone.style.width = '50px';
    clone.style.height = '50px';
    clone.style.objectFit = 'cover';
    clone.style.borderRadius = '50%';
    clone.style.zIndex = '9999';
    clone.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    clone.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
    
    document.body.appendChild(clone);
    
    // Force reflow
    clone.getBoundingClientRect();
    
    clone.style.top = `${cartRect.top + cartRect.height / 2 - 10}px`;
    clone.style.left = `${cartRect.left + cartRect.width / 2 - 10}px`;
    clone.style.width = '20px';
    clone.style.height = '20px';
    clone.style.opacity = '0.5';
    
    setTimeout(() => {
      clone.remove();
      cartIcon.classList.add('cart-pop');
      playCoinDropSound(); // Play metallic coin sound when it lands!
      setTimeout(() => cartIcon.classList.remove('cart-pop'), 300);
    }, 800);
  };

  const addToCart = (product, quantity = 1, variant = null, e = null) => {
    if (e) {
      const imgSrc = product.images ? product.images[0] : product.image;
      flyToCart(e, imgSrc);
    }

    setCartItems(prevItems => {
      // Check if item with same id and variant exists
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedVariant === variant
      );

      if (existingItemIndex >= 0) {
        // Update quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity, selectedVariant: variant }];
      }
    });
  };

  const removeFromCart = (productId, variant = null) => {
    setCartItems(prevItems => 
      prevItems.filter(item => {
        const isSameProduct = item.id === productId;
        const isSameVariant = item.selectedVariant === variant || (!item.selectedVariant && !variant);
        return !(isSameProduct && isSameVariant);
      })
    );
  };

  const updateQuantity = (productId, variant = null, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.id === productId && item.selectedVariant === variant)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
