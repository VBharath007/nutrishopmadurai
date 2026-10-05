import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './WishlistDrawer.css';
import { X, Trash2, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';

const WishlistDrawer = ({ isWishlistOpen, setIsWishlistOpen }) => {
  const { wishlistItems, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleMoveToCart = (product, e) => {
    addToCart(product, 1, product.variants ? product.variants[0].size : null, e);
    toggleWishlist(product); // Remove from wishlist
    setIsWishlistOpen(false);
  };

  const handleContinueShopping = () => {
    setIsWishlistOpen(false);
    navigate('/shop');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`wishlist-backdrop ${isWishlistOpen ? 'open' : ''}`} 
        onClick={() => setIsWishlistOpen(false)}
      ></div>

      {/* Drawer */}
      <div className={`wishlist-drawer ${isWishlistOpen ? 'open' : ''}`}>
        
        {/* Header */}
        <div className="wishlist-header">
          <div className="wishlist-title">
            <div className="icon-wrapper">
              <Heart size={24} fill="currentColor" stroke="currentColor" />
            </div>
            <h2>Wishlist</h2>
          </div>
          <button className="close-wishlist-btn" onClick={() => setIsWishlistOpen(false)} aria-label="Close Wishlist">
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Items */}
        <div className="wishlist-items">
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist-msg">
              <div className="empty-cart-icon">
                <Heart size={48} fill="currentColor" stroke="currentColor" className="colorful-heart-icon" />
              </div>
              <p>Nothing here yet</p>
              <span>Explore our premium collections and add your favorites to the wishlist.</span>
              <button className="continue-shopping-btn" onClick={handleContinueShopping}>
                Discover Products
              </button>
            </div>
          ) : (
            wishlistItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="wishlist-item" style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className="wishlist-item-img">
                  <img src={item.images ? item.images[0] : item.image} alt={item.name} />
                </div>
                <div className="wishlist-item-details">
                  <h4>{item.name}</h4>
                  <span className="wishlist-item-price">₹{item.price}</span>
                  <button 
                    className="move-to-cart-btn" 
                    onClick={(e) => handleMoveToCart(item, e)}
                  >
                    <ShoppingBag size={16} strokeWidth={2.5} /> Add to Cart
                  </button>
                </div>
                <button 
                  className="remove-item-btn" 
                  onClick={() => toggleWishlist(item)}
                  aria-label="Remove from Wishlist"
                >
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default WishlistDrawer;
