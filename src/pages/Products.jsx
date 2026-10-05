import React, { useState, useEffect, useContext } from 'react';
import { Search, SlidersHorizontal, Check, X, LayoutGrid, List, ArrowLeft, Heart, Star, ChevronDown, ChevronRight, ChevronLeft, Eye, ShieldCheck, Users, Truck, ArrowRight, Sprout, Recycle, Leaf, ShoppingBasket } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { productsData } from '../data/products';
import { cosmeticProductsData } from '../data/cosmeticsProducts';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

import './Products.css';

const allProducts = [...productsData, ...cosmeticProductsData];
const exploreCategories = [...new Set(productsData.filter(p => p.id >= 1000).map(p => p.category))].sort();

// Using centralized productsData instead of dummyProducts

const Explore = () => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [beatingHearts, setBeatingHearts] = useState({});
  const [blinkScrollbar, setBlinkScrollbar] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewActiveVariant, setQuickViewActiveVariant] = useState(null);
  
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const banners = [
    "/aboutbanner/Aboutbanner1.png",
    "/aboutbanner/Aboutbanner2.png",
    "/aboutbanner/Aboutbanner3.png",
    "/aboutbanner/Aboutbanner5.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleImageError = (productId) => {
    setFailedImages(prev => ({ ...prev, [productId]: true }));
  };

  const handleAddToCart = (product, e, variantSize = null) => {
    const size = variantSize || (product.variants && product.variants.length > 0 ? product.variants[0].size : null);
    addToCart(product, 1, size, e);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  useEffect(() => {
    // Removed artificial delay to make filtering instant
    setIsLoading(false);
  }, [selectedCategory, sortBy, minPrice, maxPrice, selectedTags]);

  // Blink scrollbar effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkScrollbar(prev => !prev);
    }, 800);
    return () => clearInterval(blinkInterval);
  }, []);

  const scrollToProductsGrid = () => {
    setTimeout(() => {
      const grid = document.getElementById('products-grid');
      if (grid) {
        const headerOffset = 130;
        const elementPosition = grid.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Scroll to top on mount or scroll to products grid if category/search/hash present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasCategoryOrSearch = params.has('category') || params.has('search');

    if (location.hash === '#products-grid' || hasCategoryOrSearch) {
      scrollToProductsGrid();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const catParam = params.get('category');

    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }

    if (catParam) {
      // 1. Try exact case-insensitive match in database categories
      const exactMatch = exploreCategories.find(c => c.toLowerCase() === catParam.toLowerCase());
      if (exactMatch) {
        setSelectedCategory(exactMatch);
        setSearchQuery("");
      } else {
        // 2. Try partial match (e.g., "HONEY" matches "PURE HONEY & SPICES")
        const partialMatch = exploreCategories.find(c => c.toLowerCase().includes(catParam.toLowerCase()));
        if (partialMatch) {
          setSelectedCategory(partialMatch);
          setSearchQuery("");
        } else {
          // 3. Fallback: select All and search category name as keyword search (e.g. category=MILLETS searches for "millet" in all products)
          setSelectedCategory("All");
          setSearchQuery(catParam);
        }
      }
    } else {
      // If there's no category param, we should reset to All, even if there is a search param.
      // This ensures global searches from the header work correctly across all categories.
      setSelectedCategory("All");
    }
  }, [location.search]);

  let filteredProducts = allProducts.filter(p => {
    // Skip purely dummy products (ID < 200)
    if (p.id !== undefined && p.id < 200) return false;
    
    // Hide cosmetics (IDs 200-999) from the general grid unless the user is actively searching
    const hasActiveSearch = searchQuery.trim().length > 0;
    if (p.id !== undefined && p.id < 1000 && !hasActiveSearch) return false;

    const productName = p.name ? p.name.toLowerCase() : "";
    const productCategory = p.category ? p.category : "Uncategorized";
    const productPrice = Number(p.price) || 0;

    let matchesCategory = selectedCategory === "All" || productCategory === selectedCategory;
    
    // Group Noodles and Vermicelli under PASTA category for easier access
    if (selectedCategory === "PASTA") {
      matchesCategory = ["PASTA", "NOODLES", "VERMICELLI"].includes(productCategory);
    }
    let searchLower = searchQuery.toLowerCase().trim();
    
    // Normalize common misspellings (especially from voice search)
    searchLower = searchLower.replace(/chap+at+h?i/g, 'chapathi');
    searchLower = searchLower.replace("noodels", "noodles").replace("noodel", "noodle");

    const matchesSearch = productName.includes(searchLower) || productCategory.toLowerCase().includes(searchLower);

    // Treat 5000 as "5000+" (no upper limit)
    const matchesPrice = productPrice >= minPrice && (maxPrice >= 5000 ? true : productPrice <= maxPrice);

    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag =>
      p.tag?.includes(tag) || p.highlights?.some(h => h.includes(tag)) || productName.includes(tag.toLowerCase())
    );

    return matchesCategory && matchesSearch && matchesPrice && matchesTags;
  });

  // Sorting Logic
  filteredProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'price-low') return Number(a.price || 0) - Number(b.price || 0);
    if (sortBy === 'price-high') return Number(b.price || 0) - Number(a.price || 0);
    if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
    if (sortBy === 'name-asc') return String(a.name || "").localeCompare(String(b.name || ""));
    if (sortBy === 'name-desc') return String(b.name || "").localeCompare(String(a.name || ""));
    // default (popularity): sort by reviews
    return Number(b.reviews || 0) - Number(a.reviews || 0);
  });

  const getCategorySubtext = (cat) => {
    switch (cat.toLowerCase()) {
      case 'amma maavu': return "Traditional & wholesome flour products";
      case 'chekku oils': return "Pure & natural wood-pressed oils";
      case 'snacks': return "Healthy & delicious traditional snacks";
      case 'appalam': return "Crispy & traditional homestyle appalams";
      case 'bath powders': return "Natural care for glowing & healthy skin";
      default: return "Premium quality natural products";
    }
  };

  return (
    <div className="explore-page" style={{
      '--theme-bg': 'transparent',
      '--theme-text': '#16a34a',
      '--theme-banner': 'linear-gradient(135deg, #dcfce7, #bbf7d0)'
    }}>





      {/* New Hero Section (Only visible when no category/search is active) */}
      {(!selectedCategory || selectedCategory === "All") && !searchQuery && (
        <div className="products-simple-banner" style={{ width: '100%', margin: '0 0 2rem 0' }}>
          <div style={{ position: 'relative', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', overflow: 'hidden', backgroundColor: '#fcf9f2', transition: 'height 0.3s ease' }}>
            <img src={banners[currentBannerIndex]} style={{ width: '100%', height: 'auto', visibility: 'hidden', display: 'block' }} alt="" />
            {banners.map((src, index) => (
              <img 
                key={src}
                src={src} 
                alt={`About Our Products ${index + 1}`} 
                className="products-banner-image"
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%', 
                  height: '100%', 
                  opacity: currentBannerIndex === index ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out' 
                }} 
              />
            ))}

            <button 
              type="button"
              className="products-slider-nav-btn left-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentBannerIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
              }}
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', pointerEvents: 'auto' }}
              aria-label="Previous Banner"
            >
              <ChevronLeft size={24} color="#333" />
            </button>
            <button 
              type="button"
              className="products-slider-nav-btn right-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
              }}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', pointerEvents: 'auto' }}
              aria-label="Next Banner"
            >
              <ChevronRight size={24} color="#333" />
            </button>

            <div className="slider-indicators">
              {banners.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentBannerIndex(idx);
                  }}
                  className={`indicator-dot ${currentBannerIndex === idx ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="products-grid" className="container explore-layout">

        {/* Floating Search & Filter Bar */}
        {selectedCategory === "All" && (
          <div className="floating-search-card">
            <div className="fsc-left" style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Search size={20} className="fsc-search-icon" color="#94a3b8" />
              <input 
                type="text" 
                placeholder="Search for products, categories, benefits..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="fsc-search-input"
                style={{ flex: 1 }}
              />
              {searchQuery && (
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    if (location.search) navigate('/our-products', { replace: true });
                  }} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 8px' }}
                  title="Clear Search"
                >
                  <X size={18} color="#94a3b8" />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="fsc-right">
                <div className="fsc-sort">
                  <span>Sort By: </span>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="popular">Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <main className="explore-content">

          {isLoading ? (
            <div className={`products-container ${viewMode}`}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`shimmer-card ${viewMode}`}>
                  <div className="shimmer-img"></div>
                  <div className="shimmer-info">
                    <div className="shimmer-line cat"></div>
                    <div className="shimmer-line name"></div>
                    <div className="shimmer-line price"></div>
                    <div className="shimmer-line btn"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {(!selectedCategory || selectedCategory === "All") && !searchQuery && (
                <>
                  <div className="shop-by-category-header">
                    <h2><Leaf size={24} fill="#166534" color="#166534" /> Shop by Category</h2>
                  </div>
                  <div className="simple-category-grid">
                    {exploreCategories.map((cat, index) => {
                      const catProducts = productsData.filter(p => p.category === cat);
                      const itemCount = catProducts.length;
                      const catImage = catProducts.length > 0 && catProducts[0].images && catProducts[0].images.length > 0 ? catProducts[0].images[0] : null;
                      const catSubtitle = getCategorySubtext(cat);
                      
                      return (
                        <div 
                          className="poster-category-card"
                          key={index}
                          onClick={() => { setSelectedCategory(cat); scrollToProductsGrid(); }}
                        >
                          <div className="pcc-img-wrapper">
                            {catImage ? (
                              <img src={catImage} alt={cat} loading="lazy" />
                            ) : (
                              <span className="placeholder-text">{cat.charAt(0)}</span>
                            )}
                            <div className="pcc-wave">
                               <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                                  <path d="M0,0 C300,100 600,100 900,40 C1200,-20 1440,60 1440,60 L1440,120 L0,120 Z" fill="#fcf9f2"></path>
                               </svg>
                            </div>
                          </div>
                          
                          <div className="pcc-content">
                            <h3 className="pcc-title">{cat}</h3>
                            <p className="pcc-subtitle">{catSubtitle}</p>
                            
                            <div className="pcc-badge-wrapper">
                               <div className="pcc-badge">
                                  <span className="pcc-basket"><ShoppingBasket size={18} color="#65a30d" /></span>
                                  <span className="pcc-count-num">{itemCount}</span>
                                  <span className="pcc-divider"></span>
                                  <span className="pcc-count-text">ITEMS</span>
                               </div>
                               <div className="pcc-spark pcc-spark-1"></div>
                               <div className="pcc-spark pcc-spark-2"></div>
                               <div className="pcc-spark pcc-spark-3"></div>
                            </div>
                            
                            {/* Decorative side leaves */}
                            <div className="pcc-decor-leaf left-leaf">
                              <Leaf size={40} color="#84cc16" strokeWidth={1} opacity={0.3} />
                            </div>
                            <div className="pcc-decor-leaf right-leaf">
                              <Leaf size={40} color="#84cc16" strokeWidth={1} opacity={0.3} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {selectedCategory !== "All" && (
                <div className="active-category-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div className="title-and-chips" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <h2 className="active-category-title" style={{ margin: 0 }}>{selectedCategory}</h2>
                    
                    {/* Show sub-category chips when PASTA, NOODLES, or VERMICELLI is selected */}
                    {["PASTA", "NOODLES", "VERMICELLI"].includes(selectedCategory) && (
                      <div className="sub-category-chips">
                          <button 
                            className={`sub-cat-chip ${selectedCategory === "PASTA" ? "active" : ""}`} 
                            onClick={() => setSelectedCategory("PASTA")}
                          >
                            <span className="chip-img-wrapper"><img src="/nutishophomebanner/homehero1.png" alt="Pasta" className="chip-actual-img" /></span> 
                            <span className="chip-text">Pasta</span>
                          </button>
                        
                          <button 
                            className={`sub-cat-chip ${selectedCategory === "NOODLES" ? "active" : ""}`} 
                            onClick={() => setSelectedCategory("NOODLES")}
                          >
                            <span className="chip-img-wrapper"><img src="/category-images/noodles_new.png" alt="Noodles" className="chip-actual-img" /></span> 
                            <span className="chip-text">Noodles</span>
                          </button>
                        
                          <button 
                            className={`sub-cat-chip ${selectedCategory === "VERMICELLI" ? "active" : ""}`} 
                            onClick={() => setSelectedCategory("VERMICELLI")}
                          >
                            <span className="chip-img-wrapper"><img src="/category-images/vermicelli_new.png" alt="Vermicelli" className="chip-actual-img" /></span> 
                            <span className="chip-text">Vermicelli</span>
                          </button>
                      </div>
                    )}
                  </div>
                  
                  <button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }} className="clear-category-btn">
                    <ArrowLeft size={16} /> Back to Categories
                  </button>
                </div>
              )}
              
              {(selectedCategory !== "All" || searchQuery) && (
                filteredProducts.length > 0 ? (
                  <div className={`products-container ${viewMode}`}>
                  {filteredProducts.map((product) => (
                    <div className={`nykaa-product-card grid-item ${viewMode === 'list' ? 'list-view-card' : ''}`} key={product.id}>
                      <Link to={`/product/${product.slug}`} className="nykaa-card-link">
                        <div className="nykaa-image-wrapper">
                          {product.images && product.images.length > 0 && !failedImages[product.id] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              loading="lazy"
                              onError={() => handleImageError(product.id)}
                            />
                          ) : (
                            <div className="product-img-placeholder" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', borderRadius: '12px' }}>
                              <span className="placeholder-text">{product.category ? product.category.split(' ')[0] : 'Product'}</span>
                            </div>
                          )}
                          <button
                            className={`nykaa-wishlist-btn ${isInWishlist(product.id) ? 'active' : ''} ${beatingHearts[product.id] ? 'heartbeat-anim' : ''}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const isAdding = !isInWishlist(product.id);
                              toggleWishlist(product);
                              if (isAdding) {
                                setBeatingHearts(prev => ({ ...prev, [product.id]: true }));
                                setTimeout(() => {
                                  setBeatingHearts(prev => ({ ...prev, [product.id]: false }));
                                }, 600);
                              }
                            }}
                          >
                            <Heart size={18} strokeWidth={2.5} fill={isInWishlist(product.id) ? "#ef4444" : "none"} color={isInWishlist(product.id) ? "#ef4444" : "currentColor"} />
                          </button>
                          
                          <button 
                            className="quick-view-trigger-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setQuickViewProduct(product);
                              setQuickViewActiveVariant(product.variants && product.variants.length > 0 ? product.variants[0] : null);
                            }}
                          >
                            <Eye size={18} />
                            <span>Quick View</span>
                          </button>
                        </div>
                        <div className="nykaa-info">
                          <h3 className="nykaa-name">{product.name}</h3>
                          <p className="nykaa-category-text">
                            {product.category} {product.variants && product.variants.length > 0 && product.variants[0].size ? <span>&bull; {product.variants[0].size}</span> : null}
                          </p>

                          <div className="nykaa-rating">
                            <span>{product.rating}</span>
                            <Star size={12} fill="currentColor" />
                            <span className="review-count">({product.reviews})</span>
                          </div>

                          {viewMode === 'list' && (
                            <div className="list-view-extra" style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.8rem' }}>
                              <ul className="list-highlights" style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                {product.highlights?.slice(0, 3).map((h, i) => <li key={i}>{h}</li>)}
                              </ul>
                            </div>
                          )}

                          <div className="nykaa-price-row">
                            <span className="nykaa-price">₹{product.price}</span>
                          </div>
                        </div>
                      </Link>
                      <button
                        className={`nykaa-add-btn ${addedItems[product.id] ? 'added' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product, e);
                        }}
                      >
                        {addedItems[product.id] ? "✓ Added" : "Add to Bag"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <Search size={48} className="no-results-icon" />
                  <h3>No products found</h3>
                  <p>We couldn't find any products matching your search.</p>
                  <button className="reset-btn" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>Reset Filters</button>
                </div>
              ))}


            </>
          )}
        </main>
      </div>
      {quickViewProduct && (
        <div className="quick-view-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="quick-view-modal" onClick={e => e.stopPropagation()}>
            <button className="close-qv-btn" onClick={() => setQuickViewProduct(null)}>
              <X size={24} />
            </button>
            <div className="qv-content">
              <div className="qv-image-section">
                <img 
                  src={quickViewProduct.images && quickViewProduct.images.length > 0 ? quickViewProduct.images[0] : ''} 
                  alt={quickViewProduct.name} 
                  className="qv-image"
                />
                <button 
                  className="qv-add-btn" 
                  onClick={(e) => { 
                    handleAddToCart(quickViewProduct, e, quickViewActiveVariant?.size); 
                    setQuickViewProduct(null); 
                  }}
                  style={{ width: '100%', marginTop: '1.5rem', marginBottom: 0 }}
                >
                  Add to Bag • ₹{quickViewActiveVariant ? quickViewActiveVariant.price : quickViewProduct.price}
                </button>
              </div>
              <div className="qv-details-section">
                <span className="qv-category">
                  {quickViewProduct.category} {quickViewActiveVariant ? <span>&bull; {quickViewActiveVariant.size}</span> : null}
                </span>
                <h2 className="qv-title">{quickViewProduct.name}</h2>
                <div className="qv-rating">
                  <span className="qv-rating-val">{quickViewProduct.rating}</span>
                  <Star size={16} fill="#fbbf24" color="#fbbf24" />
                  <span className="qv-reviews">({quickViewProduct.reviews} reviews)</span>
                </div>
                <div className="qv-price-box">
                  <span className="qv-price">₹{quickViewActiveVariant ? quickViewActiveVariant.price : quickViewProduct.price}</span>
                </div>

                {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                  <div className="qv-variants-box" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#475569' }}>Select Size / Weight</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {quickViewProduct.variants.map((v, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setQuickViewActiveVariant(v); }}
                          style={{
                            padding: '0.4rem 0.8rem',
                            border: quickViewActiveVariant?.size === v.size ? '2px solid #166534' : '1px solid #cbd5e1',
                            borderRadius: '6px',
                            background: quickViewActiveVariant?.size === v.size ? '#f0fdf4' : '#fff',
                            color: quickViewActiveVariant?.size === v.size ? '#166534' : '#475569',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: quickViewActiveVariant?.size === v.size ? '600' : '500'
                          }}
                        >
                          {v.size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {quickViewProduct.highlights && (
                  <div className="qv-highlights-box">
                    <h4>Why you'll love it:</h4>
                    <ul>
                      {quickViewProduct.highlights.map((h, i) => (
                        <li key={i}><Check size={14} color="#166534" /> {h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
