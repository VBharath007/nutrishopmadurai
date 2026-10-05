import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { Helmet } from 'react-helmet-async';
import { productsData } from '../data/products';
import { cosmeticProductsData } from '../data/cosmeticsProducts';

const allProducts = [...productsData, ...cosmeticProductsData];
import { ChevronRight, Star, Tag, ShoppingCart, Zap, CheckCircle2, Package, ArrowLeft, Heart } from 'lucide-react';
import ShopByCategory from '../components/ShopByCategory';
import './ProductDetail.css';

const SEOEngine = ({ product }) => {
  const currentUrl = `https://nutrishop.com/product/${product.slug}`;

  // Structured Data (JSON-LD)
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images[0],
    "description": product.metaDescription,
    "sku": `NUTRI-${product.id}`,
    "offers": {
      "@type": "Offer",
      "url": currentUrl,
      "priceCurrency": "INR",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nutrishop.com" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://nutrishop.com/our-products" },
      { "@type": "ListItem", "position": 3, "name": product.category, "item": `https://nutrishop.com/our-products?category=${product.category}` },
      { "@type": "ListItem", "position": 4, "name": product.name }
    ]
  };

  let faqSchema = null;
  if (product.faqs && product.faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": product.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{product.metaTitle}</title>
      <meta name="description" content={product.metaDescription} />

      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Social Media */}
      <meta property="og:title" content={product.metaTitle} />
      <meta property="og:description" content={product.metaDescription} />
      <meta property="og:image" content={product.images[0]} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="product" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={product.metaTitle} />
      <meta name="twitter:description" content={product.metaDescription} />
      <meta name="twitter:image" content={product.images[0]} />

      {/* Schemas */}
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
    </Helmet>
  );
};

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [activeVariant, setActiveVariant] = useState(null);
  const [zoomProps, setZoomProps] = useState({ x: 50, y: 50, show: false });
  const [isAdded, setIsAdded] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [beatingHearts, setBeatingHearts] = useState({});

  const handleAddToCart = (e) => {
    addToCart(product, 1, activeVariant?.size, e);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleBuyNow = (e) => {
    addToCart(product, 1, activeVariant?.size, e);
    setIsBuying(true);
    setTimeout(() => {
      navigate('/checkout');
    }, 800);
  };

  useEffect(() => {
    // Scroll to top automatically when URL changes
    window.scrollTo(0, 0);

    const foundProduct = allProducts.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.images[0]);
      if (foundProduct.variants && foundProduct.variants.length > 0) {
        setActiveVariant(foundProduct.variants[0]);
      } else {
        setActiveVariant(null);
      }
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/our-products" className="back-btn">Back to Products</Link>
      </div>
    );
  }

  // Related Products Logic (same category, excluding current)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Zoom Logic
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomProps({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setZoomProps({ ...zoomProps, show: false });
  };

  return (
    <div className="product-detail-page animate-fade-in-page">
      <SEOEngine product={product} />

      {/* Breadcrumbs */}
      <div className="breadcrumb-wrapper">
        <div className="container breadcrumb-container">
          <button
            onClick={() => navigate(-1)}
            className="go-back-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ffffff',
              border: '1px solid #166534',
              cursor: 'pointer',
              color: '#166534',
              fontWeight: '600',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              fontSize: '0.95rem',
              boxShadow: '4px 4px 10px #e0e0e0, -4px -4px 10px #ffffff'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = 'inset 4px 4px 8px #e0e0e0, inset -4px -4px 8px #ffffff';
              e.currentTarget.style.transform = 'scale(0.98)';
              e.currentTarget.style.borderColor = '#14532d';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '4px 4px 10px #e0e0e0, -4px -4px 10px #ffffff';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = '#166534';
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={14} className="breadcrumb-sep" />
          
          {cosmeticProductsData.some(p => p.id === product.id) ? (
            <>
              <Link to="/ayurvedic-personal-care" className="breadcrumb-link">Ayurvedic Personal Care</Link>
              <ChevronRight size={14} className="breadcrumb-sep" />
              <Link to={`/ayurvedic-personal-care?category=${encodeURIComponent(product.category)}`} className="breadcrumb-link">{product.category}</Link>
            </>
          ) : (
            <>
              <Link to="/our-products" className="breadcrumb-link">Products</Link>
              <ChevronRight size={14} className="breadcrumb-sep" />
              <Link to={`/our-products?category=${encodeURIComponent(product.category)}`} className="breadcrumb-link">
                {product.category}
              </Link>
            </>
          )}
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current">{product.name}</span>
        </div>
      </div>

      <div className="container pd-main-layout">

        {/* LEFT COLUMN: Gallery */}
        <div className="pd-gallery-section">
          <div
            className="pd-main-image-box"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ overflow: 'hidden', position: 'relative' }}
          >
            <img
              src={activeImage}
              alt={product.name}
              className="pd-main-img"
              style={{
                transform: zoomProps.show ? 'scale(2.5)' : 'scale(1)',
                transformOrigin: `${zoomProps.x}% ${zoomProps.y}%`,
                transition: zoomProps.show ? 'none' : 'transform 0.3s ease',
                cursor: zoomProps.show ? 'crosshair' : 'default'
              }}
            />
          </div>
          <div className="pd-thumbnail-list">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                className={`pd-thumbnail ${activeImage === img ? 'active' : ''}`}
                onMouseEnter={() => setActiveImage(img)}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`${product.name} view ${idx + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          {/* Huge Action Buttons */}
          <div className="pd-action-buttons desktop-only">
            <button className={`pd-btn cart-btn ${isAdded ? 'added' : ''}`} style={{ position: 'relative' }} onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              {isAdded ? (
                <>
                  ADDED
                  <span className="burst-particles">
                    <span className="particle p1"></span>
                    <span className="particle p2"></span>
                    <span className="particle p3"></span>
                    <span className="particle p4"></span>
                    <span className="particle p5"></span>
                    <span className="particle p6"></span>
                  </span>
                </>
              ) : "ADD TO CART"}
            </button>
            <button className={`pd-btn buy-btn ${isBuying ? 'added' : ''}`} style={{ position: 'relative' }} onClick={handleBuyNow}>
              <Zap size={20} />
              {isBuying ? (
                <>
                  PROCESSING
                  <span className="burst-particles">
                    <span className="particle p1"></span>
                    <span className="particle p2"></span>
                    <span className="particle p3"></span>
                    <span className="particle p4"></span>
                    <span className="particle p5"></span>
                    <span className="particle p6"></span>
                  </span>
                </>
              ) : "BUY NOW"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Details */}
        <div className="pd-details-section">
          <div className="pd-brand">{product.category}</div>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-rating-row">
            <div className="pd-rating-badge">
              {product.rating} <Star size={14} fill="currentColor" />
            </div>
            <span className="pd-reviews-count">{product.reviews} Ratings & Reviews</span>
          </div>

          <div className="pd-price-section">
            <span className="pd-current-price">₹{activeVariant ? activeVariant.price : product.price}</span>
          </div>

          {/* Available Offers */}
          {product.offers && product.offers.length > 0 && (
            <div className="pd-offers">
              <h3 className="pd-section-title">Available offers</h3>
              <ul className="pd-offers-list">
                {product.offers.map((offer, idx) => (
                  <li key={idx}><Tag size={16} className="offer-icon" /> <span>{offer}</span></li>
                ))}
              </ul>
            </div>
          )}

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="pd-variants">
              <h3 className="pd-section-title">Select Size / Weight</h3>
              <div className="variants-list">
                {product.variants.map((v, idx) => (
                  <button
                    key={idx}
                    className={`variant-btn ${activeVariant?.size === v.size ? 'active' : ''}`}
                    onClick={() => setActiveVariant(v)}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Action Buttons */}
          <div className="pd-action-buttons mobile-only">
            <button className={`pd-btn cart-btn ${isAdded ? 'added' : ''}`} style={{ position: 'relative' }} onClick={handleAddToCart}>
              {isAdded ? (
                <>
                  ADDED
                  <span className="burst-particles">
                    <span className="particle p1"></span>
                    <span className="particle p2"></span>
                    <span className="particle p3"></span>
                    <span className="particle p4"></span>
                    <span className="particle p5"></span>
                    <span className="particle p6"></span>
                  </span>
                </>
              ) : "Go to cart"}
            </button>
            <button className={`pd-btn buy-btn ${isBuying ? 'added' : ''}`} style={{ position: 'relative' }} onClick={handleBuyNow}>
              {isBuying ? (
                <>
                  PROCESSING
                  <span className="burst-particles">
                    <span className="particle p1"></span>
                    <span className="particle p2"></span>
                    <span className="particle p3"></span>
                    <span className="particle p4"></span>
                    <span className="particle p5"></span>
                    <span className="particle p6"></span>
                  </span>
                </>
              ) : `Buy at ₹${product.price}`}
            </button>
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="pd-highlights">
              <h3 className="pd-section-title">Highlights</h3>
              <ul className="pd-highlights-list">
                {product.highlights.map((h, idx) => (
                  <li key={idx}><span>•</span> {h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <div className="pd-description">
            <h3 className="pd-section-title">Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Trust Badges */}
          <div className="pd-trust-badges">
            <div className="trust-badge">
              <CheckCircle2 size={24} className="trust-icon" />
              <span>100% Genuine</span>
            </div>
            <div className="trust-badge">
              <Package size={24} className="trust-icon" />
              <span>Secure Packaging</span>
            </div>
          </div>

          {/* Reviews Breakdown Section */}
          <div className="pd-reviews-breakdown">
            <h3 className="pd-section-title">Product Ratings & Reviews</h3>
            <div className="reviews-summary-box">
              <div className="rating-giant">
                <span className="giant-num">{product.rating}</span>
                <div className="giant-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"} 
                      color="#fbbf24" 
                    />
                  ))}
                </div>
                <span className="giant-reviews-count">{product.reviews} ratings</span>
              </div>
              <div className="rating-bars-container">
                {[
                  { star: 5, pct: 75 },
                  { star: 4, pct: 15 },
                  { star: 3, pct: 6 },
                  { star: 2, pct: 2 },
                  { star: 1, pct: 2 }
                ].map((row) => (
                  <div key={row.star} className="rating-bar-row">
                    <span className="bar-label">{row.star} ★</span>
                    <div className="bar-track">
                      <div className="bar-fill animated-fill" style={{ width: `${row.pct}%` }}></div>
                    </div>
                    <span className="bar-pct">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <div className="container">
            <h2 className="related-title">Similar Products You May Like</h2>
            <div className="related-grid">
              {relatedProducts.map(rp => (
                <Link to={`/product/${rp.slug}`} key={rp.id} className="related-card">
                  <div className="related-img-box">
                    <img src={rp.images[0]} alt={rp.name} loading="lazy" />
                  </div>
                  <div className="related-info">
                    <h4 className="related-name">{rp.name}</h4>
                    <div className="related-price">₹{rp.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* (Shop By Category removed per user request) */}

    </div>
  );
};

export default ProductDetail;
