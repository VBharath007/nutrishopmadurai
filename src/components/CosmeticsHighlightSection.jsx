import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { cosmeticProductsData } from '../data/cosmeticsProducts';
import './CosmeticsHighlightSection.css';

const CosmeticsHighlightSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Cycle between hm1 and hm3
  const banners = ['/cosbanner/hm1.png', '/cosbanner/hm3.png'];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Grab top 4 different cosmetic items to display
  const featuredCosmetics = cosmeticProductsData.slice(8, 12);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, null, e);
  };

  const handleCardClick = (product) => {
    navigate(`/product/${product.slug}`, { state: { product } });
  };

  return (
    <section className="cosmetics-highlight-wrapper">
      <div className="cosmetics-hl-container">
        {/* Left Side: Catchy Banner */}
        <div className="cosmetics-hl-banner">
          <img src={banners[currentBanner]} alt="Natural Cosmetics" className="hl-banner-img" />
          <div className="hl-banner-overlay">
            <p>100% pure, Ayurvedic, and handcrafted for your radiant glow.</p>
            <button className="hl-shop-btn" onClick={() => navigate('/ayurvedic-personal-care')}>
              Explore More
            </button>
          </div>
        </div>

        {/* Right Side: Product Grid */}
        <div className="cosmetics-hl-products">
          <div className="hl-section-header">
            <h3>Pure Beauty, Rooted in <span className="hl-blink-text">Ayurveda</span></h3>
            <div className="hl-line"></div>
          </div>
          
          <div className="hl-grid">
            {featuredCosmetics.map(product => (
              <div 
                className="hl-product-card" 
                key={product.id}
                onClick={() => handleCardClick(product)}
              >
                <div className="hl-card-img-wrap">

                  <img src={product.images[0]} alt={product.name} />
                </div>
                <div className="hl-card-info">
                  <h4>{product.name}</h4>
                  <div className="hl-price-row">
                    <span className="hl-price">₹{product.price}</span>

                  </div>
                  <button 
                    className="hl-add-btn" 
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CosmeticsHighlightSection;
