import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";
export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
        };

        const updateQuantity = async () => { // toggles between showing the quantity as text and showing it as an input field
            
            if (isUpdatingQuantity) {
                await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity),
            });
            await loadCart();
                setIsUpdatingQuantity(false);
            } else {
                setIsUpdatingQuantity(true);
            }
        }

        const updateInputQuantity = (event) => {  // parameter goes inside parenthesis of an arrow function
            setQuantity(event.target.value);
            // event.target.value is the new quantity that the user has typed in the input field. We need to update the quantity state with this new value.
        }
    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />
            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {
                            isUpdatingQuantity ? 
                            <input type="text" className="quantity-textbook" value={quantity} onChange={updateInputQuantity} />:
                            <span className="quantity-label">{cartItem.quantity}</span>
                        }</span>
                    <span className="update-quantity-link link-primary" onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>

        </>
    );
}