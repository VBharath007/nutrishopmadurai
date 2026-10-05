import React from 'react';
import Typewriter from 'typewriter-effect';
import { Leaf, ShieldCheck, HeartPulse, BadgeCheck } from 'lucide-react';

import './WhyChooseUs.css';

const WhyChooseUs = () => {


  return (
    <section className="why-choose-us-section">
      {/* Background decorations */}
      <div className="wcu-bg-pattern"></div>
      
      <div className="container wcu-container">
        
        {/* Left Side: Text and Image */}
        <div className="wcu-left">
          <div className="wcu-header">
            <div className="wcu-badge-top">
              <BadgeCheck size={18} />
              <span>Premium Quality Assured</span>
            </div>
            <h2 className="wcu-title">
              <span className="leaf-icon">🌿</span> Why Choose{' '}
              <span className="gradient-text" style={{ display: 'inline-block' }}>
                <Typewriter
                  options={{
                    strings: ['Nutri Shop?'],
                    autoStart: true,
                    loop: true,
                    delay: 100,
                    deleteSpeed: 100,
                    pauseFor: 2000,
                    cursor: "",
                  }}
                />
              </span>
            </h2>

          </div>
        </div>



      </div>

      {/* Full Width Story Content */}
      <div className="container story-container">
        <div className="story-content">

          <h3>From a Simple Idea to a Way of Healthy Living</h3>
          <p>NutriShop was founded during the COVID-19 lockdown, a time when many of us began thinking more deeply about food, health, and everyday lifestyle choices.</p>
          <p>We realised that better health begins with the choices we make every day. This became the foundation of NutriShop — to make healthier, traditional, and chemical-conscious choices more accessible to families.</p>

          <h2>How NutriShop Started?</h2>
          <p>We began by sourcing <strong>traditional rice varieties, millets, natural foods, and everyday essentials</strong> from farmers and trusted producers who follow responsible and minimal-chemical farming and preparation practices.</p>
          <p>Where possible, we also developed our own value-added products, with a focus on <strong>quality, consistency, and traditional food practices</strong>.</p>
          <p>What started as a small collection of healthy food products gradually grew into a wider destination for conscious living.</p>

          <h2>Our Journey</h2>
          <p>Our journey began with traditional rice and millet varieties and gradually expanded to include convenient products for modern families.</p>
          <p>Today, our food range includes:</p>
          <ul>
            <li>Traditional rice varieties</li>
            <li>Millets</li>
            <li>Flours and dosa mixes</li>
            <li>Idiyappam and puttu mixes</li>
            <li>Natural sweeteners</li>
            <li>Dry fruits</li>
            <li>Traditional honey</li>
            <li>Ghee</li>
            <li>Herbal and natural products</li>
          </ul>
          <p>Our aim is to make wholesome and traditional choices more convenient for everyday cooking and family life.</p>

          <h2>Growing Beyond Food</h2>
          <h3>A Healthier Approach to Everyday Living</h3>
          <p>In <strong>2022</strong>, NutriShop expanded beyond food into <strong>Ayurvedic, herbal, and handmade personal-care products</strong>.</p>
          <p>This expansion came from a simple belief: healthy living is not only about what we eat, but also about what we apply to our bodies and use in our homes.</p>
          <p>Our range now includes:</p>
          <ul>
            <li>Handmade soaps</li>
            <li>Herbal shampoos</li>
            <li>Face washes</li>
            <li>Children's soaps</li>
            <li>Dishwashing liquids</li>
            <li>Home-care essentials</li>
            <li>Other natural and herbal products</li>
          </ul>
          <p>Every category we introduce is guided by one important question:</p>
          <p><strong>Can we provide a better, more natural alternative for everyday living?</strong></p>

          <h2>Five Years of Trust</h2>
          <p>What began during the lockdown has grown steadily with the trust and support of our customers.</p>
          <p>For more than <strong>five years</strong>, we have continued to expand our product range while staying committed to the purpose behind NutriShop — helping families make better choices, one product at a time.</p>
          <p>We work with <strong>farmers, small-scale producers, and trusted brands</strong> whose products align with our values and quality expectations.</p>

          <h2>Our Purpose</h2>
          <p>Our vision is simple:</p>
          <div className="story-vision">
            <h3>"To bring healthier, chemical-conscious, and preservative-conscious choices into everyday life."</h3>
          </div>
          <p>From the rice in your kitchen and the flour used for breakfast, to the honey and ghee in your pantry, and the soap and shampoo used by your family — we aim to make mindful choices easier and more accessible.</p>
          <p>We believe healthy living should be <strong>simple, practical, and part of everyday life</strong>.</p>
          <p>Our journey began with a simple idea during the COVID-19 lockdown.</p>
          <p>Today, that idea continues to grow with <strong>every family we serve, every farmer and producer we support, and every healthier choice we help bring into homes.</strong></p>
          <h3 className="story-footer-text">NutriShop — A Way to Healthy Living.</h3>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
