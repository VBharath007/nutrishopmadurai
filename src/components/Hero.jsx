import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const banners = [
  { src: '/nutishophomebanner/homehero1.png', link: '/our-products?category=PASTA', showButton: false },
  { src: '/nutishophomebanner/homehero2.png', link: '/our-products?category=HEALTH%20MIX', showButton: false },
  { src: '/nutishophomebanner/homehero3.png', link: '/our-products?category=HERBAL%20TEA(BREW)%20VARITIES', showButton: false },
  { src: '/nutishophomebanner/homehero4.png', link: '/our-products?category=HONEY', showButton: false },
];

const animations = [
  // 1: Zoom in fade
  {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  // 2: Slide up fade
  {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  },
  // 3: Blur and scale
  {
    initial: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(10px)", scale: 1.05 },
  },
  // 4: Slide from right
  {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  // 5: Zoom out fade
  {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Medium speed transitions
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const currentAnim = animations[currentIndex % animations.length];
  const currentBanner = banners[currentIndex];

  return (
    <section className="hero-banner-section">
      <div className="hero-slider-container">
        {/* Invisible spacer image to set the container's height dynamically based on image aspect ratio */}
        <img src={banners[0].src} alt="spacer" className="spacer-image" />
        
        <div className="hero-slide-wrapper">
          <Link to={currentBanner.link} className="hero-image-link">
            <img
              src={currentBanner.src}
              alt={`Banner ${currentIndex + 1}`}
              className="hero-banner-image"
            />
          </Link>
          
          {currentBanner.showButton && (
            <div className="hero-shop-overlay">
              <Link to={currentBanner.link} className="hero-shop-btn">
                Shop Now <ShoppingBag size={18} />
              </Link>
            </div>
          )}
        </div>

        <button className="nav-btn prev-btn" onClick={handlePrev} aria-label="Previous Slide">
          <ChevronLeft size={24} />
        </button>
        <button className="nav-btn next-btn" onClick={handleNext} aria-label="Next Slide">
          <ChevronRight size={24} />
        </button>
        
        <div className="slider-indicators">
          {banners.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
