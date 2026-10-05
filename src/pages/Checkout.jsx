import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Checkout.css';
import { ArrowLeft, CheckCircle, X } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert("Please fill in all required shipping details.");
      return;
    }

    const shippingCost = cartTotal >= 1999 ? 0 : 50; 
    
    const newOrderData = {
      items: [...cartItems],
      total: cartTotal,
      shipping: shippingCost,
      customer: formData,
      orderId: 'ORD-' + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleDateString()
    };
    
    // 1. Format and Open WhatsApp Message
    let message = `=================================\n`;
    message += `    NUTRISHOP MADURAI       \n`;
    message += `=================================\n`;
    message += `DATE       : ${newOrderData.date}\n`;
    message += `---------------------------------\n`;
    message += `CUSTOMER DETAILS:\n`;
    message += `Name    : ${formData.name}\n`;
    message += `Phone   : ${formData.phone}\n`;
    // Address splitting into two lines if possible, or just print it
    message += `Address : ${formData.address},\n`;
    message += `          ${formData.city} - ${formData.pincode}\n`;
    message += `---------------------------------\n`;
    message += `ITEMS ORDERED:\n`;
    
    newOrderData.items.forEach((item, index) => {
      const variantStr = item.selectedVariant ? ` (${item.selectedVariant})` : "";
      message += `${index + 1}. ${item.name}${variantStr}\n`;
      message += `   Qty: ${item.quantity}  x  ₹${item.price} = ₹${item.price * item.quantity}\n`;
    });

    message += `---------------------------------\n`;
    message += `SUBTOTAL    : ₹${newOrderData.total}\n`;
    message += `SHIPPING    : ${newOrderData.shipping === 0 ? 'FREE' : `₹${newOrderData.shipping}`}\n`;
    message += `GRAND TOTAL : ₹${newOrderData.total + newOrderData.shipping}\n`;
    message += `=================================\n`;
    message += `  Thank you for shopping with us! \n`;
    message += `=================================`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919442028103";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // 2. Clear Cart and redirect to products
    clearCart();
    alert("Thank you for your order! Redirecting to products.");
    navigate('/our-products');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page empty-view">
        <div className="container text-center">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart before proceeding to checkout.</p>
          <button className="btn-primary mt-4" onClick={() => navigate('/our-products')}>
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  const shippingCost = cartTotal >= 1999 ? 0 : 50; // Free shipping over 1999

  return (
    <div className="checkout-page">
      <div className="container">
        <button className="back-btn mobile-hide-back-btn" onClick={() => navigate('/cart')}>
          <ArrowLeft size={20} /> Back
        </button>
        
        <div className="checkout-grid">
          {/* Form Section */}
          <div className="checkout-form-section" style={{ position: 'relative' }}>
            <button 
              className="mobile-close-checkout-btn" 
              onClick={() => navigate(-1)}
              aria-label="Go Back"
            >
              <X size={24} />
            </button>
            <h2>Shipping Details</h2>
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="checkout-form">
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 9442028103" />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea required name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main St, Apt 4B" rows="3"></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="600001" />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Section */}
          <div className="checkout-summary-section">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="summary-item">
                  <div className="summary-item-img">
                    <img src={item.images ? item.images[0] : item.image} alt={item.name} />
                  </div>
                  <div className="summary-item-details">
                    <h4>{item.name}</h4>
                    {item.selectedVariant && <p>Variant: {item.selectedVariant}</p>}
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="summary-item-price">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-totals">
              <div className="totals-row">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="totals-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
              </div>
              <div className="totals-row grand-total">
                <span>Total</span>
                <span>₹{cartTotal + shippingCost}</span>
              </div>
            </div>

            <div className="action-buttons">
              <button type="submit" form="checkout-form" className="place-order-btn">
                Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
