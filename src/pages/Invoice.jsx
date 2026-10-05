import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Printer, ArrowLeft, Download, MessageCircle } from 'lucide-react';
import logo from '../assets/shoplg.webp';
import './Invoice.css';

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get order data from route state or fallback to decoding from URL query parameter
  let orderData = location.state;
  if (!orderData) {
    const queryParams = new URLSearchParams(location.search);
    const orderParam = queryParams.get('order');
    if (orderParam) {
      try {
        orderData = JSON.parse(decodeURIComponent(escape(atob(orderParam))));
      } catch (err) {
        console.error("Failed to decode order from query parameter", err);
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!orderData) {
    return (
      <div className="invoice-error">
        <h2>No Invoice Found</h2>
        <p>We couldn't find the invoice details. Please return to the shop.</p>
        <button className="btn-primary" onClick={() => navigate('/our-products')}>Return to Shop</button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    let serializedOrder = "";
    try {
      serializedOrder = btoa(unescape(encodeURIComponent(JSON.stringify(orderData))));
    } catch (err) {
      console.error("Failed to serialize order", err);
    }
    const liveInvoiceUrl = `${window.location.origin}/invoice?order=${serializedOrder}`;

    let message = `📦 *NUTRISHOP - ORDER INVOICE*\n\n`;
    message += `📄 *Invoice Details:*\n`;
    message += `• Invoice No: *${orderData.orderId}*\n`;
    message += `• Date: ${orderData.date}\n`;
    message += `• Payment Mode: Cash on Delivery\n\n`;

    message += `👤 *Billed & Shipped To:*\n`;
    message += `• Name: *${orderData.customer.name}*\n`;
    message += `• Phone: ${orderData.customer.phone}\n`;
    message += `• Address: ${orderData.customer.address}, ${orderData.customer.city} - ${orderData.customer.pincode}\n\n`;

    message += `🛒 *Items Ordered:*\n`;
    orderData.items.forEach((item, index) => {
      const variantStr = item.selectedVariant ? ` (${item.selectedVariant})` : "";
      message += `*${index + 1}. ${item.name}${variantStr}*\n`;
      message += `   Qty: ${item.quantity} | Price: ₹${item.price} | Total: ₹${item.price * item.quantity}\n`;
    });

    message += `\n💰 *Bill Summary:*\n`;
    message += `• Subtotal: ₹${orderData.total}\n`;
    message += `• Shipping: ${orderData.shipping === 0 ? 'FREE' : `₹${orderData.shipping}`}\n`;
    message += `• *Grand Total: ₹${orderData.total + orderData.shipping}*\n\n`;
    
    if (serializedOrder) {
      message += `🔗 *View Detailed Invoice PDF/Print:*\n${liveInvoiceUrl}\n\n`;
    }
    
    message += `✨ *Thank you for shopping with Nutrishop!*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919442028103";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="invoice-wrapper">
      <div className="invoice-actions no-print">
        <button className="back-btn mobile-hide-back-btn" onClick={() => navigate('/our-products')}>
          <ArrowLeft size={18} /> Back to Shop
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="print-btn" style={{ backgroundColor: '#25D366' }} onClick={handleWhatsAppShare}>
            <MessageCircle size={18} /> Send via WhatsApp
          </button>
          <button className="print-btn" onClick={handlePrint}>
            <Printer size={18} /> Print / Save PDF
          </button>
        </div>
      </div>

      <div className="invoice-container">
        {/* Invoice Header */}
        <div className="invoice-header">
          <div className="invoice-logo-section">
            <img src={logo} alt="Nutrishop" className="invoice-logo" />
            <div className="company-details">
              <h3>Nutrishop</h3>
              <p>123 Healthy Way, Nature City</p>
              <p>Tamil Nadu, India - 600001</p>
              <p>Phone: +91 94420 28103</p>
              <p>Email: contact@nutrishop.com</p>
            </div>
          </div>
          <div className="invoice-meta">
            <h1>INVOICE</h1>
            <div className="meta-grid">
              <span className="meta-label">Invoice No:</span>
              <span className="meta-value">{orderData.orderId}</span>
              
              <span className="meta-label">Date:</span>
              <span className="meta-value">{orderData.date}</span>
              
              <span className="meta-label">Payment Mode:</span>
              <span className="meta-value">Cash on Delivery</span>
            </div>
          </div>
        </div>

        {/* Billing Details */}
        <div className="invoice-billing-section">
          <div className="billing-box">
            <h4 className="billing-title">Billed To:</h4>
            <p className="customer-name">{orderData.customer.name}</p>
            <p>{orderData.customer.address}</p>
            <p>{orderData.customer.city} - {orderData.customer.pincode}</p>
            <p>Phone: {orderData.customer.phone}</p>
            <p>Email: {orderData.customer.email}</p>
          </div>
          <div className="billing-box">
            <h4 className="billing-title">Shipped To:</h4>
            <p className="customer-name">{orderData.customer.name}</p>
            <p>{orderData.customer.address}</p>
            <p>{orderData.customer.city} - {orderData.customer.pincode}</p>
            <p>Phone: {orderData.customer.phone}</p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="invoice-table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Item Description</th>
                <th>Price</th>
                <th>Qty</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="item-name">{item.name}</span>
                    {item.selectedVariant && <span className="item-variant"> (Size: {item.selectedVariant})</span>}
                  </td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td className="text-right">₹{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Totals */}
        <div className="invoice-totals-section">
          <div className="totals-notes">
            <h4>Notes:</h4>
            <p>Thank you for shopping with Nutrishop! Your natural and healthy products will be delivered soon.</p>
          </div>
          <div className="totals-calculations">
            <div className="calc-row">
              <span>Subtotal:</span>
              <span>₹{orderData.total.toFixed(2)}</span>
            </div>
            <div className="calc-row">
              <span>Shipping:</span>
              <span>{orderData.shipping === 0 ? 'Free' : `₹${orderData.shipping.toFixed(2)}`}</span>
            </div>
            <div className="calc-row grand-total">
              <span>Grand Total:</span>
              <span>₹{(orderData.total + orderData.shipping).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Invoice Footer */}
        <div className="invoice-footer">
          <p>This is a computer generated invoice and requires no signature.</p>
          <div className="footer-branding">
            <span>Nutrishop</span> | <span>Eat Healthy, Live Wealthy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
