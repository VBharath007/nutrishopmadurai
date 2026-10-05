import React, { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import milletsImg from '../assets/hero_millets.webp';
import skincareImg from '../assets/hero_skincare.webp';
import healthImg from '../assets/hero_health.webp';
import dairyImg from '../assets/hero_dairy.webp';
import spicesImg from '../assets/herospices.jpg';

// Realistic background assets
import bgDairy from '../assets/bg_dairy_mass.webp';
import bgSkincare from '../assets/bgskincare.webp';
import bgMillets from '../assets/bgmilcopy.webp';
import bgHealth from '../assets/bghealth.webp';
import bgSpices from '../assets/bgspiceschat.webp';

import './Hero.css';

const carouselItems = [
  { 
    id: 1, 
    badge: '100% Organic',
    title: 'Premium Millets', 
    heroDesc: 'Discover the forgotten grains. Rich in fiber, protein, and essential nutrients. Transform your daily diet with our premium, farm-fresh millets.',
    desc: '100% Organic & Healthy', 
    img: milletsImg, 
    color: 'rgba(254, 243, 199, 0.4)', // Glassmorphism tint
    themeBg: '#fef3c7',
    themePrimary: '#d97706',
    themeGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    bgImg: bgMillets,
    keywords: ['Diabetic Friendly', 'Rich in Fiber', 'Gluten Free']
  },
  { 
    id: 2, 
    badge: 'Glow Naturally',
    title: 'Organic Skin Care', 
    heroDesc: 'Revitalize your skin with our chemical-free, natural skincare range. Experience the true glow of authentic herbal ingredients.',
    desc: 'Natural & Glowing', 
    img: skincareImg, 
    color: 'rgba(224, 242, 254, 0.4)',
    themeBg: '#ccfbf1',
    themePrimary: '#0d9488',
    themeGradient: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
    bgImg: bgSkincare,
    keywords: ['100% Herbal', 'Chemical Free', 'Radiant Glow']
  },
  { 
    id: 3, 
    badge: 'Stay Strong',
    title: 'Health Foods', 
    heroDesc: 'Boost your immunity and energy levels with our specially curated health foods. Wholesome nutrition for a better tomorrow.',
    desc: 'Boost Your Immunity', 
    img: healthImg, 
    color: 'rgba(220, 252, 231, 0.4)',
    themeBg: '#dcfce7',
    themePrimary: '#16a34a',
    themeGradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    bgImg: bgHealth,
    keywords: ['Immunity Booster', 'Nutrient Dense', 'High Energy']
  },
  { 
    id: 4, 
    badge: 'Farm Fresh',
    title: 'Dairy Products', 
    heroDesc: 'Pure, unadulterated milk and dairy products sourced directly from local organic farms. Taste the difference of real freshness.',
    desc: 'Fresh & Pure Farm Milk', 
    img: dairyImg, 
    color: 'rgba(243, 232, 255, 0.4)',
    themeBg: '#ede9fe',
    themePrimary: '#7c3aed',
    themeGradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    bgImg: bgDairy,
    keywords: ['A2 Protein', 'Farm Fresh', 'No Preservatives']
  },
  { 
    id: 5, 
    badge: 'Authentic Aroma',
    title: 'Organic Spices', 
    heroDesc: 'Enhance your cooking with our hand-pounded, organic spices. Bring authentic Indian flavors and aroma to your kitchen.',
    desc: 'Authentic Indian Flavors', 
    img: spicesImg, 
    color: 'rgba(255, 237, 213, 0.4)',
    themeBg: '#ffedd5',
    themePrimary: '#ea580c',
    themeGradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    bgImg: bgSpices,
    keywords: ['Hand Pounded', 'Authentic Aroma', '100% Pure']
  },
];

const Hero = () => {
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(380);
  const theta = 360 / carouselItems.length;

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 992 ? 240 : 380);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev - theta);
    }, 4500); 
    return () => clearInterval(interval);
  }, [theta]);

  const handleNext = () => setRotation(prev => prev - theta);
  const handlePrev = () => setRotation(prev => prev + theta);

  const currentIndex = Math.round(((-rotation / theta) % carouselItems.length + carouselItems.length) % carouselItems.length);
  const activeItem = carouselItems[currentIndex];

  return (
    <section 
      className="hero-section"
      style={{ 
        '--theme-bg': activeItem.themeBg,
        '--theme-primary': activeItem.themePrimary,
        '--theme-gradient': activeItem.themeGradient,
        backgroundColor: 'var(--theme-bg)', 
        transition: 'background-color 1s ease' 
      }}
    >
      {/* Cinematic Realistic Background */}
      <div className="realistic-bg-container" key={`bg-${activeItem.id}`}>
        <img src={activeItem.bgImg} alt="Background Elements" className="realistic-bg-img" />
      </div>

      {/* Catchy Floating Importance Points */}
      <div className="floating-features" key={`kw-${activeItem.id}`}>
        {activeItem.keywords.map((kw, idx) => (
          <div key={idx} className={`feature-badge animate-feature feat-${idx + 1}`}>
            {kw}
          </div>
        ))}
      </div>
      
      <div className="wave-edge"></div>

      <div className="container hero-container">
        <div className="hero-carousel-area animate-fade-in-slow">
          <div className="scene">
            <div 
              className="carousel" 
              style={{ transform: `rotateY(${rotation}deg)` }}
            >
              {carouselItems.map((item, index) => {
                const itemRotation = index * theta;
                return (
                  <div 
                    key={item.id} 
                    className="carousel-cell arch-card"
                    style={{ 
                      transform: `rotateY(${itemRotation}deg) translateZ(${radius}px)`,
                      background: item.color
                    }}
                  >
                    <div className="arch-img-wrap">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className="cell-content">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="carousel-controls">
            <button className="control-btn" onClick={handlePrev}><ChevronLeft size={24} /></button>
            <button className="control-btn" onClick={handleNext}><ChevronRight size={24} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
