import React from 'react';
import './ui.css';

const tiles = [
  { key: 'sneakers', title: 'Sneakers', text: 'Limited models & collaborations', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop' },
  { key: 'clothing', title: 'Clothing', text: 'Studio-grade capsules and staples', img: 'https://images.unsplash.com/photo-1520975682031-b48b6a0f2c00?q=80&w=1600&auto=format&fit=crop' },
  { key: 'accessories', title: 'Accessories', text: 'Bags, headwear, small goods', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1600&auto=format&fit=crop' }
];

export default function CategoryTiles(){
  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="grid tiles">
          {tiles.map(t => (
            <a key={t.key} className="tile" href={`#${t.key}`}>
              <img src={t.img} alt="" />
              <div className="overlay" />
              <div className="copy">
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <span className="link">Shop now</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
