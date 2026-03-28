import axios from 'axios';
import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs';
export function DeliveryOptions( { cartItem, deliveryOptions, loadCart } ) {
    
    
    return (

        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((deliveryOption) => {
                let priceString = 'FREE Shipping';

                if (deliveryOption.priceCents > 0) {
                    priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                }

                // we pu the function inside the loop because we need access to the deliveryOption
                const updateDeliveryOption = async () => {
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                        // rember the syntax is first you write the URL and then you write the body of the request(which delivery option you want it to update too)
                        // Read the backend documentation to see the type of API and what data we can access
                        deliveryOptionId: deliveryOption.id
                    });
                        await loadCart(); // we use await to keep it consistent with the other funstion since they are both async
                        // This allows use to refresh the page with out refreshing it
                }; 
                return (
                    <div key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOption}>
                        <input type="radio"
                            checked={deliveryOption.id === cartItem.deliveryOptionId}
                            onChange={() => {}} // we need to add this to get rid of the warning but we don't need to do anything when the radio button changes because we are already handling that with the onClick function on the div
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`} />
                        <div>
                            <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>
                            <>
                                <div className="delivery-option-price">
                                    {priceString}
                                </div>
                            </>
                        </div>
                    </div>

                );
            })}
        </div>

    );
}