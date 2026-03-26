import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { HomePage } from './pages/home/HomePage'; // import the HomePage component that you created in another file
import { CheckoutPage } from './pages/checkout/CheckoutPage'; 
import { OrdersPage } from './pages/orders/OrdersPage';
import { Tracking } from './pages/Tracking';
import './App.css'


function App() {
  const [cart, setCart] = useState([]);

  useEffect (() => {
    const fetchAppData =  async() => {
      const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data);
       };
       fetchAppData();
 }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
      <Route path="orders" element={<OrdersPage cart={cart}/>} />
      <Route path="tracking/:orderId/:productId" element={<Tracking cart={cart}/>} />
    </Routes>
  ); 
}

export default App


