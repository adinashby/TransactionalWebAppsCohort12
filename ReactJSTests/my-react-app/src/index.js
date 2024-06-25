import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App name='James' title = 'intro'/>
    <App name='George'/>
    <App name='Maria'/>
    <App name='Jerry'/>
    <App name='David'/>
  </React.StrictMode>
);
