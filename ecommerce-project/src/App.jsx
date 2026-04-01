import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { HomePage } from './pages/home/HomePage'; // import the HomePage component that you created in another file
import { CheckoutPage } from './pages/checkout/CheckoutPage'; 
import { OrdersPage } from './pages/orders/OrdersPage';
import { Tracking } from './pages/Tracking';
import './App.css'
import { NotFoundPage } from './pages/NotFoundPage';


function App() {
  const [cart, setCart] = useState([]);

  
    const loadCart =  async() => {
      const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data);
       };
  useEffect (() => {
       loadCart();
 }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
      <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart} />} />
      <Route path="tracking/:orderId/:productId" element={<Tracking cart={cart} />} />
      <Route path="*" element={<NotFoundPage cart={cart}/>} />
    </Routes>
  ); 
}

export default App


