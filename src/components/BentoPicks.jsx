import React from 'react';
import { Link } from 'react-router-dom';
import './BentoPicks.css';

import milletsImg from '../assets/hero_millets.webp';
import honeyImg from '../assets/bento_honey.webp';
import seedsImg from '../assets/bento_seeds.webp';
import oilsImg from '../assets/bento_oils.webp';
import riceImg from '../assets/bgmilcopy.webp'; 
import healthImg from '../assets/hero_health.webp';
import spicesImg from '../assets/herospices.jpg'; 

const BentoPicks = () => {
  return (
    <section className="bento-section">
      <div className="container">
        <div className="bento-header">
          <h2 className="bento-title">
            <span className="bento-title-text">Nature's &nbsp;&nbsp;Finest Collection</span>
          </h2>
        </div>
        
        <div className="bento-grid">
          
          {/* Item 1: Millets (Large - 2x2) */}
          <Link to="/our-products?category=AMMA%20MAAVU" className="bento-item bento-millets group">
            <img src={milletsImg} alt="Millets" className="bento-bg" style={{ objectPosition: 'center 40%' }} />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <span className="bento-tag">Bestseller</span>
              <h3>Premium Millets</h3>
              <p>Rich in fiber, protein & essential nutrients for a perfect diet</p>
            </div>
          </Link>

          {/* Item 2: Honey (Small - 1x1) */}
          <Link to="/our-products?category=DRY%20FRUITS" className="bento-item bento-honey group">
            <img src={honeyImg} alt="Honey" className="bento-bg" />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>Pure Wild Honey</h3>
            </div>
          </Link>

          {/* Item 3: Seeds (Small - 1x1) */}
          <Link to="/our-products?category=DRY%20FRUITS" className="bento-item bento-seeds group">
            <img src={seedsImg} alt="Seeds" className="bento-bg" />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>Organic Seeds</h3>
            </div>
          </Link>

          {/* Item 4: Oils (Small - 1x1) */}
          <Link to="/our-products?category=CHEKKU%20OILS" className="bento-item bento-oils group">
            <img src={oilsImg} alt="Cold Pressed Oils" className="bento-bg" />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>Cold-Pressed Oils</h3>
            </div>
          </Link>

          {/* Item 5: DryFruit (Small - 1x1) */}
          <Link to="/our-products?category=DRY%20FRUITS" className="bento-item bento-dryfruit group">
            <img src={spicesImg} alt="Dry Fruits" className="bento-bg" style={{ filter: 'brightness(0.9)', objectPosition: 'center 60%' }} />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>Premium Dry Fruits</h3>
            </div>
          </Link>

          {/* Item 6: Rice (Wide - 2x1) */}
          <Link to="/our-products?category=DOSA%20MIX" className="bento-item bento-rice group">
            <img src={riceImg} alt="Traditional Rice" className="bento-bg" style={{ objectPosition: 'center 50%' }} />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>Traditional Rice</h3>
              <p>Authentic, unpolished & loaded with natural health benefits</p>
            </div>
          </Link>

          {/* Item 7: Herbal (Wide - 2x1) */}
          <Link to="/our-products?category=BATH%20POWDERS" className="bento-item bento-herbal group">
            <img src={healthImg} alt="Herbal Powders" className="bento-bg" style={{ objectPosition: 'center 20%' }} />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>Herbal Powders</h3>
              <p>100% pure & natural remedies for your daily vitality</p>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default BentoPicks;
