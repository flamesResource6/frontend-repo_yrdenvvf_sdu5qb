import React from 'react';
import Spline from '@splinetool/react-spline';
import ColorBends from './ColorBends';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={1.4}
          warpStrength={1.2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.08}
          transparent
        />
        <div style={{position: 'absolute', inset: 0}}>
          <Spline scene="https://prod.spline.design/oRrPvYYzPQFRFKuU/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{position:'absolute', inset:0, background: 'radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,0) 0%, rgba(5,5,9,0.35) 60%, rgba(5,5,9,0.65) 100%)'}} />
      </div>
      <div className="hero-content">
        <div className="hero-label">CONCEPT DESIGN · DEADSTOCK</div>
        <h1 className="hero-heading">Curated deadstock & experimental concept pieces</h1>
        <p className="hero-subtext">“Limited sneakers, rare drops and studio-level design objects.”</p>
        <div className="hero-actions">
          <button className="btn btn-primary">Shop Deadstock</button>
          <button className="btn">Explore Concept Line</button>
        </div>
      </div>
    </section>
  );
}
