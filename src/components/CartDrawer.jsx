import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';
import { X, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const playPopperSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    // 1. White Noise "POP"
    const bufferSize = ctx.sampleRate * 0.1; // 100ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // white noise
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 1000;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(ctx.currentTime);

    // 2. Celebratory Chimes (Major Chord Arpeggio)
    const playNote = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    const now = ctx.currentTime;
    playNote(523.25, now + 0.05, 0.4); // C5
    playNote(659.25, now + 0.15, 0.4); // E5
    playNote(783.99, now + 0.25, 0.6); // G5
    playNote(1046.50, now + 0.35, 1.0); // C6

  } catch (e) {
    console.warn("Audio not supported");
  }
};

const CartDrawer = ({ isCartOpen, setIsCartOpen }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const prevTotalRef = useRef(cartTotal);

  // Trigger sound only when crossing the 500 threshold
  useEffect(() => {
    if (prevTotalRef.current < 1999 && cartTotal >= 1999) {
      playPopperSound();
    }
    prevTotalRef.current = cartTotal;
  }, [cartTotal]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`cart-backdrop ${isCartOpen ? 'open' : ''}`} 
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={20} />
            <h2>Your Cart ({cartCount})</h2>
          </div>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        {cartItems.length > 0 && (
          <div className="free-shipping-tracker">
            <div className="tracker-message">
              {cartTotal >= 1999 ? (
                <span className="free-shipping-success">
                  <span>Congratulations! You qualify for <strong>Free Shipping</strong>!</span>
                </span>
              ) : (
                <span className="free-shipping-needed">
                  <span>Add <strong>₹{1999 - cartTotal}</strong> more for <strong>Free Shipping</strong>!</span>
                </span>
              )}
            </div>
            <div className="tracker-progress-bg">
              <div 
                className="tracker-progress-fill" 
                style={{ width: `${Math.min((cartTotal / 1999) * 100, 100)}%` }}
              >
                {/* Moving Truck Icon on the progress bar */}
                <div className="moving-truck" style={{ opacity: cartTotal > 0 ? 1 : 0 }}>
                  <Truck size={20} color="#3b82f6" />
                  {/* Beautiful Confetti Fountain Effect */}
                  {cartTotal >= 1999 && (
                    <div className="confetti-fountain">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className={`confetti-piece c${i + 1}`}></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart-msg">
              <div className="empty-cart-icon">
                <ShoppingBag size={48} className="colorful-bag-icon" />
              </div>
              <p>Your cart feels a bit lonely.</p>
              <button className="continue-shopping-btn" onClick={() => setIsCartOpen(false)}>
                Explore Products
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.id}-${item.selectedVariant}-${idx}`} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.images ? item.images[0] : item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  {item.selectedVariant && <p className="cart-item-variant">Size: {item.selectedVariant}</p>}
                  <div className="cart-item-price-row">
                    <span className="cart-item-price">₹{item.price}</span>
                    
                    <div className="qty-controls">
                      <button onClick={() => updateQuantity(item.id, item.selectedVariant, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedVariant, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                </div>
                <button 
                  className="remove-item-btn" 
                  onClick={() => removeFromCart(item.id, item.selectedVariant)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span className="subtotal-amt">₹{cartTotal}</span>
            </div>
            <p className="shipping-text">Taxes and shipping calculated at checkout</p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default CartDrawer;
