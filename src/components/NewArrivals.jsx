import React from 'react';
import { products } from '../data/products';
import './ui.css';

function ProductCard({ p }) {
  return (
    <a className="product-card" href={`#product-${p.id}`}>
      <div className="media">
        <img src={p.images[0]} alt={p.name} loading="lazy" />
        {p.label && <span className="label">{p.label}</span>}
      </div>
      <div className="meta">
        <div className="brand">{p.brand}</div>
        <div className="name">{p.name}</div>
        <div className="price">${p.price.toFixed(2)}</div>
      </div>
    </a>
  );
}

export default function NewArrivals() {
  const newProducts = products.slice(0, 8);
  return (
    <section className="section" id="new">
      <div className="container">
        <div className="section-header">
          <h2>New Arrivals</h2>
          <a className="link" href="#new-all">View all New Arrivals</a>
        </div>
        <div className="grid products">
          {newProducts.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
