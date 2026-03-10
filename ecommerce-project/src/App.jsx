import { Routes, Route } from 'React-router';
import { HomePage } from './pages/HomePage'; // import the HomePage component that you created in another file
import { CheckoutPage } from './pages/CheckoutPage'; 
import { OrdersPage } from './pages/OrdersPage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrdersPage />} />
      </Routes>
  ); 
}

export default App
