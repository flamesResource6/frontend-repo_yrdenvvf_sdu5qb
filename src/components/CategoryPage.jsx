import React, { useMemo, useState } from 'react';
import { products } from '../data/products';
import './ui.css';

const sizes = ['38','39','40','41','42','43','44','45'];
const brands = ['Nike','adidas','New Balance','Salomon','Stone Island','Carhartt WIP'];
const colors = ['black','white','grey','cream','volt','charcoal','natural'];

function Checkbox({label, checked, onChange}){
  return (
    <label className="check">
      <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export default function CategoryPage({ category = 'sneakers' }){
  const [selSizes, setSelSizes] = useState([]);
  const [selBrands, setSelBrands] = useState([]);
  const [selColors, setSelColors] = useState([]);
  const [sort, setSort] = useState('new');

  const list = useMemo(() => {
    let arr = products.filter(p => p.category === category);
    if(selBrands.length) arr = arr.filter(p => selBrands.includes(p.brand));
    if(selColors.length) arr = arr.filter(p => (p.colors||[]).some(c=>selColors.includes(c)));
    if(selSizes.length) arr = arr.filter(p => (p.sizes||[]).some(s=>selSizes.includes(s)));
    if(sort === 'lh') arr = [...arr].sort((a,b)=>a.price-b.price);
    if(sort === 'hl') arr = [...arr].sort((a,b)=>b.price-a.price);
    return arr;
  }, [category, selBrands, selColors, selSizes, sort]);

  return (
    <section className="section" id={category}>
      <div className="container category">
        <div className="sidebar">
          <h3>Filter</h3>
          <div className="group">
            <div className="label">Size</div>
            <div className="flow">
              {sizes.map(s => (
                <Checkbox key={s} label={s} checked={selSizes.includes(s)} onChange={(v)=>setSelSizes(v? [...selSizes, s] : selSizes.filter(x=>x!==s))} />
              ))}
            </div>
          </div>
          <div className="group">
            <div className="label">Brand</div>
            <div className="flow">
              {brands.map(b => (
                <Checkbox key={b} label={b} checked={selBrands.includes(b)} onChange={(v)=>setSelBrands(v? [...selBrands, b] : selBrands.filter(x=>x!==b))} />
              ))}
            </div>
          </div>
          <div className="group">
            <div className="label">Color</div>
            <div className="flow">
              {colors.map(c => (
                <Checkbox key={c} label={c} checked={selColors.includes(c)} onChange={(v)=>setSelColors(v? [...selColors, c] : selColors.filter(x=>x!==c))} />
              ))}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="toolbar">
            <div className="title">{category.charAt(0).toUpperCase()+category.slice(1)}</div>
            <div className="count">{list.length} products</div>
            <div className="sort">
              <label>Sort</label>
              <select value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="new">Newest</option>
                <option value="lh">Price low–high</option>
                <option value="hl">Price high–low</option>
              </select>
            </div>
          </div>
          <div className="grid products">
            {list.map(p => (
              <a key={p.id} className="product-card" href={`#product-${p.id}`}>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
