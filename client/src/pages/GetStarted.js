import React from 'react'
import './../styles/GetStarted.css'
import FinancialTipHeader from './FinancialTipHeader';

export const GetStarted = () => {
  return (
    <section className="header">
      <div className="text-box">
        <h1>Welcome to Our AI Expense Tracker!</h1>
        <p>We're glad you're here! Discover our products, explore solutions, and learn more about us.</p>
        <a href="/home" className="hero-btn">Get Started Here!</a>
        <h3 className="financial-tip-header">
  <FinancialTipHeader />
</h3>


      </div>
    </section>
  );
};