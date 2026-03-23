import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { HomePage } from './pages/home/HomePage'; // import the HomePage component that you created in another file
import { CheckoutPage } from './pages/checkout/CheckoutPage'; 
import { OrdersPage } from './pages/OrdersPage';
import { Tracking } from './pages/Tracking';
import './App.css'


function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      });
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
      <Route path="orders" element={<OrdersPage cart={cart}/>} />
      <Route path="tracking" element={<Tracking />} />
    </Routes>
  ); 
}

export default App


