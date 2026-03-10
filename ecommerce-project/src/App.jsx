import { Routes, Route } from 'React-router';
import { HomePage } from './pages/HomePage'; // import the HomePage component that you created in another file
import { CheckoutPage } from './pages/CheckoutPage'; 
import { OrdersPage } from './pages/OrdersPage';
import { Tracking } from './pages/Tracking';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<Tracking />} />
    </Routes>
  ); 
}

export default App
