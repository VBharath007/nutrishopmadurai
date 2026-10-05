import React, { useState, useEffect } from 'react';
import './SalesToast.css';
import { X, CheckCircle } from 'lucide-react';

const purchaseData = [
  { name: "Suresh from Chennai", product: "Pure Wild Forest Honey", time: "just now" },
  { name: "Priya from Coimbatore", product: "Organic A2 Desi Cow Ghee", time: "5 mins ago" },
  { name: "Karthik from Madurai", product: "Mappillai Samba Rice", time: "12 mins ago" },
  { name: "Lakshmi from Trichy", product: "Cold Pressed Groundnut Oil", time: "just now" },
  { name: "Ramesh from Salem", product: "Sprouted Ragi Health Mix", time: "2 mins ago" }
];

const SalesToast = () => {
  const [currentSale, setCurrentSale] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before first pop-up
    const initialTimer = setTimeout(() => {
      showRandomSale();
    }, 5000); // 5 seconds after load

    return () => clearTimeout(initialTimer);
  }, []);

  const showRandomSale = () => {
    const randomSale = purchaseData[Math.floor(Math.random() * purchaseData.length)];
    setCurrentSale(randomSale);
    setIsVisible(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Schedule next pop-up (between 15 to 30 seconds)
      const nextDelay = Math.floor(Math.random() * (30000 - 15000 + 1) + 15000);
      setTimeout(showRandomSale, nextDelay);
    }, 5000);
  };

  if (!currentSale) return null;

  return (
    <div className={`sales-toast-wrapper ${isVisible ? 'show' : ''}`}>
      <div className="sales-toast-content">
        <div className="st-icon-box">
          <CheckCircle size={20} className="st-check-icon" />
        </div>
        <div className="st-text-box">
          <p className="st-buyer">{currentSale.name} purchased</p>
          <p className="st-product">{currentSale.product}</p>
          <p className="st-time">{currentSale.time}</p>
        </div>
        <button className="st-close-btn" onClick={() => setIsVisible(false)}>
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default SalesToast;
