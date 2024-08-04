import React from 'react'
import './../styles/GetStarted.css'
import FinancialTipHeader from '../components/FinancialTipHeader';

export const GetStarted = () => {
  return (
    <section className="header">
      <div className="text-box">
        <h1>WealthHack</h1>
        <p className='slogan'>Finance Management, Made Simple.</p>
        <a href="/home" className="hero-btn">Get Started Here!</a>
        <p className="financial-tip-header">
          <FinancialTipHeader />
        </p>

      </div>
    </section>
  );
};