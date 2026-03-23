import axios from 'axios';
import { useEffect, useState } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { formatMoney } from '../../utils/money';
import { OrderSummary } from './OrderSummary';
import './CheckoutPage.css';

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([null]);

  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    axios.get('/api/payment-summary')
      .then((response) => {
        setPaymentSummary(response.data);
      });
  }, []);


  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader />


      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>
            {/* check if paymentSummary object exists, if null the rest wont work */}
            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.subtotalCents)}</div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>


              </>
            )
            }
          </div>
        </div>
      </div>
    </>
  );
}