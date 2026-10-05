import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import './FeaturedProducts.css';

const products = [
  { id: 1, name: 'Cold Pressed Groundnut Oil', price: '$12.50', image: 'bg-green-light', rating: 5, reviews: 159 },
  { id: 2, name: 'Traditional Health Mix', price: '$8.40', image: 'bg-orange-light', rating: 4, reviews: 120 },
  { id: 3, name: 'A2 Desi Cow Ghee', price: '$24.00', image: 'bg-yellow-light', rating: 5, reviews: 310 },
  { id: 4, name: 'Millet Noodles', price: '$4.50', image: 'bg-blue-light', rating: 4, reviews: 85 },
];

const ProductCard = ({ product }) => (
  <div className="product-card">
    <div className="product-image-container">
      <div className={`product-image-placeholder ${product.image}`}>
        <span className="product-initials">{product.name.substring(0, 2).toUpperCase()}</span>
      </div>
    </div>
    <div className="product-details">
      <h3 className="product-title">{product.name}</h3>
      <p className="product-desc">Pure and authentic quality that is very healthy.</p>
      
      <div className="product-rating">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < product.rating ? "star-filled" : "star-empty"} fill={i < product.rating ? "currentColor" : "none"} />
        ))}
        <span className="reviews-count">({product.reviews})</span>
      </div>
      
      <div className="product-bottom-row">
        <span className="current-price">{product.price}</span>
        <button className="add-to-cart-square" aria-label="Add to cart">
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  </div>
);

const FeaturedProducts = ({ title = "SPECIAL MENU" }) => {
  return (
    <section className="special-menu-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">
            Some of our special food menu is given here. These are what people order more. If you want, you can order from here.
          </p>
        </div>
        <div className="products-grid">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
