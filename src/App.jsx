import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NewArrivals from './components/NewArrivals';
import CategoryTiles from './components/CategoryTiles';
import Brands from './components/Brands';
import CategoryPage from './components/CategoryPage';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App(){
  return (
    <div>
      <Header />
      <Hero />
      <NewArrivals />
      <CategoryTiles />
      <Brands />
      <CategoryPage category="sneakers" />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
