import React from 'react';
import './ui.css';

const brands = ['Nike', 'adidas', 'New Balance', 'Salomon', 'Asics', 'Carhartt WIP', 'Stone Island', 'A.P.C.', 'Arcteryx', 'On', 'HOKA', 'Reebok'];

export default function Brands(){
  return (
    <section className="section" id="brands">
      <div className="container">
        <div className="section-header">
          <h2>Featured Brands</h2>
        </div>
        <div className="brand-row">
          {brands.map(b => (
            <a key={b} href={`#brand-${b.toLowerCase().replace(/\s+/g,'-')}`} className="brand-pill">{b}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
