import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { productsData } from '../data/products';
import { cosmeticProductsData } from '../data/cosmeticsProducts';
import { Star, ShoppingCart, Heart, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import './Cosmetics.css';

// Import custom category images from scimage folder
import imgBodywash from '../assets/scimage/bodywash.jpg';
import imgBodyLotion from '../assets/scimage/bodylotion.jpg';
import imgFaceGel from '../assets/scimage/face gel.jpg';
import imgFacecream from '../assets/scimage/facecream.jpg';
import imgFacescrub from '../assets/scimage/facescrub.jpg';
import imgFaceserum from '../assets/scimage/faceserum.webp';
import imgFacetoner from '../assets/scimage/facetoner.jpg';
import imgFacewash from '../assets/scimage/facewash.jpg';
import imgFootcare from '../assets/scimage/footcare.jpg';
import imgHairserum from "../assets/scimage/hairserum and oil.png";
import imgKajal from '../assets/scimage/kajal.jpg';
import imgLipbalm from '../assets/scimage/lipbalm.jpg';
import imgPerfume from '../assets/scimage/perfume.jpg';
import imgShampoo from '../assets/scimage/shampoo.jpg';
import imgSoap from '../assets/scimage/soap.jpg';
import imgBeautyOil from '../assets/scimage/Beauty oil.jpg';
import imgEssentialOil from '../assets/scimage/Essential oil.jpg';
import imgHerbalProducts from '../assets/scimage/herbal products.jpg';
import imgCarrierOil from '../assets/scimage/carrier oil.jpg';
import imgOthers from '../assets/scimage/others.png';
import imgCosmeticsBanner1 from "../assets/scimage/cosmeticsbanner1.webp";
import imgCosmeticsBanner2 from "../assets/scimage/cosmeticsbanner2.webp";
import imgCosmeticsBanner3 from "../assets/scimage/cosmeticsbanner3.webp";
import imgCosmeticsBanner4 from "../assets/scimage/cosmeticsbanner4.webp";
import imgCosmeticsBanner5 from "../assets/scimage/cosmeticsbanner5.webp";
import imgScbg from '../assets/scimage/scbg.jpg';

const bannerImages = [
  imgCosmeticsBanner1,
  imgCosmeticsBanner2,
  imgCosmeticsBanner3,
  imgCosmeticsBanner4,
  imgCosmeticsBanner5
];

const Cosmetics = () => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.search.includes('category')) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const grid = document.getElementById('products-grid');
        if (grid) {
          const headerOffset = 80;
          const elementPosition = grid.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.pathname, location.search]);

  const cosmeticProductsList = useMemo(() => {
    return cosmeticProductsData;
  }, []);

  // Extract unique categories and SHUFFLE them randomly!
  const uniqueCategories = useMemo(() => {
    let categories = [...new Set(cosmeticProductsList.map(p => p.category))];
    // Fisher-Yates Shuffle for true randomness
    for (let i = categories.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [categories[i], categories[j]] = [categories[j], categories[i]];
    }
    return categories;
  }, [cosmeticProductsList]);

  const categoryScrollRef = useRef(null);

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const container = categoryScrollRef.current;
      const item = container.querySelector('.banner-cat-item');
      let scrollAmount = window.innerWidth > 768 ? 144 : 106; // Fallbacks
      
      if (item) {
        const style = window.getComputedStyle(container);
        const gap = parseInt(style.gap) || 0;
        scrollAmount = item.offsetWidth + gap;
      }

      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [beatingHearts, setBeatingHearts] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('category');
    if (catParam) {
      const matchedCat = uniqueCategories.find(c => c.toLowerCase() === catParam.toLowerCase());
      if (matchedCat) {
        setActiveCategory(matchedCat);
      } else {
        setActiveCategory(catParam);
      }
      setActiveSubCategory("All");
    } else {
      setActiveCategory("All");
    }
  }, [location.search, uniqueCategories]);

  useEffect(() => {
    if (activeCategory === "All") {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      }, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [activeCategory]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const filteredProducts = activeCategory === "All"
    ? cosmeticProductsList
    : cosmeticProductsList.filter(p => p.category === activeCategory);

  // Helper to map category names to the exact custom images from src/assets/scimage
  const getCategoryImage = (catName) => {
    const lower = catName.toLowerCase();

    if (lower.includes('herbal product') || lower.includes('herbal')) return imgHerbalProducts;
    if (lower.includes('beauty oil')) return imgBeautyOil;
    if (lower.includes('essential oil')) return imgEssentialOil;
    if (lower.includes('carrier oil')) return imgCarrierOil;
    if (lower.includes('other')) return imgOthers;

    if (lower.includes('bodywash')) return imgBodywash;
    if (lower.includes('bodylotion') || lower.includes('lotion')) return imgBodyLotion;
    if (lower.includes('facewash')) return imgFacewash;
    if (lower.includes('soap')) return imgSoap;
    if (lower.includes('gel')) return imgFaceGel;
    if (lower.includes('cream')) return imgFacecream;
    if (lower.includes('scrub')) return imgFacescrub;
    if (lower.includes('serum') && lower.includes('face')) return imgFaceserum;
    if (lower.includes('toner')) return imgFacetoner;
    if (lower.includes('foot')) return imgFootcare;
    if (lower.includes('hair') || lower.includes('oil')) return imgHairserum;
    if (lower.includes('kajal')) return imgKajal;
    if (lower.includes('lipbalm')) return imgLipbalm;
    if (lower.includes('perfume')) return imgPerfume;
    if (lower.includes('shampoo')) return imgShampoo;
    if (lower.includes('thailam')) return imgHairserum;

    // Default fallback
    return imgFacecream;
  };

  // Helper to map category names to dynamic themes
  const getTheme = (cat) => {
    const lower = cat.toLowerCase();
    if (lower.includes('soap')) return { bg: '#fffbeb', text: '#b45309', banner: 'linear-gradient(135deg, #fef3c7, #fde68a)' };
    if (lower.includes('bodywash') || lower.includes('lotion')) return { bg: '#f0fdf4', text: '#15803d', banner: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' };
    if (lower.includes('face')) return { bg: '#fff1f2', text: '#be123c', banner: 'linear-gradient(135deg, #ffe4e6, #fecdd3)' };
    if (lower.includes('shampoo') || lower.includes('hair')) return { bg: '#f5f3ff', text: '#6d28d9', banner: 'linear-gradient(135deg, #ede9fe, #ddd6fe)' };
    if (lower.includes('perfume')) return { bg: '#faf5ff', text: '#7e22ce', banner: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)' };
    return { bg: '#fdf2f8', text: '#db2777', banner: 'linear-gradient(135deg, #fbcfe8, #f472b6)' }; // Default pink/girly
  };

  const theme = getTheme(activeCategory);

  // For the horizontal scrolling section (Bestsellers)
  const bestsellers = cosmeticProductsList.slice(0, 8);
  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setActiveSubCategory("All");
    setTimeout(() => {
      const grid = document.getElementById('products-grid');
      if (grid) {
        const headerOffset = 80;
        const elementPosition = grid.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 50);
  };

  return (
    <div className="nykaa-page" style={{
      '--theme-bg': theme.bg,
      '--theme-text': theme.text,
      '--theme-banner': theme.banner
    }}>


      {/* Mobile Promotional Text */}
      <div className="mobile-glow-deals">
        <span className="glow-text">GLOW DEALS ARE HERE</span>
        <span className="glow-subtext">Get ready to fill your cart! ✨</span>
      </div>

      {/* 1. Top Promotional Banner */}
      <section className="nykaa-hero-banner image-banner" style={{ position: 'relative' }}>
        <div className="nykaa-hero-slider" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', backgroundColor: '#fcf9f2', transition: 'height 0.3s ease' }}>
          {/* Spacer image to dynamically set height based on the current slide */}
          <img src={bannerImages[currentSlide]} style={{ width: '100%', height: 'auto', visibility: 'hidden', display: 'block' }} alt="" />
          {bannerImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Cosmetics Sale ${index + 1}`}
              className="nykaa-hero-bg-img"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: index === currentSlide ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                objectFit: 'contain'
              }}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)}
          className="slider-nav-btn left"
          style={{
            position: 'absolute',
            top: '50%',
            left: '2%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: 'clamp(30px, 8vw, 50px)',
            height: 'clamp(30px, 8vw, 50px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease'
          }}
        >
          <ChevronLeft size={24} color="#333" style={{ width: '50%', height: '50%' }} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerImages.length)}
          className="slider-nav-btn right"
          style={{
            position: 'absolute',
            top: '50%',
            right: '2%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: 'clamp(30px, 8vw, 50px)',
            height: 'clamp(30px, 8vw, 50px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease'
          }}
        >
          <ChevronRight size={24} color="#333" style={{ width: '50%', height: '50%' }} />
        </button>

        <div className="slider-indicators">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Shop By Category - Nykaa Banner Style */}
      <section id="shop-by-category" className="nykaa-section nykaa-category-bg-section" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${imgScbg})` }}>
        <div className="nykaa-section-header center-header" style={{ flexDirection: 'column', alignItems: 'center' }}>
          <h2>Shop By Category</h2>

        </div>

        <div className="nykaa-banner-categories" ref={categoryScrollRef}>


          {/* Category Items */}
          {uniqueCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`banner-cat-item ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className="banner-cat-glow"></div>
              <div className="banner-cat-img-wrapper">
                <img src={getCategoryImage(cat)} alt={cat} />
              </div>
              <button className="banner-pill-btn">
                {cat.replace(' Webp', '')}
              </button>
            </div>
          ))}

        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', paddingBottom: '20px' }}>
          <button 
            className="nykaa-category-btn"
            onClick={() => scrollCategories('left')}
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
          <button 
            className="nykaa-category-btn"
            onClick={() => scrollCategories('right')}
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>

      </section>

      <div className="container">

        {/* 3. Bestsellers Horizontal Carousel (Only show if viewing "All") */}
        {activeCategory === "All" && (
          <section className="nykaa-section">
            <div className="nykaa-section-header">
              <h2>Top Bestsellers</h2>
              <Link to="#" className="view-all-link">View All <ChevronRight size={14} /></Link>
            </div>

            <div className="nykaa-horizontal-scroll">
              {bestsellers.map(product => (
                <div className="nykaa-product-card" key={product.id}>
                  <Link to={`/product/${product.slug}`} className="nykaa-card-link">
                    <div className="nykaa-image-wrapper">

                      <img src={product.images[0]} alt={product.name} />
                      <button
                        className={`nykaa-wishlist-btn ${isInWishlist(product.id) ? 'active' : ''} ${beatingHearts[product.id] ? 'heartbeat-anim' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const isAdding = !isInWishlist(product.id);
                          toggleWishlist(product);
                          if (isAdding) {
                            setBeatingHearts(prev => ({ ...prev, [product.id]: true }));
                            setTimeout(() => setBeatingHearts(prev => ({ ...prev, [product.id]: false })), 600);
                          }
                        }}
                      >
                        <Heart size={16} fill={isInWishlist(product.id) ? "#ef4444" : "none"} color={isInWishlist(product.id) ? "#ef4444" : "currentColor"} />
                      </button>
                    </div>
                    <div className="nykaa-info">
                      <h3 className="nykaa-name">{product.name}</h3>
                      {product.variants && product.variants[0] && product.variants[0].size && product.variants[0].size !== 'Standard' && (
                        <span className="nykaa-category-text" style={{ textTransform: 'lowercase' }}>{product.variants[0].size}</span>
                      )}
                      <div className="nykaa-rating">
                        <span>{product.rating}</span>
                        <Star size={12} fill="currentColor" />
                        <span className="review-count">({product.reviews})</span>
                      </div>
                      <div className="nykaa-price-row">
                        <span className="nykaa-price">₹{product.price}</span>

                      </div>
                    </div>
                  </Link>
                  <button className="nykaa-add-btn" onClick={(e) => { e.preventDefault(); addToCart(product, 1, product.variants ? product.variants[0].size : null, e); }}>Add to Bag</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Main Product Grid for the selected category */}
        <section className="nykaa-section" id="products-grid">
          <div className="nykaa-section-header" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <h2>{activeCategory === "All" ? "Explore All Collections" : activeCategory}</h2>
              <span className="product-count-label">{filteredProducts.length} items</span>
            </div>
            {activeCategory !== "All" && (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveSubCategory("All");
                  setTimeout(() => {
                    const el = document.getElementById('shop-by-category');
                    if (el) {
                      const headerOffset = 80;
                      const elementPosition = el.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }, 50);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  backgroundColor: '#fdf2f8',
                  color: 'var(--theme-text, #db2777)',
                  border: '1px solid var(--theme-text, #db2777)',
                  borderRadius: '20px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginLeft: 'auto'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-text, #db2777)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#fdf2f8';
                  e.currentTarget.style.color = 'var(--theme-text, #db2777)';
                }}
              >
                <ArrowLeft size={14} /> Back to Categories
              </button>
            )}
          </div>

          {activeCategory === "Hand Made Soaps" && (
            <div className="sub-category-filters" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {["All", ...new Set(filteredProducts.map(p => p.subCategory).filter(Boolean))].map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(sub)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid var(--theme-text, #db2777)',
                    backgroundColor: activeSubCategory === sub ? 'var(--theme-text, #db2777)' : 'transparent',
                    color: activeSubCategory === sub ? '#fff' : 'var(--theme-text, #db2777)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="nykaa-main-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="nykaa-shimmer-card">
                  <div className="nykaa-shimmer-img"></div>
                  <div className="nykaa-shimmer-info">
                    <div className="nykaa-shimmer-line name"></div>
                    <div className="nykaa-shimmer-line rating"></div>
                    <div className="nykaa-shimmer-line price"></div>
                  </div>
                  <div className="nykaa-shimmer-btn"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            (activeCategory === "All" || (activeCategory === "Hand Made Soaps" && activeSubCategory === "All")) ? (
              // Grouped Render for "All" and "Hand Made Soaps"
              <div className="nykaa-grouped-grid">
                {(activeCategory === "All" ? uniqueCategories : [...new Set(filteredProducts.map(p => p.subCategory).filter(Boolean))]).map(groupName => {
                  const groupProducts = activeCategory === "All"
                    ? cosmeticProductsList.filter(p => p.category === groupName)
                    : filteredProducts.filter(p => p.subCategory === groupName);
                  if (groupProducts.length === 0) return null;
                  return (
                    <div key={groupName} className="category-group">
                      <h3 className="group-heading">{groupName}</h3>
                      <div className="nykaa-main-grid">
                        {groupProducts.map((product) => (
                          <div className="nykaa-product-card grid-item" key={product.id}>
                            <Link to={`/product/${product.slug}`} className="nykaa-card-link">
                              <div className="nykaa-image-wrapper">

                                <img src={product.images[0]} alt={product.name} loading="lazy" />
                                <button
                                  className={`nykaa-wishlist-btn ${isInWishlist(product.id) ? 'active' : ''} ${beatingHearts[product.id] ? 'heartbeat-anim' : ''}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const isAdding = !isInWishlist(product.id);
                                    toggleWishlist(product);
                                    if (isAdding) {
                                      setBeatingHearts(prev => ({ ...prev, [product.id]: true }));
                                      setTimeout(() => setBeatingHearts(prev => ({ ...prev, [product.id]: false })), 600);
                                    }
                                  }}
                                >
                                  <Heart size={16} fill={isInWishlist(product.id) ? "#ef4444" : "none"} color={isInWishlist(product.id) ? "#ef4444" : "currentColor"} />
                                </button>
                              </div>
                              <div className="nykaa-info">
                                <h3 className="nykaa-name">{product.name}</h3>
                                {product.variants && product.variants[0] && product.variants[0].size && product.variants[0].size !== 'Standard' && (
                                  <span className="nykaa-category-text" style={{ textTransform: 'lowercase' }}>{product.variants[0].size}</span>
                                )}
                                <div className="nykaa-rating">
                                  <span>{product.rating}</span>
                                  <Star size={12} fill="currentColor" />
                                  <span className="review-count">({product.reviews})</span>
                                </div>
                                <div className="nykaa-price-row">
                                  <span className="nykaa-price">₹{product.price}</span>

                                </div>
                              </div>
                            </Link>
                            <button className="nykaa-add-btn" onClick={(e) => { e.preventDefault(); addToCart(product, 1, product.variants ? product.variants[0].size : null, e); }}>Add to Bag</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Standard Grid for Specific Category (or specific subcategory of Hand Made Soaps)
              <div className="nykaa-main-grid">
                {filteredProducts.filter(p => activeCategory !== "Hand Made Soaps" || activeSubCategory === "All" || p.subCategory === activeSubCategory).map((product) => (
                  <div className="nykaa-product-card grid-item" key={product.id}>
                    <Link to={`/product/${product.slug}`} className="nykaa-card-link">
                      <div className="nykaa-image-wrapper">

                        <img src={product.images[0]} alt={product.name} loading="lazy" />
                        <button
                          className={`nykaa-wishlist-btn ${isInWishlist(product.id) ? 'active' : ''} ${beatingHearts[product.id] ? 'heartbeat-anim' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const isAdding = !isInWishlist(product.id);
                            toggleWishlist(product);
                            if (isAdding) {
                              setBeatingHearts(prev => ({ ...prev, [product.id]: true }));
                              setTimeout(() => setBeatingHearts(prev => ({ ...prev, [product.id]: false })), 600);
                            }
                          }}
                        >
                          <Heart size={16} fill={isInWishlist(product.id) ? "#ef4444" : "none"} color={isInWishlist(product.id) ? "#ef4444" : "currentColor"} />
                        </button>
                      </div>
                      <div className="nykaa-info">
                        <h3 className="nykaa-name">{product.name}</h3>
                        {product.variants && product.variants[0] && product.variants[0].size && product.variants[0].size !== 'Standard' && (
                          <span className="nykaa-category-text" style={{ textTransform: 'lowercase' }}>{product.variants[0].size}</span>
                        )}
                        <div className="nykaa-rating">
                          <span>{product.rating}</span>
                          <Star size={12} fill="currentColor" />
                          <span className="review-count">({product.reviews})</span>
                        </div>
                        <div className="nykaa-price-row">
                          <span className="nykaa-price">₹{product.price}</span>

                        </div>
                      </div>
                    </Link>
                    <button className="nykaa-add-btn" onClick={(e) => { e.preventDefault(); addToCart(product, 1, product.variants ? product.variants[0].size : null, e); }}>Add to Bag</button>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="nykaa-empty-state">
              <img src="https://placehold.co/150x150/f1f5f9/94a3b8?text=Empty" alt="No products" />
              <h3>No products found</h3>
              <p>Try selecting a different category.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Cosmetics;
