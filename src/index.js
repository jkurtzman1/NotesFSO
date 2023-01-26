import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
//const promise2 = axios.get("https://localhost:3001/foobar");
//console.log(promise2);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
