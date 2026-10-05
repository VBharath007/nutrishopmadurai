import React from 'react';
import hlsection from '../assets/hlsection.webp';
import './FarmToTable.css';

const FarmToTable = () => {
  return (
    <section className="ftt-section">
      <div className="container ftt-container">
        
        <div className="ftt-header">
          <h2 className="ftt-title">Our Farm to Table Journey</h2>
          <p className="ftt-subtitle">How we bring 100% Ayurvedic and herbal goodness from the fields directly to your family.</p>
        </div>
      </div>

      <div className="ftt-image-wrapper">
        <div className="ftt-wave-top">
          <svg className="ftt-wave-svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="ftt-wave-fill"></path>
          </svg>
        </div>

        <img src={hlsection} alt="Farm to Table Journey" className="ftt-main-image" />

        <div className="ftt-wave-bottom">
          <svg className="ftt-wave-svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="ftt-footer-fill"></path>
          </svg>
        </div>
      </div>

    </section>
  );
};

export default FarmToTable;
