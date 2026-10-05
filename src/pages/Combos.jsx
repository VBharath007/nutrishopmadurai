import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gift } from 'lucide-react';

const Combos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="combos-page" style={{ padding: '2rem 0' }}>
      <div className="container">
        <Link to="/" className="back-link mobile-hide-back-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#4b5563', marginBottom: '2rem', fontWeight: '500' }}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="combos-content text-center" style={{ padding: '4rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '50vh', justifyContent: 'center', backgroundColor: '#f9fafb', borderRadius: '16px' }}>
          <Gift size={64} color="#65a30d" style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#111827' }}>Special Combos</h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', maxWidth: '600px', margin: '0 auto 2rem' }}>
            We are curating some amazing product bundles just for you! Our special combos will offer great value on your favorite Nutrishop products. Check back soon.
          </p>
          <Link to="/our-products" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', borderRadius: '8px', textDecoration: 'none', backgroundColor: '#65a30d', color: 'white', fontWeight: 'bold' }}>
            Explore All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Combos;
