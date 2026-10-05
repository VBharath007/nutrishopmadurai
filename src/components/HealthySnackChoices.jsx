import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Wheat, ShieldCheck, Heart, ChevronRight } from 'lucide-react';
import './HealthySnackChoices.css';

const healthySnacks = [
  {
    name: "Millet Ladoos",
    image: "/ai-snacks/millet_ladoos.png",
    link: "/our-products?category=LADOO",
    icon: <Wheat size={24} color="#166534" />
  },
  {
    name: "Healthy Cookies",
    image: "/ai-snacks/healthy_cookies.png",
    link: "/our-products?category=MILLET%20COOKIES%20(ON%20REQUEST)",
    icon: <Leaf size={24} color="#166534" />
  },
  {
    name: "Millet Extrude Snacks",
    image: "/ai-snacks/extrude_snacks.png",
    link: "/our-products?category=MILLET%20EXTRUDER%20SNACKS",
    icon: <Heart size={24} color="#166534" />
  },
  {
    name: "Protein Bars",
    image: "/ai-snacks/protein_bars.png",
    link: "/our-products?category=MAX%20PROTIEN%20BAR",
    icon: <ShieldCheck size={24} color="#166534" />
  }
];

const features = [
  { title: "100% Natural", subtitle: "Wholesome Ingredients" },
  { title: "Rich in Nutrition", subtitle: "Goodness in Every Bite" },
  { title: "No Preservatives", subtitle: "Pure & Safe Snacks" },
  { title: "Healthy & Tasty", subtitle: "Better Choice Everyday" }
];

const HealthySnackChoices = () => {
  return (
    <section className="healthy-snacks-section">
      <div className="hs-bg-overlay"></div>
      <div className="container hs-container">
        
        {/* Header Section */}
        <div className="hs-header">
          <h2 className="hs-title">Healthy Snack Choices</h2>
          <p className="hs-subtitle">Satisfy your cravings with our crunchy, delicious, and guilt-free natural snacks perfect for any time of the day.</p>
        </div>

        {/* Features Scrolling Marquee */}
        <div className="hs-marquee-container">
          <div className="hs-marquee-track">
            {/* Render features twice for infinite scroll effect */}
            {[...features, ...features].map((feat, idx) => (
              <div className="hs-feature-scroll-item" key={idx}>
                <span className="hs-feat-dot">•</span>
                <span className="hs-feat-title">{feat.title}</span>
                <span className="hs-feat-subtitle">- {feat.subtitle}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="hs-grid">
          {healthySnacks.map((snack, index) => (
            <div className="hs-card" key={index}>
              <div className="hs-img-wrapper">
                <img src={snack.image} alt={snack.name} loading="lazy" />
                <div className="hs-icon-badge">
                  {snack.icon}
                </div>
              </div>
              <div className="hs-content">
                <h3 className="hs-name">{snack.name}</h3>
                <Link to={snack.link} className="hs-action-btn">
                  EXPLORE PRODUCTS <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="hs-footer">
          <Link to="/our-products?category=SNACKS" className="hs-view-all-btn">
            VIEW ALL SNACKS <ChevronRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HealthySnackChoices;
