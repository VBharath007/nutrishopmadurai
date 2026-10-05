import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import './CustomerReviews.css';

import avatar1 from '../assets/avatar1.webp';
import avatar2 from '../assets/avatar2.webp';
import avatar3 from '../assets/avatar1.webp';
import avatar4 from '../assets/avatar2.webp';
import avatar5 from '../assets/avatar1.webp';

const GoogleGLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22" className="cr-mas-g-logo">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

const reviewsData = [
  {
    id: 1,
    name: 'Priya Sharma',
    meta: '@priyasharma',
    title: 'Highly recommend!',
    review: 'Absolutely love the quality of their cold-pressed oils. The aroma is so authentic, and it reminds me of my village.',
    avatar: avatar1,
    type: 'type-1'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    meta: '@rahul_v',
    title: 'Good Job!',
    review: 'The wild honey is incredibly pure and tastes amazing. Definitely the best in terms of authentic flavor and texture.',
    avatar: avatar2,
    type: 'type-2'
  },
  {
    id: 3,
    name: 'Anita Desai',
    meta: '@anita_desai',
    title: 'I really appreciate!!',
    review: 'Fast delivery and excellent packaging. Their millets have become a staple in my daily diet. Outstanding products.',
    avatar: avatar3,
    type: 'type-3'
  },
  {
    id: 4,
    name: 'Karthik Raja',
    meta: '@karthik_raja',
    title: 'I was very impressed!',
    review: 'The A2 ghee is top-notch! You can literally smell the purity as soon as you open the jar.',
    avatar: avatar4,
    type: 'type-4'
  },
  {
    id: 5,
    name: 'Lakshmi N',
    meta: '@lakshmi_n',
    title: 'Simply Best!',
    review: 'Authentic taste and amazing quality.',
    avatar: avatar5,
    type: 'type-5'
  }
];

const CustomerReviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className={`reviews-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="cr-bg-pattern"></div>
      
      <div className="container cr-container">
        
        {/* Header */}
        <div className="cr-header">
          <h2 className="cr-title cr-title-animated">
            <span className="cr-title-text cr-word" style={{ animationDelay: '0s' }}>What</span>
            <span className="cr-title-text cr-word" style={{ animationDelay: '0.15s' }}>Our</span>
            <span className="cr-title-text cr-word" style={{ animationDelay: '0.3s' }}>Customers</span>
            <span className="cr-title-text cr-word" style={{ animationDelay: '0.45s' }}>Say</span>
          </h2>
          <p className="cr-subtitle">Real experiences from customers who trust our brand.</p>
        </div>

        {/* Masonry Grid */}
        <div className="cr-masonry-grid">
          {reviewsData.map((review) => (
            <div key={review.id} className={`cr-mas-card ${review.type}`}>
              
              {review.type === 'type-3' && <Quote className="cr-quote-icon" size={80} fill="#1f2937" color="#1f2937" />}
              
              {(review.type === 'type-1' || review.type === 'type-2' || review.type === 'type-3' || review.type === 'type-5') && (
                 <img src={review.avatar} alt={review.name} className="cr-mas-avatar" />
              )}
              
              <div className="cr-mas-content">
                <div className="cr-mas-stars-row">
                  <GoogleGLogo />
                  <div className="cr-mas-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" className="cr-dynamic-star" />
                    ))}
                  </div>
                </div>
                
                {review.title && <h4 className="cr-mas-card-title">{review.title}</h4>}
                <p className="cr-mas-review-text">"{review.review}"</p>
                
                {review.type !== 'type-4' && (
                  <div className="cr-mas-author">
                    <span className="cr-mas-name">{review.name}</span>
                    <span className="cr-mas-meta">{review.meta}</span>
                  </div>
                )}
              </div>

              {review.type === 'type-4' && (
                <>
                  <div className="cr-speech-pointer"></div>
                  <div className="cr-type4-author-block">
                    <img src={review.avatar} alt={review.name} className="cr-mas-avatar-external" />
                    <div className="cr-mas-author">
                      <span className="cr-mas-name">{review.name}</span>
                      <span className="cr-mas-meta">{review.meta}</span>
                    </div>
                  </div>
                </>
              )}
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReviews;
