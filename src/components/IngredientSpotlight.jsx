import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ShoppingBag, Flame, ArrowRight } from 'lucide-react';
import './IngredientSpotlight.css';

const grassBg = "https://images.unsplash.com/photo-1533460004989-cef01064af7e?q=80&w=2070&auto=format&fit=crop";

const shoppableHotspots = [
  {
    id: 1, top: '25%', left: '15%', direction: 'down',
    name: "A2 Desi Cow Ghee", image: "/trending-images/ghee.png", price: "₹650", slug: "a2-ghee"
  },
  {
    id: 2, top: '20%', left: '45%', direction: 'down',
    name: "Hill Honey", image: "/trending-images/hillhoney.png", price: "₹450", slug: "hill-honey"
  },
  {
    id: 3, top: '65%', left: '85%', direction: 'up',
    name: "Groundnut Oil", image: "/trending-images/oil.png", price: "₹280", slug: "kadalaennai"
  },
  {
    id: 4, top: '50%', left: '25%', direction: 'down',
    name: "Karupatti", image: "/trending-images/karupatti.png", price: "₹180", slug: "karupatti"
  },
  {
    id: 5, top: '80%', left: '15%', direction: 'up',
    name: "Thinai Millet", image: "/trending-images/thinai.png", price: "₹120", slug: "thinai-arisi"
  },
  {
    id: 6, top: '35%', left: '75%', direction: 'down',
    name: "Dry Fruits Honey", image: "/category-images/honey.png", price: "₹550", slug: "dry-fruits-honey"
  },
  {
    id: 7, top: '50%', left: '60%', direction: 'down',
    name: "Moringa Tea", image: "/category-images/healthmix.png", price: "₹190", slug: "moringa-tea"
  },
  {
    id: 8, top: '75%', left: '50%', direction: 'up',
    name: "Millet Cookies", image: "/category-images/snacks.png", price: "₹99", slug: "mm-thinai-cookies"
  }
];

const IngredientSpotlight = () => {
  const [activeSpot, setActiveSpot] = useState(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const fullTitle = "Trending This Week";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullTitle.length) {
        setDisplayedTitle(fullTitle.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  const toggleSpot = (id) => {
    if (activeSpot === id) {
      setActiveSpot(null);
    } else {
      setActiveSpot(id);
    }
  };

  return (
    <section className="spotlight-immersive">
      {/* Top Wave */}
      <div className="custom-shape-divider-top">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="spotlight-bg-container" style={{ backgroundImage: `url(${grassBg})` }}>
        <div className="spotlight-overlay"></div>
        
        <div className="spotlight-content container">
          <div className="spotlight-header-immersive">
            <h2 className="spotlight-title">
              {displayedTitle}
              <span className="typewriter-cursor">|</span>
            </h2>
            <p className="spotlight-subtitle">Explore our fresh, natural picks directly from the field.</p>
            <div className="spotlight-hint">
              <span className="hint-pulse-dot"></span> Tap the bag icons to discover products
            </div>
          </div>

          <div className="hotspots-area">
            {shoppableHotspots.map((spot) => {
              const leftPos = parseFloat(spot.left);
              let positionClass = '';
              if (leftPos <= 35) positionClass = 'hotspot-left';
              else if (leftPos >= 65) positionClass = 'hotspot-right';
              
              return (
              <div 
                key={spot.id} 
                className={`hotspot ${positionClass} ${activeSpot === spot.id ? 'active' : ''} ${spot.direction === 'up' ? 'tooltip-up' : 'tooltip-down'}`}
                style={{ top: spot.top, left: spot.left }}
                onMouseEnter={() => setActiveSpot(spot.id)}
                onMouseLeave={() => setActiveSpot(null)}
                onClick={() => toggleSpot(spot.id)}
              >
                <div className="hotspot-pulse">
                  <ShoppingBag size={18} className="hotspot-icon" strokeWidth={2.5} />
                </div>
                
                <div className="hotspot-tooltip product-tooltip">
                  <div className="pt-image-container">
                    <img src={spot.image} alt={spot.name} />
                  </div>
                  <div className="pt-details">
                    <h4>{spot.name}</h4>
                    <p className="pt-price">{spot.price}</p>
                    <Link to={`/product/${spot.slug}`} className="pt-buy-btn">
                      <ShoppingBag size={14} /> Shop Now
                    </Link>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="custom-shape-divider-bottom">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
};

export default IngredientSpotlight;
