import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for createRoot
import App from './App';
import '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);