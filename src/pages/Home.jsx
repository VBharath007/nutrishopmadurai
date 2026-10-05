import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import homeBrochure from '../assets/home_bro1.webp';
import Hero from '../components/Hero';
import ShopByCategory from '../components/ShopByCategory';
import MaltSection from '../components/MaltSection';
import HealthySnackChoices from '../components/HealthySnackChoices';
import HoneySection from '../components/HoneySection';
import A2ProductsSection from '../components/A2ProductsSection';
import HealthSupplementsSection from '../components/HealthSupplementsSection';
import CosmeticsHighlightSection from '../components/CosmeticsHighlightSection';
// import BestSellers from '../components/BestSellers';

const Home = () => {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const hasSeenPromo = sessionStorage.getItem('hasSeenPromo');
    if (!hasSeenPromo) {
      setShowPromo(true);
      sessionStorage.setItem('hasSeenPromo', 'true');
    }
  }, []);

  return (
    <main className="page-home relative" style={{ minHeight: '300vh' }}>
      {showPromo && (
        <div className="promo-modal-overlay" onClick={() => setShowPromo(false)}>
          <div className="promo-modal-content" onClick={e => e.stopPropagation()}>
            <button className="promo-close-btn" onClick={() => setShowPromo(false)}>
              <X size={24} />
            </button>
            <img src={homeBrochure} alt="Nutrishop Brochure" className="promo-image" />
          </div>
        </div>
      )}

      <Hero />
      <ShopByCategory />
      <MaltSection />
      <HealthySnackChoices />
      <HoneySection />
      <A2ProductsSection />
      <CosmeticsHighlightSection />
      <HealthSupplementsSection />
      {/* <BestSellers /> */}
    </main>
  );
};

export default Home;
