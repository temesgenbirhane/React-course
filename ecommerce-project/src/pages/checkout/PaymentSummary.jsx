import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../../utils/money';
export function PaymentSummary({ paymentSummary, loadCart }) {

    const naviagte = useNavigate();
    const createOrder = async() => {
    await axios.post('/api/orders');         
    await loadCart();
    naviagte('/orders');
    };
    return (
        <div className= "payment-summary" >
        <div className="payment-summary-title" >
            Payment Summary
                </div>
    {/* check if paymentSummary object exists, if null the rest wont work */ }
    {
        paymentSummary && (
            <>
            <div className="payment-summary-row" data-testid="payment-summary-product-cost"> {/* BZW only the data* is a key word, so we can name it data-foo  */}
                <div>Items({ paymentSummary.totalItems }): </div>
                    < div className = "payment-summary-money" > { formatMoney(paymentSummary.productCostCents) } </div>
                        </div>

                        < div className = "payment-summary-row" data-testid="payment-summary-shipping-cost">
                            <div>Shipping & amp; handling: </div>
                                < div className = "payment-summary-money" > { formatMoney(paymentSummary.shippingCostCents) } </div>
                                    </div>

                                    < div className = "payment-summary-row subtotal-row" data-testid="payment-summary-total-before-tax">
                                        <div>Total before tax: </div>
                                            < div className = "payment-summary-money" > { formatMoney(paymentSummary.totalCostBeforeTaxCents) } </div>
                                                </div>

                                                < div className = "payment-summary-row" data-testid="payment-summary-tax">
                                                    <div>Estimated tax(10 %): </div>
                                                        < div className = "payment-summary-money" > { formatMoney(paymentSummary.taxCents) } </div>
                                                            </div>

                                                            < div className = "payment-summary-row total-row" data-testid="payment-summary-total">
                                                                <div>Order total: </div>
                                                                    < div className = "payment-summary-money" > { formatMoney(paymentSummary.totalCostCents) } </div>
                                                                        </div>

                                                                        < button className = "place-order-button button-primary" onClick={createOrder}>
                                                                            Place your order
                                                                                </button>


                                                                                </>
            )
    }
    </div>
    );

}