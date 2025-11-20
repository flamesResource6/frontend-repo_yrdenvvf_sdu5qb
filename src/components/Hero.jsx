import React from 'react';
import ColorBends from './ColorBends';
import './ui.css';

export default function Hero() {
  return (
    <section className="hero-landing" id="home">
      <div className="hero-bg-simple">
        <ColorBends
          colors={["#b7fbff", "#c4b7ff", "#e5fff7"]}
          rotation={20}
          speed={0.15}
          scale={1.0}
          frequency={1.2}
          warpStrength={0.9}
          mouseInfluence={0.5}
          parallax={0.4}
          noise={0.05}
          transparent
        />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">NEW DROP</div>
          <h1>Concept Design & Curated Deadstock</h1>
          <p>Limited sneakers and studio-grade streetwear, handpicked and authenticated.</p>
          <div className="actions">
            <a href="#new" className="btn-primary">Shop New Arrivals</a>
            <a href="#sneakers" className="link">View All Sneakers</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-ph" />
        </div>
      </div>
    </section>
  );
}
