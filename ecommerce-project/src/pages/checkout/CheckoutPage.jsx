import axios from 'axios';
import { useEffect, useState } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { PaymentSummary } from './PaymentSummary';
import { OrderSummary } from './OrderSummary';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([null]);

  useEffect(() => {  // This useEffect only runs once, 
  // because Delivery options does not need to change when the user updates the cart. They are static data for the whole checkout session.


    const fetchCheckoutData = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
        setDeliveryOptions(response.data);
      };
      fetchCheckoutData();
    }, []);

    useEffect(() => {   // This useEffect will run every time the cart changes
      const fetchpaymentSummary = async () => { 
        const response = await axios.get('/api/payment-summary')
        setPaymentSummary(response.data);

      };
      fetchpaymentSummary();}, [cart]);
    
  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />


      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  );
}