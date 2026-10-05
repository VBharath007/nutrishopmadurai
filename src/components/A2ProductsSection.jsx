import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './A2ProductsSection.css';
import cowsImg from '../assets/cows.png';

const a2Products = [
  {
    id: "a2-butter-1",
    name: "A2 Butter",
    price: 450,
    image: "/Product-images/A2 Products/A2 Butter.webp",
    description: "Made from pure A2 milk, rich in nutrients and creamy goodness."
  },
  {
    id: "a2-ghee-1",
    name: "A2 Ghee",
    price: 850,
    image: "/Product-images/A2 Products/A2 Ghee.webp",
    description: "Traditional bilona ghee. Rich aroma and natural goodness."
  },
  {
    id: "a2-paneer-1",
    name: "A2 Paneer",
    price: 320,
    image: "/Product-images/A2 Products/A2 Paneer.webp",
    description: "Soft, fresh and protein-rich paneer made from pure A2 milk."
  }
];

const A2ProductsSection = () => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product, 1, null, e);
  };

  return (
    <section className="a2-custom-section">
      <div className="a2-custom-container">

        {/* Left Column - 3D Character */}
        <div className="a2-center-col">
          <img src={cowsImg} alt="A2 Cows" className="a2-cow-image" />
        </div>

        {/* Right Column - Products & Signboard */}
        <div className="a2-right-col">

          <div className="a2-section-title-wrapper">
            <h3>A2 PRODUCTS</h3>
            {/* <p>Pure. Natural. Wholesome.</p> */}
          </div>

          <div className="a2-products-row">
            {a2Products.map((product) => (
              <div className="a2-prod-card" key={product.id}>
                <div className="a2-prod-img-box">
                  <img src={product.image} alt={product.name} />
                </div>
                <h4 className="a2-prod-name">{product.name}</h4>
                <p className="a2-prod-desc">{product.description}</p>
                <div className="a2-price-tag">₹{product.price}</div>
                <button onClick={(e) => handleAddToCart(e, product)} className="a2-prod-shop-btn">
                  Add to Bag
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default A2ProductsSection;
