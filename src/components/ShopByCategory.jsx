import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShopByCategory.css';

import { Heart, ChevronRight, Star } from 'lucide-react';


const categories = [
  { name: "Millets", image: "/Category-Thumbnails/millets.png", link: "/our-products?category=MILLETS", desc: "Organic & Pure", color: "#3b82f6", shadow: "rgba(59, 130, 246, 0.4)" },
  { name: "Pure Honey", image: "/Category-Thumbnails/honey.png", link: "/our-products?category=HONEY", desc: "Wild & Raw", color: "#3b82f6", shadow: "rgba(59, 130, 246, 0.4)" },
  { name: "Cold Pressed", image: "/Category-Thumbnails/oils.png", link: "/our-products?category=CHEKKU OILS", desc: "Oils & Ghee", color: "#3b82f6", shadow: "rgba(59, 130, 246, 0.4)" },
  { name: "Trad. Rice", image: "/Category-Thumbnails/rice.png", link: "/our-products?category=TRADITIONAL RICE", desc: "Heritage Grains", color: "#3b82f6", shadow: "rgba(59, 130, 246, 0.4)" },
  { name: "Dry Fruits", image: "/Category-Thumbnails/dry_fruits.png", link: "/our-products?category=DRY FRUITS", desc: "Premium Nuts", color: "#3b82f6", shadow: "rgba(59, 130, 246, 0.4)" },
  { name: "Health Mix", image: "/Category-Thumbnails/health_mix.png", link: "/our-products?category=HEALTH MIX", desc: "Sathu Maavu", color: "#3b82f6", shadow: "rgba(59, 130, 246, 0.4)" },
  { name: "Snacks", image: "/Category-Thumbnails/snacks.png", link: "/our-products?category=SNACKS", desc: "Guilt-free", color: "#3b82f6", shadow: "rgba(59, 130, 246, 0.4)" },
  { name: "Care", image: "/Category-Thumbnails/care.png", link: "/our-products?category=BATH POWDERS", desc: "Herbal & Pure", color: "#3b82f6", shadow: "rgba(59, 130, 246, 0.4)" }
];

const ShopByCategory = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show arrows earlier on mobile devices
      const threshold = window.innerWidth < 768 ? 100 : 400;
      if (window.scrollY > threshold) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };
    
    // Check initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="shop-category-sec" style={{ position: 'relative' }}>
      <div className="container">
        <div className="section-header-center">
          <h2 className="section-title">
            <span className="section-title-text">Shop by Category</span>
          </h2>
          <p className="section-subtitle">Discover our wide range of 100% natural, farm-fresh products.</p>
        </div>

        <div className="exact-category-grid">
          {categories.map((cat, idx) => (
            <Link 
              to={`${cat.link}#products-grid`} 
              className="exact-card" 
              key={idx} 
              style={{ '--card-color': cat.color, '--card-shadow': cat.shadow }}
            >
              <div className="exact-img-wrapper">
                <div className="exact-img-blur-overlay"></div>
                <img src={cat.image} alt={cat.name} className="exact-img" loading="lazy" />
              </div>
              <h4 className="exact-title">{cat.desc}</h4>
              <div className="exact-price-row">
                <span className="exact-main-text">{cat.name}</span>
                <div className="exact-icon-btn" onClick={handleHeartClick}>
                  <Heart size={14} color="currentColor" fill="currentColor" />
                </div>
              </div>
              <div className="exact-bottom-row">
                <span className="exact-rating">
                  <Star size={12} fill="#fbbf24" color="#fbbf24" /> 5.0 Rating
                </span>
                <button className="exact-btn">Explore <ChevronRight size={14} /></button>
              </div>
            </Link>
          ))}
        </div>

        {/* Right-Side Vertical Navigation Controls */}
        <div className={`side-nav-container ${showNav ? 'visible' : 'hidden'}`}>
          <div 
            className="side-nav-arrow up" 
            onClick={() => window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' })}
            title="Go to previous section"
          >
            <ChevronRight size={26} strokeWidth={2.5} />
          </div>
          <div 
            className="side-nav-arrow down" 
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            title="Go to next section"
          >
            <ChevronRight size={26} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
