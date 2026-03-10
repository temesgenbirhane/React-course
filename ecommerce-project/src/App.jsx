import { Routes, Route } from 'React-router';
import { HomePage } from './pages/HomePage'; // import the HomePage component that you created in another file
import { CheckoutPage } from './pages/CheckoutPage'; 
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
     </Routes>
  ); 
}

export default App
