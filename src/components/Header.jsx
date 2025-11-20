import React, { useEffect, useState } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import './ui.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container">
        <div className="left">
          <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <a className="logo" href="#">CONCEPT·DEADSTOCK</a>
          <nav className="nav">
            <a href="#new">New Arrivals</a>
            <a href="#sneakers">Sneakers</a>
            <a href="#clothing">Clothing</a>
            <a href="#accessories">Accessories</a>
            <a className="sale" href="#sale">Sale</a>
          </nav>
        </div>
        <div className="right">
          <button className="icon-btn" aria-label="Search"><Search size={18} /></button>
          <button className="icon-btn" aria-label="Account"><User size={18} /></button>
          <button className="icon-btn" aria-label="Wishlist"><Heart size={18} /></button>
          <button className="icon-btn cart" aria-label="Cart">
            <ShoppingCart size={18} />
            <span className="badge">2</span>
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-drawer">
          <a onClick={() => setOpen(false)} href="#new">New Arrivals</a>
          <a onClick={() => setOpen(false)} href="#sneakers">Sneakers</a>
          <a onClick={() => setOpen(false)} href="#clothing">Clothing</a>
          <a onClick={() => setOpen(false)} href="#accessories">Accessories</a>
          <a onClick={() => setOpen(false)} className="sale" href="#sale">Sale</a>
        </div>
      )}
    </header>
  );
}
