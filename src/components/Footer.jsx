import React from 'react';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import './ui.css';

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container grid footer-grid">
        <div className="col">
          <div className="logo">CONCEPT·DEADSTOCK</div>
          <p className="muted">Curated sneakers & streetwear since MMXXIV.</p>
        </div>
        <div className="col">
          <div className="title">Shop</div>
          <a href="#new">New Arrivals</a>
          <a href="#sneakers">Sneakers</a>
          <a href="#clothing">Clothing</a>
          <a href="#accessories">Accessories</a>
          <a href="#sale">Sale</a>
        </div>
        <div className="col">
          <div className="title">Customer Care</div>
          <a href="#contact">Contact</a>
          <a href="#faq">FAQ</a>
          <a href="#shipping">Shipping & Returns</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
        <div className="col">
          <div className="title">Account</div>
          <a href="#signup">Sign up</a>
          <a href="#login">Login</a>
          <a href="#orders">Orders</a>
          <a href="#favorites">Favorites</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <div className="social">
          <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
          <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
        </div>
        <div className="copy">© {new Date().getFullYear()} Concept · Deadstock</div>
      </div>
    </footer>
  );
}
