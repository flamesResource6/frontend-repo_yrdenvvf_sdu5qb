import React from 'react';
import './ui.css';

export default function Newsletter(){
  return (
    <section className="section newsletter">
      <div className="container news">
        <div className="copy">
          <h3>Stay Ahead of the Drops</h3>
          <p>Early access to new releases, collaborations, and seasonal sales.</p>
        </div>
        <form className="form" onSubmit={e=>e.preventDefault()}>
          <input type="email" placeholder="Email address" required />
          <button className="btn-primary" type="submit">Sign up</button>
        </form>
      </div>
    </section>
  );
}
