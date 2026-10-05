import React from 'react';
import { Link } from 'react-router-dom';
import { productsData } from '../data/products';
import './BentoPicks.css'; // Reuse the beautiful Bento CSS!

const HealthSupplementsSection = () => {
  // Filter products for HEALTH SUPPLEMENTS category
  const supplements = productsData.filter(p => p.category === 'HEALTH SUPPLEMENTS');  if (!supplements || supplements.length < 7) {
    return null; // Need 7 for the bento grid
  }

  // Helper to shrink the font size of any extra details like "(Ginger, Lemon & Honey)"
  const renderName = (name) => {
    if (name.includes(' (')) {
      const parts = name.split(' (');
      return (
        <>
          {parts[0]}
          <span style={{ fontSize: '0.65em', fontWeight: '500', opacity: 0.9, display: 'block', marginTop: '0.25rem' }}>
            ({parts[1]}
          </span>
        </>
      );
    }
    return name;
  };

  return (
    <section className="bento-section" style={{ backgroundColor: '#f4fbf4' }}>
      <div className="container">
        <div className="bento-header">
          <h2 className="bento-title">
            <span className="bento-title-text">Health Supplements</span>
          </h2>
          <p className="bento-subtitle">Boost your immunity and vitality with nature's best</p>
        </div>
        
        <div className="bento-grid">
          {/* Item 1: Large - 2x2 */}
          <Link to={`/product/${supplements[0].slug}`} className="bento-item bento-millets group">
            <img src={supplements[0].images[0]} alt={supplements[0].name} className="bento-bg" />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <span className="bento-tag">Bestseller</span>
              <h3>{renderName(supplements[0].name)}</h3>
              <p>{supplements[0].highlights[2]}</p>
            </div>
          </Link>

          {/* Item 2: Small - 1x1 */}
          <Link to={`/product/${supplements[1].slug}`} className="bento-item bento-honey group">
            <img 
              src={supplements[1].images[0]} 
              alt={supplements[1].name} 
              className="bento-bg" 
            />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>{renderName(supplements[1].name)}</h3>
            </div>
          </Link>

          {/* Item 3: Small - 1x1 */}
          <Link to={`/product/${supplements[2].slug}`} className="bento-item bento-seeds group">
            <img src={supplements[2].images[0]} alt={supplements[2].name} className="bento-bg" />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>{renderName(supplements[2].name)}</h3>
            </div>
          </Link>

          {/* Item 4: Small - 1x1 */}
          <Link to={`/product/${supplements[3].slug}`} className="bento-item bento-oils group">
            <img src={supplements[3].images[0]} alt={supplements[3].name} className="bento-bg" />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>{renderName(supplements[3].name)}</h3>
            </div>
          </Link>

          {/* Item 5: Small - 1x1 */}
          <Link to={`/product/${supplements[4].slug}`} className="bento-item bento-dryfruit group">
            <img src={supplements[4].images[0]} alt={supplements[4].name} className="bento-bg" />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>{renderName(supplements[4].name)}</h3>
            </div>
          </Link>

          {/* Item 6: Wide - 2x1 */}
          <Link to={`/product/${supplements[5].slug}`} className="bento-item bento-rice group">
            <img src={supplements[5].images[0]} alt={supplements[5].name} className="bento-bg" />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>{renderName(supplements[5].name)}</h3>
              <p>{supplements[5].highlights[2]}</p>
            </div>
          </Link>

          {/* Item 7: Wide - 2x1 */}
          <Link to={`/product/${supplements[6].slug}`} className="bento-item bento-herbal group">
            <img src={supplements[6].images[0]} alt={supplements[6].name} className="bento-bg" />
            <div className="bento-overlay"></div>
            <div className="bento-content">
              <h3>{renderName(supplements[6].name)}</h3>
              <p>{supplements[6].highlights[2]}</p>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default HealthSupplementsSection;
