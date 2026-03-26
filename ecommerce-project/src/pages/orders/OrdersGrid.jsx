import { OrderDetailsGrid } from "./OrderDetailsGrid";
import { OrderHeader } from "./OrderHeader";
export function OrdersGrid({ orders }) {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                const firstOrderProduct = order.products?.[0];
                const firstProductDetails = firstOrderProduct?.product;

                return (
                    <div key={order.id} className="order-container">

                      <OrderHeader order={order} />
                       <OrderDetailsGrid order={order} />
                    </div>

                );
            })}
        </div>
    );
}