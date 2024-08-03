import React from 'react';
import Header from '../components/Header'; 


export const Home = () => {
  return (
    <div style={{display: 'flex'}}>
      <Header/>
      <div className='main-content' >
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
      </div>
    </div>
  );
};
