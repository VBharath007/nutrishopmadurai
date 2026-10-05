import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Mail, MapPin, Truck } from 'lucide-react';
import logo from '../assets/shoplg.webp';
import './Footer.css';

// Initialize global AudioContext on first user interaction to bypass autoplay restrictions
// Initialize global AudioContext ONLY on trusted user interaction to bypass autoplay restrictions
let globalAudioCtx = null;
let audioUnlocked = false;

const unlockAudio = () => {
  if (audioUnlocked) return;
  if (typeof window === 'undefined') return;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  globalAudioCtx = new AudioContext();

  // Play a silent note to permanently unlock the audio context for this page
  const osc = globalAudioCtx.createOscillator();
  const gain = globalAudioCtx.createGain();
  gain.gain.value = 0;
  osc.connect(gain);
  gain.connect(globalAudioCtx.destination);
  osc.start(0);
  osc.stop(0.01);

  audioUnlocked = true;
};

if (typeof window !== 'undefined') {
  // Listen for actual user interactions
  ['click', 'touchstart', 'keydown'].forEach(evt =>
    window.addEventListener(evt, unlockAudio, { once: true, capture: true })
  );
}

const Footer = () => {
  const fullText = "A way to healthy living, We provide premium quality, 100% Ayurvedic and  Herbal products delivered straight to your door.";
  const [typedText, setTypedText] = useState('');
  const [hasTyped, setHasTyped] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const textRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        isVisibleRef.current = isIntersecting;
        if (isIntersecting && !hasTyped) {
          setHasTyped(true);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [hasTyped]);

  useEffect(() => {
    let interval;
    if (hasTyped) {
      interval = setInterval(() => {
        if (isVisibleRef.current) {
          setTrigger(prev => prev + 1);
        }
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [hasTyped]);

  const playDeliverySound = () => {
    try {
      if (!audioUnlocked || !globalAudioCtx) {
        console.warn("Audio blocked. Click anywhere on the page to enable sound.");
        return;
      }
      const ctx = globalAudioCtx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      const beep = (time) => {
        const freqs = [550, 650]; // Slightly dissonant frequencies for a classic "horn" feel
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle'; // Smoother than square, more buzzy than sine
          osc.frequency.value = freq;

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(time);
          // Very quick attack and release for a cute 'peep'
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
          gain.gain.setValueAtTime(0.08, time + 0.1);
          gain.gain.linearRampToValueAtTime(0, time + 0.15);
          osc.stop(time + 0.2);
        });
      };

      // Cute double "peep-peep"
      beep(now);
      beep(now + 0.25);
    } catch (err) {
      console.error("Audio playback blocked", err);
    }
  };

  useEffect(() => {
    if (hasTyped) {
      // Sync sound exactly with the light turning on (1.2 seconds after truck starts sliding in)
      const timer = setTimeout(() => {
        if (isVisibleRef.current) {
          playDeliverySound();
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [hasTyped, trigger]);

  useEffect(() => {
    if (hasTyped) {
      setTypedText('');
      let i = 0;
      const timer = setInterval(() => {
        setTypedText(fullText.substring(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(timer);
        }
      }, 25);
      return () => clearInterval(timer);
    }
  }, [hasTyped, trigger]);

  return (
    <footer className="footer-new">
      <div className="footer-torn-top"></div>

      <div className="footer-main-new">
        <div className="container footer-grid-new">

          {/* Brand Column */}
          <div className="footer-col-new footer-col-brand">
            <div className="footer-logo-new">
              <img src={logo} alt="Nutrishop Logo" />
            </div>
            <p className="footer-text-new" ref={textRef} style={{ minHeight: '60px' }}>
              {typedText}
            </p>
            <div className="footer-socials-new" style={{ marginTop: '1.5rem' }}>
              <a href="https://www.facebook.com/nutrishopind/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-fb">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/nutrishop_mdu?igshid=NGExMmI2YTkyZg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-ig">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://youtube.com/channel/UCVgV7u1bJiu60yZ0VdTWvlw" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-yt">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div className="footer-col-new">
            <h4 className="footer-heading-new">Explore</h4>
            <ul key={trigger} className={`footer-links-new ${hasTyped ? 'slide-in' : ''}`}>
              <li><a href="/">Home</a></li>
              <li><a href="/our-story">Our Story</a></li>
              <li><a href="/our-products">Our Products</a></li>
              <li><a href="/ayurvedic-personal-care">Ayurvedic Personal Care</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col-new">
            <h4 className="footer-heading-new">Contact</h4>
            <ul key={trigger} className={`footer-contact-new ${hasTyped ? 'slide-in' : ''}`}>
              <li className="contact-item-new">
                <Phone size={18} className="contact-icon-new" />
                <span>+91 94420 28103</span>
              </li>
              <li className="contact-item-new">
                <Mail size={18} className="contact-icon-new" />
                <span>Nutrishop.mdu@gmail.com</span>
              </li>
              <li className="contact-item-new">
                <MapPin size={18} className="contact-icon-new" />
                <span>
                  426, East, 9th Main Rd, <br />
                  KK Nagar, Madurai, <br />
                  Tamil Nadu 625020.
                </span>
              </li>
            </ul>
            <div className="footer-disclaimer-btn">
              Disclaimer: Prices are subject to change.
            </div>
          </div>

          {/* Location & Social Column */}
          <div className="footer-col-new">
            <h4 className="footer-heading-new">Find Us Here</h4>
            <div className="footer-map-container">
              <a
                href="https://maps.google.com/maps?q=Nutri%20shop%20-%20Organic%20Shop%20Madurai"
                target="_blank"
                rel="noopener noreferrer"
                className="map-overlay"
                aria-label="Open location in Google Maps"
              >
                <span>Open in Maps</span>
              </a>
              <iframe
                src="https://maps.google.com/maps?q=Nutri%20shop%20-%20Organic%20Shop%20Madurai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="130"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>

            <div
              key={trigger}
              className={`footer-shipping-banner ${hasTyped ? 'animate-shipping' : ''}`}
              onMouseEnter={playDeliverySound}
              onClick={playDeliverySound}
            >
              <div className="shipping-icon-wrapper">
                <Truck size={24} className="moving-truck-icon" />
                <div className="headlight-beam"></div>
              </div>
              <div className="shipping-text">
                <span className="shipping-title">Free Shipping</span>
                <span className="shipping-desc">On Orders of Rs. 1999* and above</span>
                <span className="shipping-conditions" style={{ fontSize: '0.7rem', opacity: 1, marginTop: '2px', display: 'block', color: '#fff' }}>*Conditions apply</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Green Section with Torn Edge */}
      <div className="footer-bottom-wrapper">
        <div className="footer-torn-bottom"></div>
        <div className="footer-bottom-new">
          <div className="container footer-bottom-inner-new">
            <p>Copyright &copy; {new Date().getFullYear()} Nutrishop. All Rights Reserved.</p>
            <div className="footer-bottom-links-new">
              <a href="https://hexavisiontech.com/" target="_blank" rel="noopener noreferrer">
                Designed & Developed by HexaVision Technologies
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
