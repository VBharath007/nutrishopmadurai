import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Heart, Phone, Mic, ChevronRight } from 'lucide-react';
import logo from '../assets/shoplg.webp';
import './Header.css';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { productsData } from '../data/products';
import { cosmeticProductsData } from '../data/cosmeticsProducts';

const Header = ({ setIsCartOpen, setIsWishlistOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const exploreCategories = [...new Set(productsData.filter(p => p.id >= 1000).map(p => p.category))].sort();

  useEffect(() => {
    if (exploreCategories.length > 0 && !activeMenuCategory) {
      setActiveMenuCategory(exploreCategories[0]);
    }
  }, [exploreCategories]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const allProducts = [...productsData, ...cosmeticProductsData];
      const filtered = allProducts
        .filter(p => {
          if (p.id !== undefined && p.id < 200) return false;
          let searchLower = searchQuery.toLowerCase().trim();
          searchLower = searchLower.replace("noodels", "noodles").replace("noodel", "noodle");
          const matchesName = p.name && p.name.toLowerCase().includes(searchLower);
          const matchesCat = p.category && p.category.toLowerCase().includes(searchLower);
          return matchesName || matchesCat;
        })
        .slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-wrapper') && !e.target.closest('.mobile-search-wrapper')) {
        setShowSuggestions(false);
      }
      if (!e.target.closest('.category-btn') && !e.target.closest('.category-megamenu')) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/our-products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
    navigate(`/product/${product.slug}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVoiceSearch = () => {
    if (isListening) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setSearchQuery(""); // Clear the previous text so it visually refreshes
    };
    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setSearchQuery(currentTranscript);
      navigate(`/our-products?search=${encodeURIComponent(currentTranscript.trim())}`);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.start();
  };


  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Products', href: '/our-products' },
    { name: 'Ayurvedic Personal Care', href: '/ayurvedic-personal-care' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Testimonials', href: '/testimonials' }
  ];

  return (
    <>
      {isCategoryMenuOpen && (
        <div className="megamenu-backdrop" onClick={() => setIsCategoryMenuOpen(false)}></div>
      )}
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="marquee-container">
          <p className="marquee-text">
            <span>🌿 இயற்கையின் நன்மை, ஆரோக்கியத்தின் தொடக்கம் — நியூட்ரிஷாப்பில்</span>
            <span aria-hidden="true">🌿 இயற்கையின் நன்மை, ஆரோக்கியத்தின் தொடக்கம் — நியூட்ரிஷாப்பில்</span>
            <span aria-hidden="true">🌿 இயற்கையின் நன்மை, ஆரோக்கியத்தின் தொடக்கம் — நியூட்ரிஷாப்பில்</span>
          </p>
        </div>
      </div>
      {/* Solid Top Wrapper */}
      <div className="header-top-wrapper">
        <div className="container">
          {/* Top Row */}
          <div className="header-top-row">
            {/* Logo */}
            <div className="logo-container">
              <Link to="/">
                <img src={logo} alt="NutriShop Logo" className="logo-img" />
              </Link>
            </div>

            {/* Search */}
            <div className="search-wrapper desktop-only">
              <form onSubmit={handleSearchSubmit} className={`search-bar ${isListening ? 'listening' : ''}`}>
                <div className="search-g-logo-wrapper">
                  <Search size={18} color="#6b7280" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                <button 
                  type="button"
                  className={`mic-icon-btn ${isListening ? 'pulsing' : ''}`} 
                  onClick={handleVoiceSearch}
                  aria-label="Voice Search"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#4285F4" d="M12,14c1.66,0,3-1.34,3-3V5c0-1.66-1.34-3-3-3S9,3.34,9,5v6C9,12.66,10.34,14,12,14z"/>
                    <path fill="#34a853" d="M12,16c-2.76,0-5-2.24-5-5H5c0,3.53,2.61,6.43,6,6.92V21h2v-3.08c3.39-0.49,6-3.39,6-6.92h-2C17,13.76,14.76,16,12,16z"/>
                  </svg>
                </button>
              </form>

              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="search-suggestions-dropdown">
                  {suggestions.map((product) => (
                    <div 
                      key={product.id} 
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(product)}
                    >
                      <img src={product.images[0]} alt={product.name} className="suggestion-img" />
                      <div className="suggestion-info">
                        <span className="suggestion-name">{product.name}</span>
                        <span className="suggestion-meta">{product.category} | ₹{product.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="header-actions">
              <a href="tel:+919442028103" className="icon-btn action-btn phone-btn desktop-only" aria-label="Call Us">
                <div className="phone-icon-wrapper">
                  <Phone size={18} />
                </div>
                <span className="btn-text">+91 94420 28103</span>
              </a>
              
              <button 
                className="icon-btn action-btn wishlist-btn" 
                aria-label="Wishlist"
                onClick={() => setIsWishlistOpen(true)}
              >
                <Heart size={20} fill={wishlistItems.length > 0 ? "#ef4444" : "none"} color={wishlistItems.length > 0 ? "#ef4444" : "currentColor"} />
                {wishlistItems.length > 0 && <span className="cart-badge">{wishlistItems.length}</span>}
              </button>

              <button 
                id="global-cart-icon"
                className="icon-btn action-btn cart-btn" 
                aria-label="Shopping Cart"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="icon-btn mobile-menu-btn" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            </div>
          </div>

          {/* Bottom Row - Desktop Navigation */}
          <div className="header-bottom-row desktop-only">
          <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
            <button 
              className="category-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsCategoryMenuOpen(!isCategoryMenuOpen);
              }}
            >
              Shop by Category
              <span className="arrow-down">▼</span>
            </button>

            {/* Category Megamenu */}
            {isCategoryMenuOpen && (
              <div className="category-megamenu" onClick={(e) => e.stopPropagation()}>
                {/* Left Sidebar: Scrollable Categories */}
                <div className="megamenu-categories-list">
                  {exploreCategories.map((cat) => (
                    <div
                      key={cat}
                      className={`megamenu-category-item ${activeMenuCategory === cat ? 'active' : ''}`}
                      onMouseEnter={() => setActiveMenuCategory(cat)}
                      onClick={() => {
                        navigate(`/our-products?category=${encodeURIComponent(cat)}`);
                        setIsCategoryMenuOpen(false);
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>

                {/* Right Area: Top Products Visual Grid with Images */}
                <div className="megamenu-products-list">
                  <div className="megamenu-products-header">
                    <h4 className="megamenu-products-title">{activeMenuCategory}</h4>
                    <Link 
                      to={`/our-products?category=${encodeURIComponent(activeMenuCategory)}`} 
                      className="megamenu-view-all-link"
                      onClick={() => setIsCategoryMenuOpen(false)}
                    >
                      View All Products →
                    </Link>
                  </div>
                  
                  <div className="megamenu-products-visual-grid">
                    {productsData
                      .filter(p => p.id >= 1000 && p.category === activeMenuCategory)
                      .slice(0, 6)
                      .map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          className="megamenu-product-card-link"
                          onClick={() => setIsCategoryMenuOpen(false)}
                        >
                          <div className="megamenu-card-img-wrapper">
                            <img src={product.images[0]} alt={product.name} />
                          </div>
                          <div className="megamenu-card-info">
                            <span className="megamenu-card-name">{product.name}</span>
                            <span className="megamenu-card-price">₹{product.price}</span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}

            <nav className="desktop-nav">
              <ul className="nav-list">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    {link.href.startsWith('/') ? (
                      <NavLink to={link.href} className="nav-link">{link.name}</NavLink>
                    ) : (
                      <a href={link.href} className="nav-link">{link.name}</a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-search-wrapper" style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
            <form onSubmit={handleSearchSubmit} className={`search-bar mobile-search ${isListening ? 'listening' : ''}`}>
              <div className="search-g-logo-wrapper">
                <Search size={18} color="#6b7280" />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <button 
                type="button"
                className={`mic-icon-btn ${isListening ? 'pulsing' : ''}`} 
                onClick={handleVoiceSearch}
                aria-label="Voice Search"
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M12,14c1.66,0,3-1.34,3-3V5c0-1.66-1.34-3-3-3S9,3.34,9,5v6C9,12.66,10.34,14,12,14z"/>
                  <path fill="#34a853" d="M12,16c-2.76,0-5-2.24-5-5H5c0,3.53,2.61,6.43,6,6.92V21h2v-3.08c3.39-0.49,6-3.39,6-6.92h-2C17,13.76,14.76,16,12,16z"/>
                </svg>
              </button>
            </form>

            {/* Mobile Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions-dropdown">
                {suggestions.map((product) => (
                  <div 
                    key={product.id} 
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    <img src={product.images[0]} alt={product.name} className="suggestion-img" />
                    <div className="suggestion-info">
                      <span className="suggestion-name">{product.name}</span>
                      <span className="suggestion-meta">{product.category} | ₹{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <ul className="mobile-nav-list">
            {navLinks.map((link, index) => (
              <li key={index}>
                {link.href.startsWith('/') ? (
                  <NavLink to={link.href} className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</NavLink>
                ) : (
                  <a href={link.href} className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;
