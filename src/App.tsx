import React from 'react';
import { HomePage } from './pages/HomePage';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <HomePage />
    </div>
  );
};

export default App;