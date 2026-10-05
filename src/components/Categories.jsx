import React from 'react';
import { Leaf, Droplet, Sun, Coffee, Heart, ShoppingBag, Sparkles, Sprout } from 'lucide-react';
import './Categories.css';

const categoriesRaw = [
  "Chappathi Flours", "Dental Care", "Dosa Flours", "Face Pack Powders", 
  "Flour Varieties", "Healthy Laddus", "Herbal Home Needs", "Herbal Napkins", 
  "Herbal Pooja Products", "Herbal Tea's", "Home Made Appalam", "Home Made Vadagam", 
  "Home Made Vathal", "Honey Mix", "Idiyappam Flours", "Lip Balm & Kajal", 
  "Masala Powders", "Oats & Granola", "Pickle & Thokku", "Puttu Flours", 
  "Rice & Idly Mix Powders", "Soup Mix", "Spices", "Aval / Flakes", 
  "Ayurvedic Personal Care", "Dates & Fig", "Dehydrated Fruits", "Dry Fruits", 
  "Herbal Hair Care", "Honey", "Millets", "Ready To Cook", "Seeds", "Sweeteners", "Traditional Rice", "Millet Extruder Snacks"
];

const colors = [
  'bg-green-light', 'bg-orange-light', 'bg-blue-light', 
  'bg-pink-light', 'bg-purple-light', 'bg-yellow-light'
];

const icons = [Leaf, Droplet, Sun, Coffee, Heart, ShoppingBag, Sparkles, Sprout];

const categoriesData = categoriesRaw.map((name, index) => {
  const Icon = icons[index % icons.length];
  return {
    id: index + 1,
    name,
    color: colors[index % colors.length],
    Icon
  };
});

const Categories = () => {
  return (
    <section className="categories-section">
      <div className="container">
        
        <div className="categories-grid">
          {categoriesData.map((cat) => (
            <div key={cat.id} className="category-card group">
              <div className={`category-icon-wrapper ${cat.color}`}>
                <cat.Icon size={28} className="opacity-80" strokeWidth={1.5} />
              </div>
              <div className="category-info">
                <h3 className="category-name">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;
