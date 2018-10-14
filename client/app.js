import React from 'react';
import HomeScreen from './components/HomeScreen';
import Header from './components/Header';

const App = () => {
  return (
    <div className="content-container">
      <Header />
      <HomeScreen />
    </div>
  );
};

export default App;
