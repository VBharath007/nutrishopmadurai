import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, ShoppingBag } from 'lucide-react';
import './TrendingThisWeek.css';

const trendingProducts = [
  { id: 1, name: "A2 Desi Cow Ghee", image: "/trending-images/ghee.png", price: "₹650", category: "Pure Dairy", tag: "Bestseller" },
  { id: 2, name: "Hill Honey", image: "/trending-images/hillhoney.png", price: "₹450", category: "Raw Organic", tag: "New" },
  { id: 3, name: "Groundnut Oil", image: "/trending-images/oil.png", price: "₹280", category: "Cold Pressed", tag: "Trending" },
  { id: 4, name: "Palm Jaggery", image: "/trending-images/karupatti.png", price: "₹180", category: "Sweeteners", tag: "Traditional" },
  { id: 5, name: "Thinai Millet", image: "/trending-images/thinai.png", price: "₹120", category: "Millets", tag: "Healthy" },
  { id: 6, name: "Dry Fruits Honey", image: "/category-images/honey.png", price: "₹550", category: "Specialty", tag: "Premium" },
  { id: 7, name: "Moringa Tea", image: "/category-images/healthmix.png", price: "₹190", category: "Herbal Teas", tag: "Immunity" },
  { id: 8, name: "Millet Cookies", image: "/category-images/snacks.png", price: "₹99", category: "Snacks", tag: "Kids Favorite" }
];

const TrendingThisWeek = () => {
  return (
    <section className="trending-section">
      <div className="container">
        <div className="trending-header-centered">
          <h2 className="trending-title">
            <Flame className="trending-icon" size={32} /> Trending This Week
          </h2>
          <p className="trending-subtitle">Swipe to discover the most loved natural products.</p>
        </div>

        <div className="trending-carousel">
          {trendingProducts.map((product, index) => (
            <div key={product.id} className="t-card">
              <div className="t-badge">#{index + 1} Trending</div>
              <img src={product.image} alt={product.name} className="t-image" />
              
              <div className="t-glass-panel">
                <div className="t-panel-top">
                  <span className="t-category">{product.category}</span>
                  <span className="t-price">{product.price}</span>
                </div>
                <h3 className="t-name">{product.name}</h3>
                
                <div className="t-reveal-action">
                  <Link to="/our-products" className="t-buy-btn">
                    <ShoppingBag size={18} /> Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="trending-footer">
          <Link to="/our-products" className="view-all-btn-centered">
            View All Trending <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingThisWeek;
