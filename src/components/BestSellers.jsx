import React, { useContext, useState } from 'react';
import { Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { productsData } from '../data/products';
import './BestSellers.css';

const BestSellers = () => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState({});
  const [beatingHearts, setBeatingHearts] = useState({});

  const handleAddToCart = (product, e) => {
    addToCart(product, 1, null, e);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Find exact products from database by slug
  const bestSellersSlugs = ['hill-honey', 'kadalaennai', 'thinai-arisi', 'a2-ghee'];
  const bestSellersData = bestSellersSlugs.map(slug => {
    return productsData.find(p => p.slug === slug);
  }).filter(Boolean);

  return (
    <section className="best-sellers-section">
      <div className="bs-bg-pattern"></div>
      
      <div className="container bs-container">
        <div className="bs-header">
          <h2 className="bs-title">
            <span className="bs-title-icon">🌟</span>
            <span className="bs-title-text">Best Sellers</span>
          </h2>
          <p className="bs-subtitle">Our most loved products, trusted by thousands of happy customers.</p>
        </div>
        
        <div className="bs-grid-wrapper">
          <div className="bs-grid">
            {bestSellersData.map(product => (
              <div key={product.id} className="bs-card group">
                <div className="bs-image-container">
                  <div className="bs-image-glow"></div>
                  <Link to={`/product/${product.slug}`}>
                    <img src={product.images[0]} alt={product.name} className="bs-product-image" />
                  </Link>
                  
                  <div className="bs-badge">Best Seller</div>
                  <button 
                    className={`bs-wishlist ${isInWishlist(product.id) ? 'active' : ''} ${beatingHearts[product.id] ? 'heartbeat-anim' : ''}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const isAdding = !isInWishlist(product.id);
                      toggleWishlist(product);
                      if (isAdding) {
                        setBeatingHearts(prev => ({ ...prev, [product.id]: true }));
                        setTimeout(() => {
                          setBeatingHearts(prev => ({ ...prev, [product.id]: false }));
                        }, 600);
                      }
                    }}
                  >
                    <Heart size={18} fill={isInWishlist(product.id) ? "#ef4444" : "none"} color={isInWishlist(product.id) ? "#ef4444" : "currentColor"} />
                  </button>
                </div>
                
                <div className="bs-details">
                  <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="bs-name">{product.name}</h3>
                  </Link>
                  <p className="bs-desc">{product.description || "Pure and authentic quality product."}</p>
                  
                  <div className="bs-rating-row">
                    <div className="bs-stars">
                      <Star size={16} fill="#fbbf24" color="#fbbf24" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="bs-reviews">({product.reviews})</span>
                  </div>
                  
                  <div className="bs-price-row">
                    <span className="bs-price">₹{product.price}</span>
                  </div>
                  
                  <button 
                    className={`bs-add-btn ${addedItems[product.id] ? 'added' : ''}`} 
                    style={{ position: 'relative' }}
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingBag size={18} />
                    {addedItems[product.id] ? (
                      <>
                        Added
                        <span className="burst-particles">
                          <span className="particle p1"></span>
                          <span className="particle p2"></span>
                          <span className="particle p3"></span>
                          <span className="particle p4"></span>
                          <span className="particle p5"></span>
                          <span className="particle p6"></span>
                        </span>
                      </>
                    ) : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bs-view-all">
          <button className="bs-view-btn" onClick={() => navigate('/our-products')}>
            View All Products <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
