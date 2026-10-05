import React, { useEffect } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import imgAntiDandruff from '../assets/Cosmeticimages/Shampoo Webp/shampoo_antidandruff.webp';
import imgHibiscusShampoo from '../assets/Cosmeticimages/Shampoo Webp/shampoo_hibiscus.webp';
import imgFootCream from '../assets/Cosmeticimages/Foot Care Webp/footcare_cream.webp';
import imgHibiscusFaceWash from '../assets/Cosmeticimages/Facewash Webp/Hibiscus  Face wash.webp';
import imgNeemTulsiCream from '../assets/Cosmeticimages/cream Webp/facecream_neemtulsi.webp';
import imgNeemTulsiSoap from '../assets/Cosmeticimages/Soap Webp/Herbal/neemtulsi home made soap.webp';
import imgCoffeeScrub from '../assets/Cosmeticimages/Face Scrub Webp/facescrub_coffee.webp';
import imgAvocadoCream from '../assets/Cosmeticimages/cream Webp/enriching cream_avocado.webp';
import imgOrangeFacewash from '../assets/Cosmeticimages/Facewash Webp/facewash_orange.webp';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    name: "Priya S.",
    initial: "P",
    color: "#e8eaed",
    textColor: "#3c4043",
    text: "I got Coffee scrub - used it twice a week and it makes my skin soft and removes dead skin cells and black heads. I can see that my skin has started glowing. My husband is using the soap and after shave lotion and he likes both. He says the scent stays for a long time.",
    rating: 5,
    date: "1 month ago",
    image: imgCoffeeScrub
  },
  {
    id: 2,
    name: "Kavitha M.",
    initial: "K",
    color: "#fce8e6",
    textColor: "#d93025",
    text: "Hai mam....avocado cream I bought from ur store was very good...it was deep moisturizing for my skin...my dry patch disappeared so quickly..Thank for recommended the avocado cream...😊",
    rating: 5,
    date: "2 months ago",
    image: imgAvocadoCream
  },
  {
    id: 3,
    name: "Meenakshi V.",
    initial: "M",
    color: "#e8f0fe",
    textColor: "#1a73e8",
    text: "Hello mam,I'm very much happy with your products.. orange facewash and cleansing my skin very well and it have a good fragrance... coming to face oil..it just brightens my skin and giving a moisturized texture.. I'm satisfied with this.. thankyou.",
    rating: 5,
    date: "3 weeks ago",
    image: imgOrangeFacewash
  },
  {
    id: 4,
    name: "Lakshmi R.",
    initial: "L",
    color: "#e6f4ea",
    textColor: "#1e8e3e",
    text: "Hello mam,Bought ur products two months ago... Hibiscus shampoo, foot cream, aloe vera scrub, face wash hibiscus and neem and papaya...Two mths me and my two daughters using ur products... Outcome is really very well... Face wash smoothens skin and gives a baby touch feel... We feel it very well... Thanks for the wonderful and cost worthy products mam... After two days will place more order mam... 🥰😘",
    rating: 5,
    date: "2 months ago",
    images: [imgHibiscusShampoo, imgFootCream, imgHibiscusFaceWash]
  },
  {
    id: 5,
    name: "Ramya K.",
    initial: "R",
    color: "#fef7e0",
    textColor: "#e37400",
    text: "Hai sis, nenga kodutha thulasi and vembu soap use pannen, semmaiya iruku! Skin soft agiruchu, glow-va iruku. Nanum evlovo soap, cream use paniruken, but nenga kodutha soap and mattha products use panum pothu result odane kidaikuthu. Skin friendly-ya iruku sis. Parlour-eh poga venam pola! Kanda kanda cream use panama, nenga kodukura cream use panaley skin healthy-ya agirum sis. Thank you sis for your suggestions!",
    rating: 5,
    date: "1 week ago",
    image: imgNeemTulsiSoap
  },
  {
    id: 6,
    name: "Karthik D.",
    initial: "K",
    color: "#f3e8fd",
    textColor: "#9334e6",
    text: "I used the anti dandruff shampoo. It was nice…",
    rating: 4,
    date: "2 weeks ago",
    image: imgAntiDandruff
  },
  {
    id: 7,
    name: "Surya T.",
    initial: "S",
    color: "#e8eaed",
    textColor: "#3c4043",
    text: "Nice product and packing serious ah nala panirkinga use panitu review kudukren .",
    rating: 5,
    date: "1 month ago"
  },
  {
    id: 8,
    name: "Vignesh P.",
    initial: "V",
    color: "#e8f0fe",
    textColor: "#1a73e8",
    text: "Received the parcel in the evening , Packing excellent, received the products in good condition. Thank you for Express delivery🙏.",
    rating: 5,
    date: "3 days ago"
  },
  {
    id: 9,
    name: "Sneha G.",
    initial: "S",
    color: "#fce8e6",
    textColor: "#d93025",
    text: "😍Received tha products in good condition.. ❤️very super thank you so much😊.",
    rating: 5,
    date: "4 days ago"
  },
  {
    id: 10,
    name: "Nandhini N.",
    initial: "N",
    color: "#e6f4ea",
    textColor: "#1e8e3e",
    text: "Received the parcel just now. Safe and secure packing. Thankyou. The smell of the neem and tulasi cream is really divine.",
    rating: 5,
    date: "1 week ago",
    image: imgNeemTulsiCream
  }
];

const Testimonials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="testimonials-page">
      <div className="testimonials-header-bg">
        <div className="testimonials-header-content">
          <h1>Voices of Our NutriShop Family</h1>
          <p>Real stories and experiences from our wonderful customers who trust NutriShop for their health and beauty.</p>
          <div className="overall-rating-card">
            <div className="rating-right">
              <svg width="46" height="46" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="google-rating-text">Google Rating</div>
            </div>
            <div className="rating-left">
              <span className="rating-score">4.9</span>
              <div className="rating-stars">
                <Star size={22} fill="#fbbc04" color="#fbbc04" />
                <Star size={22} fill="#fbbc04" color="#fbbc04" />
                <Star size={22} fill="#fbbc04" color="#fbbc04" />
                <Star size={22} fill="#fbbc04" color="#fbbc04" />
                <Star size={22} fill="#fbbc04" color="#fbbc04" />
              </div>
              <span className="review-count">Based on 100+ reviews</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="google-reviews-grid">
          {testimonialsData.map((review) => (
            <div key={review.id} className="google-review-card">
              <div className="gr-header">
                <div 
                  className="gr-avatar" 
                  style={{ backgroundColor: review.color, color: review.textColor }}
                >
                  {review.initial}
                </div>
                <div className="gr-user-info">
                  <h4 className="gr-name">{review.name}</h4>
                  <div className="gr-meta">
                    <span className="gr-date">{review.date}</span>
                    <span className="gr-dot">•</span>
                    <span className="gr-verified"><CheckCircle size={12} color="#1a73e8" /> Verified Purchase</span>
                  </div>
                </div>
                {/* Google Logo visual cue */}
                <div className="gr-logo">
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
              <div className="gr-stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < review.rating ? "#fbbc04" : "#e0e0e0"} 
                    color={i < review.rating ? "#fbbc04" : "#e0e0e0"} 
                  />
                ))}
              </div>
              <p className="gr-text">{review.text}</p>
              {review.image && (
                <div className="gr-attached-image">
                  <img src={review.image} alt="Review attachment" />
                </div>
              )}
              {review.images && review.images.length > 0 && (
                <div className="gr-attached-gallery">
                  {review.images.map((img, idx) => (
                    <div key={idx} className="gr-gallery-item">
                      <img src={img} alt={`Review attachment ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
