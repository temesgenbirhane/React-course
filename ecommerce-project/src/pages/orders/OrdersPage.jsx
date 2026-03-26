import axios from 'axios';
import { OrdersGrid } from './OrdersGrid';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './OrdersPage.css';
export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);


  useEffect(() => {   // we are making an API request to the backend
    const fetchOrders = async () => {
      const response =await axios.get('/api/orders?expand=products')   // remember we added localhost:5137 to the vite.config.js file so that we dont write it everytime
        setOrders(response.data);
    }
    fetchOrders();
  }, []);

  return (
        <>

      <title>Orders</title>
      <Header cart={cart} />


      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
    </div>
      </>

      );
  }