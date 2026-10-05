import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HoneySection.css';
import realisticBee from '../assets/realbee_transparent.png';

const HoneySection = () => {
  // Create arrays for multiple bees to map over
  const bees = Array.from({ length: 5 });
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
    }
  };

  const handleMouseLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset sound to beginning
    }
  };

  const handleSectionClick = () => {
    navigate('/our-products?category=Honey');
  };

  return (
    <section 
      className="honey-section" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      onClick={handleSectionClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/bee-sound.mp3" loop preload="auto"></audio>

      <div className="honey-animation-container">
        


        {/* The background image (honey comb dripping) */}
        <img 
          src="/honeysection.png" 
          alt="Premium Honey" 
          className="honey-section-img" 
          loading="lazy" 
        />
        
        {/* Flying Bees */}
        <div className="bees-overlay">
          {bees.map((_, index) => (
            <img 
              key={`bee-${index}`} 
              src={realisticBee} 
              alt="Bee" 
              className={`animated-bee bee-${index + 1}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoneySection;
