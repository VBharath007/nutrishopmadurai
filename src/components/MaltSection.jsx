import React from 'react';
import { Link } from 'react-router-dom';
import maltBg from '../assets/Malt Goodness Carnival Wheel.webp';
import './MaltSection.css';

const MaltSection = () => {
  return (
    <section className="malt-banner-section">
      <img src={maltBg} alt="Malt Products - Pure Nutrition Naturally" className="malt-banner-img" />
      
      <div className="malt-hotspots">
        {/* Top Left: ABC Malt 80gm */}
        <Link to="/product/abc-malt" className="malt-hotspot hs-abc-top-left" title="ABC Malt 80gm" />
        
        {/* Top Center: ABC Malt 225gm */}
        <Link to="/product/abc-malt" className="malt-hotspot hs-abc-top-center" title="ABC Malt 225gm" />
        
        {/* Top Right: Carrot Malt */}
        <Link to="/product/carrot-malt" className="malt-hotspot hs-carrot" title="Carrot Malt" />
        
        {/* Mid Right: Panankilangu Malt */}
        <Link to="/product/panankilangu-malt" className="malt-hotspot hs-panankilangu" title="Panankilangu Malt" />
        
        {/* Bottom Right: Paruthi Paal Mix */}
        <Link to="/product/paruthi-paal-mix" className="malt-hotspot hs-paruthi" title="Paruthi Paal Mix" />
        
        {/* Bottom Center: Red Banana Malt */}
        <Link to="/product/red-banana-malt" className="malt-hotspot hs-red-banana" title="Red Banana Malt" />
        
        {/* Bottom Left: Beet Root Malt */}
        <Link to="/product/beet-root-malt" className="malt-hotspot hs-beet-root" title="Beet Root Malt" />
        
        {/* Mid Left: Raw Banana Malt */}
        <Link to="/product/raw-banana-malt" className="malt-hotspot hs-raw-banana" title="Raw Banana Malt" />
      </div>
    </section>
  );
};

export default MaltSection;
