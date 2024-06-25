import React from 'react';
import ItemList from './components/ItemList';
import Cart from './components/Cart';
import './App.css';
import Counter from './components/Counter'
import Timer from './components/Timer';

const App = () => {
  const items = [
    { id: 1, name: 'Apple', price: '$1.00' },
    { id: 2, name: 'Banana', price: '$0.50' },
    { id: 3, name: 'Carrot', price: '$0.30' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery Store</h1>
      </header>
      <main>
        <ItemList items={items} />
        <Cart />
        <Counter />
        <Timer />
      </main>
    </div>
  );
};

export default App;
