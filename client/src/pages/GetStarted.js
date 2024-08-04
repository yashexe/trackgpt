import React from 'react'
import './../styles/GetStarted.css'

export const GetStarted = () => {
    return (
      <section className="header">
        <div className="text-box">
          <h1>Welcome to Our AI Expense Tracker!</h1>
          <p>We're glad you're here! Discover our products, explore solutions, and learn more about us.</p>
          <a href="/home" className="hero-btn">Get Started Here!</a>
        </div>
      </section>
    );
  };